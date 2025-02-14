import '../../evaluation/status/status.css';

interface Props {
  darkmode: boolean;
}

const DetailsStatus: React.FC<Props> = ({ darkmode }) => {
  return (
    <div className={`status_root ${darkmode && "status_root_dark"}`}>
      <div className="status_container">
        <img src="/images/success.svg" alt="success" />
        <div className="status_text">Application Received!!</div>
        <div className="status_statement">
          Thank you for applying. You will be contacted <br /> via email with
          further details.
        </div>
      </div>
    </div>
  );
};

export default DetailsStatus;
