import './navigationLink.css';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  isActive?: boolean;
  isOpen?: boolean;
  link?: string;
  hidden?: boolean;
}

const AdminNavigationLink = ({
  children,
  onClick,
  link,
  name,
  isActive,
  hidden,
}: Props) => {
  const commonClasses = `admin-navigation-link ${isActive ? 'active' : ''} ${
    hidden ? 'hidden-class' : ''
  }`;
  if (link) {
    return (
      <Link
        to={link}
        className={commonClasses}
        onClick={onClick}
        style={{ textDecoration: 'none' }}
      >
        <span className="navigation-icon">{children}</span>
        <p
          className="navigation_text"
          style={{
            color: isActive ? '#4274ba' : '#6A757E',
          }}
        >
          {name}
        </p>
      </Link>
    );
  } else {
    return (
      <div className={commonClasses} onClick={onClick}>
        <span className="navigation-icon">{children}</span>
        <p
          className="navigation_text"
          style={{
            color: isActive ? '#4274ba' : '#6A757E',
          }}
        >
          {name}
        </p>
      </div>
    );
  }
};

export default AdminNavigationLink;