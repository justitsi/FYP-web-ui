import './App.scss'
import styles from './App.module.scss'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar';

import Homepage from './content/Home';
import Projectpage from './content/Project';
import NewProjectpage from './content/NewProject';
import OutputPage from './content/Output';

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
            <Route exact path='/output/:id'>
              <OutputPage />
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
