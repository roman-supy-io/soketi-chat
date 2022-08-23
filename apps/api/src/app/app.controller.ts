import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';

import Pusher from 'pusher';


@Controller()
export class AppController {
  constructor(private readonly pusher: Pusher) {}

  @Get('hello')
  async getData(): Promise<void> {
    await this.pusher.trigger('private-channel', 'message', 'hello from server');
  }

  @Post('auth/user')
  @HttpCode(HttpStatus.OK)
  authUser(@Body() {socket_id}: Record<string, string>) {
    Logger.log('Authenticating user: ' + socket_id)
    return this.pusher.authenticateUser(socket_id, {id: '123'});
  }

  @Post('auth/channel')
  @HttpCode(HttpStatus.OK)
  authChannel(@Body() {socket_id, channel_name}: Record<string, string>) {
    Logger.log('Authorizing channel: ' + socket_id + ' ' + channel_name)
    return this.pusher.authorizeChannel(socket_id, channel_name);
  }
}
