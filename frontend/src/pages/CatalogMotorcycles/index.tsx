import { useQuery } from 'react-query';

import { API_V1_URL } from '../../constants';
import { IMotorcycleCard } from './types';
import MotorcycleCard from '../../components/MotorcycleCard';

import './style.scss';

const getCatalogMotorcycle = async () => {
  const response = await fetch(`${API_V1_URL}/motorcycleCards/allMotorcycle`, {
    method: 'GET',
  });
  const formattedResponse = await response.json();
  console.log('formattedResponse', formattedResponse);
  return formattedResponse;
};

const CatalogMotorcycles = () => {
  const { data } = useQuery('catalogMotorcycle', {
    queryFn: getCatalogMotorcycle,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="catalogMotorcycles__list">
        {data && !!data.response && (
          <>
            {data.response.map((el: IMotorcycleCard) => {
              return <MotorcycleCard motorcycleData={el} key={el._id} />;
            })}
          </>
        )}
      </div>

      {/* <div>
        {motorcycleData.map((el: IMotorcycleData, index: number) => {
          return (
            <div key={index}>
              <MotorcycleCard motorcycleData={el} />
            </div>
          );
        })}
      </div> */}

      {/* {data.errorCode !== undefined && (
        <>
          {data.errorMessage}
        </>
      )}

      {data.length ? (
        <h3>Looks like all is good</h3>
      ) : (
        <h3>Looks like you have not a motorcycle yet</h3>
      )} */}

      {/* {data.errorCode ? (
        <>
          <p>Oops, look like you have a problem:</p>
          {data.errorMessage}
        </>
      ) : (
        <>
          <h3>Looks like all is good</h3>
          {data.length ? (
            <>
              {data.map((el: IMotorcycleCard, index: number) => {
                return (
                  <div key={index}>
                    {el.maxSpeed}
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
