import React from "react";
import "./RequestList.css";

export default function RequestList({ requestList }) {
  return (
    <div>
      {requestList.length > 0 && requestList.map((doc) => (
        <div className="request-card">
          <h3 style={{textAlign: 'left'}}>Schedule Request by ...</h3>
          <p style={{textAlign: 'left', marginTop: '2px'}}>Date requested: {doc.request_date}</p>

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
