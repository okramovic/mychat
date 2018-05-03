const React = require('react')

const Blocker = props =>{
  return (
    <div id="blocker" className={props.display ? '' : 'hidden' }></div>
  )
}
//<div className="userName">{this.props.user}:</div>

const Warning = props =>{
  const className = props.text ? "alignCenter warnActive" :  "alignCenter warnHidden"
  return (<h1 id="warning" className={className} >{props.text}</h1>)
  /*if (props.text) 
  else return null*/
}
module.exports = {Blocker, Warning}