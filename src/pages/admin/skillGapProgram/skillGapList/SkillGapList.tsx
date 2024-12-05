import PageHeader from '@/components/pageHeader/PageHeader';
import './skillGapList.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { useGetAllProgramsQuery } from '@/services/features/skillGap/skillGapSlice';
import { FadeLoader } from 'react-spinners';
import { useEffect } from 'react';

const SkillGapList = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetAllProgramsQuery({});
  const location = useLocation();

  // refetch data everytime the screen is rendered
  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  const extractDescription = (htmlString: string) => {
    const descriptionMatch = htmlString.match(
      /<strong>Description:<\/strong>(.*?)<br>/
    );
    return descriptionMatch ? descriptionMatch[1].trim() : '';
  };

  const getRandomColor = () => {
    const letters = '89ABC';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  const handleCardClick = (id: string) => {
    navigate(`/admin/dashboard/skill-gap-program/create-program?id=${id}`);
  };

  const getLanguageImage = (category: string) => {
    const lowerCaseLanguage = category.toLowerCase();

    if (lowerCaseLanguage.includes('frontend')) {
      return '/images/laptop.svg';
    }
    if (lowerCaseLanguage.includes('backend')) {
      return '/images/Database1.svg';
    }
    if (lowerCaseLanguage.includes('devops')) {
      return '/images/Database2.svg';
    }
    if (lowerCaseLanguage.includes('cyber')) {
      return '/images/Database2.svg';
    }
    if (lowerCaseLanguage.includes('ai')) {
      return '/images/AIand.svg';
    }
    if (lowerCaseLanguage.includes('cloud')) {
      return '/images/cloud.svg';
    }
    if (lowerCaseLanguage.includes('data')) {
      return '/images/chart.svg';
    }
    if (lowerCaseLanguage.includes('ui')) {
      return '/images/UI.svg';
    }
    return '/images/laptop.svg';
  };

  return (
    <div className="skill_gap_list_root">
      <div style={{ position: 'relative' }}>
        <PageHeader
          handleBackClick={() => navigate('/admin/dashboard/skill-gap-program')}
          pageTitle={'Programs'}
        />
        <div
          className="create_program_btn"
          onClick={() =>
            navigate('/admin/dashboard/skill-gap-program/create-program')
          }
        >
          <FiPlus style={{ marginRight: '5px' }} fontSize={20} />
          Create program
        </div>
      </div>
      <div className="programs_list_container">
        {isLoading ? (
          <div className="loadingData">
            <FadeLoader color="#007BFF" />
          </div>
        ) : data?.response.length === 0 ? (
          <div className="nodata_container">
            <img
              src="/images/NoData.png"
              alt=""
              style={{ width: '250px', height: '250px' }}
            />
            <div style={{ fontWeight: '600' }}>Oops, No Data Avaliable</div>
          </div>
        ) : (
          data?.response.map(
            (
              item: {
                _id: string;
                title: string;
                discreption: string;
              },
              index: number
            ) => (
              <div className="program_card" key={index}>
                <div className="content">
                  <div
                    className="admin_skill_gap_img"
                    style={{ backgroundColor: randomColor }}
                  >
                    <img src={getLanguageImage(item.title)} alt={item.title} />
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    <div className="title">{item.title}</div>
                    <div
                      className="skill_gap_description_admin"
                      dangerouslySetInnerHTML={{
                        __html: extractDescription(item.discreption),
                      }}
                    />
                  </div>
                </div>
                <div onClick={() => handleCardClick(item._id)}>
                  <MdModeEdit
                    fontSize={25}
                    color="#6A757E"
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default SkillGapList;
