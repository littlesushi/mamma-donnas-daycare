import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { projectFirestore } from "../../firebase/config";

import RequestList from "../../components/RequestList";

export default function Requests() {
  const [requestList, setRequestList] = useState([]);
  const [acceptedRequestList, setAcceptedRequestList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {

    const removeRequestCallback = projectFirestore.collection("requests").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No pending schedule requests");
          setRequestList([]);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          setRequestList(results);
          setError(null);
        }
      },
      (error) => {
        setError(error.message);
      }
    );

    const removeAcceptedCallback = projectFirestore.collection("AcceptedRequests").onSnapshot(
      (snapshot) =>{
        if(snapshot.empty){
          setAcceptedRequestList([]);
        }
        else{
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          setAcceptedRequestList(results);
        }
      }
    );

    //Remove snapshot callback when navigating away from the requests page
    return () => {
      removeRequestCallback();
      removeAcceptedCallback();
    };
  }, []);

  return (
    <div>

      {<RequestList requestList={requestList} acceptedRequestList={acceptedRequestList} />}

      <Link to="../Home">
        <button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="btn"
        >
          Return
        </button>
      </Link>
    </div>
  );
}
