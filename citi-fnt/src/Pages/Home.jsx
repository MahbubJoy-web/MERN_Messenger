import React from 'react'
import ChatUserList from '../components/ChatUserList'
import ChatBox from '../components/Chatbox'

const Home = () => {
  return (
    <>
      <div className="flex flex-1">
        <ChatUserList/>
        <ChatBox/>
      </div>
    </>
  )
}

export default Home
