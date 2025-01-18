import { memo, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, Smartphone, Palette, Rocket, Globe, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import CornerLights from '../0-Background/CornerLights';
import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../../../src/apiConfig';
import defaultImage from '/public/assets/pexels-cottonbro-5474294.jpg';
import parse from 'html-react-parser';

const ServiceIcon = (({ Icon, isDarkMode }) => (
  <div
    className={`w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500  to-blue-700 p-0.5 transform-gpu transition-transform duration-500 ease-out group-hover:scale-110`}
  >
    <div className={`w-full h-full ${isDarkMode ? 'bg-gray-950' : 'bg-white'
      } rounded-xl flex items-center justify-center`}>
      <Icon className={`w-8 h-8 ${isDarkMode ? 'text-blue-400 group-hover:text-indigo-400' : 'text-blue-600 group-hover:text-indigo-600'
        } transition-colors duration-200`} />
    </div>
  </div>
));
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
// const [loadingg, setLoadingg] = useState(false);
// const [data, setData] = useState([]);
// const [errore, setErrore] = useState(null);

const ServiceCard = ({ icon: Icon, title, description, link, index }) => {
  const { isDarkMode } = useTheme();




  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative p-6 rounded-xl backdrop-blur-lg border ${isDarkMode ? 'border-white/20' : 'border-blue-600/70'
        } group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform-gpu will-change-transform hover:-translate-y-1`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode
        ? ' from-blue-500/20  to-indigo-400/20 to-blue-500/20'
        : 'from-blue-300/30 via-sky-400/20 to-indigo-300/20'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

      <Link
        to={link}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="relative z-10 block"
      >
        {/* <div className="mb-4 flex justify-center">
          <ServiceIcon Icon={Icon} isDarkMode={isDarkMode} />
        </div> */}

        <h3 className={`text-2xl text-center font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
          } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-sky-400' : 'from-blue-600 to-sky-600'
          } transition-all duration-500`}>
          {title}
        </h3>

        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } leading-relaxed text-center transition-colors duration-500`}>
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

ServiceIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

const Services = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();

  const services = useMemo(() => [
    { icon: Globe, title: t('services.web.title'), description: t('services.web.desc'), link: '#' },
    { icon: Smartphone, title: t('services.mobile.title'), description: t('services.mobile.desc'), link: '#' },
    { icon: Code2, title: t('services.custom.title'), description: t('services.custom.desc'), link: '#' },
    { icon: Palette, title: t('services.ui.title'), description: t('services.ui.desc'), link: '#' },
    { icon: Brain, title: t('services.ai.title'), description: t('services.ai.desc'), link: '#' },
    { icon: Rocket, title: t('services.marketing.title'), description: t('services.marketing.desc'), link: '#' },
  ], [t]);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/services`
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

  }, []);  // Run this effect whenever the `language` changes
  return (
    <section className={`relative w-full py-10  ${i18n.language === 'ar' ? 'font-cairo' : 'font-cairo'
      }`}>
      <div
        className="absolute inset-0 opacity-50 w-full h-full"
        style={{
          contain: 'layout paint size',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <CornerLights />
      </div>

      <div className="relative container mx-auto px-4 mt-2 z-20">
        <AnimatePresence>
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              {t('services.title')}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
            />

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } text-lg max-w-2xl mx-auto`}>
              {t('services.subtitle')}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service, index) => (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`relative rounded-xl backdrop-blur-lg border ${isDarkMode ? 'border-white' : 'border-blue-600/70'
                } group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform-gpu will-change-transform hover:-translate-y-1`}
              key={service.id}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode
                ? ' from-blue-500/20  to-indigo-400/20 to-blue-500/20'
                : 'from-blue-300/30 via-sky-400/20 to-indigo-300/20'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              <Link
                to={"#"}
                // onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="relative z-10 block"
              >
                <div className="mb-4 flex justify-center">
                  {/* <ServiceIcon Icon={Icon} isDarkMode={isDarkMode} /> */}
                  <img src={service.image ? service.image : defaultImage} alt={service.title} className="w-full aspect-[2/1] rounded-xl object-cover" />
                </div>


                <div className="p-6 ">
                  <h3 className={`text-2xl text-center font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-sky-400' : 'from-blue-600 to-sky-600'
                    } transition-all duration-500`}>
                    {service.title}
                  </h3>

                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } leading-relaxed text-center transition-colors duration-500`}>
                    {
                      parse(service.description)
                    }
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="#"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r  from-blue-500  to-blue-700   text-white rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span className="text-lg font-medium">{t('services.viewAllServices')}</span>
            <ExternalLink size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);
