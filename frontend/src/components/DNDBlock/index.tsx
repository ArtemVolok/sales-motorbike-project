import React, { useState } from 'react';

import './style.scss';
import classNames from 'classnames';
import DownloadFile from '../../assets/download-solid.svg?react';

interface IDNDBlock {
  handleFiles: (file: File | null) => void;
}

const DNDBlock: React.FC<IDNDBlock> = ({ handleFiles }) => {
  const [useDrag, setUseDrag] = useState<boolean>(false);

  const dragStartHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setUseDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setUseDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const photo = [...e.dataTransfer.files];
    handleFiles(photo[0]);

    setUseDrag(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    handleFiles(files ? files[0] : null);
  };

  return (
    <>
      <p className="dndBlock-paragraph">Прикріпіть фото мотоциклу нижче</p>
      <label
        className={classNames(
          `dndBlock-inputDnd ${useDrag ? 'release' : 'attach'}`,
        )}
        onDragStart={(e) => {
          dragStartHandler(e);
        }}
        onDragLeave={(e) => {
          dragLeaveHandler(e);
        }}
        onDragOver={(e) => {
          dragStartHandler(e);
        }}
        onDrop={(e) => onDropHandler(e)}
      >
        <div className="dnd-inner">
          {useDrag ? (
            <p className="paragraph-release">
              Відпустіть зображення для загрузки
            </p>
          ) : (
            <div>
              <div className="dnd-uploadSvg">
                <DownloadFile />
              </div>
              <h3 className="inner-title">
                Перетащіть зображення для загрузки
              </h3>
              <p className="inner-paragraph">або просто натисніть на це поле</p>
            </div>
          )}
          <input
            type="file"
            className="dnd-input"
            accept="image/*"
            onChange={handleInputChange}
            id="uploadFile"
          />
        </div>
      </label>
    </>
  );
};

export default DNDBlock;
