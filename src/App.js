import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      setMessages(response.data)
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('0f0409e065414caa7c54', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
       <Sidebar />
       <Chat />
      </div>
      
    </div>
  );
}

export default App;
