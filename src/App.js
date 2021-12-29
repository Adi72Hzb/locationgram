import React from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
  <Router>
      <MainNavigation/>
    <main>
      <Routes>
            <Route path="/" element={<Users/>} exact={true}/>
            <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
            <Route path="/places/new" element={<NewPlace/>} exact={true}/>
      </Routes>
    </main>
     
  </Router>
  );
};

export default App;
