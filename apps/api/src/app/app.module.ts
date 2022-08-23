import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import Pusher from 'pusher';

@Module({
  controllers: [AppController],
  providers: [AppService, {
    provide: Pusher,
    useValue: new Pusher({
      appId: 'chat',
      key: '0d81cd6d4bcbb4a9eaac',
      secret: '3652d38a50001e7f0200',
      host: 'localhost',
      port: '6001',
      useTLS: false,
    })
  }],
})
export class AppModule {}
