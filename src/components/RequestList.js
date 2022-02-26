import React from "react";
import "./RequestList.css";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export default function RequestList({ requestList }) {
  return (
    <div>
      {requestList.length > 0 && requestList.map((doc) => (
        <div className="request-card">
          <h3 style={{textAlign: 'left'}}>Schedule Request by ...</h3>
          <p style={{textAlign: 'left', marginTop: '2px'}}>Date requested: {getStringDateFormat(doc.request_date)}</p>

          <div style={{ display: "flex" }}>
            <button
              className="btn"
              style={{ marginRight: "2px", marginTop: '4px'}}
            >
              Accept
            </button>

            <button
              className="btn"
              style={{ marginLeft: "2px", marginTop: '4px'}}
              type="button"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function getStringDateFormat(date){
  const d = new Date(date);

  //Add 1 to the current month as javascript returns a 0 based month value
  const stringDateFormat = WEEK_DAYS[d.getDay()] + " " +MONTHS[d.getMonth()] + " " +(d.getMonth()+1);
  return stringDateFormat;
}
