import React, { Suspense } from "react";
import "./i18n";
import "./index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // Prevent Font Awesome from auto-adding CSS

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { Header } from "./components/1-header/Header";
import { Loading } from "./components/shared/Loding";
import { useTheme } from "./Context/ThemeContext";
import FeatureSection from "./components/2-Feature/FeatureSection";
import ProjectDetails from "./components/4-LatestWorks/ProjectDetails";

// Lazy-loaded components
const HeroSection = React.lazy(() => import("./components/2-hero/Hero"));
const Services = React.lazy(() => import("./components/3-services/Services"));
const WebService = React.lazy(() =>
  import("./components/3-services/web/WebService")
);
const MobileService = React.lazy(() =>
  import("./components/3-services/mobile/MobileService")
);
const CustomService = React.lazy(() =>
  import("./components/3-services/custom/CustomService")
);
const UIServices = React.lazy(() =>
  import("./components/3-services/ui/UIServices")
);
const AIService = React.lazy(() =>
  import("./components/3-services/ai/AIService")
);
const MarketingService = React.lazy(() =>
  import("./components/3-services/marketing/MarketingService")
);
const AllServicesPage = React.lazy(() =>
  import("./components/3-services/AllservicesPage")
);
const LatestWorks = React.lazy(() =>
  import("./components/4-LatestWorks/LatestWorks")
);
const Gallery = React.lazy(() => import("./components/4-LatestWorks/Gallery"));
const Steps = React.lazy(() => import("./components/5-steps/steps"));
const About = React.lazy(() => import("./components/6-about/About"));
const Testimonials = React.lazy(() =>
  import("./components/7-Testimonials/Testimonials")
);
const Contact = React.lazy(() => import("./components/8-Contact/Contact"));
const Footer = React.lazy(() => import("./components/9-Footer/Footer"));
const LatestArticles = React.lazy(() =>
  import("./components/10-Blog/LatestArticles")
);
const BlogPage = React.lazy(() => import("./components/10-Blog/BlogPage"));



function MainLayout({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-950" : "bg-gray-50"
        }`}
    >
      <Suspense fallback={<Loading />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  const services = [
    { path: "web", component: WebService },
    { path: "mobile", component: MobileService },
    { path: "custom", component: CustomService },
    { path: "ui", component: UIServices },
    { path: "ai", component: AIService },
    { path: "marketing", component: MarketingService },
  ];

  return (
    <Router>
      <ThemeProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Root Route */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <>
                    <HeroSection />
                    <FeatureSection />
                    <Services />
                    <LatestWorks />
                    <Steps />
                    <About />
                    <Testimonials />
                    <LatestArticles />
                    <Contact />
                  </>
                </MainLayout>
              }
            />

            {/* Pages */}
            <Route
              path="/gallery"
              element={
                <MainLayout>
                  <Gallery />
                </MainLayout>
              }
            />
            <Route
              path="/blog"
              element={
                <MainLayout>
                  <BlogPage />
                </MainLayout>
              }
            />
           
              <Route path="/project/:id" element={
                <MainLayout>
                <ProjectDetails />
                </MainLayout>
                }
            />
            
            <Route
              path="/all-services"
              element={
                <MainLayout>
                  <AllServicesPage />
                </MainLayout>
              }
            />

            {/* Service Routes */}
            {services.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={`/services/${path}`}
                element={
                  <MainLayout>
                    <Component />
                  </MainLayout>
                }
              />
            ))}

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <MainLayout>
                  <div className="text-center h-screen flex flex-col items-center justify-center ">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="mt-4">Page Not Found</p>
                  </div>
                </MainLayout>
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}
