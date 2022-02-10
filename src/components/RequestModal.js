import React from "react";
import "./RequestModal.css";

export default function RequestModal({ closeModal }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select a Date to Request</h2>
        <button onClick={closeModal}>close</button>
      </div>
    </div>
  );
}
