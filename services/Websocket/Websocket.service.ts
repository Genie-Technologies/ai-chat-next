import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3001/ws-chat");
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};
