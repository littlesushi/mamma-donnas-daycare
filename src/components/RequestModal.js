import React, { useState } from "react";
import "./RequestModal.css";

export default function RequestModal({ closeModal }) {

    const [requestDate, setRequestDate] = useState(null);

    const handleRequest = (e) => {
        e.preventDefault();
        
        if(requestDate && requestDate !== ""){

            //Save request date to database
            console.log("Request Date: " +requestDate);
        }
        else{
            console.log("Invalid Request Date");
        }

        closeModal();
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
                    onChange={(e) => setRequestDate(e.target.value)} />
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
