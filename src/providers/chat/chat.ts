import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageModel } from '../../model/message-model';

@Injectable()
export class ChatProvider {
  public onMessageReceived = new EventEmitter();
  constructor(
    private afDatabase: AngularFireDatabase
  ) {
    this.afDatabase.database.ref("messages")
      .on("value", snapshot => {
        var messages = [];
        snapshot.forEach(child =>{
          messages.push(child.val())
        });
        console.log(messages);
        this.onMessageReceived.emit(messages);
      });
  }

  sendMessage(message: MessageModel){
    return new Promise((resolve, reject)=>{
      this.afDatabase.database.ref("messages")
        .push(message, error =>{
          if(error)
            reject(error);
          resolve(message);
        });
    })
  }

  getMessages() : Promise<Array<MessageModel>>{
    return new Promise((resolve, reject) =>{
      this.afDatabase.database.ref("messages")
      .on("value", snapshot => {
        var messages = [];
        snapshot.forEach(child =>{
          messages.push(child.val())
        });
        resolve(messages);
      });
    })
  }


}
