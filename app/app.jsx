const React = require('react');
const ReactDOM = require('react-dom');

const main = document.getElementById('main'),
      appDiv = document.getElementById('app')



const Rooms = require('./components/Rooms'),
      Chat  = require('./components/Chat'),
      Blocker  = require('./components/helpers').Blocker,
      Warning = require('./components/helpers').Warning

//console.log(Warning)

let socket;


/*socket.on('serverMsg', msg =>{
    console.log('serverMsg', msg)
})*/




class Input extends React.Component{
  constructor(props){
    super(props)
    //this.clickHandler = this.clickHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    
    this.state={
      type: this.props.type,
      inputVal : '',
      rows: this.props.type=='msg'? 1 : null
    }
  }
  textChangeHandler(ev){
    
    const ww = (innerWidth * 0.55), 
          lw = 11,//letterwidth
          rows = Math.ceil( ev.target.value.toString().length * lw / ww )
    //console.log('width', ww, 'rows',rows)
    this.setState({
            inputVal: ev.target.value, 
            rows: rows < 1 ? 1 : rows
    })
  }
  submitHandler(ev){
    // input validation
        ev.preventDefault()
        if(!this.state.inputVal) return;// alert('need input')
        if (this.props.type=="userName" && this.state.inputVal.toString().length>10)
            return alert('too long name, must be under 10 characters')

        else if (this.props.type=="msg" && this.state.inputVal.toString().length>400)
            return alert('too long message, 400 characters is max') 
    //
    
    this.props.inputHandler(this.state.inputVal)
    this.setState({inputVal: '' })
  }
  render(){
    //console.log('input display', this.props.display)
    if (this.props.display=== false) return null
    
    if (this.props.type==="msg" && this.props.loggedIn){
      
        const className = this.props.loggedIn ? "bottom flex around" : "hidden"
        // <div className="userName">{this.props.user}:</div>
        // form attr onSubmit={this.submitHandler}
        //  action="/api/uploadFile" method='post'  encType="multipart/form-data"
        //  <input type="file" onChange={(ev)=>this.props.fileHandler(ev)} style={{display: this.props.room=='me' ? 'block' : 'none'}}/>
        // <input type="submit" style={{display: this.props.fileReady ? 'block' : 'none' }} value="file!" />
        return(
          <form id="input" className={className}  
                style={{height: (this.state.rows*25 + 20)*1.3 + 'px',
                       bottom: this.props.makeBottomSpace? '60px' : '0' }}>
            <div className="icon" onClick={()=>this.props.openFileForm()}>📁</div> 
            <textarea id="textInput" name="text" onChange={this.textChangeHandler} 
                   type="text" placeholder={"type here"} autoComplete="off" 
                   cols="40" rows={this.state.rows} style={{height: this.state.rows*25*1.15 + 'px'}}
                   value={this.state.inputVal} ></textarea>
            <input type="submit" disabled={this.state.inputVal===''} style={{display: this.props.fileReady ? 'none' : 'block' }}
                   onClick={this.submitHandler} value=" → " />
            
          </form>
          
    )}     //  send file button   onClick={()=>this.props.uploadHandler()}

    else if (this.props.type==="userName" && !this.props.loggedIn) {
          
        const className = this.props.loggedIn===false ? 'middle flex around' : 'hidden'
        return(
        <form id="input" className={className} onSubmit={this.submitHandler}>
          <input id="textInput" name="text" onChange={this.textChangeHandler} 
                 type="text" placeholder="whats your name?" autocomplete="on"
                 style={{textAlign: 'center'}}
                 value={this.state.inputVal} />
          <input type="submit" onClick={this.submitHandler} 
                 disabled={this.state.inputVal===''} value="&#8594;" />
        </form>
    )} else return null
  }
}




class FileUploadForm extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
  return(
    <div id="uploadFileForm" className="full flex evenly"
         style={{display: this.props.display ? 'flex': 'none'}}>
      
      <form ref="some-random-text" onSubmit={ev=>this.props.fileSubmitHandler(ev)} 
             className="full flex evenly"
             style={{width:'100%'}}>
             <div onClick={this.props.openFileForm} style={{}}>←</div>
             <input type="file" name="uploadFile" />
             <input type="submit" value="Upload!" />
      </form>
      
    </div>)
  }// <div></div>
  // action="http://snapdrop.glitch.me/api/uploadFile" method="post" enctype="multipart/form-data"
}




class App extends React.Component{
  constructor(props){
    super(props)
    
    const userName = localStorage.getItem('userName')
    const lastRoom = localStorage.getItem('lastRoom')
    
    socket = io('https://snapdrop.glitch.me?room='+lastRoom)
    //socket = io('https://snapdrop.glitch.me',{path:'/' + lastRoom})
    console.log('socket', socket)
    
    
    this.messageHandler = this.messageHandler.bind(this)
    this.userNameHandler = this.userNameHandler.bind(this)
    this.getRoomContent = this.getRoomContent.bind(this)
    this.fileHandler = this.fileHandler.bind(this)
    this.openFileForm = this.openFileForm.bind(this)
    this.fileSubmitHandler = this.fileSubmitHandler.bind(this)
    this.displayWarning = this.displayWarning.bind(this)
    
    
    
    /*console.log(userName, lastRoom)
    if (userName && lastRoom) console.log('logged in step1')
    else console.log('not logged...')*/
    
    this.state = {
      loggedIn: userName ? true : false,
      promptUserName: false,
      userName:   userName || null,
      activeRoom: lastRoom || null,
      currentRoomStartDate: null,
      messages: null,
      warning: null,
      shouldScroll: true,
      showFileForm: false
    }
    
    if (!Notification.permission) 
          Notification.requestPermission()
          .then(result =>{
                console.log('notif permission', result)
    }) 
    else console.log(Notification.permission)
    
  }
  componentDidMount(){
    //console.log('mounted state', this.state)
    if (this.state.activeRoom) this.getRoomContent(this.state.activeRoom)
    
    
    
    socket.on('msg', msg=>{
        console.log('new socket msg', msg)
        if (this.state.activeRoom === msg.room) {
          
            
          
            this.setState((prev, props)=>{
                prev.messages.push(msg)
                return {messages: prev.messages, shouldScroll: true}
            })
        } else spawnNotification(`New msg in room ${msg.room.toUpperCase()}`, `~ ${msg.from} ~ wrote something`)
    })
  }
  
  userNameHandler(string){
    localStorage.setItem('userName', string)
    this.setState({userName: string, loggedIn: true})//, promptUserName: false})
  }
  messageHandler(text){
    //console.log('new msg inputed', text, Date.now() )
    socket.emit('msg',{ room: this.state.activeRoom, from: this.state.userName, text:text.toString().trim(), timeStamp: Date.now()} )
  }
  fileHandler(ev){

      console.log('file ev',ev.target.files)
    
      const file = ev.target.files[0],
            reader = new FileReader()
      
      if (!file) return console.log('no file')
    
      if (file.size>5*1000*1000) {
          console.error('file too big')
          return this.displayWarning('File too big, 5Megs is maximum', 4500)
      }
      
      reader.onloadend = ev => {
          console.log('loadend')
          let fileBuffer = ev.target.result, 
              fileName = encodeURI(file.name), //  encodeURIComponent   .replace(/\s/g, '-') ),
              fileType = file.type,
              activeRoom = this.state.activeRoom, userName = this.state.userName;

          console.log(activeRoom, userName, fileName)
          this.setState({fileReady: true},()=>
                  sendFileToServer(fileBuffer, fileName, fileType, activeRoom, userName)
                  //.then(res=>{})
          )
      }
      reader.onerror = er => console.error('er reading file');
      
      reader.readAsArrayBuffer(file)

  }
  uploadHandler(){
  }
  openFileForm(){
      if (!(this.state.activeRoom == 'me' || this.state.activeRoom == 'ku' || 
            this.state.activeRoom == 'mak'|| this.state.activeRoom == 'vlad' )){
        this.displayWarning('not possible here')
        return console.error('not for you')
      }  

      this.setState({showFileForm: !this.state.showFileForm})
  }
  fileSubmitHandler(ev){
        console.log('file submitted')
        ev.preventDefault()
        console.log('submit', document.querySelector('input[type="file"]').files )
        const room = localStorage.getItem('lastRoom') //document.querySelector('#loginForm').userName.value
        //const pass = document.querySelector('#loginForm').pass.value
        let formData = new FormData();
        formData.append('room', room)
        formData.append("uploadFile", document.querySelector('input[type="file"]').files[0]);
        
        fetch('/api/uploadFile', {
                  method: 'POST', 
                  credentials: 'include',
                  body: formData,
                  headers: new Headers({
                    //'Content-Type': 'application/json'
                    "x-app-roomname": room,
                    "x-app-username": localStorage.getItem('userName')
                  })
        })
        .then(response=>{
          console.log(response) 
          //if (response.ok) location.pathname = '/'
          //else console.error('not authorized')
          
        })
  }
  getRoomContent(roomName){
      console.log('getRoomContent', roomName)
    
      fetch('/api/roomContent',{
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({room: roomName}),
              headers: new Headers({'content-type': 'application/json'})
      })
      .then(res=>{
        if (!res.ok) {
          
            this.displayWarning('~ not for your eyes ~')
            throw new Error('not successful');
        }
        else {
          setTimeout(()=>this.setState({ warning:null }),250)
          return res.json()
        }
      }).then(res=>{
          //console.log(res)
          this.setState({
                         messages:res.chat,
                         activeRoom: res.roomName,
                         currentRoomStartDate: res.roomStarted, 
                         shouldScroll: true
              },()=>{ 
                saveLastRoom(res.roomName)
                //console.log('app state.messages',this.state.activeRoom, this.state.messages)
          })
      }).catch(er=>{
        console.error(er)
        //this.setState({warning: 'Not for your eyes...'})
      })
  }
  
  render(){
    const loggedIn = this.state.loggedIn  //(this.state.activeRoom && this.state.userName) ? true : false
    // style={{display: this.state.showFileForm == true ? 'block': 'none'}}
    const display = (this.state.showFileForm == true) ? 'block': 'none',
          roomOK = (this.state.activeRoom == 'me' || this.state.activeRoom == 'ku' || 
                    this.state.activeRoom == 'mak' || this.state.activeRoom == 'vlad' )
    //console.log('display', display, this.state.showFileForm)
    return(
      <div id="app">
        <Rooms getRoomContent={this.getRoomContent} activeRoom={this.state.activeRoom} />
        <Chat  messages={this.state.messages} activeRoom={this.state.activeRoom}
               loggedIn={this.state.loggedIn} scroll={this.state.shouldScroll}
               started={this.state.currentRoomStartDate} loggedIn={this.state.loggedIn}/>
        
        <Input type="msg"  room={this.state.activeRoom} 
               loggedIn={(this.state.loggedIn && this.state.activeRoom)? true: false} 
               fileHandler={this.fileHandler} fileReady={this.state.fileReady} 
               uploadHandler={this.uploadHandler} openFileForm={this.openFileForm}
               user={this.state.userName} inputHandler={this.messageHandler} 
               makeBottomSpace={this.state.showFileForm} display={!this.state.showFileForm}/>
        
        <FileUploadForm fileSubmitHandler={this.fileSubmitHandler} 
             display={this.state.showFileForm && roomOK}
             openFileForm={this.openFileForm}/>
        
        <Input type="userName" loggedIn={this.state.loggedIn} user={null} 
               inputHandler={this.userNameHandler}/>
        <Blocker  display={!this.state.loggedIn} />
        <Warning text={this.state.warning}/>
      </div>
  )}
  displayWarning(msg = 'Sorry, something went wrong. Try again', hideMillis = 3500){
      this.setState({warning: msg, shouldScroll: false})
      setTimeout(()=>this.setState({warning: null}), hideMillis)
  }
} // 





//ReactDOM.render(<App />, test)
ReactDOM.render(<App />, appDiv) //document.body)







function saveLastRoom(name){
    if (name) return localStorage.setItem('lastRoom', name)
}

function sendFileToServer(fileBuffer, fileName, fileType, roomName, userName){

  return new Promise((resolve, reject)=>{
        console.log('before fetch', fileName, fileType, roomName, userName)
        fetch('/api/uploadFile',{
          method: 'POST',
          headers: {
              //"Content-Type": "application/octet-stream",
              "x-app-filename": fileName,
              "x-app-filetype": fileType,
              "x-app-roomname": roomName,
              "x-app-username": userName
          },
          body:fileBuffer
        })
        .then(res=>{console.log(res); return res.text()})
        .then(res=>{
          console.log(res)
          resolve(res)
        })
  })
}

function spawnNotification(body, title){
  const options = {
      body: body,
      icon: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2Fhand-small.png?1525434374837'
  }
  const n = new Notification(title, options)
}