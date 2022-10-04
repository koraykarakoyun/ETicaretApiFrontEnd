import React, { useEffect, useState } from 'react';
import './App.css';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
function App() {
    const [text, setText] = useState < string > ("");
    const [msgList, setMsgList] = useState < Array < any >> ([]);
    const [hubConnection, setHubConnection] = useState();
    useEffect(() => {
        createHubConnection();
    }, [])


    const createHubConnection = async () => {
        const hubCn = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build()
        try {
            await hubCn.start();
            console.log(hubCn.connectionId)
            setHubConnection(hubCn)
        } catch (e) {
            console.log("e", e)
        }
    }


    const sendMsg = () => {
        if (hubConnection) {
            hubConnection.invoke("SendMessage", text).then((res) => { })
        }
    }

    
    useEffect(() => {
        if (hubConnection) {
            hubConnection.on("ReceiveMessage", (mesaj: string) => {
                setMsgList((prevState) => {
                    return prevState.concat(mesaj)
                })})
        }}
, [hubConnection])


return (
    <div className="App">
        <header className="App-header">
            <input value={text} onChange={(e) => { setText(e.target.value) }} />
            <button onClick={sendMsg}>Mesaj Gönder </button>
        </header>
        <div>
            <h2>Mesajlar</h2>
            <ul>
                {msgList.map((item) => {
                    return (
                        <li>{item}</li>
                    )
                })}
            </ul>
        </div>
    </div>
);
}
export default App;