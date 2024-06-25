// Import necessary Firebase Authentication functions
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// SignIn Component
export function SignIn(props) {
    // Function to handle sign in with Google
    const signInWithGoogle = () => {
        // Create a new GoogleAuthProvider instance
        const provider = new GoogleAuthProvider();
        
        // Get the Firebase Auth instance
        const auth = getAuth();

        // Sign in with popup using the Google provider
        signInWithPopup(auth, provider)
            .then((result) => {
                // Get the signed-in user
                const user = result.user;
                
                // Set the user state in the parent component
                props.setUser(user);
            })
            .catch((error) => {
                // Log any errors   
                console.error("Error during sign in:", error.message);
            });
    };

    // Render the SignIn component
    return (
        <div className="center">
            <div className="title">FIND YOUR PERFECT TENNIS OPPONENT</div>
            <div className="sub_title">WITH MATCH POINT</div>
            <button className="btn-sign-in" onClick={signInWithGoogle}>Sign In</button>
        </div>
    );
}
