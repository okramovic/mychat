/*const React = require('react')
const ReactDOM = require('react-dom')

const Test = props =>{
  return(<div>
      <h1>hi this is test element</h1>
      <p>and this some text</p>
    </div>
  )
}

//ReactDOM.render(<Test />, document.querySelector('#app'))
module.exports = Test
*/

/*const React = require('react')

function App(){

    return (<div>
        Hello World
      </div>
    )
}

export default App*/

import React, { Component } from 'react'

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        Hello {this.props.data.map((el,i)=>{
            return <h3 key={i}>{el} hi hi</h3>
      })}
      </div>
    )
  }
}

//export default App
//module.exports= App