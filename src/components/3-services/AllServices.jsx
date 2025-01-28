import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import ServiceCard from './ServiceCard';

const AllServices = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/services`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setServices(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };
    fetchServices();
  }, [i18n.language]);

  return (
    <div className={`relative font-cairo mt-20 min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-white'}`}>
      {/* Header Section */}
      {/* <div className={`w-full container mx-auto px-4 py-20 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <h1 className="text-blue-600 text-5xl md:text-6xl font-bold mb-6">
          {t('services.allServices')}
        </h1>

        <p className={`
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              text-lg max-w-3xl mx-auto leading-relaxed
            `}>
          {t('services.exploreDescription')}
        </p>

      </div> */}

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? null : (
            // Loaded services
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  isDarkMode={isDarkMode}
                  isLoading={false}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default memo(AllServices);
