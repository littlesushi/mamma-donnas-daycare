// libraries
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectFirestore } from "../../firebase/config";

// import './CustomerHomepage.module.css'

import React from "react";
import ReactDOM from "react-dom";
import "./paypal.css";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function paypal() {
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1",
          },
        },
      ],
    });
  }
  return (
    <div className="paypal">
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
      />
    </div>
  );
}
export default paypal;