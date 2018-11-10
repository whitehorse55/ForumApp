import { Constant } from "./../../Constant/constant";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { LocalstorageProvider } from "../localstorage/localstorage";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: Http, public nativeHttp: HTTP, public localprovider : LocalstorageProvider) {
    console.log("Hello ApiProvider Provider");
  }


  public getUserInfo(userid)
  {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      // headers.append('Access-Control-Allow-Origin', '*');
      let postdata =
        "userid=" + userid
      this.http
        .post(Constant.GETUSERINFO, postdata, { headers: headers })
        .subscribe(
          response => {
            let data = response.json();
            if (data["status"] == Constant.RESULT_FAIL) {
              reject(Constant.RESULT_FAIL);
            } else {
              resolve(data['data']);
            }
          },
          er => {
            console.log("this=>", er);
            reject(er);
          }
        );
    });
  }

  public getCategory() {
    return new Promise((resolve, reject) => {
      this.http.get(Constant.GET_CATEGORY, {}).subscribe(
        response => {
          console.log("this is response", response);
          resolve(response.json());
        },
        er => {
          console.log("this is ero", er);
          reject(er);
        }
      );
    });
  }

  public userLogin(credentail) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      // headers.append('Access-Control-Allow-Origin', '*');
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
              reject(data['msg']);
            } else {
              resolve(data['data']);
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
      // headers.append("Access-Control-Allow-Origin", "*");

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

      this.http
        .post(Constant.USER_SIGNUP, postdata, { headers: headers })
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

  public addForum(credential) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId()
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata =
        "title=" +
        credential.title +
        "&content=" +
        credential.content +
        "&category=" +
        credential.category +
        "&photo=" +
        credential.photo +
        "&userid=" + userid;
      console.log("this is cre", postdata);
      this.http
        .post(Constant.ADD_FORUM, postdata, { headers: headers })
        .subscribe(
          result => {
            resolve(result.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  public getForumByCategory(categoryid) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "ca_id=" + categoryid;
      this.http
        .post(Constant.GET_FORUM, postdata, { headers: headers })
        .subscribe(
          result => {
            resolve(result.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  public getAnswersById(forum_id) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "forum_id=" + forum_id;
      this.http
        .post(Constant.GET_ANSWERS, postdata, { headers: headers })
        .subscribe(
          result => {
            console.log(result.json());
            resolve(result.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  public addNewAnswers(forum_id, message) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId()
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata =
        "forum_id=" + forum_id + "&message=" + message + "&userid=" + userid;

      this.http
        .post(Constant.ADD_ANSWERS, postdata, { headers: headers })
        .subscribe(
          result => {
            resolve(result.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  public getLikeNumbers(an_id)
  {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "an_id=" + an_id;

      this.http.post(Constant.LIKE_NUMBER, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public getUnLikeNumbers(an_id)
  {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "an_id=" + an_id;

      this.http.post(Constant.UNLIKE_NUMBER, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public addLike(an_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId()
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "an_id=" + an_id + "&userid=" + userid;

      this.http.post(Constant.LIKE, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public addUnLike(an_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId()
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "an_id=" + an_id + "&userid=" + userid;

      this.http.post(Constant.UNLIKE, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public deleteMyForum(fo_id)
  {
    return new Promise((resolve, reject)=>{
      let userid = this.localprovider.getUserId()
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let postdata = "fo_id=" + fo_id + "&userid=" + userid;

      this.http.post(Constant.DELETE_FORUM, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    })
  }

  public getBannerInfo()
  {
    return new Promise((resolve, reject)=>{
      this.http.get(Constant.GETBANNERINFO, {}).subscribe(
        response => {
          console.log("this is response", response);
          resolve(response.json());
        },
        er => {
          console.log("this is ero", er);
          reject(er);
        }
      );
    })
  }
}
