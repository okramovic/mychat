/*import React, { Component } from 'react';
import {render} from 'react-dom'

//import {Test} from './components/ii'

import App from './components/helloworld'

render(
  <App />,
  document.getElementById('app')
)
*/

import React from 'react'
import { hydrate } from 'react-dom'
/*import App from './components/helloworld'*/

import App from './app2'

hydrate(
  <App data={window.__INITIAL_DATA__} />,
  document.getElementById('app')
);