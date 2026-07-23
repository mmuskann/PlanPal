import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>PlanPal</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search posts..."
                />
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
            </div>
        </nav>
    )
}

export default Navbar