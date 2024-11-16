import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/user/signup/Signup';
import VerifyAccount from './pages/user/verifyAccount/VerifyAccount';
import ForgotPassword from './pages/user/forgotpassword/ForgotPassword';
import ResetPassword from './pages/user/resetpassword/ResetPassword';
import AuthLayout from './components/layout/AuthLayout';
import Profile from './pages/user/profile/Profile';
import Layout from './components/layout/Layout';
import Overview from './pages/user/overview/Overview';
import Evaluation from './pages/user/evaluation/Evaluation';
import EvaluationRoot from './pages/user/evaluation/EvaluationRoot';
import Instructions from './pages/user/evaluation/instructions/Instructions';
import MultipleChoice from './pages/user/evaluation/multipleChoice/MultipleChoice';
import Status from './pages/user/evaluation/status/Status';
import ProgressRoot from './pages/user/progress/ProgressRoot';
import Progress from './pages/user/progress/Progress';
import History from './pages/user/progress/history/History';
import Questions from './pages/user/progress/questions/Questions';
import SkillGap from './pages/user/skillGap/SkillGap';
import SkillGapRoot from './pages/user/skillGap/SkillGapRoot';
import Details from './pages/user/skillGap/details/Details';
import DetailsStatus from './pages/user/skillGap/status/DetailsStatus';
import { Providers } from './services/Provider';
import Settings from './pages/user/settings/Settings';
import ProfileSettings from './pages/user/settings/profileSettings/ProfileSettings';
import SettingsRoot from './pages/user/settings/SettingsRoot';
import DeleteAccount from './pages/user/settings/deleteAccount/DeleteAccount';
import ChangePassword from './pages/user/settings/changePassword/ChangePassword';
import Home from './pages/home/Home';
import ProtectedRoute from './services/ProtectRoute';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import UserManagementRoot from './pages/admin/userManagement/UserManagementRoot';
import UserManagement from './pages/admin/userManagement/UserManagement';
import UserDetails from './pages/admin/userManagement/userDetails/UserDetails';
import CreateUser from './pages/admin/userManagement/createUser/CreateUser';
import AdminEvaluation from './pages/admin/adminEvaluation/AdminEvaluation';
import AdminEvaluationRoot from './pages/admin/adminEvaluation/AdminEvaluationRoot';
import CreateEvaluation from './pages/admin/adminEvaluation/createEvaluation/CreateEvaluation';
import EvaluationDetails from './pages/admin/adminEvaluation/evaluationDetails/EvaluationDetails';
import SkillGapProgramRoot from './pages/admin/skillGapProgram/SkillGapProgramRoot';
import SkillGapProgram from './pages/admin/skillGapProgram/SkillGapProgram';
import SkillGapList from './pages/admin/skillGapProgram/skillGapList/SkillGapList';
import CreateProgram from './pages/admin/skillGapProgram/createProgram/CreateProgram';
import UserSkillGapDetails from './pages/admin/skillGapProgram/userSkillGapDetails/UserSkillGapDetails';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          {/* Landing Routes */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verifyaccount" element={<VerifyAccount />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
          </Route>

          {/* Settings Route */}
          <Route path="/user-profile" element={<Profile />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Layout />} />}
          >
            <Route index element={<Overview />} />
            <Route path="evaluation" element={<EvaluationRoot />}>
              <Route index element={<Evaluation />} />
              {/* <Route path="sub-test" element={<SubTest />} /> */}
              <Route path="instructions" element={<Instructions />} />
              <Route path="multiple-choice" element={<MultipleChoice />} />
              {/* <Route path="short-answer" element={<ShortAnswer />} /> */}
              {/* <Route path="coding-tasks" element={<Coding />} /> */}
              <Route path="status" element={<Status />} />
            </Route>
            <Route path="progress" element={<ProgressRoot />}>
              <Route index element={<Progress />} />
              <Route path="history" element={<History />} />
              <Route path="question/:id" element={<Questions />} />
            </Route>
            <Route path="skill-gap" element={<SkillGapRoot />}>
              <Route index element={<SkillGap />} />
              <Route path="details" element={<Details />} />
              <Route path="status" element={<DetailsStatus />} />
            </Route>
            <Route path="profile" element={<SettingsRoot />}>
              <Route index element={<Settings />} />
              <Route path="profile-settings" element={<ProfileSettings />} />
              <Route path="delete-account" element={<DeleteAccount />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* Admin Dashboard */}
          <Route path="admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="user-management" element={<UserManagementRoot />}>
              <Route index element={<UserManagement />} />
              <Route path="user-details" element={<UserDetails />} />
              <Route path="create-user" element={<CreateUser />} />
            </Route>
            <Route path="evaluation" element={<AdminEvaluationRoot />}>
              <Route index element={<AdminEvaluation />} />
              <Route path="create-evaluation" element={<CreateEvaluation />} />
              <Route
                path="evaluation-details"
                element={<EvaluationDetails />}
              />
            </Route>
            <Route path="skill-gap-program" element={<SkillGapProgramRoot />}>
              <Route index element={<SkillGapProgram />} />
              <Route path="programs" element={<SkillGapList />} />
              <Route path="create-program" element={<CreateProgram />} />
              <Route path="user-details" element={<UserSkillGapDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
