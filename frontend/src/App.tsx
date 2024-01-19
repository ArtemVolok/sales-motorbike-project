import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {
  FeedBackUrl,
  DashboardUrl,
  AboutUsUrl,
  ContactsUrl,
} from './UrlsConfig';

import './assets/scss/index.scss';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const Layout = React.lazy(() => import('./components/Layout'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));

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
