import { useEffect, useState } from 'react';
import Pagination from '../../components/pagination/Pagination';
import './profile.css';
import Pageone from '../../components/profile/pages/Pageone';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTwo from '../../components/profile/pages/PageTwo';
import PageThree from '../../components/profile/pages/PageThree';
import PageFour from '../../components/profile/pages/PageFour';
import PageFive from '../../components/profile/pages/PageFive';
import PageSix from '../../components/profile/pages/PageSix';
import ProfileBackArrow from '../../icons/ProfileBackArrow';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');

    // Set default page based on tab parameter or default to page 1
    switch (tab) {
      case 'personal-information':
        setCurrentPage(1);
        break;
      case 'educational-background':
        setCurrentPage(2);
        break;
      case 'skills':
        setCurrentPage(3);
        break;
      case 'interests':
        setCurrentPage(4);
        break;
      case 'experience':
        setCurrentPage(5);
        break;
      case 'certificates':
        setCurrentPage(6);
        break;
      default:
        setCurrentPage(1);
    }
  }, [location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    let tab = '';
    switch (page) {
      case 1:
        tab = 'personal-information';
        break;
      case 2:
        tab = 'educational-background';
        break;
      case 3:
        tab = 'skills';
        break;
      case 4:
        tab = 'interests';
        break;
      case 5:
        tab = 'experience';
        break;
      case 6:
        tab = 'certificates';
        break;
      default:
        tab = '';
    }
    navigate(`/user-profile?tab=${tab}`);
  };

  const handleBackButtonClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="profile_root">
      <div className="profile_container">
        <div className="profile_back_button">
          {currentPage > 1 && (
            <div
              className="profile_back_btn_inner"
              onClick={handleBackButtonClick}
            >
              <ProfileBackArrow />
              <div style={{ paddingBottom: '6px' }}>Back</div>
            </div>
          )}
        </div>
        <div className="profile_title">Complete Your Profile</div>
        <div className="profile_subTitle">
          Please provide the following information to complete your profile
          setup. This information will help us tailor your experience and
          connect you with the best opportunities.
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
        <div className="content">
          {currentPage === 1 && <Pageone setCurrentPage={setCurrentPage} />}
          {currentPage === 2 && <PageTwo setCurrentPage={setCurrentPage} />}
          {currentPage === 3 && <PageThree setCurrentPage={setCurrentPage} />}
          {currentPage === 4 && <PageFour setCurrentPage={setCurrentPage} />}
          {currentPage === 5 && <PageFive setCurrentPage={setCurrentPage} />}
          {currentPage === 6 && <PageSix />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
