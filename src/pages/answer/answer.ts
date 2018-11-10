import { ToastserviceProvider } from "./../../providers/toastservice/toastservice";
import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Constant } from "../../Constant/constant";

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-answer",
  templateUrl: "answer.html"
})
export class AnswerPage {
  myinfo: any;
  myphoto: any;

  message: any;

  answerArray: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider,
    public toastservice: ToastserviceProvider
  ) {
    this.myinfo = {};
    this.message = "";
  }

  ionViewDidLoad() {
    this.answerArray = [];
    this.myphoto = Constant.PHOTO_URL;
    this.myinfo = this.navParams.get("info");
    console.log("ionViewDidLoad", this.myinfo);
  }

  ionViewWillEnter() {
    this.getAnswersList();
  }

  onclickbackbutton() {
    this.navCtrl.pop();
  }

  getAnswersList() {
    this.apiservice
      .getAnswersById(this.myinfo["fo_id"])
      .then(res => {
        let data = res['data']
        this.answerArray = data.reverse();
      })
      .catch(er => {});
  }

  onclickSendButton() {
    this.apiservice
      .addNewAnswers(this.myinfo["fo_id"], this.message)
      .then(res => {
        this.message = "";
        this.toastservice.create(Constant.RESULT_SUCCESS, false, 2000);
        this.getAnswersList();
      })
      .catch(er => {
        this.toastservice.create(Constant.RESULT_FAIL, false, 2000);
      });
  }

  onclicklikebutton(ind) {
    let info = this.answerArray[ind];
    this.apiservice
      .addLike(info["an_id"])
      .then(res => {
        // this.toastservice.create(res["msg"], false, 2000);
        this.getAnswersList();
      })
      .then(er => {
        this.toastservice.create(er, false, 2000);
      });
  }

  onclickunlikebutton(ind) {
    let info = this.answerArray[ind];
    this.apiservice
      .addUnLike(info["an_id"])
      .then(res => {
        // this.toastservice.create(res["msg"], false, 2000);
        this.getAnswersList();
      })
      .then(er => {
        this.toastservice.create(er, false, 2000);
      });
  }


}
