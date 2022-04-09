import { useContext } from 'react'
import { Button } from '@mui/material'
import { StatsContext } from './context/StatsContext'
import './styles/footer.css'

function Footer() {
  const { resetStats } = useContext(StatsContext)
  return (
    <footer>
      <ul>
        <li>
          <a
            href='https://github.com/AxiE1337/clicker-reaction-app'
            rel='noreferrer'
            target='_blank'
          >
            github
          </a>
          <Button onClick={resetStats}>Reset all stats</Button>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
