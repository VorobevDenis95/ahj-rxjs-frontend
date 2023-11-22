import { formatDate, formatString } from './utils';

export default class Message {
  constructor(msg) {
    this.body = msg.body;
    this.from = msg.from;
    this.id = msg.id;
    this.received = msg.received;
    this.subject = msg.subject;
    this.bindToDom();
  }

  bindToDom() {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
      <span class='autor__message'>${this.from}</span>
      <span class='body__message'>${formatString(this.subject)}</span>
      <span class='date__message'>${formatDate(this.received)}</span>
    `;
    const messages = document.querySelector('.messages');
    messages.prepend(div);
  }
}
