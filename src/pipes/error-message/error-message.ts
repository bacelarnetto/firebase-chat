import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: string, ...args) {
    switch(value){
      case"auth/user-not-found":
      case"auth/wrong-password":
        return"Usuario ou senha invalida"
      case"auth/invalid-email":
        return"Digite um email valido"
      default:
        break
    }
  }
}
