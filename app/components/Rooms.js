const React = require('react');

class Rooms extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
    this.state={rooms:[]}
  }
  componentDidMount(){
    //console.log('rooms mounted')
    fetch('/api/rooms',{
        credentials: 'include'
    })
    .then(result => result.json() )
    .then(result =>{
          //console.log('rooms', result)
          this.setState({rooms: result.rooms})
    })
  }
  logout(){
    localStorage.removeItem('userName')
    localStorage.removeItem('lastRoom')
    open('/logout','_self')
  }
  render(){
    //console.log('Rooms component rerender - active room?',this.props.activeRoom )
    const rooms = this.state.rooms.map((room,i)=>{
                    const roomName = room.replace(/.json$/,'')
                    return <button key={i} 
                            className={(this.props.activeRoom === roomName)? "roomButton buttonActive" : "roomButton buttonInactive" }
                            onClick={()=>this.props.getRoomContent(roomName) }
                    >{roomName}</button>
    })
    return(
    <div id="roomsRow" className="flex overFlowHoriz">
      {rooms}
      <button className="roomButton" onClick={this.logout}>logout</button>
    </div>
  )}
}

module.exports = Rooms