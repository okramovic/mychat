'use strict'

const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      mongo = require('mongodb').MongoClient,
      MongoStore = require('connect-mongo')(session),
      io = require('socket.io')(http),
      {Wit, log} = require('node-wit');

const jsonParser = bodyParser.json()
// https://www.npmjs.com/package/body-parser#express-route-specific
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.text({ type: 'text/html' }))

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }) );
app.use(express.static('public'));
app.use(session({
      secret: process.env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ url: process.env.mongoURL})
}))

io.use((socket, next) => {
  console.log(socket.handshake.query, '\n', socket.handshake)
  let room = socket.handshake.query;
  //if (isValid(token)) {
  return next();
  //}
  //return next(new Error('authentication error'));
});

const witClient = new Wit({
  accessToken: process.env.witToken
  //,logger: new log.Logger(log.DEBUG) // optional
});

const checkAccess = (req,res,next) =>{
    //console.log('check access', req.url, req.body, req.session._id)
  
    if ( req.session._id || req.url=='/api/rooms' || (req.body && (req.body.room == 'pub' || req.body.room =='bot'))) {
      req.locals = { ok: true }
      next()
    }
    else res.sendStatus(401)
  
    /*
    notes on req.url from SO
        req.protocol + '://' + req.get('host') + req.originalUrl
        or

        req.protocol + '://' + req.headers.host + req.originalUrl 
        // I like this one as it survives from proxy server, getting the original host name
    */
}




app.get("/", (req, res) =>{
  //console.log('/', req.session)
  
  
  if (!req.session._id)   res.redirect('/login')
  //res.sendFile(__dirname + '/app/login.html');
  
  else   res.sendFile(__dirname + '/app/index.html');
  
});
app.get('/login', (req,res)=>{
    if (!req.session._id) res.sendFile(__dirname + '/app/login.html')
    else res.redirect('/')
})
app.post('/login', jsonParser, (req,res)=>{
  
    console.log('loggin in',req.body)
    
    //console.log('/login \n', req.session)
    if (!req.body.userName || req.body.pass!==process.env.friendsPass) {
      console.error('not authorized', req.body.userName)
      return res.sendStatus(401)
    }
  
    findUser(req.body.userName)
      .then(user=>{
          console.log('found user', user)
          req.session._id = user._id
          req.session.userName = user.userName
          //req.session.canAccess = user.canAccess
          //console.log(req.session)
          //res.redirect('/')
      
          res.sendStatus(200)
      
          //res.sendFile(__dirname + '/app/index.html');
      })
      .catch(status=>res.sendStatus(status))
}) 




app.get ('/pub',(req,res)=>{
    res.sendFile(__dirname + '/app/index.html');
    //res.redirect('/')
})


app.get ('/api/rooms', checkAccess, (req,res)=>{
  //console.log('get rooms session',req.session._id)
  fs.readdir('rooms', (er, files)=>{
    
      const jsons = files.filter(name =>name.match(/.json$/))
      //console.log(jsons)  
      res.json({ok: true,rooms:jsons})
  })
})
app.post('/api/roomContent', jsonParser, checkAccess, allowRoomAccess, (req, res)=>{
    
    //console.log('req body', req.session._id, req.body, req.body.room)
    //console.log('', req.locals.ok)
  
    //if (!req.locals.ok) res.sendStatus(401)
  
  
    fs.readFile(`rooms/${req.body.room}.json`, (err, data)=>{
        if (err) {
            res.sendStatus(500)
            throw err;
        }
        else res.end(data)
    })
})



io.on('connection', socket =>{
  //console.log('connection', socket.client)
  console.log('connection', socket.handshake.query)
  
  socket.on('msg', (msg) =>{
    console.log( msg)
    
    
    
    const room = msg.room
    if ( validMsg(msg) == true ) fs.readFile(`rooms/${room}.json`, 'utf8', (err, file)=>{
        if (err) throw err
        else {
          const fileContent = JSON.parse(file)
          if (!fileContent.roomStarted) fileContent.roomStarted = Date.now()
          delete msg.room
          
          fileContent.chat.push(msg)
          
          fs.writeFile(`rooms/${room}.json`, JSON.stringify(fileContent) , err =>{
              if (err) throw err
              msg.room = room
              
              socket.emit('msg', msg);
              if (room =='bot')
                  sendToWit(msg.text)
                  .then( res =>{

                          socket.emit('msg', {room: 'bot', from: "m's agent",text: "Sorry, i'm not very smart yet", timeStamp: Date.now()})
                  }) 
              
          })
        }
    })
    else console.error('not valid msg')
  })
})

app.get('/logout', (req,res)=>{
  req.session.destroy(() => {
    res.redirect('/login')
      /*res.json({
        success: true,
        message: "Logged out."
      })*/
  })
})


http.listen(3000, ()=>console.log('on port 3000'))

const validMsg = msg => {
  
    if (msg.room && msg.from && msg.text && msg.timeStamp) return true
    else return false
}

function findUser(userName){
    return new Promise((resolve, reject)=>{
      mongo.connect(process.env.mongoURL, (err, client)=>{
          if (err) reject(err)
          else client.db('chat-sessions').collection('users').findOne({userName}, (er, doc)=>{
                if (er) return reject(500)
                else if (!doc) {
                  console.error('! no doc', doc)
                  reject(401)
                  return;
                }
            
                //console.log('user')
                //console.log(doc, doc._id)
                resolve(doc)
          })
      })
    })
}
function allowRoomAccess(req,res,next){
    
    if (req.body.room == 'pub' || req.body.room=='bot') return next()
  
    findUser(req.session.userName)
    .then(user=>{
            
        //console.log('--- user')
        //console.log(user)

        const allowed = user.canAccess == 'all' || user.canAccess.includes(req.body.room)
        //console.log('allowed?', allowed)
        if (!allowed) res.sendStatus(401)
        else next()
      
    }).catch(er =>{
        if (typeof er =='number') res.sendStatus(er)
        else console.error(er)
    })
}
//delFile()
function delFile(){
  fs.readdir('rooms', (er, files)=>{
    
      const jsons = files.filter(name =>name.match(/.json$/))
      console.log(jsons)  
      fs.unlink('rooms/undefined.json',(er)=>{
        console.log('error?', er)
        
        fs.readdir('rooms', (er, files)=>{
    
            const jsons = files.filter(name =>name.match(/.json$/))
            console.log(jsons)  
        })
        
      })
  })
}

//sendToWit('which language do you like most?')
//sendToWit('where are you from?')
// 'what is the weather in London?'
function sendToWit(text){
    return new Promise((resolve, reject)=>{
      
      witClient.message(text, {})
      .then(data =>{

        console.log('Wit: \n', data)
        console.log(data.entities.intent) // .value
        resolve()
      })
      .catch(console.error)
      
    })
  
} // https://github.com/wit-ai/node-wit