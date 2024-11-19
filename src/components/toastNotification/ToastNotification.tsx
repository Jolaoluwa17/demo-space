import React, { useEffect, useState } from 'react';
import './toastNotification.css';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { BiXCircle } from 'react-icons/bi';

interface ToastProps {
  message: string;
  show: boolean;
  error: boolean;
}

const ToastNotification: React.FC<ToastProps> = ({ message, show, error }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Hide the toast after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className="toast_root">
      <div
        className={`toast ${visible ? 'slide-down' : 'slide-up'}`}
        style={
          error
            ? { border: '1px solid red', backgroundColor: '#FFCCCC' }
            : undefined
        }
      >
        <div className="content">
          {error ? (
            <BiXCircle
              style={{
                paddingRight: '10px',
                paddingBottom: '1px',
                color: 'red',
                fontSize: '20px',
              }}
            />
          ) : (
            <FaRegCircleCheck
              style={{
                paddingRight: '10px',
                paddingBottom: '1px',
                color: '#2fb01a',
                fontSize: '20px',
              }}
            />
          )}
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
