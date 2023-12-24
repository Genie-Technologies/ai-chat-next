import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(`${process.env.NEXT_PUBLIC_API_URL}/ws-chat`);
    socket.on("connect", () => {});
    socket.on("disconnect", () => {});
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};
