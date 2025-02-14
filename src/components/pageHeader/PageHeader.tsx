import { IoIosArrowBack } from 'react-icons/io';

import './pageHeader.css';

interface Props {
  handleBackClick: () => void;
  pageTitle: string;
  darkmode: boolean;
}

const PageHeader: React.FC<Props> = ({
  handleBackClick,
  pageTitle,
  darkmode,
}) => {
  return (
    <div className={`page_header_root ${darkmode && 'page_header_root_dark'}`}>
      <div className="page_innner_header">
        <div className="page_back_btn" onClick={handleBackClick}>
          <div className="pageheader_left_arrow_icon">
            <IoIosArrowBack size={20} />
          </div>
          <div className="page_back_text">Back</div>
        </div>
        <div>{pageTitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
