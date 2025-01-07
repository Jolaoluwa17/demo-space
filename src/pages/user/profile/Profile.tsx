import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './profile.css';
import Pagination from '@/components/pagination/Pagination';
import Pageone from '@/components/profile/pages/Pageone';
import PageTwo from '@/components/profile/pages/PageTwo';
import PageSix from '@/components/profile/pages/PageSix';
import PageFive from '@/components/profile/pages/PageFive';
import PageFour from '@/components/profile/pages/PageFour';
import PageThree from '@/components/profile/pages/PageThree';
import ProfileBackArrow from '@/icons/ProfileBackArrow';
import { useUpdateUserProfileMutation } from '@/services/features/user/userSlice';

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
  endDate: string;
  companyName: string;
  currentlyWorking: boolean;
}

interface Certification {
  name: string;
  issuedBy: string;
  dateObtained: string;
}

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(2);
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

  const userid = sessionStorage.getItem('id');

  const [fullName, setFullName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
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

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    // Only append non-empty fields
    if (fullName.trim()) {
      formData.append('fullName', fullName);
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
        JSON.stringify(
          entries.map((entry) => {
            const { ...rest } = entry;
            return rest;
          })
        )
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
      console.log('FormData Contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Uncomment the actual call when ready
      await updateUserProfile(formData).unwrap();
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('Error during profile update:', error);
    }
  };

  const handleFileUpload = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageName(file.name);
    }
  };

  return (
    <div className="profile_root">
      <div className="profile_container">
        <div className="profile_back_button">
          {currentPage > 1 && (
            <div
              className="profile_back_btn_inner"
              onClick={!isLoading ? handleBackButtonClick : undefined}
              style={isLoading ? { color: 'grey' } : {}}
            >
              <ProfileBackArrow color={isLoading ? '#808080' : '#007BFF'} />
              <div style={{ paddingBottom: '6px', paddingLeft: '10px' }}>
                Back
              </div>
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
          {currentPage === 1 && (
            <Pageone
              setCurrentPage={setCurrentPage}
              fullName={fullName}
              setFullName={setFullName}
              phoneNo={phoneNo}
              setPhoneNo={setPhoneNo}
              setFileInput={setFileInput}
              isLoading={isLoading}
              image={image}
              setImage={setImage}
              imageName={imageName}
              setImageName={setImageName}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          )}
          {currentPage === 2 && (
            <PageTwo
              setCurrentPage={setCurrentPage}
              educationEntries={educationEntries}
              setEducationEntries={setEducationEntries}
              isLoading={isLoading}
            />
          )}
          {currentPage === 3 && (
            <PageThree
              setCurrentPage={setCurrentPage}
              skillSet={skillSet}
              setSkillSet={setSkillSet}
              isLoading={isLoading}
            />
          )}
          {currentPage === 4 && (
            <PageFour
              setCurrentPage={setCurrentPage}
              areaOfInterest={areaOfInterest}
              setAreaOfInterest={setAreaOfInterest}
              isLoading={isLoading}
            />
          )}
          {currentPage === 5 && (
            <PageFive
              setCurrentPage={setCurrentPage}
              entries={entries}
              setEntries={setEntries}
              isLoading={isLoading}
            />
          )}
          {currentPage === 6 && (
            <PageSix
              handleUpdateProfile={handleUpdateProfile}
              certifications={certifications}
              setCertifications={setCertifications}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
