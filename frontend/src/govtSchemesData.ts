// Government schemes reference data — Phase 0 research (verified via web
// search). Two schemes need special handling, documented at their entries:
// - AHIDF replaces NABARD DEDS, which is discontinued since 01.04.2020.
// - Mahila Udyam Nidhi (PNB) is LOW CONFIDENCE — sourcing conflicts; card
//   text is deliberately hedged rather than stated as firm fact.
// Re-verify all figures before any real user-facing launch — scheme terms
// change over time.

import type { Language } from "./translations";

export type SectorKey =
  | "dairy"
  | "poultry"
  | "food_processing"
  | "retail"
  | "tailoring"
  | "agri_input_retail";

export type FitLevel = "yes" | "conditional" | "no";

export interface SchemeContent {
  name: string;
  badge: string;
  tagline: string;
  amount: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  steps: string[];
  caveat?: string;
}

export interface SectorFitEntry {
  level: FitLevel;
  note?: Record<Language, string>;
}

export interface GovtSchemeData {
  key: string;
  color: string;
  url: string;
  lowConfidence?: boolean;
  sectorFit: Record<SectorKey, SectorFitEntry>;
  content: Record<Language, SchemeContent>;
}

const YES: SectorFitEntry = { level: "yes" };
const NO: SectorFitEntry = { level: "no" };

export const GOVT_SCHEMES: GovtSchemeData[] = [
  {
    key: "mudra",
    color: "#2F5233",
    url: "https://www.mudra.org.in",
    sectorFit: {
      dairy: YES, poultry: YES, food_processing: YES,
      retail: YES, tailoring: YES, agri_input_retail: YES,
    },
    content: {
      en: {
        name: "PM Mudra Yojana",
        badge: "Up to ₹20 lakh",
        tagline: "No collateral · No guarantor required",
        amount: "₹50,000 – ₹20,00,000",
        description: "Collateral-free loans under Shishu, Kishore, Tarun, and Tarun Plus categories. Covers manufacturing, trading, services, and agriculture-allied activities like dairy, poultry, and food processing.",
        eligibility: [
          "Non-corporate, non-farm small/micro enterprise, including dairy, poultry, and food-processing as allied activities",
          "Individual entrepreneurs, proprietorships, or partnerships",
          "No prior loan default with any bank or financial institution",
          "Tarun Plus (₹10–20 lakh) only for borrowers who have already repaid a prior Tarun loan in full",
        ],
        benefits: [
          "Zero collateral or guarantor required",
          "Flexible repayment, typically 12 months to 5 years",
          "Mudra Card issued on approval for working-capital access",
          "Available at all public sector banks, RRBs, MFIs, and NBFCs",
        ],
        documents: [
          "Duly filled Mudra application form + passport-size photographs",
          "Aadhaar, PAN, voter ID, or driving licence",
          "Address proof (utility bill, etc.)",
          "Business proof or existence proof",
          "Bank statements — last 6–12 months",
          "SC/ST/OBC proof, only if claiming category-based benefit",
        ],
        steps: [
          "Visit myscheme.gov.in or udyamimitra.in, or go directly to a bank/NBFC branch",
          "Register and fill personal and business details",
          "Select loan tier: Shishu, Kishore, Tarun, or Tarun Plus",
          "Select industry type: manufacturing, service, trading, or agriculture-allied activity",
          "Attach required documents",
          "Select preferred lender from the list shown",
          "Submit — an application number is generated for tracking",
          "Lender reviews and disburses on approval",
        ],
        caveat: "Interest rates are set by each lender under RBI guidelines (indicatively 9–15% p.a.) — not a single fixed rate.",
      },
      hi: {
        name: "पीएम मुद्रा योजना",
        badge: "₹20 लाख तक",
        tagline: "बिना गारंटी · बिना गारंटर के",
        amount: "₹50,000 – ₹20,00,000",
        description: "शिशु, किशोर, तरुण और तरुण प्लस श्रेणियों के तहत बिना गारंटी के ऋण। विनिर्माण, व्यापार, सेवाओं और डेयरी, पोल्ट्री, खाद्य प्रसंस्करण जैसी कृषि-संबद्ध गतिविधियों को कवर करता है।",
        eligibility: [
          "गैर-कॉर्पोरेट, गैर-कृषि सूक्ष्म/लघु उद्यम, जिसमें डेयरी, पोल्ट्री और खाद्य प्रसंस्करण संबद्ध गतिविधियों के रूप में शामिल हैं",
          "व्यक्तिगत उद्यमी, एकल स्वामित्व, या साझेदारी फर्म",
          "किसी भी बैंक या वित्तीय संस्था के साथ पूर्व ऋण चूक नहीं",
          "तरुण प्लस (₹10–20 लाख) केवल उन उधारकर्ताओं के लिए जिन्होंने पहले तरुण ऋण पूरी तरह चुका दिया हो",
        ],
        benefits: [
          "कोई गारंटी या गारंटर की आवश्यकता नहीं",
          "लचीली चुकौती, आमतौर पर 12 महीने से 5 साल तक",
          "स्वीकृति पर कार्यशील पूंजी हेतु मुद्रा कार्ड जारी",
          "सभी सार्वजनिक क्षेत्र के बैंकों, RRB, MFI और NBFC में उपलब्ध",
        ],
        documents: [
          "पूर्ण भरा हुआ मुद्रा आवेदन फॉर्म + पासपोर्ट साइज़ फोटो",
          "आधार, पैन, वोटर आईडी या ड्राइविंग लाइसेंस",
          "पता प्रमाण (बिजली बिल आदि)",
          "व्यवसाय प्रमाण या अस्तित्व प्रमाण",
          "बैंक स्टेटमेंट — पिछले 6–12 महीने",
          "SC/ST/OBC प्रमाण, केवल श्रेणी-आधारित लाभ के लिए दावा करने पर",
        ],
        steps: [
          "myscheme.gov.in या udyamimitra.in पर जाएं, या सीधे बैंक/NBFC शाखा में जाएं",
          "पंजीकरण करें और व्यक्तिगत व व्यावसायिक विवरण भरें",
          "ऋण स्तर चुनें: शिशु, किशोर, तरुण या तरुण प्लस",
          "उद्योग प्रकार चुनें: विनिर्माण, सेवा, व्यापार, या कृषि-संबद्ध गतिविधि",
          "आवश्यक दस्तावेज़ संलग्न करें",
          "दिखाई गई सूची में से पसंदीदा ऋणदाता चुनें",
          "जमा करें — ट्रैकिंग के लिए एक आवेदन संख्या जनरेट होती है",
          "ऋणदाता समीक्षा करता है और स्वीकृति पर राशि वितरित करता है",
        ],
        caveat: "ब्याज दर प्रत्येक ऋणदाता द्वारा RBI दिशानिर्देशों के तहत तय की जाती है (संकेतात्मक रूप से 9–15% प्रति वर्ष) — यह कोई एक निश्चित सरकारी दर नहीं है।",
      },
      mr: {
        name: "पीएम मुद्रा योजना",
        badge: "₹20 लाखांपर्यंत",
        tagline: "तारणमुक्त · जामीनदाराची गरज नाही",
        amount: "₹50,000 – ₹20,00,000",
        description: "शिशू, किशोर, तरुण आणि तरुण प्लस श्रेणींअंतर्गत तारणमुक्त कर्ज. उत्पादन, व्यापार, सेवा आणि दुग्धव्यवसाय, कुक्कुटपालन, अन्न प्रक्रिया यांसारख्या कृषी-संलग्न उपक्रमांचा समावेश.",
        eligibility: [
          "बिगर-कॉर्पोरेट, बिगर-शेती सूक्ष्म/लघु उद्योग, ज्यात दुग्धव्यवसाय, कुक्कुटपालन आणि अन्न प्रक्रिया संलग्न उपक्रम म्हणून समाविष्ट आहेत",
          "वैयक्तिक उद्योजक, एकल मालकी किंवा भागीदारी संस्था",
          "कोणत्याही बँक किंवा वित्तीय संस्थेकडे पूर्वीचा कर्ज डिफॉल्ट नाही",
          "तरुण प्लस (₹10–20 लाख) फक्त ज्यांनी आधीचे तरुण कर्ज पूर्णपणे फेडले आहे त्यांच्यासाठी",
        ],
        benefits: [
          "कोणतेही तारण किंवा जामीनदार आवश्यक नाही",
          "लवचिक परतफेड, साधारणपणे 12 महिने ते 5 वर्षे",
          "मंजुरीनंतर खेळत्या भांडवलासाठी मुद्रा कार्ड जारी",
          "सर्व सार्वजनिक क्षेत्रातील बँका, RRB, MFI आणि NBFC मध्ये उपलब्ध",
        ],
        documents: [
          "पूर्ण भरलेला मुद्रा अर्ज + पासपोर्ट आकाराचे फोटो",
          "आधार, पॅन, मतदार ओळखपत्र किंवा वाहन परवाना",
          "पत्ता पुरावा (वीज बिल इ.)",
          "व्यवसाय पुरावा किंवा अस्तित्व पुरावा",
          "बँक स्टेटमेंट — मागील 6–12 महिने",
          "SC/ST/OBC पुरावा, फक्त प्रवर्ग-आधारित लाभाचा दावा करत असल्यास",
        ],
        steps: [
          "myscheme.gov.in किंवा udyamimitra.in वर भेट द्या, किंवा थेट बँक/NBFC शाखेत जा",
          "नोंदणी करा आणि वैयक्तिक व व्यावसायिक तपशील भरा",
          "कर्ज स्तर निवडा: शिशू, किशोर, तरुण किंवा तरुण प्लस",
          "उद्योग प्रकार निवडा: उत्पादन, सेवा, व्यापार किंवा कृषी-संलग्न उपक्रम",
          "आवश्यक कागदपत्रे जोडा",
          "दाखवलेल्या यादीतून पसंतीचा कर्जदाता निवडा",
          "सबमिट करा — ट्रॅकिंगसाठी अर्ज क्रमांक तयार होतो",
          "कर्जदाता पुनरावलोकन करतो आणि मंजुरीनंतर रक्कम वितरित करतो",
        ],
        caveat: "व्याजदर प्रत्येक कर्जदात्याद्वारे RBI मार्गदर्शक तत्त्वांनुसार ठरवला जातो (साधारण 9–15% प्रतिवर्ष) — ही एकच निश्चित सरकारी दर नाही.",
      },
    },
  },
  {
    key: "pmegp",
    color: "#9B4A2B",
    url: "https://www.kviconline.gov.in",
    sectorFit: {
      dairy: { level: "conditional", note: {
        en: "Animal-husbandry exclusion was relaxed only in 2024 — a recent change, worth confirming stays current.",
        hi: "पशुपालन बहिष्करण केवल 2024 में शिथिल किया गया — यह हाल का बदलाव है।",
        mr: "पशुपालन वगळणी फक्त 2024 मध्ये शिथिल करण्यात आली — हा अलीकडील बदल आहे.",
      }},
      poultry: { level: "conditional", note: {
        en: "Animal-husbandry exclusion was relaxed only in 2024 — a recent change, worth confirming stays current.",
        hi: "पशुपालन बहिष्करण केवल 2024 में शिथिल किया गया — यह हाल का बदलाव है।",
        mr: "पशुपालन वगळणी फक्त 2024 मध्ये शिथिल करण्यात आली — हा अलीकडील बदल आहे.",
      }},
      food_processing: YES,
      retail: NO,
      tailoring: YES,
      agri_input_retail: NO,
    },
    content: {
      en: {
        name: "PMEGP",
        badge: "Up to ₹50 lakh",
        tagline: "Government subsidy, not a loan to repay in full",
        amount: "Margin-money subsidy 15–35% of project cost (cap ₹50L manufacturing / ₹20L service)",
        description: "PM Employment Generation Programme via KVIC gives 15–35% margin-money subsidy for new manufacturing or service enterprises. Note: pure trading businesses are excluded — see sector fit.",
        eligibility: [
          "Age 18 and above",
          "Minimum 8th-standard pass for projects above ₹10 lakh (manufacturing) or ₹5 lakh (service)",
          "New units only — existing/old units not eligible",
          "Only one person per family can avail PMEGP for one project",
          "Must not have already availed a subsidy under another government scheme for the same purpose",
        ],
        benefits: [
          "15% (urban/general) to 35% (rural/special category) margin-money subsidy — not repayable like a loan",
          "Free EDP (Entrepreneurship Development Programme) training included",
          "Available via all major public sector banks",
        ],
        documents: [
          "Aadhaar + PAN",
          "Educational certificate (for projects above the threshold)",
          "Caste/disability/category certificate, if claiming special-category subsidy",
          "Detailed Project Report (DPR)",
          "Bank account details",
          "EDP training completion certificate (obtained after registration)",
        ],
        steps: [
          "Register on kviconline.gov.in",
          "Fill the online application with business plan details",
          "Application is scrutinised by the district-level task force / KVIC / KVIB / DIC",
          "On selection, attend mandatory EDP training (2–10 days)",
          "Obtain EDP completion certificate",
          "Bank sanctions the loan; subsidy held in a TDR for 3 years",
          "After 3 years of satisfactory operation, the subsidy is adjusted against the principal",
        ],
        caveat: "Animal-husbandry exclusion (dairy/poultry) was relaxed only in 2024 — a recent change. Pure trading businesses (retail, agri-input retail) remain excluded.",
      },
      hi: {
        name: "पीएमईजीपी (PMEGP)",
        badge: "₹50 लाख तक",
        tagline: "सरकारी सब्सिडी, पूरा चुकाने वाला ऋण नहीं",
        amount: "परियोजना लागत का 15–35% मार्जिन मनी सब्सिडी (सीमा ₹50 लाख विनिर्माण / ₹20 लाख सेवा)",
        description: "KVIC के माध्यम से पीएम रोज़गार सृजन कार्यक्रम नई विनिर्माण या सेवा इकाइयों के लिए 15–35% मार्जिन मनी सब्सिडी देता है। ध्यान दें: शुद्ध व्यापार व्यवसाय बाहर रखे गए हैं — क्षेत्र-उपयुक्तता देखें।",
        eligibility: [
          "आयु 18 वर्ष और अधिक",
          "₹10 लाख (विनिर्माण) या ₹5 लाख (सेवा) से अधिक की परियोजनाओं के लिए न्यूनतम 8वीं पास",
          "केवल नई इकाइयां — मौजूदा/पुरानी इकाइयां पात्र नहीं",
          "एक परिवार से केवल एक व्यक्ति एक परियोजना के लिए PMEGP का लाभ ले सकता है",
          "उसी उद्देश्य के लिए किसी अन्य सरकारी योजना के तहत पहले से सब्सिडी नहीं ली गई हो",
        ],
        benefits: [
          "15% (शहरी/सामान्य) से 35% (ग्रामीण/विशेष श्रेणी) मार्जिन मनी सब्सिडी — ऋण की तरह चुकानी नहीं होती",
          "निःशुल्क EDP (उद्यमिता विकास कार्यक्रम) प्रशिक्षण शामिल",
          "सभी प्रमुख सार्वजनिक क्षेत्र के बैंकों के माध्यम से उपलब्ध",
        ],
        documents: [
          "आधार + पैन",
          "शैक्षणिक प्रमाणपत्र (सीमा से ऊपर की परियोजनाओं के लिए)",
          "जाति/दिव्यांगता/श्रेणी प्रमाणपत्र, यदि विशेष-श्रेणी सब्सिडी का दावा कर रहे हों",
          "विस्तृत परियोजना रिपोर्ट (DPR)",
          "बैंक खाता विवरण",
          "EDP प्रशिक्षण पूर्णता प्रमाणपत्र (पंजीकरण के बाद प्राप्त)",
        ],
        steps: [
          "kviconline.gov.in पर पंजीकरण करें",
          "व्यवसाय योजना विवरण के साथ ऑनलाइन आवेदन भरें",
          "आवेदन की समीक्षा जिला-स्तरीय टास्क फोर्स / KVIC / KVIB / DIC द्वारा की जाती है",
          "चयन पर, अनिवार्य EDP प्रशिक्षण (2–10 दिन) में भाग लें",
          "EDP पूर्णता प्रमाणपत्र प्राप्त करें",
          "बैंक ऋण स्वीकृत करता है; सब्सिडी 3 वर्ष के लिए TDR में रखी जाती है",
          "3 वर्ष के संतोषजनक संचालन के बाद, सब्सिडी मूलधन में समायोजित की जाती है",
        ],
        caveat: "पशुपालन बहिष्करण (डेयरी/पोल्ट्री) केवल 2024 में शिथिल किया गया — यह हाल का बदलाव है। शुद्ध व्यापार व्यवसाय (खुदरा, कृषि इनपुट खुदरा) अभी भी बाहर हैं।",
      },
      mr: {
        name: "पीएमईजीपी (PMEGP)",
        badge: "₹50 लाखांपर्यंत",
        tagline: "सरकारी अनुदान, पूर्ण परतफेड करावे लागणारे कर्ज नाही",
        amount: "प्रकल्प खर्चाच्या 15–35% मार्जिन मनी अनुदान (मर्यादा ₹50 लाख उत्पादन / ₹20 लाख सेवा)",
        description: "KVIC मार्फत पंतप्रधान रोजगार निर्मिती कार्यक्रम नवीन उत्पादन किंवा सेवा उद्योगांसाठी 15–35% मार्जिन मनी अनुदान देतो. लक्षात घ्या: शुद्ध व्यापार व्यवसाय वगळले आहेत — क्षेत्र-योग्यता पहा.",
        eligibility: [
          "वय 18 वर्षे आणि त्याहून अधिक",
          "₹10 लाख (उत्पादन) किंवा ₹5 लाख (सेवा) पेक्षा जास्त प्रकल्पांसाठी किमान 8वी उत्तीर्ण",
          "फक्त नवीन युनिट्स — विद्यमान/जुनी युनिट्स पात्र नाहीत",
          "एका कुटुंबातील फक्त एक व्यक्ती एका प्रकल्पासाठी PMEGP चा लाभ घेऊ शकते",
          "त्याच उद्देशासाठी दुसऱ्या सरकारी योजनेअंतर्गत आधीच अनुदान घेतलेले नसावे",
        ],
        benefits: [
          "15% (शहरी/सर्वसाधारण) ते 35% (ग्रामीण/विशेष प्रवर्ग) मार्जिन मनी अनुदान — कर्जासारखे परत करावे लागत नाही",
          "मोफत EDP (उद्योजकता विकास कार्यक्रम) प्रशिक्षण समाविष्ट",
          "सर्व प्रमुख सार्वजनिक क्षेत्रातील बँकांमार्फत उपलब्ध",
        ],
        documents: [
          "आधार + पॅन",
          "शैक्षणिक प्रमाणपत्र (मर्यादेपेक्षा जास्त प्रकल्पांसाठी)",
          "जात/अपंगत्व/प्रवर्ग प्रमाणपत्र, विशेष-प्रवर्ग अनुदानाचा दावा करत असल्यास",
          "सविस्तर प्रकल्प अहवाल (DPR)",
          "बँक खाते तपशील",
          "EDP प्रशिक्षण पूर्णता प्रमाणपत्र (नोंदणीनंतर मिळते)",
        ],
        steps: [
          "kviconline.gov.in वर नोंदणी करा",
          "व्यवसाय योजनेच्या तपशीलांसह ऑनलाइन अर्ज भरा",
          "अर्जाची छाननी जिल्हा-स्तरीय टास्क फोर्स / KVIC / KVIB / DIC द्वारे केली जाते",
          "निवड झाल्यावर, अनिवार्य EDP प्रशिक्षण (2–10 दिवस) घ्या",
          "EDP पूर्णता प्रमाणपत्र मिळवा",
          "बँक कर्ज मंजूर करते; अनुदान 3 वर्षांसाठी TDR मध्ये ठेवले जाते",
          "3 वर्षांच्या समाधानकारक कामकाजानंतर, अनुदान मुद्दलात समायोजित केले जाते",
        ],
        caveat: "पशुपालन वगळणी (दुग्धव्यवसाय/कुक्कुटपालन) फक्त 2024 मध्ये शिथिल करण्यात आली — हा अलीकडील बदल आहे. शुद्ध व्यापार व्यवसाय (किरकोळ, कृषी निविष्ठा किरकोळ) अजूनही वगळलेले आहेत.",
      },
    },
  },
  {
    key: "standup",
    color: "#1565C0",
    url: "https://www.standupmitra.in",
    sectorFit: {
      dairy: YES, poultry: YES, food_processing: YES,
      retail: YES, tailoring: YES, agri_input_retail: YES,
    },
    content: {
      en: {
        name: "Stand-Up India",
        badge: "SC/ST & Women",
        tagline: "Composite credit for greenfield enterprises",
        amount: "₹10 lakh – ₹1 crore",
        description: "Composite bank loans (term loan + working capital) for SC/ST individuals or women entrepreneurs setting up a brand-new greenfield enterprise.",
        eligibility: [
          "SC/ST individual, or woman entrepreneur (min. 51% shareholding if a company/partnership)",
          "Greenfield enterprise only — new setup, not expansion of an existing business",
          "Manufacturing, services, or trading sector",
          "Not a willful defaulter with any bank or institution",
        ],
        benefits: [
          "Composite loan: term loan + working capital in one product",
          "Repayment up to 7 years, moratorium up to 18 months",
          "Handholding support via SIDBI/NABARD",
          "Rupay Debit Card issued for working-capital access",
        ],
        documents: [
          "Aadhaar + PAN",
          "SC/ST certificate, or proof of being a woman entrepreneur",
          "Premises proof (rent agreement or ownership document)",
          "Project report with 3–5 year financial projections",
          "Bank statements — last 6 months",
          "No-dues certificate from any existing lenders",
        ],
        steps: [
          "Visit standupmitra.in or the nearest bank branch",
          "Register and complete the detailed online application",
          "Upload identity, category, and address proof",
          "Submit project report with financial projections",
          "Bank conducts a field visit/assessment of the proposed site",
          "Loan sanctioned, typically within 4–6 weeks of a complete application",
          "Amount disbursed; Rupay Debit Card issued",
        ],
      },
      hi: {
        name: "स्टैंड-अप इंडिया",
        badge: "SC/ST और महिलाएं",
        tagline: "ग्रीनफील्ड उद्यमों के लिए समग्र ऋण",
        amount: "₹10 लाख – ₹1 करोड़",
        description: "SC/ST व्यक्तियों या महिला उद्यमियों के लिए बिल्कुल नए ग्रीनफील्ड उद्यम स्थापित करने हेतु समग्र बैंक ऋण (टर्म लोन + कार्यशील पूंजी)।",
        eligibility: [
          "SC/ST व्यक्ति, या महिला उद्यमी (कंपनी/साझेदारी होने पर न्यूनतम 51% हिस्सेदारी)",
          "केवल ग्रीनफील्ड उद्यम — नई स्थापना, मौजूदा व्यवसाय का विस्तार नहीं",
          "विनिर्माण, सेवा, या व्यापार क्षेत्र",
          "किसी भी बैंक/संस्था का जानबूझकर चूककर्ता नहीं",
        ],
        benefits: [
          "समग्र ऋण: एक ही उत्पाद में टर्म लोन + कार्यशील पूंजी",
          "चुकौती 7 वर्ष तक, स्थगन 18 महीने तक",
          "SIDBI/नाबार्ड के माध्यम से हैंडहोल्डिंग सहायता",
          "कार्यशील पूंजी हेतु रुपे डेबिट कार्ड जारी",
        ],
        documents: [
          "आधार + पैन",
          "SC/ST प्रमाणपत्र, या महिला उद्यमी होने का प्रमाण",
          "परिसर प्रमाण (किराया समझौता या स्वामित्व दस्तावेज़)",
          "3–5 वर्ष के वित्तीय अनुमान सहित परियोजना रिपोर्ट",
          "बैंक स्टेटमेंट — पिछले 6 महीने",
          "किसी भी मौजूदा ऋणदाता से नो-ड्यूज़ प्रमाणपत्र",
        ],
        steps: [
          "standupmitra.in पर जाएं या निकटतम बैंक शाखा में जाएं",
          "पंजीकरण करें और विस्तृत ऑनलाइन आवेदन पूरा करें",
          "पहचान, श्रेणी और पता प्रमाण अपलोड करें",
          "वित्तीय अनुमान सहित परियोजना रिपोर्ट जमा करें",
          "बैंक प्रस्तावित स्थल का फील्ड निरीक्षण/मूल्यांकन करता है",
          "पूर्ण आवेदन के 4–6 सप्ताह के भीतर आमतौर पर ऋण स्वीकृत",
          "राशि वितरित; रुपे डेबिट कार्ड जारी",
        ],
      },
      mr: {
        name: "स्टँड-अप इंडिया",
        badge: "SC/ST आणि महिला",
        tagline: "ग्रीनफिल्ड उद्योगांसाठी संयुक्त कर्ज",
        amount: "₹10 लाख – ₹1 कोटी",
        description: "SC/ST व्यक्ती किंवा महिला उद्योजकांसाठी संपूर्ण नवीन ग्रीनफिल्ड उद्योग उभारण्यासाठी संयुक्त बँक कर्ज (मुदत कर्ज + खेळते भांडवल).",
        eligibility: [
          "SC/ST व्यक्ती, किंवा महिला उद्योजक (कंपनी/भागीदारी असल्यास किमान 51% भागभांडवल)",
          "फक्त ग्रीनफिल्ड उद्योग — नवीन स्थापना, विद्यमान व्यवसायाचा विस्तार नाही",
          "उत्पादन, सेवा किंवा व्यापार क्षेत्र",
          "कोणत्याही बँक/संस्थेचा जाणीवपूर्वक थकबाकीदार नाही",
        ],
        benefits: [
          "संयुक्त कर्ज: एकाच उत्पादनात मुदत कर्ज + खेळते भांडवल",
          "परतफेड 7 वर्षांपर्यंत, स्थगन 18 महिन्यांपर्यंत",
          "SIDBI/नाबार्डमार्फत मार्गदर्शन सहाय्य",
          "खेळत्या भांडवलासाठी रुपे डेबिट कार्ड जारी",
        ],
        documents: [
          "आधार + पॅन",
          "SC/ST प्रमाणपत्र, किंवा महिला उद्योजक असल्याचा पुरावा",
          "जागेचा पुरावा (भाडे करार किंवा मालकी कागदपत्र)",
          "3–5 वर्षांच्या आर्थिक अंदाजांसह प्रकल्प अहवाल",
          "बँक स्टेटमेंट — मागील 6 महिने",
          "विद्यमान कर्जदात्यांकडून नो-ड्यूज प्रमाणपत्र",
        ],
        steps: [
          "standupmitra.in वर भेट द्या किंवा जवळच्या बँक शाखेत जा",
          "नोंदणी करा आणि सविस्तर ऑनलाइन अर्ज पूर्ण करा",
          "ओळख, प्रवर्ग आणि पत्ता पुरावा अपलोड करा",
          "आर्थिक अंदाजांसह प्रकल्प अहवाल सादर करा",
          "बँक प्रस्तावित जागेची प्रत्यक्ष पाहणी/मूल्यांकन करते",
          "पूर्ण अर्जानंतर साधारण 4–6 आठवड्यांत कर्ज मंजूर होते",
          "रक्कम वितरित; रुपे डेबिट कार्ड जारी",
        ],
      },
    },
  },
  {
    key: "svanidhi",
    color: "#B8862B",
    url: "https://pmsvanidhi.mohua.gov.in",
    sectorFit: {
      dairy: NO, poultry: NO, food_processing: NO,
      retail: { level: "conditional", note: {
        en: "Relevant only to a street-vendor-style subset of retail, not a fixed shop.",
        hi: "यह केवल खुदरा के स्ट्रीट-वेंडर-जैसे उप-वर्ग के लिए प्रासंगिक है, स्थायी दुकान के लिए नहीं।",
        mr: "हे फक्त किरकोळ मधील फेरीवाला-सदृश उप-गटासाठी लागू आहे, स्थिर दुकानासाठी नाही.",
      }},
      tailoring: NO, agri_input_retail: NO,
    },
    content: {
      en: {
        name: "PM SVANidhi",
        badge: "₹15,000 – ₹50,000",
        tagline: "Working capital + cashback for street vendors",
        amount: "₹15,000 → ₹25,000 → ₹50,000 (tiered) + ₹30,000 RuPay credit limit",
        description: "Working-capital micro-credit for urban street vendors, recently revamped (Aug 2025) with higher tranches and a RuPay-linked credit card.",
        eligibility: [
          "Street vendor in an urban area, vending since before 24 March 2020",
          "Certificate of Vending, or a Town Vending Committee (TVC) recommendation letter",
          "Covered under a municipal/urban local body",
          "Aadhaar-linked active bank account",
        ],
        benefits: [
          "No collateral required",
          "7% interest subvention on timely repayment",
          "Cashback up to ₹1,200/year on digital repayment",
          "Builds formal credit history, unlocking larger tranches",
        ],
        documents: [
          "Aadhaar card",
          "Certificate of Vending / TVC recommendation letter",
          "Bank passbook",
          "Aadhaar-linked mobile number",
          "Passport-size photograph",
        ],
        steps: [
          "Visit pmsvanidhi.mohua.gov.in or your Urban Local Body office",
          "Obtain vending certificate or TVC recommendation",
          "Submit Aadhaar-linked bank account for verification",
          "ULB verifies vending details and location",
          "Loan approved by a partnered MFI/bank, typically within 15–20 days",
          "Amount disbursed directly to the bank account",
          "Repay on time to unlock the next, larger tranche",
        ],
        caveat: "Built specifically for mobile/street vending — a different business model from a fixed shop, farm, or workshop. Relevant only to a street-vendor-style subset of Retail.",
      },
      hi: {
        name: "पीएम स्वनिधि",
        badge: "₹15,000 – ₹50,000",
        tagline: "रेहड़ी-पटरी विक्रेताओं के लिए कार्यशील पूंजी + कैशबैक",
        amount: "₹15,000 → ₹25,000 → ₹50,000 (चरणबद्ध) + ₹30,000 रुपे क्रेडिट सीमा",
        description: "शहरी रेहड़ी-पटरी विक्रेताओं के लिए कार्यशील पूंजी माइक्रो-क्रेडिट, अगस्त 2025 में उच्च किश्तों और रुपे-लिंक्ड क्रेडिट कार्ड के साथ अद्यतन।",
        eligibility: [
          "शहरी क्षेत्र में रेहड़ी-पटरी विक्रेता, 24 मार्च 2020 से पहले से विक्रय कर रहे हों",
          "वेंडिंग प्रमाणपत्र, या टाउन वेंडिंग कमेटी (TVC) अनुशंसा पत्र",
          "किसी नगरपालिका/शहरी स्थानीय निकाय के अंतर्गत कवर",
          "आधार-लिंक्ड सक्रिय बैंक खाता",
        ],
        benefits: [
          "कोई गारंटी आवश्यक नहीं",
          "समय पर चुकौती पर 7% ब्याज सबवेंशन",
          "डिजिटल चुकौती पर ₹1,200/वर्ष तक कैशबैक",
          "औपचारिक क्रेडिट इतिहास बनता है, जिससे बड़ी किश्तें अनलॉक होती हैं",
        ],
        documents: [
          "आधार कार्ड",
          "वेंडिंग प्रमाणपत्र / TVC अनुशंसा पत्र",
          "बैंक पासबुक",
          "आधार-लिंक्ड मोबाइल नंबर",
          "पासपोर्ट साइज़ फोटो",
        ],
        steps: [
          "pmsvanidhi.mohua.gov.in पर जाएं या अपने शहरी स्थानीय निकाय कार्यालय में जाएं",
          "वेंडिंग प्रमाणपत्र या TVC अनुशंसा प्राप्त करें",
          "सत्यापन हेतु आधार-लिंक्ड बैंक खाता जमा करें",
          "ULB वेंडिंग विवरण और स्थान की पुष्टि करता है",
          "साझेदार MFI/बैंक द्वारा आमतौर पर 15–20 दिनों में ऋण स्वीकृत",
          "राशि सीधे बैंक खाते में वितरित",
          "समय पर चुकौती करके अगली, बड़ी किश्त अनलॉक करें",
        ],
        caveat: "यह विशेष रूप से मोबाइल/स्ट्रीट वेंडिंग के लिए बनाई गई है — एक निश्चित दुकान, खेत, या कार्यशाला से अलग व्यवसाय मॉडल। यह केवल खुदरा के स्ट्रीट-वेंडर-जैसे उप-वर्ग के लिए प्रासंगिक है।",
      },
      mr: {
        name: "पीएम स्वनिधी",
        badge: "₹15,000 – ₹50,000",
        tagline: "फेरीवाल्यांसाठी खेळते भांडवल + कॅशबॅक",
        amount: "₹15,000 → ₹25,000 → ₹50,000 (टप्प्याटप्प्याने) + ₹30,000 रुपे क्रेडिट मर्यादा",
        description: "शहरी फेरीवाल्यांसाठी खेळते भांडवल मायक्रो-क्रेडिट, ऑगस्ट 2025 मध्ये उच्च हप्ते आणि रुपे-लिंक्ड क्रेडिट कार्डसह अद्ययावत.",
        eligibility: [
          "शहरी भागातील फेरीवाला, 24 मार्च 2020 पूर्वीपासून विक्री करत असलेला",
          "विक्री प्रमाणपत्र, किंवा टाउन वेंडिंग कमिटी (TVC) शिफारस पत्र",
          "महानगरपालिका/शहरी स्थानिक स्वराज्य संस्थेअंतर्गत समाविष्ट",
          "आधार-लिंक्ड सक्रिय बँक खाते",
        ],
        benefits: [
          "कोणतेही तारण आवश्यक नाही",
          "वेळेवर परतफेडीवर 7% व्याज सवलत",
          "डिजिटल परतफेडीवर ₹1,200/वर्ष पर्यंत कॅशबॅक",
          "औपचारिक क्रेडिट इतिहास तयार होतो, ज्यामुळे मोठे हप्ते अनलॉक होतात",
        ],
        documents: [
          "आधार कार्ड",
          "विक्री प्रमाणपत्र / TVC शिफारस पत्र",
          "बँक पासबुक",
          "आधार-लिंक्ड मोबाईल क्रमांक",
          "पासपोर्ट आकाराचा फोटो",
        ],
        steps: [
          "pmsvanidhi.mohua.gov.in वर भेट द्या किंवा तुमच्या शहरी स्थानिक स्वराज्य संस्थेच्या कार्यालयात जा",
          "विक्री प्रमाणपत्र किंवा TVC शिफारस मिळवा",
          "पडताळणीसाठी आधार-लिंक्ड बँक खाते सादर करा",
          "ULB विक्री तपशील आणि स्थान पडताळते",
          "भागीदार MFI/बँकेकडून साधारण 15–20 दिवसांत कर्ज मंजूर",
          "रक्कम थेट बँक खात्यात वितरित",
          "वेळेवर परतफेड करून पुढील, मोठा हप्ता अनलॉक करा",
        ],
        caveat: "हे विशेषतः फिरत्या/रस्त्यावरील विक्रीसाठी बनवलेले आहे — निश्चित दुकान, शेत किंवा कार्यशाळेपेक्षा वेगळे व्यवसाय मॉडेल. हे फक्त किरकोळ मधील फेरीवाला-सदृश उप-गटासाठी लागू आहे.",
      },
    },
  },
  {
    key: "kcc",
    color: "#4C7A3D",
    url: "https://www.nabard.org",
    sectorFit: {
      dairy: YES, poultry: YES,
      food_processing: { level: "conditional", note: {
        en: "Only if processing your own farm produce, not a standalone unit buying inputs from others.",
        hi: "केवल तभी जब आप अपनी खुद की कृषि उपज संसाधित कर रहे हों, दूसरों से इनपुट खरीदने वाली इकाई के लिए नहीं।",
        mr: "फक्त जर तुम्ही स्वतःचा शेतमाल प्रक्रिया करत असाल, इतरांकडून निविष्ठा घेणाऱ्या युनिटसाठी नाही.",
      }},
      retail: NO, tailoring: NO, agri_input_retail: NO,
    },
    content: {
      en: {
        name: "Kisan Credit Card (KCC)",
        badge: "Agricultural Credit",
        tagline: "Revolving credit at effective 4% p.a.",
        amount: "Collateral-free up to ₹2 lakh; subvention up to ₹5 lakh",
        description: "Revolving credit for farmers and allied-activity entrepreneurs (dairy, poultry, fisheries), covering cultivation and post-harvest needs.",
        eligibility: [
          "Farmers (individual or joint) with owned or leased land",
          "Allied-activity participants: dairy, poultry, fisheries entrepreneurs",
          "Self-Help Groups and Joint Liability Groups",
          "Tenant farmers/oral lessees with proper documentation",
        ],
        benefits: [
          "Revolving credit — draw as needed, repay after harvest or sale",
          "Effective rate as low as 4% p.a. (after prompt-repayment incentive)",
          "Covers cultivation, post-harvest expenses, and allied activities",
          "RuPay KCC card for ATM access; personal accident insurance included",
        ],
        documents: [
          "Aadhaar + PAN",
          "Land records (7/12 extract, or Patta/Khata)",
          "Passport-size photograph",
          "Bank account proof",
          "Crop/livestock details",
        ],
        steps: [
          "Visit the nearest PSB, Regional Rural Bank, or cooperative bank",
          "Fill the KCC application with land and livestock/crop details",
          "Submit land records, Aadhaar, and photograph",
          "Bank conducts a field inspection",
          "Credit limit set based on land area, crop/livestock type, and scale",
          "KCC-linked RuPay card issued within about 7 days of approval",
          "Draw funds as needed; repay after harvest or sale",
        ],
        caveat: "For food processing, applies only if processing your own farm produce — not for a standalone processing unit buying inputs from others.",
      },
      hi: {
        name: "किसान क्रेडिट कार्ड (KCC)",
        badge: "कृषि ऋण",
        tagline: "प्रभावी रूप से 4% प्रति वर्ष पर रिवॉल्विंग क्रेडिट",
        amount: "बिना गारंटी ₹2 लाख तक; सबवेंशन ₹5 लाख तक",
        description: "किसानों और संबद्ध-गतिविधि उद्यमियों (डेयरी, पोल्ट्री, मत्स्य पालन) के लिए रिवॉल्विंग क्रेडिट, जो खेती और कटाई के बाद की ज़रूरतों को कवर करता है।",
        eligibility: [
          "स्वामित्व या पट्टे पर भूमि वाले किसान (व्यक्तिगत या संयुक्त)",
          "संबद्ध-गतिविधि प्रतिभागी: डेयरी, पोल्ट्री, मत्स्य पालन उद्यमी",
          "स्वयं सहायता समूह और संयुक्त देयता समूह",
          "उचित दस्तावेज़ीकरण के साथ किरायेदार किसान/मौखिक पट्टेदार",
        ],
        benefits: [
          "रिवॉल्विंग क्रेडिट — आवश्यकतानुसार निकालें, कटाई/बिक्री के बाद चुकाएं",
          "समय पर चुकौती प्रोत्साहन के बाद प्रभावी दर 4% प्रति वर्ष जितनी कम",
          "खेती, कटाई-बाद खर्च और संबद्ध गतिविधियों को कवर करता है",
          "ATM पहुंच हेतु रुपे KCC कार्ड; व्यक्तिगत दुर्घटना बीमा शामिल",
        ],
        documents: [
          "आधार + पैन",
          "भूमि रिकॉर्ड (7/12 उतारा, या पट्टा/खाता)",
          "पासपोर्ट साइज़ फोटो",
          "बैंक खाता प्रमाण",
          "फसल/पशुधन विवरण",
        ],
        steps: [
          "निकटतम PSB, क्षेत्रीय ग्रामीण बैंक, या सहकारी बैंक में जाएं",
          "भूमि और पशुधन/फसल विवरण के साथ KCC आवेदन भरें",
          "भूमि रिकॉर्ड, आधार और फोटो जमा करें",
          "बैंक फील्ड निरीक्षण करता है",
          "भूमि क्षेत्र, फसल/पशुधन प्रकार, और पैमाने के आधार पर क्रेडिट सीमा तय होती है",
          "स्वीकृति के लगभग 7 दिनों के भीतर KCC-लिंक्ड रुपे कार्ड जारी",
          "आवश्यकतानुसार राशि निकालें; कटाई/बिक्री के बाद चुकाएं",
        ],
        caveat: "खाद्य प्रसंस्करण के लिए, यह तभी लागू होता है जब आप अपनी खुद की कृषि उपज संसाधित कर रहे हों — दूसरों से इनपुट खरीदने वाली स्वतंत्र प्रसंस्करण इकाई के लिए नहीं।",
      },
      mr: {
        name: "किसान क्रेडिट कार्ड (KCC)",
        badge: "कृषी कर्ज",
        tagline: "प्रभावीपणे 4% प्रतिवर्ष दराने फिरते कर्ज",
        amount: "तारणमुक्त ₹2 लाखांपर्यंत; सवलत ₹5 लाखांपर्यंत",
        description: "शेतकरी आणि संलग्न-उपक्रम उद्योजकांसाठी (दुग्धव्यवसाय, कुक्कुटपालन, मत्स्यपालन) फिरते कर्ज, जे शेती आणि कापणीनंतरच्या गरजा भागवते.",
        eligibility: [
          "स्वतःची किंवा भाडेतत्त्वावरील जमीन असलेले शेतकरी (वैयक्तिक किंवा संयुक्त)",
          "संलग्न-उपक्रम सहभागी: दुग्धव्यवसाय, कुक्कुटपालन, मत्स्यपालन उद्योजक",
          "बचत गट आणि संयुक्त दायित्व गट",
          "योग्य कागदपत्रांसह भाडेकरू शेतकरी/तोंडी भाडेकरू",
        ],
        benefits: [
          "फिरते कर्ज — गरजेनुसार काढा, कापणी/विक्रीनंतर परतफेड करा",
          "वेळेवर परतफेड प्रोत्साहनानंतर प्रभावी दर 4% प्रतिवर्ष इतका कमी",
          "शेती, कापणीनंतरचा खर्च आणि संलग्न उपक्रम समाविष्ट",
          "ATM प्रवेशासाठी रुपे KCC कार्ड; वैयक्तिक अपघात विमा समाविष्ट",
        ],
        documents: [
          "आधार + पॅन",
          "जमीन नोंदी (7/12 उतारा, किंवा पट्टा/खाता)",
          "पासपोर्ट आकाराचा फोटो",
          "बँक खाते पुरावा",
          "पीक/पशुधन तपशील",
        ],
        steps: [
          "जवळच्या PSB, प्रादेशिक ग्रामीण बँक, किंवा सहकारी बँकेत जा",
          "जमीन आणि पशुधन/पीक तपशीलांसह KCC अर्ज भरा",
          "जमीन नोंदी, आधार आणि फोटो सादर करा",
          "बँक प्रत्यक्ष पाहणी करते",
          "जमिनीचे क्षेत्र, पीक/पशुधन प्रकार आणि प्रमाणानुसार क्रेडिट मर्यादा ठरते",
          "मंजुरीनंतर साधारण 7 दिवसांत KCC-लिंक्ड रुपे कार्ड जारी",
          "गरजेनुसार रक्कम काढा; कापणी/विक्रीनंतर परतफेड करा",
        ],
        caveat: "अन्न प्रक्रियेसाठी, हे फक्त तुम्ही स्वतःचा शेतमाल प्रक्रिया करत असाल तरच लागू होते — इतरांकडून निविष्ठा विकत घेणाऱ्या स्वतंत्र प्रक्रिया युनिटसाठी नाही.",
      },
    },
  },
  {
    key: "mahilaUdyam",
    color: "#DB2777",
    url: "https://www.pnbindia.in",
    lowConfidence: true,
    sectorFit: {
      dairy: YES, poultry: YES, food_processing: YES,
      retail: YES, tailoring: YES, agri_input_retail: YES,
    },
    content: {
      en: {
        name: "Mahila Udyam Nidhi (PNB)",
        badge: "Women only · Terms unconfirmed",
        tagline: "Confirm current terms directly with PNB",
        amount: "Reported up to ₹10 lakh (unconfirmed centrally)",
        description: "The original SIDBI-run scheme is discontinued. Punjab National Bank appears to be the only institution still offering something under this name — terms found are not centrally confirmed, so verify directly before relying on them.",
        eligibility: [
          "Woman entrepreneur (age reportedly 18–55, minimum 10th-standard pass, per unconfirmed sourcing)",
          "Exact eligibility not centrally published — confirm with your nearest PNB branch",
        ],
        benefits: [
          "Reported: up to ₹10 lakh, ~5% p.a., 5–7 years tenure (unconfirmed — verify with PNB before relying on these figures)",
        ],
        documents: [
          "Aadhaar + PAN",
          "Proof of being a woman entrepreneur",
          "Business plan",
          "Exact list not confirmed — ask your PNB branch for the current checklist",
        ],
        steps: [
          "Visit a PNB branch directly — do not rely on third-party sources for the application process",
          "Ask for the current terms and required documents in person",
          "Submit application as guided by the branch",
        ],
        caveat: "Low confidence: sourcing conflicts on whether this was discontinued in 2009. Do not treat any figure here as guaranteed — confirm before applying.",
      },
      hi: {
        name: "महिला उद्यम निधि (PNB)",
        badge: "केवल महिलाएं · शर्तें अपुष्ट",
        tagline: "मौजूदा शर्तें सीधे PNB से सत्यापित करें",
        amount: "कथित रूप से ₹10 लाख तक (केंद्रीय रूप से अपुष्ट)",
        description: "मूल SIDBI-संचालित योजना बंद हो चुकी है। पंजाब नेशनल बैंक (PNB) इस नाम के तहत कुछ पेशकश करने वाली एकमात्र संस्था प्रतीत होती है — मिली शर्तें केंद्रीय रूप से पुष्ट नहीं हैं, इसलिए इन पर भरोसा करने से पहले सीधे सत्यापित करें।",
        eligibility: [
          "महिला उद्यमी (अपुष्ट स्रोतों के अनुसार आयु 18–55, न्यूनतम 10वीं पास)",
          "सटीक पात्रता केंद्रीय रूप से प्रकाशित नहीं है — अपनी निकटतम PNB शाखा से पुष्टि करें",
        ],
        benefits: [
          "कथित: ₹10 लाख तक, ~5% प्रति वर्ष, 5–7 वर्ष अवधि (अपुष्ट — इन आंकड़ों पर भरोसा करने से पहले PNB से सत्यापित करें)",
        ],
        documents: [
          "आधार + पैन",
          "महिला उद्यमी होने का प्रमाण",
          "व्यवसाय योजना",
          "सटीक सूची अपुष्ट — वर्तमान चेकलिस्ट के लिए अपनी PNB शाखा से पूछें",
        ],
        steps: [
          "सीधे PNB शाखा में जाएं — आवेदन प्रक्रिया के लिए तीसरे पक्ष के स्रोतों पर भरोसा न करें",
          "व्यक्तिगत रूप से वर्तमान शर्तों और आवश्यक दस्तावेज़ों के बारे में पूछें",
          "शाखा के मार्गदर्शन अनुसार आवेदन जमा करें",
        ],
        caveat: "कम विश्वसनीयता: स्रोत इस बात पर असहमत हैं कि यह 2009 में बंद हुई थी या नहीं। यहां दिए किसी भी आंकड़े को गारंटीशुदा न मानें — आवेदन करने से पहले पुष्टि करें।",
      },
      mr: {
        name: "महिला उद्यम निधी (PNB)",
        badge: "फक्त महिला · अटी अपुष्ट",
        tagline: "सध्याच्या अटी थेट PNB कडून पडताळा",
        amount: "कथितरित्या ₹10 लाखांपर्यंत (केंद्रीयरित्या अपुष्ट)",
        description: "मूळ SIDBI-चालित योजना बंद झाली आहे. पंजाब नॅशनल बँक (PNB) या नावाखाली काहीतरी देणारी एकमेव संस्था असल्याचे दिसते — मिळालेल्या अटी केंद्रीयरित्या पुष्ट नाहीत, त्यामुळे यावर विसंबण्यापूर्वी थेट पडताळणी करा.",
        eligibility: [
          "महिला उद्योजक (अपुष्ट स्रोतांनुसार वय 18–55, किमान 10वी उत्तीर्ण)",
          "नेमकी पात्रता केंद्रीयरित्या प्रकाशित नाही — तुमच्या जवळच्या PNB शाखेकडून खात्री करा",
        ],
        benefits: [
          "कथित: ₹10 लाखांपर्यंत, ~5% प्रतिवर्ष, 5–7 वर्षे कालावधी (अपुष्ट — या आकड्यांवर विसंबण्यापूर्वी PNB कडून पडताळणी करा)",
        ],
        documents: [
          "आधार + पॅन",
          "महिला उद्योजक असल्याचा पुरावा",
          "व्यवसाय योजना",
          "नेमकी यादी अपुष्ट — सध्याच्या यादीसाठी तुमच्या PNB शाखेला विचारा",
        ],
        steps: [
          "थेट PNB शाखेत जा — अर्ज प्रक्रियेसाठी तृतीय-पक्ष स्रोतांवर विसंबू नका",
          "प्रत्यक्ष भेटीत सध्याच्या अटी आणि आवश्यक कागदपत्रांबाबत विचारा",
          "शाखेच्या मार्गदर्शनानुसार अर्ज सादर करा",
        ],
        caveat: "कमी विश्वासार्हता: ही योजना 2009 मध्ये बंद झाली की नाही याबद्दल स्रोतांमध्ये मतभेद आहेत. येथील कोणताही आकडा हमी म्हणून घेऊ नका — अर्ज करण्यापूर्वी खात्री करा.",
      },
    },
  },
  {
    key: "startupIndia",
    color: "#6366F1",
    url: "https://www.startupindia.gov.in",
    sectorFit: {
      dairy: YES, poultry: YES, food_processing: YES,
      retail: YES, tailoring: YES, agri_input_retail: YES,
    },
    content: {
      en: {
        name: "Startup India (DPIIT)",
        badge: "Tax + Mentoring · Needs innovation angle",
        tagline: "Recognition helps only genuinely innovative/scalable models",
        amount: "Non-monetary + Fund of Funds access",
        description: "DPIIT recognition gives self-certification under labour/environmental laws, patent-fee rebate, and access to a Fund of Funds — useful mainly if your business has a genuine innovation or scalability angle.",
        eligibility: [
          "Incorporated as Private Ltd, LLP, or Registered Partnership Firm",
          "Turnover below ₹200 crore in any year since incorporation",
          "Working towards innovation, development, or a scalable business model",
          "Less than 10 years old (up to 20 years for deep-tech/biotech)",
          "Not formed by splitting up or reconstructing an existing business",
        ],
        benefits: [
          "Self-certification under 6 labour + 3 environmental laws (automatic)",
          "80% rebate on patent filing fees (automatic)",
          "Faster exit/winding-up process (automatic)",
          "Access to government Fund of Funds via SIDBI",
        ],
        documents: [
          "Certificate of incorporation",
          "PAN card of the entity",
          "Description of the innovation or business model",
          "Director/partner KYC",
          "Pitch deck or business plan (recommended)",
        ],
        steps: [
          "Register on startupindia.gov.in",
          "Fill company and founder details",
          "Upload incorporation certificate and required documents",
          "Apply for DPIIT recognition — typically processed in 3–5 working days",
          "Separately apply for Section 80-IAC tax exemption via DPIIT/CBDT, if eligible — not automatic",
          "Use recognition to access the Startup India Hub for mentors and investors",
        ],
        caveat: "Income tax exemption is NOT automatic on DPIIT recognition — it needs a separate Section 80-IAC application and Inter-Ministerial Board approval. The earlier angel-tax exemption is no longer relevant since angel tax was abolished for FY 2025-26.",
      },
      hi: {
        name: "स्टार्टअप इंडिया (DPIIT)",
        badge: "टैक्स + मेंटरिंग · नवाचार आवश्यक",
        tagline: "मान्यता केवल वास्तविक रूप से नवोन्मेषी/स्केलेबल मॉडल की मदद करती है",
        amount: "गैर-मौद्रिक + फंड ऑफ फंड्स तक पहुंच",
        description: "DPIIT मान्यता श्रम/पर्यावरण कानूनों के तहत स्व-प्रमाणन, पेटेंट-शुल्क छूट, और फंड ऑफ फंड्स तक पहुंच देती है — यह मुख्य रूप से तभी उपयोगी है जब आपके व्यवसाय में वास्तविक नवाचार या स्केलेबिलिटी का पहलू हो।",
        eligibility: [
          "प्राइवेट लिमिटेड, LLP, या पंजीकृत साझेदारी फर्म के रूप में निगमित",
          "निगमन के बाद से किसी भी वर्ष में ₹200 करोड़ से कम टर्नओवर",
          "नवाचार, विकास, या स्केलेबल व्यवसाय मॉडल की दिशा में काम कर रहा हो",
          "10 वर्ष से कम पुराना (डीप-टेक/बायोटेक के लिए 20 वर्ष तक)",
          "किसी मौजूदा व्यवसाय को विभाजित या पुनर्गठित करके नहीं बनाया गया",
        ],
        benefits: [
          "6 श्रम + 3 पर्यावरण कानूनों के तहत स्व-प्रमाणन (स्वचालित)",
          "पेटेंट फाइलिंग शुल्क पर 80% छूट (स्वचालित)",
          "तेज़ी से बंद/समापन प्रक्रिया (स्वचालित)",
          "SIDBI के माध्यम से सरकारी फंड ऑफ फंड्स तक पहुंच",
        ],
        documents: [
          "निगमन प्रमाणपत्र",
          "संस्था का पैन कार्ड",
          "नवाचार या व्यवसाय मॉडल का विवरण",
          "निदेशक/साझेदार KYC",
          "पिच डेक या व्यवसाय योजना (अनुशंसित)",
        ],
        steps: [
          "startupindia.gov.in पर पंजीकरण करें",
          "कंपनी और संस्थापक विवरण भरें",
          "निगमन प्रमाणपत्र और आवश्यक दस्तावेज़ अपलोड करें",
          "DPIIT मान्यता के लिए आवेदन करें — आमतौर पर 3–5 कार्य दिवसों में संसाधित",
          "यदि पात्र हों तो अलग से धारा 80-IAC कर छूट के लिए DPIIT/CBDT प्रक्रिया के माध्यम से आवेदन करें — यह स्वचालित नहीं है",
          "मेंटरों और निवेशकों तक पहुंच के लिए स्टार्टअप इंडिया हब का उपयोग करें",
        ],
        caveat: "DPIIT मान्यता मिलने पर आयकर छूट स्वचालित नहीं है — इसके लिए अलग धारा 80-IAC आवेदन और अंतर-मंत्रालयी बोर्ड की मंज़ूरी चाहिए। पहले का एंजल-टैक्स छूट लाभ अब प्रासंगिक नहीं है क्योंकि वित्त वर्ष 2025-26 के लिए एंजल टैक्स समाप्त कर दिया गया है।",
      },
      mr: {
        name: "स्टार्टअप इंडिया (DPIIT)",
        badge: "कर + मार्गदर्शन · नावीन्यता आवश्यक",
        tagline: "मान्यता फक्त खऱ्या अर्थाने नाविन्यपूर्ण/वाढीच्या क्षमतेच्या मॉडेलला मदत करते",
        amount: "बिगर-आर्थिक + फंड ऑफ फंड्स प्रवेश",
        description: "DPIIT मान्यता कामगार/पर्यावरण कायद्यांतर्गत स्व-प्रमाणन, पेटंट-शुल्क सवलत, आणि फंड ऑफ फंड्सचा प्रवेश देते — हे मुख्यतः तेव्हाच उपयुक्त आहे जेव्हा तुमच्या व्यवसायात खरी नावीन्यता किंवा वाढीची क्षमता असेल.",
        eligibility: [
          "प्रायव्हेट लिमिटेड, LLP, किंवा नोंदणीकृत भागीदारी संस्था म्हणून समाविष्ट",
          "स्थापनेपासून कोणत्याही वर्षात ₹200 कोटींपेक्षा कमी उलाढाल",
          "नावीन्यता, विकास, किंवा वाढीच्या क्षमतेच्या व्यवसाय मॉडेलच्या दिशेने काम करत असणे",
          "10 वर्षांपेक्षा कमी जुने (डीप-टेक/बायोटेकसाठी 20 वर्षांपर्यंत)",
          "विद्यमान व्यवसाय विभाजित किंवा पुनर्रचना करून तयार केलेले नसावे",
        ],
        benefits: [
          "6 कामगार + 3 पर्यावरण कायद्यांतर्गत स्व-प्रमाणन (स्वयंचलित)",
          "पेटंट अर्ज शुल्कावर 80% सवलत (स्वयंचलित)",
          "जलद बंद/समाप्ती प्रक्रिया (स्वयंचलित)",
          "SIDBI मार्फत सरकारी फंड ऑफ फंड्सचा प्रवेश",
        ],
        documents: [
          "निगमन प्रमाणपत्र",
          "संस्थेचे पॅन कार्ड",
          "नावीन्यता किंवा व्यवसाय मॉडेलचे वर्णन",
          "संचालक/भागीदार KYC",
          "पिच डेक किंवा व्यवसाय योजना (शिफारसीय)",
        ],
        steps: [
          "startupindia.gov.in वर नोंदणी करा",
          "कंपनी आणि संस्थापक तपशील भरा",
          "निगमन प्रमाणपत्र आणि आवश्यक कागदपत्रे अपलोड करा",
          "DPIIT मान्यतेसाठी अर्ज करा — साधारण 3–5 कामकाजाच्या दिवसांत प्रक्रिया होते",
          "पात्र असल्यास स्वतंत्रपणे कलम 80-IAC कर सवलतीसाठी DPIIT/CBDT प्रक्रियेद्वारे अर्ज करा — हे स्वयंचलित नाही",
          "मार्गदर्शक आणि गुंतवणूकदारांपर्यंत पोहोचण्यासाठी स्टार्टअप इंडिया हबचा वापर करा",
        ],
        caveat: "DPIIT मान्यता मिळाल्यावर आयकर सवलत स्वयंचलित नाही — त्यासाठी स्वतंत्र कलम 80-IAC अर्ज आणि आंतर-मंत्रालयीन मंडळाची मंजुरी आवश्यक आहे. पूर्वीचा एंजल-टॅक्स सवलतीचा लाभ आता लागू नाही कारण आर्थिक वर्ष 2025-26 साठी एंजल टॅक्स रद्द करण्यात आला आहे.",
      },
    },
  },
  {
    key: "ahidf",
    color: "#8B6914",
    url: "https://udyamimitra.in",
    sectorFit: {
      dairy: YES,
      poultry: { level: "conditional", note: {
        en: "Only via the meat-processing/feed-plant angle, not for raising a small flock.",
        hi: "केवल मांस-प्रसंस्करण/आहार-संयंत्र के पहलू से, छोटे झुंड पालने के लिए नहीं।",
        mr: "फक्त मांस-प्रक्रिया/खाद्य-प्रकल्प अंगाने, लहान कळप पाळण्यासाठी नाही.",
      }},
      food_processing: NO, retail: NO, tailoring: NO, agri_input_retail: NO,
    },
    content: {
      en: {
        name: "AHIDF (Animal Husbandry Infrastructure Development Fund)",
        badge: "Scale-up · Dairy & Poultry infra",
        tagline: "For scaling up later, not a starter loan",
        amount: "Loan up to 90% of project cost (no fixed ceiling)",
        description: "Animal Husbandry Infrastructure Development Fund — supports new or upgraded dairy processing units, meat processing units, and animal feed plants. Replaces the discontinued NABARD DEDS scheme.",
        eligibility: [
          "Individual entrepreneurs, MSMEs, private companies, FPOs, dairy cooperatives, Section 8 companies",
          "Eligible activities: dairy/meat processing units, animal feed plants, breed multiplication farms, waste-to-wealth management",
        ],
        benefits: [
          "Loan up to 90% of project cost; beneficiary margin 10–25% depending on category",
          "3% interest subvention for all eligible entities",
          "NABARD Credit Guarantee Fund covers up to 25% of credit for MSMEs and dairy cooperatives",
          "Repayment up to 8 years, including a 2-year moratorium",
        ],
        documents: [
          "Education certificate, bank statements",
          "Detailed Project Report",
          "KYC documents — confirm exact checklist on the Udyami Mitra portal",
        ],
        steps: [
          "Visit the Udyami Mitra portal (udyamimitra.in)",
          "Log in using phone number and OTP",
          "Fill application with proposed infrastructure and project details",
          "Upload required documents and submit",
          "Project Management Agency reviews the bank-approved loan proposal",
          "Project Approval Committee approves projects up to ₹50 crore (larger projects go to the Project Sanctioning Committee)",
        ],
        caveat: "This is a scale-up option (illustrative example: ₹4 crore for a 200-animal dairy farm), not a first-loan option for a small starter setup. NABARD DEDS, which this replaces, has been discontinued since April 2020.",
      },
      hi: {
        name: "एएचआईडीएफ (AHIDF)",
        badge: "स्केल-अप · डेयरी व पोल्ट्री इंफ्रा",
        tagline: "बाद में विस्तार के लिए, शुरुआती ऋण नहीं",
        amount: "परियोजना लागत का 90% तक ऋण (कोई निश्चित सीमा नहीं)",
        description: "पशुपालन अवसंरचना विकास निधि — नई या उन्नत डेयरी प्रसंस्करण इकाइयों, मांस प्रसंस्करण इकाइयों, और पशु आहार संयंत्रों का समर्थन करती है। यह बंद हो चुकी नाबार्ड DEDS योजना की जगह लेती है।",
        eligibility: [
          "व्यक्तिगत उद्यमी, MSME, निजी कंपनियां, FPO, डेयरी सहकारी समितियां, धारा 8 कंपनियां",
          "पात्र गतिविधियां: डेयरी/मांस प्रसंस्करण इकाइयां, पशु आहार संयंत्र, प्रजनन गुणन फार्म, अपशिष्ट-से-संपदा प्रबंधन",
        ],
        benefits: [
          "परियोजना लागत का 90% तक ऋण; श्रेणी के अनुसार लाभार्थी मार्जिन 10–25%",
          "सभी पात्र संस्थाओं के लिए 3% ब्याज सबवेंशन",
          "नाबार्ड क्रेडिट गारंटी फंड MSME और डेयरी सहकारी समितियों के लिए क्रेडिट का 25% तक कवर करता है",
          "2 वर्ष के स्थगन सहित 8 वर्ष तक चुकौती",
        ],
        documents: [
          "शिक्षा प्रमाणपत्र, बैंक स्टेटमेंट",
          "विस्तृत परियोजना रिपोर्ट",
          "KYC दस्तावेज़ — उद्यमी मित्र पोर्टल पर सटीक चेकलिस्ट की पुष्टि करें",
        ],
        steps: [
          "उद्यमी मित्र पोर्टल (udyamimitra.in) पर जाएं",
          "मोबाइल नंबर और OTP से लॉगिन करें",
          "प्रस्तावित अवसंरचना और परियोजना विवरण के साथ आवेदन भरें",
          "आवश्यक दस्तावेज़ अपलोड करें और जमा करें",
          "प्रोजेक्ट मैनेजमेंट एजेंसी बैंक-स्वीकृत ऋण प्रस्ताव की समीक्षा करती है",
          "₹50 करोड़ तक की परियोजनाओं को प्रोजेक्ट अप्रूवल कमेटी मंज़ूरी देती है (बड़ी परियोजनाएं प्रोजेक्ट सैंक्शनिंग कमेटी के पास जाती हैं)",
        ],
        caveat: "यह एक स्केल-अप विकल्प है (उदाहरण: 200-पशु डेयरी फार्म के लिए ₹4 करोड़), छोटे शुरुआती सेटअप के लिए पहला ऋण विकल्प नहीं। इसकी जगह लेने वाली नाबार्ड DEDS अप्रैल 2020 से बंद है।",
      },
      mr: {
        name: "एएचआयडीएफ (AHIDF)",
        badge: "स्केल-अप · दुग्ध व कुक्कुट इन्फ्रा",
        tagline: "नंतर विस्तारासाठी, सुरुवातीचे कर्ज नाही",
        amount: "प्रकल्प खर्चाच्या 90% पर्यंत कर्ज (निश्चित मर्यादा नाही)",
        description: "पशुसंवर्धन पायाभूत सुविधा विकास निधी — नवीन किंवा सुधारित दुग्ध प्रक्रिया युनिट्स, मांस प्रक्रिया युनिट्स, आणि पशुखाद्य प्रकल्पांना पाठबळ देतो. ही बंद झालेल्या नाबार्ड DEDS योजनेची जागा घेते.",
        eligibility: [
          "वैयक्तिक उद्योजक, MSME, खाजगी कंपन्या, FPO, दुग्ध सहकारी संस्था, कलम 8 कंपन्या",
          "पात्र उपक्रम: दुग्ध/मांस प्रक्रिया युनिट्स, पशुखाद्य प्रकल्प, प्रजनन गुणाकार फार्म, कचरा-ते-संपत्ती व्यवस्थापन",
        ],
        benefits: [
          "प्रकल्प खर्चाच्या 90% पर्यंत कर्ज; प्रवर्गानुसार लाभार्थी मार्जिन 10–25%",
          "सर्व पात्र संस्थांसाठी 3% व्याज सवलत",
          "नाबार्ड क्रेडिट गॅरंटी फंड MSME आणि दुग्ध सहकारी संस्थांसाठी कर्जाच्या 25% पर्यंत कव्हर करतो",
          "2 वर्षांच्या स्थगनासह 8 वर्षांपर्यंत परतफेड",
        ],
        documents: [
          "शिक्षण प्रमाणपत्र, बँक स्टेटमेंट",
          "सविस्तर प्रकल्प अहवाल",
          "KYC कागदपत्रे — उद्यमी मित्र पोर्टलवर नेमकी यादी तपासा",
        ],
        steps: [
          "उद्यमी मित्र पोर्टलला (udyamimitra.in) भेट द्या",
          "मोबाईल क्रमांक आणि OTP ने लॉगिन करा",
          "प्रस्तावित पायाभूत सुविधा आणि प्रकल्प तपशीलांसह अर्ज भरा",
          "आवश्यक कागदपत्रे अपलोड करून सबमिट करा",
          "प्रोजेक्ट मॅनेजमेंट एजन्सी बँक-मंजूर कर्ज प्रस्तावाचे पुनरावलोकन करते",
          "₹50 कोटींपर्यंतच्या प्रकल्पांना प्रोजेक्ट अप्रूव्हल कमिटी मंजुरी देते (मोठे प्रकल्प प्रोजेक्ट सँक्शनिंग कमिटीकडे जातात)",
        ],
        caveat: "हा एक स्केल-अप पर्याय आहे (उदाहरण: 200-जनावरांच्या दुग्ध फार्मसाठी ₹4 कोटी), लहान सुरुवातीच्या सेटअपसाठी पहिला कर्ज पर्याय नाही. याची जागा घेणारी नाबार्ड DEDS एप्रिल 2020 पासून बंद आहे.",
      },
    },
  },
];

export function getSchemesForSector(sector: string): { scheme: GovtSchemeData; fit: SectorFitEntry }[] {
  const key = sector as SectorKey;
  return GOVT_SCHEMES
    .map((scheme) => ({ scheme, fit: scheme.sectorFit[key] }))
    .filter((entry): entry is { scheme: GovtSchemeData; fit: SectorFitEntry } => !!entry.fit && entry.fit.level !== "no");
}