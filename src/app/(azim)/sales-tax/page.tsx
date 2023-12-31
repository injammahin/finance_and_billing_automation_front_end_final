import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'F & B | Sales Tax',
    description: '',
}

const SalesTax = async () => {
    const res = await fetch("http://localhost:5000/sales-tax/report");
    const data = await res.json();
    return (
        <div>
            <h1 className='text-4xl text-black font-bold text-center mt-14'>Sales Tax Report</h1>
            {
                data.map((each, idx) =>
                    <div key={each.id} className="overflow-x-auto w-3/5 mx-auto mt-7">
                        <table className="table bg-rose-300">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>{idx + 1}</th>
                                    <td>{each.productName}</td>
                                    <td>{each.quantity}</td>
                                    <td>{each.price}</td>
                                    <td>{each.tax}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default SalesTax;