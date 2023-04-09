import axios from "axios";

export interface Participant {
  userId: string;
  threadId: string;
}

export interface Threads {
  id: string;
  userId: string;
  createdAt: Date;
  isActive: boolean;
  lastMessage?: string;
  threadName?: string;
  participants?: Participant[];
}

export type ThreadsResponseData = [
  {
    id: string;
    userId: string;
    createdAt: Date;
    isActive: boolean;
    lastMessage?: string;
    threadName?: string;
    participants: Participant[];
  }
];

export default class ThreadService {
  public async createThread(requestBody: {
    thread: Threads;
    participants: string[];
  }) {
    try {
      const newThread = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/create`,
        requestBody,
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
  ): Promise<ThreadsResponseData | null | undefined> {
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
        `${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}`,
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
