// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import StudentCheckInOut from './StudentCheckInOut'
import Messages from './Messages'

// styles
import './CustomerHomepage.module.css'

export default function CustomerHomepage() {

    const { authIsReady, user } = useAuthContext() 

    return (
        <div>
            <h2>Welcome!</h2>
            < StudentCheckInOut uid={user.uid}/>
            < Messages />
        </div>
    )
}
