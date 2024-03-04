/**
 * @fileoverview Rendu de l'application React
 * @module index
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import Home from './pages/Home/Home.jsx'
import CurrentEmployees from './pages/CurrentEmployees/CurrentEmployees.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

/**
 * Rendu de l'application React.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/table" element={<CurrentEmployees />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
