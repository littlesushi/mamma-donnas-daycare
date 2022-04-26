import React, {useRef, useEffect, useState} from "react";
 
export default function PayPal() {
 
    const paypal = useRef();
 
    useEffect(()=> {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Daycare Fee",
                            amount: {
                                currency_code: "USD",
                                value: 100.00,
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                alert("Thank you for your Payment!");
            },
            onError: (err) => {
                console.log(err);
                alert("Error");
            }
        })
        .render(paypal.current);    
    },  []);  
 
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
