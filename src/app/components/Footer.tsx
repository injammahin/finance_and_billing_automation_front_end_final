import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Web Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Graphic Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  SEO
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Legal</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
