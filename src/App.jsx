import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import PropertyDetails from './pages/PropertyDetails';
import Favorites from './pages/Favorites';
import Agents from './pages/Agents';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <CompareProvider>{children}</CompareProvider>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/property/:slug" element={<PropertyDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
