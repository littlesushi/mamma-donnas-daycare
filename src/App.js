// libraries
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navbar from "./components/Navbar";

// pages
import Home           from "./pages/customerHomepage/CustomerHomepage";
import Login          from "./pages/login/Login";
import Signup         from "./pages/signup/Signup";
import GuardianInfo   from "./pages/guardianInfo/GuardianInfo";
import AdminHomepage  from "./pages/adminHomepage/AdminHomepage";
import LessonPlanPage from "./pages/lessonPlan2/lessonPlan22";
import Billing        from "./pages/billingPage/Billing";
import RequestsPage   from "./pages/requestPage/Requests";
import Accounting     from "./pages/accounting/Accounting";
import AddLessonPlanPage from "./pages/adminHomepage/AddLessonPlanPage";


// styles
import "./App.css";
import { useState } from "react";
import RequestModal from "./components/RequestModal";

function App() {
  // - the variable user is Used to pass the user id number into the forms so we can use it later
  // for example to show only the documents related to a specific user
  // -this is used to delay rendering until auth is complete so only the right content is shown
  // otherwise for an instant the wrong info is shown to the user, prevents render until authIsReady is true
  const { authIsReady, user } = useAuthContext(); // user is used for route guarding, user is used as a flag
  //to indicate a user is logged in and is allowed to access the home route, note route guarding below
  // using a shorthand if statement

  //State hook used to show/hide the request a day modal.
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar showModal={() => setShowRequestModal(true)} />

          {showRequestModal && (
            <RequestModal closeModal={() => setShowRequestModal(false)} />
          )}

          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/guardianInfo" />}
            />
            <Route
              path="/guardianinfo"
              element={
                user ? (
                  <GuardianInfo uid={user.uid} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/billing"
              element={user ? <Billing /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                user ? <AdminHomepage uid={user.uid} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/request"
              element={user ? <RequestsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/lessonPlan"
              element={user ? <LessonPlanPage /> : <Navigate to="/login" />}
            />         
            <Route 
              path="/accounting"
              element={user ? <Accounting /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path='addLessonPlan' 
              element={user ? < AddLessonPlanPage /> : <Navigate to='/login'/> } />   
                
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
