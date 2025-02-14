import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import './skillGap.css';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillProgramCard from '@/components/skillscard/SkillProgramCard';
import { useGetAllProgramsQuery } from '@/services/features/skillGap/skillGapSlice';

interface Props {
  darkmode: boolean;
}

const SkillGap: React.FC<Props> = ({ darkmode }) => {
  const {
    data: programsData,
    isLoading: programsDataLoading,
    refetch: refetchProgramsData,
    isError: programDataError,
  } = useGetAllProgramsQuery({});
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Refetch data every time the screen is rendered
  useEffect(() => {
    refetchProgramsData();
  }, [location.key, refetchProgramsData]);

  // Safely filter the data based on the search term
  const filteredSkillGapData = programsData?.response
    ? programsData.response.filter(
        (card: { _id: string; title: string; discreption: string }) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSkillClick = (id: string) => {
    navigate(`/dashboard/skill-gap/details?id=${id}`);
  };

  return (
    <div className="skill_gap_root">
      <SearchInput
        handleSearch={(term: string) => setSearchTerm(term)}
        darkmode={darkmode}
      />
      {programsDataLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : programDataError ? ( // Show error message if data fetching failed
        <div className="nodata_container">
          <img
            src="/images/NoData.jpg"
            alt="No Data"
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>
            Oops, Failed to fetch programs 😭
          </div>
        </div>
      ) : filteredSkillGapData.length === 0 ? ( // Check for no results
        <div className="nodata_container">
          <img
            src="/images/NoData.jpg"
            alt="No Data"
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>
            Oops, No programs available at this time 😭
          </div>
        </div>
      ) : (
        <div className="skill_gap_container">
          {filteredSkillGapData.map(
            (
              card: {
                _id: string;
                title: string;
                discreption: string;
              },
              index: number
            ) => (
              <SkillProgramCard
                key={index}
                language={card.title}
                description={card.discreption}
                onClick={() => handleSkillClick(card._id)}
                darkmode={darkmode}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SkillGap;
