// Driver for displaying something.
// In general, all components should be in organized directories

import { DataProvider } from 'components/DataProvider/DataProvider';
import { HardwareView } from 'pages/HardwareView';

export const App = () => (
  <DataProvider>
    <HardwareView />
  </DataProvider>
);
