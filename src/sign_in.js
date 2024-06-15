import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";




export function SignIn(props) {
    const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
        signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        props.setUser(user)
      }).catch((error) => {
        const errorMessage = error.message;

        });
    }
    return (
        <>
                <button onClick={signInWithGoogle}>Sign In</button> 

        </>
    )
}



