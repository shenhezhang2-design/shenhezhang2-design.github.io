/* =====================================================================
   PROJECTS — 作品数据（唯一需要编辑的文件）
   ---------------------------------------------------------------------
   • 排序：数组顺序 = 网站上的显示顺序。调整顺序只需剪切/粘贴整个 { ... } 块。
   • 新增：复制任意一个 { ... } 块，改 id（只用小写英文、数字、连字符）和内容即可。
   • 隐藏：hidden: true。  占位：draft: true（卡片显示 “Draft”）。
   • 商业保密：nda: true（卡片与详情页显示 NDA 标记与说明）。
   • 文本字段可写成 { en: "...", zh: "..." }；只写一个字符串则两种语言共用。
   • 封面：cover 指向 assets/ 下的图片，建议 4:5 竖图。
   • 详情页正文 blocks 支持的类型：
       text     { heading, body }                         body 中空一行 = 新段落
       list     { heading, items: [...] }
       facts    { items: [{ value, label }] }             关键数据（只放真实数据）
       image    { src, caption, ratio, frame }            frame: "device" 加设备边框；不写 src 显示占位框
       gallery  { items: [{ src, caption }], frame, cols }
       viewer   { heading, body, theme, tabs: [{ label, screens: [{ src, caption }] }] }
                可点击切换的界面浏览器（替代长截图墙）
       steps    { heading, body, items: [{ src, label, caption }], theme }   按顺序排列的流程/迭代
       split    { heading, body, src, caption, reverse, theme }             图文左右排版
       swatches { heading, body, items: [{ hex, name }] }                   设计系统色板
       prototype{ heading, body, embed, link, poster }                      Figma 原型（点击后加载）
       quote    { body, cite }
   ===================================================================== */

window.PROJECTS = [
  /* ------------------------------------------------------------------ 1 · Commercial */
  {
    id: "surgical-imaging",
    pageTheme: "night",      // 详情页配色：night / graphite / duck / moth，不写则为默认米白
    tone: "dark",            // 封面是深色时设为 dark，悬停弹出的介绍会使用深色底
    category: "ui",
    nda: true,
    year: "2025–26",
    cover: "assets/work/imaging/cover.jpg",   // 卡片封面 4:3
    plate: "assets/work/imaging/plate.jpg",   // 首页图版堆叠用 4:5（可选，不写则用 cover）
    hero: "assets/work/imaging/hero.jpg",          // 详情页顶部宽图（可选，不写则用 cover）
    title: { en: "Surgical Imaging System", zh: "外科内窥镜成像系统" },
    teaser: { en: "Touchscreen UI for an endoscopic camera and its fluorescence light source.", zh: "内窥镜摄像主机与荧光光源的触控界面。" },   // 悬停弹出的一句话简介
    client: { en: "Global medical technology company · via Bestec", zh: "国际医疗器械企业 · Bestec 设计咨询" },
    summary: {
      en: "Touchscreen interfaces for an endoscopic camera host and its fluorescence light source: product mark, icon set, mode system and the settings architecture, refined alongside embedded engineers.",
      zh: "为内窥镜摄像主机及其荧光光源设计触控界面：产品标识、图标集、模式体系与设置架构，并与嵌入式工程师协作完成落地与迭代。"
    },
    meta: {
      role: { en: "UI Designer — logo, icon set, interaction screens", zh: "UI 设计师 — Logo、图标集、交互界面" },
      timeline: { en: "Jul 2025 – Mar 2026", zh: "2025.07 – 2026.03" },
      team: { en: "Bestec design team, client engineering team", zh: "Bestec 设计团队、客户工程团队" },
      tools: "Figma, Illustrator"
    },
    blocks: [
      { type: "facts", items: [
        { value: "2", label: { en: "Devices: camera host and light source", zh: "台设备：摄像主机与光源" } },
        { value: "9", label: { en: "Specialty presets, from arthroscopy to microscopy", zh: "个科室预设，从关节镜到显微镜" } },
        { value: "4", label: { en: "Imaging modes: three fluorescence views and white light", zh: "种成像模式：三种荧光视图与白光" } },
        { value: "800×480", label: { en: "Front-panel touchscreen on each device", zh: "每台设备前面板的触控屏分辨率" } }
      ] },
      { type: "text",
        heading: { en: "Context", zh: "项目背景" },
        body: {
          en: "Fluorescence imaging lets surgeons see blood flow and tissue that are invisible under normal light. The camera host and the light source each have a small touchscreen on the front panel. They are set up by nurses before surgery and adjusted mid-procedure, often with gloved hands, from a distance, and while attention is on the monitor.\n\nI joined to design the full interface: a product mark, an icon set, and every screen across both devices.",
          zh: "荧光成像能让医生在手术中看到普通光线下不可见的血流与组织。摄像主机与光源的前面板各有一块小触控屏：术前由护士设置，术中随时调整，操作者常戴着手套、隔着一段距离，而注意力仍在监视器上。\n\n我参与设计完整的界面：产品标识、图标集，以及两台设备上的全部页面。"
        } },
      { type: "viewer",
        heading: { en: "The interface", zh: "界面浏览" },
        body: {
          en: "One home screen per specialty. The mode selector stays in the same place on every screen, and the segmented bar under it shows where you are among the nine presets.",
          zh: "每个科室对应一个主页。模式选择器在所有页面保持同一位置，下方的分段条提示当前处于九个预设中的哪一个。"
        },
        theme: "dark",
        tabs: [
          { label: { en: "Home", zh: "主页" }, screens: [
            { src: "assets/work/imaging/home-arthroscopy.png", caption: { en: "Arthroscopy preset, ready for white balance", zh: "关节镜预设，等待白平衡" } },
            { src: "assets/work/imaging/home-recording.png", caption: { en: "White balance done, storage detected and ready to record", zh: "白平衡完成，已识别存储设备，可录制" } },
            { src: "assets/work/imaging/home-wb-failed.png", caption: { en: "White balance failed: the button keeps its place and turns red", zh: "白平衡失败：按钮位置不变，以红色描边提示" } }
          ] },
          { label: { en: "Fluorescence", zh: "荧光模式" }, screens: [
            { src: "assets/work/imaging/fluo-overlay.png", caption: { en: "Overlay view", zh: "叠加视图" } },
            { src: "assets/work/imaging/fluo-env.png", caption: { en: "ENV view, with the active adjustment group outlined", zh: "ENV 视图，当前调节组以描边高亮" } },
            { src: "assets/work/imaging/fluo-white.png", caption: { en: "White light: controls that don't apply are removed, not greyed out", zh: "白光模式：不适用的控件直接移除，而不是置灰" } }
          ] },
          { label: { en: "Settings", zh: "设置" }, screens: [
            { src: "assets/work/imaging/settings.png", caption: { en: "Image settings", zh: "图像设置" } },
            { src: "assets/work/imaging/advanced.png", caption: { en: "Advanced settings hub", zh: "高级设置入口" } },
            { src: "assets/work/imaging/button-config.png", caption: { en: "Camera-head buttons: short and long press per preset", zh: "摄像头按键：按预设分别配置短按与长按" } },
            { src: "assets/work/imaging/button-assign.png", caption: { en: "Assigning a function to the right button", zh: "为右键分配功能" } },
            { src: "assets/work/imaging/advanced-camera.png", caption: { en: "Advanced camera parameters", zh: "高级摄像参数" } },
            { src: "assets/work/imaging/recorder.png", caption: { en: "4K recorder", zh: "4K 录制" } },
            { src: "assets/work/imaging/dark-area.png", caption: { en: "Advanced function: dark area correction", zh: "高级功能：暗区校正" } },
            { src: "assets/work/imaging/reset-dialog.png", caption: { en: "Factory reset asks for confirmation", zh: "恢复出厂设置需二次确认" } }
          ] }
        ] },
      { type: "list",
        heading: { en: "Design decisions", zh: "设计决策" },
        items: [
          { en: "High-contrast dark UI so the panel doesn't glare in a dimmed operating room.", zh: "高对比深色界面，避免在调暗的手术室中产生眩光。" },
          { en: "Steppers with large +/– targets rather than sliders, for gloved hands.", zh: "使用带大尺寸 +/– 按键的步进器而非滑块，方便戴手套操作。" },
          { en: "One blue for 'on' and 'selected' across both devices; red only for failures.", zh: "两台设备统一用蓝色表示“开启/选中”，红色只用于失败状态。" },
          { en: "Designed in Chinese and English: the same layouts hold both languages.", zh: "中英双语设计：同一套布局同时容纳两种语言。" }
        ] },
      { type: "steps",
        heading: { en: "Light source: three rounds", zh: "光源界面：三轮迭代" },
        body: {
          en: "The light source has one job: on/off and intensity. Each round removed something that was competing with it.",
          zh: "光源界面只有一个核心任务：开关与强度调节。每一轮迭代都在去掉与之争夺注意力的元素。"
        },
        theme: "dark",
        items: [
          { src: "assets/work/imaging/light-v1.png", label: "v1", caption: { en: "Narrow side bar, the brand mark set like a button", zh: "窄侧栏，品牌标识像按钮一样放置" } },
          { src: "assets/work/imaging/light-v2.png", label: "v2", caption: { en: "Wider rail and bigger icons; the mark gets its own space", zh: "侧栏加宽、图标放大；标识独立出来" } },
          { src: "assets/work/imaging/light-v3-on.png", label: { en: "Final", zh: "终版" }, caption: { en: "Borders removed, one frame groups the intensity control", zh: "去掉多余边框，用一个整体框架收纳强度控件" } }
        ] },
      { type: "split",
        heading: { en: "Icons and components", zh: "图标与组件" },
        body: {
          en: "I drew the icon set and built the shared parts as components so both devices stay consistent: storage status, the camera-head button map in its default and assigned states, short- and long-press tabs, and the function chips used to assign each button.",
          zh: "我绘制了图标集，并把通用部分做成组件，保证两台设备的一致性：存储状态、摄像头按键映射的默认与已分配状态、短按/长按标签页，以及为按键分配功能的功能选项。"
        },
        src: "assets/work/imaging/components.png",
        caption: { en: "Component sheet: storage status, button map, press tabs and function chips (default and selected)", zh: "组件表：存储状态、按键映射、按压方式标签与功能选项（默认 / 选中）" },
        theme: "ink" },      // 透明背景的组件图放在黑色底板上，与界面一致
      { type: "split",
        reverse: true,
        heading: { en: "Handoff to embedded engineers", zh: "与嵌入式工程师交付" },
        body: {
          en: "The engineers placed every control by pixel coordinates, so I annotated each one with its name and bounding box. I stayed on through implementation and led the later UI refinements.",
          zh: "工程师按像素坐标放置每个控件，因此我为每个控件标注了名称与边界坐标，并在开发阶段持续跟进、主导后期的 UI 优化。"
        },
        src: "assets/work/imaging/spec-settings.png",
        caption: { en: "Annotated settings screen with control IDs and bounding boxes", zh: "带控件 ID 与边界坐标的标注页" },
        theme: "dark" },
      { type: "text",
        heading: { en: "What I learned", zh: "收获" },
        body: {
          en: "Designing for a device meant designing for its constraints too: a fixed resolution, controls placed by coordinates, and users who look at the screen for a second at a time.",
          zh: "为设备做设计，也意味着为它的约束做设计：固定的分辨率、按坐标放置的控件，以及每次只看屏幕一眼的使用者。"
        } }
    ]
  },

  /* ------------------------------------------------------------------ 2 · Commercial */
  {
    id: "ablation-device",
    category: "ui",
    nda: true,
    year: "2025–26",
    cover: "assets/work/ablation/cover.jpg",
    plate: "assets/work/ablation/plate.jpg",
    hero: "assets/work/ablation/hero.jpg",
    title: { en: "Ablation Device Workflow", zh: "消融设备操作界面" },
    teaser: { en: "A guided setup-to-treatment workflow for a new bladder ablation system.", zh: "为全新膀胱消融系统设计的从安装到治疗的引导式流程。" },
    client: { en: "Medical device company, Suzhou · via Bestec", zh: "苏州医疗器械企业 · Bestec 设计咨询" },
    summary: {
      en: "A guided touchscreen workflow for a new bladder ablation system: setup, priming and needle test, pre-ablation and treatment. I built the design system and the first UI for every screen.",
      zh: "为一款全新的膀胱消融系统设计引导式触控流程：安装、排气试针、预消融与治疗。我搭建了设计系统，并完成全部页面的首版 UI。"
    },
    meta: {
      role: { en: "UI Designer — design system, all screens", zh: "UI 设计师 — 设计系统、全部页面" },
      timeline: { en: "2025 – 2026", zh: "2025 – 2026" },
      team: { en: "Bestec design team, client front-end engineers", zh: "Bestec 设计团队、客户前端工程师" },
      tools: "Figma"
    },
    blocks: [
      { type: "facts", items: [
        { value: "4", label: { en: "Stages: setup, priming, pre-ablation, ablation", zh: "个阶段：安装、排气试针、预消融、消融" } },
        { value: "5", label: { en: "Setup steps, each tied to a callout on the device", zh: "个安装步骤，与设备插图上的标注一一对应" } },
        { value: "1024×600", label: { en: "Touchscreen on the console", zh: "主机触控屏" } }
      ] },
      { type: "text",
        heading: { en: "Context", zh: "项目背景" },
        body: {
          en: "A new device with no existing interface. Setting it up involves a fluid bag, tubing, a delivery unit and a handpiece, in a fixed order. Mistakes cost time in the room, so the screen has to show the next step before anyone asks.",
          zh: "这是一款没有既有界面的新设备。安装涉及液体袋、冲洗管、输送器与手柄，且必须按固定顺序完成。任何失误都会浪费手术室的时间，所以屏幕要在操作者开口询问之前就给出下一步。"
        } },
      { type: "steps",
        heading: { en: "The procedure, screen by screen", zh: "按流程排列的界面" },
        body: {
          en: "Each stage gets one screen with one instruction. The order matches the clinical sequence.",
          zh: "每个阶段一个页面、一条指令，顺序与临床操作流程一致。"
        },
        items: [
          { src: "assets/work/ablation/setup.png", label: "1", caption: { en: "Setup: numbered callouts on the illustration match the step buttons", zh: "安装：插图上的编号与右侧步骤按钮一一对应" } },
          { src: "assets/work/ablation/prime.png", label: "2", caption: { en: "Priming and needle test: hold the button until the bar reaches 100%", zh: "排气试针：按住按键直到进度条达到 100%" } },
          { src: "assets/work/ablation/pre-ablation.png", label: "3", caption: { en: "Pre-ablation: a seconds counter replaces the percentage", zh: "预消融：用秒数计时取代百分比" } },
          { src: "assets/work/ablation/ablation.png", label: "4", caption: { en: "Ablation: live timer, status block and a log of every run", zh: "消融：实时计时、状态色块与每次消融的记录" } }
        ] },
      { type: "viewer",
        heading: { en: "Key moments", zh: "关键界面" },
        theme: "light",
        tabs: [
          { label: { en: "Setup", zh: "安装" }, screens: [
            { src: "assets/work/ablation/setup.png", caption: { en: "Five setup steps against the device illustration", zh: "五个安装步骤与设备插图" } },
            { src: "assets/work/ablation/volume.png", caption: { en: "Choosing the fluid volume", zh: "液量选择" } },
            { src: "assets/work/ablation/setup-done.png", caption: { en: "All steps done: buttons turn green and Confirm appears", zh: "全部完成：按钮变为绿色，出现确认按钮" } }
          ] },
          { label: { en: "Handpiece", zh: "手柄" }, screens: [
            { src: "assets/work/ablation/handpiece.png", caption: { en: "Handpiece controls, in the order they're used", zh: "手柄按键说明，按使用顺序编号" } }
          ] },
          { label: { en: "Treatment", zh: "治疗" }, screens: [
            { src: "assets/work/ablation/pre-ablation.png", caption: { en: "Pre-ablation with the quick menu open", zh: "预消融，快捷菜单展开" } },
            { src: "assets/work/ablation/ablation.png", caption: { en: "Ablation in progress", zh: "消融进行中" } },
            { src: "assets/work/ablation/ablation-menu.png", caption: { en: "Quick menu: change sterile water or saline without leaving the screen", zh: "快捷菜单：无需离开页面即可更换无菌水或生理盐水" } }
          ] }
        ] },
      { type: "swatches",
        heading: { en: "Design system", zh: "设计系统" },
        body: {
          en: "A small, strict system: navy for actions, green only for 'done', and one blue scale for progress. Colours below are sampled from the final screens.",
          zh: "一套小而严格的系统：深蓝用于操作，绿色只表示“已完成”，进度统一使用一组蓝色。以下颜色取自最终界面。"
        },
        items: [
          { hex: "#00306D", name: { en: "Header navy", zh: "标题栏深蓝" } },
          { hex: "#001C41", name: { en: "Action", zh: "操作按钮" } },
          { hex: "#119A7A", name: { en: "Step done", zh: "步骤完成" } },
          { hex: "#005DD5", name: { en: "Progress value", zh: "进度数值" } },
          { hex: "#387BD2", name: { en: "Progress fill", zh: "进度填充" } },
          { hex: "#E9F0FA", name: { en: "Track", zh: "进度轨道" } },
          { hex: "#F84E00", name: { en: "Status indicator", zh: "状态指示" } },
          { hex: "#00DF4A", name: { en: "Status indicator", zh: "状态指示" } }
        ] },
      { type: "list",
        heading: { en: "What I did", zh: "我的工作" },
        items: [
          { en: "Built the design system: colour, type, components and states.", zh: "搭建设计系统：色彩、字体、组件与状态。" },
          { en: "Designed the first UI for every screen.", zh: "完成所有页面的首版 UI。" },
          { en: "Supported the client's front-end engineers through product testing and UI iterations.", zh: "协助客户前端工程师进行产品测试与界面迭代。" }
        ] }
    ]
  },

  /* ------------------------------------------------------------------ Research (text only) */
  {
    id: "llm-fluency",
    format: "text",          // 文字类研究页：与其他作品一样以卡片展示，卡片右上角显示“进行中”
    category: "research",
    year: "2026–",
    cover: "assets/covers/ripple.svg",
    title: { en: "Rethinking Human–AI Interaction", zh: "重新设计人与 AI 的交互" },
    teaser: { en: "MSc research: AI chat still has a lot of room to feel more natural and easier to steer.", zh: "硕士研究：与 AI 的交流在自然度和可控性上仍有很大的优化空间。" },
    client: { en: "MSc research · Goldsmiths, University of London", zh: "硕士研究 · 伦敦大学金史密斯学院" },
    summary: {
      en: "My MSc research looks at how people and AI communicate, and how that communication could be designed better. Most AI tools still work as a strict text chat, and much of what makes human conversation and everyday tools easy to use has been left out.",
      zh: "我的硕士研究关注人与 AI 如何交流，以及这种交流如何被设计得更好。大多数 AI 工具仍是严格的文字轮流对话，人与人交谈、日常工具中那些让交流顺畅的东西，大多被留在了外面。"
    },
    meta: {
      role: { en: "Researcher", zh: "研究者" },
      timeline: { en: "2026 – in progress", zh: "2026 – 进行中" },
      team: { en: "Individual project", zh: "个人项目" }
    },
    blocks: [
      { type: "quote",
        body: { en: "How can talking to an AI feel as natural, and be as easy to steer, as working with another person?", zh: "怎样让人与 AI 的交流，像与另一个人协作一样自然、一样容易掌控？" },
        cite: { en: "Research topic", zh: "研究题目" } },
      { type: "text",
        heading: { en: "Why it matters", zh: "为什么值得研究" },
        body: {
          en: "AI models keep getting better, but the way we talk to them has barely changed: type a message, wait, read the answer, type again. The interaction pattern itself, not only the model behind it, decides how easily people can work with AI. That leaves a lot of room for design.",
          zh: "AI 模型越来越强，但我们与它交流的方式几乎没有变化：输入、等待、阅读、再输入。决定人能否顺畅地与 AI 协作的，不只是背后的模型，还有交互方式本身。这里有很大的设计空间。"
        } },
      { type: "list",
        heading: { en: "Where it could be better", zh: "可以优化的地方" },
        items: [
          { en: "Overlap, not strict turns. In real conversation people interrupt, say \"yeah\" while the other is talking, and answer before a sentence ends. Kim, Chang and Bak (2025) found people do this even in text, and a chatbot that allowed overlapping messages felt more communicative and immersive than a turn-taking one.",
            zh: "交流重叠，而不是严格轮流。真实对话中，人们会插话、边听边附和、在对方说完前就回应。Kim、Chang 与 Bak（2025）发现人们在文字中也会这样做，而允许消息重叠的聊天机器人比严格轮流的更有交流感、更具沉浸感。" },
          { en: "Direct manipulation, not only prompts. Instead of describing a change in words, people could select part of an answer and act on it. Shneiderman (1983) argued for visible objects and quick, reversible actions; DirectGPT (Masson et al., 2024) applied this to LLMs, and people finished editing tasks faster with fewer, shorter prompts.",
            zh: "直接操作，而不只是提示词。与其用文字描述想改哪里，不如直接选中回答的一部分进行操作。Shneiderman（1983）主张可见的对象与快速、可撤销的操作；DirectGPT（Masson 等，2024）把这一思路用在大语言模型上，用户完成编辑任务更快，提示词也更少、更短。" },
          { en: "Seeing where an answer comes from. An AI answer can cite a paper that doesn't support it. Checking means leaving the chat, finding the source and matching it to the claim by hand. The interface could make that link visible.",
            zh: "看清答案从何而来。AI 的回答可能引用了并不支持其观点的文献。要核实，人们只能离开对话、找到原文、自己逐句比对。界面完全可以把这层关系呈现出来。" }
        ] },
      { type: "text",
        heading: { en: "What I'm doing now", zh: "目前在做什么" },
        body: {
          en: "I'm starting with academic literature research, where these problems meet: people ask ChatGPT for sources, refine their question, and need to trust what comes back. By observing how people actually work with AI here, I want to find which parts of the interaction to redesign first, then prototype and test those ideas.",
          zh: "我从学术文献研究这一场景入手，因为这些问题在这里交汇：人们向 ChatGPT 查找文献、不断细化问题，并且需要信任它给出的内容。通过观察人们在这一场景中实际如何与 AI 协作，我希望找出最值得优先重新设计的交互环节，再做原型并进行测试。"
        } },
      { type: "text",
        heading: { en: "What I hope to build", zh: "希望的产出" },
        body: {
          en: "The end goal is to design a new kind of AI agent that people can talk to more naturally: one that can listen while you are still typing and respond at the right moment, let you point at and reshape what it has said instead of rewriting prompts, and show you where its answers come from.\n\nThe research will shape which of these ideas to build first. They will then be prototyped and tested with real users.",
          zh: "最终目标是设计一款新的 AI 智能体，让人可以用更自然的方式与它交流：在你还在输入时就能“听”、并在合适的时机回应；让你直接指向并修改它说过的内容，而不必反复重写提示词；并清楚地告诉你答案从何而来。\n\n研究结果将决定先实现其中哪些想法，之后会做成原型，并与真实用户一起测试。"
        } },
      { type: "refs",
        heading: { en: "References", zh: "参考文献" },
        items: [
          "Kim, J., Chang, M., & Bak, J. (2025). Beyond Turn-taking: Introducing Text-based Overlap into Human-LLM Interactions. arXiv:2501.18103.",
          "Masson, D., Malacria, S., Casiez, G., & Vogel, D. (2024). DirectGPT: A Direct Manipulation Interface to Interact with Large Language Models. CHI '24.",
          "Shneiderman, B. (1983). Direct Manipulation: A Step Beyond Programming Languages. Computer, 16(8).",
          "Amershi, S., et al. (2019). Guidelines for Human-AI Interaction. CHI '19."
        ] }
    ]
  },

  /* ------------------------------------------------------------------ University projects */
  /* Working Pro — speculative design */
  {
    id: "working-pro",
    pageTheme: "night",
    tone: "dark",
    category: "speculative",
    year: { en: "University", zh: "本科" },
    cover: "assets/work/working-pro/cover.jpg",
    plate: "assets/work/working-pro/plate.jpg",
    hero: "assets/work/working-pro/hero.jpg",
    title: { en: "Working Pro", zh: "Working Pro" },
    teaser: { en: "Speculative workwear for 2030 that keeps people working, and asks whether it should.", zh: "面向 2030 年、让人持续工作的思辨性工作服，同时追问它是否应该存在。" },
    client: { en: "Speculative design · individual project", zh: "思辨设计 · 个人项目" },
    summary: {
      en: "Keynes predicted that by 2030 we would work 15 hours a week. Working Pro imagines the opposite future: workwear that monitors the body, releases aromatic gases to keep you going, and performs first aid when you collapse at your desk.",
      zh: "凯恩斯曾预言，到 2030 年人们每周只需工作 15 小时。Working Pro 设想了相反的未来：一件监测身体、释放芳香气体让你继续工作、并在你倒在工位时实施急救的工作服。"
    },
    meta: {
      role: { en: "Research, concept, 3D modelling, scenario", zh: "调研、概念、三维建模、情景构建" },
      team: { en: "Individual project", zh: "个人项目" },
    },
    blocks: [
      { type: "quote",
        body: { en: "In 1930, Keynes predicted that people in 2030 would work 15 hours a week, be eight times richer, and have plenty of leisure time.", zh: "1930 年，凯恩斯预言 2030 年的人们每周只需工作 15 小时，比一百年前富裕八倍，并拥有大量闲暇。" },
        cite: { en: "The starting point", zh: "项目起点" } },
      { type: "text",
        heading: { en: "Premise", zh: "前提" },
        body: {
          en: "Instead, work and living pressures keep growing, and a whole category of products exists to help people endure them: coffee, ergonomic chairs, silent booths. I asked what workwear for 2030 might look like if that trend continued, and designed it as a way to make the question visible.\n\nThe project focuses on predicting future scenarios and on product form.",
          zh: "现实恰恰相反：工作与生活压力不断加剧，一整类产品的存在只是为了帮人撑下去——咖啡、人体工学椅、静音仓。我设想：如果这种趋势延续，2030 年的工作服会是什么样子？我把它设计出来，让这个问题变得可见。\n\n项目重点在于未来情景的推演与产品造型。"
        } },
      { type: "image", src: "assets/work/working-pro/inspiration.jpg", ratio: "auto", bg: "#171717",
        caption: { en: "Inspiration: burnout in the UK, the anti-996 campaign in China, workplace surveillance", zh: "灵感：英国的职业倦怠、中国的反 996 运动、职场监控" } },
      { type: "image", src: "assets/work/working-pro/technologies.jpg", ratio: "auto", bg: "#171717",
        caption: { en: "Technologies that changed how we work, 1990–2020: each one raised productivity and blurred the edge of the working day", zh: "1990–2020 年改变工作方式的技术：每一项都提升了效率，也模糊了工作日的边界" } },
      { type: "gallery", cols: 2, ratio: "auto", equal: true,   // 两张图已裁成同一比例（689×496），并排时尺寸完全一致
        items: [
          { src: "assets/work/working-pro/observe-office-crop.jpg", caption: { en: "Observation: unmanageable tasks", zh: "观察：难以承受的任务" } },
          { src: "assets/work/working-pro/observe-commute.jpg", caption: { en: "Observation: work continues on the commute home", zh: "观察：下班路上仍在工作" } }
        ] },
      { type: "facts", items: [
        { value: "23", label: { en: "People interviewed in a Suzhou industrial park", zh: "位苏州工业园区受访者" } },
        { value: "15 h", label: { en: "Keynes's predicted working week for 2030", zh: "凯恩斯预言的 2030 年每周工时" } },
        { value: "2030", label: { en: "The year the scenario is set in", zh: "情景设定的年份" } }
      ] },
      { type: "text",
        heading: { en: "What people told me", zh: "访谈发现" },
        body: {
          en: "I grouped the 23 interviewees into three categories and asked about their work, why they stay, and how their day is divided. The pattern was consistent: work is hard, but people endure it for income and the hope of a better future.",
          zh: "我把 23 位受访者分为三类，询问他们的工作状态、留下的原因与一天的时间分配。规律很一致：工作很辛苦，但人们为了收入和更好的未来选择忍耐。"
        } },
      { type: "image", src: "assets/work/working-pro/what-if.jpg", ratio: "auto", bg: "#171717",
        caption: { en: "What if: living costs keep rising, performance is sustained by technology, and employee protection stays where it is", zh: "What if：生活成本持续上升、工作表现依赖技术维持、员工保障停滞不前" } },
      { type: "image", src: "assets/work/working-pro/sketches.jpg", ratio: "auto", bg: "#171717",
        caption: { en: "Sketch development: from a workbench idea to aromatic gas, airbag structures and a back support", zh: "草图推演：从工作台构想，到芳香气体、气囊结构与腰部支撑" } },
      { type: "split",
        heading: { en: "The workwear", zh: "工作服" },
        body: {
          en: "Head electrodes read neural activity; sensors track pulse, breathing and sweat. A processing unit decides what the body needs and a gas module releases it through the face-piece. Waist support reduces strain from long hours. If the wearer collapses, the garment compresses the chest for CPR.",
          zh: "头部电极读取神经活动，传感器监测脉搏、呼吸与出汗；处理单元判断身体需要什么，再由气体模块通过面罩释放。腰部支撑减轻久坐带来的劳损。如果穿着者失去意识，工作服会挤压胸腔进行心肺复苏。"
        },
        src: "assets/work/working-pro/model.jpg",
        caption: { en: "3D model: back, side and front views, and the face-piece", zh: "三维模型：背面、侧面、正面与面罩" },
        theme: "ink" },
      { type: "text",
        heading: { en: "Two scenes from 2030", zh: "2030 年的两个场景" },
        body: { en: "At work, the suit reads the body and releases aromatic gases to keep the wearer going. When the wearer collapses, it delivers concentrated oxygen and defibrillation.", zh: "工作时，工作服读取身体状态并释放芳香气体，让人继续工作；当人倒下时，它输送高浓度氧气并进行除颤。" } },
      { type: "image", src: "assets/work/working-pro/scene-desk.jpg", ratio: "auto", full: true,
        caption: { en: "A — At work", zh: "A — 工作中" } },
      { type: "image", src: "assets/work/working-pro/scenario-collapse.jpg", ratio: "auto", full: true,
        caption: { en: "B — Collapse: oxygen and defibrillation", zh: "B — 倒下时：供氧与除颤" } },
      { type: "image", src: "assets/work/working-pro/system.jpg", ratio: "auto", bg: "#171717",
        caption: { en: "System: data collection, gas processing and the cardiac resuscitation module", zh: "系统：数据采集、气体处理与心肺复苏模块" } },
      { type: "text",
        heading: { en: "Feedback", zh: "反馈" },
        body: {
          en: "I presented the scenarios to people over video calls, alongside news such as insurance for '996' sudden deaths, and asked how they saw their own future at work.",
          zh: "我通过视频会议向受访者展示这些情景，并配合“996 猝死保险”等新闻，询问他们如何看待自己未来的工作。"
        } },
      { type: "quote",
        body: { en: "The workwear feels like a saddle — I'm the horse ridden by the boss.", zh: "这件工作服像一副马鞍——而我是被老板骑着的马。" },
        cite: { en: "Participant 1", zh: "受访者 1" } },
      { type: "quote",
        body: { en: "Maybe it will let me work well, but when all my energy is drained by work, what will I do when I get home?", zh: "也许它能让我把工作做好，但当我的精力都被工作耗尽，回到家又能做什么呢？" },
        cite: { en: "Participant 2", zh: "受访者 2" } }
    ]
  },

  /* Healing Shoe — product & interaction design */
  {
    id: "healing-shoe",
    pageTheme: "graphite",
    tone: "dark",
    category: "product",
    year: { en: "University", zh: "本科" },
    cover: "assets/work/healing-shoe/cover.jpg",
    plate: "assets/work/healing-shoe/plate.jpg",
    hero: "assets/work/healing-shoe/hero.jpg",
    title: { en: "Healing Shoe", zh: "Healing Shoe 痛风康复鞋" },
    teaser: { en: "A modular shoe that stimulates foot acupoints to ease gout, with an app for daily habits.", zh: "通过刺激足部穴位缓解痛风的模块化鞋子，配合管理日常习惯的 App。" },
    client: { en: "Product & interaction design · individual project", zh: "产品与交互设计 · 个人项目" },
    summary: {
      en: "A modular shoe for people with gout. Pulse patches, heat and vibration stimulate foot acupoints used in Chinese medicine, sensors detect falls, and a companion app tracks water, diet and exercise.",
      zh: "为痛风患者设计的模块化鞋子：脉冲贴片、加热与振动模块刺激中医足部穴位，传感器监测跌倒，配套 App 记录饮水、饮食与运动。"
    },
    meta: {
      role: { en: "Research, product design, electronics prototype, app", zh: "调研、产品设计、电子原型、App" },
      team: { en: "Individual project", zh: "个人项目" },
    },
    blocks: [
      { type: "text",
        heading: { en: "Why gout", zh: "为什么是痛风" },
        body: {
          en: "In my first-year health check I was told my uric acid was high, and so were many of my classmates'. I wondered what it would mean to develop gout, how it would change daily life, and what kind of help I would want. The project explores new ways to relieve it, with a focus on product design.",
          zh: "大一体检时我被查出尿酸偏高，许多同学也一样。我开始想：如果有一天得了痛风，它会怎样影响我的生活？那时我会需要什么样的帮助？这个项目尝试探索新的缓解方式，重点在产品设计。"
        } },
      { type: "facts", items: [
        { value: "4–6%", label: { en: "Of the population suffers from gout", zh: "的人口患有痛风" } },
        { value: "80%", label: { en: "Of sufferers are male, most aged 60–64", zh: "的患者为男性，以 60–64 岁人群居多" } },
        { value: "3", label: { en: "Interviewees, aged 26 to 82", zh: "位受访者，年龄 26 至 82 岁" } }
      ] },
      { type: "image", src: "assets/work/healing-shoe/gout-stats.jpg", ratio: "auto", bg: "#252426",
        caption: { en: "Who gets gout, and how it progresses", zh: "痛风人群与病程" } },
      { type: "list",
        heading: { en: "Three people, three problems", zh: "三位受访者，三种困扰" },
        items: [
          { en: "Ma Ming, 26, computer engineer: irregular routine; gout stopped him playing basketball.", zh: "马明，26 岁，计算机工程师：作息不规律，痛风让他无法再打篮球。" },
          { en: "Li Yang, 47, shop owner: sedentary, BBQ and late-night TV; night pain ruins his sleep.", zh: "李阳，47 岁，便利店老板：久坐、爱吃烧烤、熬夜看电视；夜间疼痛影响睡眠。" },
          { en: "Zhun Lanfang, 82, retired: foot soaks and walking help, but only for a while.", zh: "准兰芳，82 岁，退休职工：泡脚和散步有帮助，但只是暂时缓解。" }
        ] },
      { type: "split",
        heading: { en: "A lead from Chinese medicine", zh: "来自中医的线索" },
        body: {
          en: "Older patients often walk barefoot on cobblestones to stimulate the feet. Three acupoints are associated with gout relief: SP1 (Yinbai) for metabolism, SP3 (Taibai) for dissolving urate deposits, and ST41 (Jiexi) for pain. The shoe is built around stimulating them.",
          zh: "许多老年患者会赤脚走鹅卵石路来刺激足底。与缓解痛风相关的三个穴位是：隐白（SP1）促进代谢、太白（SP3）辅助溶解尿酸盐沉积、解溪（ST41）缓解疼痛。这双鞋就围绕刺激这些穴位展开。"
        },
        src: "assets/work/healing-shoe/acupoints.jpg",
        caption: { en: "Foot acupoints for gout", zh: "痛风相关足部穴位" },
        theme: "ink" },
      { type: "image", src: "assets/work/healing-shoe/pathology.jpg", ratio: "auto", bg: "#252426",
        caption: { en: "From the pathology of gout to opportunities: easy to put on, modular, acupoint stimulation, heat, habit tracking", zh: "从病理到机会点：易穿脱、模块化、穴位刺激、热疗、习惯记录" } },
      { type: "split", reverse: true,
        heading: { en: "A modular sole", zh: "模块化鞋底" },
        body: {
          en: "The sole is built in layers. A main board processes signals; a pulse generator sends micro-currents to the acupoints; a heating layer warms the foot to help circulation; a vibration element massages; a pressure sensor and an accelerometer watch how the wearer walks and detect falls. Users fit the modules they need.",
          zh: "鞋底分层构建：主板处理信号；脉冲发生器向穴位输出微电流；加热层温暖足部、促进循环；振动元件按摩；压力传感器与加速度计监测步态并识别跌倒。用户按需安装模块。"
        },
        src: "assets/work/healing-shoe/exploded.jpg",
        caption: { en: "Exploded view of the sole modules", zh: "鞋底模块爆炸图" },
        theme: "ink" },
      { type: "image", src: "assets/work/healing-shoe/system.jpg", ratio: "auto", bg: "#252426",
        caption: { en: "System map: intention, sensors, input and output", zh: "系统图：意图、传感器、输入与输出" } },
      { type: "gallery", cols: 3, ratio: "auto",
        items: [
          { src: "assets/work/healing-shoe/build-1.jpg", caption: { en: "Checking the components", zh: "检查元器件" } },
          { src: "assets/work/healing-shoe/build-2.jpg", caption: { en: "Layering the soles", zh: "鞋底分层" } },
          { src: "assets/work/healing-shoe/build-3.jpg", caption: { en: "Mounting components on each layer", zh: "在各层安装元件" } },
          { src: "assets/work/healing-shoe/build-4.jpg", caption: { en: "Testing the vibration module", zh: "测试振动模块" } },
          { src: "assets/work/healing-shoe/build-5.jpg", caption: { en: "Stimulating acupoints with pulse patches", zh: "用脉冲贴片刺激穴位" } },
          { src: "assets/work/healing-shoe/build-6.jpg", caption: { en: "Collecting test data", zh: "采集测试数据" } }
        ] },
      { type: "image", src: "assets/work/healing-shoe/storyboard.jpg", ratio: "auto", bg: "#252426",
        caption: { en: "Storyboard: from learning about the shoe to fall alerts and health advice", zh: "故事板：从了解产品到跌倒报警与健康建议" } },
      { type: "gallery", cols: 3, ratio: "auto", bg: "#252426",
        items: [
          { src: "assets/work/healing-shoe/app-device.jpg", caption: { en: "Shoe control", zh: "鞋子控制" } },
          { src: "assets/work/healing-shoe/app-modules.jpg", caption: { en: "Module manager", zh: "模块管理" } },
          { src: "assets/work/healing-shoe/app-water.jpg", caption: { en: "Water intake", zh: "饮水管理" } },
          { src: "assets/work/healing-shoe/app-diet.jpg", caption: { en: "Purine and diet records", zh: "嘌呤与饮食记录" } },
          { src: "assets/work/healing-shoe/app-exercise.jpg", caption: { en: "Exercise", zh: "运动管理" } },
          { src: "assets/work/healing-shoe/app-shoe.jpg", caption: { en: "Device pairing", zh: "设备连接" } }
        ] }
    ]
  },

  /* Duck Rescue Station — service & product design */
  {
    id: "duck-rescue",
    pageTheme: "duck",
    category: "service",
    year: { en: "University", zh: "本科" },
    cover: "assets/work/duck-rescue/cover.jpg",
    plate: "assets/work/duck-rescue/plate.jpg",
    hero: "assets/work/duck-rescue/hero.jpg",
    title: { en: "Duck Rescue Station", zh: "小黄鸭救援站" },
    teaser: { en: "A riverside rescue station shaped like a duck, so children can save each other.", zh: "一座小黄鸭造型的河边救援站，让孩子们能够互相施救。" },
    client: { en: "Service & product design · Henan, China", zh: "服务与产品设计 · 中国河南" },
    summary: {
      en: "Most child drownings in rural China happen in rivers, often when one child goes in after another. Duck Rescue Station gives left-behind children a rescue kit they will actually notice and use: a riverside duck with a lifebuoy, an alarm and first-aid supplies, plus the education around it.",
      zh: "中国农村的儿童溺水多发生在河边，常常是一个孩子下水救另一个。小黄鸭救援站为留守儿童提供一套他们真正会注意、也会使用的救援装置：带救生圈、警报和急救用品的河边小黄鸭，以及配套的安全教育。"
    },
    meta: {
    },
    blocks: [
      { type: "facts", items: [
        { value: "30,000+", label: { en: "Children die from drowning in China each year; half in rural areas", zh: "中国每年溺亡儿童人数，半数在农村" } },
        { value: "6.1 M", label: { en: "Left-behind children in Henan", zh: "河南留守儿童人数" } },
        { value: "63.2%", label: { en: "Of child drownings happen in rivers", zh: "的儿童溺水发生在河流中" } }
      ] },
      { type: "text",
        heading: { en: "Context", zh: "背景" },
        body: {
          en: "Swimming in the village river is one of the joys of a rural summer, especially for left-behind children whose parents work in cities and who live with grandparents. Villages rarely have rescue equipment, schools lack drowning-prevention teaching, and pools are unaffordable.\n\nThe aim was not to stop children swimming, but to make it safer, and to give them the means to help each other.",
          zh: "在村里的河中游泳是农村夏天的乐趣，对父母外出务工、跟着祖辈生活的留守儿童尤其如此。然而村里很少有救援设备，学校缺少防溺水教育，也负担不起游泳池。\n\n目标不是禁止孩子游泳，而是让游泳更安全，并让他们有能力互相帮助。"
        } },
      { type: "image", src: "assets/work/duck-rescue/henan.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Henan: 30.65 million migrant workers, 6.1 million left-behind children", zh: "河南：3065 万外出务工人员，610 万留守儿童" } },
      { type: "gallery", cols: 2, ratio: "auto", bg: "#F5F4EE",
        items: [
          { src: "assets/work/duck-rescue/where.jpg", caption: { en: "Where children drown", zh: "儿童溺水地点" } },
          { src: "assets/work/duck-rescue/ages.jpg", caption: { en: "Drowning by age group", zh: "各年龄段溺水比例" } }
        ] },
      { type: "gallery", cols: 3, ratio: "auto", bg: "#F5F4EE",
        items: [
          { src: "assets/work/duck-rescue/persona-children.jpg", caption: { en: "Children: first on the scene, without the means to help", zh: "孩子：最先到场，却没有施救能力" } },
          { src: "assets/work/duck-rescue/persona-teachers.jpg", caption: { en: "Teachers: lessons don't stick without practical tools", zh: "老师：缺少实用工具，安全课难以落地" } },
          { src: "assets/work/duck-rescue/persona-guardians.jpg", caption: { en: "Guardians: 'stay away from water' is the only advice", zh: "监护人：只会说“别靠近水”" } }
        ] },
      { type: "split",
        heading: { en: "The rescue gap", zh: "救援断层" },
        body: {
          en: "Mapping a village showed that adults spend their day at the village committee and in the fields, while children are at school, the kiosk and the river. In an emergency, the people who know how to rescue are furthest away. So the design has to work for the children who are already there.",
          zh: "对一个村庄的地图分析显示：大人白天多在村委会和农田，孩子则在学校、小卖部和河边。一旦发生溺水，懂得施救的人往往离得最远。所以设计必须服务于已经在现场的孩子们。"
        },
        src: "assets/work/duck-rescue/village-map.jpg",
        caption: { en: "Village map: where children and adults spend the day", zh: "村庄地图：孩子与大人的日常活动区域" },
        theme: "paper" },
      { type: "image", src: "assets/work/duck-rescue/rescue-capability.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "When a child drowns: who is nearby, and who can actually help", zh: "孩子溺水时：谁在附近，谁真正能施救" } },
      { type: "split", reverse: true,
        heading: { en: "Why a duck", zh: "为什么是小黄鸭" },
        body: {
          en: "A little yellow duck is cute and eye-catching, so children notice it and want to play with it. That familiarity is the point: on an ordinary day it is a seat by the river; in an emergency it holds a lifebuoy on its head, an alarm in its beak, and first-aid supplies and a manual inside its wings.",
          zh: "小黄鸭可爱又醒目，孩子们会注意到它、愿意和它玩。这种亲近感正是关键：平时它是河边的座椅；紧急时，它头上的救生圈、喙里的警报器和翅膀里的急救用品与手册都能派上用场。"
        },
        src: "assets/work/duck-rescue/concept.jpg",
        caption: { en: "Concept: rescue assistance, salvage material, rescue equipment and warning device", zh: "概念：救援辅助、救生材料、救援设备与警报装置" },
        theme: "paper" },
      { type: "image", src: "assets/work/duck-rescue/prototype-compare.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Prototype 1 (a riverside seat) and Prototype 2 (more visible, with a warning pole), with parts and materials", zh: "原型 1（河边座椅）与原型 2（更醒目、带警示杆）及其部件与材料" } },
      { type: "steps",
        heading: { en: "How children use it", zh: "孩子们如何使用" },
        body: { en: "The guide printed for children, in four pictures.", zh: "为孩子们设计的使用指南，四幅图讲清楚。" },
        frame: "none",
        items: [
          { src: "assets/work/duck-rescue/guide-1.jpg", label: "1", caption: { en: "Sit on your duckling friend to play or rest", zh: "坐在小鸭子身上玩耍或休息" } },
          { src: "assets/work/duck-rescue/guide-2.jpg", label: "2", caption: { en: "Press the beak to call for help", zh: "按下鸭嘴呼救" } },
          { src: "assets/work/duck-rescue/guide-3.jpg", label: "3", caption: { en: "Grab the lifebuoy to save a friend in the water", zh: "拿起救生圈救水中的伙伴" } },
          { src: "assets/work/duck-rescue/guide-4.jpg", label: "4", caption: { en: "Open the wings: rescue blanket and first-aid manual", zh: "打开翅膀：救生毯与急救手册" } }
        ] },
      { type: "image", src: "assets/work/duck-rescue/in-situ.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "On the riverbank", zh: "放置在河岸边" } },
      { type: "text",
        heading: { en: "The service around it", zh: "围绕装置的服务" },
        body: {
          en: "The station is one part of a system with three phases. Before: teachers and village staff teach drowning prevention with posters, a safe-swimming map and hats printed with warm-up exercises. During: children raise the alarm, throw the lifebuoy, and nearby adults respond. After: rescuers follow the manual until the ambulance arrives.",
          zh: "救援站只是整个系统的一部分，系统分为三个阶段。事前：老师和村干部通过海报、安全游泳地图和印有热身动作的帽子开展防溺水教育。事中：孩子拉响警报、抛出救生圈，附近的大人赶来施救。事后：施救者按照手册操作，直到救护车到达。"
        } },
      { type: "image", src: "assets/work/duck-rescue/story-awareness.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Storyboard 1: awareness and education", zh: "故事板 1：宣传与教育" } },
      { type: "image", src: "assets/work/duck-rescue/story-rescue.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Storyboard 2: rescue during a drowning", zh: "故事板 2：溺水时的救援" } },
      { type: "image", src: "assets/work/duck-rescue/story-aftercare.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Storyboard 3: emergency care on the bank", zh: "故事板 3：上岸后的急救" } },
      { type: "image", src: "assets/work/duck-rescue/blueprint.jpg", ratio: "auto", bg: "#F5F4EE",
        caption: { en: "Service blueprint across education, safe swimming and rescue", zh: "覆盖教育、安全游泳与救援阶段的服务蓝图" } }
    ]
  },

  /* Wax Moth Township — service design */
  {
    id: "wax-moth",
    pageTheme: "moth",
    category: "service",
    year: { en: "University", zh: "本科" },
    cover: "assets/work/wax-moth/cover.jpg",
    plate: "assets/work/wax-moth/plate.jpg",
    hero: "assets/work/wax-moth/hero.jpg",
    title: { en: "Wax Moth Township", zh: "蜡螟小镇" },
    teaser: { en: "Turning a beehive pest into a plastic-eating resource for a beekeeping town.", zh: "把危害蜂箱的害虫，变成能分解塑料、带动小镇的资源。" },
    client: { en: "Service design · Tanghe Township, China", zh: "服务设计 · 中国唐河乡" },
    summary: {
      en: "The greater wax moth damages beehives, and used agricultural film pollutes the fields of a beekeeping town. Its larvae can also break down plastic. This service links the two problems through tourism, farming and an app, so a pest becomes a source of income.",
      zh: "大蜡螟危害蜂箱，废弃农膜污染着这座养蜂小镇的田地。而蜡螟幼虫恰好能分解塑料。这套服务通过旅游、养殖与 App 把两个问题连在一起，让害虫变成收入来源。"
    },
    meta: {
    },
    blocks: [
      { type: "facts", items: [
        { value: "130", label: { en: "Beekeeping families in Tanghe Township", zh: "唐河乡养蜂家庭" } },
        { value: "100 t", label: { en: "Of honey produced a year", zh: "年产蜂蜜" } },
        { value: "$5M+", label: { en: "Industry revenue a year", zh: "年产业收入" } }
      ] },
      { type: "text",
        heading: { en: "Two problems in one town", zh: "一个小镇的两个问题" },
        body: {
          en: "Beekeeping is Tanghe's key industry, but Galleria mellonella lays its eggs in hives; untreated, it cuts honey yield and can drive the colony away. Meanwhile, agricultural film helps crops grow and saves water, yet much of it is never collected and ends up in soil and rivers.\n\nOne fact connects them: wax moth larvae can break down plastic, and they are good feed for other animals.",
          zh: "养蜂是唐河乡的支柱产业，但大蜡螟会在蜂箱中产卵，不及时处理会导致蜂蜜减产，甚至蜂群出逃。与此同时，农膜帮助作物增产、节约用水，却大量没有被回收，最终进入土壤和河流。\n\n一个事实把两者连了起来：蜡螟幼虫能分解塑料，同时也是其他动物的优质饲料。"
        } },
      { type: "image", src: "assets/work/wax-moth/task-card.jpg", ratio: "auto", bg: "#EDE7DB",
        caption: { en: "Task card: agricultural film pollution and wax moth infestation", zh: "任务卡：农膜污染与蜡螟侵害" } },
      { type: "list",
        heading: { en: "Who is involved", zh: "利益相关者" },
        items: [
          { en: "Wax moth breeders: eggs and larvae are hard to collect, and feed needs beeswax.", zh: "蜡螟养殖户：虫卵和幼虫难以收集，饲料需要蜂蜡。" },
          { en: "Beekeepers: complex expertise, an ageing workforce, and fake honey eroding trust.", zh: "养蜂人：技术门槛高、从业者老龄化，假蜂蜜削弱了消费者信任。" },
          { en: "Fish farmers: pond sludge and fresh feed are labour-intensive.", zh: "养鱼户：清淤和新鲜饲料都很费人力。" },
          { en: "Tourist families: looking for nature and for lessons children can't get in class.", zh: "游客家庭：想亲近自然，让孩子学到课堂之外的知识。" }
        ] },
      { type: "split",
        heading: { en: "A circular system", zh: "循环系统" },
        body: {
          en: "Recycling stations collect and wash used film; wax moth farms use the larvae to break it down and sell the insects as feed to fish and pig farms; beekeepers sell eggs they remove from hives; visitors join honey harvests and film collection, then buy local produce.",
          zh: "回收站收集并清洗废弃农膜；蜡螟养殖场用幼虫分解塑料，并把蜡螟作为饲料卖给养鱼场和养猪场；养蜂人出售从蜂箱中清理出的虫卵；游客参与采蜜和农膜收集，再购买当地农产品。"
        },
        src: "assets/work/wax-moth/system.jpg",
        caption: { en: "Stakeholder map: product, money and service flows", zh: "利益相关者地图：产品、资金与服务流向" },
        theme: "paper" },
      { type: "gallery", cols: 3, ratio: "auto",
        items: [
          { src: "assets/work/wax-moth/strategy-collect.jpg", caption: { en: "Encourage collection", zh: "鼓励收集" } },
          { src: "assets/work/wax-moth/strategy-factory.jpg", caption: { en: "Process at a wax moth factory", zh: "建立蜡螟工厂" } },
          { src: "assets/work/wax-moth/strategy-tourism.jpg", caption: { en: "Fund it through tourism", zh: "以旅游带动收入" } }
        ] },
      { type: "text",
        heading: { en: "The app", zh: "App" },
        body: {
          en: "The app is the visitor's way into the system: a town map with an AR treasure hunt, live streams from the insect houses, data on how much plastic has been broken down, community chat, and a points card that rewards collecting film and eggs.",
          zh: "App 是游客进入这套系统的入口：带 AR 寻宝的小镇地图、昆虫屋直播、塑料分解数据、社区交流，以及奖励收集农膜与虫卵的积分卡。"
        } },
      { type: "gallery", cols: 4, ratio: "auto", bg: "#EDE7DB",
        items: [
          { src: "assets/work/wax-moth/app-map.jpg", caption: { en: "Town map", zh: "小镇地图" } },
          { src: "assets/work/wax-moth/app-ar.jpg", caption: { en: "AR treasure hunt", zh: "AR 寻宝" } },
          { src: "assets/work/wax-moth/app-scan.jpg", caption: { en: "Scan to discover", zh: "扫码探索" } },
          { src: "assets/work/wax-moth/app-playbook.jpg", caption: { en: "Playbook", zh: "功能导览" } },
          { src: "assets/work/wax-moth/app-class.jpg", caption: { en: "Small class: live insect houses", zh: "小课堂：昆虫屋直播" } },
          { src: "assets/work/wax-moth/app-data.jpg", caption: { en: "Plastic broken down", zh: "塑料分解数据" } },
          { src: "assets/work/wax-moth/app-chat.jpg", caption: { en: "Community chat", zh: "社区交流" } },
          { src: "assets/work/wax-moth/app-card.jpg", caption: { en: "Points card", zh: "积分卡" } }
        ] },
      { type: "image", src: "assets/work/wax-moth/blueprint.jpg", ratio: "auto", bg: "#EDE7DB",
        caption: { en: "Service blueprint: before, during and after a visit", zh: "服务蓝图：游览前、中、后" } }
    ]
  }
];
