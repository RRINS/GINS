import { DataType } from 'models/dataModel';
import { createContext } from 'react';

export const DataContext = createContext<DataType | undefined>(undefined);
