import { useState } from 'react'
import Chat from './Chat';
import Home from './Home';

export default function Index() {
    const [open, setOpen] = useState(false);
    const [room, setRoom] = useState(null);

    return open ? (<Chat room={room} />) : (<Home setOpen={setOpen} setRoom={setRoom} />);
}
