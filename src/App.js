// Import statements
import './assets/styles/App.css';
import { SignIn } from './components/sign_in';
import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { Chat } from './components/server';
import Court from './assets/images/court.png';
import Logo from './assets/images/logo.png';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcEdhunkyj6tSbmkXJ6NRDXM79VJ1jNfk",
  authDomain: "reactmatchpoint.firebaseapp.com",
  projectId: "reactmatchpoint",
  storageBucket: "reactmatchpoint.appspot.com",
  messagingSenderId: "407382253578",
  appId: "1:407382253578:web:ca309857c231a1ea7e7ff3",
  measurementId: "G-0CX9Z7PQM7"
};

// Main App component
function App() {
  // State to manage user authentication
  const [user, setUser] = useState(null);

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header">
        <body>
          {/* Navigation Bar */}
          <nav>
            <div className="menu">
              <div className="logo">
                <img src={Logo} alt='logo' />
              </div>
              <ul>
                {/* Display user name if logged in */}
                <li>{user !== null ? (<p>{user.displayName}</p>) : null}</li>
                {/* Sign out button (only shown when user is logged in) */}
                {user === null ? null : (
                  <li onClick={() => setUser(null)}>
                    <p className='sign-out-btn'>Sign Out</p>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          {/* Background Image */}
          <div className="image-container">
            <img src={Court} alt='court' />
          </div>

          {/* Main Content */}
          <div className="center">
            {/* Conditional rendering based on user authentication */}
            {user !== null ? (
              <Chat app={app} user={user} />
            ) : (
              <SignIn setUser={setUser} />
            )}
          </div>
        </body>
      </header>
    </div>
  );
}

export default App;
