import { useQuery } from 'react-query';

import { IMotorcycleCard } from './types';
import MotorcycleCard from '../../components/MotorcycleCard';
import { getCatalogMotorcycle } from '../../requests';

import './style.scss';

const CatalogMotorcycles = () => {
  const { data } = useQuery('catalogMotorcycle', {
    queryFn: getCatalogMotorcycle,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="catalogMotorcycles__list">
        {!!data && !!data.response && (
          <>
            {data.response.map((el: IMotorcycleCard) => {
              return <MotorcycleCard motorcycleData={el} key={el._id} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default CatalogMotorcycles;
