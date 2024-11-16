import PageHeader from '@/components/pageHeader/PageHeader';
import './skillGapList.css';
import { useNavigate } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import SkillGapProgramData from '@/utils/SkillGapProgramData';
import { FiPlus } from 'react-icons/fi';

const SkillGapList = () => {
  const navigate = useNavigate();

  return (
    <div className="skill_gap_list_root">
      <div style={{ position: 'relative' }}>
        <PageHeader
          handleBackClick={() => navigate('/admin/dashboard/skill-gap-program')}
          pageTitle={'Programs'}
        />
        <div className="create_program_btn" onClick={() => navigate('/admin/dashboard/skill-gap-program/create-program')}>
          <FiPlus style={{ marginRight: '5px' }} fontSize={20}  />
          Create program
        </div>
      </div>
      <div className="programs_list_container">
        {SkillGapProgramData.map((item, index) => (
          <div className="program_card" key={index}>
            <div className="content">
              <img src={item.imgSrc} alt={item.language} />
              <div style={{ marginLeft: '10px' }}>
                <div className="title">{item.language}</div>
                <div style={{ fontSize: '12px', color: '#6A757E' }}>
                  {item.description}
                </div>
              </div>
            </div>
            <MdModeEdit fontSize={25} color="#6A757E" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGapList;
