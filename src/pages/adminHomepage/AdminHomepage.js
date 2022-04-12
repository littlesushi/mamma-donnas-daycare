// libraries
import { useState, useEffect } from "react";
import { useAuthContext }      from "../../hooks/useAuthContext";
import { useCollection }       from "../../hooks/useCollection";

// context
import TaskFilter      from "./TaskFilter";
import StudentList     from './StudentList';
import BreathingChecks from './DisplayBreathing';
import DisplayAll      from './DisplayAll';
import Diaper          from './DisplayDiaper';
import OnSite          from './DisplayOnSite'
import BreathingTimer  from './BreathingTimerAlert'
import Messaging       from './DisplayMessaging'
import Accounting      from './accounting/Accounting'
import Announcements from "./Announcements";
import Invoicing from "./SendInvoice";
import Management      from './Management';
export default function AdminHomepage() {
  const { documents, error }              = useCollection("users");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [messaging, setMessaging]         = useState(false)
  const [announcments, setAnnouncements]  = useState(false) // flag for announcments filter active
  const [present, setPresent]             = useState(false) // flag for onsite filter active
  const [breathing, setBreathing]         = useState(false) // flag for breathing checks filter active
  const [all, setAll]                     = useState(false) // flag for all filter active
  const [diaper, setDiaper]               = useState(false) // flag for diaper filter active
  const [onSite, setOnSite]               = useState(false) // flag for diaper filter active
  const [accounting, setAccounting]       = useState(false) // flag for accounting filter active
  const [invoicing, setInvoice]           = useState(false)

  const [management, setmanagement]       = useState(false) // flag for management filter active
  

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
      setAll(false)
      setDiaper(false)
      setOnSite(false)
      setMessaging(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "breathing checks") {
      setBreathing(true)

      // set all others false
      setPresent(false)
      setAll(false)
      setDiaper(false)
      setOnSite(false)
      setMessaging(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "all") {
      setAll(true)
      // set all others false
      setPresent(false)
      setBreathing(false)
      setDiaper(false)
      setOnSite(false)
      setMessaging(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)

    }
    else if(currentFilter == "diaper change") {
      setDiaper(true)

      // set all others false
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setOnSite(false)
      setMessaging(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "on-site") {
      setOnSite(true)

      // set all others false
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setMessaging(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "messaging") {
      setMessaging(true)
      
      // set all others false
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setOnSite(false)
      setAccounting(false)
      setAnnouncements(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "announcements") {
      setAnnouncements(true)

      // set all others false
      setMessaging(false)
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setOnSite(false)
      setAccounting(false)
      setInvoice(false)
      setmanagement(false)
    }
    else if(currentFilter == "accounting") {
      setAccounting(true)
      
      // set all others false
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setOnSite(false)
      setMessaging(false)
      setAnnouncements(false)
      setInvoice(false)
    }
    else if(currentFilter == "invoicing") {
      setInvoice(true)

      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setOnSite(false)
      setMessaging(false)
      setAnnouncements(false)
      setAccounting(false)
      setmanagement(false)
    }
    else if(currentFilter == "management"){  
      setmanagement(true)

      // set all others false
      setAll(false)
      setPresent(false)
      setBreathing(false)
      setDiaper(false)  
      setOnSite(false)
      setMessaging(false)
      setAnnouncements(false)
      setAccounting(false)
    }
  }

  // might not need this anymore
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

  //setTimeout( function ( ) { alert( "moo" ); }, 10000 );
  
  
  return (
    <div>
      <button style={{marginTop: '1rem'}} className='btn' onClick={() => handleClick()}>Change Filter</button>
      < BreathingTimer />
      < TaskFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      {all && < DisplayAll />}
      {present && < OnSite />}
      {breathing && < BreathingChecks />}
      {diaper && < Diaper />}
      {onSite && < OnSite />}
      {messaging && < Messaging  />}
      {announcments && <Announcements/>}
      {accounting && <Accounting/>}
      {invoicing && <Invoicing/>}
      {management && <Management/>}

    </div>
  );
}