import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'F & B | Fixed Assets',
    description: '',
}

const FixedAssets = async () => {
    const res = await fetch("http://localhost:5000/fixed-assets/all-assets");
    const data = await res.json();
    return (
        <div>
            <div>
                {
                    data.map(({ id, assetName, purchaseDate, purchaseCost, currentValue, depreciationRate }) =>
                        <div key={id} className='w-full mx-auto'>
                            <h2 className="text-center text-4xl font-bold text-black my-8">My Assets</h2>
                            <div className='flex justify-center gap-20'>
                                <div className='bg-purple-400 px-20 py-7 rounded-xl text-black space-y-2'>
                                    <h3>Asset Name: {assetName}</h3>
                                    <h3>Date of Purchase: {purchaseDate} </h3>
                                    <h3>Purchasing Cost: {purchaseCost} </h3>
                                    <h3>Current Value: {currentValue} </h3>
                                    <h3>Depreciation Rate: {depreciationRate} </h3>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FixedAssets;