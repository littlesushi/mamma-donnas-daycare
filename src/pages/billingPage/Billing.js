// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import PayPal from '../../components/PayPal'

// styles
// import './CustomerHomepage.module.css'


export default function BillingPage() {
    const { authIsReady, user } = useAuthContext() 

    return (
        <div className="Billing">
            <h2>Your Dues:</h2>
            <h1>$$$$</h1>
            {/* user.dues */}
            <div classname="subtext">Due Dec 31 2021</div>
            
            <button className="btn">
                Pay Now
            </button>

            <div>Unpaid Days</div>
            <div>Paid Days</div>
        </div>
    )
}