import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Zoom from 'react-img-zoom';

import { IMotorcycleCard } from '../CatalogMotorcycles/types';
import { API_V1_URL } from '../../constants';

import Tabs from '../../components/Tabs';
import { ITab } from '../../components/Tabs/types';
import Advantages from './components/Advantages';
import Guarantee from './components/Guarantee';
import Description from './components/Description';
import Characteristics from './components/Characteristics';
import { getMotorcycleCard } from '../../requests';
import { IServerError } from '../../requests/types';

import './style.scss';

const infoSiteTabs: ITab[] = [
  {
    title: 'Переваги',
    component: <Advantages />,
  },
  { title: 'Гарантія і документація', component: <Guarantee /> },
];

const MotorcycleInfo = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<
    AxiosResponse<{ response: IMotorcycleCard }> | undefined,
    AxiosError<IServerError>
  >(['motorcycleCard', id], {
    queryFn: () => getMotorcycleCard(id!),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Info about not found</div>;
  }

  const { response } = { ...data.data };

  const allInformationTabs: ITab[] = [
    {
      title: 'Опис',
      component: <Description data={response} />,
    },
    {
      title: 'Характеристики',
      component: <Characteristics data={response} />,
    },
  ];

  return (
    <>
      <div className="motorcycleInfo">
        <div className="motorcycle__shortInfo">
          <div className="motorcycle__shortInfo-imgBlock">
            {!!response && response.uploadImage && (
              <div className="motorcyclePhoto">
                <Zoom
                  img={`${API_V1_URL}/images/${response.uploadImage.filename}`}
                  zoomScale={2}
                  width={600}
                  height={450}
                  transitionTime={0.5}
                />
              </div>
            )}
          </div>
          <div className="motorcycle__shortInfo-desc">
            <div className="desc__priceBlock">
              <h3 className="desc__priceBlock-name">{response?.name}</h3>
              <div className="desc__priceBlock-vendorCode">
                Артикул: {response?.vendorCode}
              </div>
              <div className="desc__priceBlock-price">
                {response?.price} грн.
              </div>
              <div className="desc__priceBlock-buttonBlock">
                <div className="buttonBlock-buy">Купити</div>
                <div className="buttonBlock-quickOrder">Швидке замовлення</div>
              </div>
            </div>
            <div className="desc__info">
              <Tabs tabs={infoSiteTabs} />
            </div>
          </div>
        </div>
        <div className="motorcycle__allInfo">
          <Tabs tabs={allInformationTabs} />
        </div>
      </div>
    </>
  );
};

export default MotorcycleInfo;
