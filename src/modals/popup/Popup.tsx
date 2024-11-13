import './popup.css';

interface Props {
  popup: boolean;
  children: React.ReactNode;
}

const Popup: React.FC<Props> = ({ popup, children }) => {
  if (!popup) return null;

  return (
    <div className="popup_root">
      <div className="popup_main">{children}</div>
    </div>
  );
};

export default Popup;
