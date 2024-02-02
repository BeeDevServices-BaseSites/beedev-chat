// import React from 'react';
// import { ChatEngine } from 'react-chat-engine'
// import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './components/Main'
import MyChats from './components/MyChats'
import ChatRoom from './components/ChatRoom'
import UserChats from './components/UserChat'


function App() {

  // const [theUser, setTheUser] = useState('')

	return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<MyChats />} path="/my-chats" />
        <Route element={<ChatRoom />} path="/chat" />
        <Route element={<UserChats />} path="/user-chats" />
      </Routes>
    </BrowserRouter>



		// <ChatEngine
		// 	projectID='c4340a48-7d0b-4a04-97d5-f8c41a967de4'
		// 	userName='beedev-services'
		// 	userSecret='BeeDevTechSquadServices'
		// />
	)
}

export default App