import { useState } from 'react';
import SearchInput from '../../components/searchinput/SearchInput';
import './evaluation.css';
import SkillsCard from '../../components/skillscard/SkillsCard';
import SkillsEvaluationData from '../../utils/SkillsEvaluationData';
import { useNavigate } from 'react-router-dom';

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

  // Filter the skills based on the search term and active filter
  const filteredSkills = SkillsEvaluationData.filter((card) => {
    const matchesSearch = card.language
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === 'All' || card.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term state
  };

  const handleCardClick = () => {
    navigate('/dashboard/evaluation/instructions');
  };

  return (
    <div className="evaluation_root">
      <SearchInput handleSearch={handleSearch} />
      <div className="evaluation_paginator">
        {filterOptions.map((filter, index) => (
          <div
            key={index}
            className={`evaluation_pagination_btn ${activeFilter === filter ? 'page_active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
      <div className="evaluation_skills_container" onClick={handleCardClick}>
        {filteredSkills.map((card, index) => (
          <SkillsCard
            key={index}
            imgSrc={card.imgSrc}
            language={card.language}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Evaluation;
