// libraries
import { Link, useNavigate } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext' //used to obtain logged in user info

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  // grab the logout function from useLogout
  // The logout button calls the logout function from the hook
  const { logout } = useLogout()
  const { user } = useAuthContext() // use the user to conditionally show nav buttons
  const navigate = useNavigate()

  // note fragments are used when there is isnt a parent element
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Mamma Donna's Daycare</li>
        
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        
        {user && (
          <>
          <li>Hello, {user.displayName}</li>
          <li>
            <button className="btn" onClick={logout}>Logout</button>
            <button className="btn">Request A Day</button>
            <button className="btn">Billing</button>
            <button className="btn">Today's Lesson Plan</button>
            {user.uid == 'wU6vh4YallXK5wWMtpMT96gDIi52' && <button className="btn"><Link to="/admin">Admin</Link></button>}
          </li>
          </>
        )}
        
      </ul>
    </nav>
  )
}
