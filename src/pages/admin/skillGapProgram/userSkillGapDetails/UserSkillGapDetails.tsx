import PageHeader from '@/components/pageHeader/PageHeader';
import '@/pages/admin/userManagement/userDetails/userDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCheckmark, IoCheckmarkDone, IoPersonSharp } from 'react-icons/io5';
import { BiX } from 'react-icons/bi';
import { useGetUserQuery } from '@/services/features/user/userSlice';
import { FadeLoader } from 'react-spinners';
import {
  useAcceptSkillGapMutation,
  useDeclineSkillGapMutation,
  useGetAllInternshipQuery,
} from '@/services/features/skillGap/skillGapSlice';
import { HiOutlineXMark } from 'react-icons/hi2';

const UserSkillGapDetails = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/admin/dashboard/skill-gap-program');
  };

  const location = useLocation();

  // Use URLSearchParams to get query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');

  const { data, isLoading } = useGetUserQuery(userId);

  const { data: getApply, isLoading: internshipLoading } =
    useGetAllInternshipQuery({});

  const filteredInternships = getApply?.response?.filter(
    (item: { userId: { _id: string } }) => item.userId?._id === userId
  );

  const [accept, { isLoading: acceptLoading }] = useAcceptSkillGapMutation();

  const handleAccept = async (internshipId: string) => {
    const internshipData = {
      id: internshipId,
    };
    try {
      await accept(internshipData).unwrap();
      console.log('accepted');
    } catch (error) {
      console.log(error);
    }
  };

  const [decline, { isLoading: declineLoading }] = useDeclineSkillGapMutation();

  const handleDecline = async (internshipId: string) => {
    const internshipData = {
      id: internshipId,
    };
    try {
      await decline(internshipData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user_details_root">
      <PageHeader pageTitle="User Details" handleBackClick={handleBackClick} />
      {isLoading || internshipLoading ? (
        <div className="loadingData">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div className="user_details_content">
          <div className="user_details_user_profile">
            <div className="user_profile">
              {data?.response.profileImg ? (
                <img
                  src={data?.response.profileImg}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <IoPersonSharp size={80} color="white" />
              )}
            </div>
            <div className="name">
              {data?.response.fullName ? data?.response.fullName : 'null'}
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header" style={{ color: '#007BFF' }}>
              Skill Gap Program
            </div>
            {filteredInternships.map(
              (
                data: {
                  _id: string;
                  status: string;
                  internshipId: { title: string };
                },
                index: number
              ) => (
                <div className="section_item" key={index}>
                  <div className="item_title">{data.internshipId.title}</div>
                  {data.status === 'pending' ? (
                    <div className="pending_tag">
                      <div
                        className="accept_btn"
                        style={{
                          backgroundColor:
                            !acceptLoading && !declineLoading ? '' : 'grey',
                          cursor:
                            !acceptLoading && !declineLoading
                              ? 'pointer'
                              : 'not-allowed',
                        }}
                      >
                        <IoCheckmark
                          fontSize={20}
                          onClick={() => handleAccept(data._id)}
                        />
                      </div>
                      <div className="reject_btn">
                        <BiX
                          fontSize={25}
                          onClick={() => handleDecline(data._id)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rejected_tag"
                      style={{
                        border:
                          data.status === 'accepted'
                            ? '1px solid #00FF00'
                            : data.status === 'rejected'
                              ? '1px solid #FF0000'
                              : '1px solid #FFDD00',
                        backgroundColor:
                          data.status === 'accepted'
                            ? '#EDFFED'
                            : data.status === 'rejected'
                              ? '#FFF4F4'
                              : '#FFFCE7',
                      }}
                    >
                      {data.status}
                    </div>
                  )}
                </div>
              )
            )}
            {/* <div className="section_item">
              <div className="item_title">React JS</div>
              <div className="rejected_tag">Rejected</div>
            </div> */}
          </div>
          <div className="user_details_section">
            <div className="section_header" style={{ color: '#007BFF' }}>
              Evaluation
            </div>
            <div className="section_item">
              <div className="item_title">HTML/CSS/JavaScript</div>
              <div style={{ color: '#16A312', fontWeight: '600' }}>
                85 / 100 (Passed)
              </div>
            </div>
            <div className="section_item">
              <div className="item_title">React JS</div>
              <div style={{ color: '#FF0000', fontWeight: '600' }}>
                21 / 100 (failed)
              </div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Personal Information</div>
            <div className="section_item">
              <div className="item_title">UserId</div>
              <div>{data?.response._id}</div>
            </div>
            <div className="section_item">
              <div className="item_title">Phone Number</div>
              <div>
                {data?.response.phoneNumber
                  ? data?.response.phoneNumber
                  : 'null'}
              </div>
            </div>
            <div className="section_item">
              <div className="item_title">Email</div>
              <div>{data?.response.email ? data?.response.email : 'null'}</div>
            </div>
            <div className="section_item">
              <div className="item_title">Date Registered</div>
              <div>
                {new Date(data?.response.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </div>
            </div>
            <div className="section_item">
              <div className="item_title">Verified</div>
              <div>
                {data?.response.status === true ? (
                  <IoCheckmarkDone size={18} color="green" />
                ) : (
                  <HiOutlineXMark size={18} color="red" />
                )}
              </div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Educational Background</div>
            {data?.response.education.length === 0 ||
            data?.response.education.every(
              (education: {
                institutionName?: string;
                degreeObtained?: string;
                degreeType?: string;
                graduationDate?: string;
              }) =>
                !education.institutionName?.trim() ||
                !education.degreeObtained?.trim() ||
                !education.degreeType?.trim() ||
                !education.graduationDate?.trim()
            ) ? (
              <div className="section_item">No Data Avaliable</div>
            ) : (
              data?.response.education.map(
                (
                  education: {
                    institutionName: string;
                    degreeObtained: string;
                    degreeType: string;
                    graduationDate: string;
                  },
                  index: number
                ) => (
                  <div key={index}>
                    <div className="section_item">
                      <div className="item_title">Institution</div>
                      <div>{education.institutionName}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Degree Obtained</div>
                      <div>{education.degreeObtained}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Degree Type</div>
                      <div>{education.degreeType}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Graduation Date</div>
                      <div>
                        {new Date(education.graduationDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <div className="user_details_section">
            <div className="section_header">Skills (Up to 10)</div>
            <div className="skills_item_container">
              {data?.response.skillSet.length === 0 ||
              data?.response.skillSet.every(
                (item: string) =>
                  !item || item?.trim() === '' || item === 'null'
              ) ? (
                <div className="section_item">No Data Available</div>
              ) : (
                data?.response.skillSet.map((skill: string, index: number) =>
                  skill && skill?.trim() !== '' && skill !== null ? (
                    <div className="skills_item" key={index}>
                      {skill}
                    </div>
                  ) : (
                    <div className="section_item">No Data Available</div>
                  )
                )
              )}
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Areas of interest (Up to 10)</div>
            <div className="skills_item_container">
              {data?.response.areaOfInterest.length === 0 ||
              data?.response.areaOfInterest.every(
                (item: string) =>
                  !item || item?.trim() === '' || item === 'null'
              ) ? (
                <div className="section_item">No Data Available</div>
              ) : (
                data?.response.areaOfInterest.map(
                  (data: string, index: number) => (
                    <div className="skills_item" key={index}>
                      {data}
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Experience</div>
            {data?.response.job.length === 0 ||
            data?.response.job.every(
              (job: {
                title?: string;
                companyName?: string;
                description?: string;
                startDate?: string;
                endDate?: string;
              }) =>
                !job.title?.trim() ||
                !job.description?.trim() ||
                !job.companyName?.trim() ||
                !job.startDate?.trim()
            ) ? (
              <div className="section_item">No Data Avaliable</div>
            ) : (
              data?.response.job.map(
                (
                  job: {
                    title: string;
                    companyName: string;
                    description: string;
                    startDate: string;
                    endDate: string;
                  },
                  index: number
                ) => (
                  <div key={index}>
                    <div className="section_item">
                      <div className="item_title">Job Title</div>
                      <div>{job.title}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Company</div>
                      <div>{job.companyName}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Job Description</div>
                      <div className="item_content">{job.description}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Start Date</div>
                      <div>
                        {new Date(job.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    {job.endDate ? (
                      <div className="section_item">
                        <div className="item_title">End Date</div>
                        <div>
                          {new Date(job.endDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="section_item">
                        <div className="item_title">Currently Working</div>
                        <div>
                          <IoCheckmarkDone size={18} color="green" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              )
            )}
          </div>
          <div className="user_details_section">
            <div className="section_header">Certifications</div>
            {data?.response.certifications.length === 0 ||
            data?.response.certifications.every(
              (certifications: {
                name?: string;
                issuedBy?: string;
                dateObtained?: string;
              }) =>
                !certifications.name?.trim() ||
                !certifications.issuedBy?.trim() ||
                !certifications.dateObtained?.trim()
            ) ? (
              <div className="section_item">No Data Avaliable</div>
            ) : (
              data?.response.certifications.map(
                (
                  certification: {
                    name: string;
                    issuedBy: string;
                    dateObtained: string;
                  },
                  index: number
                ) => (
                  <div key={index}>
                    <div className="section_item">
                      <div className="item_title">Certification Name</div>
                      <div>{certification.name}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Issuing Organization</div>
                      <div>{certification.issuedBy}</div>
                    </div>
                    <div className="section_item">
                      <div className="item_title">Issuing Date</div>
                      <div>
                        {new Date(
                          certification.dateObtained
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSkillGapDetails;
