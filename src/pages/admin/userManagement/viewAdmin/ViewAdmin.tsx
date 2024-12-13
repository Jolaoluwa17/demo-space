import '../userManagement.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllAdminQuery } from '@/services/features/admin/adminSlice';
import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import TablePagination from '@/components/tablePagination/TablePagination';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  lastSeen: string;
  _id: string;
}

const ViewAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data, isLoading, refetch } = useGetAllAdminQuery({});
  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  const totalPages = Math.ceil(data?.response.length / rowsPerPage);

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data?.response.slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <div className="user_management_root">
      <div className="view_admin">
        <div
          className="view_admin_title"
          onClick={() => navigate('/admin/dashboard/user-management')}
        >
          <div className="back_arrow_icon">
            <IoIosArrowBack />
          </div>
          Admin Management
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
          <FadeLoader color="#007BFF" />
        </div>
      ) : data?.response.length === 0 ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.png"
            alt=""
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>Oops, No Data Avaliable</div>
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
              {getPaginatedUsers().map((user: AdminUser, index: number) => (
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
                  <td>{user.role}</td>
                  <td>
                    {new Date(user.lastSeen).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            currentPage={currentPage}
            data={data?.response}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default ViewAdmin;
