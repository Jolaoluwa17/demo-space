import { useState, useEffect } from 'react';
import './evaluation.css';

import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillsCard from '@/components/skillscard/SkillsCard';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import { FadeLoader } from 'react-spinners';
import descriptionGeneric from '@/utils/descriptionGeneric';

const Evaluation = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]); // State to hold unique categories
  const navigate = useNavigate();

  const { data: assessmentData, isLoading } = useGetAllAssessmentsQuery({});

  // Update search term
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Navigate to instructions page
  const handleCardClick = (id: string, course: string, description: string) => {
    navigate(`/dashboard/evaluation/instructions?id=${id}`, {
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
    <div className="evaluation_root">
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div>
          <SearchInput handleSearch={handleSearch} />
          <div className="evaluation_paginator">
            {/* Map categories dynamically */}
            {categories.map((filter, index) => (
              <div
                key={index}
                className={`evaluation_pagination_btn ${activeFilter === filter ? 'page_active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
          <div className="evaluation_skills_container">
            {/* Display filtered skills */}
            {filteredSkills.map(
              (card: { _id: string; course: string }, index: number) => {
                const description = getRandomDescription();
                return (
                  <SkillsCard
                    key={index}
                    language={card.course}
                    description={description}
                    onClick={() =>
                      handleCardClick(card._id, card.course, description)
                    }
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
