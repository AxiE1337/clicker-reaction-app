import Clicker from './components/Clicker';
import Header from './components/Header';
import Reaction from './components/Reaction';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation, Redirect} from 'react-router-dom';

function App() {

  const location = useLocation()

  return (
      <div className="App">
        <Header />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <Clicker />
            </Route>
            <Route path="/reaction">
              <Reaction />
            </Route>
            <Redirect to={location.pathname} />
          </Switch>
        </AnimatePresence>
        <Footer />
      </div>
  );
}

export default App;
