import axios from "axios";

export interface User {
  authOId: string;
  email: string;
  fullName: string;
  firstName: string;
  familyName: string;
  picture: string;
  joined: Date;
  locale: string;
  id?: string;
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
    userId: string,
    _user?: AuthOUser,
    _token?: string
  ): Promise<User | null> {
    try {
      console.log("userId: ", userId);
      console.log(
        "Reaching out to this API: ",
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY2RDBtWXNYSzdRRFl5UHF6ZWc4diJ9.eyJpc3MiOiJodHRwczovL2Rldi10NnNiMG0yZnN1eHVzZHVtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYSjNGVzBEellLSzZWeDQ5eGlFeEd5bUoxM3ppWUk0UUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMC1qd3QtYXV0aG9yaXplciIsImlhdCI6MTY4MDExOTk5OCwiZXhwIjoxNjgwMjA2Mzk4LCJhenAiOiJYSjNGVzBEellLSzZWeDQ5eGlFeEd5bUoxM3ppWUk0USIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.YlpTeHIgt_dMndog2El5YFlpSbPZzs1NBFJcQvNI6ai9A10qdycWn2BbD6bxfnsgD7VaZA9psK6HnPVkQcV6fQMf_5_KH9PEYDPfx_rIR5s_z28IxMuCQHaQuVzm8EXVO_PYE6EBesZDxhx9o3S-Yr4461THylhNaYuM-YbqTdHWq3kViGEO5mYkjACH_OJWjerSnRk89aR1bVrvTXYHhdczRVDgQEahTv2DqXrvtmH8D5Ig8yhbk_3olp4Wa3YOaBLgZhgP_87WOKahH3WaO5IF9EJJSaRTsGlbwhkEvxLPdJqBg1XkvczxEu2uT9Ym8xBBzpXr8QzLclaTXleTPg`,
          },
        }
      );

      console.log("-------> user: ", user);

      console.log("Sending this token: ", _token);

      if (user && user.data) {
        const userData = user.data;
        if (
          (userData.error === "Invalid UUID" ||
            userData.error === "User not found") &&
          _user
        ) {
          const newUser = await this.createUser({
            authOId: userId,
            email: _user.email,
            fullName: _user.name,
            firstName: _user.given_name,
            familyName: _user.family_name,
            picture: _user.picture,
            joined: new Date(),
            locale: _user.locale,
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
}
