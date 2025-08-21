import { ApiClient, Response } from './ApiClient';

class LoginApi extends ApiClient {
  constructor() {
    super(`https://api.practicesoftwaretesting.com`);
  }

  login = (username: string, password: string): Response<
    {error: string}
     | {
          access_token: string;
          token_type: string;
          expires_in: number;
        }> => this.post('/users/login', {username, password})
}

export const loginApi = new LoginApi();
