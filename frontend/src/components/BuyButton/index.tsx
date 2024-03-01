import { useNavigate } from 'react-router-dom';
import './style.scss';

const BuyButton = ({ title, path }: { title: string; path: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <button className="buyButton" onClick={() => navigate(path)}>
        {title}
      </button>
    </>
  );
};

export default BuyButton;
