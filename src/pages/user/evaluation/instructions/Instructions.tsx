import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './instruction.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import { useEffect } from 'react';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { FadeLoader } from 'react-spinners';

interface Result {
  userId: {
    _id: string;
  };
  quizId: {
    _id: string;
  };
}

const Instructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const userid = sessionStorage.getItem('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const handleClick = () => {
    navigate(`/dashboard/evaluation/multiple-choice?id=${id}`);
  };

  const handleBackClick = () => {
    navigate('/dashboard/evaluation');
  };

  const instructions = [
    'Read each question carefully before answering.',
    'Ensure you understand the requirements for each task.',
    'Manage your time effectively during the evaluation.',
    'If you encounter any issues, contact the support team immediately.',
    'Review your answers before submitting the evaluation.',
  ];

  const {
    data: resultsData,
    refetch: refetchResults,
    isLoading,
  } = useGetAllResultsQuery({});

  useEffect(() => {
    refetchResults();
  }, [refetchResults]);

  // Filter results based on the userId
  const filteredResults =
    resultsData?.response.filter(
      (result: Result) =>
        result.userId?._id === userid && result.quizId?._id === id
    ) || [];

  return (
    <div className="instructions_root">
      <PageHeader handleBackClick={handleBackClick} pageTitle="Instructions" />
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div>
          <div className="instructions_content">
            <div className="instructions_title">
              {course}
              {filteredResults.length > 0 && (
                <div className="taken_assessment_indicator">
                  <IoInformationCircleSharp
                    size={20}
                    style={{ paddingRight: '5px' }}
                  />
                  Assessment Taken
                </div>
              )}
            </div>
            <div className="instructions_subTitle">{description}</div>
            {instructions.map((instruction, index) => (
              <div key={index} className="instructions_text_container">
                <p style={{ marginRight: '5px' }}>{index + 1}.</p>
                <p className="instructions_text">{instruction}</p>
              </div>
            ))}
          </div>
          <div className="start_evaluation_btn_container">
            <div
              className="start_evaluation_btn"
              style={{
                backgroundColor: filteredResults.length < 1 ? '' : 'grey',
                cursor: filteredResults.length < 1 ? 'pointer' : 'not-allowed',
                color: 'white',
              }}
              onClick={filteredResults.length > 0 ? undefined : handleClick}
            >
              Start Evaluation
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
