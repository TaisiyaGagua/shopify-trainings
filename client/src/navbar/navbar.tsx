import React from "react";
import ColorModeToggler from "./dark_theme";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <ColorModeToggler />

                <h1>Shop</h1>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-secondary" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
