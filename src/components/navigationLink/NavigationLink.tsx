import { Link } from 'react-router-dom';
import './navigationLink.css';

interface Props {
  children: React.ReactNode;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  isActive?: boolean;
  isOpen?: boolean;
  link?: string;
  hidden?: boolean;
  disabled?: boolean;
}

const NavigationLink = ({
  children,
  onClick,
  link,
  name,
  isActive,
  hidden,
  disabled,
}: Props) => {
  const commonClasses = `navigation-link ${isActive ? 'active' : ''} ${
    hidden ? 'hidden-class' : ''
  } ${disabled ? 'disabled' : ''}`; 

  if (disabled) {
    // Render a span instead of Link when disabled
    return (
      <div
        className={commonClasses}
        onClick={onClick}
        style={{
          pointerEvents: 'none', // Ensure no interactions if disabled
        }}
      >
        <span className="navigation-icon">{children}</span>
        <p
          className="navigation_text"
          style={{
            color: isActive ? '#007BFF' : '#6A757E',
            fontWeight: '600',
          }}
        >
          {name}
        </p>
      </div>
    );
  }

  // Render the Link when not disabled
  return (
    <Link
      to={link || '#'}
      className={commonClasses}
      onClick={onClick}
      style={{ textDecoration: 'none' }}
    >
      <span className="navigation-icon">{children}</span>
      <p
        className="navigation_text"
        style={{
          color: isActive ? '#007BFF' : '#6A757E',
          fontWeight: '600',
        }}
      >
        {name}
      </p>
    </Link>
  );
};

export default NavigationLink;
