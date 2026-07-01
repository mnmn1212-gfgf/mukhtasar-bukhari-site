import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import headerLogo from './assets/header-logo.png';
import bookLogo from './assets/book-logo.png';

const navItems = [
  { path: '/', label: 'الرئيسية' },
  { path: '/about', label: 'عن الكتاب' },
  { path: '/method', label: 'منهج المختصر' },
  { path: '/sections', label: 'الأقسام' },
  { path: '/hadiths', label: 'أحاديث مختارة' },
  { path: '/contact', label: 'تواصل معنا' },
];

const sections = [
  { slug: 'bad-alwahy', title: 'بدء الوحي', icon: 'revelation', level: 'كتاب من المختصر', desc: 'بداية الوحي إلى رسول الله ﷺ، وما يتعلق بأول نزول القرآن وبداية الرسالة.', topics: ['الوحي', 'بداية الرسالة', 'الرؤيا'] },
  { slug: 'iman', title: 'الإيمان', icon: 'heart', level: 'كتاب من المختصر', desc: 'أبواب الإيمان وشعبه وما يتصل بالاعتقاد والعمل وآثار الإيمان في السلوك.', topics: ['الإيمان', 'الشعب', 'الحياء'] },
  { slug: 'ilm', title: 'العلم', icon: 'lamp', level: 'كتاب من المختصر', desc: 'فضل العلم، وآداب السؤال والتلقي، وأمانة تبليغ العلم ونقله.', topics: ['العلم', 'السؤال', 'التبليغ'] },
  { slug: 'wudu', title: 'الوضوء', icon: 'water', level: 'كتاب من المختصر', desc: 'أبواب الطهارة والوضوء وما يتصل بها من أحكام وآداب.', topics: ['الوضوء', 'الطهارة', 'السنن'] },
  { slug: 'salah', title: 'الصلاة', icon: 'mosque', level: 'كتاب من المختصر', desc: 'أبواب الصلاة، والقبلة، والجماعة، والمساجد، وما يتصل بآدابها.', topics: ['الصلاة', 'القبلة', 'الجماعة'] },
  { slug: 'zakah', title: 'الزكاة', icon: 'hand', level: 'كتاب من المختصر', desc: 'أبواب الزكاة والصدقة والنفقة، وما يتعلق بحقوق المال.', topics: ['الزكاة', 'الصدقة', 'النفقة'] },
  { slug: 'sawm', title: 'الصوم', icon: 'moon', level: 'كتاب من المختصر', desc: 'أبواب الصيام، وقيام رمضان، وليلة القدر، ومعاني الاحتساب.', topics: ['الصوم', 'رمضان', 'ليلة القدر'] },
  { slug: 'hajj', title: 'الحج', icon: 'kaaba', level: 'كتاب من المختصر', desc: 'أبواب الحج والعمرة والمناسك والمواقيت وآداب النسك.', topics: ['الحج', 'العمرة', 'المناسك'] },
  { slug: 'buyu', title: 'البيوع', icon: 'scale', level: 'كتاب من المختصر', desc: 'أبواب المعاملات والبيع والشراء وما يتصل بالأمانة والحقوق.', topics: ['البيوع', 'المعاملات', 'الأمانة'] },
  { slug: 'adab', title: 'الأدب', icon: 'rose', level: 'كتاب من المختصر', desc: 'أبواب الأخلاق، والبر، والصلة، وحسن المعاملة، وآداب المسلم.', topics: ['الأدب', 'البر', 'الصلة'] },
  { slug: 'tafsir', title: 'التفسير', icon: 'quran', level: 'كتاب من المختصر', desc: 'الأحاديث التي أوردها البخاري في تفسير الآيات وبيان معانيها ومواضع الاستدلال بها.', topics: ['التفسير', 'الآيات', 'القرآن'] },
  { slug: 'tawhid', title: 'التوحيد', icon: 'star', level: 'كتاب من المختصر', desc: 'أبواب التوحيد وتعظيم الوحي وما يتعلق بالإيمان بالله وأسمائه وصفاته.', topics: ['التوحيد', 'العقيدة', 'الإيمان'] },
];

const hadiths = [
  { id: 1, section: 'bad-alwahy', book: 'بدء الوحي', topic: 'النية', narrator: 'عمر بن الخطاب رضي الله عنه', title: 'إنما الأعمال بالنيات', text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى...', note: 'حديث عظيم في النية، وبه افتتح الإمام البخاري صحيحه، ويدخل معناه في العبادات والمعاملات.' },
  { id: 2, section: 'bad-alwahy', book: 'بدء الوحي', topic: 'بدء الوحي', narrator: 'عائشة رضي الله عنها', title: 'كيف كان بدء الوحي؟', text: 'أول ما بُدئ به رسول الله ﷺ من الوحي الرؤيا الصالحة...', note: 'يبين الحديث بداية الوحي إلى رسول الله ﷺ وما كان من نزول جبريل عليه السلام.' },
  { id: 3, section: 'iman', book: 'الإيمان', topic: 'شعب الإيمان', narrator: 'أبو هريرة رضي الله عنه', title: 'الحياء من الإيمان', text: 'الإيمان بضع وستون شعبة، والحياء شعبة من الإيمان.', note: 'يبين الحديث أن الحياء من شعب الإيمان، وأن الإيمان يظهر أثره في السلوك والعمل.' },
  { id: 4, section: 'iman', book: 'الإيمان', topic: 'محبة الإيمان', narrator: 'أنس رضي الله عنه', title: 'حلاوة الإيمان', text: 'ثلاث من كن فيه وجد حلاوة الإيمان...', note: 'حديث في محبة الله ورسوله ﷺ، وأثر الإيمان في القلب.' },
  { id: 5, section: 'ilm', book: 'العلم', topic: 'الأمانة', narrator: 'أبو هريرة رضي الله عنه', title: 'إذا ضُيّعت الأمانة', text: 'إذا ضُيّعت الأمانة فانتظر الساعة...', note: 'يبين الحديث خطر تضييع الأمانة، ويدخل في باب العلم ومسؤولية حمله وأدائه.' },
  { id: 6, section: 'iman', book: 'الإيمان', topic: 'السلام', narrator: 'عبد الله بن عمرو رضي الله عنهما', title: 'إطعام الطعام وإفشاء السلام', text: 'تطعم الطعام، وتقرأ السلام على من عرفت ومن لم تعرف.', note: 'حديث في خصال الإسلام العملية، ومنها الإحسان إلى الناس وإفشاء السلام.' },
];

const methodSteps = [
  { title: 'الاختصار دون إخلال', text: 'اعتمد المختصر على تقريب مادة صحيح البخاري للقارئ، بحذف ما يطيل القراءة، مع المحافظة على أصل الحديث ومقصوده.', icon: 'scroll' },
  { title: 'ترتيب الكتب والأبواب', text: 'يسير الكتاب على بناء صحيح البخاري في الكتب والأبواب، حتى يبقى الحديث في موضعه العلمي المناسب.', icon: 'layers' },
  { title: 'العناية بتراجم البخاري', text: 'أبقى المختصر على تراجم البخاري لما فيها من فقه واستنباط، فهي تعين القارئ على فهم سبب إيراد الحديث في الباب.', icon: 'lamp' },
  { title: 'ذكر الروايات المهمة', text: 'يعتني المختصر بإيراد الروايات التي تضيف معنى أو توضح لفظًا، دون إثقال القارئ بكثرة الطرق والتكرار.', icon: 'bookmark' },
  { title: 'الإشارة إلى رواية مسلم', text: 'عند وجود الحديث في صحيح مسلم، يذكر المختصر ذلك، مما يزيد القارئ معرفة بموضع الحديث في الصحيحين.', icon: 'quran' },
  { title: 'تقريب الكتاب للقارئ', text: 'الغاية من المختصر أن يكون صحيح البخاري أقرب قراءةً وفهمًا، مع تنظيم يعين القارئ وطالب العلم على المراجعة والانتفاع.', icon: 'book' },
];

const readingFlow = [
  { title: 'اختر الكتاب', text: 'ابدأ من أحد كتب المختصر بحسب الباب الذي تريد قراءته.' },
  { title: 'افتح الباب', text: 'تصفح الأبواب التي رتبت فيها الأحاديث على موضوعاتها.' },
  { title: 'اقرأ الحديث', text: 'اقرأ الحديث في عرض واضح يبرز نصه وموضوعه.' },
  { title: 'استخرج الفائدة', text: 'تأمل دلالة الحديث وموضعه في الباب لتزداد فهمًا وانتفاعًا.' },
];

const globalFeatures = [
  { icon: 'book', title: 'اختصار يقرب الصحيح', text: 'يعرض الكتاب مختصرًا منتقى من صحيح البخاري، ليقرّب مادته للقارئ وييسر الوصول إلى الأحاديث.' },
  { icon: 'layers', title: 'ترتيب على الكتب والأبواب', text: 'يسير المختصر على كتب البخاري وأبوابه، مما يجعل تصفح الموضوعات أكثر وضوحًا وتنظيمًا.' },
  { icon: 'lamp', title: 'إبراز فقه التراجم', text: 'من أبرز ما يميز الكتاب العناية بتراجم البخاري، لما فيها من دلالة على فقه الإمام واستنباطه.' },
  { icon: 'quran', title: 'تقريب السنة للقارئ', text: 'يخدم المختصر القارئ وطالب العلم، إذ يقدّم الأحاديث في صياغة منظمة تساعد على القراءة والمراجعة.' },
];

const goals = [
  'تقريب صحيح البخاري في صورة أقصر تسهّل القراءة والوصول إلى الحديث.',
  'المحافظة على الترتيب العام للكتب والأبواب في المختصر.',
  'إبراز أهمية تراجم البخاري وما فيها من فقه واستنباط.',
  'خدمة القارئ وطالب العلم في القراءة والمراجعة والانتفاع.',
];

function Icon({ type }) {
  const icons = {
    home: <><path d="M4 15 16 6l12 9"/><path d="M8 14v13h16V14"/><path d="M13 27v-8h6v8"/></>,
    menu: <><path d="M6 10h20"/><path d="M6 16h20"/><path d="M6 22h20"/></>,
    close: <><path d="M8 8l16 16"/><path d="M24 8 8 24"/></>,
    search: <><circle cx="14" cy="14" r="7"/><path d="m19.5 19.5 5 5"/></>,
    book: <><path d="M7 7c3-1.6 6-1.6 9 0v20c-3-1.6-6-1.6-9 0z"/><path d="M16 7c3-1.6 6-1.6 9 0v20c-3-1.6-6-1.6-9 0z"/><path d="M16 7v20"/></>,
    quran: <><path d="M7 8h18v20H7z"/><path d="M11 12h10"/><path d="M11 17h10"/><path d="M11 22h7"/></>,
    mosque: <><path d="M5 27h22"/><path d="M9 27V14l7-6 7 6v13"/><path d="M13 27v-7a3 3 0 0 1 6 0v7"/><path d="M16 8V4"/><path d="M14 4h4"/></>,
    dome: <><path d="M6 27h20"/><path d="M9 27v-8a7 7 0 0 1 14 0v8"/><path d="M16 12V5"/><path d="M16 5c3 0 3-2 3-2"/></>,
    minaret: <><path d="M12 27h8"/><path d="M13 27V12h6v15"/><path d="M12 12h8l-4-6z"/><path d="M16 6V3"/><path d="M14 17h4"/><path d="M14 22h4"/></>,
    lantern: <><path d="M12 8h8"/><path d="M14 8V5h4v3"/><path d="M12 8l-2 6 3 11h6l3-11-2-6"/><path d="M13 14h6"/><path d="M14 20h4"/></>,
    lamp: <><path d="M12 19h8"/><path d="M13 23h6"/><path d="M14 27h4"/><path d="M16 5a7 7 0 0 0-4 12h8A7 7 0 0 0 16 5z"/></>,
    revelation: <><path d="M16 3v8"/><path d="M10 6l4 5"/><path d="M22 6l-4 5"/><path d="M8 15h16"/><path d="M11 19h10"/><path d="M13 23h6"/><path d="M15 27h2"/></>,
    heart: <path d="M16 27S6 20.5 6 12.7A5.7 5.7 0 0 1 16 9a5.7 5.7 0 0 1 10 3.7C26 20.5 16 27 16 27z"/>,
    water: <path d="M16 4s8 8.4 8 14a8 8 0 0 1-16 0c0-5.6 8-14 8-14z"/>,
    hand: <><path d="M10 17v-5a2 2 0 0 1 4 0v4"/><path d="M14 16v-7a2 2 0 0 1 4 0v7"/><path d="M18 16v-5a2 2 0 0 1 4 0v9"/><path d="M10 17l-2-2a2.2 2.2 0 0 0-3 3l6 7c1.5 1.7 3.4 2.5 5.7 2.5H22"/></>,
    moon: <path d="M22.5 23A10 10 0 1 1 12 6.2 8.2 8.2 0 0 0 22.5 23z"/>,
    kaaba: <><path d="M7 10h18v17H7z"/><path d="M7 15h18"/><path d="M12 10v17"/><path d="M20 10v17"/></>,
    scale: <><path d="M16 5v22"/><path d="M8 9h16"/><path d="M10 9 6 18h8z"/><path d="M22 9l-4 9h8z"/><path d="M12 27h8"/></>,
    rose: <><path d="M16 18c-5-4-3-10 0-12 3 2 5 8 0 12z"/><path d="M16 18c5-3 8-1 9 3-4 2-8 1-9-3z"/><path d="M16 18c-5-3-8-1-9 3 4 2 8 1 9-3z"/><path d="M16 18v10"/></>,
    star: <path d="m16 4 3.3 7 7.7 1-5.6 5.4 1.4 7.6L16 21.4 9.2 25l1.4-7.6L5 12l7.7-1z"/>,
    copy: <><path d="M10 10h14v16H10z"/><path d="M6 22V6h14"/></>,
    arrow: <path d="M6 16h20m0 0-7-7m7 7-7 7"/>,
    check: <path d="M7 16.5 13 23 25 9"/>,
    mail: <><path d="M5 9h22v16H5z"/><path d="m5 10 11 9 11-9"/></>,
    phone: <path d="M11 5h10l2 5-4 2c1.3 3.2 3.8 5.7 7 7l-2 4-5-2C12 18 8 14 5 7z"/>,
    scroll: <><path d="M9 6h12a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h13"/><path d="M9 6a4 4 0 0 0 0 8"/><path d="M9 14a4 4 0 0 0 0 8"/><path d="M13 10h8"/><path d="M13 18h8"/></>,
    layers: <><path d="m16 4 11 6-11 6-11-6z"/><path d="M5 16l11 6 11-6"/><path d="M5 22l11 6 11-6"/></>,
    bookmark: <path d="M9 5h14v23l-7-4-7 4z"/>,
    globe: <><circle cx="16" cy="16" r="11"/><path d="M5 16h22"/><path d="M16 5c3 3 4.5 6.7 4.5 11S19 24 16 27c-3-3-4.5-6.7-4.5-11S13 8 16 5z"/></>,
    compass: <><circle cx="16" cy="16" r="11"/><path d="m20 12-2.2 5.8L12 20l2.2-5.8z"/></>,
    shield: <path d="M16 4 26 8v7c0 6.5-4.3 10.4-10 13C10.3 25.4 6 21.5 6 15V8z"/>,
    mihrab: <><path d="M8 28V14a8 8 0 0 1 16 0v14"/><path d="M12 28V15a4 4 0 0 1 8 0v13"/><path d="M5 28h22"/></>,
    geometric: <><path d="M16 3 21 11 29 16 21 21 16 29 11 21 3 16 11 11z"/><path d="M16 9 23 16 16 23 9 16z"/></>,
    spark: <><path d="M16 3v7"/><path d="M16 22v7"/><path d="M3 16h7"/><path d="M22 16h7"/><path d="m7 7 5 5"/><path d="m20 20 5 5"/><path d="m25 7-5 5"/><path d="m12 20-5 5"/></>,
  };
  return <svg className="icon" viewBox="0 0 32 32" aria-hidden="true">{icons[type] || icons.book}</svg>;
}

function getPath() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function Link({ to, className = '', children, onClick }) {
  return <a href={`#${to}`} className={className} onClick={onClick}>{children}</a>;
}

function App() {
  const [path, setPath] = useState(getPath());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setPath(getPath());
      setOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const page = useMemo(() => renderPage(path), [path]);

  return (
    <>
      <IslamicBackground />
      <Header path={path} open={open} setOpen={setOpen} />
      <main>{page}</main>
      <Footer />
    </>
  );
}

function renderPage(path) {
  if (path.startsWith('/section/')) return <SectionDetailPage slug={path.replace('/section/', '')} />;
  switch (path) {
    case '/': return <HomePage />;
    case '/about': return <AboutPage />;
    case '/method': return <MethodPage />;
    case '/sections': return <SectionsPage />;
    case '/hadiths': return <HadithsPage />;
    case '/reader': return <ReaderPage />;
    case '/request': return <RequestPage />;
    case '/contact': return <ContactPage />;
    default: return <NotFoundPage />;
  }
}

function Header({ path, open, setOpen }) {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand" aria-label="مختصر البخاري">
          <span className="brand-icon"><Icon type="mihrab" /></span>
          <img className="brand-wordmark" src={headerLogo} alt="مختصر البخاري" />
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="فتح القائمة">
          <Icon type={open ? 'close' : 'menu'} />
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={path === item.path ? 'active' : ''}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/reader" className={`outline-btn ${path === '/reader' ? 'active' : ''}`}><Icon type="book" /> قراءة الآن</Link>
          <Link to="/request" className={`outline-btn gold ${path === '/request' ? 'active' : ''}`}><Icon type="copy" /> طلب نسخة</Link>
        </div>
      </div>
    </header>
  );
}

function IslamicBackground() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <span className="grid-pattern" />
      <span className="lux-orb orb-1" />
      <span className="lux-orb orb-2" />
      <div className="floating-arch arch-1"><Icon type="minaret" /></div>
      <div className="floating-arch arch-2"><Icon type="mosque" /></div>
      <div className="floating-arch arch-3"><Icon type="lantern" /></div>
      <div className="floating-star star-1"><Icon type="geometric" /></div>
      <div className="floating-star star-2"><Icon type="spark" /></div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero-section container wide-container">
        <div className="hero-card ornamental-card">
          <div className="hero-copy">
            <span className="eyebrow"><Icon type="quran" /> من صحيح البخاري إلى قراءة ميسّرة</span>
            <h1>قراءة مرتبة تليق بالسُّنّة</h1>
            <p>عرض رقمي هادئ يساعدك على الوصول إلى الأحاديث وفهم مواضعها بين الكتب والأبواب.</p>
            <div className="hero-actions">
              <Link to="/reader" className="primary-btn"><Icon type="book" /> ابدأ القراءة</Link>
              <Link to="/sections" className="secondary-btn"><Icon type="compass" /> تصفح الأقسام</Link>
            </div>
          </div>
          <HeroShowcase />
          <MosqueSilhouette />
        </div>
      </section>

      <SearchPanel />
      <StatsBand />
      <GlobalFeatures />
      <KnowledgeJourney />
      <FeaturedSections />
      <HadithPreview />
    </>
  );
}

function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-hidden="true">
      <div className="premium-book">
        <div className="book-edge" />
        <div className="book-face book-face-logo">
          <img className="book-cover-logo" src={bookLogo} alt="مختصر البخاري" />
          <small>كتب • أبواب • أحاديث</small>
        </div>
      </div>
      <div className="halo-ring" />
      <div className="mini-card c1"><Icon type="book" /><span>أحاديث مختصرة</span></div>
      <div className="mini-card c2"><Icon type="layers" /><span>كتب وأبواب البخاري</span></div>
    </div>
  );
}

function MosqueSilhouette() {
  return (
    <div className="mosque-silhouette" aria-hidden="true">
      <span className="dome d1" /><span className="dome d2" /><span className="dome d3" />
      <span className="tower t1" /><span className="tower t2" />
      <span className="base" />
    </div>
  );
}

function SearchPanel() {
  return (
    <section className="container search-zone">
      <div className="search-card premium-surface">
        <label className="search-field"><Icon type="search" /><input placeholder="ابحث باسم الحديث، الراوي، الكتاب أو الباب..." /></label>
        <select defaultValue=""><option value="">نوع البحث</option><option>حديث</option><option>كتاب</option><option>موضوع</option><option>راوٍ</option></select>
        <select defaultValue=""><option value="">التصنيف</option>{sections.slice(0, 8).map(s => <option key={s.slug}>{s.title}</option>)}</select>
        <button><Icon type="search" /> ابحث هنا</button>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { icon: 'quran', number: '1328', label: 'صفحة في الملف' },
    { icon: 'layers', number: 'كتب', label: 'مرتبة على أبواب' },
    { icon: 'book', number: '6', label: 'أحاديث مختارة' },
    { icon: 'shield', number: 'تدقيق', label: 'قبل النشر النهائي' },
  ];
  return (
    <section className="container stats-band wide-container">
      <div className="stats-inner ornamental-card">
        {stats.map(stat => <div className="stat-card" key={stat.label}><span><Icon type={stat.icon} /></span><strong>{stat.number}</strong><small>{stat.label}</small></div>)}
      </div>
    </section>
  );
}

function GlobalFeatures() {
  return (
    <section className="container section-block">
      <SectionTitle kicker="من معالم الكتاب" title="مختصر البخاري: كتاب يجمع بين الاختصار وحسن الترتيب" text="يقدّم هذا المختصر أحاديث صحيح البخاري في صورة أقرب للقارئ، مع المحافظة على الترتيب العلمي للكتب والأبواب، وإبراز ما يعين على فهم مقصود الإمام البخاري في التبويب والاختيار." />
      <div className="feature-grid">
        {globalFeatures.map(feature => (
          <article className="feature-card" key={feature.title}>
            <span><Icon type={feature.icon} /></span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function KnowledgeJourney() {
  return (
    <section className="container section-block journey-section">
      <div className="journey-panel ornamental-card">
        <div className="journey-intro">
          <span className="kicker">طريقة الانتفاع بالكتاب</span>
          <h2>من الكتاب إلى الحديث ثم إلى الفائدة</h2>
          <p>يعرض مختصر البخاري الأحاديث في ترتيب منظم بحسب الكتب والأبواب، مما يعين القارئ على الوصول إلى الحديث وفهم موضعه.</p>
          <Link to="/method" className="secondary-btn"><Icon type="lamp" /> منهج المختصر</Link>
        </div>
        <div className="journey-steps">
          {readingFlow.map((step, index) => (
            <div className="journey-step" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSections() {
  return (
    <section className="container section-block">
      <SectionTitle kicker="كتب المختصر" title="الأقسام الرئيسية في مختصر البخاري" text="يتضمن مختصر البخاري عددًا من الكتب والأبواب المرتبة على موضوعاتها، ليصل القارئ إلى الحديث في موضعه العلمي المناسب." />
      <div className="sections-grid compact">
        {sections.slice(0, 8).map(section => <SectionCard key={section.slug} section={section} />)}
      </div>
      <div className="center-actions"><Link to="/sections" className="secondary-btn"><Icon type="arrow" /> عرض جميع الأقسام</Link></div>
    </section>
  );
}

function HadithPreview() {
  return (
    <section className="container section-block hadith-preview-block">
      <SectionTitle kicker="مختارات من الكتاب" title="أحاديث مختارة من مختصر البخاري" text="تضم هذه النافذة عددًا من الأحاديث المختارة من أبواب الكتاب، مع بيان موضع الحديث وراويه في عرض واضح يعين على القراءة والانتفاع." />
      <div className="hadith-grid">
        {hadiths.slice(0, 3).map(hadith => <HadithCard key={hadith.id} hadith={hadith} />)}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageTitle kicker="عن الكتاب" title="مختصر البخاري: تعريف بالكتاب ومنهجه" text="صفحة مخصصة للتعريف بكتاب مختصر البخاري، وبيان هدفه، ومنهج اختصاره، وأبرز ما يعين القارئ على الانتفاع به." />
      <section className="container section-block about-layout">
        <article className="paper-panel large-panel">
          <span className="panel-icon"><Icon type="quran" /></span>
          <h2>فكرة الكتاب</h2>
          <p>مختصر البخاري كتابٌ يُقرِّب أحاديث صحيح البخاري إلى القارئ في صورة مختصرة ومنظمة، مع العناية بترتيب الكتب والأبواب، وإبراز ما يعين على فهم الحديث وموضعه في الباب.</p>
          <div className="values-row">
            <span>اختصار نافع</span><span>كتب وأبواب</span><span>تراجم البخاري</span><span>تقريب السنة</span>
          </div>
        </article>
        <aside className="about-side">
          <div className="mihrab-card"><Icon type="book" /><h3>التعريف بالكتاب</h3><p>الكتاب هو: مختصر البخاري، اختصره الشيخ صالح بن محمد بن عبد الله النجيدي، ليكون أقرب تناولًا وأيسر قراءة من الأصل المطول.</p></div>
          <div className="mihrab-card gold"><Icon type="compass" /><h3>هدف المختصر</h3><p>يهدف المختصر إلى تيسير قراءة أحاديث صحيح البخاري وتقريب مادته للقارئ، مع المحافظة على البناء العلمي للكتاب وترتيبه العام.</p></div>
        </aside>
      </section>
      <section className="container goals-strip">
        {goals.map((goal, index) => <div className="goal-pill" key={goal}><span>{index + 1}</span>{goal}</div>)}
      </section>
    </>
  );
}

function MethodPage() {
  return (
    <>
      <PageTitle kicker="منهج المختصر" title="طريقة الشيخ النجيدي في اختصار صحيح البخاري" text="توضح هذه الصفحة أبرز معالم المنهج الذي سار عليه المختصر في تقريب أحاديث صحيح البخاري، مع المحافظة على ترتيب الكتب والأبواب، والعناية بتراجم البخاري والروايات المهمة." />
      <section className="container section-block method-grid">
        {methodSteps.map((step, index) => <MethodCard key={step.title} step={step} index={index} />)}
      </section>
      <section className="container warning-panel ornamental-card">
        <Icon type="shield" />
        <div><h3>تنبيه علمي</h3><p>يعتمد الموقع في عرضه على كتاب مختصر البخاري، ومع إدخال كامل مادة الكتاب لاحقًا يجب مراجعة نصوص الأحاديث والأبواب مراجعة علمية دقيقة قبل النشر النهائي.</p></div>
      </section>
    </>
  );
}

function MethodCard({ step, index }) {
  return (
    <article className="method-card">
      <span className="method-number">{index + 1}</span>
      <div className="method-arch"><Icon type={step.icon} /></div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </article>
  );
}

function SectionsPage() {
  const [query, setQuery] = useState('');
  const filtered = sections.filter(section => `${section.title} ${section.desc} ${section.level} ${section.topics.join(' ')}`.includes(query));
  return (
    <>
      <PageTitle kicker="كتب المختصر" title="الأقسام الرئيسية في مختصر البخاري" text="تصفح كتب مختصر البخاري كما رُتبت في أبوابها، للوصول إلى الحديث في موضعه العلمي المناسب، مع عرض واضح يعين على القراءة والمراجعة." />
      <section className="container toolbar"><label><Icon type="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث في الكتب والأبواب..." /></label></section>
      <section className="container section-block sections-grid">
        {filtered.map(section => <SectionCard key={section.slug} section={section} />)}
      </section>
    </>
  );
}

function SectionCard({ section }) {
  return (
    <Link to={`/section/${section.slug}`} className="section-card">
      <div className="section-visual"><Icon type={section.icon} /></div>
      <div className="section-meta"><span>{section.level}</span><span>أبواب مختارة</span></div>
      <h3>{section.title}</h3>
      <p>{section.desc}</p>
      <div className="tags">{section.topics.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
      <b className="section-open">فتح القسم <Icon type="arrow" /></b>
    </Link>
  );
}

function SectionDetailPage({ slug }) {
  const section = sections.find(item => item.slug === slug) || sections[0];
  const related = hadiths.filter(hadith => hadith.section === section.slug);
  const list = related.length ? related : hadiths.slice(0, 2);
  return (
    <>
      <PageTitle kicker="كتاب من المختصر" title={`كتاب ${section.title}`} text={section.desc} />
      <section className="container section-block detail-layout">
        <aside className="detail-side ornamental-card">
          <Icon type={section.icon} />
          <h3>موضع القسم</h3>
          <p>يعرض هذا القسم أحاديث مرتبطة بكتاب <strong>{section.title}</strong>، مع وسوم تساعد القارئ على التعرف إلى موضوعه العام.</p>
          <div className="tags vertical">{section.topics.map(tag => <span key={tag}>{tag}</span>)}</div>
        </aside>
        <div className="detail-content">
          <article className="paper-panel"><h2>طريقة القراءة</h2><p>ابدأ بقراءة الحديث في موضعه، ثم راجع الكتاب والموضوع والراوي، لتبقى الصلة واضحة بين النص وبابه.</p></article>
          <div className="mini-index">
            <div><Icon type="layers" /><strong>الكتاب</strong><small>{section.title}</small></div>
            <div><Icon type="book" /><strong>الأحاديث</strong><small>مختارة للعرض</small></div>
            <div><Icon type="bookmark" /><strong>الموضوعات</strong><small>{section.topics[0]}</small></div>
          </div>
          <h2 className="sub-heading">أحاديث مرتبطة</h2>
          <div className="hadith-list">{list.map(hadith => <HadithCard key={hadith.id} hadith={hadith} />)}</div>
        </div>
      </section>
    </>
  );
}

function HadithsPage() {
  const [query, setQuery] = useState('');
  const filtered = hadiths.filter(hadith => `${hadith.title} ${hadith.text} ${hadith.book} ${hadith.topic} ${hadith.narrator}`.includes(query));
  return (
    <>
      <PageTitle kicker="مختارات من الكتاب" title="أحاديث مختارة من مختصر البخاري" text="مجموعة من أحاديث الكتاب، مرتبة بحسب الكتاب والباب، مع ذكر الراوي ونص الحديث المختصر وما يعين القارئ على فهم موضعه." />
      <section className="container toolbar"><label><Icon type="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث باسم الحديث أو الراوي أو الكتاب..." /></label></section>
      <section className="container section-block hadith-grid">{filtered.map(hadith => <HadithCard key={hadith.id} hadith={hadith} />)}</section>
    </>
  );
}

function HadithCard({ hadith }) {
  return (
    <article className="hadith-card">
      <div className="hadith-top"><span>{hadith.book}</span><span>{hadith.topic}</span></div>
      <h3>{hadith.title}</h3>
      <p className="quote">«{hadith.text}»</p>
      <p className="narrator">الراوي: {hadith.narrator}</p>
      <small>{hadith.note}</small>
      <button className="read-more">عرض التفاصيل <Icon type="arrow" /></button>
    </article>
  );
}

function ReaderPage() {
  const [selected, setSelected] = useState(hadiths[0]);
  return (
    <>
      <PageTitle kicker="قارئ الحديث" title="قراءة الآن" text="اختر حديثًا من مختصر البخاري، واقرأ نصه مع بيان الكتاب والموضوع والراوي، وما يعين على فهم موضعه في المختصر." />
      <section className="container section-block reader-layout">
        <aside className="reader-list">
          <h3>أحاديث مختارة</h3>
          {hadiths.map(hadith => <button key={hadith.id} onClick={() => setSelected(hadith)} className={selected.id === hadith.id ? 'active' : ''}>{hadith.title}<small>{hadith.book}</small></button>)}
        </aside>
        <article className="reader-panel ornamental-card">
          <div className="reader-tabs"><span className="active">المتن</span><span>تراجم البخاري</span><span>الروايات</span></div>
          <h2>{selected.title}</h2>
          <p className="reader-quote">«{selected.text}»</p>
          <div className="reader-meta"><span>الكتاب: {selected.book}</span><span>الموضوع: {selected.topic}</span><span>الراوي: {selected.narrator}</span></div>
          <div className="reader-note"><Icon type="lamp" /><p>{selected.note}</p></div>
        </article>
      </section>
    </>
  );
}

function RequestPage() {
  return (
    <>
      <PageTitle kicker="طلب نسخة" title="اطلب نسخة أو أرسل ملاحظة" text="لطلب نسخة من الكتاب أو إرسال ملاحظة حول النص أو الفهرسة." />
      <section className="container section-block contact-layout">
        <ContactForm button="إرسال الطلب" messageLabel="تفاصيل الطلب" textareaPlaceholder="اكتب طلبك هنا" />
        <aside className="contact-side ornamental-card"><Icon type="copy" /><h3>طلبات مناسبة</h3><p>طلب نسخة PDF، اقتراح باب، إرسال تصحيح، أو المساعدة في مراجعة النصوص.</p></aside>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageTitle kicker="تواصل معنا" title="تواصل معنا" text="لأي ملاحظة علمية، أو اقتراح لتحسين عرض الكتاب، أو تنبيه على خطأ في النص أو الفهرسة." />
      <section className="container section-block contact-layout">
        <ContactForm button="إرسال الملاحظة" messageLabel="نص الرسالة" textareaPlaceholder="اكتب ملاحظتك أو اقتراحك هنا" />
        <aside className="contact-side ornamental-card"><Icon type="mail" /><h3>خدمة الكتاب ومراجعته</h3><p>نرحب بالملاحظات التي تعين على تحسين عرض مختصر البخاري، خاصة ما يتعلق بنصوص الأحاديث، أو أسماء الكتب والأبواب، أو ترتيب المحتوى وفهرسته.</p><div className="contact-icons"><Icon type="mail" /></div></aside>
      </section>
    </>
  );
}

function ContactForm({ button, messageLabel, textareaPlaceholder = 'اكتب رسالتك هنا' }) {
  return (
    <form className="contact-form" onSubmit={e => e.preventDefault()}>
      <label>الاسم<input placeholder="اكتب اسمك" /></label>
      <label>البريد الإلكتروني<input placeholder="example@email.com" /></label>
      <label>رقم الهاتف<input placeholder="اختياري" /></label>
      <label>{messageLabel}<textarea placeholder={textareaPlaceholder} /></label>
      <button><Icon type="arrow" /> {button}</button>
    </form>
  );
}

function PageTitle({ kicker, title, text }) {
  return (
    <section className="page-title container">
      <div className="title-arch"><Icon type="mihrab" /></div>
      <span>{kicker}</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </section>
  );
}

function SectionTitle({ kicker, title, text }) {
  return <div className="section-title"><span>{kicker}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function NotFoundPage() {
  return <><PageTitle kicker="صفحة غير موجودة" title="لم نجد هذه الصفحة" text="يمكنك العودة إلى الرئيسية أو اختيار صفحة من القائمة." /><section className="container center-actions"><Link to="/" className="primary-btn">العودة للرئيسية</Link></section></>;
}

function Footer() {
  return (
    <footer className="container site-footer ornamental-card">
      <div className="newsletter">
        <h3>تابع تحديثات الموقع</h3>
        <label><Icon type="mail" /><input placeholder="البريد الإلكتروني" /></label>
        <button>اشترك</button>
      </div>
      <div className="footer-brand">
        <div className="brand white"><span className="brand-icon"><Icon type="mihrab" /></span><img className="footer-wordmark" src={headerLogo} alt="مختصر البخاري" /></div>
        <p>موقع يُعنى بعرض كتاب مختصر البخاري في صورة رقمية منظمة، تساعد على تصفح الكتب والأبواب، وقراءة الأحاديث، والانتفاع بمحتوى الكتاب بصورة أوضح.</p>
      </div>
      <div className="footer-links"><h4>الصفحات</h4>{navItems.map(item => <Link key={item.path} to={item.path}>{item.label}</Link>)}</div>
      <div className="footer-links"><h4>روابط سريعة</h4><Link to="/reader">قراءة الآن</Link><Link to="/request">طلب نسخة</Link><Link to="/sections">الأقسام</Link></div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
