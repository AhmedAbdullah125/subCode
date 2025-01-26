import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
// import { articles } from './BlogData';
import ArticleCard from './ArticleCard';
import axios from 'axios';
import { API_BASE_URL } from '../../../src/apiConfig';
import parse from 'html-react-parser';

const BlogDetail = () => {
  const { slug } = useParams();
  console.log(slug);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';



  if (!article) return null;

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = isRTL ? article.title : article.title;
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    window.open(shareUrls[platform], '_blank');
  };

  const handleBookmark = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const newBookmarks = isBookmarked
      ? savedBookmarks.filter(s => s !== slug)
      : [...savedBookmarks, slug];

    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    localStorage.setItem(`likes_${slug}`, JSON.stringify(newLikes));
    setLikes(newLikes);
  };



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/post/${slug}`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setArticle(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  console.log(article);



  return (
    <>
      {
        loading ? "loading..." :
          <div className={`min-h-screen font-cairo ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            <motion.div className="relative h-[70vh] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-black/40'}`} />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6"> {article.title} </h1>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/*   <div className={`lg:col-span-3 ${isRTL ? 'order-2' : 'order-1'} lg:order-1`}>
          <div className="sticky top-24 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={article.author.avatar}
                  alt={isRTL ? article.author.name : article.author.nameEn}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">
                    {isRTL ? article.author.name : article.author.nameEn}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isRTL ? article.author.role : article.author.roleEn}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {isRTL ? article.author.bio : article.author.bioEn}
              </p>
              <div className="flex gap-4">
                {Object.entries(article.author.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                    {platform === 'facebook' && <Facebook className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}
            >
              <h3 className="font-bold mb-4">{t('shareArticle')}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full bg-[#1DA1F2] text-white hover:scale-110 transition-transform"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-full bg-[#4267B2] text-white hover:scale-110 transition-transform"
                >
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div> */}

                <motion.article
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`lg:col-span-12 ${isRTL ? 'order-1' : 'order-2'} lg:order-2`}
                >
                  <h2 className='text-3xl font-bold mb-6'>{article.title}</h2>
                  <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                    {article.description)}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-4 py-2 rounded-full text-sm
                  ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-8 py-4 border-t border-gray-200 dark:border-gray-800">
                    {/* <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{likes}</span>
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 ${
                  isBookmarked ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                <span>{isBookmarked ? t('saved') : t('saveArticle')}</span>
              </button>
            </div> */}
                    <div className="flex items-center justify-center gap-6 text-white/90">

                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {isRTL ? "مدة القراءة" : "Reading Time"} {article.timeReading} {isRTL ? "دقيقة" : "minutes"}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {isRTL ? "عدد المشاهدات" : "views"} {article.view}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </div>

              {/* {relatedArticles.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">{t('relatedArticles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                {...article}
                index={index}
                currentLang={i18n.language}
              />
            ))}
          </div>
        </div>
      )} */}
            </div>
          </div>
      }
    </>

  );
};

export default BlogDetail;
