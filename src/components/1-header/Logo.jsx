import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Logo() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();


  // Check for Arabic language to adjust the direction of the motion
  const isArabic = document.documentElement.lang === 'ar';

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div onClick={handleLogoClick} className="outline-none">
      <div className="relative w-full max-w-[250px] h-[60px] flex items-center justify-center cursor-pointer">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Text with Motion */}
          <motion.h1
            className={`relative text-3xl font-[Poppins] ${isDarkMode ? 'text-blue-500' : 'text-blue-700'}`}
            initial={{ x: isArabic ? -100 : 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
            }}
          >
           {t('common.name')}
          </motion.h1>
        </motion.div>
      </div>
    </div>
  );
}
