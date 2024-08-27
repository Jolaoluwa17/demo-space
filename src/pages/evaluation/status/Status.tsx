import { useState } from 'react';
import NavigationArrow from '../../../icons/NavigationArrow';
import './status.css';

const Status = () => {
  const [status] = useState(Math.random() < 0.5);

  return (
    <div className="status_root">
      {!status ? (
        <div>
          <div className="status_container">
            <img src="/images/failure.svg" alt="failure" />
            <div className="status_text">
              Don't Worry! You didn't pass this time.
            </div>
            <div className="status_statement">
              We recommend you take our Skill Gap Program <br /> to improve your
              skills and try again.
            </div>
            <div className="navigation_btn">
              Go to Skill Gap program
              <div className="navigation_arrow">
                <NavigationArrow />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="status_container">
            <img src="/images/success.svg" alt="success" />
            <div className="status_text">Congratulations!</div>
            <div className="status_statement">
              You have successfully passed the evaluation and <br /> will
              receive an email with login details to access <br /> VetPro, our
              job portal website.
            </div>
            <div className="navigation_btn">
              Back to home
              <div className="navigation_arrow">
                <NavigationArrow />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
