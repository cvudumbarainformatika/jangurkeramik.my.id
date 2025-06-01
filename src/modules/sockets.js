import { io } from "socket.io-client";

const WS = import.meta.env.VITE_PATH_WS
export const socket = io(WS, {
  transports: ['websocket'],
  secure: true
})

