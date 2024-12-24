import { HiOutlineInformationCircle, HiOutlineXMark } from 'react-icons/hi2';
import { CiCircleCheck } from 'react-icons/ci';
import { BiErrorCircle } from 'react-icons/bi';
import { IoWarningOutline } from 'react-icons/io5';

import './notificationToast.css';

interface Props {
  msg: string;
  toastType: 'info' | 'success' | 'error' | 'warning';
  cancel: () => void;
}

const NotificationToast: React.FC<Props> = ({ msg, toastType, cancel }) => {
  const iconMap = {
    info: <HiOutlineInformationCircle style={{ color: '#2449DB' }} size={22} />,
    success: <CiCircleCheck style={{ color: '#2FB01A' }} size={25} />,
    error: <BiErrorCircle style={{ color: '#EF2A5A' }} size={22} />,
    warning: <IoWarningOutline style={{ color: '#FFC433' }} size={22} />,
  } as const;

  const backgroundColorMap = {
    info: '#f6fafe',
    success: '#f3fef1',
    error: '#fff6f7',
    warning: '#fff8ef',
  } as const;

  const borderMap = {
    info: '1px solid #2449DB',
    success: '1px solid #2FB01A',
    error: '1px solid #EF2A5A',
    warning: '1px solid #FFC433',
  };

  return (
    <div
      className="notification_toast_root"
      style={{
        backgroundColor: backgroundColorMap[toastType],
        border: borderMap[toastType],
      }}
    >
      <div>{iconMap[toastType]}</div>
      <div className="notification_toast_text">{msg}</div>
      <HiOutlineXMark
        style={{ cursor: 'pointer' }}
        size={20}
        onClick={cancel}
      />
    </div>
  );
};

export default NotificationToast;
