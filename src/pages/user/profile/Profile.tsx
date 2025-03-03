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
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  // Modify the page change handler to update URL directly
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Modify back button handler to use the same pattern
  const handleBackButtonClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userIdFromParams = searchParams.get('id');

  const userid = userIdFromParams
    ? userIdFromParams
    : sessionStorage.getItem('id');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [github, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
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
  const { data, isLoading: userDataIsLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  useEffect(() => {
    if (data?.response) {
      const response = data.response;

      setFirstName(response.firstName || '');
      setLastName(response.lastName || '');
      setLinkedIn(response.linkedIn || '');
      setGitHub(response.github || '');
      setPhoneNo(response.phoneNumber || '');
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

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    // Only append non-empty fields
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

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error: unknown) {
      console.log('Error during profile update:', error);
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
              setCurrentPage={handlePageChange}
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
              setFileInput={setFileInput}
              isLoading={isLoading}
              image={image}
              setImage={setImage}
              imageName={imageName}
              setImageName={setImageName}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
              userDataIsLoading={userDataIsLoading}
            />
          )}
          {currentPage === 2 && (
            <PageTwo
              setCurrentPage={handlePageChange}
              educationEntries={educationEntries}
              setEducationEntries={setEducationEntries}
              isLoading={isLoading}
            />
          )}
          {currentPage === 3 && (
            <PageThree
              setCurrentPage={handlePageChange}
              skillSet={skillSet}
              setSkillSet={setSkillSet}
              isLoading={isLoading}
            />
          )}
          {currentPage === 4 && (
            <PageFour
              setCurrentPage={handlePageChange}
              areaOfInterest={areaOfInterest}
              setAreaOfInterest={setAreaOfInterest}
              isLoading={isLoading}
            />
          )}
          {currentPage === 5 && (
            <PageFive
              setCurrentPage={handlePageChange}
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
