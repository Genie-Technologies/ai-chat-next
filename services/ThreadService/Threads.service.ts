import axios from "axios";

export interface Thread {
  id: string;
  userId: string;
  messageId: number;
  user: string[];
  message: string[];
  createdAt: Date;
  isActive: boolean;
}

export default class ThreadService {
  public async createThread(thread: Thread) {
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

  public async getThread(threadId: string): Promise<Thread | null | undefined> {
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
  ): Promise<Thread[] | null | undefined> {
    try {
      console.log(
        "Reaching out to the API to get threads for this user: ",
        userId
      );

      const threads = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/${userId}`,
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

  public async updateThread(thread: Thread) {
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
}
