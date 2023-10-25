/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
 import { Provider } from 'react-redux'
import './index.css'
import store from './redux/store'
// import { UserProvider } from './Context/UserContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Provider>
)