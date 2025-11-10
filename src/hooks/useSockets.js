import { useEffect, useState } from "react";

export const useSocket = () => {
    const [socket, setSocket] =  useState(null);

    useEffect(()=>{
        const ws = new WebSocket(import.meta.env.VITE_WS_URL);
        ws.onopen = () => {
            console.log('connected');
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log('disconnected');
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    }, [])

    return socket;
}