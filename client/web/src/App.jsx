import { useState } from 'react';
import AuthContext from './context/auth-context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Appointments, Auth, Dashboard, DonationCenters, Donors, Layout, Login, Logout, PageNotFound, Protected, Register, Stock } from './pages';

const App = () => {
  const session =JSON.parse(localStorage.getItem('session'));
  const [name, setName] =useState(session?.name || null);
  const [userID, setUserID] =useState(session?.userID || null);
  const [isAuth, setIsAuth] =useState(session?.isAuth || false);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, userID, setUserID, name, setName}}>
      <BrowserRouter>
        <Routes>
          <Route path='' element ={<Protected isAuth={isAuth}><Layout /></Protected>}>
            <Route index element ={<Dashboard/>}/>
            <Route path='stock' element ={<Stock/>}/>
            <Route path='donors' element ={<Donors/>}/>
            <Route path='appointments' element ={<Appointments/>}/>
            <Route path='donation-centers' element ={<DonationCenters/>}/>
          </Route>
          <Route path='account' element ={<Auth/>}>
            <Route path='login' element ={<Login />}/>
            <Route path='register' element ={<Register />}/>
          </Route>
          <Route path='/account/logout' element ={<Protected isAuth={isAuth}><Logout/></Protected>}/>
          <Route path='*' element ={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;