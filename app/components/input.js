import React, { Component } from 'react';

class Input extends Component{
//class Input extends React.Component{
  constructor(props){
    super(props)
    //this.clickHandler = this.clickHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.keyPressHandler = this.keyPressHandler.bind(this)
    
    this.state={
      type: this.props.type,
      inputVal : '',
      rows: this.props.type=='msg'? 1 : null
    }
  }
  textChangeHandler(ev){
    
    const ww = (innerWidth * 0.55), // window width
          lw = 11                    // letter width
    let rows = Math.ceil( ev.target.value.toString().length * lw / ww )
    
    //console.log('width', ww, 'rows',rows)
    if (rows < 1)  rows=1
    else if (rows>5) rows = 5
    
    this.setState({
            inputVal: ev.target.value, 
            rows
    })
  }
  keyPressHandler(ev){
    //console.log('keypressed', ev.key, ev.target)
    //console.log(ev, ev.shiftKey)
    if (ev.key == 'Enter' && !ev.shiftKey){
        //console.log('should submit form')
        this.submitHandler(ev)
    }
  }
  submitHandler(ev){

        if (ev) ev.preventDefault()
    
        if(!this.state.inputVal) return;// this.setState({inputVal: '' });// alert('need input')
    
        // dont allow userName over 10 chars
        if (this.props.type=="userName" && this.state.inputVal.toString().length>10)
            return alert('too long name, must be under 10 characters')

        // dont allow input over limit (160 / 750)
        else if (this.props.type=="msg"){
          const limit = (this.props.room == 'bot' || this.props.room == 'pub') ? 160 : 750
          
          if (this.state.inputVal.toString().length > limit)
            return alert(`too long message, ${limit} characters is max`)
        }
    
    
    this.props.inputHandler(this.state.inputVal)
    this.setState({inputVal: '', rows: 1 }, ()=>{
        //console.log('rows>'+ this.state.inputVal + '<\n', this.state.rows)
    })
    
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
          <form id="input" className={className}  onKeyPress={this.keyPressHandler}
                style={{height: (this.state.rows*25 + 20)*1.3 + 'px',
                       bottom: this.props.makeBottomSpace? '60px' : '0' }}>
            
            <div className="icon" onClick={()=>this.props.openFileForm()}>📁</div> 
            <textarea id="textInput" name="text" onChange={this.textChangeHandler} 
                   type="text" placeholder={"type here"} autoComplete="off" 
                   cols="40" rows={this.state.rows} 
                   style={{height: this.state.rows*25*1.15 + 'px'}}
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
                 type="text" placeholder="whats your name?" autoComplete="on"
                 style={{textAlign: 'center'}}
                 value={this.state.inputVal} />
          <input type="submit" onClick={this.submitHandler} 
                 disabled={this.state.inputVal===''} value="&#8594;" />
        </form>
    )} else return null
  }
};

module.exports = Input;