// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(newChatForm.reset())
    .catch(err => console.log(err));
});

// Update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();

  // Updating the username
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // resetting name form-field
  newNameForm.reset();
  // show then hide the udated message
  updateMssg.innerText = `You name has updated to ${newName}`;
    
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat rooms
rooms.addEventListener('click', e => {
  // console.log(e);
  if(e.target.tagName === "BUTTON"){
    chatUI.clear();

    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(data => chatUI.render(data));
  }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anonymus';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));