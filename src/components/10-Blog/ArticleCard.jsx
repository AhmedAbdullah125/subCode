import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import PropTypes from 'prop-types';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const ArticleCard =({ 
  title, 
  excerpt, 
  date, 
  slug, 
  thumbnail, 
  index, 
  category 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === 'rtl';


  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative p-6 rounded-xl backdrop-blur-xl border font-cairo
        ${isDarkMode ? 'border-blue-800/30' : 'border-blue-100/80'}
        overflow-hidden group 
        hover:shadow-2xl hover:shadow-blue-500/10 
        transition-all duration-300
        w-full h-[480px]
      `}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        className={`
          absolute inset-0 bg-gradient-to-br 
          ${isDarkMode 
            ? 'from-blue-900/20 via-blue-800/10 to-blue-700/20'
            : 'from-blue-100/40 via-blue-50/20 to-blue-100/40'
          } 
          blur-xl
        `}
      />

      <Link 
        to={`/blog/${slug}`} 
        className="relative z-10 block h-full flex flex-col"
      >
        <div className="relative mb-6 overflow-hidden rounded-xl group-hover:shadow-lg transition-shadow duration-300">
          <motion.img 
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
          
          <div className="absolute top-3 right-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                ${isDarkMode ? 'bg-blue-900/80' : 'bg-white/90'}
                backdrop-blur-sm shadow-lg
              `}
            >
              {category}
            </motion.span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-gray-600 dark:text-gray-400 text-sm">{date}</span>
        </div>

        <h3 className={`
          text-xl font-bold mb-3
          group-hover:text-transparent group-hover:bg-clip-text
          group-hover:bg-gradient-to-r from-blue-600 to-blue-400
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
          transition-all duration-300
          line-clamp-2
        `}>
          {title}
        </h3>

        <p className={`
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          leading-relaxed mb-4 line-clamp-3 flex-grow
        `}>
          {excerpt}
        </p>

        <motion.div 
          className="flex justify-center items-center bg-blue-300/20 p-2 rounded-xl text-sm font-medium mt-auto"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-blue-600  dark:text-blue-400">
            {t('readMore')}
          </span>
          <ArrowRight className={` ${isRTL ? 'text-blue-400 rotate-180' : 'text-blue-600'} w-4 h-4 mr-1 text-blue-600 dark:text-blue-400`} />
        </motion.div>
      </Link>
    </motion.article>
  );
};

ArticleCard.displayName = 'ArticleCard';

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default ArticleCard;
