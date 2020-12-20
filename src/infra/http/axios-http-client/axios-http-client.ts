import { HttpPostParams } from '@/data/protocols/http/http-post-client';
import axios from 'axios';

export class AxiosHttpClient {
  async post({ url, body }: HttpPostParams<any>): Promise<void> {
    await axios.post(url, body);
  }
}
