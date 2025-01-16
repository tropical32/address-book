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
  phone: string;
  cell: string;
  location: {
    city: string;
    state: string;
    postcode: string;
    street: {
      name: string;
    };
  };
}
