import { useEffect, useState } from 'react';
import './profile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileBackArrow from '@/icons/ProfileBackArrow';
import Pagination from '@/components/pagination/Pagination';
import Pageone from '@/components/profile/pages/Pageone';
import PageTwo from '@/components/profile/pages/PageTwo';
import PageSix from '@/components/profile/pages/PageSix';
import PageFive from '@/components/profile/pages/PageFive';
import PageFour from '@/components/profile/pages/PageFour';
import PageThree from '@/components/profile/pages/PageThree';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const getTabFromPage = (page: number) => {
    switch (page) {
      case 1:
        return 'personal-information';
      case 2:
        return 'educational-background';
      case 3:
        return 'skills';
      case 4:
        return 'interests';
      case 5:
        return 'experience';
      case 6:
        return 'certificates';
      default:
        return 'personal-information';
    }
  };

  const getPageFromTab = (tab: string) => {
    switch (tab) {
      case 'personal-information':
        return 1;
      case 'educational-background':
        return 2;
      case 'skills':
        return 3;
      case 'interests':
        return 4;
      case 'experience':
        return 5;
      case 'certificates':
        return 6;
      default:
        return 1;
    }
  };

  // Sync currentPage with URL tab on load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');

    if (tab) {
      const page = getPageFromTab(tab);
      setCurrentPage(page);
    } else {
      navigate(`/user-profile?tab=personal-information`, { replace: true });
    }
  }, [location.search, navigate]);

  // Sync URL with currentPage when currentPage changes
  useEffect(() => {
    const currentTab = getTabFromPage(currentPage);
    const currentSearchParams = new URLSearchParams(location.search);
    const existingTab = currentSearchParams.get('tab');

    if (existingTab !== currentTab) {
      navigate(`/user-profile?tab=${currentTab}`, { replace: true });
    }
  }, [currentPage, navigate, location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
