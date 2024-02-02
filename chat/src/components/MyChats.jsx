import { useLocation, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'


function MyChats() {
    const location = useLocation()
    const user = location.state?.user || ''
    const [theChats, setTheChats] = useState([])
    const [theMembers, setTheMembers] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const chatOptions = {
                    method: 'GET',
                    headers: {
                        "Project-ID": "c4340a48-7d0b-4a04-97d5-f8c41a967de4",
                        "User-Name": user,
                        "User-Secret": "BeeDevTechSquadServices"
                    },
                }

                const responseChats = await fetch("https://api.chatengine.io/chats/", chatOptions);
                const resultChats = await responseChats.json()

                console.log('result from chat', resultChats)
                setTheChats(resultChats)

                const membersOptions = {
                    method: 'GET',
                    headers: {
                        "PRIVATE-KEY": "90e8250f-c1de-4302-9a92-4af86f57df0d"
                    },
                }
                const responseMembers = await fetch("https://api.chatengine.io/users/", membersOptions);
                const resultMembers = await responseMembers.json()

                console.log('result from members', resultMembers)
                setTheMembers(resultMembers)



            } catch (error) {
                console.log('error', error);
                // Handle errors as needed
            }
        };

        fetchData(); // Call the fetchData function

        // You can add a cleanup function here if needed
        return () => {
            // Cleanup code, if necessary
        };
    }, [user])

    const isUserOnline = (username) => {
        const onlineMembers = theMembers.filter(member => member.is_online);
        return onlineMembers.some(member => member.username === username);
    }

    const navigateToChat = (id, access) => {
        navigate('/user-chats/', {
            state: {
                chatID: id,
                projectID: 'c4340a48-7d0b-4a04-97d5-f8c41a967de4',  
                chatAccessKey: access,  
                senderUsername: user,
            }
        });
    };

    return (
        <>
        <h1>Hello, {user}</h1>
        <h2>Your available Chat Rooms</h2>
        {theChats.length === 0 ? (
                <p>No chat rooms available</p>
            ) : (
                <ul>
                    {theChats.map((chat, index) => (
                        <li key={index}>
                        <button onClick={() => navigateToChat(chat.id, chat.access_key)}>
                            {chat.title}
                        </button>
                    </li>
                    ))}
                </ul>
            )}

<h2>All Users</h2>
            {theMembers.length === 0 ? (
                <p>No users available</p>
            ) : (
                <ul>
                    {theMembers.map((member, index) => (
                        <li key={index} style={{ fontWeight: isUserOnline(member.username) ? 'bold' : 'normal' }}>
                            {member.username}
                        </li>
                    ))}
                </ul>
            )}

            <h2>Online Users</h2>
            <ul>
                {theMembers.filter(member => member.is_online).map((onlineMember, index) => (
                    <li key={index} style={{ color: 'green' }}>
                        {onlineMember.username}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default MyChats