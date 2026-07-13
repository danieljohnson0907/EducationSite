import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default function PreLine() {
    return (
        <div className="preline-header">
            <Link to="/">Home</Link>
            <span className="current-page">/ About Us</span>
        </div>
    )
}
