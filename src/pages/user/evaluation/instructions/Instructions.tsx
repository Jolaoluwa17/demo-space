import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './instruction.css';
import PageHeader from '@/components/pageHeader/PageHeader';

const Instructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Extract URL parameters
  const id = searchParams.get('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const handleClick = () => {
    // Navigate to the next page, including the id in the URL
    navigate(`/dashboard/evaluation/multiple-choice?id=${id}`);
  };

  const handleBackClick = () => {
    navigate('/dashboard/evaluation'); // Navigate to the Evaluation page
  };

  const instructions = [
    'Read each question carefully before answering.',
    'Ensure you understand the requirements for each task.',
    'Manage your time effectively during the evaluation.',
    'If you encounter any issues, contact the support team immediately.',
    'Review your answers before submitting the evaluation.',
  ];

  return (
    <div className="instructions_root">
      <PageHeader handleBackClick={handleBackClick} pageTitle="Instructions" />
      <div className="instructions_content">
        <div className="instructions_title">{course}</div>
        <div className="instructions_subTitle">{description}</div>
        {instructions.map((instruction, index) => (
          <div className="instructions_text_container">
            <p style={{ marginRight: '5px' }}>{index + 1}.</p>
            <p key={index} className="instructions_text">
              {instruction}
            </p>
          </div>
        ))}
      </div>
      <div className="start_evaluation_btn_container" onClick={handleClick}>
        <div className="start_evaluation_btn">Start Evaluation</div>
      </div>
    </div>
  );
};

export default Instructions;
