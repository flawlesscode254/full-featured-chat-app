import { Button, Input } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import Received from './music/note.mp3'
import AttachmentIcon from '@material-ui/icons/Attachment';
import 'firebase/storage'



import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyCkmvDNXY-qPXyFuFsfEqDUNtLfQ1Ww764",
  authDomain: "messenger-clone-94aa1.firebaseapp.com",
  projectId: "messenger-clone-94aa1",
  storageBucket: "messenger-clone-94aa1.appspot.com",
  messagingSenderId: "552364157176",
  appId: "1:552364157176:web:c93350194f54836029730d",
  measurementId: "G-TN730N5Y1R"
})

const auth = firebase.auth();
const db = firebase.firestore();
const store = firebase.storage()

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="signed">
      <Button variant="contained" color="primary" className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <Button variant="outlined" style={{marginTop: '10px'}} color="primary" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}


function ChatRoom() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('')
  const[image, setImage] = useState(null)
  const[progress, setProgress] = useState(0)

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("name_user").innerHTML = user.displayName
      document.getElementById('mew').src = user.photoURL
    } else {
      // No user is signed in.
    }
  });

  
 

  useEffect(() => {
      db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => (
          {
            id: doc.id,
            vims: doc.data(), 
            message: doc.data(), 
            new_time: doc.data()
          })))
      }) 
          
  }, [] )

  let one_song = new Audio(Received)

  useEffect(() => {
      one_song.play()
  }, [messages])
  

  useEffect(() => {
    setUsername(document.getElementById('name_user').innerHTML)
  }, [])

  useEffect(() => {
    const refer = document.getElementById('name_user').innerHTML
    if(refer === "Duncan Kipkemoi"){
      const myPost =  db.collection('online').doc("Easy Way Out Coding");
      myPost.onSnapshot(doc => {
        const data = doc.data();
        if(data.status === "Online"){
          document.getElementById("long").innerHTML = "Easy Way Out Coding is " + data.status;
        }
        else{
          document.getElementById("long").innerHTML = "Last seen " + data.status;
        }
      })
    }
    else if(refer === "Easy Way Out Coding"){
      const myPost =  db.collection('online').doc("Duncan Kipkemoi");
      myPost.onSnapshot(doc => {
        const data = doc.data();
        if(data.status === "Online"){
          document.getElementById("long").innerHTML = "Duncan Kipkemoi is " + data.status;
        }
        else{
          document.getElementById("long").innerHTML = "Last seen " + data.status;
        }
      })
    }
    
  }, [messages])

  useEffect(() => {
    const refer = document.getElementById('name_user').innerHTML
    if(refer === "Duncan Kipkemoi"){
      const myPost =  db.collection('typing').doc("Easy Way Out Coding");
      myPost.onSnapshot(doc => {
        const data = doc.data();
        if(data.state === "Typing"){
          document.getElementById("good").innerHTML = "Easy Way Out Coding is " + data.state + "...."
        }
        else{
          document.getElementById("good").innerHTML = data.state
        }
      })
    }
    else if(refer === "Easy Way Out Coding"){
      const myPost =  db.collection('typing').doc("Duncan Kipkemoi");
      myPost.onSnapshot(doc => {
        const data = doc.data();
        if(data.state === "Typing"){
          document.getElementById("good").innerHTML = "Duncan Kipkemoi " + data.state + "...."
        }
        else{
          document.getElementById("good").innerHTML = data.state
        }
      })
    }
    
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }
    
    var d = new Date();
    var e = formatDate(d);
    
    db.collection('messages').add({
      message: input,
      vims: "",
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      new_time: e,
  });

  setInput('');
    
  }


  let timeout = null;

  
  const handleChange = (e) => {
    db.collection('typing').doc(username).update({
      state: "Typing"
    })
      
      clearTimeout(timeout);
  
     
      timeout = setTimeout(function () {
        db.collection('typing').doc(username).update({
          state: ""
        })
      }, 1000);
      
  };

  const handleOff = () => {
    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }
    
    var d = new Date();
    var e = formatDate(d);
    
    db.collection('online').doc(username).update({
      status: e
    })
    document.getElementById("remind").style.opacity = 0
  }

  const handleOn = () => {
    db.collection('online').doc(username).update({
      status: "Online"
    })
    document.getElementById("remind").style.opacity = 1
  }

  const handleFile = (e) => {
    if(e.target.files[0]){
        setImage(e.target.files[0])
    }
}


  const handleUpload = (event) => {
    event.preventDefault()
    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }
    
    var d = new Date();
    var e = formatDate(d);
    const uploadTask = store.ref(`images/${image.name}`).put(image)
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
            )
            setProgress(progress)
        },
        (error) => {
            console.log(error)
            alert(error.message)
        },
        () => {
            store
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection("messages").add({
                  vims: url,
                  username: username,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  new_time: e,
                })
                setProgress(0)
                setImage(null)
            })
        }
    )
}

  return (
    <div className="App">
      <p id="good"></p>
      <p id="long"></p>
      <div className="titles">
        <img src="" alt="user" id="mew"/>
        <p id="name_user"></p>
        <h1 className="title_head">D M</h1>
        <img src="https://i.pinimg.com/originals/a8/d7/dc/a8d7dc6b29f48fe6b5201469fee2c452.gif" alt="network" id="remind"/>
      </div>

      <div className="changers">
        <Button variant="outlined" color="purple" onClick={handleOn}>Go Online</Button>
        <Button variant="contained" color="purple" onClick={handleOff}>Go Offline</Button>
      </div>
      

    <form className="app__form">
      <FormControl className="app__formControl">
     
      <label for="file-input">
        <div className="app__iconButton">
          <AttachmentIcon />
          <p>{`${progress} %`}</p>
          <IconButton
          className="app__iconButton"
           disabled={!image} 
           variant="contained" 
           color="primary" 
           type="submit"
           onClick={handleUpload}
          >
            <SendIcon />
          </IconButton>  
        </div>
        
    </label>

    <input id="file-input" type="file" accept=".gif, .png, .jpeg" onChange={handleFile} hidden/>
      <div className="spacer">
        <Input onKeyUp={handleChange} className="app__Input" placeholder="Enter a message..." value={input} 
        onChange={event => setInput(event.target.value)}/>
          <IconButton
           disabled={!input} 
           variant="contained" 
           color="primary" 
           type="submit"
           onClick={sendMessage}
          >
            <SendIcon  />
          </IconButton>
      </div>
        
      </FormControl>
    </form>
      
      <FlipMove>
        {
          messages.map(({id, message, vims, new_time}) => (
            <Message 
            key={id} 
            message={message}
            vims={vims}
            username={username}
            new_time={new_time}
            />
          ))
        }
      </FlipMove>
    </div>
  );
}


export default App;
