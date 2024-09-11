import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../../icons/LeftArrowIcon';
import RightArrowIcon from '../../../icons/RightArrowIcon';
import SidebarProgress from '../../../icons/SidebarProgress';
import { combinedQuestionsData } from '../../../utils/CombinedQuestionsData';
import './history.css';

const History = () => {
  const navigate = useNavigate();

  // Map combinedQuestionsData to include necessary fields
  const questions = combinedQuestionsData.map((q) => ({
    id: q.id,
    question: q.question,
    isCorrect: q.userAnswer === q.correctAnswer,
  }));

  const navigateToQuestion = (id: number) => {
    navigate(`/progress/question/${id}`);
  };

  return (
    <div className="history_root">
      <div className="history_header">
        <div className="history_innner_header">
          <div
            className="history_back_btn"
            onClick={() => navigate('/progress')}
          >
            <div className="left_arrow_icon">
              <LeftArrowIcon />
            </div>
            <div className='back_text'>Back</div>
          </div>
          <div className="history_text">
            <div
              style={{
                paddingRight: '5px',
                color: '#4274BA',
                fontWeight: 'normal',
              }}
            >
              History
            </div>
            <SidebarProgress color={'#4274BA'} />
          </div>
        </div>
      </div>
      <div className="history_title">
        <div className="img_holder"></div>
        <div className="history_skill_text">HTML/CSS/JavaScript</div>
      </div>
      <div className="history_overview">
        <div className="history_overview_item">
          <div style={{ color: 'grey' }} className="history_overview_title">
            Percentage
          </div>
          <div
            style={{ fontWeight: '600', color: '#6A757E' }}
            className="history_overview_content"
          >
            25%
          </div>
        </div>
        <div className="history_overview_item">
          <div style={{ color: 'grey' }} className="history_overview_title">
            Correct
          </div>
          <div
            style={{ fontWeight: '600', color: '#6A757E' }}
            className="history_overview_content"
          >
            27/100
          </div>
        </div>
        <div className="history_overview_item">
          <div style={{ color: 'grey' }} className="history_overview_title">
            Passing Grade
          </div>
          <div
            style={{ fontWeight: '600', color: '#6A757E' }}
            className="history_overview_content"
          >
            75/100
          </div>
        </div>
      </div>
      <div className="list_of_ques">List of Questions</div>
      <div className="question_list_container">
        {questions.map((q) => (
          <div
            className="question_list_card"
            key={q.id}
            onClick={() => navigateToQuestion(q.id)}
          >
            <div>
              <div className="history_question_text">{q.question}</div>
              <div
                style={{
                  color: q.isCorrect ? '#61E44F' : '#E44F4F',
                }}
                className='correct_or_wrong'
              >
                {q.isCorrect ? 'Correct Answer' : 'Wrong Answer'}
              </div>
            </div>
            <div style={{ marginRight: '25.45px' }}>
              <RightArrowIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
