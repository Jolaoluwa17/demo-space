import { useNavigate } from 'react-router-dom';
import './details.css';
import PageHeader from '@/components/pageHeader/PageHeader';

const Details = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard/skill-gap');
  };

  return (
    <div className="details_root">
      <PageHeader pageTitle="Details" handleBackClick={handleBackClick} />
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
            onClick={() => navigate('/dashboard/skill-gap/status')}
          >
            Enroll Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
