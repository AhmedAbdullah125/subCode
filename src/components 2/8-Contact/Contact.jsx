import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,

} from "lucide-react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext"; //
import CornerLights  from "../0-Background/CornerLights";

const Contact = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme(); // 
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    
    <section
      id="contact"
      className={`py-10 cairo relative bg-transparent overflow-hidden 
      }`}
    > 
    <div className="absolute inset-0 opacity-50 w-full h-full" style={{ contain: 'layout paint size', willChange: 'transform' }}>
    <CornerLights />
  </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("contact.title")}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p
            className={`text-gray-400 mt-4 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:w-[80%] m-auto  md:grid-cols-2 lg:grid-cols-3  gap-12 justify-center items-center">
          {/* */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <h3
              className={`text-2xl font-semibold text-center ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("contact.subtitle")}
            </h3>
            <div className="flex  items-center justify-center">
              <ul className="space-y-6 flex flex-col items-start ">
                <li className="flex items-center justify-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-indigo-500/20 text-indigo-500"
                    }`}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <a href="tel:+905528255694"
                    className={isDarkMode ? "text-gray-300 cursor-pointer" : "text-black-900 cursor-pointer"}
                  >
                    +90 552 825 56 94
                  </a>
                </li>
                <li className="flex items-center justify-center gap-4">
                  <div className={`p-3 rounded-full ${ isDarkMode ? "bg-yellow-500/20 text-yellow-500"  : "bg-orange-500/20 text-orange-500"  }`}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <a href="mailto:info@subcodeco.com" className={isDarkMode ? "text-gray-300 cursor-pointer" : "text-black-900 cursor-pointer" } >
                    info@subcodeco.com
                  </a>
                </li>
                <li className="flex items-center justify-center gap-4">
                  <div className={`p-3 rounded-full ${ isDarkMode ? "bg-cyan-500/20 text-cyan-500" : "bg-teal-500/20 text-teal-500"}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                 <div className="flex flex-col gap-3">
                 <span className={isDarkMode ? "text-gray-300" : "text-black-900"} > {t("contact.location")}  </span>
                 <span className={isDarkMode ? "text-gray-300" : "text-black-900"} > {t("contact.location2")}  </span>
                 </div>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              {[
                {
                  Icon: Facebook,
                  color: isDarkMode ? "text-blue-400" : "text-blue-400",
                  linkto:'https://www.facebook.com/subcodeco/'

                },
                {
                  Icon: Instagram,
                  color: isDarkMode ? "text-pink-500" : "text-pink-600",
                  linkto:'https://www.instagram.com/subcodeco/'
                },
                {
                  Icon: Linkedin,
                  color: isDarkMode ? "text-cyan-400" : "text-cyan-500",
                  linkto:"https://www.linkedin.com/in/subcode/"
                },
              ].map(({ Icon, color , linkto }, index) => (
                <a
                  key={index}
                  href={linkto}
                  className={`p-3 rounded-full bg-gray-800 ${color} transition-colors duration-300 cursor-pointer hover:bg-gray-700`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/*  */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-2  ${
              isDarkMode ? "bg-gray-950" : "bg-white"
            } p-6 rounded-xl border border-gray-800 shadow-lg   h-[500px] space-y-2`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*  */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.name")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={t("contact.namePlaceholder")}
                    className={`w-full bg-transparent text-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-500 focus:outline-none ${
                      isDarkMode
                        ? "border-gray-700 placeholder-gray-500"
                        : "border-gray-400 placeholder-gray-400"
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              {/*  */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.email")}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={t("contact.emailPlaceholder")}
                    className={`w-full bg-transparent text-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-500 focus:outline-none ${
                      isDarkMode
                        ? "border-gray-700 placeholder-gray-500"
                        : "border-gray-400 placeholder-gray-400"
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
            </div>

            {/* */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("contact.phone")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={t("contact.phonePlaceholder")}
                  className={`w-full bg-transparent text-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-500 focus:outline-none ${
                    isDarkMode
                      ? "border-gray-700 placeholder-gray-500"
                      : "border-gray-400 placeholder-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("contact.subject")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={t("contact.subjectPlaceholder")}
                  className={`w-full bg-transparent text-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-500 focus:outline-none ${
                    isDarkMode
                      ? "border-gray-700 placeholder-gray-500"
                      : "border-gray-400 placeholder-gray-400"
                  }`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fas fa-edit"></i>
                </span>
              </div>
            </div>

            {/* */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("contact.details")}
              </label>
              <textarea
                required
                rows="4"
                placeholder={t("contact.detailsPlaceholder")}
                className={`w-full bg-transparent text-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-500 focus:outline-none ${
                  isDarkMode
                    ? "border-gray-700 placeholder-gray-500"
                    : "border-gray-400 placeholder-gray-400"
                }`}
              ></textarea>
            </div>

            {/* */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-center font-medium transition ${
                isDarkMode
                  ? "bg-gray-950 text-white"
                  : " bg-gray-950 text-white"
              } hover:opacity-90`}
            >
              {t("contact.sendMessage")}
            </button>

            {/* */}
            {formStatus && (
              <p
                className={`text-center ${
                  formStatus === "success" ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {t(`contact.${formStatus}Message`)}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
