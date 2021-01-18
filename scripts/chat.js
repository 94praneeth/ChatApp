// adding new chat documents
// setting-up a realtime listner to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message) {
    // format the chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    // get chat documents form the database
    this.unsub = this.chats
      // Complex Query
      /**
       * where() filters by an object property
       * with an conditional parameters.
       * 
       * oderBy() orders by the object property 
       */
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update the UI
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    // console.log('Room updated');

    if (this.unsub) {
      this.unsub();
    }
  }
}




// setTimeout(() => {
//   chatroom.updateRoom('gaming');

//   chatroom.getChats(data => {
//     console.log(data);
//   });

//   // chatroom.addChat('Hello Guys.\nDid you try the new Cyberpunk game?');
// }, 3000);