import { useNavigate } from 'react-router-dom';
import './style.scss';

const BuyButton = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(path);
  };

  return (
    <>
      <button onClick={navigateTo} className="buyButton">
        Купити
      </button>
    </>
  );
};

export default BuyButton;
