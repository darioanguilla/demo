import { Component } from "react";
import "./Chat.css";

// import './Chat.css';
const client = new WebSocket('ws://localhost:8080/chat');


class Chat extends Component {

    constructor(props){
      super(props);
      this.state = {message: '', user: ''};
      this.state = {messages: []};
    }

    sendMessage = () => {
      const timestamp = Date.now()
      const humanReadableDateTime = new Date(timestamp).toLocaleString()
      let msg = {user: this.state.user, text: this.state.message, date: humanReadableDateTime};
      client.send(JSON.stringify(msg));
      this.setState({message: ''});
    }

    handleChange = (e) => {
      this.setState(            
        {message: e.target.value}
      );

    }

    componentDidMount () {

        this.setState({user: 'Dario'});
        this.setState({message: ''});

        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
          //console.log(this.state.messages);
          //console.log(message);
          this.setState({
            messages: [...this.state.messages, {id:this.state.messages.length,payload: message.data}]
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
              const msg = JSON.parse(message.payload);
              return (
                <div className="message-text" key={message.id}>
                 <span class="user">{msg.user}</span>: <span class="text">{msg.text}</span> <span class="date">({msg.date})</span>
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