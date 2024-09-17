// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import PendulumModelSimulation from './components/PendulumModels/PendulumModelSimulation.tsx';

export default function App() {
  return <MantineProvider>
    <PendulumModelSimulation />
    {/* <p>hellow</p> */}
  </MantineProvider>;

}
