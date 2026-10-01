import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/organisms/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Checkout } from './pages/Checkout';
import { Ayuda } from './pages/Ayuda';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categorias" element={<Catalog />} />
          <Route path="ofertas" element={<Catalog />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;