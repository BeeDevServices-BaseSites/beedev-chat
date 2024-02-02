import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'
import { useLocation } from 'react-router-dom'

function ChatRoom(){

    const location = useLocation();
    const { chatID, projectID, chatAccessKey, senderUsername } = location.state || {}
    console.log('info from state', chatID, projectID, chatAccessKey, senderUsername)

    if (!chatID || !projectID || !chatAccessKey || !senderUsername) {

        return <p>Error: Missing required information</p>;
    }



    return (
        <>
        <ChatEngineWrapper>
            <ChatSocket 
                projectID={projectID}
                chatID={chatID}
                chatAccessKey={chatAccessKey}
                senderUsername={senderUsername}
            />

            <ChatFeed activeChat={chatID} /> 
        </ChatEngineWrapper>
        </>
    )
}

export default ChatRoom