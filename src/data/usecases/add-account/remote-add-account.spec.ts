import faker from 'faker';

import { AccountModel } from '@/domain/models';
import { AddAccountParams } from '@/domain/usecases';
import { UnexpectedError, EmailInUseError } from '@/domain/errors';
import { mockAddAccountParams } from '@/domain/mocks';
import { HttpPostClientSpy } from '@/data/mocks';
import { HttpStatusCode } from '@/data/protocols/http';

import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount', () => {
  it('should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.add(mockAddAccountParams());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('shoud call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();

    await sut.add(addAccountParams);

    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  it('shoud throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('shoud throw UnexpectedError if returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('shoud throw UnexpectedError if returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
