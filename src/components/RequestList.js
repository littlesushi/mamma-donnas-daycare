import React, { useState } from "react";
import "./RequestList.css";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
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

export default function RequestList({ requestList, acceptedRequestList }) {
  const [showModal, setShowModal] = useState(false);
  const [requestDoc, setRequestDoc] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuthContext();

  return (
    <div>
      {activeTab === 0 && <h2>Active Requests</h2>}
      {activeTab === 1 && <h2>Accepted Requests</h2>}

      <div
        style={{
          display: "flex",
          width: "45%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2px",
        }}
      >
        <button
          className="btn"
          style={{ marginRight: "2px", marginTop: "4px" }}
          onClick={() => setActiveTab(0)}
        >
          Active Requests
        </button>

        <button
          className="btn"
          style={{ marginLeft: "2px", marginTop: "4px" }}
          onClick={() => setActiveTab(1)}
        >
          Accepted Requests
        </button>
      </div>

      {activeTab === 0 && requestList.length === 0 && (
        <p style={{ marginTop: "4px" }}>No pending schedule requests</p>
      )}

      {activeTab === 1 && acceptedRequestList.length === 0 && (
        <p style={{ marginTop: "4px" }}>No accepted schedule requests to show</p>
      )}

      {activeTab === 0 &&
        requestList.length > 0 &&
        requestList.map((doc) => (
          <div className="request-card">
            <h3 style={{ textAlign: "left" }}>
              Schedule Request: {getStringDateFormat(doc.request_date)}
            </h3>
            <p style={{ textAlign: "left", marginTop: "2px" }}>
              Requested by: {doc.name}
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

                    //Send confirmation email
                    const templateId = 'template_ods9i3e';
                    const serviceId = 'service_dj6wilk';
                    const publicKey = '1YJ9zdyAVEMYjsQFx';

                    window.emailjs.send(serviceId, 
                                        templateId, {message: "Your schedule request on " +doc.request_date  + " with Mamma Donna's Daycare was accepted", 
                                        to_name: doc.name,
                                        from_name: "Mamma Donna",
                                        to_email: doc.email}, publicKey)


                    //update database with accepted request.
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
                  setRequestDoc(doc)
                }}
              >
                Decline
              </button>
            </div>
          </div>
        ))}

      {activeTab === 1 &&
        acceptedRequestList.length > 0 &&
        acceptedRequestList.map((doc) => (
          <div className="request-card">
            <h3 style={{ textAlign: "left" }}>
              Request Accepted: {getStringDateFormat(doc.accepted_request_date)}
            </h3>
            <p style={{ textAlign: "left", marginTop: "2px" }}>
              Requested by: {doc.name}
            </p>

            <div style={{ display: "flex" }}>
              <button className="btn" style={{ marginTop: "4px"}} onClick={() => projectFirestore.collection('AcceptedRequests').doc(doc.id).delete()}>
                Delete
              </button>
            </div>
          </div>
        ))}

      {showModal && requestDoc && (
        <DeleteRequestModal
          closeModal={() => setShowModal(false)}
          clearDocId={() => setRequestDoc(null)}
          doc = {requestDoc}
        />
      )}
    </div>
  );
}

function getStringDateFormat(date) {
  const splitString = (date += "-").split('-', 3);
  return splitString[1] + "/" + splitString[2] + "/" + splitString[0];
}
