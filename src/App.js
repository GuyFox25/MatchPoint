import logo from './logo.svg';
import './App.css';
import  {SignIn}  from './sign_in';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import { Chat } from './chat';
const firebaseConfig = {
  apiKey: "AIzaSyBcEdhunkyj6tSbmkXJ6NRDXM79VJ1jNfk",
  authDomain: "reactmatchpoint.firebaseapp.com",
  projectId: "reactmatchpoint",
  storageBucket: "reactmatchpoint.appspot.com",
  messagingSenderId: "407382253578",
  appId: "1:407382253578:web:ca309857c231a1ea7e7ff3",
  measurementId: "G-0CX9Z7PQM7"
};

function App() {
  const [user, setUser] = useState(null)
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header">
<body>
  <nav>
    <div class="menu">
      <div class="logo">
        <a href="homepage.html"><img src="LOGO MATCH POINT2  2.png"></img></a>
      </div>
      <ul>
        <li><a href="homepage.html">HOME</a></li>
        <li><a href="levels.html">LEVELS</a></li>
        <li><a href="centers.html">CENTERS</a></li>
        <li><a href="signUp_form.html">SIGN UP</a></li>
        <li> {(user!==null)? (<p>{user.displayName}</p>): null}</li>
        
      </ul>
    </div>
  </nav>
  <div class=""><img src="court.png"></img></div>
  <div class="center">
    <div class="title">FIND YOUR PERFECT TENNIS OPPONENT</div>
    <div class="sub_title">WITH MATCH POINT</div>
    <div class="btns">
     {(user!==null)? (<Chat app = {app} user = {user} />):(<SignIn setUser = {setUser} />)}
    </div>
  </div>
</body>
      </header>
    </div>
  )}

export default App;


