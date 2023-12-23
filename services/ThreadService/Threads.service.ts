import axios from "axios";
import { Message, Participant } from "../../components/utils";

export interface Threads {
  id: string;
  userId: string;
  participants: Participant[];
  createdAt: string;
  isActive: boolean;
  lastMessage: string | null;
  threadName: string;
}

export interface NewThread {
  createdAt: string;
  isActive: boolean;
  userId: string;
}

export type ThreadsResponseData = [Threads[], number];

export const maxDuration = 30;

export default class ThreadService {
  public async createThread(thread: NewThread) {
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
    threadId: string, 
    userId?: string
  ): Promise<Threads | undefined> {
    try {
      const thread = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId,
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

  public async updateThread(thread: { threadName?: string; id: string; participants?: string[]}) {
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
