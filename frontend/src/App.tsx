import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FeedBackUrl, DashboardUrl } from './UrlsConfig';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Feedback = React.lazy(() => import('./pages/Feedback'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path={DashboardUrl}
          element={
            <React.Suspense fallback={null}>
              <Dashboard />
            </React.Suspense>
          }
        ></Route>
        <Route
          path={FeedBackUrl}
          element={
            <React.Suspense fallback={null}>
              <Feedback />
            </React.Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
