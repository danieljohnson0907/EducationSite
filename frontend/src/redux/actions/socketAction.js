import io from "socket.io-client";

export const socket = io("https://educationsite-production.up.railway.app", {
  transports: ["websocket"],
});