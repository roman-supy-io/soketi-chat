import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Pusher, {Channel} from 'pusher-js';

@Component({
  selector: 'soketi-chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private pusher = new Pusher('0d81cd6d4bcbb4a9eaac', {
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    userAuthentication: {
      endpoint: '/api/auth/user',
      transport: 'ajax'
    },
    channelAuthorization: {
      endpoint: '/api/auth/channel',
      transport: 'ajax'
    }
  });
  protected messages: string[] = [];
  protected channel!: Channel;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.pusher.signin();
    this.channel = this.pusher.subscribe('private-channel');

    this.channel.bind('message', (data: string) => {
      this.messages.push(data);

      this.cdr.markForCheck();
    });
    this.channel.bind('client-message', (data: string) => {
      this.messages.push(data);

      this.cdr.markForCheck();
    });
    this.channel.bind('pusher:subscription_count', (...args: unknown[]) => console.log(args));
  }

  hello(): void {
    this.http.get('/api/hello').subscribe();
  }

  emit(): void {
    this.channel?.trigger('client-message', 'hello from client');
  }

}
