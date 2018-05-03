const React = require('react');
const ReactDOM = require('react-dom');

const main = document.getElementById('main'),
      test = document.getElementById('app')



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
      inputVal : ''
    }
  }
  textChangeHandler(ev){
    this.setState({inputVal: ev.target.value})
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
    //console.log(`  ${this.props.type} props.loggedIn`,this.props.loggedIn)
    
    if (this.props.type==="msg" && this.props.loggedIn){
      
        const className = this.props.loggedIn ? "bottom flex around" : "hidden"
        // <div className="userName">{this.props.user}:</div>
        return(
          <form id="input" className={className} onSubmit={this.submitHandler}>

            <input id="textInput" name="text" onChange={this.textChangeHandler} 
                   type="text" placeholder={"type here"} autocomplete="off"
                   value={this.state.inputVal} />
            <input type="submit" disabled={this.state.inputVal===''}
                   onClick={this.submitHandler} value="&#9993;" />
          </form>
          
    )}     // placeholder={this.props.user + "'s secret"}
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
      shouldScroll: true
    }
  }
  componentDidMount(){
    //console.log('mounted state', this.state)
    if (this.state.activeRoom) this.getRoomContent(this.state.activeRoom)
    
    
    
    socket.on('msg', msg=>{
        console.log('new socket msg', msg)
        if (this.state.activeRoom === msg.room) this.setState((prev, props)=>{
            prev.messages.push(msg)
            return {messages: prev.messages, shouldScroll: true}
        })
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
  getRoomContent(roomName){
      fetch('/api/roomContent',{
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({room: roomName}),
              headers: new Headers({'content-type': 'application/json'})
      })
      .then(res=>{
        if (!res.ok) {
                    
            this.setState({warning: '~ not for your eyes ~', shouldScroll: false})
            setTimeout(()=>this.setState({warning: null}), 3500)
          
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
    const loggedIn = this.state.loggedIn//(this.state.activeRoom && this.state.userName) ? true : false
    return(
      <div id="app">
        <Rooms getRoomContent={this.getRoomContent} activeRoom={this.state.activeRoom} />
        <Chat  messages={this.state.messages} activeRoom={this.state.activeRoom}
               loggedIn={this.state.loggedIn} scroll={this.state.shouldScroll}
               started={this.state.currentRoomStartDate} loggedIn={this.state.loggedIn}/>
        
        <Input type="msg"      loggedIn={(this.state.loggedIn && this.state.activeRoom)? true: false} 
               user={this.state.userName} inputHandler={this.messageHandler} />
        <Input type="userName" loggedIn={this.state.loggedIn} user={null} inputHandler={this.userNameHandler}/>
        <Blocker  display={!this.state.loggedIn} />
        <Warning text={this.state.warning}/>
      </div>
  )}
}


//ReactDOM.render(<App />, test)
ReactDOM.render(<App />, document.body)

function saveLastRoom(name){
    if (name) return localStorage.setItem('lastRoom', name)
}