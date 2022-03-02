import { Component } from "react";

// import './Chat.css';
const client = new WebSocket('ws://localhost:8080/chat');


class Chat extends Component {

    constructor(){
        super();
        this.state = {message: ''};
    }

    componentWillMount () {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log(message);
        };

        client.onclose = () => {
            console.log('WebSocket Connection Closed');
        }

    }

    sendMessage = (message) => {

        //alert(this.state.message);
        client.send(message)
    }

    handleChange = (e) => {
        const text = e.target.value;
        
        this.setState(
            
            {message: text}
        );

    }

    render() {
        return (
            <div>
                <h2>Chat realizzata con React e WebSockets</h2>
                <input onChange={this.handleChange.bind(this)}
                       value={this.state.message}>
                </input>
                <button onClick={() => this.sendMessage()}>
                    Send Message
                </button>
            </div>
        )
    }
}

export default Chat;