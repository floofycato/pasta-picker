import React from 'react';
import MyoPastaButtons from './MyoPastaButtons';

// REPLACE PLACEHOLDERS - fetch data properly

const MyoPasta = ({ data }) => {
    return (
        <>
            <div>
                <h2>Pasta Picker</h2>
                <p>from ₱500.00</p> {/* PRICE PLACEHOLDER */}
            </div>
            <div className="step-1">
                <p>Step 1: Choose your Pasta</p>
                <p>Pick one (1)</p>
                <div>
                    {data.map(data => (
                        <div key={data.name}>
                            <img src={data.image} alt={data.name} />
                            <p>{data.name}</p>
                            <input type="radio"/>
                        </div>
                    ))};
                </div>
            </div>
            <div className="step-2">
                <p>Step 2: Select your Sauce</p>
                <p>Pick one (1)</p>
                <div>
                    {data.map(data => (
                        <div key={data.name}>
                            <img src={data.image} alt={data.name} />
                            <p>{data.name}</p>
                            <input type="radio"/>
                        </div>
                    ))};
                </div>
            </div>
            <div className="step-3">
                <p>Step 3: Add toppings</p>
                <p>Pick one (1)</p>
                <div>
                    {data.map(data => (
                        <div key={data.name}>
                            <img src={data.image} alt={data.name} />
                            <p>{data.name}</p>
                            <input type="radio"/>
                        </div>
                    ))};
                </div>
                <div>
                    <p>Extras: Optional, max three (3)</p>
                    <div>
                        {data.map(data => (
                            <div key={data.name}>
                                <input type="checkbox" />
                                <p>{data.name}</p>
                            </div>
                        ))};
                    </div>
                </div>
            </div>
            <MyoPastaButtons />
        </>
    );
};

export default MyoPasta;