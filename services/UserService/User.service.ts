import axios from "axios";

export interface User {
  authOId: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  picture: string;
  joined: Date;
  locale: string;
  id: string;
  friends?: string[];
}

export interface AuthOUser {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}

export default class UserService {
  public async createUser(user: User) {
    try {
      const newUser = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return newUser.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser(
    userEmail: string,
    _user?: AuthOUser,
    _token?: string
  ): Promise<User | null> {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY2RDBtWXNYSzdRRFl5UHF6ZWc4diJ9.eyJpc3MiOiJodHRwczovL2Rldi10NnNiMG0yZnN1eHVzZHVtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYSjNGVzBEellLSzZWeDQ5eGlFeEd5bUoxM3ppWUk0UUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMC1qd3QtYXV0aG9yaXplciIsImlhdCI6MTY4MDExOTk5OCwiZXhwIjoxNjgwMjA2Mzk4LCJhenAiOiJYSjNGVzBEellLSzZWeDQ5eGlFeEd5bUoxM3ppWUk0USIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.YlpTeHIgt_dMndog2El5YFlpSbPZzs1NBFJcQvNI6ai9A10qdycWn2BbD6bxfnsgD7VaZA9psK6HnPVkQcV6fQMf_5_KH9PEYDPfx_rIR5s_z28IxMuCQHaQuVzm8EXVO_PYE6EBesZDxhx9o3S-Yr4461THylhNaYuM-YbqTdHWq3kViGEO5mYkjACH_OJWjerSnRk89aR1bVrvTXYHhdczRVDgQEahTv2DqXrvtmH8D5Ig8yhbk_3olp4Wa3YOaBLgZhgP_87WOKahH3WaO5IF9EJJSaRTsGlbwhkEvxLPdJqBg1XkvczxEu2uT9Ym8xBBzpXr8QzLclaTXleTPg`,
          },
        }
      );

      console.log('USER_DATA', user.data);

      if (user && user.data) {
        const userData = user.data;
        if (
          (userData.error === "Invalid UUID" ||
            userData.error === "User not found") &&
          _user
        ) {
          const newUser = await this.createUser({
            authOId: userEmail,
            email: _user.email,
            fullName: _user.name,
            firstName: _user.given_name,
            lastName: _user.family_name,
            picture: _user.picture,
            joined: new Date(),
            locale: _user.locale,
            id: _user.sid
          });

          return newUser;
        }

        return userData;
      }

      return null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  public async updateUser(id: string, updatedFields: Partial<User>) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  public async searchUsers(query: string) {
    try {
      const users = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/search?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return users.data;
    } catch (error) {
      console.error(error);
    }
  }
}
