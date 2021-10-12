import './App.scss'
import styles from './App.module.scss'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from './content/Home';
import Projectpage from './content/Project';
import NewProjectpage from './content/NewProject';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Homepage />
            </Route>
            <Route exact path='/project/:id'>
              <Projectpage />
            </Route>
            <Route exact path='/new-project'>
              <NewProjectpage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
