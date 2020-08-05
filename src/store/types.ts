export interface Employee {
  name: string;
  email: string;
  id: number;
}

export interface User {
  username: string;
  email: string;
  id: number;
  lastlogin: Date | null;
  avatar: string | null;
  token: any;
  roles: string[];
}
