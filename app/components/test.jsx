const React = require('react')
const ReactDOM = require('react-dom')

const Test = props =>{
  return(<div>
      <h1>hi this is test element</h1>
      <p>and this some text</p>
    </div>
  )
}

ReactDOM.render(<Test />, document.querySelector('#app'))