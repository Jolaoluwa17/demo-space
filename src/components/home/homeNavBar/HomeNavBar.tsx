import './homeNavBar.css';

const HomeNavBar = () => {
  return (
    <div className="home_nav_bar_root">
      <div className="homeNav_techwings_logo">
        <img src="/images/SideBarTechWingsLogo.svg" alt="" />
      </div>
      <div className="home_nav_btn_container">
        <div className="home_nav_btn">Home</div>
        <div className="home_nav_btn">Features</div>
        <div className="home_nav_getStarted">Get Started</div>
      </div>
    </div>
  );
};

export default HomeNavBar;
