export class UserModel
{
  userid : number;
  password : string;
  name : string;
  roleId : string;
  role : string;

  // constructor(values : Object = {})
  constructor()
  {
    this.userid = 0;
    this.password = "";
    this.name = "";
    this.roleId = "";
    this.role = "";
    // Object.assign(this, values);
  }

}
