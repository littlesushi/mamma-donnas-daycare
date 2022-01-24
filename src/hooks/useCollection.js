// libraries
import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null) // stores documents fetched from the database
    const [error, setError] = useState(null)

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is 'differnt' on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        // realtime listener
        let ref = projectFirestore.collection(collection)

        // if a query is passed in, then only attach the transactions that match the user id (ones inputed by this user)
        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        // snapshot represents the collection at that moment in time
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(results)
            setError(null)
        }, (error) => { // This used in place of a try catch to catch an error
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsubscribe on unmount (clean up function, stops the useEffect from continuing to run if navigate away)
        return () => unsubscribe()
    }, [collection, query, orderBy ])

    return { documents, error }
}