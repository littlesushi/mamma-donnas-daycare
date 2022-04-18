// libraries
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext"; //used to obtain logged in user info
import {useEffect, useState} from "react";

import menu from "./menu.svg";

// styles
import styles from "./Navbar.module.css";

export default function Navbar({ showModal }) {
    // grab the logout function from useLogout
    // The logout button calls the logout function from the hook
    const { logout } = useLogout();
    const { user } = useAuthContext(); // use the user to conditionally show nav buttons
    const navigate = useNavigate();
    const [navIcon, toggleNavIcon] = useState(false);
    

    // note fragments are used when there is isnt a parent element
    return (
        <nav className={styles.navbar + " collapsible"}>

            <Link className={styles.navbarTitle} to="/"><a>Mamma Donna's Daycare</a></Link>

            <img onClick = {() => toggleNavIcon(!navIcon)} 
                            className={styles.icon + " " +styles.navToggler +" " +(navIcon ? styles.expandedNavToggler : "")} 
                            src={menu}>
            </img>

            {!user && (
                <>
                    <ul className={styles.navbarList + " " +(navIcon ? "" : styles.collapsibleNavContent)}>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/login"><a>Login</a></Link></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/signup"><a>Signup</a></Link></li>
                    </ul>
                </>
            )}

            {user && user.role === "user" &&(
                <>
                    <ul className={styles.navbarList + " " +(navIcon ? "" : styles.collapsibleNavContent)}>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/"><a>Home</a></Link></li>
                        <li className={styles.navItem}><a className={styles.navbarLink} onClick={showModal}>Request a Day</a></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/billing"><a>Billing</a></Link></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/lessonPlan"><a>Lesson Plan</a></Link></li>
                        <li className={styles.navItem}><a onClick={logout} className={styles.navbarLink}>Log out</a></li>
                    </ul>
                </>
            )}

            {user && user.role === "admin" &&(
                <>
                    <ul className={styles.navbarList + " " +(navIcon ? "" : styles.collapsibleNavContent)}>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/"><a>Home</a></Link></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/request"><a>Schedule Requests</a></Link></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/addLessonPlan"><a>Add Lesson Plan</a></Link></li>
                        <li className={styles.navItem}><Link className={styles.navbarLink} to="/signup-codes"><a>Signup Codes</a></Link></li>
                        <li className={styles.navItem}><a onClick={logout} className={styles.navbarLink}>Log out</a></li>
                    </ul>
                </>
            )}
        </nav>
    );
}


