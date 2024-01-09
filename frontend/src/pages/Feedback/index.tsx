import { Link } from 'react-router-dom';
import { DashboardUrl } from '../../UrlsConfig';

const Feedback = () => {
  return (
    <>
      <div>FeedbackPage</div>
      <Link to={DashboardUrl}>Dashboard</Link>
    </>
  );
};

export default Feedback;
