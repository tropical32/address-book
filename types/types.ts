export interface User {
  email: string;
  login: {
    username: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
  nat: string;
}