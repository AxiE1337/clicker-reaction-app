import Clicker from './components/Clicker'
import Header from './components/Header'
import Reaction from './components/Reaction'
import Footer from './components/Footer'
import { AnimatePresence } from 'framer-motion'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path='/' element={<Clicker />} />
            <Route path='/reaction' element={<Reaction />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </div>
  )
}

export default App
