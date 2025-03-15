import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Brand Name */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold tracking-wide text-gray-800 hover:text-primary-500 transition-colors">
              HESTIA
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-6 text-gray-600">
              <li><Link href="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary-500 transition-colors">About</Link></li>
              <li><Link href="/faq" className="hover:text-primary-500 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
            <a href="https://github.com/ebrahimbeiati" aria-label="Github" className="hover:text-gray-700 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/ebrahim-beiatiasl/" aria-label="Linkedin" className="hover:text-blue-600 transition-colors">
              <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            </a>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} HESTIA. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
