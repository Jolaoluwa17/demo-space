import React, { useRef, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';

import './pages.css';
import EditProfileIcon from '@/icons/EditProfileIcon';
import { Link } from 'react-router-dom';

interface Props {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  linkedIn: string;
  setLinkedIn: (linkedIn: string) => void;
  github: string;
  setGitHub: (github: string) => void;
  phoneNo: string; // Made required
  setPhoneNo: (phoneNo: string) => void; // Made required
  email?: string;
  setEmail?: (email: string) => void;
  isLoading?: boolean;
  image?: string | null;
  setImage?: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userDataIsLoading?: boolean;
  userDataError?: boolean;
  handleUpdateProfile?: () => Promise<void>;
  darkmode: boolean;
}

const country = [
  { country: 'NG', code: '+234' },
  { country: 'US', code: '+1' },
  { country: 'GB', code: '+44' }, // United Kingdom
  { country: 'DE', code: '+49' }, // Germany
];

const PersonalInformation: React.FC<Props> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  linkedIn,
  setLinkedIn,
  github,
  setGitHub,
  phoneNo,
  setPhoneNo,
  email,
  setEmail,
  handleFileChange,
  image,
  userDataIsLoading,
  handleUpdateProfile,
  userDataError,
  isLoading,
  darkmode,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedCode, setSelectedCode] = useState<string>('+234');

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePhoneNumberChange = (input: string) => {
    // Remove non-numeric characters
    const sanitizedInput = input.replace(/\D/g, '');

    // Prevent starting with 0
    if (sanitizedInput.startsWith('0')) {
      return;
    }

    setPhoneNo(`${selectedCode}${sanitizedInput}`);
  };

  const getPhoneNumberWithoutCode = (
    fullNumber: string,
    code: string
  ): string => {
    return fullNumber.startsWith(code) ? fullNumber.slice(code.length) : '';
  };

  const formatPhoneNumber = (
    phoneNo: string,
    country: Array<{ code: string; country: string }>
  ) => {
    if (!phoneNo) return '';

    // Find the country code from the phone number
    const countryCode =
      country.find((item) => phoneNo.startsWith(item.code))?.code || '';

    if (!countryCode) return phoneNo;

    // Get the number without the country code
    const numberWithoutCode = phoneNo.slice(countryCode.length);

    // Format as (countryCode) rest-of-number
    return `(${countryCode}) ${numberWithoutCode}`;
  };

  const getCountryCode = (phone: string): string | undefined => {
    return country.find((item) => phone.startsWith(item.code))?.code;
  };

  // Store temporary values while editing
  const [tempValues, setTempValues] = useState({
    firstName: '',
    lastName: '',
    linkedIn: '',
    github: '',
    phoneNo: '',
    selectedCode: '+234',
  });

  // When entering edit mode, store current values
  const handleEditClick = () => {
    if (!isLoading && !userDataIsLoading && !userDataError) {
      if (!edit) {
        // Entering edit mode - store current values
        setTempValues({
          firstName,
          lastName,
          linkedIn,
          github,
          phoneNo,
          selectedCode: getCountryCode(phoneNo) || '+234',
        });
        setEdit(true);
      } else {
        // Canceling - restore original values
        setFirstName(tempValues.firstName);
        setLastName(tempValues.lastName);
        setLinkedIn(tempValues.linkedIn);
        setGitHub(tempValues.github);
        setPhoneNo(tempValues.phoneNo);
        setEdit(false);
      }
    }
  };

  const [edit, setEdit] = useState(false);

  return (
    <div className={`settings_content ${darkmode && 'settings_content_dark'}`}>
      <div className="settings_main">
        <div className="settings_page_header">Personal Information</div>
        <div className="settings_page_subHeader">
          This information will be used to create your personal profile.
        </div>
        <div
          className="settings_page_profile_pic"
          onClick={edit ? triggerFileUpload : undefined}
          style={{ cursor: edit ? 'pointer' : 'auto' }}
        >
          {image ? (
            <img
              src={image}
              alt="profile_picture"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <IoPersonSharp fontSize={60} color="white" />
          )}
          {edit && (
            <div className="profile_edit">
              <EditProfileIcon />
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept=".png, .jpeg, .jpg, .svg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={userDataIsLoading || isLoading}
        />

        <div className="profile_form_item_main_1">
          <div className="profile_form_item_1">
            <label htmlFor="firstName">First Name</label>
            {edit ? (
              <input
                type="text"
                className="profile_input_item"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={userDataIsLoading || isLoading}
              />
            ) : userDataIsLoading ? (
              <div className="profile_input_item_none">
                <PulseLoader size={8} color="#007bff" />
              </div>
            ) : userDataError || !firstName ? (
              <div className="profile_input_item_none">No Data</div>
            ) : (
              <div className="profile_input_item_none">{firstName}</div>
            )}
          </div>
          <div className="profile_form_item_1">
            <label htmlFor="lastName">Last Name</label>
            {edit ? (
              <input
                type="text"
                className="profile_input_item"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={userDataIsLoading || isLoading}
              />
            ) : userDataIsLoading ? (
              <div className="profile_input_item_none">
                <PulseLoader size={8} color="#007bff" />
              </div>
            ) : userDataError || !lastName ? (
              <div className="profile_input_item_none">No Data</div>
            ) : (
              <div className="profile_input_item_none">{lastName}</div>
            )}
          </div>
        </div>

        <div className="profile_pageone_form_item">
          <label htmlFor="phoneNo">Enter Phone Number</label>
          {edit ? (
            <div className="phoneNo_container_code">
              <select
                value={selectedCode}
                onChange={(e) => {
                  const newCode = e.target.value;
                  setSelectedCode(newCode);
                  const numberWithoutCode = getPhoneNumberWithoutCode(
                    phoneNo,
                    selectedCode
                  );
                  setPhoneNo(`${newCode}${numberWithoutCode}`);
                }}
                disabled={userDataIsLoading || isLoading}
                style={{ borderColor: '#e7ebe6' }}
              >
                {country.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.code} ({item.country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="phoneNo"
                className="profile_pageone_input"
                style={{ borderColor: '#e7ebe6' }}
                value={getPhoneNumberWithoutCode(phoneNo, selectedCode)}
                maxLength={15}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                disabled={userDataIsLoading || isLoading}
              />
            </div>
          ) : userDataIsLoading ? (
            <div className="profile_input_item_none">
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || !phoneNo ? (
            <div className="profile_input_item_none">No Data</div>
          ) : (
            <div className="profile_input_item_none">
              {formatPhoneNumber(phoneNo, country)}
            </div>
          )}
        </div>

        <div className="profile_form_item">
          <label htmlFor="github">GitHub</label>
          {edit ? (
            <input
              type="text"
              className="profile_input_item"
              name="github"
              value={github}
              onChange={(e) => setGitHub(e.target.value)}
              disabled={userDataIsLoading || isLoading}
            />
          ) : userDataIsLoading ? (
            <div className="profile_input_item_none">
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || !github ? (
            <div className="profile_input_item_none">No Data</div>
          ) : (
            <Link to={github} target="_blank" rel="noopener noreferrer">
              <div
                className="profile_input_item_none"
                style={{
                  textDecoration: 'underline',
                  color: '#007bff',
                  cursor: 'pointer',
                }}
              >
                {github}
              </div>
            </Link>
          )}
        </div>

        <div className="profile_form_item">
          <label htmlFor="linkedIn">LinkedIn</label>
          {edit ? (
            <input
              type="text"
              className="profile_input_item"
              name="linkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              disabled={userDataIsLoading || isLoading}
            />
          ) : userDataIsLoading ? (
            <div className="profile_input_item_none">
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || !linkedIn ? (
            <div className="profile_input_item_none">No Data</div>
          ) : (
            <Link to={linkedIn} target="_blank" rel="noopener noreferrer">
              <div
                className="profile_input_item_none"
                style={{
                  textDecoration: 'underline',
                  color: '#007bff',
                  cursor: 'pointer',
                }}
              >
                {linkedIn}
              </div>
            </Link>
          )}
        </div>

        <div className="profile_form_item">
          <label htmlFor="email">Email Address</label>
          {edit ? (
            <input
              type="text"
              className="profile_input_item"
              name="email"
              value={email || ''}
              onChange={(e) => setEmail?.(e.target.value)}
              disabled
            />
          ) : userDataIsLoading ? (
            <div className="profile_input_item_none">
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || !email ? (
            <div className="profile_input_item_none">No Data</div>
          ) : (
            <div className="profile_input_item_none">{email}</div>
          )}
        </div>
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor:
                isLoading || userDataIsLoading || userDataError
                  ? 'grey'
                  : edit
                    ? 'red'
                    : '#007BFF',
              cursor:
                isLoading || userDataIsLoading || userDataError
                  ? 'not-allowed'
                  : 'pointer',
            }}
            onClick={handleEditClick}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : edit ? (
              'CANCEL'
            ) : (
              'EDIT INFORMATION'
            )}
          </div>
          {edit && (
            <div
              className="settings_edit_btn"
              style={{
                backgroundColor: isLoading ? 'grey' : '#007BFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
              onClick={() => {
                if (!isLoading && handleUpdateProfile) {
                  // Check if handleUpdateProfile is defined
                  handleUpdateProfile();
                  setEdit(false); // Set edit to false after clicking
                }
              }}
            >
              {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
