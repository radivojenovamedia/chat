export interface UserInterface {
  id?: number;
  username: string;
  password: string;
  socketID: string;
  name: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
