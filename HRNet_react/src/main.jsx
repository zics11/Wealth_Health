import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
