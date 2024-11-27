import { useState } from 'react';
import './evaluation.css';

import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/searchinput/SearchInput';
import SkillsCard from '@/components/skillscard/SkillsCard';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';

const filterOptions = [
  'All',
  'Frontend',
  'Backend',
  'Web Development',
  'Data Science',
  'DevOps',
];

const Evaluation = () => {
  const [activeFilter, setActiveFilter] = useState('All'); // Keeps track of the visually selected filter
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

  return (
    <div className="evaluation_root">
      {isLoading ? (
        <div>Loading...</div>
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
