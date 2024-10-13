import { Account } from "../../entities/Account";

export interface IAccountRepository {
  getByUsername(username: string): Promise<Account | void>
  create(username: string): Promise<void>
  deposit(account: number, value: number): Promise<void>;
  withdraw(account: number, value: number): Promise<void>;
  transfer(from: number, to: number, value: number): Promise<void>;
}
