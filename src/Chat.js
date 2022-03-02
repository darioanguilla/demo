import { Component } from "react";
// import './Chat.css';

class Chat extends Component {

    constructor(){
        super();
        this.state = {message: ''};
    }

    sendMessage = () => {

        alert(this.state.message);
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