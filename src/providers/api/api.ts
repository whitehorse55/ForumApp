import { Constant } from "./../../Constant/constant";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: Http) {
    console.log("Hello ApiProvider Provider");
  }

  public getCategory()
  {
    return new Promise((resolve, reject)=>{
        this.http.get(Constant.GET_CATEGORY).subscribe(response=>{
          console.log("this is response",response);
          resolve(response.json())
        }, er=>{
           console.log("this is ero", er);
          reject(er)
        })
    })
  }

  public userLogin(credentail) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      let postdata =
        "email=" +
        credentail.useremail +
        "&password=" +
        credentail.userpassword;
      this.http
        .post(Constant.USER_LOGIN, postdata, { headers: headers })
        .subscribe(
          response => {
            let data = response.json();
            if (data["status"] == Constant.RESULT_FAIL) {
              reject(data);
            } else {
              resolve(data);
            }
          },
          er => {
            console.log("this=>", er);
            reject(er);
          }
        );
    });
  }

  public userSignup(credentail, photo) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata =
        "email=" +
        credentail.email +
        "&password=" +
        credentail.password +
        "&name=" +
        credentail.name +
        "&location=" +
        credentail.location +
        "&photo=" +
        photo;
        console.log("this is response", postdata)
      this.http
        .post(Constant.USER_SIGNUP, postdata, { headers: headers })
        .subscribe(
          response => {
            let data = response.json();
            console.log("this is response", data)
            if (data["status"] == Constant.RESULT_FAIL) {
              reject(data);
            } else {
              resolve(data);
            }
          },
          er => {
            console.log("this=>", er);
            reject(er);
          }
        );
    });
  }
}
