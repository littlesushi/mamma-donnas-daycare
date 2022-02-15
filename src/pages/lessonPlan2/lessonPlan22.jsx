// libraries 
import { Link, useNavigate } from "react-router-dom"                //Used for return link button 

// styles
import './lessonPlan22.css'

export default function lessonPlanPage() {

    return ( 
        <div>
            <h2>Momma Donna's Daycare</h2>

            <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="1000%">
            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </object>
            
            <button className="btn"> <Link to="../Home">Return</Link> </button>

        </div>
    )
}