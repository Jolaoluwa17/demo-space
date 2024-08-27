import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../../icons/LeftArrowIcon';
import './instruction.css';

const Instructions = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/evaluation/sub-test'); // Navigate to the Evaluation page
  };

  const handleBackClick = () => {
    navigate('/evaluation'); // Navigate to the Evaluation page
  };

  const instructions = [
    'This evaluation contains three parts: Multiple Choice Questions, Short-Form Answers, and Coding/Design Tasks.',
    'Read each question carefully before answering.',
    'Ensure you understand the requirements for each task.',
    'Manage your time effectively during the evaluation.',
    'If you encounter any issues, contact the support team immediately.',
    'Review your answers before submitting the evaluation.',
  ];

  return (
    <div className="instructions_root">
      <div className="instructions_header">
        <div className="instructions_innner_header">
          <div className="instructions_back_btn" onClick={handleBackClick}>
            <div className="left_arrow_icon">
              <LeftArrowIcon />
            </div>
            <div>Back</div>
          </div>
          <div>Instructions</div>
        </div>
      </div>
      <div className="instructions_content">
        <div className="instructions_title">HTML/CSS/JavaScript</div>
        <div className="instructions_subTitle">
          Test your skills in HTML, CSS, and JavaScript.
        </div>
        {instructions.map((instruction, index) => (
          <p key={index} className="instructions_text">
            {index + 1}. {instruction}
          </p>
        ))}
      </div>
      <div className="start_evaluation_btn_container" onClick={handleClick}>
        <div className="start_evaluation_btn">Start Evaluation</div>
      </div>
    </div>
  );
};

export default Instructions;
