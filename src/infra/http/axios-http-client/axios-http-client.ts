import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { HttpPostParams, HttpResponse } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { data, status: statusCode } = await axios.post(url, body);

    return {
      body: data,
      statusCode,
    };
  }
}
