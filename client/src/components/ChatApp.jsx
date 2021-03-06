var ChatApp = window.React.createClass({

  getInitialState: function(){
    return {
      messages: [],
      //socket: window.io('https://localhost:3000'),
      socket: window.io('https://secure-spire-22112.herokuapp.com/'),
      user: undefined
    };
  },
  // 'https://sleepy-river-47414.herokuapp.com/'

  // openWindow: function(){
  //  window.open('https://secure-spire-22112.herokuapp.com/', 'chat-co', 'width=500, height=500');
  //  reconnect: false;
  // },


  componentDidMount: function(){

    // window.open("http://localhost:3000/", "chat-co", "width=500, height=600");

    // window.resizeTo(250, 250);                             // Resizes the new window
    // window.focus();
    // this.openWindow();
    var self = this;

    // self.moveWindow();
    this.state.socket.on("receive-message", function(msg){
      // console.log(msg);
      var messages = self.state.messages;
      messages.push(msg);
      self.setState({messages: messages});
      var elem = document.getElementsByTagName('UL')[0];
      elem.scrollTop = elem.scrollHeight;
      console.log(self.state.messages);
    });
  },

  submitMessage: function(){
    var body = document.getElementById("message").value;

    var message = {
      body: body,
      user: this.state.user || "guest"
    };

    this.state.socket.emit("new-message", message);
    // console.log(message);
    document.getElementById("message").value = "";
  },

  // moveWindow: function() {
  //  window.open("http://localhost:3000/", "chat-co", "width=500, height=600");
  //  return false;
  // },

  newChat: function() {
    alert("here goes code for new chat room");
    // var io;
    // var chatSocket;
    // var db;

    // var initChat = function(sio, socket, sdb) {
    //   io = sio;
    //   chatSocket = socket;
    //   db = sdb;
    //   chatSocket.emit("connected", { message: "You are connected!" });

    //   chatSocket.on("hostCreateNewChat", hostCreateNewChat);
    //   chatSocket.on("personJoinChat", personJoinChat);
    // }

    // function hostCreateNewChat() {
    //   //Create a unique Socket.IO. room
    //   var thisChatId = ( Math.random() * 100000 ) | 0;
    //   console.log(thisChatId);

    //   //Return the Room ID (chatId) and the socket ID (mySocketID) to the browser client
    //   this.emit("newChatCreated", {chatId: thisChatId, mySocketID: this.id});

    //   //Join the room and wait for other people
    //   this.join(thisChatId.toString());
    // };
  },

  pickUser: function(){
    var sendDate = new Date().toString();
    var user = "(" + " " + sendDate.replace("GMT-0700 (PDT)", '') + ")" + " " + document.getElementById("user").value;
    this.setState({user:user});
  },

  render: function(){
    var self = this;
    var messages = this.state.messages.map(function(msg){
      return  (
        <li><strong>{msg.user}:<span>{" "}{" "}</span></strong><span>{msg.body}</span></li>
      );
    });

    return(
      <div className='container-fluid wrapper'>
        <div className="mainTitle">chat-co</div>
        <div className="jumbotron">

          <div className="container-fluid">
              <div className="row" id="textChatArea">
                <ul>
                  {messages}
                </ul>
              </div>
              <div className="row">
                    <input id="message" type="text"/>
                    <button id="messageButton" className='btn' onClick={() => self.submitMessage()}> Send </button>
              </div>
              <br />
              <div className="row">
                <div id="inputAndButton">
                    <input id="user" type="text" placeholder="choose a username" />
                    <button className='btn' onClick={() => self.pickUser()}> User </button>
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <input id="chatGroup" type="text" placeholder="choose a group name" />
            <button className='btn' id="newChat" onClick={() => self.newChat()}> New Chat </button>
          </div>
        </div>

        <br />

        <div className="jumbotron" id="advertisements">
            <img id="insertImage"/>
        </div>

      </div>

    );
  }

});

export {ChatApp};