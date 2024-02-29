import { useState } from 'react';
import { ITab } from './types';

import './style.scss';
import classNames from 'classnames';

interface ITabs {
  tabs: ITab[];
}

const Tabs = ({ tabs }: ITabs) => {
  const [toggleTab, setToggleTab] = useState(0);

  return (
    <div className="tabs">
      <div className={classNames('tabs__titleBlock')}>
        {tabs.map((el: ITab, index: number) => {
          return (
            <div
              onClick={() => setToggleTab(index)}
              className={classNames('tabs__titleBlock-title')}
              key={index}
            >
              <h3
                className={classNames(
                  index === toggleTab ? 'titleTextActive' : 'titleText',
                )}
              >
                {el.title}
              </h3>
            </div>
          );
        })}
      </div>

      {tabs[toggleTab].component}
    </div>
  );
};

export default Tabs;
