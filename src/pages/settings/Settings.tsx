import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import './settings.css';
import PersonalInformation from '../../components/settings/PersonalInformation';
import EducationalBackground from '../../components/settings/EducationalBackground';
import Skills from '../../components/settings/Skills';
import AreaOfInterest from '../../components/settings/AreaOfInterest';
import Experience from '../../components/settings/Experience';
import Certificate from '../../components/settings/Certificate';

const Settings = () => {
  const tabs = [
    { name: 'Personal Information', path: 'personal-information' },
    { name: 'Educational Background', path: 'educational-background' },
    { name: 'Skills', path: 'skills' },
    { name: 'Area of Interest', path: 'interest' },
    { name: 'Experience', path: 'experience' },
    { name: 'Certificates', path: 'certificates' },
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

  return (
    <div className="settings_root">
      <div className="settings_tabs_root">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className="settings_tabs"
            style={
              activeTab === tab.name
                ? { borderBottom: '2px solid #4274BA', color: '#4274BA' }
                : { color: 'rgba(117, 117, 117, 1)' }
            }
          >
            <p>{tab.name}</p>
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

export default Settings;
