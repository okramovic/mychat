'use strict'

const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      mongo = require('mongodb').MongoClient,
      MongoStore = require('connect-mongo')(session),
      io = require('socket.io')(http),
      {Wit, log} = require('node-wit'),
      fileUpload = require('express-fileupload'),  //  https://www.npmjs.com/package/express-fileupload
      React = require('react'),
      exphbs = require('express-handlebars'),
      webpush = require('web-push')

let Glob_socket;

const jsonParser = bodyParser.json()
// https://www.npmjs.com/package/body-parser#express-route-specific
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.text({ type: 'text/html' }))

// stuff for push notifs
webpush.setVapidDetails('mailto:okram@protonmail.ch', process.env.vapidPublic, process.env.vapidPrivate)




app.set('views',path.join(__dirname, 'views')) // was 'views'
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }) );
app.use('/public',express.static('public'));
app.use(session({
      secret: process.env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ url: process.env.mongoURL})
}))


io.use((socket, next) => {
  //console.log(socket.handshake.query, '\n', socket.handshake)
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




io.sockets.on('connection', socket =>{
      // https://stackoverflow.com/questions/9262811/socket-io-messaging-to-multiple-rooms?rq=1
      // https://stackoverflow.com/questions/17476294/how-to-send-a-message-to-a-particular-client-with-socket-io?rq=1
      // long ones
      //       http://www.psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/
      //       https://udidu.blogspot.co.at/2012/11/chat-evolution-nodejs-and-socketio.html
  
      // https://github.com/jgonera/socket.io-multichat/blob/master/app.js
  
  
  
  //console.log('connection', socket.client) //console.log('glob connection', Glob_socket.handshake)
  
  console.log('connection', socket.handshake.query.room, socket.handshake.query)
  const socRoom = socket.handshake.query.room
  socket.join(socRoom)
  
        //console.log(io.sockets)
  
  Glob_socket = socket
  
  Glob_socket.on('msg', (msg) =>{
    
    console.log( msg, Glob_socket.handshake.query)
    //socket.broadcast.to(msg.room).emit("message to all other users in channel");
    
    
    //socket.emit('msg', 'test')
    
    
    addMsgToRoom(msg)
    .then(result=>{
        console.log('msg added to file')
      
        //Glob_socket.emit('msg', result)
        io.sockets.in(result.room).emit('msg', result);
      
        sendPushToAllSubs(result)
        
        
        // io.sockets.in('some other room').emit('hi');
        // versus: socket.broadcast.to('a room').send('im here');
      
        if (result.room =='bot'){
           const botmsg = {room: 'bot', from: "m's agent", text: null, timeStamp: Date.now()}
           
           sendToWit(msg.text)
           .then( res =>{
               
               botmsg.text = `I think you are asking me about ${res.value}`
               
               //Glob_socket.emit('msg', botmsg)
               io.sockets.in(result.room).emit('msg', botmsg);
               addMsgToRoom(botmsg)
             
           }).catch(er=>{
             
               botmsg.text = "Sorry, i'm not very smart yet"
             
               //Glob_socket.emit('msg', botmsg)
               io.sockets.in(result.room).emit('msg', botmsg);
               addMsgToRoom(botmsg)
               
           })
        }
    })
    
    
  })
  
  Glob_socket.on('leave', room=>{
      console.log(`leaving room ${room}`)
      Glob_socket.leave(room)
  }) 
  
  Glob_socket.on('disconnect', (ev) =>{
      console.log('disconnected', ev ) 
  })
}) 



function sendPushToAllSubs(msg){
    fs.readFile(`pushsubs.json`, 'utf8', (err, file)=>{
        if (err) throw err
        else {
          console.log('file ok')
          const subs = JSON.parse(file)
          
          subs.allsubs.forEach(sub=>{
                console.log('--- sub', subs.allsubs.length, sub.endpoint)
            
                webpush.sendNotification(
                  sub,
                  JSON.stringify(msg)
                )
          })
        }
    })
}


app.get("/", (req, res) =>{
  //console.log('/', req.session)
  if (!req.session._id)   res.sendFile(__dirname + '/app/login.html'); //res.redirect('/login')
  //res.sendFile(__dirname + '/app/login.html');
  else   
    res.sendFile(__dirname + '/app/index.html');
});
app.get("/service-worker.js", (req, res) =>{
    //console.log('SW', __dirname + '/service-worker.js')
    res.sendFile(__dirname + '/service-worker.js')
})
/*app.get("/upload", (req, res) =>{
    res.sendFile(__dirname + '/app/upload.html');
})*/
app.get("/bot", (req, res) =>{
    console.log('/bot')
    res.render('layouts/main.handlebars',{content: 'this is server test content', data:[1,2,3]})
    /*res.render('layouts/userContent.handlebars', {
          tags:tags 
    })*/
    //res.end('in progress')
})



app.get('/login', (req,res)=>{
    if (!req.session._id) res.sendFile(__dirname + '/app/login.html')
    else res.redirect('/')
})
app.post('/api/login', jsonParser, (req,res)=>{
  
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


app.post('/api/subscribe', checkAccess, jsonParser, (req,res)=>{
    console.log('subscribe', req.session, req.body.endpoint)
  
    res.sendStatus(200);
  
    // add new sub to file
    fs.readFile(`pushsubs.json`, 'utf8', (err, file)=>{
        if (err) throw err
        else {
          const subs = JSON.parse(file)
          
          if (subs.allsubs.find(sub=>sub.endpoint == req.body.endpoint) !== undefined ) return console.log('sub already there'); 
          
          
          console.log('   this sub not there yet')
          subs.allsubs.push( req.body )
          
          fs.writeFile(`pushsubs.json`, JSON.stringify(subs) , err =>{
              if (err) throw err
              else console.log('pushsubs updated')
          })
        }
    })
  
    /*const payload = JSON.stringify({title: "hi from myChat", whatever: 11})
    
    webpush.sendNotification(
        req.body, // subscription,
        payload
    )*/
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
            //res.sendStatus(500)
            res.end()
            throw err;
        }
        else res.end(data)
    })
})
app.get(/sentfiles\/.*/, (req,res)=>{
      res.sendFile(__dirname + req.url)
})


//app.use(fileUpload())
app.post('/api/uploadFile', checkAccess, fileUpload(), (req,response)=>{

    console.log(req.headers['x-app-roomname'], req.headers['x-app-username'], req.files)
  
    if (req.files.uploadFile.data.length > 5 * 1000 *1000) return response.sendStatus(413) // code = payload too large
  
    //console.log(req.headers)
    //console.log('file upload', req.headers['x-app-filename'], req.headers['x-app-filetype'])  
  

    const room = req.headers['x-app-roomname'],
          user = req.headers['x-app-username'],
          fileName = encodeURI( req.headers['x-app-filename'] || req.files.uploadFile.name )
  
    if (!room || !user || !fileName) return console.error('file info missing', room ,user,fileName)
  
    /*  didnt work
          let fileData = [];
          req.on('data', chunk=>fileData+=chunk)
          req.on('end', ()=>{*/
    
  
    fs.open('./sentfiles/' + room + '/', 'r', (er, fd)=>{
        if (er) {
                 console.error(er, er.errno)
                 if (er.code == 'ENOENT') {
                     console.log('----missing directory')
                     fs.mkdirSync('./sentfiles/' + room)

                 } else return response.sendStatus(500);
        } 
      
        req.files.uploadFile.mv(`./sentfiles/${room}/${fileName}`, function(err) {
          if (err) return response.status(500).send(err);

          
          const fp2 = 'sentfiles/' + room + '/' + fileName
          const msg =  {room , from: user, text: `file: https://snapdrop.glitch.me/${fp2}`, timeStamp: Date.now()}
        
          addMsgToRoom(msg)
          .then(res=>{
                response.sendStatus(200)
                //response.redirect('/')
                Glob_socket.emit('msg', res);   
          })
          

        })
      
        //const filePath = './sentfiles/' + room + '/' + fileName
        //const writable = fs.createWriteStream(filePath)
        //req.pipe(writable)
        

        
   })
})
 
//checkFiles()
function checkFiles(){
    fs.readdir('sentfiles', (er, files)=>{
        if (er) throw er
        console.log('sentfiles/',files)
    })
}



app.get('/logout', (req,res)=>{
  req.session.destroy(() => {
    res.redirect('/login')
      /*res.json({
        success: true,
        message: "Logged out."
      })*/
  })
})


http.listen(3000, ()=>console.log('- - - - on port 3000 - - - -'))



const validMsg = msg => {
  
    if (msg.room && msg.from && msg.text && msg.timeStamp) return true
    else return false
}

function addMsgToRoom(msg){
  return new Promise((resolve, reject)=>{
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
              
              //socket.emit('msg', msg);
              resolve(msg)
          })
        }
    })
    else console.error('not valid msg')
  })
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


//readfile('sentfiles/__ test vocab.txt')
function readfile(path){
    fs.readFile(path, 'utf8',(er,data)=>{
      console.log('file data',data)
    })
}
//delFile('sentfiles/undefined')
function delFile(path){
  //fs.readdir('rooms', (er, files)=>{
    
      //const jsons = files.filter(name =>name.match(/.json$/))
      //console.log(jsons)  
      fs.unlink(path,(er)=>{
        console.log('error?', er)
        
        fs.readdir('sentfiles', (er, files)=>{
    
            //const jsons = files.filter(name =>name.match(/.json$/))
            console.log(files)
        })
        
      })
  //})
}


function sendToWit(text){
    return new Promise((resolve, reject)=>{
      
      witClient.message(text, {})
      .then(data =>{
        console.log('Wit: \n', data)
        
        if (!data.entities.intent) return reject('no intent')
        
        
        console.log(data.entities.intent) // .value
        resolve(data.entities.intent[0])
      })
      .catch(console.error)
      
    })
  
} // https://github.com/wit-ai/node-wit