// import { useNavigate } from 'react-router-dom';
import './style.scss';

// { path }: { path?: string }

const BuyButton = ({ title }: { title: string }) => {
  // const navigate = useNavigate();

  // const navigateTo = () => {
  //   if (path) {
  //     navigate(path);
  //   }
  // };

  return (
    <>
      <button className="buyButton">{title}</button>
    </>
  );
};

export default BuyButton;
