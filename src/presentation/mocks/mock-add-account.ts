import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/mocks';

export class AddAccountSpy implements AddAccount {
  callsCount = 0;

  account = mockAccountModel();

  params: AddAccountParams = {} as AddAccountParams;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;

    return Promise.resolve(this.account);
  }
}
