const React = require('react')

const urlExp  = /(https?:\/\/)?(\w+\.)?\w+\.\w+(\/\S+)?/g,
      httpExp = /https?:\/\//,
      singleURL  = /\b(https?:\/\/)?(\w+\.)?(\w+\.\w+)(\/)?(\S+)?/,  // /\b(https?:\/\/)?(\w+\.)?(\w+\.\w+)(\/\S+)?\b/,
      justImgExp  = /^\S+\/\S+(.jpg|.jpeg|.png|.bmp|.gif)$/,
      imgExp = /\b\S+\/\S+(.jpg|.jpeg|.png|.bmp|.gif)/



class Messages extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    //console.log('msg render', this.props.messages)
    if (!this.props.messages) return <h1 style={{width: '100vw', textAlign: 'center'}}>~</h1>

      return(
        this.props.messages
            .map((msg, i) =>{
                
                const els = parseTextToElements(msg.text)
                //console.log('els to render', els)
                
                return(
                  <div key={i} className="chatMsg">
                    <span className="msgAuthor" >{msg.from}:</span>
                    <span className="msgText" >{
                        
                        els.map((el,i)=>{
                          let link;      // for long img links, replace path with ... = keep visible only link's origin
                          if (el.img) {
                              //link = el.img  // el.a || el.span
                              link = el.img.replace(/(\b(?:https?:\/\/)?(?:\S+\.)?\S+\.\w+\/)(.*)/,(match,g1,g2,g3)=>{
                                        return   g1 + '...' })
                          }
                          
                          if (el.a) {
                            const href = /\bhttps?:\/\/\b/.test(el.a) ? el.a : 'http://' + el.a    // prevent links from being understood as local
                            return <a key={i} href={href} className="msgText" target="_blank">{link || el.a}</a>
                          }
                          else if (el.img) 
                                return (
                                  <a key={i} href={el.img} target="_blank" className="msgText">
                                    <img src={el.img} className="msgImgPreview" alt="image "/>
                                    <span className="imgURL">{link}</span>
                                  </a>)
                          
                          else if (el.span) return <span key={i} className="msgText">{el.span}</span>
                        })
                    }
                    </span>
                  </div>)
        })
      )
  }
  componentDidUpdate(){
      //console.log('messages updated, scroll?', this.props.scroll)
  }
}




class Chat extends React.Component{
  constructor(props){
      super(props)
      
      this.state = {
        lastRoom: this.props.activeRoom,
        //loggedIn: (name && lastRoom) ? true : false //this.props.loggedIn
      }
  }
  componentDidMount(){
    //console.log('chat: !this.props.loggedIn?', !this.props.loggedIn, !this.state.lastRoom)
    /*if (!this.props.loggedIn || !this.state.lastRoom) return console.log('!!! not fetching');
    
    //console.log('fetching room content 2')
    fetch('/api/roomContent',{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({room: this.state.lastRoom }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
    }).then(result=>{
            console.log(' - - - fetched messages',result)
          //if(result.ok) 
            if(!result.ok)  throw new Error('no data')
            else return result.json()
            
    }).then(res =>{
            //console.log('chat result', res, '\n\n', res.chat)
            this.setState({messages: res.chat, started: res.roomStarted})
    }).catch(er=>{
              console.log('error', er)
      
    })*/
    
  }
  render(){
        //console.log('chat render', this.props.messages)
        if (!this.props.loggedIn) return null;
        else if (!this.props.activeRoom) {
          //console.log('chat: not gonna render')
          return (
            <div style={{minHeight: 'calc(100vh - 61px)'}} className="withImage flex vert j_center">
              
            </div>)
        }
        //  <h1 className="alignCenter noMargin white">It is very quiet here... Pick-a-room</h1>    
    
        return(
          <div id="chatContainer" style={{marginBottom: "95px"}}>
            <h1 className="chatMsg alignCenter" >Galactic time: { this.props.started || Date.now() }</h1>
            <Messages messages={this.props.messages}
                      started={this.props.started}/>
          </div>
        ) //   || this.state.messages} 
  }
  componentDidUpdate(){
      //console.log('chat el updated, scroll?', this.props.scroll)
      if (this.props.scroll){
          const chatContainer = document.querySelector('#chatContainer')
          if (!chatContainer) return;
          const chatHeight = chatContainer.getBoundingClientRect().height
          scrollBy(0, chatHeight)
      } //else console.log('no scroll')
  }
  
}

module.exports = Chat

// https://github.com/facebook/react/issues/3386

function parseTextToElements(msg){
  
        const els = []
        //console.log(msg)
  
        // example: text + link.at  text  cool.io  plus more text  http://www.historybyzim.com/wp-content/uploads/2013/03/Miss-Atomic-1957.jpg
  
        while(msg){
            const match = msg.match(singleURL)
            if (!match) {
              return [{span: msg}]
              break
            }

            const ind = match.index,
                  len = match[0].length

            const newEl = {}
            let chunk
            
            if (ind===0){
                chunk = msg.substr(0, len)
                // images are displayed directly in feed, they are parsed to img tag
                if (imgExp.test(match)) newEl.img = chunk
                else newEl.a = chunk
            }
            else if (ind>0){
                chunk = msg.substr(0, ind)
                newEl.span = chunk
            }
            els.push(newEl)
            msg = msg.replace(chunk, '')
        }
        return els
}