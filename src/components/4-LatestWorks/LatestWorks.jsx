import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import ProjectCard from './ProjectCard';
import { projects } from './projectsData';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../src/apiConfig';
import axios from 'axios';

const LatestWorks = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/projects`
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
  console.log(data);


  return (
    <>
      {
        loading ? "loading..." :
          <section
            id="latestworks"
            className={`relative  cairo py-8 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div
                className={`absolute inset-0 bg-gradient-to-br  ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 opacity-50'
                  : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-70'}
          `}
              />
            </div>

            <div className="relative container mx-auto px-4">
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {t('works.title')}
                </motion.h2>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  transition={{ duration: 0.6 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } text-lg mb-8 max-w-2xl mx-auto`}
                >
                  {t('works.subtitle')}
                </motion.p>
              </div>

              {/* Projects Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
              >
                {data.slice(0, 6).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard {...project} currentLang={currentLang} />
                  </motion.div>
                ))}
              </motion.div>

              {/* View More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.a
                  href="/Gallery"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
              inline-flex items-center gap-2
              px-4 py-2 rounded-xl
              font-medium text-white
              bg-gradient-to-r from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              shadow-lg hover:shadow-blue-500/25
              transition-all duration-300
            `}
                >
                  <span className="text-lg">
                    {t('works.viewMore')}
                  </span>
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </section>
      }
    </>
  );
};

export default LatestWorks;
