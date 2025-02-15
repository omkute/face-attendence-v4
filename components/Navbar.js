'use client'

import React from 'react'
import { BellDotIcon } from 'lucide-react'
import useUserInfo from '@/hooks/useUserInfo'

function Navbar() {
    const { userInfo, loading } = useUserInfo();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className=' flex justify-between items-center p-3 min-h-[63px]'>
            <div className=' flex gap-2 items-center'>
                <h2 className=' text-xl font-semibold'>Welcome Back,</h2>
                <h2 className=' text-xl font-semibold text-primary'>{userInfo?.name}</h2>
            </div>
            <div>
                <BellDotIcon className='w-6 h-6 text-primary' />
            </div>
        </section>
    )
}

export default Navbar