"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="px-6">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="font-bold cursor-pointer">
            Testing
          </Link>
          <div>
            <ul className="flex justify-center text-base items-center gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/posts">Posts</Link>
              </li>
            </ul>
          </div>
          <button className="px-4 py-2 bg-white text-black rounded-full ">
            Login
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
