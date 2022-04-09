import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Header.css'
import { Button } from '@mui/material'

function Header() {
  const navigate = useNavigate()
  return (
    <header>
      <Button variant='contained' onClick={() => navigate('/')}>
        Clicker
      </Button>
      <Button variant='contained' onClick={() => navigate('/reaction')}>
        Reaction app
      </Button>
    </header>
  )
}

export default Header
