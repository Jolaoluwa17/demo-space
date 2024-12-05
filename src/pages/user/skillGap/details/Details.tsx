import { useNavigate, useSearchParams } from 'react-router-dom';
import './details.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import {
  useApplyForInternshipMutation,
  useGetSpecificProgramQuery,
} from '@/services/features/skillGap/skillGapSlice';
import { FadeLoader } from 'react-spinners';
import { useState } from 'react';
import { BiSolidErrorAlt } from 'react-icons/bi';

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

  return (
    <div className="details_root">
      <PageHeader pageTitle="Details" handleBackClick={handleBackClick} />
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div className="skill_gap_details">
          <div className="skill_gap_details_title">{data?.response.title}</div>
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
              onClick={!internshipLoading ? handleApplication : undefined}
              style={{
                backgroundColor: !internshipLoading ? '' : 'grey',
                cursor: !internshipLoading ? 'pointer' : 'not-allowed',
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
