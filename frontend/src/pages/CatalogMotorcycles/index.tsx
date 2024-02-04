import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

export interface IMotorcycleCard {
  name: string;
  price: number;
  vendorCode: string;
  description: string;
}

export interface IError {
  errorCode: number;
  message: string;
}

const CatalogMotorcycles = () => {
  const [allMotorcycles, setAllMotorcycles] = useState<IMotorcycleCard[]>([]);
  const [errorResponse, setErrorResponse] = useState<IError | null>(null);

  const { request } = useHttp();

  useEffect(() => {
    const getAllMotorcycles = async () => {
      try {
        const response = await request(
          'http://localhost:5000/motorcycleCards/allMotorcycle',
          'GET',
        );

        console.log('response', response);
        console.log('response.message', response.message);
        console.log('response.message.length', response.message.length);

        if (response.errorCode == 404) {
          return setErrorResponse(response);
        }

        setAllMotorcycles(response.message);
      } catch (err) {
        console.log('error', err);
        return err;
      }
    };
    getAllMotorcycles();
  }, [request]);

  useEffect(() => {
    console.log('allMotorcycles', allMotorcycles);
  }, [allMotorcycles]);

  return (
    <>
      <p>CatalogMotorcycles</p>

      {errorResponse?.errorCode ? (
        <>
          <p>Oops, look like you have a problem:</p>
          {errorResponse.message}
        </>
      ) : (
        <>
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
      )}
    </>
  );
};

export default CatalogMotorcycles;
