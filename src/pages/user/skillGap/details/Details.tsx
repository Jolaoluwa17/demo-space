import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { IoInformationCircleSharp } from 'react-icons/io5';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

import './details.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import {
  useApplyForInternshipMutation,
  useGetAllInternshipQuery,
  useGetSpecificProgramQuery,
} from '@/services/features/skillGap/skillGapSlice';

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
      internshipRefetch();
    } catch (error) {
      setErrMsg('Something went wrong');
      console.log(error);
    }
  };

  const {
    data: getApply,
    isLoading: internshipApplyLoading,
    refetch: internshipRefetch,
  } = useGetAllInternshipQuery({});

  const location = useLocation();

  useEffect(() => {
    internshipRefetch();
  }, [location.key, internshipRefetch]);

  const filteredInternships = getApply?.response?.filter(
    (item: { userId: { _id: string }; internshipId: { _id: string } }) =>
      item.userId?._id === userid && item.internshipId?._id === id
  );

  const [status, setStatus] = useState('');
  const [canReapply, setCanReapply] = useState(false);

  useEffect(() => {
    const calculateRemainingTime = (createdAt: string) => {
      const now = new Date();
      const deniedDate = new Date(createdAt);
      const sevenDaysLater = new Date(deniedDate);
      sevenDaysLater.setDate(deniedDate.getDate() + 7);

      const remainingDays = differenceInDays(sevenDaysLater, now);
      const remainingHours = differenceInHours(sevenDaysLater, now) % 24;
      const remainingMinutes = differenceInMinutes(sevenDaysLater, now) % 60;

      return { remainingDays, remainingHours, remainingMinutes };
    };

    if (filteredInternships?.[0]?.status === 'Denied') {
      const createdAt = filteredInternships?.[0]?.updatedAt;
      const daysSinceDenied = differenceInDays(new Date(), new Date(createdAt));
      setCanReapply(daysSinceDenied >= 7);

      if (daysSinceDenied < 7) {
        const { remainingDays, remainingHours, remainingMinutes } =
          calculateRemainingTime(createdAt);

        setStatus(
          `Application was denied. You can reapply in ${remainingDays} days, ${remainingHours} hours, and ${remainingMinutes} minutes.`
        );
      } else {
        setStatus('Application was denied. You can reapply now.');
      }
    } else {
      setCanReapply(false);

      if (filteredInternships?.[0]?.status === 'pending') {
        setStatus('Application is pending');
      } else if (filteredInternships?.[0]?.status === 'Approved') {
        setStatus('Application accepted. Check email for more info');
      } else {
        setStatus('Unknown status');
      }
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
          {filteredInternships?.[0]?.status && (
            <div
              className="taken_assessment_indicator"
              style={{
                color:
                  filteredInternships?.[0]?.status === 'pending'
                    ? '#ffb703'
                    : filteredInternships?.[0]?.status === 'Approved'
                      ? '#28a745'
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
                (!filteredInternships?.length ||
                  (filteredInternships?.[0]?.status !== 'pending' &&
                    filteredInternships?.[0]?.status !== 'Approved' &&
                    canReapply))
                  ? handleApplication
                  : undefined
              }
              style={{
                backgroundColor:
                  !internshipLoading &&
                  (!filteredInternships?.length ||
                    (filteredInternships?.[0]?.status !== 'pending' &&
                      filteredInternships?.[0]?.status !== 'Approved' &&
                      canReapply))
                    ? ''
                    : 'grey',
                cursor:
                  !internshipLoading &&
                  (!filteredInternships?.length ||
                    (filteredInternships?.[0]?.status !== 'pending' &&
                      filteredInternships?.[0]?.status !== 'Approved' &&
                      canReapply))
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
