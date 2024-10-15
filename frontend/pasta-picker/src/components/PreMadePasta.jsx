import React from 'react';
import ChangeQuantity from './ChangeQuantity';

// REPLACE PLACEHOLDERS - fetch data properly


const PreMadePasta = ({ data }) => {
    return (
        <>
        <div className="container">
            <h2>Pre-made Pastas</h2>
            <div>
                {data.map(data => (
                    <div key={premadepasta.name}>
                        <p>{data.name}</p>
                        <p>₱{data.price}</p>
                        <div>
                            <p>Qty.</p>
                            <ChangeQuantity />
                        </div>
                    </div>
                ))};
            </div>
        </div>
        </>
    );
};

export default PreMadePasta;