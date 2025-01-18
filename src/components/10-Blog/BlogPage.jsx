import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import ArticleCard from './ArticleCard';
import { articles, blogCategories, blogTags } from './BlogData';

const BlogPage = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={`min-h-screen mt-20 font-cairo ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative py-16"
        >
          <div className="container mx-auto  px-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-3xl font-bold text-center mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              مدونتنا
            </motion.h1>
            <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
            <p className={`text-center max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              استكشف مقالاتنا في مجالات التكنولوجيا والأعمال والتطوير الرقمي
            </p>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 pb-16">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar */}
            <aside className={`hidden lg:block lg:col-span-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <div className="sticky top-24 space-y-8">
                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-lg font-semibold mb-4">بحث</h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full p-2 pl-10 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-200'
                      }`}
                      placeholder="ابحث في المقالات..."
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-4">التصنيفات</h3>
                  <div className="space-y-2">
                    {blogCategories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`block w-full text-right px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-emerald-500 text-white'
                            : isDarkMode
                              ? 'hover:bg-gray-800'
                              : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-4">الوسوم</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogTags.map((tag, index) => (
                      <motion.button
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedTags.includes(tag)
                            ? 'bg-emerald-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-800 hover:bg-gray-700'
                              : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </aside>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} {...article} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
