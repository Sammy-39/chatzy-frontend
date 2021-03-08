import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router"
import socketIOClient from "socket.io-client";

const ENDPOINT = 'https://chatzy-backend.herokuapp.com/'

const Chat = ({name,room}) =>{

    const history = useHistory()

    const scrollRef = useRef()

    const [val,setVal] = useState('')
    const [chatText,setChatText] = useState([])
    const [users,setUsers] = useState([])
    
    const socketRef = useRef('')

    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT)

        socket.emit("joinRoom",{name,room})

        socket.on("message",(message)=>{
            setChatText(chatText=>[...chatText,message])
            
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        })

        socket.on("roomUsers",({room,users})=>{
            setUsers(users)
        })

        socketRef.current = socket

        return ()=>socket.close()

        // eslint-disable-next-line
    },[])

    const handleSendMsg = (e) =>{
        e.preventDefault()

        const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const msgDetails = {val,name,timestamp}

        socketRef.current.emit("sendMessage",msgDetails)
        
        setVal('')
    }

    const handleLeaveRoom = () =>{
        history.replace('/')
        socketRef.current.close()
    }

    return(
        <div className="chat-container">
            <header className="chat-header">
                <h3>Chatzy</h3>
                <button type="button" className='btn btn-danger' onClick={handleLeaveRoom}>Leave</button>
                </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h5> Room : <span> {room} </span> </h5>
                    <h6> Users Online </h6>
                    <ul className="active-users">
                        {users.map((user,idx)=>(
                            <li key={idx}> <i class="fas fa-circle circle"></i> {user.name} </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-messages">
                    {chatText.map((item,idx)=>(
                        <div className={`${item.name===name?'message my-chat':'message'}`}  key={idx}>
                            {
                                typeof(item)==='object' ?
                                <>
                                <p className="meta">{item.name} </p>
                                <p className='ts'>{item.timestamp}</p>
                                <p className="text"> {item.val} </p>
                                </> :
                                <>
                                <p className="meta"> Chatzy Bot </p>
                                <p className='ts'>{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                <p className="text"> {item} </p>
                                </>
                            }
                        </div>
                    ))}
                    <div className='to-bottom' ref={scrollRef}>
                    </div>
                </div>
            </main>
            <div className="chat-form-container">
                <form onSubmit={(e)=>handleSendMsg(e)}>
                    <input type="text" placeholder="Enter Message" className='chat-input'
                    value={val} onChange={(e)=>setVal(e.target.value)} autoFocus/>
                    <button className="btn btn-success" type="submit"><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat