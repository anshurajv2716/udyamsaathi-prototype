import type { Language } from "./translations";

export interface FaqContext {
  sectorName: string;
  totalCapital: string;
  fixedCapital: string;
  workingCapital: string;
  rollingCapital: string;
  score: number;
  recommendationLabel: string;
  moratoriumMonths: number;
}

export interface FaqItem {
  question: Record<Language, string>;
  answer: (ctx: FaqContext, language: Language) => string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: {
      en: "What is the minimum capital needed to start this business?",
      hi: "इस व्यवसाय को शुरू करने के लिए न्यूनतम पूंजी कितनी चाहिए?",
      mr: "हा व्यवसाय सुरू करण्यासाठी किमान भांडवल किती लागते?",
    },
    answer: (ctx, lang) => {
      if (lang === "hi") return `आपकी दी गई जानकारी के अनुसार, ${ctx.sectorName} व्यवसाय ${ctx.totalCapital} उपलब्ध पूंजी के साथ शुरू किया जा सकता है — ${ctx.fixedCapital} स्थायी पूंजी, ${ctx.workingCapital} कार्यशील पूंजी, और ${ctx.rollingCapital} आपातकालीन आरक्षित निधि के रूप में। इस सेटअप के लिए व्यवहार्यता स्कोर ${ctx.score}/100 (${ctx.recommendationLabel}) है। इसी स्तर से शुरुआत करें, बाज़ार को परखें, फिर संस्थागत ऋण से विस्तार करें।`;
      if (lang === "mr") return `तुमच्या दिलेल्या माहितीनुसार, ${ctx.sectorName} व्यवसाय ${ctx.totalCapital} उपलब्ध भांडवलासह सुरू करता येतो — ${ctx.fixedCapital} स्थिर भांडवल, ${ctx.workingCapital} खेळते भांडवल, आणि ${ctx.rollingCapital} आणीबाणी राखीव निधी म्हणून. या सेटअपसाठी व्यवहार्यता गुणांक ${ctx.score}/100 (${ctx.recommendationLabel}) आहे. याच स्तरावरून सुरुवात करा, बाजाराची पडताळणी करा, नंतर संस्थात्मक कर्जाने विस्तार करा.`;
      return `Based on your inputs, a ${ctx.sectorName} business can be started with ${ctx.totalCapital} available capital — split as ${ctx.fixedCapital} fixed capital, ${ctx.workingCapital} working capital, and ${ctx.rollingCapital} kept as an emergency reserve. The feasibility score for this setup is ${ctx.score}/100 (${ctx.recommendationLabel}). Start at this level, validate the market, then scale with institutional credit if needed.`;
    },
  },
  {
    question: {
      en: "Can I get a loan without collateral or a guarantor?",
      hi: "क्या मुझे बिना गारंटी या गारंटर के ऋण मिल सकता है?",
      mr: "मला तारण किंवा जामीनदाराशिवाय कर्ज मिळू शकते का?",
    },
    answer: (_ctx, lang) => {
      if (lang === "hi") return "हां। पीएम मुद्रा योजना ₹20 लाख तक पूरी तरह बिना गारंटी के ऋण देती है, बिना किसी गारंटर के। पीएम स्वनिधि (सड़क विक्रेता-शैली के खुदरा के लिए) भी पूरी तरह बिना गारंटी की है। इन सीमाओं से ऊपर के ऋणों के लिए कुछ योजनाओं में अतिरिक्त सुरक्षा की आवश्यकता हो सकती है — योजना-विशिष्ट शर्तों के लिए सरकारी योजनाएं टैब देखें।";
      if (lang === "mr") return "होय. पीएम मुद्रा योजना ₹20 लाखांपर्यंत पूर्णपणे तारणमुक्त कर्ज देते, कोणत्याही जामीनदाराशिवाय. पीएम स्वनिधी (फेरीवाला-सदृश किरकोळसाठी) देखील पूर्णपणे तारणमुक्त आहे. या मर्यादांपेक्षा जास्त कर्जांसाठी काही योजनांमध्ये अतिरिक्त सुरक्षिततेची आवश्यकता असू शकते — योजना-विशिष्ट अटींसाठी सरकारी योजना टॅब पहा.";
      return "Yes. PM Mudra Yojana offers fully collateral-free loans up to ₹20 lakh with no guarantor. PM SVANidhi (for a street-vendor-style subset of retail) is also fully collateral-free. For loans above these ranges, some schemes may require additional security — check the Govt Schemes tab for scheme-specific terms.";
    },
  },
  {
    question: {
      en: "How long does loan approval usually take?",
      hi: "ऋण स्वीकृति में आमतौर पर कितना समय लगता है?",
      mr: "कर्ज मंजुरीसाठी साधारण किती वेळ लागतो?",
    },
    answer: (_ctx, lang) => {
      if (lang === "hi") return "समय योजना के अनुसार अलग होता है: पीएम स्वनिधि — लगभग 15–20 दिन; स्टैंड-अप इंडिया — आमतौर पर 4–6 सप्ताह के भीतर; अन्य योजनाओं का समय ऋणदाता की प्रक्रिया पर निर्भर करता है। पूर्ण और सटीक दस्तावेज़ जमा करना स्वीकृति को तेज़ करने में सबसे बड़ा कारक है।";
      if (lang === "mr") return "वेळ योजनेनुसार बदलतो: पीएम स्वनिधी — साधारण 15–20 दिवस; स्टँड-अप इंडिया — साधारण 4–6 आठवड्यांत; इतर योजनांचा वेळ कर्जदात्याच्या प्रक्रियेवर अवलंबून असतो. पूर्ण आणि अचूक कागदपत्रे सादर करणे मंजुरी जलद करण्याचा सर्वात मोठा घटक आहे.";
      return "Timeframes vary by scheme: PM SVANidhi — roughly 15–20 days; Stand-Up India — typically within 4–6 weeks; other schemes depend on the lender's own processing. Submitting complete, accurate documents is the single biggest factor in speeding up approval.";
    },
  },
  {
    question: {
      en: "What documents are needed for any government loan scheme?",
      hi: "किसी भी सरकारी ऋण योजना के लिए कौन से दस्तावेज़ चाहिए?",
      mr: "कोणत्याही सरकारी कर्ज योजनेसाठी कोणती कागदपत्रे लागतात?",
    },
    answer: (_ctx, lang) => {
      if (lang === "hi") return "सभी योजनाओं में सामान्य दस्तावेज़: आधार कार्ड, पैन कार्ड, बैंक पासबुक और 6 महीने का स्टेटमेंट, पता प्रमाण, पासपोर्ट फोटो, और व्यवसाय योजना/परियोजना रिपोर्ट। योजना-विशिष्ट अतिरिक्त दस्तावेज़: SC/ST/OBC प्रमाणपत्र (श्रेणी-आधारित योजनाओं के लिए), भूमि रिकॉर्ड (KCC के लिए), वेंडिंग प्रमाणपत्र (स्वनिधि के लिए)।";
      if (lang === "mr") return "सर्व योजनांमध्ये सामान्य कागदपत्रे: आधार कार्ड, पॅन कार्ड, बँक पासबुक व 6 महिन्यांचे स्टेटमेंट, पत्ता पुरावा, पासपोर्ट फोटो, आणि व्यवसाय योजना/प्रकल्प अहवाल. योजना-विशिष्ट अतिरिक्त कागदपत्रे: SC/ST/OBC प्रमाणपत्र (प्रवर्ग-आधारित योजनांसाठी), जमीन नोंदी (KCC साठी), विक्री प्रमाणपत्र (स्वनिधीसाठी).";
      return "Core documents across all schemes: Aadhaar card, PAN card, bank passbook + 6-month statement, address proof, passport photographs, and a business plan or project report. Scheme-specific extras include SC/ST/OBC certificates (for category-based schemes), land records (for KCC), and a vending certificate (for SVANidhi).";
    },
  },
  {
    question: {
      en: "What does my feasibility score mean?",
      hi: "मेरे व्यवहार्यता स्कोर का क्या मतलब है?",
      mr: "माझ्या व्यवहार्यता गुणांकाचा अर्थ काय आहे?",
    },
    answer: (ctx, lang) => {
      if (lang === "hi") return `आपका स्कोर ${ctx.score}/100 है, जिसे "${ctx.recommendationLabel}" के रूप में वर्गीकृत किया गया है। यह स्कोर मांग, प्रतिस्पर्धा, मौसमी जोखिम, और लॉजिस्टिक्स पहुंच — इन चार कारकों के भारित संयोजन से बनता है। पूरा विवरण "स्थानीय व्यवहार्यता" अनुभाग में मजबूती/कमजोरी/अवसर/खतरे के रूप में दिखाया गया है।`;
      if (lang === "mr") return `तुमचा गुणांक ${ctx.score}/100 आहे, ज्याला "${ctx.recommendationLabel}" असे वर्गीकृत केले आहे. हा गुणांक मागणी, स्पर्धा, हंगामी जोखीम, आणि लॉजिस्टिक्स प्रवेश — या चार घटकांच्या भारित मिश्रणातून तयार होतो. संपूर्ण तपशील "स्थानिक व्यवहार्यता" विभागात बलस्थाने/कमकुवत बाजू/संधी/धोके म्हणून दाखवला आहे.`;
      return `Your score is ${ctx.score}/100, classified as "${ctx.recommendationLabel}". It's a weighted combination of four factors — local demand, competition, seasonality risk, and logistics access. The full breakdown is shown in the "Local Feasibility" section as strengths/weaknesses/opportunities/threats.`;
    },
  },
  {
    question: {
      en: "What is a moratorium period and why does it matter?",
      hi: "स्थगन अवधि क्या है और यह क्यों महत्वपूर्ण है?",
      mr: "स्थगन कालावधी म्हणजे काय आणि तो का महत्त्वाचा आहे?",
    },
    answer: (ctx, lang) => {
      if (lang === "hi") return `स्थगन अवधि ऋण मिलने के बाद की वह अवधि है जिसमें आपको कोई EMI नहीं चुकानी होती — यह आपके व्यवसाय को राजस्व उत्पन्न करना शुरू करने से पहले कुछ समय देती है। आपकी अनुशंसित योजना के लिए, यह अवधि ${ctx.moratoriumMonths} महीने है। इसके बाद, शेष मूलधन और अर्जित ब्याज पर नियमित EMI शुरू होती है।`;
      if (lang === "mr") return `स्थगन कालावधी म्हणजे कर्ज मिळाल्यानंतरचा तो काळ ज्यात तुम्हाला कोणतीही EMI भरावी लागत नाही — यामुळे तुमच्या व्यवसायाला उत्पन्न सुरू होण्यापूर्वी थोडा वेळ मिळतो. तुमच्या शिफारस केलेल्या योजनेसाठी, हा कालावधी ${ctx.moratoriumMonths} महिने आहे. यानंतर, उर्वरित मुद्दल आणि जमा झालेल्या व्याजावर नियमित EMI सुरू होते.`;
      return `A moratorium is the period after loan disbursal where you pay no EMI — it gives your business time to start generating revenue before repayment begins. For your recommended plan, this period is ${ctx.moratoriumMonths} months. After that, regular EMIs begin on the outstanding principal plus accrued interest.`;
    },
  },
  {
    question: {
      en: "Are there special schemes for women entrepreneurs?",
      hi: "क्या महिला उद्यमियों के लिए विशेष योजनाएं हैं?",
      mr: "महिला उद्योजकांसाठी विशेष योजना आहेत का?",
    },
    answer: (_ctx, lang) => {
      if (lang === "hi") return "हां, कई विकल्प मौजूद हैं: (1) स्टैंड-अप इंडिया — ₹10 लाख से ₹1 करोड़, महिलाओं के लिए विशेष कोटा। (2) PMEGP — विशेष श्रेणी के लिए सामान्य से अधिक (35%) सब्सिडी। (3) महिला उद्यम निधि (PNB) — लेकिन इसकी शर्तें केंद्रीय रूप से पुष्ट नहीं हैं, आवेदन से पहले शाखा से सत्यापित करें। पूरे विवरण के लिए सरकारी योजनाएं टैब देखें।";
      if (lang === "mr") return "होय, अनेक पर्याय उपलब्ध आहेत: (1) स्टँड-अप इंडिया — ₹10 लाख ते ₹1 कोटी, महिलांसाठी विशेष कोटा. (2) PMEGP — विशेष प्रवर्गासाठी सर्वसाधारणपेक्षा जास्त (35%) अनुदान. (3) महिला उद्यम निधी (PNB) — पण याच्या अटी केंद्रीयरित्या पुष्ट नाहीत, अर्ज करण्यापूर्वी शाखेकडून खात्री करा. संपूर्ण तपशीलासाठी सरकारी योजना टॅब पहा.";
      return "Yes, several options exist: (1) Stand-Up India — ₹10 lakh to ₹1 crore, with a dedicated quota for women. (2) PMEGP — higher-than-general (35%) subsidy for special categories. (3) Mahila Udyam Nidhi (PNB) — but its terms aren't centrally confirmed, so verify with a branch before applying. See the Govt Schemes tab for full details.";
    },
  },
  {
    question: {
      en: "What's the difference between fixed capital and working capital?",
      hi: "स्थायी पूंजी और कार्यशील पूंजी में क्या अंतर है?",
      mr: "स्थिर भांडवल आणि खेळते भांडवल यात काय फरक आहे?",
    },
    answer: (ctx, lang) => {
      if (lang === "hi") return `स्थायी पूंजी (${ctx.fixedCapital}) एक बार खर्च की जाती है — लंबी अवधि की संपत्तियों पर, जैसे उपकरण, ढांचा, या शुरुआती सेटअप। कार्यशील पूंजी (${ctx.workingCapital}) आवर्ती मासिक खर्चों को कवर करती है — कच्चा माल, बिजली, श्रम। आपकी आपातकालीन आरक्षित निधि (${ctx.rollingCapital}) इन दोनों से अलग है और दैनिक संचालन पर खर्च नहीं की जानी चाहिए।`;
      if (lang === "mr") return `स्थिर भांडवल (${ctx.fixedCapital}) एकदाच खर्च केले जाते — दीर्घकालीन मालमत्तांवर, जसे उपकरणे, रचना, किंवा सुरुवातीचा सेटअप. खेळते भांडवल (${ctx.workingCapital}) आवर्ती मासिक खर्च भागवते — कच्चा माल, वीज, मजुरी. तुमचा आणीबाणी राखीव निधी (${ctx.rollingCapital}) या दोन्हींपासून वेगळा आहे आणि दैनंदिन कामकाजावर खर्च करू नये.`;
      return `Fixed capital (${ctx.fixedCapital}) is spent once — on long-term assets like equipment, structure, or initial setup. Working capital (${ctx.workingCapital}) covers recurring monthly expenses — raw materials, utilities, labour. Your emergency reserve (${ctx.rollingCapital}) is separate from both and shouldn't be spent on day-to-day operations.`;
    },
  },
  {
    question: {
      en: "Can I apply for multiple government schemes simultaneously?",
      hi: "क्या मैं एक साथ कई सरकारी योजनाओं के लिए आवेदन कर सकता हूं?",
      mr: "मी एकाच वेळी अनेक सरकारी योजनांसाठी अर्ज करू शकतो का?",
    },
    answer: (_ctx, lang) => {
      if (lang === "hi") return "कुछ को जोड़ा जा सकता है, कुछ को नहीं। सामान्यतः एक ही परियोजना के लिए एक से अधिक सब्सिडी-आधारित योजना (जैसे PMEGP + मुद्रा सब्सिडी) साथ में नहीं ली जा सकती। आवेदन करते समय किसी भी अन्य सब्सिडी की घोषणा हमेशा करें — गैर-प्रकटीकरण से पूरी ऋण वसूली हो सकती है। किसी भी योजना को संयोजित करने से पहले अपने बैंक अधिकारी से सलाह लें।";
      if (lang === "mr") return "काही एकत्र करता येतात, काही नाही. साधारणपणे एकाच प्रकल्पासाठी एकापेक्षा जास्त अनुदान-आधारित योजना (उदा. PMEGP + मुद्रा अनुदान) एकत्र घेता येत नाहीत. अर्ज करताना कोणत्याही इतर अनुदानाची नेहमी घोषणा करा — न सांगितल्यास संपूर्ण कर्ज वसुली होऊ शकते. कोणत्याही योजना एकत्र करण्यापूर्वी तुमच्या बँक अधिकाऱ्याचा सल्ला घ्या.";
      return "Some can be combined, others cannot. Generally, more than one subsidy-based scheme (e.g. PMEGP + Mudra subsidy) cannot be availed for the same project. Always declare any other subsidy when applying — non-disclosure can lead to full loan recovery. Consult your bank officer before combining any schemes.";
    },
  },
  {
    question: {
      en: "What happens if I cannot repay my EMI on time?",
      hi: "यदि मैं समय पर अपनी EMI नहीं चुका पाता तो क्या होगा?",
      mr: "मला वेळेवर EMI भरता आली नाही तर काय होते?",
    },
    answer: (ctx, lang) => {
      if (lang === "hi") return `तुरंत अपने बैंक से संपर्क करें — डिफ़ॉल्ट नोटिस का इंतज़ार न करें। विकल्पों में शामिल हैं: वास्तविक कठिनाई के लिए EMI अवकाश या पुनर्निर्धारण, गंभीर मामलों के लिए वन-टाइम सेटलमेंट (OTS), या RBI दिशानिर्देशों के तहत ऋण पुनर्गठन। लगातार 90 दिनों तक भुगतान न करने पर NPA (गैर-निष्पादित परिसंपत्ति) स्थिति बनती है, जो आपके CIBIL स्कोर को गंभीर रूप से नुकसान पहुंचाती है। यही कारण है कि आपकी ${ctx.rollingCapital} की आरक्षित निधि रखना ज़रूरी है।`;
      if (lang === "mr") return `तुमच्या बँकेशी लगेच संपर्क साधा — डिफॉल्ट नोटीसची वाट पाहू नका. पर्यायांमध्ये समाविष्ट आहे: खऱ्या अडचणीसाठी EMI सुट्टी किंवा पुनर्नियोजन, गंभीर प्रकरणांसाठी वन-टाइम सेटलमेंट (OTS), किंवा RBI मार्गदर्शक तत्त्वांनुसार कर्ज पुनर्रचना. सलग 90 दिवस पैसे न भरल्यास NPA (अनुत्पादक मालमत्ता) स्थिती निर्माण होते, ज्यामुळे तुमचा CIBIL गुणांक गंभीरपणे बिघडतो. म्हणूनच तुमचा ${ctx.rollingCapital} चा राखीव निधी ठेवणे महत्त्वाचे आहे.`;
      return `Contact your bank immediately — don't wait for a default notice. Options include an EMI holiday or rescheduling for genuine hardship, a One-Time Settlement (OTS) for severe cases, or loan restructuring under RBI guidelines. Missing 90 consecutive days of payment triggers NPA (Non-Performing Asset) status, which severely damages your credit score. This is exactly why keeping your ${ctx.rollingCapital} reserve matters.`;
    },
  },
];