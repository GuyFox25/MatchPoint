// Import necessary Firebase and React hooks
import { getFirestore } from "firebase/firestore";
import { collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { encrypt, decrypt } from "../encryption_utils";
import '../assets/styles/App.css';

// Chat Component
export function Chat({ app, user }) {
    // State variables
    const [chatSnapshots, setChatSnapshots] = useState(null);
    const [currChatSnapshot, setCurrChatSnapshot] = useState(null);
    const [details, setDetails] = useState(null);

    // Initialize Firestore database
    const db = getFirestore(app);

    // Function to fetch and sort chat snapshots
    const fetchChats = async () => {
        const chatsCollection = collection(db, "chats");
        const snapShot = await getDocs(chatsCollection);

        // Sort chats based on level number in chat name
        const sortedChats = snapShot.docs.sort((a, b) => {
            const getLevel = (chatName) => {
                const match = chatName.match(/(\d+)/);
                return match ? parseInt(match[0], 10) : 0;
            };

            const nameA = a.data().chatName;
            const nameB = b.data().chatName;

            const levelA = getLevel(nameA);
            const levelB = getLevel(nameB);

            return levelA - levelB;
        });
        setChatSnapshots(sortedChats);
    };

    // Fetch chats on component mount
    useEffect(() => {
        fetchChats();
    }, [db]);

    // Update details when current chat snapshot changes
    useEffect(() => {
        if (currChatSnapshot !== null) {
            const info = currChatSnapshot.data().details;
            setDetails(info);
        }
    }, [currChatSnapshot]);

    // Function to send a message to a chat
    const sendMessage = async (chatRef, message) => {
        const key = new Date();
        const value = { data: encrypt(message, "pass"), sender: user.displayName };
        const chatDoc = await getDoc(chatRef).then(doc => doc.data());

        if (!chatDoc.data) {
            chatDoc.data = {};
        }
        chatDoc.data[key] = value;

        await setDoc(chatRef, chatDoc);
        setCurrChatSnapshot(await getDoc(chatRef));
        fetchChats();
    };

    // Return null if chat snapshots are not yet loaded
    if (!chatSnapshots) {
        return null;
    }

    return (
        <div className="chat-container">
            <p className="details">{details}</p>
            <ul className="chat-rooms">
                {chatSnapshots.map(chatSnapshot => (
                    <li
                        key={chatSnapshot.id}
                        onClick={() => setCurrChatSnapshot(chatSnapshot)}
                        className={currChatSnapshot && currChatSnapshot.id === chatSnapshot.id ? 'selected' : ''}
                    >
                        {chatSnapshot.data().chatName}
                    </li>
                ))}
            </ul>
            {currChatSnapshot && (
                <ChatRoom chatSnapshot={currChatSnapshot} user={user} sendMessage={sendMessage} />
            )}
        </div>
    );
}

// ChatRoom Component
function ChatRoom({ chatSnapshot, user, sendMessage }) {
    const [message, setMessage] = useState("");
    const listRef = useRef(null);

    // Scroll to the bottom of the chat when messages update
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ block: 'nearest' });
    }, [chatSnapshot]);

    // Handle message input change
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Handle message submission
    const handleSubmitMessage = async () => {
        await sendMessage(chatSnapshot.ref, message);
        setMessage(""); // Clear the message input after sending
    };

    // Get and decrypt messages from chat snapshot
    const getMessages = () => {
        const document = chatSnapshot.data();
        const data = document.data;

        if (!data) {
            return [];
        }

        return Object.keys(data)
            .sort()
            .map(key => ({
                message: decrypt(data[key].data, "pass"),
                username: data[key].sender,
            }));
    };

    return (
        <div className="chat-room">
            <ul ref={listRef} className="messages">
                {getMessages().map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message"
            />
            <button onClick={handleSubmitMessage}>Send Message</button>
        </div>
    );
}
