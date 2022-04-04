import { useState } from 'react'

export default function FetchBilling({collection, uid}) {
    var totalDays = 0;

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <table>

            <tr>
                <th>Date</th>
                <th>Child</th>
                <th>Due</th>
            </tr>

            {collection ? collection.map((attendance) => {
                if(attendance["uid"].match(uid) && attendance["status"].match("in")) {
                    totalDays++;
                    var TIMESTAMP = new Date(attendance.checkedIn.seconds * 1000);
                    return(
                        <tr>
                            <td>{TIMESTAMP.getMonth() + '/' + TIMESTAMP.getDay() + '/' + TIMESTAMP.getFullYear()}</td>
                            <td>{attendance.childFirstName + ' ' + attendance.childLastName}</td>
                            <td>50$</td>
                        </tr>
                    )
                }
            }): false}
            
            </table>
        </div>
    )
}