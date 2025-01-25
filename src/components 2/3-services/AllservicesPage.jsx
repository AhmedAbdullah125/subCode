import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Target } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie-player';
import devAnimation from "../../animation/dev.json";
import marketingAnimation from "../../animation/MarketingLottie.json";


const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, .5]);


  return (
    <motion.div 
      style={{ y, opacity }}
      className="relative h-[60vh] mt-20 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black/95 z-10" />
      <div className="absolute inset-0 bg-[url('/Public/assets/h2.jpg')] bg-cover bg-center" />
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          {t('Transform Your Digital Presence')}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          {t('Innovative solutions tailored to elevate your business in the digital landscape')}
        </motion.p>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }) => {
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="group mb-20"
    >
      <div className={`${service.backgroundClass} backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500`}>
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          {/* Animation Section */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Lottie
                loop
                animationData={service.animation}
                play
                style={{ width: '100%', height: '100%' }}
                className="object-contain"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? 'from-transparent via-transparent to-black/40' : 'from-black/40 via-transparent to-transparent'}`} />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-16 relative z-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 transform group-hover:scale-110 transition-transform duration-300"
            >
              {service.icon}
            </motion.div>

            <h3 className="text-4xl font-bold text-white mb-6">
              {t(service.title)}
            </h3>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t(service.description)}
            </p>

            {/* Features Grid */}
            {service.features && service.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">
                  {t('Key Features')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-gray-300">{t(feature)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies/Metrics */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">
                {service.technologies ? t('Technologies') : t('Key Metrics')}
              </h4>
              <div className="flex flex-wrap gap-3">
                {(service.technologies || service.metrics || []).map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-full text-white text-sm ${service.iconColor.replace('text', 'bg')}/10 border border-white/10`}
                  >
                    {t(item)}
                  </span>
                ))}
              </div>
            </div>

            <motion.button 
              className={`inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 text-lg ${service.iconColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('Explore Service')}
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    backgroundClass: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    animation: PropTypes.object.isRequired,
    features: PropTypes.array, 
    technologies: PropTypes.array, 
    metrics: PropTypes.array,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const ServiceSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: 'webDevTitle',
      description: 'webDevDescription',
      features: ['Custom Web Development', 'Responsive Design', 'E-commerce Solutions', 'CMS Integration'],
      technologies: ['React', 'Node.js', 'Next.js', 'MongoDB'],
      animation: devAnimation,
      icon: <Code className="w-14 h-14 text-blue-400" />,
      backgroundClass: 'bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30',
      iconColor: 'text-blue-400'
    },
    {
      title: 'marketingTitle',
      description: 'marketingDescription',
      features: ['Digital Strategy', 'Social Media Marketing', 'SEO Optimization', 'Content Marketing'],
      metrics: ['Increased Traffic', 'Higher Conversion', 'Brand Awareness', 'ROI Tracking'],
      animation: marketingAnimation,
      icon: <Target className="w-14 h-14 text-pink-400" />,
      backgroundClass: 'bg-gradient-to-br from-pink-900/30 via-red-900/30 to-orange-900/30',
      iconColor: 'text-pink-400'
    }
  ];

  return (
    <div className="py-6 relative w-full min-h-screen bg-gray-900 overflow-hidden">
      {/* المحتوى */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white">{t('Our Services')}</h2>
          <p className="mt-4 text-xl text-gray-300">{t('Explore the range of services we offer to help your business grow.')}</p>
        </div>
        <div className="space-y-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AllServicesPage = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
    </>
  );
};

export default AllServicesPage;
