import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import VerifyAccount from './pages/verifyAccount/VerifyAccount';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import ResetPassword from './pages/resetpassword/ResetPassword';
import AuthLayout from './components/layout/AuthLayout';
import Profile from './pages/profile/Profile';
import Layout from './components/layout/Layout';
import Overview from './pages/overview/Overview';
import Evaluation from './pages/evaluation/Evaluation';
import SubTest from './pages/evaluation/subtests/SubTest';
import EvaluationRoot from './pages/evaluation/EvaluationRoot';
import Instructions from './pages/evaluation/instructions/Instructions';
import MultipleChoice from './pages/evaluation/multipleChoice/MultipleChoice';
import ShortAnswer from './pages/evaluation/shortAnswer/ShortAnswer';
import Status from './pages/evaluation/status/Status';
import ProgressRoot from './pages/progress/ProgressRoot';
import Progress from './pages/progress/Progress';
import History from './pages/progress/history/History';
import Questions from './pages/progress/questions/Questions';
import SkillGap from './pages/skillGap/SkillGap';
import SkillGapRoot from './pages/skillGap/SkillGapRoot';
import Details from './pages/skillGap/details/Details';
import DetailsStatus from './pages/skillGap/status/DetailsStatus';
import { Providers } from './services/Provider';
import Settings from './pages/settings/Settings';
import ProfileSettings from './pages/settings/profileSettings/ProfileSettings';
import SettingsRoot from './pages/settings/SettingsRoot';
import DeleteAccount from './pages/settings/deleteAccount/DeleteAccount';
import ChangePassword from './pages/settings/changePassword/ChangePassword';
import Home from './pages/home/Home';

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
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="evaluation" element={<EvaluationRoot />}>
              <Route index element={<Evaluation />} />
              <Route path="sub-test" element={<SubTest />} />
              <Route path="instructions" element={<Instructions />} />
              <Route path="multiple-choice" element={<MultipleChoice />} />
              <Route path="short-answer" element={<ShortAnswer />} />
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
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
