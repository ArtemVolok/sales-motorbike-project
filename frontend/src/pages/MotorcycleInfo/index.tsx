import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Zoom from 'react-img-zoom';

import { getMotorcycleCard } from './utils';
import { IError, IMotorcycleCard } from '../CatalogMotorcycles/types';
import { API_V1_URL } from '../../constants';

import Tabs from '../../components/Tabs';
import { ITab } from '../../components/Tabs/types';
import Advantages from './components/Advantages';
import Guarantee from './components/Guarantee';
import Description from './components/Description';
import Characteristics from './components/Characteristics';

import './style.scss';

const MotorcycleInfo = () => {
  const { id } = useParams();
  const { data } = useQuery<
    AxiosResponse<{ response: IMotorcycleCard }> | undefined,
    AxiosError<IError>
  >(['motorcycleCard', id], {
    queryFn: () => (id ? getMotorcycleCard(id) : Promise.resolve(undefined)),
    enabled: !!id,
  });
  const { data: responseData } = { ...data };

  const infoSiteTabs: ITab[] = [
    {
      title: 'Переваги',
      component: <Advantages />,
    },
    { title: 'Гарантія і документація', component: <Guarantee /> },
  ];

  const allInformationTabs: ITab[] = [
    {
      title: 'Опис',
      component: <Description data={responseData?.response} />,
    },
    {
      title: 'Характеристики',
      component: <Characteristics data={responseData?.response} />,
    },
  ];

  return (
    <>
      <div className="motorcycleInfo">
        <div className="motorcycle__shortInfo">
          <div className="motorcycle__shortInfo-imgBlock">
            {!!responseData && responseData.response.uploadImage && (
              <div className="motorcyclePhoto">
                <Zoom
                  img={`${API_V1_URL}/images/${responseData.response.uploadImage.filename}`}
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
              <h3 className="desc__priceBlock-name">
                {responseData?.response.name}
              </h3>
              <div className="desc__priceBlock-vendorCode">
                Артикул: {responseData?.response.vendorCode}
              </div>
              <div className="desc__priceBlock-price">
                {responseData?.response.price} грн.
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
