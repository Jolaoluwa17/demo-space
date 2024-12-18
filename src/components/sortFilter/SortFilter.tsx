import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import './sortFilter.css';
import Modal from '@/modals/modal/Modal';

interface Props {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: boolean;
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  sortData: Array<{ name: string }>;
}

const SortFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  sort,
  setSort,
  sortOrder,
  setSortOrder,
  sortData,
}) => {
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);

  const toggleModal = () => {
    setSort(!sort);
  };

  return (
    <div className="sort_filter_root">
      <div className="sort_filter" onClick={() => setSort(!sort)}>
        Sort by ({selectedFilter || 'None'})
        {sortOrder && `(${sortOrder === 'asc' ? 'asc' : 'desc'})`}{' '}
        <IoIosArrowDown style={{ marginLeft: '5px' }} />
      </div>
      <Modal modal={sort} onClose={toggleModal}>
        <div className="sort_filter_modal_one">
          {sortData.map((item) => (
            <div
              key={item.name}
              className={`items ${selectedFilter === item.name ? 'selected' : ''}`}
              onMouseEnter={() => setShowSubmenu(item.name)}
              onMouseLeave={() => setShowSubmenu(null)}
              onClick={() => setSelectedFilter(item.name)}
            >
              {item.name}
              {showSubmenu === item.name && (
                <Modal
                  modal={true}
                  zindex={9}
                  left="100px"
                  onClose={toggleModal}
                >
                  <div className="little_arrow_indicator"></div>
                  <div className="sort_filter_modal_two">
                    <div
                      className={`items ${sortOrder === 'asc' && selectedFilter === item.name ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOrder('asc');
                        setSelectedFilter(item.name);
                      }}
                    >
                      Ascending
                    </div>
                    <div
                      className={`items ${sortOrder === 'desc' && selectedFilter === item.name ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOrder('desc');
                        setSelectedFilter(item.name);
                      }}
                    >
                      Descending
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SortFilter;
