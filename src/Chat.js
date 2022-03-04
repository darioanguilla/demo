import { Component } from "react";

// import './Chat.css';
const client = new WebSocket('ws://localhost:8080/chat');


class Chat extends Component {

    constructor(){
        super();
        this.state = {message: ''};
        this.state = {messages: []};
    }

    componentWillMount () {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log(this.state.messages);
            //console.log(message);
            this.setState({
                messages: [...this.state.messages, {id:this.state.messages.length,text: message.data}]
            })
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
        this.setState(            
            {message: e.target.value}
        );

    }

    render() {
        return (
            <div>
                <h2>Chat realizzata con React e WebSockets</h2>
                <input onChange={this.handleChange.bind(this)}>
                </input>
                <button onClick={() => this.sendMessage(this.state.message)}>
                    Send Message
                </button>
            </div>
        )
    }
}

export default Chat;