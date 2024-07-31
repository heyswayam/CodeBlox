import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-800 w-full">
      <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between rounded-md">
        <span className="text-sm mx-auto text-gray-500 text-center dark:text-gray-400">
          © <a href="https://github.com/heyswayam" className="hover:underline">Made by Swayam</a>. All Rights Reserved.
        </span>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
}
