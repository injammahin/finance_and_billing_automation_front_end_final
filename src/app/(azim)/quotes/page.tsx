import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'F & B | Quotes',
    description: '',
}

const Quotes = async () => {
    const res = await fetch("http://localhost:5000/quotes/all-quotes");
    const data = await res.json();
    return (
        data.map(each =>
            <>
                <h1 className='text-4xl text-black font-bold text-center mt-14'>Sales Quote</h1>
                <div className="overflow-x-auto w-3/5 mx-auto mt-14">
                    <h2 className='text-black font-semibold'>Quote #{each.id} </h2>
                    <h2 className='text-black font-semibold'>Customer Name: {each.customerName}</h2>
                    <h2 className='text-black font-semibold'>Prepared Date: {each.preparedDate} </h2>
                    <table className="table mt-7 bg-rose-300">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>{each.productName}</td>
                                <td>{each.quantity}</td>
                                <td>{each.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    );
};

export default Quotes;