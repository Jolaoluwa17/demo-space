import RegisteredUsersIcon from '@/icons/RegisteredUsersIcon';
import './dashboard.css';
import NotepadIcon from '@/icons/NotepadIcon';
import TalentPoolIcon from '@/icons/TalentPoolIcon';
import CoinIcon from '@/icons/CoinIcon';
import { skillGapPendingData } from '@/utils/skillGapPendingData';
import { useGetAllUserQuery } from '@/services/features/user/userSlice';
import { FadeLoader } from 'react-spinners';

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

const Dashboard = () => {
  const { data, isLoading } = useGetAllUserQuery({});
  const userCount =
    data?.response?.filter((user: User) => user.fullName)?.length || 0;

  const overviewCards = [
    {
      id: 1,
      icon: <RegisteredUsersIcon />,
      backgroundColor: '#D5F1F6',
      title: 'Registered Users',
      number: userCount,
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
          {isLoading ? (
            <div className="loadingData">
              <FadeLoader color="#4274ba" />
            </div>
          ) : (
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
                  {data?.response
                    ?.filter((user: User) => user.fullName)
                    .map((user: User) => (
                      <tr key={user.id}>
                        <td className="user_table_name">{user.fullName}</td>
                        <td className="user_table_email">{user.email}</td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="admin_dashboard_right">
          <div className="title">
            <div className="table_header">Skill Gap</div>
            <div className="admin_view_all">View all</div>
          </div>
          <div className="admin_dashboard_table_container">
            <table className="admin_dashboard_user_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {skillGapPendingData.map((user) => (
                  <tr key={user.id}>
                    <td className="user_table_name">{user.name}</td>
                    <td className="user_table_email">{user.program}</td>
                    <td style={{ padding: '0px' }}>
                      <div
                        style={{
                          border: '1px solid #FFDD00',
                          backgroundColor: '#FFFCE7',
                          width: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '20px',
                          fontSize: '12px',
                          padding: '5px 0px',
                        }}
                      >
                        {user.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
