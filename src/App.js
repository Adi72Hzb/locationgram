import React  from 'react';
import { BrowserRouter as Router , Route, Routes , Navigate } from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';


const App = () => {
  const { token , login , logout , userId } = useAuth();
  let routes;

  if(token){
    routes =(
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
        <Route path="/places/new" element={<NewPlace/>} exact/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}></Route>
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </>
    );
  }else{
    routes = (
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn : !!token , token : token  , userId : userId , login : login , logout : logout}}>
        <Router>
        <MainNavigation/>
      <main>
        <Routes>
          {routes}
        </Routes>
      </main>
    </Router>
    </AuthContext.Provider>
  
  );
};

export default App;
