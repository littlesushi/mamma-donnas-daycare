import React from "react";
import "./RequestModal.css";

export default function RequestModal({ closeModal }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select a Date to Request</h2>

        <form>
            <label style={{textAlign: "left"}}>
                <span>Date:</span>
                <input type = "date"/>
            </label>

            <div style={{display: "inline-flex"}}>
                <button style={{marginRight: "5px"}} onClick={closeModal}>Request</button>
                <button style={{marginLeft: "5px"}} onClick={closeModal}>Cancel</button>
            </div>
        </form>
      </div>
    </div>
  );
}
