import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/add-task">Add Task</NavLink></li>
        </>
    );

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                // Optionally add a success message
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="navbar bg-[#3B82F6] px-3 sm:px-10 lg:px-14">
            {/* Navbar start */}
            <div className="navbar-start">
                {/* Mobile dropdown toggle button */}
                <div className="dropdown lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="btn btn-ghost"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <ul
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            onClick={() => setIsMenuOpen(false)} // Close the menu when clicked
                        >
                            {links}
                        </ul>
                    )}
                </div>
                <Link to="/" className="text-xl text-white">
                    Task Manager
                </Link>
            </div>
            {/* Navbar end */}
            <div className="navbar-end">
                {/* Desktop menu */}
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    {links}
                </ul>
                {/* User authentication */}
                {user ? (
                    <button onClick={handleSignOut} className="btn">Logout</button>
                ) : (
                    <Link to="/login" className="btn">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;