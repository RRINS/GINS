import { mergeStyles } from '@fluentui/merge-styles';
import { DataContext } from 'components/DataProvider/DataContext';
import { IDataModel } from 'models/dataModel';
import { useContext } from 'react';

const helloStyle = mergeStyles({
  color: 'blue',
});

export const HardwareView = () => {
  const serialData = useContext(DataContext);

  const testData: IDataModel = {
    accelX: 2,
    accelY: 2,
    accelZ: 2,
  };

  return (
    <>
      <h1 className={helloStyle}>Hello!</h1>
      <h1>{serialData?.dataCollection.accelX}</h1>
      <button
        type="button"
        onClick={() => {
          serialData?.updateData({
            accelX: serialData?.dataCollection.accelX + 1,
            accelY: serialData?.dataCollection.accelY + 1,
            accelZ: serialData?.dataCollection.accelZ + 1,
          });
        }}
      >
        Test
      </button>
    </>
  );
};
