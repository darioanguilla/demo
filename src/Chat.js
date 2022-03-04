import { Component } from "react";

// import './Chat.css';
const client = new WebSocket('ws://192.168.10.88:8080/chat');


class Chat extends Component {

    constructor(props){
        super(props);
        this.state = {message: ''};
        this.state = {messages: []};
    }

    sendMessage = () => {

        //alert(this.state.message);
        client.send(this.state.message)
        this.setState({message: ''});
    }

    handleChange = (e) => {
        this.setState(            
            {message: e.target.value}
        );

    }

    componentDidMount () {

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

    render() {
        return (
            <div>
        <h2>Chat realizzata con React e Websockets</h2>
        <div className="chatbox">
          <div id="messages" className="messages">
            {this.state.messages.map((message) => {
              return (
                <div className="message-text" key={message.id}>
                 {message.text}
                </div>
              );
            })}
          </div>
          <div className="message-input">
            <input
              placeholder="Message..."
              onChange={this.handleChange.bind(this)}
              value={this.state.message || ''}
            />
            <button onClick={() => this.sendMessage()}>
              Send message
            </button>
          </div>
        </div>
      </div>
        )
    }
}

export default Chat;