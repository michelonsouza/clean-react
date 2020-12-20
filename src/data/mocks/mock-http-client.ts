import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';
import {
  HttpPostParams,
  HttpPostClient,
} from '@/data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  body?: Record<string, unknown>;

  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent,
  };

  async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
