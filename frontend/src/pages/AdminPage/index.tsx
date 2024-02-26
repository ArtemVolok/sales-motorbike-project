import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { API_V1_URL } from '../../constants';
import { useState } from 'react';
import { IError, IMotorcycleCard } from '../CatalogMotorcycles/types';
import MotorcycleCardItemAdminPage from '../../components/MotorcycleCardItemAdminPage';

import './style.scss';
import { ISuccessDeleteMotorcycleResponse } from '../../components/MotorcycleCardItemAdminPage/types';

const getAllMotorcycle = async () => {
  const response = await axios.get(
    `${API_V1_URL}/motorcycleCards/allMotorcycle`,
  );

  return response.data;
};

const AdminPage = () => {
  const { data, isLoading, error, isError, refetch } = useQuery<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    AxiosError<IError> | null
  >('allMotorcycle', {
    queryFn: getAllMotorcycle,

    refetchOnWindowFocus: false,
  });

  const [deleteMotorcycleResponse, setDeleteMotorcycleResponse] = useState<
    ISuccessDeleteMotorcycleResponse | IError | null
  >(null);

  // useEffect(() => {
  //   console.log('data from useQuery', !!data && data.response);
  //   console.log('isLoading from useQuery', isLoading);
  //   console.log('error from useQuery', error?.response?.data);
  //   console.log('isError from useQuery', isError);
  //   console.log('deleteMotorcycleResponse', deleteMotorcycleResponse);
  // }, [data, isLoading, isError, error, deleteMotorcycleResponse]);

  return (
    <div className="wrapper">
      {isLoading && <p>Loading...</p>}
      {isError && error?.response?.data.errorCode}

      <table className="adminPage__table">
        {!!deleteMotorcycleResponse &&
          'errorCode' in deleteMotorcycleResponse && (
            <p>{deleteMotorcycleResponse.errorMessage}</p>
          )}
        {!!deleteMotorcycleResponse &&
          'message' in deleteMotorcycleResponse && (
            <p>{deleteMotorcycleResponse.message}</p>
          )}

        <tr className="adminPage__table-header">
          <th className="headerParagraph__id">ID</th>
          <th className="headerParagraph">Name</th>
          <th className="headerParagraph">VendorCode</th>
          <th className="headerParagraph">Price</th>
          <th className="headerParagraph">Options</th>
        </tr>
        <tr>
          {!!data &&
            data.response &&
            data.response.map((el: IMotorcycleCard) => {
              const { _id, price, name, vendorCode } = el;
              const preparedData = {
                _id,
                price: price!,
                name,
                vendorCode,
                refetch,
                setDeleteMotorcycleResponse,
              };

              return (
                <MotorcycleCardItemAdminPage props={preparedData} key={_id} />
              );
            })}
        </tr>
      </table>
    </div>
  );
};

export default AdminPage;
