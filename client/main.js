import React from 'react'
import { render as h } from 'react-dom'
import App from './components/App'
import '../imports/db/main'
const root = document.getElementById('root')
h(<App />, root)