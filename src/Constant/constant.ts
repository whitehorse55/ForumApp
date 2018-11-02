export class Constant{
  public static SERVER_URL = "http://192.168.2.105/ci_admin/Api/"
  public static USER_LOGIN = Constant.SERVER_URL + 'userLogin'
  public static USER_SIGNUP = Constant.SERVER_URL + 'userSignup'
  public static GET_CATEGORY = Constant.SERVER_URL + 'getCategory'

  public static UPLOAD_IMAGE = Constant.SERVER_URL + 'uploadImage'
  public static ADD_FORUM = Constant.SERVER_URL + 'addForum'
  public static GET_FORUM = Constant.SERVER_URL + 'getForum'
  public static GET_ANSWERS = Constant.SERVER_URL + 'getAnswers'
  public static ADD_ANSWERS = Constant.SERVER_URL + 'addAnswers'

  public static PHOTO_URL = 'http://192.168.2.105/ci_admin/upload/forum/'

  public static RESULT_SUCCESS = 'Success'
  public static RESULT_FAIL = 'Fail'

}
