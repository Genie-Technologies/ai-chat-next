import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3002';

export const connectSocket = (accessToken: string) => io(URL, {
    transports: ['websocket'],
    auth: {
        token: accessToken,
    },
});

export const socket = io(URL);