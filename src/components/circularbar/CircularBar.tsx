import './circularBar.css';

interface CircularBarProps {
  percentage: number;
  circleWidth: number;
  strokeWidth?: number;
}

const CircularBar: React.FC<CircularBarProps> = ({
  circleWidth,
  percentage,
  strokeWidth = 8,
}) => {
  const radius = circleWidth / 2 - strokeWidth;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div
      className="circular-bar-container"
      style={{ width: circleWidth, height: circleWidth }}
    >
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          className="circle_background"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          className="circle_progress"
          strokeWidth={strokeWidth}
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
      </svg>
      <div className="circle-text">{percentage}</div>
    </div>
  );
};

export default CircularBar;
