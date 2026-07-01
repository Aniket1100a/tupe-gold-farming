/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SuccessGallery } from './pages/SuccessGallery';
import { AddReview } from './pages/AddReview';
import { Reviews } from './pages/Reviews';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="success-gallery" element={<SuccessGallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="add-review" element={<AddReview />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
