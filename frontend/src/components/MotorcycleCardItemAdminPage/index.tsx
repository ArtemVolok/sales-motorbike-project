import { IMotorcycleCardAdmin } from './types';
import TrashBox from '../../assets/trash-solid.svg?react';
import Pencil from '../../assets/pencil-solid.svg?react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { UpdateMotorcycleCardUrl } from '../../UrlsConfig';

const MotorcycleCardItemAdminPage = ({
  _id,
  name,
  vendorCode,
  price,
  handleDeleteMotorcycleCard,
}: IMotorcycleCardAdmin) => {
  const navigate = useNavigate();

  return (
    <tr className="adminMotorcycleCard">
      <th className="adminMotorcycleCard__th-id">{_id || 'Дані відсутні'}</th>
      <th className="adminMotorcycleCard__th">{name || 'Дані відсутні'}</th>
      <th className="adminMotorcycleCard__th">
        {vendorCode || 'Дані відсутні'}
      </th>
      <th className="adminMotorcycleCard__th">{price || 'Дані відсутні'}</th>
      <th className="optionBlock">
        <Pencil
          onClick={() => navigate(`${UpdateMotorcycleCardUrl}/${_id}`)}
          className="optionBlock__edit"
        />
        <TrashBox
          onClick={() => handleDeleteMotorcycleCard(_id)}
          className="optionBlock__remove"
        />
      </th>
    </tr>
  );
};

export default MotorcycleCardItemAdminPage;
