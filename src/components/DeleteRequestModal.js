import React from "react";

import { projectFirestore } from "../firebase/config";

export default function DeleteRequestModal({ closeModal, clearDocId, docId }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Are you sure you want to decline this request?</h2>

        <textarea
          style={{ resize: "none", marginTop: "2px" }}
          placeholder="Send a (optional) message to the requestee."
        />

        <div style={{ display: "inline-flex", marginTop: "2px" }}>
          <button
            className="btn"
            style={{ marginRight: "5px" }}
            onClick={() => {
              projectFirestore.collection('requests').doc(docId).delete();
              clearDocId();
              closeModal();
            }}
          >
            Decline
          </button>

          <button
            className="btn"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              closeModal();
              clearDocId();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
