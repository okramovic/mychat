const React = require('react')

const urlExp  = /(https?:\/\/)?(\w+\.)?\w+\.\w+(\/\S+)?/g,
      httpExp = /https?:\/\//,
      singleURL  = /\b(?:https?:\/\/)?(?:\w+\.)?(?:\S+\.\w+)(?:\/)?(?:\S+)?/, ///\b(https?:\/\/)?(\w+\.)?(\w+\.\w+)(\/)?(\S+)?/,  // /\b(https?:\/\/)?(\w+\.)?(\w+\.\w+)(\/\S+)?\b/,
      justImgExp  = /^\S+\/\S+(.jpg|.jpeg|.png|.bmp|.gif)$/,
      imgExp = /\b\S+\/\S+(.jpg|.jpeg|.png|.bmp|.gif)/



// displays month & date of message if they're different than date of previous message
const DateEl = props => {
    if (!props.prev) {
      const d = new Date(props.curr),
      currString = parseMonth(d) + ' ' + d.getDate()
      
      
      return <div className="full flex j_center dateEl">{ currString }</div>
      
    } else {
      
      const prev = new Date(props.prev.timeStamp)
      const curr = new Date(props.curr)
      
      
      if (prev.getDate() != curr.getDate() || prev.getMonth()!= curr.getMonth() || prev.getFullYear() != curr.getFullYear())
        
          return <div className="full flex j_center dateEl">{ parseMonth(curr) + ' ' + curr.getDate()  }</div>
        
      return null
    }
  
  function parseMonth(d){
    let month;
    
    switch (d.getMonth()+1){
        case 1: month = 'Jan'; break;
        case 2: month = 'Feb'; break;
        case 3: month = 'Mar'; break;
        case 4: month = 'Apr'; break;
        case 5: month = 'May'; break;
        case 6: month = 'Jun'; break;
        case 7: month = 'Jul'; break;
        case 8: month = 'Aug'; break;
        case 9: month = 'Sep'; break;
        case 10:month = 'Oct'; break;
        case 11:month = 'Nov'; break;
        case 12:month = 'Dec'; break;
      }
    return month
  }
}



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
                
                //const prev = this.props.messages[i-1] ? new Date(this.props.messages[i-1].timeStamp).getDate() : null
                //const curr = new Date(msg.timeStamp).getDate()
                
              
                return(
                  <div key={i} className="full flex vert">
                    <DateEl prev={this.props.messages[i-1]} curr={msg.timeStamp}></DateEl>
                    <div className="chatMsg">
                    
                      

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
                    </div>
                  </div>)
        })
      )
  }
  componentDidUpdate(){
      //console.log('messages updated, scroll?', this.props.scroll)
  }
}



const LoadMoreButton = props =>{
    //console.log('LoadMoreButton loggedin?', props.loggedIn)
    //if (props.loggedIn) 
    if (!props.inProgress)
      return (<div className="full flex j_center">
                  <button className="loadMoreMessagesButton" onClick = {props.loadMoreMessages}>load 10 more</button>
              </div>)
  
    else return(<div className="full flex j_center">
                  <button className="loadMoreMessagesButton white_border">~ loading ~ </button>
                </div>)
}




class Chat extends React.Component{
  constructor(props){
      super(props)
      
      this.scrollHandler = this.scrollHandler.bind(this)
    
      this.state = {
        lastRoom: this.props.activeRoom
        //loggedIn: (name && lastRoom) ? true : false //this.props.loggedIn
      }
  }
  componentDidMount(){
      window.addEventListener('scroll', this.scrollHandler)
  }
  componentWillUnmount(){
      window.removeEventListener('scroll', this.handleScroll);
  }
  render(){
        if (!this.props.loggedIn) return null;
        else if (!this.props.activeRoom) {
          return <div style={{minHeight: 'calc(100vh - 61px)'}} className="withImage flex vert j_center"></div>
        }
    
        //  <h1 className="alignCenter noMargin white">It is very quiet here... Pick-a-room</h1>    
    
        return(
          <div id="chatContainer" style={{marginBottom: "95px"}} >
            <h1 className="chatMsg alignCenter" >Galactic time: { this.props.started || Date.now() }</h1>
            
            <LoadMoreButton loggedIn={this.props.loggedIn} loadMoreMessages={this.props.loadMoreMessages} 
                            inProgress={this.props.msgLoadInProgress} />
            
            <Messages messages={this.props.messages} started={this.props.started}/>
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
      }
  }
  
  scrollHandler(ev){
      //console.log(window.innerHeight, window.scrollY, document.querySelector('#chatContainer').getBoundingClientRect().height)
      if (window.scrollY == 0) this.props.loadMoreMessages()
    
      //const rect = document.querySelector('#chatContainer').getBoundingClientRect()
      //if (rect.height - rect.bottom == window.scrollY) console.log('––– bottom !')
      /*this.setState((prev)=>{
          let scrolling

          //if (prev.scrollY !== window.scrollY) scrolling = true

          return {scrollY: window.scrollY}
      }, x =>{
        console.log('callback', x, this.state.scrollY)
      })*/
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