import { Link } from 'react-router-dom';
import { FeedBackUrl } from '../../UrlsConfig';

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Link to={FeedBackUrl}>Page of Feedback</Link>
    </>
  );
};

export default Dashboard;
