import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../src/apiConfig';

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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/header`
      , {
        headers: headers,
      }).then(response => {
        setData(response.data.data);  // Set the response data to state
        setLoading(false);  // Set loading to false

      })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });

  }, []);  
  // Run this effect whenever the `language` changes

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
          {
            loading ?
              <h1 className={`relative text-3xl font-[Poppins] ${isDarkMode ? 'text-blue-500' : 'text-blue-700'}`}>
                {t('common.name')}
              </h1> :
              <img src={data?.logo} alt="Logo" className="h-20 w-auto" />
          }
        </motion.div>
      </div>
    </div>
  );
}
