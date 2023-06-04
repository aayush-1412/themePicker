import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as themes from "./themes/schema.json"
import { setToLS } from './utils/storage'

const Index = () => {

  setToLS('all-themes', themes.default);

  return(
    <App />
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>,
)
