document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Sticky Header scroll effect
    // ==========================================================================
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================================================
    // 2. Mobile Menu Toggle
    // ==========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // 3. Scroll Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 4. Active Section Nav Link Highlighting (Robust Scrollspy)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const handleScrollActiveLink = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.45; // 45% midline trigger
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollActiveLink);
    handleScrollActiveLink();

    // ==========================================================================
    // 5. Multi-Language Switcher (i18n)
    // ==========================================================================
    const TRANSLATIONS = {
        ja: {
            "nav-top": "Top",
            "nav-concept": "Concept",
            "nav-menu": "Menu",
            "nav-gallery": "Gallery",
            "nav-access": "Access",
            
            "hero-subtitle": "阿蘇五岳を望む、久住高原の小さなカフェ",
            "hero-tagline": "穏やかな風と山々の稜線、エスプレッソが薫る贅沢な時間。",
            "hero-btn-story": "Story",
            "hero-btn-menu": "Menu",
            "hero-scroll": "Scroll Down",
            
            "concept-subtitle": "Our Story",
            "concept-title": "たぬきが繋ぐ、高原の温もり",
            "concept-desc-1": "大分県竹田市久住町ののどかな高原に佇む「Cafe Procione（カフェ プロチオーネ）」は、2025年9月にオープンしました。",
            "concept-desc-2": "かつてこの場所で愛されていた田舎料理店「たぬき八」の跡地を受け継ぎ、移住してきた私たちオーナー夫婦が自らの手でDIYリノベーションを行って、温もりあふれるカフェへと生まれ変わりました。",
            "concept-desc-3": "イタリア語で「たぬき」を意味する「プロチオーネ」。かつての記憶に敬意を払いながら、訪れる人々が久住の壮大な自然に包まれて、ゆったりとした時間を過ごせる場所でありたいと願っています。",
            
            "features-subtitle": "How to Spend Time",
            "features-title": "Cafe Procione での過ごし方",
            "features-lead": "窓の外に広がる景色を眺めながら、コーヒーを一杯。仕事の続きをしてもいい、本を読んでもいい、ただぼんやりしていてもいい。時計を気にしなくていい時間が、ここにはあります。",
            "feature-item-title-1": "ドライブの途中に",
            "feature-item-desc-1": "阿蘇五岳を眺めながら、美味しいコーヒーを一杯。",
            "feature-item-title-2": "高原の爽やかな朝に",
            "feature-item-desc-2": "数量限定のモーニングプレートで贅沢な一日のスタート。",
            "feature-item-title-3": "Wi-Fi完備の窓際席で",
            "feature-item-desc-3": "旅の計画をじっくり立てたり、お仕事の続きに集中したり。",
            "feature-item-title-4": "雨のしっとりした日に",
            "feature-item-desc-4": "煙る山々の稜線を眺めながら、本の世界に没頭する読書時間。",
            "feature-item-title-5": "アウトドアの合間に",
            "feature-item-desc-5": "近隣でのキャンプや温泉の前後、のんびりと静かな休憩時間を。",
            
            "menu-subtitle": "Cafe Menu",
            "menu-title": "おすすめメニュー",
            "menu-tag-1": "看板メニュー",
            "menu-item-title-1": "たぬき印のホットサンド",
            "menu-item-desc-1": "可愛い「たぬき」の焼き印が押された当店自慢のホットサンド。定番のハム＆チーズから甘めのブルーベリー＆クリームチーズまでご用意。耳は落として、ふんわりホイップを添えて提供しています。",
            "menu-item-price-1": "¥550 〜",
            "menu-tag-2": "Espresso",
            "menu-item-title-2": "エスプレッソ & カフェラテ",
            "menu-item-desc-2": "こだわりの焙煎所から仕入れたスペシャルティコーヒーを使用。専用のマシンで丁寧に抽出した薫り高いエスプレッソとカフェラテ（ラテアート）に加え、カフェモカやキャラメルラテなどの甘めのアレンジドリンクもお楽しみいただけます。",
            "menu-item-price-2": "¥400 〜",
            "menu-tag-3": "Morning",
            "menu-item-title-3": "モーニングプレート [数量限定]",
            "menu-item-desc-3": "自家製パン2種、地元産の卵とベーコンの絶品ベーコンエッグ、サラダ、スープ、ミニヨーグルトに、コーヒーまたは紅茶が付いた数量限定モーニングプレート。ドリンクは+100円でご変更いただけます。高原での心地よい朝活にぜひどうぞ。",
            "menu-item-price-3": "¥1,380",
            "menu-tag-4": "Ambiance",
            "menu-item-title-4": "カフェ空間・ノマド利用",
            "menu-item-desc-4": "窓からの絶景を眺めながら、読書やお仕事に集中できる落ち着いた空間です。一部の座席には電源・USB充電ポートも完備。美味しいドリンクとともに、クリエイティブな時間をお過ごしください。",
            "menu-item-price-4": "Free Wi-Fi",
            
            "gallery-subtitle": "Visual Story",
            "gallery-title": "ギャラリー",
            "gallery-item-title-1": "朝の光と高原の朝食",
            "gallery-item-desc-1": "窓辺で味わう自家製のモーニングプレートとあたたかいカフェラテ",
            "gallery-item-title-2": "メロンソーダフロート",
            "gallery-item-desc-2": "青空に映える、爽快なメロンソーダと冷たいソフトクリーム",
            "gallery-item-title-3": "自家製プリン",
            "gallery-item-desc-3": "地元・久住産の卵のコクとほろ苦いカラメルソースが絶妙な、昔ながらの自家製プリン。",
            "gallery-item-title-4": "夕暮れの久住高原",
            "gallery-item-desc-4": "阿蘇五岳の彼方に沈む夕日と、黄金色に染まる草原の一本の木",
            "gallery-item-title-6": "野の花とテラスベンチ",
            "gallery-item-desc-6": "庭に咲く真っ白なマーガレットと、心地よい風が通り抜けるベンチ",
            "gallery-item-title-7": "窓辺の特等席",
            "gallery-item-desc-7": "木漏れ日が差し込む窓辺で、爽やかなベリーソーダを楽しむひととき",
            "gallery-item-title-8": "珈琲時間",
            "gallery-item-desc-8": "美しいラテアートと自家製のチョコチャンククッキー",
            "gallery-item-title-9": "高原のテラスベンチ",
            "gallery-item-desc-9": "木陰の特等席から、阿蘇の山並みを一人占めする贅沢",
            "gallery-item-title-10": "Cafe Procione 木製看板",
            "gallery-item-desc-10": "たぬきをモチーフにした温もりある手作り看板",
            "gallery-item-title-11": "カウンター席と阿蘇五岳",
            "gallery-item-desc-11": "大きな窓に面した特等席から、遮るもののない阿蘇五岳の絶景を眺める",
            "gallery-item-title-12": "ふたつのカフェラテ",
            "gallery-item-desc-12": "テーブルに並ぶ、ハートとリーフの美しいラテアート",
            
            "access-subtitle": "Information",
            "access-title": "営業時間・アクセス",
            "access-label-address": "住所",
            "access-value-address": "〒878-0205 大分県竹田市久住町大字白丹7577-2",
            "access-label-hours": "営業時間",
            "access-value-hours": "9:00 〜 16:00 (ラストオーダー 15:30)",
            "access-label-closed": "定休日",
            "access-value-closed": "日曜日・月曜日",
            "access-label-parking": "駐車場",
            "access-value-parking": "あり",
            "access-label-wifi": "Wi-Fi / 作業利用",
            "access-value-wifi": "Wi-Fiあり / 作業利用可",
            "access-label-payment": "お支払い方法",
            "access-value-payment": "各種キャッシュレス決済対応",
            "access-label-sns": "Instagram",
            "access-btn-maps": "Google Mapsで開く",
            "access-btn-insta": "Instagramを見る",
            
            "footer-tag": "阿蘇五岳を望む、久住高原の小さなカフェ",
            "map-iframe-title": "Cafe Procioneの地図"
        },
        en: {
            "nav-top": "Top",
            "nav-concept": "Concept",
            "nav-menu": "Menu",
            "nav-gallery": "Gallery",
            "nav-access": "Access",
            
            "hero-subtitle": "A small cafe in Kuju Highlands, overlooking the Aso Five Peaks",
            "hero-tagline": "Gentle breeze, mountain ridges, and a premium espresso time.",
            "hero-btn-story": "Story",
            "hero-btn-menu": "Menu",
            "hero-scroll": "Scroll Down",
            
            "concept-subtitle": "Our Story",
            "concept-title": "Warmth of the Highlands, Connected by the Raccoon Dog",
            "concept-desc-1": "Located in the peaceful Kuju Highlands of Taketa City, Oita Prefecture, 'Cafe Procione' opened in September 2025.",
            "concept-desc-2": "Inheriting the site of 'Tanuki-hachi,' a beloved local countryside diner, we (the owner couple who migrated here) fully renovated the space by hand to create a warm, cozy cafe.",
            "concept-desc-3": "Inspired by the memory of “Tanuki-hachi,” the former countryside restaurant on this site, Cafe Procione carries a small raccoon-dog motif as a symbol of warmth and welcome.",
            
            "features-subtitle": "How to Spend Time",
            "features-title": "How to spend time at Cafe Procione",
            "features-lead": "A cup of coffee while looking at the scenery spreading outside. You can work, read a book, or just daydream. A peaceful time where you don't have to worry about the clock is here.",
            "feature-item-title-1": "During your drive",
            "feature-item-desc-1": "Take a break with a cup of delicious coffee while overlooking the Aso Five Peaks.",
            "feature-item-title-2": "On a refreshing morning",
            "feature-item-desc-2": "Start your day with our limited-quantity morning breakfast plate.",
            "feature-item-title-3": "By the window with Wi-Fi",
            "feature-item-desc-3": "Plan your travel route or catch up on work in a quiet window seat.",
            "feature-item-title-4": "On a cozy rainy day",
            "feature-item-desc-4": "Immerse yourself in a book while watching the misty mountain ridges.",
            "feature-item-title-5": "Before or after outdoor activities",
            "feature-item-desc-5": "Enjoy a quiet rest stop between camping or hot spring visits in the area.",
            
            "menu-subtitle": "Cafe Menu",
            "menu-title": "Recommended Menu",
            "menu-tag-1": "Specialty",
            "menu-item-title-1": "Branded Hot Sandwich",
            "menu-item-desc-1": "Our signature hot sandwich stamped with our cute raccoon dog logo. We offer flavors from classic ham & cheese to sweet Blueberry & Cream Cheese. Served with the crusts removed and fluffy whipped cream.",
            "menu-item-price-1": "¥550 ~",
            "menu-tag-2": "Espresso",
            "menu-item-title-2": "Espresso & Cafe Latte",
            "menu-item-desc-2": "We use specialty coffee beans sourced from a select roastery. Enjoy rich, aromatic espresso and cafe latte (with beautiful latte art) pulled from our professional machine, alongside sweet specialty drinks like cafe mocha and caramel latte.",
            "menu-item-price-2": "¥400 ~",
            "menu-tag-3": "Morning",
            "menu-item-title-3": "Morning Plate [Limited]",
            "menu-item-desc-3": "A limited breakfast plate featuring two types of homemade bread, delicious local bacon and eggs, salad, soup, mini yogurt, and coffee or tea. You can change your drink for +100 yen. Please enjoy for a refreshing morning start in the highlands.",
            "menu-item-price-3": "¥1,380",
            "menu-tag-4": "Ambiance",
            "menu-item-title-4": "Workspace & Cozy Seat",
            "menu-item-desc-4": "A quiet and calm space where you can read, work, or focus while looking at the stunning view outside. Some seats are equipped with power outlets and USB charging ports. Free high-speed Wi-Fi available.",
            "menu-item-price-4": "Free Wi-Fi",
            
            "gallery-subtitle": "Visual Story",
            "gallery-title": "Gallery",
            "gallery-item-title-1": "Morning Light & Highland Breakfast",
            "gallery-item-desc-1": "Enjoying homemade morning plate and warm cafe latte by the window.",
            "gallery-item-title-2": "Melon Soda Float",
            "gallery-item-desc-2": "Refreshing green melon soda topped with rich soft-serve ice cream under the blue sky.",
            "gallery-item-title-3": "Homemade Pudding",
            "gallery-item-desc-3": "Classic firm pudding made with rich local Kuju eggs and bittersweet caramel sauce.",
            "gallery-item-title-4": "Sunset at Kuju Highlands",
            "gallery-item-desc-4": "Sunset sinking beyond the Aso Peaks, and the single tree in the golden meadow.",
            "gallery-item-title-6": "Wildflowers & Terrace Bench",
            "gallery-item-desc-6": "Pure white marguerites blooming in the garden with a relaxing bench in the breeze.",
            "gallery-item-title-7": "Special Window Seat",
            "gallery-item-desc-7": "A relaxing moment enjoying a refreshing berry soda by the sunlit window.",
            "gallery-item-title-8": "Coffee Time",
            "gallery-item-desc-8": "Beautiful espresso latte art paired with freshly baked homemade chocolate chunk cookies.",
            "gallery-item-title-9": "Highland Terrace Bench",
            "gallery-item-desc-9": "The luxury of having the Aso peaks all to yourself from the best seat in the shade.",
            "gallery-item-title-10": "Wooden Signboard",
            "gallery-item-desc-10": "Our warm, handmade wooden sign featuring the raccoon dog logo.",
            "gallery-item-title-11": "Counter Seats & Aso Peaks",
            "gallery-item-desc-11": "Overlook the unobstructed, magnificent Aso Peaks from our special window-counter seats.",
            "gallery-item-title-12": "Two Cafe Lattes",
            "gallery-item-desc-12": "Beautiful heart and leaf latte art served side-by-side on a wooden table.",
            
            "access-subtitle": "Information",
            "access-title": "Hours & Location",
            "access-label-address": "Address",
            "access-value-address": "7577-2 Shiratan, Kuju-machi, Taketa City, Oita Prefecture (878-0205)",
            "access-label-hours": "Hours",
            "access-value-hours": "9:00 AM - 4:00 PM (Last Order 3:30 PM)",
            "access-label-closed": "Closed",
            "access-value-closed": "Sundays and Mondays",
            "access-label-parking": "Parking",
            "access-value-parking": "Available (Free)",
            "access-label-wifi": "Wi-Fi & Work",
            "access-value-wifi": "Free Wi-Fi / Work-friendly",
            "access-label-payment": "Payment Methods",
            "access-value-payment": "Various cashless payments accepted",
            "access-label-sns": "Instagram",
            "access-btn-maps": "Open in Google Maps",
            "access-btn-insta": "Follow Instagram",
            
            "footer-tag": "A small cafe in Kuju Highlands, overlooking the Aso Five Peaks",
            "map-iframe-title": "Map of Cafe Procione"
        },
        zh: {
            "nav-top": "首页",
            "nav-concept": "概念",
            "nav-menu": "菜单",
            "nav-gallery": "画廊",
            "nav-access": "位置",
            
            "hero-subtitle": "俯瞰阿苏五岳，久住高原的温馨咖啡馆",
            "hero-tagline": "和煦的山风、连绵的群山，以及一杯浓缩咖啡的惬意时光。",
            "hero-btn-story": "Story",
            "hero-btn-menu": "Menu",
            "hero-scroll": "向下滑动",
            
            "concept-subtitle": "Our Story",
            "concept-title": "由狸猫连接的，高原之温情",
            "concept-desc-1": "“Cafe Procione（狸猫咖啡馆）”坐落于大分县竹田市久住町的宁静高原上，于2025年9月正式开业。",
            "concept-desc-2": "这里承载着曾经深受当地人喜爱的乡土料理店“たぬき八（狸八）”的记忆。我们作为移居至此的店主夫妇，亲手进行DIY改造，将其改造成一家充满温馨手作感的咖啡馆。",
            "concept-desc-3": "“Procione”在意大利语中意为“浣熊”。为了继承这片土地上原有的“たぬき八（Tanuki-hachi）”田舍料理店的记忆，Cafe Procione带有一只小狸猫的图案设计，作为温馨与热烈欢迎的象征。",
            
            "features-subtitle": "How to Spend Time",
            "features-title": "在 Cafe Procione 的温馨时光",
            "features-lead": "一边眺望窗外绵延的风景，一边享用咖啡。或许是继续工作、或许是静心看书，亦或是单纯地放空发呆。在这里，您可以忘却时间的流逝，静享悠闲时光。",
            "feature-item-title-1": "自驾游的途中",
            "feature-item-desc-1": "稍作停留，一边眺望阿苏五岳的壮丽景色，一边享用美味咖啡。",
            "feature-item-title-2": "高原清爽的晨曦",
            "feature-item-desc-2": "享用限量的精致早餐拼盘，开启充满仪式感的一天。",
            "feature-item-title-3": "提供无线网络（Wi-Fi）的窗边席位",
            "feature-item-desc-3": "在安静的窗边座位上规划您的旅行行程，或是专注处理未完的工作。",
            "feature-item-title-4": "细雨绵绵的安宁日子",
            "feature-item-desc-4": "凝视着雨雾缭绕的连绵山峦，沉浸在舒适的阅读世界中。",
            "feature-item-title-5": "户外运动的闲暇之余",
            "feature-item-desc-5": "在附近露营或泡温泉的休息间隔，享受一段安逸静谧的休憩时光。",
            
            "menu-subtitle": "Cafe Menu",
            "menu-title": "推荐餐点",
            "menu-tag-1": "招牌",
            "menu-item-title-1": "狸猫印花热压三明治",
            "menu-item-desc-1": "印有可爱“狸猫”图案的招牌热压三明治。提供从经典的火腿芝士到甜甜的蓝莓奶油芝士等多种口味。面包边已切掉，并附赠松软的鲜奶油。",
            "menu-item-price-1": "¥550 〜",
            "menu-tag-2": "Espresso",
            "menu-item-title-2": "浓缩咖啡 & 拿铁",
            "menu-item-desc-2": "使用从精选烘焙所采购的精品咖啡豆。除了使用专用咖啡机精心意式浓缩，与细腻奶泡交融成精美的拿铁拉花之外，店内还提供摩卡咖啡、焦糖拿铁等口味香甜的花式饮品。",
            "menu-item-price-2": "¥400 〜",
            "menu-tag-3": "Morning",
            "menu-item-title-3": "限量早餐拼盘 [数量限定]",
            "menu-item-desc-3": "限量供应的早餐拼盘，包含两种手工面包、当地特产鸡蛋和培根制作的培根煎蛋、沙拉、汤、小份酸奶以及咖啡或红茶。加100日元可更换其他饮品。非常欢迎在高原开启您舒适的清晨活力时光。",
            "menu-item-price-3": "¥1,380",
            "menu-tag-4": "Ambiance",
            "menu-item-title-4": "咖啡办公 & 休闲空间",
            "menu-item-desc-4": "您可以一边眺望窗外的绝佳美景，一边静心阅读或办公。部分座位配备电源插座及USB充电接口。店内提供免费高速无线网络（Wi-Fi）。",
            "menu-item-price-4": "免费 Wi-Fi",
            
            "gallery-subtitle": "Visual Story",
            "gallery-title": "相册画廊",
            "gallery-item-title-1": "晨光与高原早餐",
            "gallery-item-desc-1": "靠窗享用手工早餐拼盘与温暖的拿铁咖啡",
            "gallery-item-title-2": "哈密瓜冰淇淋苏打",
            "gallery-item-desc-2": "蓝天下，清爽的哈密瓜苏打与香浓软冰淇淋的完美搭配",
            "gallery-item-title-3": "自家制布丁",
            "gallery-item-desc-3": "选用当地久住产鸡蛋，蛋香浓郁，与微苦的焦糖酱完美融合的传统风味布丁。",
            "gallery-item-title-4": "夕阳下的久住高原",
            "gallery-item-desc-4": "落日余晖洒在阿苏五岳的彼端，金黄色草地上伫立着一颗孤独的树。",
            "gallery-item-title-6": "野花与露台长椅",
            "gallery-item-desc-6": "庭院中盛开的白色雏菊与微风拂过的舒适长椅",
            "gallery-item-title-7": "靠窗的特别席位",
            "gallery-item-desc-7": "在阳光洒入的窗前，静享一杯清爽浆果苏打的惬意时光。",
            "gallery-item-title-8": "咖啡时光",
            "gallery-item-desc-8": "精致的拿铁拉花搭配新鲜烘焙的手工巧克力大块曲奇饼干",
            "gallery-item-title-9": "高原露台长椅",
            "gallery-item-desc-9": "坐在树荫下的特等席，尽情独占阿苏群山的壮丽奢华。",
            "gallery-item-title-10": "手作木制招牌",
            "gallery-item-desc-10": "以可爱狸猫为主题、充满木质温情的手作招牌",
            "gallery-item-title-11": "吧台席位与阿苏五岳",
            "gallery-item-desc-11": "从面对大落地窗的特等席上，眺望一览无遗的阿苏五岳壮丽绝景。",
            "gallery-item-title-12": "两杯拿铁咖啡",
            "gallery-item-desc-12": "摆放在木质餐桌上的心形与叶片拉花拿铁咖啡。",
            
            "access-subtitle": "营业信息",
            "access-title": "营业时间与交通",
            "access-label-address": "地址",
            "access-value-address": "大分县竹田市久住町大字白丹7577-2 (邮编: 878-0205)",
            "access-label-hours": "营业时间",
            "access-value-hours": "9:00 - 16:00 (最后点餐时间 15:30)",
            "access-label-closed": "公休日",
            "access-value-closed": "每周日、周一",
            "access-label-parking": "停车场",
            "access-value-parking": "提供免费停车场",
            "access-label-wifi": "Wi-Fi & 办公",
            "access-value-wifi": "提供免费Wi-Fi / 允许办公使用",
            "access-label-payment": "支付方式",
            "access-value-payment": "支持各种无现金支付",
            "access-label-sns": "Instagram 账号",
            "access-btn-maps": "在谷歌地图中打开",
            "access-btn-insta": "关注官方 Instagram",
            
            "footer-tag": "俯瞰阿苏五岳，久住高原的温馨咖啡馆",
            "map-iframe-title": "Cafe Procione 的谷歌地图"
        },
        ko: {
            "nav-top": "홈",
            "nav-concept": "소개",
            "nav-menu": "메뉴",
            "nav-gallery": "갤러리",
            "nav-access": "위치",
            
            "hero-subtitle": "아소 오악이 한눈에 보이는 쿠쥬 고원의 작은 카페",
            "hero-tagline": "상쾌한 바람, 산들의 능선, 그리고 한 잔의 에스프레소가 선사하는 향긋한 시간.",
            "hero-btn-story": "Story",
            "hero-btn-menu": "Menu",
            "hero-scroll": "아래로 스크롤",
            
            "concept-subtitle": "Our Story",
            "concept-title": "너구리가 이어준 고원의 따스함",
            "concept-desc-1": "오이타현 다케타시 쿠쥬마치의 아늑한 고원에 자리한 'Cafe Procione(카페 프로치오네)'는 2025년 9월에 문을 열었습니다.",
            "concept-desc-2": "이곳은 옛날부터 많은 사랑을 받아온 시골 음식점 '타누키하치(너구리 여덟)'의 자리를 이어받아, 저희 이주 오너 부부가 직접 손수 DIY 리모델링하여 따뜻함이 가득한 공간으로 재탄생시켰습니다.",
            "concept-desc-3": "'Procione'는 이탈리아어로 '너구리'를 뜻합니다. 이곳에서 오랜 시간 사랑받았던 옛 시골 음식점 '타누키하치(Tanuki-hachi)'의 기억을 이어받아, Cafe Procione는 따뜻함과 환대의 상징으로 작은 너구리 모티브를 담아 손님들을 맞이하고 있습니다.",
            
            "features-subtitle": "How to Spend Time",
            "features-title": "Cafe Procione에서의 특별한 시간",
            "features-lead": "창밖에 펼쳐진 아름다운 풍경을 감상하며 즐기는 한 잔의 커피. 개인 작업을 해도 좋고, 독서에 빠져들어도 좋고, 그저 멍하니 고요함을 만끽해도 좋습니다. 시계를 잊고 쉴 수 있는 시간이 바로 여기에 있습니다.",
            "feature-item-title-1": "드라이브 도중에",
            "feature-item-desc-1": "아소 오악의 절경을 감상하며 향긋한 커피 한 잔과 함께하는 잠시 동안의 휴식.",
            "feature-item-title-2": "고원의 상쾌한 아침에",
            "feature-item-desc-2": "정성 가득한 수량 한정 모닝 플레이트로 특별한 하루를 시작해 보세요.",
            "feature-item-title-3": "와이파이가 있는 창가석에서",
            "feature-item-desc-3": "조용한 창가에 앉아 여행 계획을 세우거나 편안하게 개인 작업에 몰두하기.",
            "feature-item-title-4": "비 내리는 운치 있는 날에",
            "feature-item-desc-4": "비안개 낀 산들의 능선을 바라보며 책 속으로 빠져드는 잔잔한 독서 시간.",
            "feature-item-title-5": "캠핑이나 온천 전후에",
            "feature-item-desc-5": "주변 캠핑이나 온천을 즐기기 전후로 들러 한가롭고 아늑한 쉼표를 찍어가는 시간.",
            
            "menu-subtitle": "Cafe Menu",
            "menu-title": "추천 메뉴",
            "menu-tag-1": "시그니처",
            "menu-item-title-1": "너구리 스탬프 핫샌드위치",
            "menu-item-desc-1": "귀여운 '너구리' 낙인이 찍힌 저희 카페의 자랑인 핫샌드위치. 클래식한 햄 & 치즈부터 달콤한 블루베리 & 크림치즈까지 제공합니다. 테두리는 잘라내고 부드러운 휘핑크림을 곁들여 제공합니다.",
            "menu-item-price-1": "¥550 〜",
            "menu-tag-2": "Espresso",
            "menu-item-title-2": "에스프레소 & 카페라떼",
            "menu-item-desc-2": "엄선한 로스터리에서 공수한 스페셜티 커피를 사용합니다. 전용 머신으로 정성껏 추출한 깊은 풍미의 에스프레소와 카페라떼(라떼아트)를 비롯해, 카페모카와 카라멜라떼 등 달콤한 에스프레소 베이스 음료도 준비되어 있습니다.",
            "menu-item-price-2": "¥400 〜",
            "menu-tag-3": "Morning",
            "menu-item-title-3": "수량 한정 모닝 플레이트 [수량 한정]",
            "menu-item-desc-3": "수제 빵 2종과 현지산 계란 & 베이컨으로 만든 베이컨 에그, 샐러드, 수프, 미니 요거트와 함께 커피 또는 홍차가 제공되는 수량 한정 모닝 플레이트. 음료는 100엔 추가 시 변경 가능합니다. 고원에서의 상쾌한 아침 활동에 꼭 이용해 보세요.",
            "menu-item-price-3": "¥1,380",
            "menu-tag-4": "Ambiance",
            "menu-item-title-4": "코워킹 & 힐링 공간",
            "menu-item-desc-4": "넓은 창 너머로 펼쳐지는 환상적인 전망을 감상하며 독서와 개인 작업에 집중할 수 있는 차분한 공간입니다. 일부 좌석에는 콘센트와 USB 충전 포트도 완비되어 있습니다. 고속 무료 와이파이를 제공합니다.",
            "menu-item-price-4": "무료 와이파이",
            
            "gallery-subtitle": "Visual Story",
            "gallery-title": "갤러리",
            "gallery-item-title-1": "아침 햇살과 고원의 조식",
            "gallery-item-desc-1": "창가에서 즐기는 수제 모닝 플레이트와 따뜻한 카페라떼",
            "gallery-item-title-2": "멜론 소다 플로트",
            "gallery-item-desc-2": "파란 하늘 아래 펼쳐지는 청량한 멜론 소다와 시원한 소프트아이스크림",
            "gallery-item-title-3": "수제 푸딩",
            "gallery-item-desc-3": "현지 쿠쥬산 계란의 고소함과 쌉싸름한 카라멜 소스가 어우러진 클래식 수제 푸딩.",
            "gallery-item-title-4": "노을빛의 쿠쥬 고원",
            "gallery-item-desc-4": "아소 오악 너머로 저무는 석양과 황금빛으로 물든 초원 위의 외로운 나무 한 그루.",
            "gallery-item-title-6": "들꽃과 테라스 벤치",
            "gallery-item-desc-6": "정원에 핀 하얀 마가렛 꽃과 기분 좋은 바람이 불어오는 벤치",
            "gallery-item-title-7": "창가의 특등석",
            "gallery-item-desc-7": "따스한 햇살이 드는 창가에서 상큼한 베리 소다를 즐기는 여유로운 시간.",
            "gallery-item-title-8": "커피 브레이크",
            "gallery-item-desc-8": "아름다운 라떼아트가 그려진 커피와 직접 구워낸 수제 초코청크 쿠키",
            "gallery-item-title-9": "고원의 테라스 벤치",
            "gallery-item-desc-9": "나무 그늘 아래 특등석에서 아소의 능선을 독차지하는 호사.",
            "gallery-item-title-10": "수제 나무 간판",
            "gallery-item-desc-10": "너구리를 모티브로 제작된 자연 친화적이고 아늑한 수제 나무 간판",
            "gallery-item-title-11": "카운터 석과 아소 오악",
            "gallery-item-desc-11": "넓은 창에 면한 특등석에서 막힘없이 펼쳐진 아소 오악의 대절경을 감상해 보세요.",
            "gallery-item-title-12": "두 잔의 카페라떼",
            "gallery-item-desc-12": "나무 테이블 위에 나란히 놓인 하트와 나뭇잎 모양의 아름다운 라떼아트",
            
            "access-subtitle": "Information",
            "access-title": "영업시간 및 오시는 길",
            "access-label-address": "주소",
            "access-value-address": "오이타현 다케타시 쿠쥬마치 오아자 시라탄 7577-2 (우편번호: 878-0205)",
            "access-label-hours": "영업시간",
            "access-value-hours": "9:00 ~ 16:00 (마지막 주문 15:30)",
            "access-label-closed": "정기휴일",
            "access-value-closed": "매주 일요일, 월요일",
            "access-label-parking": "주차장",
            "access-value-parking": "주차 가능 (무료)",
            "access-label-wifi": "와이파이 & 작업",
            "access-value-wifi": "무료 와이파이 / 노트북 작업 가능",
            "access-label-payment": "결제 방법",
            "access-value-payment": "각종 신용카드 및 간편 결제 지원 (캐시리스)",
            "access-label-sns": "인스타그램",
            "access-btn-maps": "구글 지도에서 보기",
            "access-btn-insta": "인스타그램 방문하기",
            
            "footer-tag": "아소 오악이 한눈에 보이는 쿠쥬 고원의 작은 카페",
            "map-iframe-title": "Cafe Procione 찾아오시는 길 지도"
        }
    };

    const langSelect = document.getElementById('lang-select');
    const iframeMap = document.getElementById('google-map-iframe');

    const setLanguage = (lang) => {
        // Fallback to JP if language key doesn't exist
        const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.ja;
        
        // Update DOM elements with data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) {
                el.textContent = dictionary[key];
            }
        });

        // Update iframe map title for accessibility
        if (iframeMap && dictionary['map-iframe-title']) {
            iframeMap.setAttribute('title', dictionary['map-iframe-title']);
        }

        // Set document language attribute
        document.documentElement.setAttribute('lang', lang);

        // Update select value if not matched
        if (langSelect.value !== lang) {
            langSelect.value = lang;
        }

        // Save selection to LocalStorage
        localStorage.setItem('preferred-lang', lang);
    };

    // Listen to change event
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // Auto-detect browser language or load saved preference
    const getInitialLanguage = () => {
        const savedLang = localStorage.getItem('preferred-lang');
        if (savedLang && TRANSLATIONS[savedLang]) {
            return savedLang;
        }

        // Detect navigator languages
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        if (browserLang.startsWith('zh')) {
            return 'zh';
        }
        if (browserLang.startsWith('ko')) {
            return 'ko';
        }
        if (browserLang.startsWith('en')) {
            return 'en';
        }

        return 'ja'; // default
    };

    // Set initial language on load
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
});
