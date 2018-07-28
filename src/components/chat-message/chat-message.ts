import { Component, Input } from '@angular/core';
import { UserModel } from '../../model/user-model';
import { MessageModel } from '../../model/message-model';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {
  @Input() user: UserModel;
  @Input() messages: Array<MessageModel>;

  constructor() {

  }

  getNickname(message){
    let nickname="Eu";
    if(message.user_id != this.user.uid)
      nickname = message.nickname;

    return nickname;
  }
}
