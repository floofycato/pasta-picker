import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="nav">
            {/* 
            <div>
                <Link to="/" className="Home">
                    <img src="" alt="pasta-picker-logo"/>
                </Link>
            </div>
            */}
            <div>
                <Link to="/" className="home">
                    <button>Home</button>
                </Link>
                <Link to="/menu" className="menu">
                    <button>Menu</button>
                </Link>
                {/* <Link to="/about" className="about">
                    <button>About</button>
                </Link>
                <Link to="/contact" className="contact">
                    <button>Contact</button>
                </Link> */}
                <Link to="/login" className="Login">
                    <button>Login</button>
                </Link>
                
                <Link to="/checkout" className="checkout">
                    <button>Checkout</button>
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;