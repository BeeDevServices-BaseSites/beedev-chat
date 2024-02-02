import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

function Main() {

    const [theUser, setTheUser] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setTheUser(theUser)
        console.log(theUser)

        var requestOptions = {
            method: 'GET',
            headers: {
                "Project-ID": "c4340a48-7d0b-4a04-97d5-f8c41a967de4",
                "User-Name": theUser,
                "User-Secret": "BeeDevTechSquadServices"
            },
            // redirect: 'follow'
            };
            console.log('headers in main', requestOptions)

        fetch("https://api.chatengine.io/users/me/", requestOptions)
            .then(response => {
                response.text()
                console.log(response)
                if(response.status == 200) {
                    navigate('/my-chats/', { state: { user: theUser } })
                }
            })
            .then(result => {
                console.log('result in main', result.json())
            })
            // .then(result => {
            //     if(result.is_authenticated == true) {
            //         navigate('/chat/')
            //     }
            // })
            .catch(error => console.log('error', error));
    }

    return (
        <>
        <h1>Please enter your user name to proceed to chat</h1>
        <form>
            <label>
                Username:
                <input type="text" value={theUser} onChange={(e) => setTheUser(e.target.value)} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </>
    )
}

export default Main