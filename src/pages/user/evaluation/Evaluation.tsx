import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';

import './evaluation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillsCard from '@/components/skillscard/SkillsCard';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import descriptionGeneric from '@/utils/descriptionGeneric';

interface Props {
  darkmode: boolean;
}

const Evaluation: React.FC<Props> = ({ darkmode }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]); // State to hold unique categories
  const navigate = useNavigate();

  const {
    data: assessmentData,
    isLoading,
    refetch,
    isError,
  } = useGetAllAssessmentsQuery({});

  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  // Update search term
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Navigate to instructions page
  const handleCardClick = (id: string, course: string, description: string) => {
    navigate(`/dashboard/evaluation/instructions?quizId=${id}`, {
      state: { course, description },
    });
  };

  // Get random description from the description list
  const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptionGeneric.length);
    return descriptionGeneric[randomIndex].description;
  };

  // Extract unique categories when assessment data is loaded
  useEffect(() => {
    if (assessmentData?.response) {
      const allCategories: string[] = assessmentData.response.map(
        (item: { category: string }) => item.category
      );
      const uniqueCategories = ['All', ...new Set(allCategories)];
      setCategories(uniqueCategories);
    }
  }, [assessmentData]);

  // Filter skills based on search term and active filter (category)
  const filteredSkills =
    assessmentData?.response
      ?.filter((card: { course: string; category: string }) =>
        card.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((card: { category: string }) => {
        return activeFilter === 'All' || card.category === activeFilter;
      }) || [];

  return (
    <div
      className={`evaluation_root ${darkmode ? 'evaluation_root_dark' : ''}`}
    >
      <SearchInput handleSearch={handleSearch} darkmode={darkmode} />
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : isError ? ( // Check if there is an error
        <div className="nodata_container">
          <img
            src="/images/NoData.jpg"
            alt="No Data"
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>
            Oops, Failed to fetch assessment 😭
          </div>
        </div>
      ) : filteredSkills.length === 0 ? ( // Check for no results
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
        <div>
          <div className="evaluation_paginator">
            {/* Map categories dynamically */}
            {categories.map((filter, index) => (
              <div
                key={index}
                className={`evaluation_pagination_btn ${
                  activeFilter === filter ? 'page_active' : ''
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
          <div className="evaluation_skills_container">
            {/* Display filtered skills */}
            {filteredSkills.map(
              (
                card: { _id: string; course: string; category: string },
                index: number
              ) => {
                const description = getRandomDescription();
                return (
                  <SkillsCard
                    key={index}
                    language={card.course}
                    description={description}
                    category={card.category}
                    onClick={() =>
                      handleCardClick(card._id, card.course, description)
                    }
                    darkmode={darkmode}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;
