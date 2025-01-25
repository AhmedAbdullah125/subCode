import { ArrowRight, Share2, ImageOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import CardSkeleton from './CardSkeleton';

const ArticleCard = ({ title, description, image, slug, tags, isLoading }) => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();

  if (isLoading) return <CardSkeleton />;
  const handleCardClick = () => navigate(`/blog?article=${slug}`);
  return (
    <Link to={`/blog/${slug}`}
      className={` relative p-4 rounded-2xl cursor-pointer ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-900/80 border border-gray-800/50' : 'bg-gradient-to-b from-white to-gray-50/90 border border-gray-100'}
        overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300  w-full h-[400px]`}>
      {/* Glass Effect Background */}
      <div className={` absolute inset-0  ${isDarkMode ? 'bg-gray-900/20' : 'bg-white/20'}  backdrop-blur-sm z-0`} />
      <div className="relative z-10 h-full flex flex-col rounded-xl bg-gray-900/95 border border-gray-800/50">
        {/* Image Container */}
        <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-900/95 ">
          <div className="relative aspect-[16/9]">
            <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <div className="flex gap-2">
              <button className={` p-2 rounded-lg backdrop-blur-sm shadow-lg ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/95'}  text-gray-500 hover:text-blue-500
                  hover:scale-110 transition-all duration-200 `} >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className={` text-lg font-bold mb-2.5 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors duration-200`}>{title}</h3>
          <p className={` text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-3`}> {description}</p>

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, i) => (
                <span key={i} className={`  text-[11px] px-2.5 py-1 rounded-lg ${isDarkMode
                  ? 'bg-gray-800/80 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}  transition-colors duration-200`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {/* Read More Button */}
          <div className="mt-auto">
            <span className={` inline-flex items-center gap-1.5 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}group-hover:gap-3 transition-all duration-300`}>
              {t('readMore')}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
