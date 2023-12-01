export interface IDataModel {
  accelX: number;
  accelY: number;
  accelZ: number;
}

export type DataType = {
  dataCollection: IDataModel;
  updateData: (newData: IDataModel) => void;
};
