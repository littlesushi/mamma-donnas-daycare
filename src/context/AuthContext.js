// libraries
import { createContext, useEffect, useReducer} from 'react'
import { projectAuth } from '../firebase/config'
import { projectFirestore } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null } 
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

// children represent whatever is wrapped in the future
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => { // only fires once when first evaluated, used to test if someone is logged in
        const unsub = projectAuth.onAuthStateChanged( async user => {// firebase says when there is a change in auth status, when there is fire this function
            const myuser = await (await projectFirestore.collection('users').doc(user.uid).get()).data();
            dispatch({ type: 'AUTH_IS_READY', payload: myuser })
            unsub()
        })
    }, []) 

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}