import { useState } from 'react'

export default function FetchBilling({collection}) {

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <table>

            <tr>
                <th>Date</th>
                <th>Child</th>
                <th>Due</th>
            </tr>

            {collection ? collection.map((invoice) => {
                    var TIMESTAMP = new Date(invoice.createdAt.seconds * 1000);
                    return(
                        <tr>
                            <td>{(TIMESTAMP.getMonth() + 1) + '/' + TIMESTAMP.getDate() + '/' + TIMESTAMP.getFullYear()}</td>
                            <td>{invoice.child ? invoice.child: "null"}</td>
                            <td>${invoice.amount}</td>
                        </tr>
                        
                    )
                
            }): false}
            </table>
        </div>
    )
}


