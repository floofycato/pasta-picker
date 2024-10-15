import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <header>
        <img src="" alt="header"/>
        <h1>Create your perfect pasta dish with Pasta Picker</h1>
        <p>Choose your pasta, sauce, and toppings!</p>
        <Link to='/menu'>Order now</Link>
      </header>
      <div>
        <div>
          <h2>Why Choose Pasta Picker</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam maiores commodi, delectus nemo possimus, architecto consectetur quasi animi repellat iusto aperiam dolore nisi? Perferendis voluptatum iusto, magni excepturi voluptatem animi?</p>
        </div>
        <div>
          <h2>How it works</h2>
          <p>Step 1: Choose your pasta</p>
          <p>Step 2: Select your sauce</p>
          <p>Step 3: Add toppings</p>
        </div>
      </div>
    </>
  );
};

export default Home;
