import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary'; // Add this import
import ErrorPage from './components/ErrorPage'; // Create this component
import './index.css';
import App from './App';
import Home from './components/home/Home';
import ViewNotesPage from './pages/ViewNotesPage';
import CreateNotePage from './pages/CreateNotePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Route-level error boundary
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "notes",
        element: <ViewNotesPage />,
        errorElement: <ErrorPage /> // Optional per-route boundary
      },
      {
        path: "create",
        element: <CreateNotePage />,
        errorElement: <ErrorPage /> // Optional per-route boundary
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary> {/* Global error boundary */}
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);