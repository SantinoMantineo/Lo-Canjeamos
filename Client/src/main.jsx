import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import { Provider } from 'react-redux'
import './index.css'
// import store from './redux/store'
// import { UserProvider } from './Context/UserContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)