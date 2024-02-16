const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));

const loginForm = document.querySelector('#welcome-form');
const userNameInput = document.querySelector('#username');

const messagesSection = document.querySelector('#messages-section');
const addMessageForm = document.querySelector('#add-messages-form');
const messagesList = document.querySelector('#messages-list');
const messageContentInput = document.querySelector('#message-content');

loginForm.onsubmit = (e) => {
  e.preventDefault();
  login();
};

addMessageForm.onsubmit = (e) => {
  e.preventDefault();
  sendMessage();
};

function isEmpty(input) {
  return input.value.replace(' ', '') === '';
}

function login() {
  if (isEmpty(userNameInput)) {
    return alert('User field cannot be empty');
  }

  window.userName = userNameInput.value;
  loginForm.classList.toggle('show', false);
  messagesSection.classList.toggle('show', true);

  socket.emit('login', { name: window.userName });
}

function sendMessage() {
  if (isEmpty(messageContentInput)) {
    return alert('Message field cannot be empty');
  }

  const author = window.userName;
  const content = messageContentInput.value;

  addMessage(author, content);

  socket.emit('message', { author, content });

  messageContentInput.value = '';
}

function addMessage(userName, content) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (userName === window.userName) {
    message.classList.add('message--self');
  }

  const head = document.createElement('h3');
  head.classList.add('message__author');
  head.innerHTML = userName;

  const messageContent = document.createElement('div');
  messageContent.classList.add('message__content');
  messageContent.innerHTML = content;

  message.append(head);
  message.append(messageContent);

  messagesList.append(message);
}
