import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import ArticleCard from './ArticleCard';
import { articles, blogCategories, blogTags } from './BlogData';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import { data } from 'react-router-dom';

const BlogPage = () => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);


  const isRTL = i18n.language === 'ar';

  // const toggleTag = (tag) => {
  //   setSelectedTags(prev =>
  //     prev.includes(tag)
  //       ? prev.filter(t => t !== tag)
  //       : [...prev, tag]
  //   );
  // };

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/posts`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setBlogs(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if (selectedTags.length > 0) {
        const newFilteredBlogs = blogs.filter(blog =>
            selectedTags.some(tag => blog.tags.includes(tag))
        );
        setFilteredBlogs(newFilteredBlogs);
    } else {
        setFilteredBlogs(blogs);
    }
}, [selectedTags, blogs ,isLoading]); // Ensure to re-run when `blogs` changes

  console.log(selectedTags);
  console.log(filteredBlogs);
  
  const filteredArticles = articles.filter(article => {
    const title = i18n.language === 'ar' ? article.title : article.titleEn;
    const excerpt = i18n.language === 'ar' ? article.excerpt : article.excerptEn;

    const matchesSearch = (title + excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => article.tags[i18n.language].includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });
  let pagenatioArr = [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  let pages = Math.ceil(blogs.length / itemPerPage);
  let displayData = filteredBlogs.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
  for (let index = 1; index <= Math.ceil(filteredBlogs.length / itemPerPage) ; index++) {
    pagenatioArr.push(index);
  }
  function handleTagClick(tag) {
    const index = selectedTags.indexOf(tag);
    const newSelectedTags = [];
    if (index > -1) { // only splice array when item is found
      for (let i = 0; i < selectedTags.length; i++) {

        if (selectedTags[i] === tag) {

        }
        else {
          newSelectedTags.push(selectedTags[i]);
        }
      }
      setSelectedTags(newSelectedTags);
    }
    else {
      setSelectedTags([...selectedTags, tag]);
    }
  }


  return (
    <div className={`min-h-screen mt-20 font-cairo ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            {i18n.language === 'ar' ? 'مدونتنا' : 'Our Blog'}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p className={`text-center max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
            {i18n.language === 'ar'
              ? 'استكشف مقالاتنا في مجالات التكنولوجيا والأعمال والتطوير الرقمي'
              : 'Explore our articles in technology, business, and digital development'
            }
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pb-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <aside className={` lg:col-span-1 ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            <div className="sticky space-y-8">


              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {i18n.language === 'ar' ? 'الوسوم' : 'Tags'}
                  </h3>
                  {selectedTags.length > 0 && (
                    <button onClick={() => setSelectedTags([])} className="text-blue-500 hover:text-blue-600" >
                      {i18n.language === 'ar' ? 'مسح الكل' : 'Clear All'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {
                    blogs.map((blog, index) =>
                      blog?.tags.map((tag, index) => (
                        <motion.button
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            handleTagClick(tag);
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-800 hover:bg-gray-700'
                              : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                          {tag}
                        </motion.button>
                      ))
                    )
                  }
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayData.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  {...article}
                  index={index}
                  currentLang={i18n.language}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
        </div>
        <div className="flex items-center gap-2 mt-10 justify-center">
          {
            pagenatioArr.map((page, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setCurrentPage(page)
                }}
                className={`px-3 py-1 rounded-full text-sm ${currentPage === page
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                {page}
              </motion.button>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
