import LeftArrowIcon from '../../icons/LeftArrowIcon';
import './pageHeader.css';

interface Props {
  handleBackClick: () => void;
  pageTitle: string;
}

const PageHeader: React.FC<Props> = ({ handleBackClick, pageTitle }) => {
  return (
    <div className="page_header_root">
      <div className="page_innner_header">
        <div className="page_back_btn" onClick={handleBackClick}>
          <div className="left_arrow_icon">
            <LeftArrowIcon />
          </div>
          <div className="page_back_text">Back</div>
        </div>
        <div>{pageTitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
