import RegisteredUsersIcon from '@/icons/RegisteredUsersIcon';
import './dashboard.css';
import NotepadIcon from '@/icons/NotepadIcon';
import TalentPoolIcon from '@/icons/TalentPoolIcon';
import CoinIcon from '@/icons/CoinIcon';

const Dashboard = () => {
  const overviewCards = [
    {
      id: 1,
      icon: <RegisteredUsersIcon />,
      backgroundColor: '#D5F1F6',
      title: 'Registered Users',
      number: 2000,
    },
    {
      id: 2,
      icon: <NotepadIcon />,
      backgroundColor: '#FFCCCC',
      title: 'Evaluations Done',
      number: 1500,
    },
    {
      id: 3,
      icon: <TalentPoolIcon />,
      backgroundColor: '#D0FBD2',
      title: 'Talent Pool Additions',
      number: 300,
    },
    {
      id: 4,
      icon: <CoinIcon />,
      backgroundColor: '#ECF4FF',
      title: 'Skill Gap Programs',
      number: 250,
    },
  ];

  const tableData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      dateSignedUp: '2024-01-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      dateSignedUp: '2024-02-15',
    },
    {
      id: 3,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    {
      id: 4,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    {
      id: 5,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    {
      id: 6,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    {
      id: 7,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    {
      id: 8,
      name: 'Olusanya Jolaoluwa',
      email: 'olusanyajolaoluwa@gmail.com',
      dateSignedUp: '2024-03-20',
    },
    // Add more data as needed
  ];

  return (
    <div className="admin_dashboard_root">
      <div className="admin_dashboard_overview">
        <div className="title">Overview</div>
        <div className="admin_overview_content">
          {overviewCards.map((card) => (
            <div key={card.id} className="admin_overview_card">
              <div
                className="admin_overview_icon"
                style={{ backgroundColor: card.backgroundColor }}
              >
                {card.icon}
              </div>
              <div className="admin_overview_text">
                <div className="admin_overview_text_tag">{card.title}</div>
                <div className="admin_overview_no">{card.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="admin_dashboard_content">
        <div className="admin_dashboard_left">
          <div className="title">
            <div className="table_header">Recent Signup</div>
            <div className="admin_view_all">View all</div>
          </div>
          <div className="admin_dashboard_table_container">
            <table className="admin_dashboard_user_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((user) => (
                  <tr key={user.id}>
                    <td className="user_table_name">{user.name}</td>
                    <td className="user_table_email">{user.email}</td>
                    <td>{user.dateSignedUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="admin_dashboard_right">
          <div className="title">Activity Log</div>
          <div className="activity_log">
            John Doe updated profile information
          </div>
          <div className="activity_log">
            John Doe updated profile information
          </div>
          <div className="activity_log">
            John Doe updated profile information
          </div>
          <div className="activity_log">
            John Doe updated profile information
          </div>
          <div className="activity_log">
            John Doe updated profile information
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
