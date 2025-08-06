"use client";

import Image from 'next/image';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useRouter } from 'next/router';

const USER_IMAGE = 'https://imgs.search.brave.com/hqIOamO7T-6BQnUCoO3untWjdUw0TJ8xykS6FGHl6cQ/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4z/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1hdmF0/YXJzLTEvNTEyL3Vz/ZXJzLTItMTI4LnBu/Zw';

function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className='flex justify-between items-center p-3 border-b-4 border-red-500 bg-white z-50 shadow-sm'>
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
        <img
          src="/images/logo.webp"
          width={50}
          height={50}
          alt="ninja player logo"
          className="h-12 w-auto"
        />
        <span className="text-2xl font-mono font-bold hidden sm:inline">NINJA</span>
      </div>

      {/* Buttons + User */}
      <div className='flex gap-4 items-center'>
        <button
          onClick={() => router.push('/create-post')}
          className='bg-black text-white px-4 py-2 rounded-full text-sm shadow hover:bg-gray-900 transition-all duration-300'
        >
          <span className='hidden sm:block'>CREATE POST</span>
          <HiOutlinePencilSquare className='sm:hidden text-[17px]' />
        </button>

        {!session ? (
          <button
            onClick={() => signIn("google")}
            className='bg-white text-gray-500 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition'
          >
            <span className='hidden sm:block'>SIGN IN</span>
            <HiArrowLeftOnRectangle className='sm:hidden text-[17px]' />
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className='bg-white text-gray-500 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition'
          >
            <span className='hidden sm:block'>SIGN OUT</span>
            <HiArrowLeftOnRectangle className='sm:hidden text-[17px]' />
          </button>
        )}

        {session && (
          <Image
            src={session.user?.image || USER_IMAGE}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full cursor-pointer object-cover shadow-md"
            onClick={() => router.push('/profile')}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}

export default Header;
