import { AccountModel } from '@/domain/models';
import { AuthenticationParams, Authentication } from '@/domain/usecases';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as AccountModel;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
