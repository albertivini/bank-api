import { prisma } from "../../../config/prisma";
import { ACCOUNT_ERRORS } from "../../../constants/responseMessages";
import { IAccountRepository } from "../../../repositories/interfaces/IAccountRepository";
import { BusinessError } from "../../../utils/exceptions";
import { CreateBody } from "../interfaces/create";

export class CreateUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ username }: CreateBody) {
    const userExists = await this.accountRepository.getByUsername(username);

    if (userExists)
      throw new BusinessError(ACCOUNT_ERRORS.USERNAME_ALREADY_USED);

    await this.accountRepository.create(username);
  }
}
