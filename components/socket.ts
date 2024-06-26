import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_API_URL || 'localhost:3001';
export const connectSocket = (accessToken: string) => io(URL, {
    transports: ['websocket'],
    auth: {
        token: accessToken,
    },
});

export const socket = io(URL);