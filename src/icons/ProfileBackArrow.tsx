interface Props {
  color?: string;
}

const ProfileBackArrow: React.FC<Props> = ({ color = '#007BFF' }) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="24"
          rx="12"
          transform="matrix(0 -1 -1 0 24 24)"
          fill={color}
        />
        <path
          d="M15.2536 16.0884L11.0242 12.2633C11.0139 12.254 11.0042 12.2442 10.9949 12.2339C10.8473 12.0695 10.8609 11.8166 11.0252 11.669L15.205 7.91535C15.5752 7.58285 15.6065 7.01236 15.2749 6.64114C14.9432 6.26992 14.3743 6.23853 14.004 6.57104L8.74826 11.2911C8.34983 11.6489 8.34874 12.2741 8.74591 12.6333L14.048 17.4285C14.417 17.7623 14.9861 17.7329 15.3191 17.3629C15.652 16.9928 15.6227 16.4222 15.2536 16.0884Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default ProfileBackArrow;
