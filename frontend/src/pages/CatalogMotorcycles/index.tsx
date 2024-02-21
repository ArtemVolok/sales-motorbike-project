import { useQuery } from 'react-query';

import { API_V1_URL } from '../../constants';
import { motorcycleData } from './types';
import MotorcycleCard, {
  IMotorcycleData,
} from '../../components/MotorcycleCard';

const getCatalogMotorcycle = async () => {
  const response = await fetch(`${API_V1_URL}/motorcycleCards/allMotorcycle`, {
    method: 'GET',
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

const CatalogMotorcycles = () => {
  const { data } = useQuery('catalogMotorcycle', {
    queryFn: getCatalogMotorcycle,
    onSuccess: (response) => {
      console.log('response success', response);
    },
    onError: (response) => {
      console.log('response error', response);
    },
  });

  console.log('data useQuery', data);

  return (
    <>
      <div>
        {motorcycleData.map((el: IMotorcycleData, index: number) => {
          return (
            <div key={index}>
              <MotorcycleCard motorcycleData={el} />
            </div>
          );
        })}
      </div>

      {/* {errorResponse?.errorCode ? (
        <>
          <p>Oops, look like you have a problem:</p>
          {errorResponse.message}
        </>
      ) : (
        <>
          <p>{API_V1_URL}</p>
          {allMotorcycles.length ? (
            <>
              {allMotorcycles.map((el: IMotorcycleCard, index) => {
                return (
                  <div key={index}>
                    {el.description}
                    {el.name}
                    {el.price}
                    {el.vendorCode}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <h3>Looks like you have not a motorcycle yet</h3>
            </>
          )}
        </>
      )} */}
    </>
  );
};

export default CatalogMotorcycles;
