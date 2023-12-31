import React from "react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4"></div>
      <nav className="mt-4">
        <Link
          href="/user/profile"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          View Profile
        </Link>
        <Link
          href="/bank/connect"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Connect Bank
        </Link>
        <Link
          href="/payment/form"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Accept Payment
        </Link>
        <Link
          href="/user/logout"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Log Out
        </Link>
        <div className="group inline-block relative">
          <button className="bg-green-600 text-white rounded-full px-6 py-2 hover:bg-green-700 hover:text-black ">
            file section
          </button>
          <ul className="dropdown-menu absolute hidden bg text-gray-700 pt-1 group-hover:block">
            <li className="nav-link bg-green-600 rounded px-6 py-2">
              <Link href="/file/downloadpdf"> dowlnload pdf</Link>
            </li>
            <li className="nav-link bg-red-400 rounded px-6 py-2">
              <Link href="/file/downloadexcel"> download excel</Link>
            </li>
            <li className="nav-link bg-green-400 rounded px-6 py-2">
              <Link href="/file/upload">upload file</Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Dashboard;
