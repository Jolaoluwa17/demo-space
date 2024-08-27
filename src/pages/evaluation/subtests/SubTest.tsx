import { useNavigate } from 'react-router-dom';
import QuestionTypeCard from '../../../components/questionType/QuestionTypeCard';
import LeftArrowIcon from '../../../icons/LeftArrowIcon';
import './subTests.css';
import CircularBar from '../../../components/circularbar/CircularBar';

const SubTest = () => {
  const questionTypes = [
    {
      title: 'Multiple Choice Questions',
      description:
        'Test your theoretical knowledge in HTML, CSS, and JavaScript.',
      route: '/evaluation/multiple-choice',
    },
    {
      title: 'Short-Form Answers',
      description: 'Answer brief questions to demonstrate your understanding',
      route: '/evaluation/short-answer',
    },
    {
      title: 'Coding/Design Tasks',
      description: 'Solve practical tasks to showcase your coding skills.',
      route: '/evaluation/coding-tasks',
    },
  ];

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/evaluation/instructions'); // Navigate to the Evaluation page
  };

  const handleInstructionsClick = (route: string) => {
    navigate(route); // Navigate to the selected route
  };

  return (
    <div className="subTest_root">
      <div className="subTest_header">
        <div className="subTest_innner_header">
          <div className="subTest_back_btn" onClick={handleBackClick}>
            <div className="left_arrow_icon">
              <LeftArrowIcon />
            </div>
            <div>Back</div>
          </div>
          <div>Sub Tests</div>
        </div>
      </div>
      <div className="evaluation_score_container">
        <div className="evaluation_score_left_section">
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            Your Current Evaluation score is
          </div>
          <div style={{ marginTop: '4px', fontSize: '14px' }}>
            You have completed <span style={{ fontWeight: '700' }}>1/3</span>
          </div>
        </div>
        <div className="subTest_progress_bar">
          <CircularBar percentage={80} circleWidth={70} />
        </div>
      </div>
      <div className="subTest_title">HTML/CSS/JavaScript</div>
      <div className="subTest_subTitle">
        Test your skills in HTML, CSS, and JavaScript through three
        comprehensive sub-tests.
      </div>
      <div className="subTest_question_type_container">
        {questionTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => handleInstructionsClick(type.route)}
            style={{ width: '49%' }}
          >
            <QuestionTypeCard
              title={type.title}
              description={type.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTest;
