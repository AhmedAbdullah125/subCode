import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, Quote } from 'lucide-react';
import { useState } from 'react';

const TestimonialCard = ({ testimonial, isDarkMode, isRTL }) => {
  const [showFullText, setShowFullText] = useState(false);

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className={`relative w-full max-w-4xl mx-auto min-h-[350px] cairo rounded-3xl overflow-hidden
        ${isDarkMode ? 'bg-gradient-to-br from-blue-950/90 to-gray-900/95' : 'bg-gradient-to-br from-white via-blue-50/50 to-blue-50/90'} 
        shadow-2xl border
        ${isDarkMode ? 'border-blue-900/30' : 'border-blue-100'}
        transition-colors duration-300`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl" />
      </div>

      {/* Quote Icons */}
      <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'}`}>
        <Quote 
          size={32} 
          className={`opacity-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
        />
      </div>
      <div className={`absolute bottom-20 ${isRTL ? 'left-6' : 'right-6'}`}>
        <Quote 
          size={32} 
          className={`opacity-20 rotate-180 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
        />
      </div>

      <div className="relative p-6 sm:p-8 h-full flex flex-col gap-2">
        {/* Header Section */}
        <div className={`flex items-start gap-4 sm:gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <motion.div 
            className="relative group shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`absolute inset-0 blur-xl rounded-2xl 
              ${isDarkMode ? 'bg-blue-500/30' : 'bg-blue-300/30'} 
              group-hover:blur-2xl transition-all duration-300`} 
            />
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-lg
                border-2 group-hover:border-4 transition-all duration-300
                border-blue-500/30 hover:shadow-blue-500/20"
            />
          </motion.div>

          <div className={`flex flex-col gap-2 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <h3 className={`text-xl sm:text-2xl font-bold 
              ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              {testimonial.name}
            </h3>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {testimonial.role}
            </p>
            <motion.div 
              className={`flex gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1 }
                  }}
                >
                  <Star
                    size={14}
                    className={`transition-colors duration-200 ${
                      i < testimonial.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Quote Content */}
        <AnimatePresence mode="wait">
          <motion.blockquote 
            className="flex-grow relative px-8"
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={`direction-${isRTL ? 'rtl' : 'ltr'}`}>
              <p className={`text-base leading-relaxed text-justify
                ${!showFullText ? 'line-clamp-3' : ''} 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {testimonial.text}
                {!showFullText && testimonial.text.length > 150 && (
                  <button
                    onClick={() => setShowFullText(true)}
                    className={`inline-block ${isRTL ? 'mr-1' : 'ml-1'} text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} 
                      hover:underline focus:outline-none`}
                  >
                    {isRTL ? 'اقرأ المزيد...' : '...Read more'}
                  </button>
                )}
              </p>

              {showFullText && (
                <button
                  onClick={() => setShowFullText(false)}
                  className={`block mt-2 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} 
                    hover:underline focus:outline-none ${isRTL ? 'float-right' : 'float-left'}`}
                >
                  {isRTL ? 'عرض أقل' : 'Read less'}
                </button>
              )}
            </div>
          </motion.blockquote>
        </AnimatePresence>

        {/* Footer Section */}
        <div className={`flex items-center justify-between pt-4
          border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <MapPin size={14} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
            <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {testimonial.location}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Calendar size={14} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
            <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {testimonial.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  isDarkMode: PropTypes.bool,
  isRTL: PropTypes.bool
};

TestimonialCard.defaultProps = {
  isDarkMode: false,
  isRTL: false
};

export default TestimonialCard;
