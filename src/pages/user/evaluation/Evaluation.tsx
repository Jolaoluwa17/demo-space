import { useState } from 'react';
import './evaluation.css';

import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillsCard from '@/components/skillscard/SkillsCard';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import { FadeLoader } from 'react-spinners';
import descriptionGeneric from '@/utils/descriptionGeneric';

const filterOptions = [
  'All',
  'Frontend',
  'Backend',
  'Web Development',
  'Data Science',
  'DevOps',
];

const Evaluation = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: assessmentData, isLoading } = useGetAllAssessmentsQuery({});

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term state
  };

  // Updated: Pass item ID to navigate
  const handleCardClick = (id: string) => {
    navigate(`/dashboard/evaluation/instructions?id=${id}`);
  };

  // Filter skills based only on the search term
  const filteredSkills =
    assessmentData?.response?.filter((card: { course: string }) =>
      card.course.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptionGeneric.length);
    return descriptionGeneric[randomIndex].description;
  };

  return (
    <div className="evaluation_root">
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#4274ba" />
        </div>
      ) : (
        <div>
          <SearchInput handleSearch={handleSearch} />
          <div className="evaluation_paginator">
            {filterOptions.map((filter, index) => (
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
            {filteredSkills.map(
              (card: { _id: string; course: string }, index: number) => (
                <SkillsCard
                  key={index}
                  language={card.course}
                  description={getRandomDescription()}
                  onClick={() => handleCardClick(card._id)} // Attach ID to handler
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;
