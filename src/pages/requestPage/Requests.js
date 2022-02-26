import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { projectFirestore } from "../../firebase/config";

export default function Requests() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    projectFirestore
      .collection("requests")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No pending schedule requests");
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          setData(results);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Requested Days</h2>

      {isLoading && <h2>Loading schedule requests</h2>}

      {error && <p>{error}</p>}

      <Link to="../Home">
        <button style={{ marginTop: "10px" }} className="btn">
          Return
        </button>
      </Link>

    </div>
  );
}
