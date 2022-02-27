import React from "react";

export default function DeleteRequestModal({ closeModal }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Are you sure you want to decline this request?</h2>

        <textarea style= {{resize:'none', marginTop: '2px'}} placeholder="Send an optional message to the requestee."/>

        <div style={{ display: "inline-flex", marginTop: '2px'}}>
          <button className="btn" style={{ marginRight: "5px" }}>
            Delete
          </button>

          <button
            className="btn"
            style={{ marginLeft: "5px" }}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
