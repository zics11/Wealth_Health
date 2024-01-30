// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Home.css'
import CreateEmploye from '../../components/CreateEmploye/CreateEmploye.jsx'
import Menu from '../../components/Menu/Menu'

const Home = () => {
  return (
    <div className="home-container">
      <Menu />
      <CreateEmploye />
    </div>
  )
}

export default Home
