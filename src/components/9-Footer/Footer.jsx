import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { BrainCircuit, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { title: t("footer.links.home"), href: "#home" },
    { title: t("footer.links.projects"), href: "#latestworks" },
    { title: t("footer.links.about"), href: "#about" },
    { title: t("footer.links.allservices"), href: "/all-services" },
  ];

  const GradientSquare = ({
    id,
    position,
    rotation,
    gradientClasses,
    hoverShadowClasses,
    overlayGradient,
  }) => (
    <div
      className={`absolute ${position} w-[70vw] h-[40vw] transition-all duration-700 ease-in-out`}
    >
      <div
        className={`w-full h-full rounded-3xl ${rotation} transition-all duration-500 ${gradientClasses} blur-3xl animate-pulse-slow ${
          hoveredSquare === id ? `scale-105 ${hoverShadowClasses}` : ""
        }`}
      />
      <div
        className={`absolute inset-0 ${overlayGradient} rounded-3xl rotate-45 mix-blend-overlay`}
      />
    </div>
  );

  GradientSquare.propTypes = {
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    rotation: PropTypes.string.isRequired,
    gradientClasses: PropTypes.string.isRequired,
    hoverShadowClasses: PropTypes.string.isRequired,
    overlayGradient: PropTypes.string.isRequired,
  };

  const [hoveredSquare, setHoveredSquare] = useState(null);

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    const headerHeight = document.querySelector("header").offsetHeight;

    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        // Store scroll target and navigate to home
        sessionStorage.setItem("scrollTarget", href);
        sessionStorage.setItem("headerHeight", headerHeight.toString());
        navigate("/");
      }
    } else {
      // For non-anchor links (like /all-services)
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTarget");
    const headerHeight = parseInt(sessionStorage.getItem("headerHeight"), 10);

    if (scrollTarget && location.pathname === "/") {
      setTimeout(() => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
        sessionStorage.removeItem("scrollTarget");
        sessionStorage.removeItem("headerHeight");
      }, 100);
    }
  }, [location.pathname]);

  return (
    <footer
      className="relative overflow-hidden bg-gray-950 pt-16"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Decorative Background Effects */}
      <div className="absolute inset-0 " />

      {/* الخلفية الديناميكية */}
   

      <div className="container mx-auto px-4 cairo relative">
        <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex row justify-center items-center gap-3">
              <div className="px-2 py-1.5 rounded-xl bg-gradient-to-br from-emerald-500 to-yellow-500">
                <BrainCircuit className="w-6 h-6 leading-relaxed text-white" />
              </div>
              <span
                className={` font-poppins  text-2xl font-semibold text-white `}
              >
                {t("footer.brand")}
              </span>
            </div>
            <p className="text-white leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 flex flex-col  items-center">
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
              {t("footer.quickLinksTitle")}
            </h4>
            <ul className="space-y-3  ">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="group cursor-pointer flex items-center  justify-center text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    <span className="mx-2">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h4 className="text-xl  font-semibold text-center  text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
              {t("footer.newsletterTitle")}
            </h4>
            <p className="  text-center text-white">
              {t("footer.newsletterDescription")}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 px-4 lg:px-6 sm:px-4 py-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-s-lg text-white focus:outline-none  "
              />
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-e-lg hover:opacity-90 transition-all duration-300">
                <ExternalLink className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4  ">
          <div className="flex items-center 2xl:gap-10 lg:gap-8 md:gap-4  gap-3 " >
              {t("footer.terms", { returnObjects: true }).map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-md  cursor-pointer text-white hover:text-emerald-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="text-white  text-md flex items-center gap-1">
              © {new Date().getFullYear()}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400 font-semibold">
                {t("footer.brand")}
              </span>{" "}
              {t("footer.madeWith")}{" "}
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
