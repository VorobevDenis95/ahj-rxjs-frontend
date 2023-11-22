/* eslint-disable import/no-extraneous-dependencies */
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';
import { interval, of } from 'rxjs';
import Message from './Message';

const api = 'https://ahj-rxjs.onrender.com/messages/unread';
const form = document.querySelector('.messages');

function postMessage(messages) {
  messages.forEach((msg) => {
    // eslint-disable-next-line no-unused-vars
    const result = new Message(msg);
  });
}
const stream$ = interval(1000)
  .pipe(
    switchMap(() => ajax.getJSON(api).pipe(
      map((msgs) => msgs.messages),
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      }),
    )),
  )
  .subscribe((messages) => {
    postMessage(messages);
  });
setTimeout(() => {
  stream$.unsubscribe();
  const text = '<p class="text">Новых сообщений нет</p>';
  form.insertAdjacentHTML('beforebegin', text);
}, 5000);
