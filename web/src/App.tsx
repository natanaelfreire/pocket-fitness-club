import Routes from './routes/index';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { AuthProvider } from './contexts/auth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
