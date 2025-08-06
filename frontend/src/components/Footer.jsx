import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container items-center justify-between px-4 2xl:px-20 mx-auto flex ">
      <img width={160} src={assets.logo} alt="" />
      <p className="flex-1  border-1 border-gray-200 max-sm:hidden pl-4 text-sm ">Copyright @nitingoley.dev | All right reserved</p>
      <div className="flex gap-2.5 ">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
