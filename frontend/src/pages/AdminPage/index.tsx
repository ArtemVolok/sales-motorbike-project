import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import MotorcycleCardItemAdminPage from '../../components/MotorcycleCardItemAdminPage';
import { ISuccessDeleteMotorcycleResponse } from '../../components/MotorcycleCardItemAdminPage/types';
import { IMotorcycleCard } from '../CatalogMotorcycles/types';
import { getAllMotorcycle, removeMotorcycleCard } from '../../requestTest';
import { IServerError } from '../../requestTest/types';

import './style.scss';

const AdminPage = () => {
  const {
    mutate,
    data: removedData,
    error: removeError,
  } = useMutation<
    AxiosResponse<ISuccessDeleteMotorcycleResponse>,
    AxiosError<IServerError>,
    string
  >({
    mutationFn: removeMotorcycleCard,
  });

  const { data, isLoading, error, isError } = useQuery<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    AxiosError<IServerError>
  >(['allMotorcycle', removedData], {
    queryFn: getAllMotorcycle,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return <div>Немає інформації про карточки мотоциклів</div>;
  }

  const handleDeleteMotorcycleCard = (_id: string) => {
    mutate(_id);
  };

  return (
    <div className="wrapper">
      {isError && error?.response?.data.message}
      {!!removeError && removeError.response?.data && (
        <div className="adminPage__table-errorRemove">
          <p>{removeError.response.data.message}</p>
        </div>
      )}
      {!!removedData && (
        <div className="adminPage__table-successRemove">
          <p>{removedData.data.message}</p>
        </div>
      )}

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
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
