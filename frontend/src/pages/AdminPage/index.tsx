import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import MotorcycleCardItemAdminPage from '../../components/MotorcycleCardItemAdminPage';
import { ISuccessDeleteMotorcycleResponse } from '../../components/MotorcycleCardItemAdminPage/types';
import { getAllMotorcycle, removeMotorcycleCard } from './utils';
import { IError, IMotorcycleCard } from '../CatalogMotorcycles/types';

import './style.scss';

const AdminPage = () => {
  const { data, isLoading, error, isError } = useQuery<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    AxiosError<IError> | null
  >('allMotorcycle', {
    queryFn: getAllMotorcycle,

    refetchOnWindowFocus: false,
  });

  const {
    mutate,
    data: removeData,
    error: removeError,
  } = useMutation<
    AxiosResponse<ISuccessDeleteMotorcycleResponse>,
    AxiosError<IError> | null,
    string
  >({
    mutationFn: removeMotorcycleCard,
  });

  const handleDeleteMotorcycleCard = (_id: string) => {
    mutate(_id);
  };

  // useEffect(() => {
  //   console.log('data from useQuery', !!data && data.response);
  //   console.log('isLoading from useQuery', isLoading);
  //   console.log('error from useQuery', error?.response?.data);
  //   console.log('isError from useQuery', isError);
  //   console.log('deleteMotorcycleResponse', deleteMotorcycleResponse);
  // }, [data, isLoading, isError, error, deleteMotorcycleResponse]);

  console.log('removeData', removeData);
  console.log('removeError', removeError);

  return (
    <div className="wrapper">
      {isError && error?.response?.data.errorCode}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="adminPage__table">
          {!!removeError && removeError.response?.data && (
            <p className="adminPage__table-errorRemove">
              {removeError.response.data.errorMessage}
            </p>
          )}
          {!!removeData && (
            <p className="adminPage__table-successRemove">
              {removeData.data.message}
            </p>
          )}
          {/* {!!deleteMotorcycleResponse &&
          'errorCode' in deleteMotorcycleResponse && (
            <p>{deleteMotorcycleResponse.errorMessage}</p>
          )}
        {!!deleteMotorcycleResponse &&
          'message' in deleteMotorcycleResponse && (
            <p>{deleteMotorcycleResponse.message}</p>
          )} */}

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
                  handleDeleteMotorcycleCard,
                };

                return (
                  <MotorcycleCardItemAdminPage {...preparedData} key={_id} />
                );
              })}
          </tr>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
