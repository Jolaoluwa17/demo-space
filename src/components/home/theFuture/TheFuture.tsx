import './theFuture.css';

const TheFuture = () => {
  return (
    <div className="the_future_root">
      <div className="the_future_container">
        <div className="left">
          <div className="the_future_title">
            The Future of <span>Skill Evaluation and Career</span> Growth
          </div>
          <div className="the_future_subTitle">
            Go borderless on mobile! Download the app and sign up to assess your
            skills, bridge gaps, and unlock new career opportunities from
            anywhere in the world.
          </div>
          <div className="the_future_download_our">Download our app</div>
          <div className="the_future_download_btn_conatiner">
            <div className="the_future_download_btn">
              <img src="/images/AppStore.svg" alt="" className="btn_img" />
            </div>
            <div className="the_future_download_btn">
              <img src="/images/PlayStore.svg" alt="" className="btn_img" />
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/images/TheFuture.svg"
            alt=""
            className="the_future_phone_img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default TheFuture;
