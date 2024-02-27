import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import MotorcycleCardItemAdminPage from '../../components/MotorcycleCardItemAdminPage';
import { ISuccessDeleteMotorcycleResponse } from '../../components/MotorcycleCardItemAdminPage/types';
import { getAllMotorcycle, removeMotorcycleCard } from './utils';
import { IError, IMotorcycleCard } from '../CatalogMotorcycles/types';

import './style.scss';

const AdminPage = () => {
  const {
    mutate,
    data: removeData,
    error: removeError,
  } = useMutation<
    AxiosResponse<ISuccessDeleteMotorcycleResponse>,
    AxiosError<IError>,
    string
  >({
    mutationFn: removeMotorcycleCard,
  });

  const { data, isLoading, error, isError } = useQuery<
    { response: IMotorcycleCard[] },
    AxiosError<IError> | null
  >(['allMotorcycle', removeData], {
    queryFn: getAllMotorcycle,
    refetchOnWindowFocus: false,
  });

  console.log('data', data);

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

  // console.log('removeData', removeData);
  // console.log('removeError', removeError);

  return (
    <div className="wrapper">
      {isError && error?.response?.data.errorCode}
      {!!removeError && removeError.response?.data && (
        <div className="adminPage__table-errorRemove">
          <p>{removeError.response.data.errorMessage}</p>
        </div>
      )}
      {!!removeData && (
        <div className="adminPage__table-successRemove">
          <p>{removeData.data.message}</p>
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="adminPage__table">
          <thead>
            <tr className="adminPage__table-header">
              <th className="headerParagraph__id">ID</th>
              <th className="headerParagraph">Name</th>
              <th className="headerParagraph">VendorCode</th>
              <th className="headerParagraph">Price</th>
              <th className="headerParagraph">Options</th>
            </tr>
          </thead>
          <tbody>
            {!!data &&
              !!data.response &&
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
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
