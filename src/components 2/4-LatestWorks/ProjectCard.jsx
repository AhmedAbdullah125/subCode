import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[240px] bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
    <div className="p-6">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mx-auto" />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ 
  id, 
  title, 
  slug,
  name, 
  thumbnail, 
  tools, 
  currentLang 
}) => {
  const { isDarkMode } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const displayTitle =  title ;
  const displayDescription =  name ;
  const isArabic = currentLang === 'ar';

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = thumbnail;
    preloadImage.onload = () => setImageLoaded(true);
  }, [thumbnail]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -8, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.5 } },
    initial: { scale: 1 }
  };

  return (
    <motion.section 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative h-[480px] w-full
        rounded-xl overflow-hidden
        ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}
        backdrop-blur-sm
        shadow-lg hover:shadow-2xl
        transition-all duration-500
        border border-transparent
        ${isHovered 
          ? isDarkMode 
            ? 'border-blue-500/50' 
            : 'border-blue-400/50'
          : isDarkMode 
            ? 'border-white/10' 
            : 'border-gray-200'
        }
      `}
    >
      {!imageLoaded && <LoadingSkeleton />}

      <div className="relative h-[240px] w-full overflow-hidden">
        <motion.img
          variants={imageVariants}
          src={thumbnail}
          alt={displayTitle}
          className={`
            object-cover w-full h-full
            transition-opacity duration-500
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-0 right-0 px-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {tools.map((item,index) => (
              <span
                key={index}
                className={`
                  px-4 py-1.5 rounded-full
                  text-sm font-medium
                  backdrop-blur-md border
                  transition-all duration-300
                  ${isDarkMode
                    ? 'bg-black/50 text-blue-300 border-blue-500/30'
                    : 'bg-white/50 text-blue-600 border-blue-200'
                  }
                `}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-6 flex flex-col h-[240px] text-center">
        <motion.h3 
          className={`
            text-2xl font-bold mb-4
            ${isHovered ? 'text-transparent bg-clip-text' : ''}
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}
        >
          {displayTitle}
        </motion.h3>
        
        <p className={`
          mb-6 line-clamp-3 text-base mx-auto max-w-[90%]
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {displayDescription}
        </p>

        <div className="mt-auto flex justify-center">
          <Link
            to={`/project/${slug}`}
            className={`
              group
              inline-flex items-center gap-1
              px-4 py-2 rounded-xl
              font-medium text-white
              transition-all duration-500
              bg-gradient-to-r from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              transform hover:scale-105
              shadow-lg hover:shadow-blue-500/25
            `}
          >
            <span className="text-base">
              {isArabic ? "عرض التفاصيل" : "View Details"}
            </span>
            <Eye 
              size={20} 
              className={`transition-transform duration-300 
                ${isArabic 
                  ? 'group-hover:-translate-x-1' 
                  : 'group-hover:translate-x-1'
                }`}
            />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

// ProjectCard.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   titleEn: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   descriptionEn: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   tech: PropTypes.arrayOf(PropTypes.string).isRequired,
//   currentLang: PropTypes.string.isRequired
// };

export default ProjectCard;
