export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;

  constructor(id: string, username: string, password: string, firstName: string, lastName: string, email: string, type: string) {
    this._id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
  }
}
