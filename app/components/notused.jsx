const React = require('react')

class UserName extends React.Component{
  constructor(props){
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.state = {
      show: false,
      inputVal: ''
    }
    //console.log('props',this.props)
  }
  textChangeHandler(ev){
    this.setState({inputVal: ev.target.value})
  }
  submitHandler(ev){
    ev.preventDefault()
    console.log('haha',this.state.inputVal)
    if (!this.state.inputVal) return alert('choose a name pls')
    //localStorage.setItem('userName')
  }
  render(){
    return(
      <form className={this.props.display ? 'promptUser' : 'hidden'} onSubmit={this.submitHandler}>
        <h3>whats your name?</h3>
        <input type="text" onChange={this.textChangeHandler} placeholder="Shimoto Masaki?" />
        <input type="submit" value="go" />
      </form>
    )
  }
}