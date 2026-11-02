/* =====================================================================
   CONTENT — 个人信息、信息页内容、界面文字
   需要更新简历内容、联系方式时编辑此文件。
   ===================================================================== */

window.PROFILE = {
  name: "Shenhe Zhang",
  nickname: "Jake",
  // 头像：把你的照片放到 assets/avatar.jpg（建议竖图、背景干净、光线均匀）。
  // 首页会把它转成浅米色底、橙色网点（半色调）的印刷风格，鼠标移上去网点会变成更深的橙色。没有照片时显示占位剪影。
  avatar: "assets/avatar.jpg",
  // 信息页照片：assets/portrait-selfie.jpg 由自拍照转成的暖调黑白肖像（裁成 4:5，背景虚化并提亮，
  // 轻微柔肤，五官未作改动）。生成脚本在 tools/stylize_portrait.py。
  // 想换回之前的证件照，把下面改成 "assets/portrait.jpg" 即可。
  photo: "assets/portrait-selfie.jpg",
  // 首页头像后方叠放的作品（填项目 id，最多 4 个）。留空 [] 则自动取作品列表前 4 个。
  heroProjects: [],
  role: { en: "UX Engineer & Interface Designer", zh: "用户体验工程师 · 界面设计师" },
  location: { en: "London, UK", zh: "英国 伦敦" },
  email: "shenhezhang12@163.com",
  phone: "+44 7887 331317",
  links: [
    // 填好链接后它们会显示在信息页与页脚；url 为空则不显示。
    { label: "LinkedIn", url: "" },
    { label: "Behance", url: "" }
  ],
  cv: "assets/Shenhe_Zhang_CV.pdf",   // 放入 PDF 简历后，信息页会出现“下载简历”按钮
  cvAvailable: false,                // 放好 PDF 后改为 true

  heroLead: {
    en: "Making technology easier to live with.",
    zh: "让技术更容易与人相处。"
  },
  heroBody: {
    en: "I'm studying UX Engineering at Goldsmiths after a degree in industrial design and a stint designing UI for medical devices. Right now I'm researching how people and AI could work together better.",
    zh: "我在伦敦大学金史密斯学院攻读用户体验工程硕士，本科学习工业设计，之后从事医疗器械界面设计。现在的研究方向是：如何让人与 AI 更好地协作。"
  },
  facts: [
    { label: { en: "Now", zh: "现在" }, value: { en: "MSc User Experience Engineering, Goldsmiths", zh: "金史密斯学院 用户体验工程硕士" } },
    { label: { en: "Previously", zh: "此前" }, value: { en: "UI Designer, Bestec medical design consultancy", zh: "Bestec 医疗产品设计咨询 UI 设计师" } },
    { label: { en: "Trained in", zh: "本科" }, value: { en: "Industrial Design, XJTLU & University of Liverpool", zh: "工业设计，西交利物浦大学 / 利物浦大学" } }
  ]
};

window.ABOUT = {
  statement: {
    en: "From physical products to screens to conversations with AI, the place where people meet technology keeps moving. I want to make each new point of contact feel more natural and more trustworthy.",
    zh: "从实体产品到屏幕，再到与 AI 的对话，人与技术相遇的地方一直在变。我希望在每一个新的接触点上，都把体验设计得更自然、更可信。"
  },
  education: [
    { years: "2026 – 2027",
      place: { en: "Goldsmiths, University of London", zh: "伦敦大学金史密斯学院" },
      title: { en: "MSc User Experience Engineering (in progress)", zh: "用户体验工程 硕士（在读）" },
      note: { en: "UX Research Methods · Interaction Science · Human Factors · Computing the User Experience · UX and the Web · Low Code for UX",
              zh: "用户体验研究方法 · 交互科学 · 人因工程 · 用户体验计算 · UX 与 Web · 低代码 UX" } },
    { years: "2021 – 2025",
      place: { en: "Xi'an Jiaotong-Liverpool University & University of Liverpool", zh: "西交利物浦大学 & 利物浦大学" },
      title: { en: "BEng (Hons) Industrial Design", zh: "工业设计 工学学士（荣誉）" } }
  ],
  experience: [
    { years: "2026 –",
      place: { en: "Goldsmiths, University of London", zh: "伦敦大学金史密斯学院" },
      title: { en: "MSc research — Rethinking human–AI interaction: conversational overlap, direct manipulation and source transparency", zh: "硕士研究 — 重新设计人与 AI 的交互：交流重叠、直接操作与来源透明" } },
    { years: "2025 – 2026",
      place: { en: "Bestec — Medical Product Design Consultancy, Suzhou", zh: "Bestec 医疗产品设计咨询，苏州" },
      title: { en: "UI Designer — surgical imaging system; ablation device", zh: "UI 设计师 — 外科内窥镜成像系统；消融设备" } },
    { years: "2024",
      place: { en: "XJTLU group study", zh: "西交利物浦大学 小组调研" },
      title: { en: "Survey of transport systems in co-operative communities — project lead", zh: "合作社区交通系统调研 — 项目统筹" } }
  ],
  skills: [
    { group: { en: "UX", zh: "体验设计" },
      items: { en: ["User research", "Usability testing", "Interaction design", "Wireframing & prototyping", "Design systems", "Icon design", "Developer handoff"],
               zh: ["用户研究", "可用性测试", "交互设计", "线框与原型", "设计系统", "图标设计", "开发交付"] } },
    { group: { en: "Tools", zh: "工具" },
      items: ["Figma", "Rhino", "Blender", "Photoshop", "Illustrator", "InDesign", "After Effects"] },
    { group: { en: "Languages", zh: "语言" },
      items: { en: ["Chinese", "English"], zh: ["中文", "英语"] } }
  ],
  // “兴趣”栏目已隐藏。想恢复时，把下面改回 { en: "...", zh: "..." } 即可，例如：
  // { en: "Sketching, photography, city walks, reading, tennis.", zh: "速写、摄影、城市漫步、阅读、网球。" }
  interests: null
};

window.CATEGORIES = {
  ui: { en: "UI design", zh: "界面设计" },
  research: { en: "UX research", zh: "体验研究" },
  product: { en: "Product design", zh: "产品设计" },
  interaction: { en: "Interaction design", zh: "交互设计" },
  service: { en: "Service design", zh: "服务设计" },
  speculative: { en: "Speculative design", zh: "思辨设计" }
};

window.UI = {
  navHome: { en: "Home", zh: "首页" },
  navWork: { en: "Work", zh: "作品" },
  navAbout: { en: "About", zh: "信息" },
  contact: { en: "Get in touch", zh: "联系我" },
  navContact: { en: "Get in touch", zh: "联系我" },
  inProgress: { en: "In progress", zh: "进行中" },
  noResults: { en: "Nothing in this category yet.", zh: "这个分类下暂时没有作品。" },
  pageOf: { en: "Page", zh: "第" },
  prevPage: { en: "Previous projects", zh: "上一组作品" },
  nextPage: { en: "More projects", zh: "下一组作品" },
  viewWork: { en: "View work", zh: "浏览作品" },
  aboutMe: { en: "About me", zh: "关于我" },
  selected: { en: "Selected work", zh: "精选作品" },
  allWork: { en: "All work", zh: "全部作品" },
  workTitle: { en: "Work", zh: "作品" },
  workIntro: {
    en: "Commercial interfaces for medical devices, my current research into human–AI interaction, and the university projects that came before.",
    zh: "医疗设备的商业界面项目、我正在进行的人与 AI 交互研究，以及更早的大学作品。"
  },
  all: { en: "All", zh: "全部" },
  projects: { en: "projects", zh: "个项目" },
  plate: { en: "Pl.", zh: "图版" },
  draft: { en: "Draft", zh: "草稿" },
  role: { en: "Role", zh: "角色" },
  timeline: { en: "Timeline", zh: "时间" },
  team: { en: "Team", zh: "团队" },
  tools: { en: "Tools & methods", zh: "工具与方法" },
  context: { en: "Context", zh: "背景" },
  back: { en: "All work", zh: "全部作品" },
  next: { en: "Next project", zh: "下一个项目" },
  prev: { en: "Previous", zh: "上一个" },
  imagePlaceholder: { en: "Image to come", zh: "图片待补充" },
  nda: { en: "NDA", zh: "保密" },
  researchTag: { en: "Research", zh: "研究" },
  currentResearch: { en: "Current research", zh: "正在进行的研究" },
  readResearch: { en: "Read about the research", zh: "了解这项研究" },
  ndaNote: { en: "Commercial project under NDA. Client names are withheld and brand marks are blurred.", zh: "商业项目，受保密协议约束：已隐去客户名称，并模糊处理品牌标识。" },
  loadPrototype: { en: "Load prototype", zh: "加载原型" },
  openFigma: { en: "Open in Figma", zh: "在 Figma 中打开" },
  prototypeHint: { en: "Click inside the prototype to interact. Loads from figma.com.", zh: "在原型内点击即可交互。内容从 figma.com 加载。" },
  screenOf: { en: "of", zh: "/" },
  notFound: { en: "This project doesn't exist or has been hidden.", zh: "该项目不存在或已隐藏。" },
  aboutTitle: { en: "About", zh: "信息" },
  education: { en: "Education", zh: "教育背景" },
  experience: { en: "Experience", zh: "经历" },
  skills: { en: "Skills", zh: "技能" },
  interests: { en: "Outside work", zh: "兴趣" },
  letsTalk: { en: "Let's talk.", zh: "聊聊吧。" },
  contactBody: {
    en: "I'm open to UX and interface design roles, internships and collaborations in London. The quickest way to reach me is email.",
    zh: "我正在寻找伦敦的 UX / 界面设计职位、实习与合作机会。最快的联系方式是邮件。"
  },
  email: { en: "Email", zh: "邮箱" },
  phone: { en: "Phone", zh: "电话" },
  based: { en: "Based in", zh: "所在地" },
  copy: { en: "Copy", zh: "复制" },
  copied: { en: "Copied", zh: "已复制" },
  downloadCv: { en: "Download CV", zh: "下载简历" },
  viewProject: { en: "View project", zh: "查看项目" },
  bringForward: { en: "Bring forward", zh: "移到前面" },
  nextPlate: { en: "Next plate", zh: "下一张" },
  figCaption: { en: "Fig. 1 — The designer, in halftone. Click a plate behind to bring it forward.", zh: "图 1 — 设计师肖像（网点印刷）。点击后方的图版可将其移到前面。" },
  footerNote: { en: "Designed and built by Shenhe Zhang.", zh: "由 Shenhe Zhang 设计与搭建。" }
};
