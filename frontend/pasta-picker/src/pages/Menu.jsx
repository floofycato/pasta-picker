import React from 'react';
import MyoPasta from '../components/MyoPasta';
import PreMadePasta from '../components/PreMadePasta';
import ShoppingCart from '../components/ShoppingCart';

const Menu = () => {
  return (
    <>
        <div>
            <a href="#myopasta">Pasta Picker</a>
            <a href="#premade-pasta">Pre-made Pastas</a>
        </div>
        <div id="myopasta">
            <MyoPasta />
        </div>
        <div id="premade-pasta">
            <PreMadePasta />
        </div>
        <div>
            <ShoppingCart />
        </div>
        <div>
            <Link to="/checkout">
                <button>Proceed to Checkout</button>
            </Link>
        </div>

    </>
  );
};

export default Menu; 