"use client";

import React, { useState, useEffect } from 'react';
import {socket} from "@/app/lib/socket";

export default function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<any>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);

            console.log('Connected');

            socket.emit('events', { test: 'test' });
            socket.emit('identity', 0, (response: any) =>
                console.log('Identity:', response),
            );
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value: any) {
            setFooEvents((previous: any) => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        socket.on('events', function(data) {
            console.log('event', data);
        });
        socket.on('exception', function(data) {
            console.log('event', data);
        });

        // return () => {
        //     socket.off('connect', onConnect);
        //     socket.off('disconnect', onDisconnect);
        //     socket.off('foo', onFooEvent);
        // };
    }, []);

    return (
        <div className="App">
        </div>
    );
}