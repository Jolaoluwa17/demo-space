import './createUser.css';
import {
  BsPerson,
  BsBook,
  BsStar,
  BsHeart,
  BsBriefcase,
  BsAward,
} from 'react-icons/bs';
import PageHeader from '@/components/pageHeader/PageHeader';

import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PersonalInformation from '@/components/settings/PersonalInformation';
import EducationalBackground from '@/components/settings/EducationalBackground';
import Skills from '@/components/settings/Skills';
import AreaOfInterest from '@/components/settings/AreaOfInterest';
import Experience from '@/components/settings/Experience';
import Certificate from '@/components/settings/Certificate';

const CreateUser = () => {
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
    navigate('/admin/dashboard/user-management');
  };

  return (
    <div className="create_user_root">
      <PageHeader pageTitle="Create User" handleBackClick={handleBackClick} />
      <div className="create_user_tabs_root">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className="create_user_tabs"
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
      <div className="create_user_content_container">
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

export default CreateUser;
