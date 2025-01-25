export const blogCategories = [
    { id: 'programming', name: 'البرمجة والتطوير' },
    { id: 'design', name: 'التصميم والواجهات' },
    { id: 'marketing', name: 'التسويق الرقمي' },
    { id: 'business', name: 'حلول الأعمال' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'tutorials', name: 'الدروس التعليمية' }
  ];
  
  export const blogTags = [
    'تطوير الويب',
    'تطبيقات الموبايل',
    'تجربة المستخدم',
    'التسويق الإلكتروني',
    'الأعمال الرقمية',
    'برمجة',
    'تصميم',
    'ذكاء اصطناعي',
    'SEO',
    'استراتيجيات رقمية'
  ];
  
  export const articles = [
    {
      id: 1,
      title: "كيف تبني هوية رقمية قوية لشركتك؟",
      excerpt: "دليل شامل لبناء هوية رقمية مميزة تساعد شركتك على النمو في العالم الرقمي...",
      date: "2024-01-15",
      category: "marketing",
      tags: ["التسويق الإلكتروني", "الأعمال الرقمية"],
      thumbnail: "/assets/19790.jpg",
      slug: "building-strong-digital-identity"
    },
    {
      id: 2,
      title: "أحدث تقنيات الذكاء الاصطناعي في تطوير الأعمال",
      excerpt: "استكشف كيف يمكن للذكاء الاصطناعي تحسين كفاءة عملك وزيادة الإنتاجية...",
      date: "2024-01-12",
      category: "ai",
      tags: ["ذكاء اصطناعي", "تطوير الأعمال"],
      thumbnail: "/assets/ai-generated-9091887_640.jpg",
      slug: "ai-in-business-development"
    },
    {
      id: 3,
      title: "تصميم واجهات المستخدم المتجاوبة",
      excerpt: "دليل شامل لتصميم واجهات مستخدم جذابة وسهلة الاستخدام لمختلف الأجهزة...",
      date: "2024-01-10",
      category: "design",
      tags: ["تصميم", "تجربة المستخدم"],
      thumbnail: "/assets/16678925_5726840.jpg",
      slug: "responsive-ui-design"
    },
  ];
  
  export const featuredArticles = articles.slice(0,6);
  