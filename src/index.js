import React from 'react'
import ReactDOM from 'react-dom'
import AppIndex from './App'
import * as serviceWorker from './serviceWorker'
ReactDOM.render(<AppIndex />, document.getElementById('root'))
serviceWorker.unregister()
