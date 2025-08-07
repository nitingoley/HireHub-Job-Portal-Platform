import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 2xl:px-20 py-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-sm">
      {/* Logo */}
      <img width={160} src={assets.logo} alt="Logo" />

      {/* Copyright */}
      <p className="text-gray-600 max-sm:w-full max-sm:text-center">
        © {new Date().getFullYear()} nitingoley.dev | All rights reserved
      </p>

      {/* Social Icons */}
      <div className="flex gap-2.5">
        <img width={30} src={assets.facebook_icon} alt="Facebook" />
        <img width={30} src={assets.twitter_icon} alt="Twitter" />
        <img width={30} src={assets.instagram_icon} alt="Instagram" />
      </div>
    </footer>
  );
};

export default Footer;
