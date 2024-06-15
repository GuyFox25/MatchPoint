import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { collection, addDoc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { signInWithRedirect } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";


export function Chat(props) {
    const [chatSnapshots, setChatSnapshots] = useState(null)
    const [currChatSnapshot, setCurrChatSnapshot] = useState(null)
    const db = getFirestore(props.app);
    // const startNewChat = async (chatName, user) => {
    //     const chats_collection = collection(db, "chats");
    //     const docRef = await addDoc(chats_collection, {chatName: chatName, user: user, data: {}});
    //     const docID = docRef.id;
    //     return docRef;
    // }
    
    const sendMessage = async (chatRef, user, data) => {
        const key = new Date();
        const value = {data: data, sender: user.displayName};
        //const chats_collection = collection(db, "chats");
        //const docRef = await doc(db, chats_collection + '/' +chatID);
        const chat = await getDoc(chatRef);
        const chatDoc = await chat.data()
        if(chatDoc.data === null) {
            chatDoc.data = {};
        }
        chatDoc.data[key] = value;
        await setDoc(chatRef, chatDoc);
        return chatRef.id;
    }

    const getAllChats = async () => {
        let chats
        const chats_collection = collection(db, "chats");
        const snapShot = await getDocs(chats_collection);
        chats = snapShot.docs;
        // let chat_names = chats.map(chat => chat.chatName);
        // debugger
        return chats
    }
    const setMyChats = async () =>{
        const chats = await getAllChats();
        setChatSnapshots(chats)
    }
    
    
    const ChatRoom = (props) => {
        let message
        const update = (e) => {
             message = e.target.value
        }

        const getMessages = () => {
            let messageArray = []
            const data = currChatSnapshot.data().data; 
            if (data === null) {
                return [];
            } 
            let keys = Object.keys(data);
            keys = keys.sort();
            let messages = keys.map(function(key) {
                return {message: data[key].data, username: data[key].sender};
            })
            return messages;
        }
        
        const submitMessage = async () => {
            await sendMessage(currChatSnapshot.ref, props.user, message);
            
        }

        // useEffect(()=>
        //     {const unsub = onSnapshot(currChatSnapshot.ref, (doc) => {
        //         setCurrChatSnapshot(doc)
        //     });
        //     return unsub;}, []
        // )


        return (
        <>
        <p>chat {props.currChatSnapshot.data().chatName}</p>
        {getMessages().map(message => (<li>{message.username}: {message.message}</li>))}
        <input type="text" onChange={update}/>
        <input type="button" onClick={submitMessage} value = 'Send Message'/>
        </>
        );
    }


    useEffect(()=>{
        setMyChats() 
    },[])
    if(chatSnapshots=== null){
       return null 
    }
    return (
        <>
        <ul>
        {chatSnapshots.map(chatSnapshot => (<li onClick={()=>{setCurrChatSnapshot(chatSnapshot)}}>{chatSnapshot.data().chatName}</li>))}
        </ul>
        {(currChatSnapshot === null)? null: (<ChatRoom currChatSnapshot = {currChatSnapshot} user = {props.user}/>)};
        </>
    )
}


