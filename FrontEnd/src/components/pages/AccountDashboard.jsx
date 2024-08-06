import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const AccountDashboard = () => {
    return (
        <div className="font-sans">
            <img
                src="https://cdn.shopify.com/s/files/1/2170/8465/files/SM_PASS_Track_My_Statues_Desktop.jpg?v=1648007688"
                alt ="SM PASS"
                className="p-8 mt-8"
                />
            <div className="p-4">
                <p className="font-bold text-xl">HI, YOU!</p>
                <p className="text-xl">You can review and edit your account settings and orders here</p>
            </div>
            <aside className='flex'>
                <section className="flex w-1/2">
                    <div className='w-1/8 p-4'>
                        <img src="https://cdn.shopify.com/s/files/1/2170/8465/files/profile.png?7558059524487936893" alt="My Profile Icon"></img>
                    </div>
                    <div className='w-7/8 p-4'>
                        <h2 className='text-xl font-bold mb-4'>MY PROFILE</h2>
                        <h3 className='font-bold mb-4'> MY PROFILE INFORMATION</h3>
                        <p className='text-xl font-bold'>Name: </p>
                        <p className='text-xl font-bold'>Email: </p>
                        <p className='text-xl font-bold'>Password: </p>
                        <hr className="my-4 border-t-4 border-black" />
                        <div className=''>
                            <Link to="/profile/edit-profile" className="hover:underline">EDIT MY PROFILE</Link>
                        </div>
                    </div>
                </section>
                <section className='flex w-1/2'>
                    <div className='w-1/8 p-4'>
                        <img src="https://cdn.shopify.com/s/files/1/2170/8465/files/addressbook.png?13943347315730888" alt="My Addressbook Icon"/>
                    </div>
                    <div className='w-7/8 p-4'>
                        <h2 className='text-xl font-bold mb-4'>MY ADDRESS BOOK</h2>
                        <p className='text-xl font-bold'>Name: </p>
                        <p className='text-xl font-bold'>Address: </p>
                        <hr className="my-4 border-t-4 border-black" />
                        <div className=''>
                            <Link to="/profile/my-address-book" className="hover:underline">VIEW ADDRESS BOOK</Link>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default AccountDashboard;
