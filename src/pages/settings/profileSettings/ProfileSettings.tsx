import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import './profileSettings.css';
import PersonalInformation from '../../../components/settings/PersonalInformation';
import EducationalBackground from '../../../components/settings/EducationalBackground';
import Skills from '../../../components/settings/Skills';
import AreaOfInterest from '../../../components/settings/AreaOfInterest';
import Experience from '../../../components/settings/Experience';
import Certificate from '../../../components/settings/Certificate';
import {
  BsPerson,
  BsBook,
  BsStar,
  BsHeart,
  BsBriefcase,
  BsAward,
} from 'react-icons/bs';
import PageHeader from '../../../components/pageHeader/PageHeader';

const ProfileSettings = () => {
  const tabs = [
    {
      name: 'Personal Information',
      path: 'personal-information',
      icon: <BsPerson />,
    },
    {
      name: 'Educational Background',
      path: 'educational-background',
      icon: <BsBook />,
    },
    { name: 'Skills', path: 'skills', icon: <BsStar /> },
    { name: 'Area of Interest', path: 'interest', icon: <BsHeart /> },
    { name: 'Experience', path: 'experience', icon: <BsBriefcase /> },
    { name: 'Certificates', path: 'certificates', icon: <BsAward /> },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const activePath = queryParams.tab || 'personal-information';

  const setActiveTab = (path: string) => {
    navigate({
      pathname: location.pathname,
      search: `?tab=${path}`,
    });
  };

  const activeTab =
    tabs.find((tab) => tab.path === activePath)?.name || 'personal-information';

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <div className="settings_root">
      <PageHeader
        pageTitle="Profile Settings"
        handleBackClick={handleBackClick}
      />
      <div className="settings_tabs_root">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className="settings_tabs"
            style={
              activeTab === tab.name
                ? {
                    borderBottom: '2px solid #4274BA',
                    color: '#4274BA',
                    backgroundColor: 'white',
                  }
                : { color: 'rgba(117, 117, 117, 1)' }
            }
          >
            <p>
              <span className="tab_name">{tab.name}</span>
              {tab.icon && <span className="tabs_icon">{tab.icon}</span>}
            </p>
          </div>
        ))}
      </div>
      <div className="settings_content_container">
        {activeTab === 'Personal Information' && <PersonalInformation />}
        {activeTab === 'Educational Background' && <EducationalBackground />}
        {activeTab === 'Skills' && <Skills />}
        {activeTab === 'Area of Interest' && <AreaOfInterest />}
        {activeTab === 'Experience' && <Experience />}
        {activeTab === 'Certificates' && <Certificate />}
      </div>
    </div>
  );
};

export default ProfileSettings;
