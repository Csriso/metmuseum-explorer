import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
            </ul>
        </div>
    )
}
