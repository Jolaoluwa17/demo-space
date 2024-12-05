import { useEffect, useState } from 'react';

import './skillGap.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillProgramCard from '@/components/skillscard/SkillProgramCard';
import { useGetAllProgramsQuery } from '@/services/features/skillGap/skillGapSlice';
import { FadeLoader } from 'react-spinners';

const SkillGap = () => {
  const {
    data: programsData,
    isLoading: programsDataLoading,
    refetch: refecthProgramsData,
  } = useGetAllProgramsQuery({});
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  // refetch data everytime the screen is rendered
  useEffect(() => {
    refecthProgramsData();
  }, [location.key, refecthProgramsData]);

  // Function to filter the data based on the search term
  const filteredSkillGapData = programsData?.response.filter(
    (card: { _id: string; title: string; discreption: string }) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillClick = (id: string) => {
    navigate(`/dashboard/skill-gap/details?id=${id}`);
  };

  const navigate = useNavigate();

  return (
    <div className="skill_gap_root">
      <SearchInput handleSearch={(term: string) => setSearchTerm(term)} />
      {programsDataLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
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
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SkillGap;
