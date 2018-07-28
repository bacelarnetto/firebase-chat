import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, App, Content } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';
import { MessageModel } from '../../model/message-model';
import { UserModel } from '../../model/user-model';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  user: UserModel;
  messages: Array<MessageModel>;
  textMessage:  string;
  constructor(
    public navCtrl: NavController,
    private app: App,
    private authProvider: AuthenticationProvider,
    private chatProvider: ChatProvider,
    private zone: NgZone
  ) {
    this.user = authProvider.getUser();
    this.loadMessages();
    chatProvider.onMessageReceived.subscribe(() => {
      zone.run(() =>{
        console.log("message from su")
        this.loadMessages();
      })
    })
  }

  loadMessages(){
    this.chatProvider.getMessages().then(messages =>{
      this.messages = messages;
      setTimeout(() => {
        this.content.scrollToBottom(300);
      })
    });
  }

  logout(){
    this.authProvider.logout()
    this.app.getRootNav().setRoot(LoginPage);
  }

  sendMessage(){
    let msg: MessageModel = new MessageModel();
    msg.date = new Date().toISOString();
    msg.text = this.textMessage;
    msg.user_id = this.user.uid;
    msg.nickname = this.user.nickname;
    msg.image = this.user.image;
    this.chatProvider.sendMessage(msg)
      .then(() => this.textMessage = "")
      .catch( error => console.log(error));
  }



}
