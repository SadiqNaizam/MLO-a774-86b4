import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import CustomerInformationPage from "./pages/CustomerInformationPage";
import SalesAnalyticsPage from "./pages/SalesAnalyticsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard is the index route */}
          <Route path="/" element={<DashboardOverviewPage />} />
          
          {/* Admin Panel Routes */}
          <Route path="/orders" element={<OrdersManagementPage />} />
          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/customers" element={<CustomerInformationPage />} />
          <Route path="/analytics" element={<SalesAnalyticsPage />} />
          {/* 
            Other routes for settings, profile, etc. could be added here.
            Example:
            <Route path="/settings" element={<SettingsPage />} /> 
          */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;