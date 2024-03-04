// eslint-disable-next-line no-unused-vars

/**
 * @fileoverview Composant représentant la page d'accueil de l'application.
 * @module Home
 */

// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Home.css'
import CreateEmploye from '../../components/CreateEmploye/CreateEmploye.jsx'
import Menu from '../../components/Menu/Menu'

/**
 * Composant fonctionnel représentant la page d'accueil.
 * @returns {JSX.Element} Élément JSX représentant la page d'accueil.
 */
const Home = () => {
  return (
    <div className="home-container">
      {/* Affiche le menu de navigation */}
      <Menu />
      {/* Affiche le composant de création d'employé */}
      <CreateEmploye />
    </div>
  )
}

export default Home
