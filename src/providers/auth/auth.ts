import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  public signup(credentials, photo): Promise<any> {
    return new Promise((resolve, reject) => {
      if (
        credentials.name === '' ||
        credentials.email === '' ||
        credentials.location === '' ||
        credentials.birth === '' ||
        credentials.password === '' ||
        credentials.confirmpassword == ''
      ) {
        reject('Please insert credentials!');
      } else {
        if (credentials.password != credentials.confirmpassword) {
          reject('Confirm Password is incorrect!');
        } else {
          resolve('auth success');
        }
      }
    });
  }

  public login(credential): Promise<any> {
    return new Promise((resolve, reject) => {
      if (credential.useremail === '' || credential.userpassword === '') {
        reject('Please insert credentials');
      } else {
        resolve('auth success');
      }
    });
  }
}
