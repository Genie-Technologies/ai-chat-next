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
    _user?: AuthOUser
  ): Promise<User | null> {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );

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
