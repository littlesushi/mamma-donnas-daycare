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

        {user && user.role === "user" && (
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
            </li>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <li>Hello, {user.displayName}</li>

            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>

            <li>
              <Link to="/request">
                <button className="btn">Schedule Requests</button>
              </Link>
            </li>

            <li>
              <Link to="/adminhome">
                <button className="btn">Admin</button>
              </Link>
            </li>

            <li>
              <Link to="/addLessonPlan">
                <button className="btn">Add Lesson Plan</button>
              </Link>
            </li>

            <li>
              <Link to="/signup-codes">
                <button className="btn">Codes</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
