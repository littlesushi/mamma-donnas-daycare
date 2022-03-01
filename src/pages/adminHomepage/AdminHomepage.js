// libraries
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// context
import TaskFilter from "./TaskFilter";

import StudentList from './StudentList';
import OnSite from './OnSite';
import BreathingChecks from './BreathingChecks';

export default function AdminHomepage() {
  const { documents, error }              = useCollection("users");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [present, setPresent]             = useState(false) // flag for onsite
  const [breathing, setBreathing]         = useState(false) // flag for breathing checks

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  // Need to use a button in order to prevent an infinite rendering loop
  const handleClick = () => {
    console.log("change filter is called")
    if(currentFilter == "on-site") {
      setPresent(true)

      // set all others false
      setBreathing(false)
      console.log("Present is currently ", present)
    }
    else if(currentFilter == "breathing checks") {
      setBreathing(true)

      // set all others false
      setPresent(false)
      console.log("Breathing is currently ", breathing)
    }
    else if(currentFilter == "all") {
      // set all others false
      setPresent(false)
      setBreathing(false)
    }
  }



  const students = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          default:
            return true;
        }
      })
    : null;

 

  return (
    <div>
      <h1>Hello Donna!</h1>
      <h1>The current filter is: {currentFilter}</h1>
      <button className='btn' onClick={() => handleClick()}>Change Filter</button>
      < TaskFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      {/* < StudentList students={students} /> */}
      {present && < OnSite />}
      {breathing && < BreathingChecks />}
    </div>
  );
}

// // libraries
// import { useState, useEffect } from "react";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { useCollection } from "../../hooks/useCollection";

// // context
// import Taskfilter from "./TaskFilter";

// // components
// import StudentList from './StudentList';
// import ExperimentOnSite from './ExperimentOnSite';

// export default function AdminHomepage() {
//   const { documents, error } = useCollection("users");
//   const [currentFilter, setCurrentFilter] = useState("all");

//   // experiment
//   const [ displayPresent, setDisplayPresent] = useState(false)

//   const changeFilter = (newFilter) => {
//     setCurrentFilter(newFilter);
//   };

//   // fires when this component is first called and when the response state changes
//   // this will be used to clear the text inputs after a successful add to the database operation
//   useEffect(() => {
//     if(currentFilter == 'on-site') {

//         console.log('The program is trying to run on site')
//     } 
//   }, [currentFilter])

//   // if return true, keep it, false toss it out
//   const students = documents ? documents.filter((document) => {
//       switch (currentFilter) {
//           case 'all':
//               return true
//           case 'breathing Checks':
         
//               return true
//           case 'diaper':
//           case 'on-site':
//             // try to call another page
//             setDisplayPresent(true);
//             return true
//           case 'messaging':
//           case 'announcements':
//               console.log(document.category, currentFilter)
//               return document.category === currentFilter
//           default:
//               return true
//       }
//   }) : null

//   setDisplayPresent(false)

//   return (
//     <div>
//       <h1>Hello Donna!</h1>
//       < Taskfilter currentFilter={currentFilter} changeFilter={changeFilter} />
//       < StudentList students={students} />
      
//     </div>
//   );
// }