import PageHeader from '@/components/pageHeader/PageHeader';
import '@/pages/admin/userManagement/userDetails/userDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCheckmark, IoPersonSharp } from 'react-icons/io5';
import { BiX } from 'react-icons/bi';
import { useGetUserQuery } from '@/services/features/user/userSlice';
import { FadeLoader } from 'react-spinners';
import {
  useAcceptSkillGapMutation,
  useDeclineSkillGapMutation,
  useGetAllInternshipQuery,
} from '@/services/features/skillGap/skillGapSlice';

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

  console.log(filteredInternships);

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
                          color: 'white',
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
              <div>USER789</div>
            </div>
            <div className="section_item">
              <div className="item_title">Phone Number</div>
              <div>null</div>
            </div>
            <div className="section_item">
              <div className="item_title">Email</div>
              <div>j.olusanya@gmail.com</div>
            </div>
            <div className="section_item">
              <div className="item_title">Date Registered</div>
              <div>2024-10-09</div>
            </div>
            <div className="section_item">
              <div className="item_title">Last Login</div>
              <div>2024-10-09</div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Educational Background</div>
            <div className="section_item">
              <div className="item_title">Institution</div>
              <div>Babcock University</div>
            </div>
            <div className="section_item">
              <div className="item_title">Degree Obtained</div>
              <div>B.Sc in Software Engineering</div>
            </div>
            <div className="section_item">
              <div className="item_title">Degree Type</div>
              <div>Bachelor's Degree</div>
            </div>
            <div className="section_item">
              <div className="item_title">Graduation Date</div>
              <div>2024-10-09</div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Skills (Up to 10)</div>
            <div className="skills_item_container">
              <div className="skills_item">Javascript</div>
              <div className="skills_item">HTML</div>
              <div className="skills_item">CSS</div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Areas of interest (Up to 10)</div>
            <div className="skills_item_container">
              <div className="skills_item">Javascript</div>
              <div className="skills_item">HTML</div>
              <div className="skills_item">CSS</div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Experience</div>
            <div className="section_item">
              <div className="item_title">Job Title</div>
              <div>Software Engineer</div>
            </div>
            <div className="section_item">
              <div className="item_title">Company</div>
              <div>TechWings Global</div>
            </div>
            <div className="section_item">
              <div className="item_title">Job Description</div>
              <div className="item_content">
                Developed web applications using React and Node.js, led a team
                of 3 developers, and improved performance
              </div>
            </div>
            <div className="section_item">
              <div className="item_title">Start Date</div>
              <div>2024-10-09</div>
            </div>
            <div className="section_item">
              <div className="item_title">End Date</div>
              <div>2024-10-09</div>
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Certifications</div>
            <div className="section_item">
              <div className="item_title">Certification Name</div>
              <div>AWS Certified Solutions Architect</div>
            </div>
            <div className="section_item">
              <div className="item_title">Issuing Organization</div>
              <div>TechWings Global</div>
            </div>
            <div className="section_item">
              <div className="item_title">Issuing Date</div>
              <div>2024-10-09</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSkillGapDetails;
