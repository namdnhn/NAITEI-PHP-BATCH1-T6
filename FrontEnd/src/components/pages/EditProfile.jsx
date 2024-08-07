import React from 'react';

const EditProfile = () => {
    return (
        <div className='flex'>
            <div className='w-1/2'>
                <h2 className='font-bold text-xl mt-4 mb-4'>Email Address</h2>
                <form>
                    <input
                        type='email'
                        placeholder='Current Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='email'
                        placeholder='New Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='email'
                        placeholder='Re-enter New Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='submit'
                        value='UPDATE MY EMAIL'
                        className="flex justify-center items-center mb-4 w-80 h-10 bg-black text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </form>

            </div>
            <div className='w-1/2'>
                <h2 className='font-bold text-xl mt-4 mb-4'>Reset Password</h2>
                <form>
                    <input
                        type='email'
                        placeholder='Current Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='email'
                        placeholder='New Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='email'
                        placeholder='Re-enter New Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type='submit'
                        value='UPDATE PASSWORD'
                        className="flex justify-center items-center mb-4 w-80 h-10 bg-black text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
