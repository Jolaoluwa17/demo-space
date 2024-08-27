import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import './settings.css';
import PersonalInformation from '../../components/settings/PersonalInformation';
import EducationalBackground from '../../components/settings/EducationalBackground';
import Skills from '../../components/settings/Skills';

const Settings = () => {
  const tabs = [
    { name: 'Personal Infromation', path: 'personal-information' },
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
        {activeTab === 'Personal Infromation' && <PersonalInformation />}
        {activeTab === 'Educational Background' && <EducationalBackground />}
        {activeTab === 'Skills' && <Skills />}
      </div>
    </div>
  );
};

export default Settings;
