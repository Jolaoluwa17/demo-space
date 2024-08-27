interface Props {
  color: string;
}

const SidebarEvaluationIcon: React.FC<Props> = ({ color }) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H21V19H5V3H3Z"
          fill={color}
        />
        <path
          d="M15.293 14.707C15.4805 14.8944 15.7348 14.9998 16 14.9998C16.2652 14.9998 16.5195 14.8944 16.707 14.707L21.707 9.70697L20.293 8.29297L16 12.586L13.707 10.293C13.5195 10.1055 13.2652 10.0002 13 10.0002C12.7348 10.0002 12.4805 10.1055 12.293 10.293L7.293 15.293L8.707 16.707L13 12.414L15.293 14.707Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SidebarEvaluationIcon;
