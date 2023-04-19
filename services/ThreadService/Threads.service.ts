import axios from "axios";

export interface Threads {
  id: string;
  userId: string;
  participants: {
    userid: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  messages: any[];
  createdAt: string;
  isActive: boolean;
  lastMessage: string | null;
  threadName: string;
}

export type ThreadsResponseData = [Threads[], number];

export default class ThreadService {
  public async createThread(thread: Threads) {
    try {
      const newThread = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/create`,
        thread,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return newThread.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getThread(
    threadId: string
  ): Promise<Threads | null | undefined> {
    try {
      const thread = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return thread.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getThreads(
    userId: string
  ): Promise<Threads[] | null | undefined> {
    try {
      console.log(
        "Reaching out to the API to get threads for this user: ",
        userId
      );

      const threads = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return threads.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async updateThread(thread: Threads) {
    try {
      const updatedThread = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/update`,
        thread,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return updatedThread.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteThread(threadId: string) {
    try {
      const deletedThread = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return deletedThread.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getMessagesForThread(
    threadId: string
  ): Promise<any | null | undefined> {
    try {
      const messages = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/thread/${threadId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return messages.data;
    } catch (error) {
      console.error(error);
    }
  }
}
