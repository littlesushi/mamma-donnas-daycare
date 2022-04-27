import React from "react";
import {useState} from "react";

import { projectFirestore } from "../firebase/config";

export default function DeleteRequestModal({ closeModal, clearDocId, doc }) {
  const [response, setResponse] = useState('');

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Are you sure you want to decline this request?</h2>

        <textarea
          style={{ resize: "none", marginTop: "2px" }}
          placeholder="Send a (optional) message to the requestee."
          onChange={(e) =>{
            setResponse(e.target.value);
          }}
        />

        <div style={{ display: "inline-flex", marginTop: "2px" }}>
          <button
            className="btn"
            style={{ marginRight: "5px" }}
            onClick={() => {
              
              //Delete request from database
              projectFirestore.collection('requests').doc(doc.id).delete();
              clearDocId();
              closeModal();

              //Send email to user stating request has been declined
              if(response.length > 0){
                //Send confirmation email
                const templateId = 'template_kz4p0zd';
                const serviceId = 'service_dj6wilk';
                const publicKey = '1YJ9zdyAVEMYjsQFx';

                window.emailjs.send(serviceId, 
                                    templateId, {request_date: doc.request_date,
                                                  reason_body: response, 
                                                  to_name: doc.name,
                                                  from_name: "Mamma Donna",
                                                  to_email: "crf125@rocketmail.com"}, publicKey)
              }
              else{
                //Send confirmation email
                const templateId = 'template_ods9i3e';
                const serviceId = 'service_dj6wilk';
                const publicKey = '1YJ9zdyAVEMYjsQFx';

                window.emailjs.send(serviceId, 
                                    templateId, {message: "Your schedule request on " +doc.request_date  + " with Mamma Donna's Daycare was declined", 
                                    to_name: doc.name,
                                    from_name: "Mamma Donna",
                                    to_email: "crf125@rocketmail.com"}, publicKey)
              }
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
