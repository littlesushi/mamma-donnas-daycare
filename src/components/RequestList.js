import React, { useState } from "react";
import "./RequestList.css";

import DeleteRequestModal from "./DeleteRequestModal";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function RequestList({ requestList }) {
  const [showModal, setShowModal] = useState(false);
  const [docId, setId] = useState(null);

  return (
    <div>
      {requestList.length > 0 &&
        requestList.map((doc) => (
          <div className="request-card">
            <h3 style={{ textAlign: "left" }}>Schedule Request: {getStringDateFormat(doc.request_date)}</h3>
            <p style={{ textAlign: "left", marginTop: "2px" }}>
              Requested by: ...
            </p>

            <div style={{ display: "flex"}}>
              <button
                className="btn"
                style={{ marginRight: "2px", marginTop: "4px" }}
              >
                Accept
              </button>

              <button
                className="btn"
                style={{ marginLeft: "2px", marginTop: "4px" }}
                onClick={() => {
                  setShowModal(true);
                  setId(doc.id);
                }}
              >
                Decline
              </button>
            </div>
          </div>
        ))}

      {showModal && docId && (
        <DeleteRequestModal
          closeModal={() => setShowModal(false)}
          clearDocId={() => setId(null)}
          docId={docId}
        />
      )}
    </div>
  );
}

function getStringDateFormat(date) {
  const d = new Date(date);

  //Add 1 to the current month as javascript returns a 0 based month value
  const stringDateFormat =
    WEEK_DAYS[d.getDay()] +
    " " +
    MONTHS[d.getMonth()] +
    " " +
    (d.getMonth() + 1);
  return stringDateFormat;
}
