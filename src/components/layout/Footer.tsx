
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Mail,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Home', href: '/' },
        { label: 'ScienceGents', href: '/explore' },
        { label: 'Capabilities', href: '/capabilities' },
        { label: 'Dashboard', href: '/dashboard' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Whitepaper', href: '/whitepaper' },
        { label: 'FAQs', href: '/faqs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Globe size={18} />, href: '#', label: 'Website' },
    { icon: <Mail size={18} />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mb-4"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-science-400 to-science-600 text-white">
                <span className="text-lg font-bold">SG</span>
              </div>
              <span className="text-xl font-semibold text-foreground">ScienceGents</span>
            </button>
            <p className="text-muted-foreground mb-6 max-w-md">
              ScienceGents Protocol enables anyone to build, deploy, and monetize science-focused AI agents with associated ERC20 tokens that can be traded on decentralized exchanges.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-foreground hover:bg-science-100 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-semibold mb-4 text-foreground">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-muted-foreground hover:text-science-700 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ScienceGents Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
