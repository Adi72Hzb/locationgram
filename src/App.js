import React ,{ useState , useCallback , useEffect } from 'react';
import { BrowserRouter as Router , Route, Routes , Navigate } from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App = () => {
  const [token , setToken] = useState(null);
  const [tokenExpirationDate , setTokenExpirationDate] = useState();
  const [userId , setUserId] = useState(false);

  

  const login = useCallback((uid, token , expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 );
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData' , JSON.stringify({ userId : uid , token : token , expiration : tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout , remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[token , logout , tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
       login(storedData.userId , storedData.token , new Date(storedData.expiration));
    }
  } , [login]);

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
