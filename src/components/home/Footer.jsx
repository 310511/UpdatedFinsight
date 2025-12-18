import React from 'react';
import logo from "../../assets/logo.png"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API Status', href: '#' },
      { name: 'Community', href: '#' }
    ],
    contact: [
      { icon: <Mail className="w-4 h-4" />, text: 'hello@fintech.com', href: 'mailto:hello@fintech.com' },
      { icon: <Phone className="w-4 h-4" />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
      { icon: <MapPin className="w-4 h-4" />, text: '123 Tech Street, San Francisco, CA 94107', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* LOGO + DESCRIPTION */}
          <div className="lg:w-1/2">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mr-3">
                
                <img src={logo} alt="" width={80} height={80}/>
              </div>
              <span className="text-2xl font-bold text-white">FINSIGHT</span>
            </div>

            <p className="text-gray-400 mb-4 max-w-md">
              Transform your financial documents into actionable insights with our AI-powered platform.
              Secure, accurate, and lightning-fast processing for modern businesses.
            </p>

            {/* NEWSLETTER */}
            <div>
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* COMPANY + SUPPORT + CONTACT IN SAME LINE */}
          <div className="flex flex-col sm:flex-row justify-between lg:w-1/3 gap-18">
            
            {/* COMPANY */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="flex items-center text-gray-400 hover:text-white">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="flex items-center text-gray-400 hover:text-white">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Contact</h3>
              <ul className="space-y-3">
                {footerLinks.contact.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-0.5 text-gray-500">{item.icon}</span>
                    <a href={item.href} className="text-gray-400 hover:text-white">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          
          {/* SOCIAL ICONS */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Finsight. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
