import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import ChatInterface from './pages/ChatInterface';
import CreateService from './pages/CreateService';
import ProviderPortal from './pages/ProviderPortal';
import CheckoutPage from './pages/CheckoutPage';
import CommissionManagement from './pages/CommissionManagement';
import ContentManagement from './pages/ContentManagement';
import AgencyDashboard from './pages/AgencyDashboard';
import ServiceDetails from './pages/ServiceDetails';
import UserManagement from './pages/UserManagement';
import ChatbotConsole from './pages/ChatbotConsole';
import PromotionManagement from './pages/PromotionManagement';
import LoginPage from './pages/LoginPage';
import ReviewModeration from './pages/ReviewModeration';
import ProviderNotifications from './pages/ProviderNotifications';
import CheckoutPayment from './pages/CheckoutPayment';
import UserNotifications from './pages/UserNotifications';
import EventManager from './pages/EventManager';
import ProviderProfile from './pages/ProviderProfile';
import PaymentReceipt from './pages/PaymentReceipt';
import BookingSelection from './pages/BookingSelection';
import AccountDetails from './pages/AccountDetails';
import RegisterPage from './pages/RegisterPage';
import ProviderValidation from './pages/ProviderValidation';
import IdentityVerification from './pages/IdentityVerification';
import ProviderSettings from './pages/ProviderSettings';
import BookingRequests from './pages/BookingRequests';
import AvailabilityManager from './pages/AvailabilityManager';
import PendingApprovalPage from './pages/PendingApprovalPage';

import { useState, useRef } from 'react';
import CategorySection from './components/CategorySection'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import AIGuide from './components/AIGuide'
import Footer from './components/Footer'

const HomePageContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchServiceType, setSearchServiceType] = useState('');
  const categoriesRef = useRef(null);

  const handleSearch = (query, category, type = '') => {
    setSearchQuery(query);
    setSearchCategory(category);
    setSearchServiceType(type);
    // Smooth scroll to results if search is active
    if (query || category || type) {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-secondary selection:bg-primary/20">
      <Navbar onExploreCategories={scrollToCategories} />
      <main>
        <Hero onSearch={handleSearch} />
        
        {/* Categories Overview */}
        <div ref={categoriesRef} id="categories-section">
          <Categories onCategoryClick={(name, type) => {
              setSearchCategory(name);
              setSearchServiceType(type);
          }} />
        </div>

        {/* Dynamic Search Results Section */}
        {(searchQuery || searchCategory) && (
            <div className="bg-orange-50/30 pb-20">
                <CategorySection 
                    title="Résultats de recherche" 
                    subtitle={`Affichage des résultats pour "${searchQuery || 'Tous'}" dans ${searchCategory || 'Toutes les catégories'}`}
                    category={searchCategory}
                    serviceType={searchServiceType}
                    searchQuery={searchQuery}
                    limit={20}
                />
            </div>
        )}

        {/* Organized Category Sections */}
        {!searchQuery && !searchCategory && (
            <>
                <CategorySection 
                    title="Hébergements d'Exception" 
                    subtitle="Des hôtels et maisons d'hôtes soigneusement sélectionnés."
                    serviceType="ROOM"
                />
                
                <AIGuide />

                <CategorySection 
                    title="Saveurs de Djerba" 
                    subtitle="Découvrez les meilleures tables et menus de l'île."
                    serviceType="TABLE"
                />

                <CategorySection 
                    title="Activités & Découvertes" 
                    subtitle="Explorez l'île avec nos guides locaux passionnés."
                    serviceType="GUIDE_TOUR"
                />

                <CategorySection 
                    title="Événements à Venir" 
                    subtitle="Ne manquez rien de la vie culturelle de Djerba."
                    serviceType="EVENT"
                />
            </>
        )}
      </main>
      <Footer />
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        
        {/* Admin Section */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reviews" element={<ReviewModeration />} />
          <Route path="chatbot" element={<ChatbotConsole />} />
          <Route path="validation" element={<ProviderValidation />} />
          <Route path="commissions" element={<CommissionManagement />} />
          <Route path="content" element={<ContentManagement />} />
        </Route>

        {/* Chat Interface */}
        <Route path="/chat" element={<ChatInterface />} />

        {/* Provider Section */}
        <Route path="/provider" element={<DashboardLayout />}>
           <Route index element={<ProviderPortal />} />
           <Route path="dashboard" element={<AgencyDashboard />} />
           <Route path="notifications" element={<ProviderNotifications />} />
           <Route path="events" element={<EventManager />} />
           <Route path="verification" element={<IdentityVerification />} />
           <Route path="promotions" element={<PromotionManagement />} />
           <Route path="bookings" element={<BookingRequests />} />
           <Route path="calendar" element={<AvailabilityManager />} />
           <Route path="services/new" element={<CreateService />} />
           <Route path="settings" element={<ProviderSettings />} />
        </Route>

        {/* Public Action Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />
        <Route path="/checkout" element={<CheckoutPayment />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/booking/selection" element={<BookingSelection />} />
        <Route path="/receipt" element={<PaymentReceipt />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/account" element={<AccountDetails />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/services/new" element={<CreateService />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        
        {/* Placeholders for missing pages */}
        <Route path="/categories" element={<HomePageContent />} />
        <Route path="/privacy" element={<div className="p-20 text-center font-bold">Privacy Policy - Coming Soon</div>} />
        <Route path="/terms" element={<div className="p-20 text-center font-bold">Terms of Service - Coming Soon</div>} />
        <Route path="/forgot-password" element={<div className="p-20 text-center font-bold">Reset Password - Coming Soon</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
