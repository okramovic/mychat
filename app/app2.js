'use strict'

//const React = require('react');
//const ReactDOM = require('react-dom');
import React, { Component } from 'react';

//const main = document.getElementById('main'),
      //appDiv = document.getElementById('app');



/*const Rooms = require('./components/Rooms'),
      Chat  = require('./components/Chat'),
      Blocker  = require('./components/helpers').Blocker,
      Warning = require('./components/helpers').Warning*/

//import FileUploadForm from './components/fileUploadForm';
//import Input from './components/input';

const applicationServerPublicKey = 'BF56pZXovwEOAn0eCrYXe8kj3LKL7HYWjfzpn2fqGUYBOne_R1KjJKSc_aQtlsqp3Tv2ZWj5ZVEw1wMPWt3jy3w';

let socket;


/*socket.on('serverMsg', msg =>{
    console.log('serverMsg', msg)
})*/

/*const Test = props =>{
  return(<div>
      <h1>hi this is test element</h1>
      <p>and this some text</p>

    </div>
  )
}*/

//export default Test

//ReactDOM.render(<Test />, document.querySelector('#app'))









class App extends Component{
//class App extends React.Component{
  constructor(props){
    super(props)
    
    const userName = localStorage.getItem('userName')
    const lastRoom = localStorage.getItem('lastRoom')
    
    //if (lastRoom) {
      //window.socket = io('https://snapdrop.glitch.me?room='+lastRoom)
      //socket = io('https://snapdrop.glitch.me',{path:'/' + lastRoom})
      //console.log('socket', window.socket)
    //}
    
    this.messageHandler = this.messageHandler.bind(this)
    this.userNameHandler = this.userNameHandler.bind(this)
    this.getRoomContent = this.getRoomContent.bind(this)
    this.fileHandler = this.fileHandler.bind(this)
    this.openFileForm = this.openFileForm.bind(this)
    this.fileSubmitHandler = this.fileSubmitHandler.bind(this)
    this.displayWarning = this.displayWarning.bind(this)
    this.removeWarning = this.removeWarning.bind(this)
    
    //this.refreshSocketListeners = this.refreshSocketListeners.bind(this)
    
    
    this.state = {
      loggedIn: userName ? true : false,
      promptUserName: false,
      userName:   userName || null,
      activeRoom: lastRoom || null,
      currentRoomStartDate: null,
      messages: this.props.data || null,
      warning: null,
      socketConnected: null,
      shouldScroll: true,
      showFileForm: false
    }
    
    //if (!Notification.permission || Notification.permission == 'default') 
    //      Notification.requestPermission()
    //      .then(result =>{
    //            alert('notif permission ' + result)
    // }) 
    //else console.log(Notification.permission)
    
  }
  componentDidMount(){
      if (this.state.activeRoom) this.getRoomContent(this.state.activeRoom)
                                 //refreshSocketListeners.call(this)
      //Push.Permission.request(onGranted, onDenied);
      //if (!Push.Permission.has())  Push.Permission.request()
    
      window.addEventListener("message", receivePostMessage, false); // used when? wth SSE? or window.post?
    
      if (this.state.userName) registerServiceWorker()
  }
  userNameHandler(string){
    //if (this.state.activeRoom) 
    localStorage.setItem('userName', string)
    this.setState({userName: string, loggedIn: true})//, promptUserName: false})
  }
  messageHandler(text){
    //console.log('new msg inputed', text, Date.now() )
    window.socket.emit('msg',{ room: this.state.activeRoom, from: this.state.userName, text:text.toString().trim(), timeStamp: Date.now()} )
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
      //console.log('getRoomContent', roomName)
    
      fetch('/api/roomContent',{
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({room: roomName}),
              headers: new Headers({'content-type': 'application/json'})
      })
      .then(res =>{
        
        if (!res.ok) {
          
            this.displayWarning('~ not for your eyes ~')
            throw new Error('not successful');
          
        }  else {
            setTimeout(()=>this.setState({ warning:null }),250)
            return res.json()
        }
      }).then(res =>{

          if (window.socket) {
            window.socket.emit('leave', this.state.activeRoom)
            window.socket.disconnect()
          }
        
          this.setState({
                         messages:res.chat,
                         activeRoom: res.roomName,
                         currentRoomStartDate: res.roomStarted, 
                         shouldScroll: true 
          })
            
            
          saveLastRoom(res.roomName)
          window.socket = io('https://snapdrop.glitch.me?room='+res.roomName)
          refreshSocketListeners.call(this)
          
      }).catch(er =>{
          console.error(er)
          this.displayWarning('something went wrong...', null, false)
      })
  }
  
  
  render(){
    /*const loggedIn = this.state.loggedIn  //(this.state.activeRoom && this.state.userName) ? true : false
    // style={{display: this.state.showFileForm == true ? 'block': 'none'}}
    const display = (this.state.showFileForm == true) ? 'block': 'none',
          roomOK = (this.state.activeRoom == 'me' || this.state.activeRoom == 'ku' || 
                    this.state.activeRoom == 'mak' || this.state.activeRoom == 'vlad' )
    */
    //console.log('display', display, this.state.showFileForm)
    return(<div><h1>hoy</h1> {this.props.data.map((el,i)=>{
              return (<div>
                 <h3 key={i}>{el} it works i said</h3>
               </div>
              )
        })}</div>)
    /*return(
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
               makeBottomSpace={this.state.showFileForm} 
               display={!this.state.showFileForm && this.state.socketConnected}/>
        
        <FileUploadForm fileSubmitHandler={this.fileSubmitHandler} 
             display={this.state.showFileForm && roomOK}
             openFileForm={this.openFileForm}/>
        
        <Input type="userName" loggedIn={this.state.loggedIn} user={null} 
               inputHandler={this.userNameHandler}/>
        <Blocker  display={!this.state.loggedIn} />
        <Warning text={this.state.warning}/>
      </div>
  )*/
  }
  /*displayWarning(msg = 'Sorry, something went wrong. Try again', hideMillis = 3500, hide = true){
      this.setState({warning: msg, shouldScroll: false})
      if (hide) setTimeout(()=>this.setState({warning: null}), hideMillis)
  }
  removeWarning(){
      this.setState({warning: null, shouldScroll: true})
  }*/
  
}


module.exports = App



//ReactDOM.render(<App />, appDiv)


function refreshSocketListeners(){
  
      //  https://socket.io/docs/client-api/#event-connect
  
      //console.log('refreshing socket:', window.socket)
      // Push.create('Hello World!')
      /* Push.create('Hello world!', {
          body: 'How\'s it hangin\'?',
          icon: '/images/icon.png',
          link: '/#',
          timeout: 4000,
          onClick: function () {
              console.log("Fired!");
              window.focus();
              this.close();
          },
          vibrate: [200, 100, 200, 100, 200, 100, 200]
      });*/
      //console.log(Push.Permission.has(), Push.Permission)
  
      if (!window.socket) return;
    
      window.socket.on('connect', ()=>{ 
            console.log('socket connected', new Date())
            this.setState({socketConnected: true})
            this.removeWarning()
      })
      window.socket.on('disconnect', reason =>{ 
            console.error('socket DISconnected', new Date() )
            this.setState({socketConnected: false}, ()=> this.displayWarning('refresh the page please', null, false) )
      })
      window.socket.on('error', error =>{ 
            console.error('socket Error', new Date())
            this.setState({socketConnected: false}, ()=> this.displayWarning('refresh the page please', null, false) )
            
      })
      window.socket.on('connect_timeout', timeout =>{ 
            console.error('socket connect_timeout', new Date()) 
            // window.socket.open()  ? 
      })
  
  
  
      window.socket.on('msg', msg=>{
          console.log('new socket msg', msg)
          //alert('EMIT')
          if (this.state.activeRoom == msg.room) {
                
              this.setState((prev, props)=>{
                  prev.messages.push(msg)
                  return {messages: prev.messages, shouldScroll: true}
              })
              //Push.create('Hello World!')
              //spawnNotification(`~ ${msg.from} ~ wrote something`, `New msg in room ${msg.room.toUpperCase()}`)
            
          } else spawnNotification( `~ ${msg.from} ~ wrote something`, `New msg in room ${msg.room.toUpperCase()}`)
      })
    
    
      window.socket.on('broadcast', msg =>{
          console.log('socket broadcast event', msg)
          //return alert('BC')
      })
}




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

function registerServiceWorker(){
      //return;
      if ('serviceWorker' in navigator){
            
            navigator.serviceWorker
            .register('/service-worker.js') // {scope: '/somescope'}
            .then(reg =>{
                     //console.log('Service Worker registered', reg)
                  //reg.update();
                  window.swRegistration = reg;
              
                  reg.onupdatefound = function(x){
                    //console.log('SW update found', x)
                  }
                  
                
             }).then(()=>{
                //console.log('Service Worker registered', window.swRegistration)
                return window.swRegistration.pushManager.getSubscription()  
            })
            .then(subscription=> {
                //console.log('subscr', subscription)
                window.isSubscribed = !(subscription === null);

                if (window.isSubscribed){
                    console.log('User IS subscribed.')
                    fetch('/api/subscribe',{
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'content-type': 'application/json'
                      },
                      body: JSON.stringify(subscription)
                    })
                  
                } else { 
                  console.log('User is NOT subscribed.')
                  subscribeUser()
                }
                  

            })
      
            
          navigator.serviceWorker.addEventListener('message', event => {
                console.log('msg from SW 1', typeof event.data.msg, event.data.msg, '\n\n',event.data.url);
                //navigator.serviceWorker.controller.postMessage('THIS IS CRAZY');
                if (event.data.url !== 'https://snapdrop.glitch.me') return console.error('msg not ok from', event.data.url)
            
            
                // looking for  "userName", "lastRoom"
                const msg = JSON.parse(event.data.msg),
                      keys = msg.get
                keys.forEach(key=>{
                    msg[key] = localStorage.getItem(key) 
                }) 
                //if (key !== 'userName') return console.error('not msg for username', key);
                
            
                //reply = localStorage.getItem(key)
                //if (!reply) return console.log('no reply');
            
                //msg[key] = reply
                //console.log('   reply',reply, typeof reply)
                navigator.serviceWorker.controller.postMessage(
                    JSON.stringify(
                        msg
                        //{[event.data.msg]: reply}
                    ) 
                );
            
          })
      }
}


function subscribeUser() {
  
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  
  window.swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(subscription =>{
    console.log('User is subscribed.',subscription)

    //updateSubscriptionOnServer(subscription);

    window.isSubscribed = true;

    //updateBtn();
  })
  .catch(err =>{
    console.log('Failed to subscribe the user: ', err);
    //updateBtn();
  });
}


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



function spawnNotification(title = 'check the chat', body='new notif'){
  const options = {
      body: body,
      icon: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2Fhand-small.png?1525434374837'
  }
  const n = new Notification(title, options)
}


function receivePostMessage(ev){
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    console.error('received PostMessage')
  
    if (!ev.origin.startsWith('https://snapdrop.glitch.me')) return console.log('msg event', ev);
  
    console.error('msg event', ev.origin, '\n', ev)
}