import RegisteredUsersIcon from '@/icons/RegisteredUsersIcon';
import './dashboard.css';
import NotepadIcon from '@/icons/NotepadIcon';
import TalentPoolIcon from '@/icons/TalentPoolIcon';
import CoinIcon from '@/icons/CoinIcon';
import { skillGapPendingData } from '@/utils/skillGapPendingData';
import { useGetAllUserQuery } from '@/services/features/user/userSlice';
import { FadeLoader } from 'react-spinners';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetAllProgramsQuery } from '@/services/features/skillGap/skillGapSlice';

interface User {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

const Dashboard = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUsers,
  } = useGetAllUserQuery({});

  const { data: resultsData, refetch: refetchResults } = useGetAllResultsQuery(
    {}
  );
  const { data: programsData, refetch: refetchPrograms } =
    useGetAllProgramsQuery({});

  const userCount =
    userData?.response?.filter((user: User) => user.fullName)?.length || 0;

  const resultsCount = resultsData?.response?.length || 0;
  const programsCount = programsData?.response?.length || 0;

  const location = useLocation();

  // refetch data everytime the screen is rendered
  useEffect(() => {
    refetchUsers();
    refetchResults();
    refetchPrograms();
  }, [location.key, refetchUsers, refetchResults, refetchPrograms]);

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
      number: resultsCount,
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
      number: programsCount,
    },
  ];

  const navigate = useNavigate();

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
            <div
              className="admin_view_all"
              onClick={() => navigate('user-management')}
            >
              View all
            </div>
          </div>
          {isUserLoading ? (
            <div className="loadingData">
              <FadeLoader color="#007BFF" />
            </div>
          ) : userData?.response.length === 0 ? (
            <div className="nodata_container" style={{ paddingTop: '0px' }}>
              <img
                src="/images/NoData.png"
                alt=""
                style={{ width: '250px', height: '250px' }}
              />
              <div style={{ fontWeight: '600' }}>Oops, No Data Avaliable</div>
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
                  {userData?.response
                    ?.filter((user: User) => user.fullName)
                    .map((user: User) => (
                      <tr key={user._id}>
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
            <div
              className="admin_view_all"
              onClick={() => navigate('skill-gap-program')}
            >
              View all
            </div>
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
