import React from "react";
import { useState, useEffect } from "react";
import "./SignupCodes.css";
import { projectFirestore } from "../../firebase/config";

export default function SignupCodes() {
  
  //State used to update customer and admin sign up codes
  const [adminCode, setAdminCode] = useState(null);
  const [customerCode, setCustomerCode] = useState(null);

  //State used to display current customer and admin sign up codes
  const [currAdminCode, setCurrAdminCode] = useState(null);
  const [currCustomerCode, setCurrCustomerCode] = useState(null);

  //Request a snapshot of the current codes from firestore
  useEffect(() => {

    const unsub = projectFirestore.collection('SignupCodes').doc('codes').onSnapshot((doc) => {
    
      if(doc.exists){
        const data = doc.data()
        setCurrAdminCode(data.admin_code);
        setCurrCustomerCode(data.customer_code);
      }
      else{
        setCurrAdminCode("Could not find current admin sign up code");
        setCurrCustomerCode("Could not find current customer sign up code");
      }
    });

    return () => unsub();
  }, ['codes']);

  //Update customer sign up code in firestore
  const handleCustomerCode = (e) => {

    //Clear input field after submitting
    document.getElementById("change-customer-code-form").reset();

    if (customerCode && customerCode.trim() !== "") {
      console.log("calling update");
      projectFirestore.collection("SignupCodes").doc("codes").update({
        customer_code: customerCode
      });
    }
  };

  //Update admin sign up code in firestore
  const handleAdminCode = (e) => {

    //Clear input field after submitting
    document.getElementById("change-admin-code-form").reset();

    if (adminCode && adminCode.trim() !== "") {
      console.log("calling update");
      projectFirestore.collection("SignupCodes").doc("codes").update({
        admin_code: adminCode
      });
    }
  };

  return (
    <div>
      <h2>Customer Signup Code:</h2>
      <p>Current code: {currCustomerCode}</p>
      <form id="change-customer-code-form">
        <input
          type="text"
          placeholder="Enter a new code"
          onChange={(e) => setCustomerCode(e.target.value)}
        ></input>
      </form>
      <button className="btn" onClick={handleCustomerCode}>
        Change code
      </button>

      <h2>Admin Signup Code:</h2>
      <p>Current code: {currAdminCode}</p>

      <form className="admin-form" id="change-admin-code-form">
        <input
          type="text"
          placeholder="Enter a new code"
          onChange={(e) => setAdminCode(e.target.value)}
        ></input>
      </form>
      <button className="btn" onClick={handleAdminCode}>
        Change code
      </button>
    </div>
  );
}
