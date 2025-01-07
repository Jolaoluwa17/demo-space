import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import ProtectedRoute from './middleware/ProtectRoute';

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
import ChangePassword from './pages/user/settings/changePassword/ChangePassword';
import Home from './pages/home/Home';
import { useState } from 'react';

function App() {
  const [examInProgress, setExamInProgress] = useState(false);

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
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute element={<Profile />} allowedRoles={['User']} />
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={<Layout examInProgress={examInProgress} />}
                allowedRoles={['User']}
              />
            }
          >
            <Route index element={<Overview />} />
            <Route path="evaluation" element={<EvaluationRoot />}>
              <Route index element={<Evaluation />} />
              <Route path="instructions" element={<Instructions />} />
              <Route
                path="multiple-choice"
                element={
                  <MultipleChoice
                    examInProgress={examInProgress}
                    setExamInProgress={setExamInProgress}
                  />
                }
              />
              <Route path="status" element={<Status />} />
            </Route>
            <Route path="progress" element={<ProgressRoot />}>
              <Route index element={<Progress />} />
              <Route path="history" element={<History />} />
              <Route path="question" element={<Questions />} />
            </Route>
            <Route path="skill-gap" element={<SkillGapRoot />}>
              <Route index element={<SkillGap />} />
              <Route path="details" element={<Details />} />
              <Route path="status" element={<DetailsStatus />} />
            </Route>
            <Route path="profile" element={<SettingsRoot />}>
              <Route index element={<Settings />} />
              <Route path="profile-settings" element={<ProfileSettings />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
