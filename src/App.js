// libraries
import { BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Navbar from './components/Navbar';

// pages
import Home from './pages/customerHomepage/CustomerHomepage'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import GuardianInfo from './pages/guardianInfo/GuardianInfo'

// styles
import './App.css';

function App() {

  // - the variable user is Used to pass the user id number into the forms so we can use it later
  // for example to show only the documents related to a specific user
  // -this is used to delay rendering until auth is complete so only the right content is shown 
  // otherwise for an instant the wrong info is shown to the user, prevents render until authIsReady is true
  const { authIsReady, user } = useAuthContext() // user is used for route guarding, user is used as a flag
  //to indicate a user is logged in and is allowed to access the home route, note route guarding below 
  // using a shorthand if statement

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
        < Navbar />
          <Routes>
            <Route path='/' element={user ? < Home /> : <Navigate to='/login' />}/> 
            <Route path='/home' element={user ? < Home /> : <Navigate to='/login' />}/>
            <Route path='/login' element={!user ? < Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? < Signup /> :  <Navigate to='/guardianInfo' />} />
            <Route path='/guardianinfo' element={user ? < GuardianInfo uid={user.uid}/> :  <Navigate to='/login' />} />
            <Route path='*' element={< Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
