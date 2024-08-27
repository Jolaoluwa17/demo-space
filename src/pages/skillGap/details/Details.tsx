import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../../icons/LeftArrowIcon';
import './details.css';

const Details = () => {
  const navigate = useNavigate();

  return (
    <div className="details_root">
      <div className="subTest_header">
        <div className="subTest_innner_header">
          <div className="subTest_back_btn">
            <div className="left_arrow_icon">
              <LeftArrowIcon />
            </div>
            <div>Back</div>
          </div>
          <div>Details</div>
        </div>
      </div>
      <div className="skill_gap_details">
        <div className="skill_gap_details_title">
          Frontend Development Program
        </div>
        <div className="skill_gap_details_overview">
          Enhance your frontend development skills by mastering HTML, CSS,
          JavaScript, and React. This program is designed for developers who
          want to deepen their understanding of modern web development.
        </div>
        <div
          className="skill_gap_details_benefits"
          style={{ fontWeight: '600' }}
        >
          Benefits:
        </div>
        <div className="benefits_data">- Learn from industry experts</div>
        <div className="benefits_data">- Work on hands-on projects. </div>
        <div className="benefits_data">- Flexible schedule.</div>
        <div className="benefits_data">- Certification upon completion. </div>
        <div className="program_structure" style={{ fontWeight: '600' }}>
          Program Structure:
        </div>
        <div className="duration">Duration: 8 weeks</div>
        <div className="modules_header">Modules:</div>
        <div className="benefits_data">1. Introduction to HTML and CSS.</div>
        <div className="benefits_data">2. Advanced JavaScript Techniques</div>
        <div className="benefits_data">3. Building Dynamic UIs with React</div>
        <div className="enroll_now_container">
          <div
            className="enroll_now"
            onClick={() => navigate('/skill-gap/status')}
          >
            Enroll Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
