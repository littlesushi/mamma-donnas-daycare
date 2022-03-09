// libraries
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext"; //used to obtain logged in user info

// styles
import styles from "./Navbar.module.css";

export default function Navbar({ showModal }) {
  // grab the logout function from useLogout
  // The logout button calls the logout function from the hook
  const { logout } = useLogout();
  const { user } = useAuthContext(); // use the user to conditionally show nav buttons
  const navigate = useNavigate();

  // note fragments are used when there is isnt a parent element
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Mamma Donna's Daycare</li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
              <button className="btn" onClick={showModal}>
                Request A Day
              </button>
              <Link to="/billing">
                <button className="btn">Billing</button>
              </Link>
              <Link to="/lessonPlan">
                <button className="btn">Today's Lesson Plan</button>
              </Link>
              {user.uid == "wU6vh4YallXK5wWMtpMT96gDIi52" && (
                <li>
                <Link  to="/admin">
                  <button className="btn">Admin</button>
                </Link>
                  

                  <Link to="/request">
                    <button className="btn">Schedule Requests</button>
                  </Link>
                </li>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
