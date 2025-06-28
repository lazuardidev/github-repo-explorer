import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='p-4 bg-white'>
      <QueryClientProvider client={queryClient}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
