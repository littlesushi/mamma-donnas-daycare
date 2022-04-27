import React, { useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import "./RequestModal.css";

export default function RequestModal({ closeModal }) {
  const [requestDate, setRequestDate] = useState(null);
  const { user } = useAuthContext();

  const handleRequest = (e) => {
    //Prevent automatic refresh on form submission
    e.preventDefault();

    closeModal();

    //Save request date to database
    if (requestDate && requestDate !== "") {
      try {
        projectFirestore
          .collection("requests")
          .add({ request_date: requestDate, name: user.displayName, email: user.email });
      } catch (error) {
        alert("Error sending request. Please try again.");
      }
    } else {
      alert("Request date may not be empty");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select a Date to Request</h2>

        <form onSubmit={handleRequest}>
          <label style={{ textAlign: "left" }}>
            <span>Date:</span>
            <input
              type="date"
              style={{ borderColor: "#8D69F1" }}
              onChange={(e) => setRequestDate(e.target.value)}
            />
          </label>

          <div style={{ display: "inline-flex" }}>
            <button
              className="btn"
              style={{ marginRight: "5px" }}
              type="submit"
            >
              Request
            </button>

            <button
              className="btn"
              style={{ marginLeft: "5px" }}
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
