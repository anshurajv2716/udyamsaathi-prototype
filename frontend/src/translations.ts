// Central translation dictionary for static UI text.
// Dynamic content (sector notes, capital-structuring items, the AI
// narrative) is translated separately at the backend/data level — this
// file only covers fixed labels, headings, button text, sector display
// names, feasibility recommendation labels, and chart legend labels.

export type Language = "en" | "hi" | "mr";

export const LANGUAGES: { key: Language; label: string }[] = [
  { key: "en", label: "English" },
  { key: "hi", label: "हिंदी" },
  { key: "mr", label: "मराठी" },
];

// ---------------------------------------------------------------------
// Sector display names. The backend always sends the raw sector key
// (e.g. "food_processing"), so this is the ONE place that maps a key to
// a localized display name — every screen must go through this instead
// of doing sector.replace(/_/g, " ") directly, which only ever produces
// English.
// ---------------------------------------------------------------------
export const SECTOR_NAMES: Record<string, Record<Language, string>> = {
  dairy: { en: "Dairy", hi: "डेयरी", mr: "दुग्धव्यवसाय" },
  retail: { en: "Retail", hi: "खुदरा", mr: "किरकोळ" },
  tailoring: { en: "Tailoring", hi: "सिलाई", mr: "शिवणकाम" },
  poultry: { en: "Poultry", hi: "पोल्ट्री", mr: "कुक्कुटपालन" },
  food_processing: { en: "Food Processing", hi: "खाद्य प्रसंस्करण", mr: "अन्न प्रक्रिया" },
  agri_input_retail: { en: "Agri Input Retail", hi: "कृषि इनपुट खुदरा", mr: "कृषी निविष्ठा किरकोळ" },
};

export function getSectorName(sector: string, lang: Language): string {
  return SECTOR_NAMES[sector]?.[lang] ?? sector.replace(/_/g, " ");
}

// ---------------------------------------------------------------------
// Feasibility recommendation badge labels. The backend's actual bands
// (see feasibility_engine.py RECOMMENDATION_BANDS) return exactly three
// fixed English strings: "High Potential", "Moderate Potential", and
// "Caution" — this maps each to a localized label without requiring a
// backend change.
// ---------------------------------------------------------------------
export const RECOMMENDATION_LABELS: Record<string, Record<Language, string>> = {
  "High Potential": { en: "High Potential", hi: "उच्च संभावना", mr: "उच्च क्षमता" },
  "Moderate Potential": { en: "Moderate Potential", hi: "मध्यम संभावना", mr: "मध्यम क्षमता" },
  "Caution": { en: "Caution", hi: "सावधानी आवश्यक", mr: "सावधगिरी आवश्यक" },
};

export function getRecommendationLabel(recommendation: string, lang: Language): string {
  return RECOMMENDATION_LABELS[recommendation]?.[lang] ?? recommendation;
}

// ---------------------------------------------------------------------
// Loan scheme name labels. financial_engine.py's route_scheme() only ever
// returns exactly two fixed English strings — "Micro Finance Scheme" or
// "Term Loan Scheme" — this maps each to a localized label without
// requiring any change to the deterministic financial engine.
// ---------------------------------------------------------------------
export const SCHEME_NAME_LABELS: Record<string, Record<Language, string>> = {
  "Micro Finance Scheme": { en: "Micro Finance Scheme", hi: "सूक्ष्म वित्त योजना", mr: "सूक्ष्म वित्त योजना" },
  "Term Loan Scheme": { en: "Term Loan Scheme", hi: "टर्म लोन योजना", mr: "मुदत कर्ज योजना" },
};

export function getSchemeName(scheme: string, lang: Language): string {
  return SCHEME_NAME_LABELS[scheme]?.[lang] ?? scheme;
}

export const translations = {
  en: {
    appTitle: "UdyamSaathi",
    tagline: "Business feasibility & loan structuring for rural micro-entrepreneurs",
    locateHeading: "Where are you exploring business options?",
    districtLabel: "District",
    subLocationLabel: "Village / sub-location (optional — scoring is done at district level)",
    subLocationPlaceholder: "e.g. Khadakwasla",
    locateButton: "Show me business options",
    buffetHeadingNear: "Business options near",
    buffetHeadingIn: "Business options in this district",
    buffetSubtext: "Ranked by local feasibility score. Scores are computed at the district/taluka level.",
    loadingOptions: "Loading options...",
    noDataMessage: "No business data available for this district yet.",
    chooseButton: "Choose this business",
    typicalInvestmentLabel: "Typical investment",
    capitalHeadingSuffix: "your available capital",
    capitalIntro: "Enter the margin money you currently have. We'll calculate your project size and loan eligibility from this.",
    capitalLabel: "Available margin capital (₹)",
    capitalButton: "Get my advisory report",
    backButton: "← Back",
    backToOptions: "← Back to options",
    reportTitle: "Your business financial structuring report",
    downloadPNG: "Download as Image (PNG)",
    downloadPDF: "Download as PDF",
    preparing: "Preparing...",
    generatingReport: "Generating your advisory report...",
    whatThisMeans: "What this means for you",
    yourInputs: "Your inputs",
    districtLine: "District",
    businessTypeLine: "Business type",
    availableCapitalLine: "Available margin capital",
    financialPosition: "Financial position & emergency reserve",
    rollingReserveText: "Out of your {total}, we recommend keeping {rolling} aside as a rolling/emergency reserve — not spent on setup, kept for unexpected costs.",
    fixedCapitalPlanning: "Fixed capital planning",
    workingCapitalPlanning: "Working capital planning",
    oneTimeAssetPurchases: "one-time asset purchases",
    recurringRunningCosts: "recurring running costs",
    cashFlowCycle: "Cash flow cycle",
    sourcesAndUses: "Sources & uses of funds (once loan is disbursed)",
    sourcesAndUsesSubtext: "This shows the FULL picture once your loan comes through — your own capital plus the loan, and how that full amount would be allocated at full scale.",
    sources: "Sources",
    uses: "Uses",
    total: "Total",
    localFeasibility: "Local feasibility",
    scoreLabel: "Score",
    profitabilityOutlook: "Profitability outlook",
    additionalLoanOption: "Additional option: scale up with a loan",
    additionalLoanIntro: "While the above lets you start right away, you're also eligible to apply for institutional finance to scale further:",
    projectCostLabel: "Project cost",
    loanAmountLabel: "Loan amount",
    schemeLabel: "Scheme",
    interestRateLabel: "Interest rate",
    tenureLabel: "Tenure",
    moratoriumLabel: "Moratorium",
    maxEligibleNote: "This is your maximum eligible loan under the scheme — you don't have to draw the full amount.",
    exploreSchemesTitle: "Explore other schemes:",
    exploreSchemesText: "Depending on your category (e.g. women entrepreneur, SC/ST-linked, or sector-specific schemes like NABARD DEDS for dairy), you may be eligible for additional support. Verify eligibility with your local channelizing agency — this tool only calculates the MSME margin-money scheme shown above.",
    verifiedData: "Verified data",
    estimated: "Estimated",
    fixedCapitalLegend: "Fixed Capital",
    workingCapitalLegend: "Working Capital",
    rollingCapitalLegend: "Rolling Capital",
    interestLegend: "Interest",
    principalLegend: "Principal",
    sourcesOwnCapitalLabel: "Your own capital",
    sourcesLoanLabel: "Eligible loan amount",
    howToUseCapitalTitle: "How to use this money",
    exportButtonLabel: "Export",
    exportPngOption: "Download as Image (PNG)",
    exportPdfOption: "Download as PDF",
    exportEmailOption: "Email me this report",
    emailInputPlaceholder: "you@example.com",
    emailSendButton: "Send",
    emailSending: "Sending...",
    emailSentConfirmation: "Report sent! Please check your inbox.",
    emailFailedMessage: "Couldn't send the email. Please try again.",
    emailInvalidMessage: "Please enter a valid email address.",
  },
  hi: {
    appTitle: "उद्यमसाथी",
    tagline: "ग्रामीण सूक्ष्म उद्यमियों के लिए व्यवसाय व्यवहार्यता और ऋण संरचना",
    locateHeading: "आप किस क्षेत्र में व्यवसाय के विकल्प देखना चाहते हैं?",
    districtLabel: "जिला",
    subLocationLabel: "गांव / उप-स्थान (वैकल्पिक — स्कोरिंग जिला स्तर पर की जाती है)",
    subLocationPlaceholder: "जैसे खडकवासला",
    locateButton: "मुझे व्यवसाय विकल्प दिखाएं",
    buffetHeadingNear: "व्यवसाय विकल्प, नज़दीक",
    buffetHeadingIn: "इस जिले में व्यवसाय विकल्प",
    buffetSubtext: "स्थानीय व्यवहार्यता स्कोर के अनुसार क्रमबद्ध। स्कोर जिला/तालुका स्तर पर गणना किए जाते हैं।",
    loadingOptions: "विकल्प लोड हो रहे हैं...",
    noDataMessage: "इस जिले के लिए अभी तक कोई व्यवसाय डेटा उपलब्ध नहीं है।",
    chooseButton: "यह व्यवसाय चुनें",
    typicalInvestmentLabel: "अनुमानित निवेश",
    capitalHeadingSuffix: "आपकी उपलब्ध पूंजी",
    capitalIntro: "आपके पास वर्तमान में जो मार्जिन राशि है वह दर्ज करें। हम इससे आपके प्रोजेक्ट का आकार और ऋण पात्रता की गणना करेंगे।",
    capitalLabel: "उपलब्ध मार्जिन पूंजी (₹)",
    capitalButton: "मेरी सलाहकार रिपोर्ट प्राप्त करें",
    backButton: "← वापस",
    backToOptions: "← विकल्पों पर वापस जाएं",
    reportTitle: "आपकी व्यावसायिक वित्तीय संरचना रिपोर्ट",
    downloadPNG: "छवि के रूप में डाउनलोड करें (PNG)",
    downloadPDF: "PDF के रूप में डाउनलोड करें",
    preparing: "तैयार हो रहा है...",
    generatingReport: "आपकी सलाहकार रिपोर्ट बनाई जा रही है...",
    whatThisMeans: "इसका आपके लिए क्या मतलब है",
    yourInputs: "आपकी जानकारी",
    districtLine: "जिला",
    businessTypeLine: "व्यवसाय प्रकार",
    availableCapitalLine: "उपलब्ध मार्जिन पूंजी",
    financialPosition: "वित्तीय स्थिति और आपातकालीन आरक्षित निधि",
    rollingReserveText: "आपके {total} में से, हम {rolling} को रोलिंग/आपातकालीन आरक्षित निधि के रूप में अलग रखने की सलाह देते हैं — जो शुरुआती व्यवस्था पर खर्च नहीं होती, बल्कि अप्रत्याशित खर्चों के लिए रखी जाती है।",
    fixedCapitalPlanning: "स्थायी पूंजी योजना",
    workingCapitalPlanning: "कार्यशील पूंजी योजना",
    oneTimeAssetPurchases: "एकमुश्त संपत्ति खरीद",
    recurringRunningCosts: "आवर्ती परिचालन लागत",
    cashFlowCycle: "नकदी प्रवाह चक्र",
    sourcesAndUses: "धन के स्रोत और उपयोग (ऋण मिलने के बाद)",
    sourcesAndUsesSubtext: "यह आपके ऋण मिलने के बाद की पूरी तस्वीर दिखाता है — आपकी अपनी पूंजी और ऋण, और उस पूरी राशि को पूर्ण पैमाने पर कैसे आवंटित किया जाएगा।",
    sources: "स्रोत",
    uses: "उपयोग",
    total: "कुल",
    localFeasibility: "स्थानीय व्यवहार्यता",
    scoreLabel: "स्कोर",
    profitabilityOutlook: "लाभप्रदता का दृष्टिकोण",
    additionalLoanOption: "अतिरिक्त विकल्प: ऋण के साथ विस्तार करें",
    additionalLoanIntro: "जहां ऊपर दी गई जानकारी आपको तुरंत शुरुआत करने देती है, वहीं आप आगे विस्तार के लिए संस्थागत वित्त हेतु भी पात्र हैं:",
    projectCostLabel: "प्रोजेक्ट लागत",
    loanAmountLabel: "ऋण राशि",
    schemeLabel: "योजना",
    interestRateLabel: "ब्याज दर",
    tenureLabel: "अवधि",
    moratoriumLabel: "स्थगन अवधि",
    maxEligibleNote: "यह योजना के तहत आपकी अधिकतम पात्र ऋण राशि है — आपको पूरी राशि लेना ज़रूरी नहीं है।",
    exploreSchemesTitle: "अन्य योजनाएं देखें:",
    exploreSchemesText: "आपकी श्रेणी के आधार पर (जैसे महिला उद्यमी, SC/ST-लिंक्ड, या डेयरी के लिए NABARD DEDS जैसी क्षेत्र-विशिष्ट योजनाएं), आप अतिरिक्त सहायता के पात्र हो सकते हैं। अपनी स्थानीय चैनलाइज़िंग एजेंसी से पात्रता सत्यापित करें — यह टूल केवल ऊपर दिखाई गई MSME मार्जिन-मनी योजना की गणना करता है।",
    verifiedData: "सत्यापित डेटा",
    estimated: "अनुमानित",
    fixedCapitalLegend: "स्थायी पूंजी",
    workingCapitalLegend: "कार्यशील पूंजी",
    rollingCapitalLegend: "रोलिंग पूंजी",
    interestLegend: "ब्याज",
    principalLegend: "मूलधन",
    sourcesOwnCapitalLabel: "आपकी अपनी पूंजी",
    sourcesLoanLabel: "पात्र ऋण राशि",
    howToUseCapitalTitle: "इस पैसे का उपयोग कैसे करें",
    exportButtonLabel: "एक्सपोर्ट",
    exportPngOption: "छवि के रूप में डाउनलोड करें (PNG)",
    exportPdfOption: "PDF के रूप में डाउनलोड करें",
    exportEmailOption: "मुझे यह रिपोर्ट ईमेल करें",
    emailInputPlaceholder: "you@example.com",
    emailSendButton: "भेजें",
    emailSending: "भेजा जा रहा है...",
    emailSentConfirmation: "रिपोर्ट भेज दी गई है! कृपया अपना इनबॉक्स देखें।",
    emailFailedMessage: "ईमेल नहीं भेजा जा सका। कृपया फिर से प्रयास करें।",
    emailInvalidMessage: "कृपया एक मान्य ईमेल पता दर्ज करें।",
  },
  mr: {
    appTitle: "उद्यमसाथी",
    tagline: "ग्रामीण सूक्ष्म उद्योजकांसाठी व्यवसाय व्यवहार्यता आणि कर्ज संरचना",
    locateHeading: "तुम्ही कोणत्या भागात व्यवसाय पर्याय शोधत आहात?",
    districtLabel: "जिल्हा",
    subLocationLabel: "गाव / उप-स्थान (ऐच्छिक — गुणांकन जिल्हा स्तरावर केले जाते)",
    subLocationPlaceholder: "उदा. खडकवासला",
    locateButton: "मला व्यवसाय पर्याय दाखवा",
    buffetHeadingNear: "व्यवसाय पर्याय, जवळ",
    buffetHeadingIn: "या जिल्ह्यातील व्यवसाय पर्याय",
    buffetSubtext: "स्थानिक व्यवहार्यता गुणांकानुसार क्रमवारी. गुणांक जिल्हा/तालुका स्तरावर मोजले जातात.",
    loadingOptions: "पर्याय लोड होत आहेत...",
    noDataMessage: "या जिल्ह्यासाठी अद्याप व्यवसाय डेटा उपलब्ध नाही.",
    chooseButton: "हा व्यवसाय निवडा",
    typicalInvestmentLabel: "अंदाजित गुंतवणूक",
    capitalHeadingSuffix: "तुमचे उपलब्ध भांडवल",
    capitalIntro: "तुमच्याकडे सध्या असलेली मार्जिन रक्कम टाका. यावरून आम्ही तुमच्या प्रकल्पाचा आकार आणि कर्ज पात्रता मोजू.",
    capitalLabel: "उपलब्ध मार्जिन भांडवल (₹)",
    capitalButton: "माझा सल्ला अहवाल मिळवा",
    backButton: "← मागे",
    backToOptions: "← पर्यायांकडे परत जा",
    reportTitle: "तुमचा व्यवसाय आर्थिक संरचना अहवाल",
    downloadPNG: "प्रतिमा म्हणून डाउनलोड करा (PNG)",
    downloadPDF: "PDF म्हणून डाउनलोड करा",
    preparing: "तयार होत आहे...",
    generatingReport: "तुमचा सल्ला अहवाल तयार होत आहे...",
    whatThisMeans: "याचा तुमच्यासाठी काय अर्थ आहे",
    yourInputs: "तुमची माहिती",
    districtLine: "जिल्हा",
    businessTypeLine: "व्यवसाय प्रकार",
    availableCapitalLine: "उपलब्ध मार्जिन भांडवल",
    financialPosition: "आर्थिक स्थिती आणि आपत्कालीन राखीव निधी",
    rollingReserveText: "तुमच्या {total} पैकी, आम्ही {rolling} रोलिंग/आणीबाणी राखीव निधी म्हणून बाजूला ठेवण्याची शिफारस करतो — जो सुरुवातीच्या खर्चासाठी वापरला जात नाही, तर अनपेक्षित खर्चांसाठी राखीव ठेवला जातो.",
    fixedCapitalPlanning: "स्थिर भांडवल नियोजन",
    workingCapitalPlanning: "खेळते भांडवल नियोजन",
    oneTimeAssetPurchases: "एकवेळची मालमत्ता खरेदी",
    recurringRunningCosts: "आवर्ती चालू खर्च",
    cashFlowCycle: "रोख प्रवाह चक्र",
    sourcesAndUses: "निधीचे स्रोत आणि उपयोग (कर्ज मिळाल्यानंतर)",
    sourcesAndUsesSubtext: "हे तुमचे कर्ज मिळाल्यानंतरचे संपूर्ण चित्र दाखवते — तुमचे स्वतःचे भांडवल आणि कर्ज, आणि ती पूर्ण रक्कम पूर्ण प्रमाणात कशी वाटप केली जाईल.",
    sources: "स्रोत",
    uses: "उपयोग",
    total: "एकूण",
    localFeasibility: "स्थानिक व्यवहार्यता",
    scoreLabel: "गुणांक",
    profitabilityOutlook: "नफाक्षमता दृष्टिकोन",
    additionalLoanOption: "अतिरिक्त पर्याय: कर्जासह विस्तार करा",
    additionalLoanIntro: "वरील माहिती तुम्हाला लगेच सुरुवात करू देते, पण पुढील विस्तारासाठी तुम्ही संस्थात्मक वित्तसाठीही पात्र आहात:",
    projectCostLabel: "प्रकल्प खर्च",
    loanAmountLabel: "कर्ज रक्कम",
    schemeLabel: "योजना",
    interestRateLabel: "व्याज दर",
    tenureLabel: "कालावधी",
    moratoriumLabel: "स्थगन कालावधी",
    maxEligibleNote: "ही योजनेअंतर्गत तुमची कमाल पात्र कर्ज रक्कम आहे — संपूर्ण रक्कम घेणे आवश्यक नाही.",
    exploreSchemesTitle: "इतर योजना पहा:",
    exploreSchemesText: "तुमच्या प्रवर्गावर अवलंबून (उदा. महिला उद्योजक, SC/ST-संबंधित, किंवा दुग्धव्यवसायासाठी NABARD DEDS सारख्या क्षेत्र-विशिष्ट योजना), तुम्ही अतिरिक्त सहाय्यासाठी पात्र असू शकता. पात्रता तुमच्या स्थानिक चॅनलायझिंग एजन्सीकडून तपासा — हे साधन फक्त वर दाखवलेल्या MSME मार्जिन-मनी योजनेची गणना करते.",
    verifiedData: "सत्यापित डेटा",
    estimated: "अंदाजित",
    fixedCapitalLegend: "स्थिर भांडवल",
    workingCapitalLegend: "खेळते भांडवल",
    rollingCapitalLegend: "रोलिंग भांडवल",
    interestLegend: "व्याज",
    principalLegend: "मुद्दल",
    sourcesOwnCapitalLabel: "तुमचे स्वतःचे भांडवल",
    sourcesLoanLabel: "पात्र कर्ज रक्कम",
    howToUseCapitalTitle: "हा पैसा कसा वापरायचा",
    exportButtonLabel: "एक्सपोर्ट",
    exportPngOption: "प्रतिमा म्हणून डाउनलोड करा (PNG)",
    exportPdfOption: "PDF म्हणून डाउनलोड करा",
    exportEmailOption: "मला हा अहवाल ईमेल करा",
    emailInputPlaceholder: "you@example.com",
    emailSendButton: "पाठवा",
    emailSending: "पाठवत आहे...",
    emailSentConfirmation: "अहवाल पाठवला गेला! कृपया तुमचा इनबॉक्स तपासा.",
    emailFailedMessage: "ईमेल पाठवता आला नाही. कृपया पुन्हा प्रयत्न करा.",
    emailInvalidMessage: "कृपया वैध ईमेल पत्ता टाका.",
  },
};

export function getTranslation(lang: Language) {
  return translations[lang];
}