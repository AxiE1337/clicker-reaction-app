import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Header.css'

function Header() {
    return (
        <header>
            <Link to='/clicker'>Clicker</Link>
            <Link to='/reaction'>Reaction app</Link>
        </header>
    )
}

export default Header
