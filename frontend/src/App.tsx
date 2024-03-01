import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {
  FeedBackUrl,
  DashboardUrl,
  AboutUsUrl,
  ContactsUrl,
  CatalogMotorcyclesUrl,
  CreateMotorcycleCartUrl,
  AdminPageUrl,
  MotorcycleInfoIdUrl,
  RegistrationUrl,
  LoginUrl,
} from './UrlsConfig';

import './assets/scss/index.scss';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const Layout = React.lazy(() => import('./components/Layout'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const CatalogMotorcycles = React.lazy(
  () => import('./pages/CatalogMotorcycles'),
);
const CreateMotorcycleCartPage = React.lazy(
  () => import('./pages/CreateMotorcycleCart'),
);
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const MotorcyclePage = React.lazy(() => import('./pages/MotorcycleInfo'));
const RegistrationPage = React.lazy(() => import('./pages/Registration'));
const LoginPage = React.lazy(() => import('./pages/Login'));

//TODO: change routing, need add opportunity pass promise to footer

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path={DashboardUrl}
            index
            element={
              <React.Suspense fallback={null}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path={FeedBackUrl}
            element={
              <React.Suspense fallback={null}>
                <Feedback />
              </React.Suspense>
            }
          />
          <Route
            path={AboutUsUrl}
            element={
              <React.Suspense fallback={null}>
                <AboutUs />
              </React.Suspense>
            }
          />
          <Route
            path={ContactsUrl}
            element={
              <React.Suspense fallback={null}>
                <Contacts />
              </React.Suspense>
            }
          />
          <Route
            path={CatalogMotorcyclesUrl}
            element={
              <React.Suspense fallback={null}>
                <CatalogMotorcycles />
              </React.Suspense>
            }
          />
          <Route
            path={CreateMotorcycleCartUrl}
            element={
              <React.Suspense fallback={null}>
                <CreateMotorcycleCartPage />
              </React.Suspense>
            }
          />
          <Route
            path={AdminPageUrl}
            element={
              <React.Suspense fallback={null}>
                <AdminPage />
              </React.Suspense>
            }
          />
          <Route
            path={MotorcycleInfoIdUrl}
            element={
              <React.Suspense fallback={null}>
                <MotorcyclePage />
              </React.Suspense>
            }
          />
          <Route
            path={RegistrationUrl}
            element={
              <React.Suspense fallback={null}>
                <RegistrationPage />
              </React.Suspense>
            }
          />
          <Route
            path={LoginUrl}
            element={
              <React.Suspense fallback={null}>
                <LoginPage />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={null}>
                <div>Not Found Page</div>
                <Link to={DashboardUrl}>Back to Dashboard</Link>
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
