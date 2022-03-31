// This is a component that will only appear inside customer home

import "./Messages.css";

import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Messages() {

	const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);

	useEffect(() => {

        //Request snapshot of annoucements
		const unsub = projectFirestore.collection("Announcements").orderBy('timeStamp', 'desc').onSnapshot(
			(snapshot) => {
				if (!snapshot.empty) {
                    let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ ...doc.data() });
					});
                    console.log("results size: " +results.length)
					setAnnouncements(results);
                    setError(null);
				}
                else{
                    setError("No new announcements");
                }
			}, (err) => {setError(err.message)});

        //Stop unsubscribe from snapshot updates when navigating away from this page
        return () => unsub()
	}, []);

	return (
		<div className="announcements-container">
			<h2>Announcements</h2>
            
            {!error && announcements && announcements.length > 0 && (announcements.map((annoucement) => (
                <div className="announcement-container">
                    <h3>
                        {annoucement.title}
                    </h3>
                    <p>{annoucement.date}</p>
                    <p style={{marginTop: '1rem', marginBottom: '1rem'}}>{annoucement.body}</p>
                </div>
            )))}

            {error && (
                <h3>No new announcements</h3>
            )}

		</div>
	);
}
