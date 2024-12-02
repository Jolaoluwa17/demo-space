import '../userManagement.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllAdminQuery } from '@/services/features/admin/adminSlice';
import { FadeLoader } from 'react-spinners';
import { useEffect } from 'react';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  _id: string;
}

const ViewAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, refetch } = useGetAllAdminQuery({});
  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  return (
    <div className="user_management_root">
      <div className="view_admin">
        <div className="view_admin_title">
          <div className="back_arrow_icon">
            <IoIosArrowBack />
          </div>
          Admin
        </div>
        <div
          className="create_user_btn"
          onClick={() =>
            navigate('/admin/dashboard/user-management/create-admin')
          }
        >
          Add Admin
        </div>
      </div>
      {isLoading ? (
        <div className="loadingData">
          <FadeLoader color="#4274ba" />
        </div>
      ) : (
        <div className="user_management_table">
          <table>
            <thead>
              <tr>
                <th style={{ borderTopLeftRadius: '12px' }}>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ borderTopRightRadius: '12px' }}>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {data?.response.map((user: AdminUser, index: number) => (
                <tr
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(
                      `/admin/dashboard/user-management/admin-details?id=${user._id}`
                    )
                  }
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>Admin</td>
                  <td>
                    {new Date(user.lastLogin).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <TablePagination
          currentPage={currentPage}
          data={data?.response}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
        /> */}
        </div>
      )}
    </div>
  );
};

export default ViewAdmin;
