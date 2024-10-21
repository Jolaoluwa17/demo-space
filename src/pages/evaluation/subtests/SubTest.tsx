import { useNavigate } from 'react-router-dom';
import QuestionTypeCard from '../../../components/questionType/QuestionTypeCard';
import './subTests.css';
import CircularBar from '../../../components/circularbar/CircularBar';
import PageHeader from '../../../components/pageHeader/PageHeader';

const SubTest = () => {
  const questionTypes = [
    {
      title: 'Multiple Choice Questions',
      description:
        'Test your theoretical knowledge in HTML, CSS, and JavaScript.',
      route: '/dashboard/evaluation/multiple-choice',
    },
    {
      title: 'Short-Form Answers',
      description: 'Answer brief questions to demonstrate your understanding',
      route: '/dashboard/evaluation/short-answer',
    },
    // {
    //   title: 'Coding/Design Tasks',
    //   description: 'Solve practical tasks to showcase your coding skills.',
    //   route: '/dashboard/evaluation/coding-tasks',
    // },
  ];

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard/evaluation/instructions'); // Navigate to the Evaluation page
  };

  const handleInstructionsClick = (route: string) => {
    navigate(route); // Navigate to the selected route
  };

  return (
    <div className="subTest_root">
      <PageHeader handleBackClick={handleBackClick} pageTitle="Sub Tests" />
      <div className="evaluation_score_container">
        <div className="evaluation_score_left_section">
          <div className='current_eval_score'>
            Your Current Evaluation score is
          </div>
          <div className='completed_percent'>
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
            className="subTest_question_type"
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
