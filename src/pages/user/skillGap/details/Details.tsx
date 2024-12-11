import { useNavigate, useSearchParams } from 'react-router-dom';
import './details.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import {
  useApplyForInternshipMutation,
  useGetAllInternshipQuery,
  useGetSpecificProgramQuery,
} from '@/services/features/skillGap/skillGapSlice';
import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { IoInformationCircleSharp } from 'react-icons/io5';

const Details = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('id');
  const [errMsg, setErrMsg] = useState('');

  const extractField = (htmlString: string, label: string) => {
    const regex = new RegExp(
      `<strong>${label}:</strong>([\\s\\S]*?)(?=<strong>|$)`,
      'i'
    );
    const match = htmlString.match(regex);
    return match
      ? match[1].trim().replace(/<br>/g, '').replace(/\n\s*/g, '\n')
      : '';
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading } = useGetSpecificProgramQuery(id);

  const handleBackClick = () => {
    navigate('/dashboard/skill-gap');
  };

  const [applyForInternship, { isLoading: internshipLoading }] =
    useApplyForInternshipMutation();

  const handleApplication = async () => {
    const programData = {
      userId: userid,
      internshipId: id,
    };
    try {
      await applyForInternship(programData).unwrap();
      navigate('/dashboard/skill-gap/status');
    } catch (error) {
      setErrMsg('Something went wrong');
      console.log(error);
    }
  };

  const { data: getApply, isLoading: internshipApplyLoading } =
    useGetAllInternshipQuery({});

  const filteredInternships = getApply?.response?.filter(
    (item: { userId: { _id: string }; internshipId: { _id: string } }) =>
      item.userId?._id === userid && item.internshipId?._id === id
  );

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (filteredInternships?.[0]?.status === 'pending') {
      setStatus('Application is pending');
    } else if (filteredInternships?.[0]?.status === 'accepted') {
      setStatus('Application accepted');
    } else {
      setStatus('Unknown status');
    }
  }, [filteredInternships, getApply]);

  return (
    <div className="details_root">
      <PageHeader pageTitle="Details" handleBackClick={handleBackClick} />
      {isLoading || internshipApplyLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div className="skill_gap_details">
          <div className="skill_gap_details_title">{data?.response.title}</div>
          {filteredInternships?.[0]?.status === 'pending' && (
            <div
              className="taken_assessment_indicator"
              style={{
                color:
                  filteredInternships?.[0]?.status === 'pending'
                    ? '#ffb703'
                    : '',
                marginTop: '5px',
              }}
            >
              <IoInformationCircleSharp
                size={20}
                style={{ paddingRight: '5px' }}
              />
              {status}
            </div>
          )}
          <div className="skill_gap_details_overview">
            {extractField(data?.response.discreption, 'Description')}
          </div>
          <div
            className="skill_gap_details_benefits"
            style={{ fontWeight: '600' }}
          >
            Benefits:
          </div>
          {extractField(data?.response.discreption, 'Benefits')
            .split('-')
            .filter((item) => item.trim())
            .map((benefit, index) => (
              <div key={index} className="benefits_data">
                - {benefit.trim()}
              </div>
            ))}
          <div className="program_structure" style={{ fontWeight: '600' }}>
            Program Structure:
          </div>
          <div className="duration">
            Duration: {extractField(data?.response.discreption, 'Duration')}
          </div>
          <div className="modules_header">Modules:</div>
          {extractField(data?.response.discreption, 'Modules')
            .split('-')
            .filter((item) => item.trim())
            .map((module, index) => (
              <div key={index} className="benefits_data">
                {`${index + 1}. ${module.trim()}`}
              </div>
            ))}

          <div className="enroll_now_container">
            <div
              className="enroll_now"
              onClick={
                !internshipLoading &&
                filteredInternships?.[0]?.status !== 'pending'
                  ? handleApplication
                  : undefined
              }
              style={{
                backgroundColor:
                  !internshipLoading &&
                  filteredInternships?.[0]?.status !== 'pending'
                    ? ''
                    : 'grey',
                cursor:
                  !internshipLoading &&
                  filteredInternships?.[0]?.status !== 'pending'
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
                fontWeight: '600',
              }}
            >
              {internshipLoading ? (
                <div className="spinner"></div>
              ) : (
                'Enroll Now'
              )}
            </div>
          </div>
          {errMsg && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div className="error_message">
                <BiSolidErrorAlt
                  fontSize={18}
                  style={{ paddingRight: '5px' }}
                />
                {errMsg}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
