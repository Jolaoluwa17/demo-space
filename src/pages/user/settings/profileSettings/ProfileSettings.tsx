import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {
  BsPerson,
  BsBook,
  BsStar,
  BsHeart,
  BsBriefcase,
  BsAward,
} from 'react-icons/bs';

import './profileSettings.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import PersonalInformation from '@/components/settings/PersonalInformation';
import EducationalBackground from '@/components/settings/EducationalBackground';
import Skills from '@/components/settings/Skills';
import AreaOfInterest from '@/components/settings/AreaOfInterest';
import Experience from '@/components/settings/Experience';
import Certificate from '@/components/settings/Certificate';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationToast from '@/components/notificationToast/NotificationToast';

interface EducationEntry {
  institutionName: string;
  degreeObtained: string;
  degreeType: string;
  graduationDate: string;
}

interface Entry {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  companyName: string;
  currentlyWorking: boolean;
}

interface Certification {
  name: string;
  issuedBy: string;
  dateObtained: string;
}

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
    navigate('/dashboard/profile');
  };

  const userid = sessionStorage.getItem('id');

  const {
    data,
    isLoading: userDataIsLoading,
    refetch,
    isError: userDataError,
  } = useGetUserQuery(userid ? userid : '');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [github, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    {
      institutionName: '',
      degreeObtained: '',
      degreeType: '',
      graduationDate: '',
    },
  ]);
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [areaOfInterest, setAreaOfInterest] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([
    {
      title: '',
      description: '',
      companyName: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
    },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: '', issuedBy: '', dateObtained: '' },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    if (data?.response) {
      const response = data.response;

      setFirstName(response.firstName || '');
      setLastName(response.lastName || '');
      setLinkedIn(response.linkedIn || '');
      setGitHub(response.github || '');
      setPhoneNo(response.phoneNumber || '');
      setEmail(response.email || '');
      setImage(response.profileImg || null);
      setSkillSet(
        Array.isArray(response.skillSet) && response.skillSet.length > 0
          ? response.skillSet
          : []
      );

      // Only set areaOfInterest if it contains valid values
      setAreaOfInterest(
        Array.isArray(response.areaOfInterest) &&
          response.areaOfInterest.length > 0
          ? response.areaOfInterest
          : []
      );

      // Map education entries
      setEducationEntries(
        response.education?.map((edu: EducationEntry) => ({
          institutionName: edu.institutionName || '',
          degreeObtained: edu.degreeObtained || '',
          degreeType: edu.degreeType || '',
          graduationDate: edu.graduationDate || '',
        })) || []
      );

      // Map job entries
      setEntries(
        response.job?.map((job: Entry) => ({
          title: job.title || '',
          description: job.description || '',
          companyName: job.companyName || '',
          startDate: job.startDate || '',
          endDate: job.endDate || null,
        })) || []
      );

      // Map certifications
      setCertifications(
        response.certifications?.map((cert: Certification) => ({
          name: cert.name || '',
          issuedBy: cert.issuedBy || '',
          dateObtained: cert.dateObtained || null,
        })) || []
      );
    }
  }, [data]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

  const handleUpdateProfile = async () => {
    setShowToast(false);

    const formData = new FormData();

    if (firstName.trim()) {
      formData.append('firstName', firstName);
    }
    if (lastName.trim()) {
      formData.append('lastName', lastName);
    }
    if (linkedIn.trim()) {
      formData.append('linkedIn', linkedIn);
    }
    if (github.trim()) {
      formData.append('github', github);
    }
    if (phoneNo.trim()) {
      formData.append('phoneNumber', phoneNo);
    }
    if (userid) {
      formData.append('id', userid);
    }
    if (file) {
      formData.append('profileImg', file);
    }

    // Validate and append `educationEntries`
    if (
      educationEntries &&
      educationEntries.some((entry) =>
        Object.values(entry).some(
          (value) => typeof value === 'string' && value.trim() !== ''
        )
      )
    ) {
      formData.append('education', JSON.stringify(educationEntries));
    }

    // Validate and append `skillSet`
    if (skillSet && skillSet.length > 0) {
      skillSet.forEach((skill) => {
        formData.append('skillSet', skill);
      });
    }

    // Validate and append `areaOfInterest`
    if (areaOfInterest && areaOfInterest.length > 0) {
      areaOfInterest.forEach((interest) => {
        formData.append('areaOfInterest', interest);
      });
    }

    // Validate and append `entries`
    if (
      entries &&
      entries.some((entry) =>
        Object.values(entry).some(
          (value) => typeof value === 'string' && value.trim() !== ''
        )
      )
    ) {
      formData.append(
        'job',
        JSON.stringify(entries.map(({ ...rest }) => rest))
      );
    }

    // Validate and append `certifications`
    if (
      certifications &&
      certifications.some((cert) =>
        Object.values(cert).some(
          (value) => typeof value === 'string' && value.trim() !== ''
        )
      )
    ) {
      formData.append('certifications', JSON.stringify(certifications));
    }

    try {
      await updateUserProfile(formData).unwrap();
      refetch();
      setShowToast(true);
      setToastStatus(false);
    } catch (error: unknown) {
      setShowToast(true);
      setToastStatus(true);
      console.log(error);
    } finally {
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
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
                    borderBottom: '2px solid #007BFF',
                    color: '#007BFF',
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
        {showToast && (
          <AnimatePresence>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              className="notification-toast-wrapper"
            >
              <NotificationToast
                msg={
                  toastStatus
                    ? 'Oops 😭! Something went wrong while updating your profile. Please try again later.'
                    : 'Great job 👍🏼! Your profile has been successfully updated, and your changes are now live.'
                }
                toastType={toastStatus ? 'error' : 'success'}
                cancel={() => setShowToast(false)}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {activeTab === 'Personal Information' && (
          <PersonalInformation
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            linkedIn={linkedIn}
            setLinkedIn={setLinkedIn}
            github={github}
            setGitHub={setGitHub}
            phoneNo={phoneNo}
            setPhoneNo={setPhoneNo}
            email={email}
            setEmail={setEmail}
            image={image}
            setImage={setImage}
            handleFileChange={handleFileChange}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
        {activeTab === 'Educational Background' && (
          <EducationalBackground
            educationEntries={educationEntries}
            setEducationEntries={setEducationEntries}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
        {activeTab === 'Skills' && (
          <Skills
            skillSet={skillSet}
            setSkillSet={setSkillSet}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
        {activeTab === 'Area of Interest' && (
          <AreaOfInterest
            areaOfInterest={areaOfInterest}
            setAreaOfInterest={setAreaOfInterest}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
        {activeTab === 'Experience' && (
          <Experience
            entries={entries}
            setEntries={setEntries}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
        {activeTab === 'Certificates' && (
          <Certificate
            certifications={certifications}
            setCertifications={setCertifications}
            userDataIsLoading={userDataIsLoading}
            handleUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            userDataError={userDataError}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
