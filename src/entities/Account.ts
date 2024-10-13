export class Account {
  id: number;
  username: string;
  balance: number;

  constructor(id: number, username: string, balance: number) {
    this.id = id;
    this.username = username;
    this.balance = balance
  }
}
