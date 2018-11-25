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
  constructor(
    public http: Http,
    public nativeHttp: HTTP,
    public localprovider: LocalstorageProvider
  ) {
    console.log("Hello ApiProvider Provider");
  }



  public getUserInfo(userid) {
    return new Promise((resolve, reject) => {
      let postdata = "userid=" + userid;
      let url = Constant.GETUSERINFO

      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
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
      let postdata =
        "email=" +
        credentail.useremail +
        "&password=" +
        credentail.userpassword;
      let url = Constant.USER_LOGIN
      this.sendPost(url, postdata)
        .then(res => {
          console.log("hit si", res)
          resolve(res['data']);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public userSignup(credentail, photo) {
    return new Promise((resolve, reject) => {

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

      let url = Constant.USER_SIGNUP
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public addForum(credential) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();

      let postdata =
        "title=" +
        credential.title +
        "&content=" +
        credential.content +
        "&category=" +
        credential.category +
        "&photo=" +
        credential.photo +
        "&userid=" +
        userid;
      let url = Constant.ADD_FORUM
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public getForumByCategory(categoryid) {
    return new Promise((resolve, reject) => {
      let postdata = "ca_id=" + categoryid;

      let url = Constant.GET_FORUM;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public getAnswersById(forum_id) {
    return new Promise((resolve, reject) => {
      let postdata = "forum_id=" + forum_id;
      let url =Constant.GET_ANSWERS;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public addNewAnswers(forum_id, message, photo) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();

      let postdata =
        "forum_id=" + forum_id + "&message=" + message + "&userid=" + userid + "&photo=" + photo;
      let url = Constant.ADD_ANSWERS;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public getLikeNumbers(an_id) {
    return new Promise((resolve, reject) => {
      let postdata = "an_id=" + an_id;
      let url = Constant.LIKE_NUMBER;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public getUnLikeNumbers(an_id) {
    return new Promise((resolve, reject) => {
      let postdata = "an_id=" + an_id;
      let url = Constant.UNLIKE_NUMBER;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public addLike(an_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();

      let postdata = "an_id=" + an_id + "&userid=" + userid;
      let url = Constant.LIKE;

      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public addUnLike(an_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();
      let postdata = "an_id=" + an_id + "&userid=" + userid;
      let url = Constant.UNLIKE;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public deleteMyForum(fo_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();

      let postdata = "fo_id=" + fo_id + "&userid=" + userid;
      let url = Constant.DELETE_FORUM;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }


  public deleteComment(an_id) {
    return new Promise((resolve, reject) => {
      let userid = this.localprovider.getUserId();

      let postdata = "an_id=" + an_id;
      let url = Constant.DELETE_ANSWER;
      this.sendPost(url, postdata)
        .then(res => {
          resolve(res);
        })
        .catch(er => {
          reject(er);
        });
    });
  }


  public sendMessasge(content, userid, myid, photo) {
    return new Promise((resolve, reject) => {

      let postdata =
        "from=" + myid + "&content=" + content + "&to=" + userid + "&photo=" + photo;
      let url = Constant.SEND_MESSAGE;
      this.sendPost(url, postdata)
        .then(res => {
          console.log("sdfasfd", res);

          if(res['status']=='Success')
          {
            resolve(res);
          }else{
            reject(false);
          }

        })
        .catch(er => {
          reject(er);
        });
    });
  }


  public getUserList() {
    return new Promise((resolve, reject) => {
      let myid = this.localprovider.getUserId();
      let postdata = "userid=" + myid;
      console.log(myid);

      let url = Constant.GET_MESSAGE_USERLIST;
      this.sendPost(url, postdata)
        .then(res => {
          if(res['status']== Constant.RESULT_SUCCESS)
          {
            resolve(res);
          }else{
            reject(false);
          }

        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public getMessageList(userid) {
    return new Promise((resolve, reject) => {
      let myid = this.localprovider.getUserId();
      let postdata = "myid=" + myid + "&userid=" + userid;

      let url = Constant.GET_MESSAGES;
      this.sendPost(url, postdata)
        .then(res => {
          if(res['status']== Constant.RESULT_SUCCESS)
          {
            resolve(res);
          }else{
            reject(false);
          }

        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public deleteMessage(messageid)
  {
    return new Promise((resolve, reject) => {

      let postdata = "msgid=" + messageid

      let url = Constant.DELETE_MESSAGES;
      this.sendPost(url, postdata)
        .then(res => {
          if(res['status']== Constant.RESULT_SUCCESS)
          {
            resolve(res);
          }else{
            reject(false);
          }

        })
        .catch(er => {
          reject(er);
        });
    });
  }

  public forgotPassword(email)
  {
    return new Promise((resolve, reject) => {

      let postdata = "email=" + email

      let url = Constant.FORGOT_PASSWORD;
      this.sendPost(url, postdata)
        .then(res => {
          if(res['status']== Constant.RESULT_SUCCESS)
          {
            resolve(res);
          }else{
            reject(res);
          }

        })
        .catch(er => {
          reject(er);
        });
    });
  }





  private sendPost(url, postdata) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      this.http.post(url, postdata, { headers: headers }).subscribe(
        result => {
          resolve(result.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public getBannerInfo() {
    return new Promise((resolve, reject) => {
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
    });
  }
}
