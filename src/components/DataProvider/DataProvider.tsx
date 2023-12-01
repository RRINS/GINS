import { ReactNode, useState } from 'react';
import { IDataModel } from 'models/dataModel';
import { DataContext } from './DataContext';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataCollection, setDataCollection] = useState<IDataModel>({
    accelX: -1,
    accelY: -1,
    accelZ: -1,
  });

  const updateData = (newData: IDataModel) => {
    setDataCollection(newData);
  };

  return (
    <DataContext.Provider value={{ dataCollection, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
