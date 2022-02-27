import React, { useState } from "react";
import "./RequestList.css";
import { projectFirestore } from "../firebase/config";

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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {activeTab === 0 && <h2>Schedule Requests</h2>}
      {activeTab === 1 && <h2>Accepted Requests</h2>}

      <div
        style={{
          display: "flex",
          width: "45%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "4px",
        }}
      >
        <button
          className="btn"
          style={{ marginRight: "2px", marginTop: "4px" }}
          onClick={() => setActiveTab(0)}
        >
          Schedule Requests
        </button>

        <button
          className="btn"
          style={{ marginLeft: "2px", marginTop: "4px" }}
          onClick={() => setActiveTab(1)}
        >
          Accepted Requests
        </button>
      </div>

      {activeTab === 1 && <h3>Display accepted requests here</h3>}

      {activeTab === 0 &&
        requestList.length > 0 &&
        requestList.map((doc) => (
          <div className="request-card">
            <h3 style={{ textAlign: "left" }}>
              Schedule Request: {getStringDateFormat(doc.request_date)}
            </h3>
            <p style={{ textAlign: "left", marginTop: "2px" }}>
              Requested by: ...
            </p>

            <div style={{ display: "flex" }}>
              <button
                className="btn"
                style={{ marginRight: "2px", marginTop: "4px" }}
                onClick={() => {
                  try {
                    projectFirestore
                      .collection("AcceptedRequests")
                      .add({ accepted_request_date: doc.request_date });

                    projectFirestore
                      .collection("requests")
                      .doc(doc.id)
                      .delete();
                  } catch (error) {
                    alert("Error accepting request. Please try again.");
                  }
                }}
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
