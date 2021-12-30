import React from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';

const App = () => {
  return (
  <Router>
      <MainNavigation/>
    <main>
      <Routes>
            <Route path="/" element={<Users/>} exact/>
            <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
            <Route path="/places/new" element={<NewPlace/>} exact/>
            <Route path="/places/:placeId" element={<UpdatePlace/>}></Route>
            <Route path="/auth" element={<Auth/>}></Route>
      </Routes>
    </main>
     
  </Router>
  );
};

export default App;
