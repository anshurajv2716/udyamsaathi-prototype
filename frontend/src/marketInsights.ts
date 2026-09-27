import type { Language } from "./translations";

export interface MarketInsight {
  text: Record<Language, string>;
  confidence: "high" | "medium" | "low";
}

export const MARKET_INSIGHTS: Record<string, MarketInsight> = {
  dairy: {
    confidence: "high",
    text: {
      en: "Maharashtra's cooperative dairies collect an average of 43.37 lakh litres of milk per day (2024–25) — a large, steady state-wide market with room for local producers near urban centres like Pune.",
      hi: "महाराष्ट्र की सहकारी डेयरियां प्रतिदिन औसतन 43.37 लाख लीटर दूध एकत्र करती हैं (2024–25) — पुणे जैसे शहरी केंद्रों के पास स्थानीय उत्पादकों के लिए एक बड़ा, स्थिर राज्यव्यापी बाज़ार।",
      mr: "महाराष्ट्रातील सहकारी दुग्धसंस्था दररोज सरासरी 43.37 लाख लिटर दूध गोळा करतात (2024–25) — पुण्यासारख्या शहरी केंद्रांजवळील स्थानिक उत्पादकांसाठी एक मोठी, स्थिर राज्यव्यापी बाजारपेठ.",
    },
  },
  poultry: {
    confidence: "high",
    text: {
      en: "Maharashtra has over 7.42 crore poultry birds and around 14.26 lakh families engaged in the sector — a well-established rural livelihood with strong demand from urban centres like Pune, Nashik, and Mumbai.",
      hi: "महाराष्ट्र में 7.42 करोड़ से अधिक पोल्ट्री पक्षी हैं और लगभग 14.26 लाख परिवार इस क्षेत्र से जुड़े हैं — पुणे, नासिक और मुंबई जैसे शहरी केंद्रों से मज़बूत मांग के साथ एक सुस्थापित ग्रामीण आजीविका।",
      mr: "महाराष्ट्रात 7.42 कोटींहून अधिक कुक्कुटपक्षी आहेत आणि सुमारे 14.26 लाख कुटुंबे या क्षेत्राशी जोडलेली आहेत — पुणे, नाशिक आणि मुंबईसारख्या शहरी केंद्रांकडून मजबूत मागणी असलेली एक सुस्थापित ग्रामीण उपजीविका.",
    },
  },
  food_processing: {
    confidence: "high",
    text: {
      en: "Maharashtra accounts for about 17% of India's food processing industry and 15% of national food exports — one of the strongest state-level bases for this sector in the country.",
      hi: "महाराष्ट्र भारत के खाद्य प्रसंस्करण उद्योग का लगभग 17% और राष्ट्रीय खाद्य निर्यात का 15% हिस्सा है — देश में इस क्षेत्र के लिए सबसे मज़बूत राज्य-स्तरीय आधारों में से एक।",
      mr: "महाराष्ट्र भारताच्या अन्न प्रक्रिया उद्योगाच्या सुमारे 17% आणि राष्ट्रीय अन्न निर्यातीच्या 15% वाटा उचलतो — देशातील या क्षेत्रासाठी सर्वात मजबूत राज्य-स्तरीय आधारांपैकी एक.",
    },
  },
  retail: {
    confidence: "medium",
    text: {
      en: "Maharashtra has the highest number of registered MSMEs in India (about 47.78 lakh), with over half based in rural areas — a strong indicator of steady local retail demand, though a sector-specific figure for retail alone wasn't available.",
      hi: "भारत में सबसे अधिक पंजीकृत MSME महाराष्ट्र में हैं (लगभग 47.78 लाख), जिनमें से आधे से अधिक ग्रामीण क्षेत्रों में हैं — स्थिर स्थानीय खुदरा मांग का एक मज़बूत संकेत, हालांकि केवल खुदरा के लिए क्षेत्र-विशिष्ट आंकड़ा उपलब्ध नहीं था।",
      mr: "भारतात सर्वाधिक नोंदणीकृत MSME महाराष्ट्रात आहेत (सुमारे 47.78 लाख), त्यापैकी निम्म्याहून अधिक ग्रामीण भागात आहेत — स्थिर स्थानिक किरकोळ मागणीचे एक मजबूत संकेत, जरी फक्त किरकोळसाठी क्षेत्र-विशिष्ट आकडा उपलब्ध नव्हता.",
    },
  },
  tailoring: {
    confidence: "low",
    text: {
      en: "A tailoring-specific market figure wasn't found in verified sources — but Maharashtra's broader textile and MSME base is strong, and demand for local stitching/alteration services tends to track steady rural population growth rather than large swings.",
      hi: "सत्यापित स्रोतों में सिलाई-विशिष्ट बाज़ार का आंकड़ा नहीं मिला — लेकिन महाराष्ट्र का व्यापक वस्त्र और MSME आधार मज़बूत है, और स्थानीय सिलाई/अल्टरेशन सेवाओं की मांग बड़े उतार-चढ़ाव के बजाय स्थिर ग्रामीण जनसंख्या वृद्धि के साथ चलती है।",
      mr: "पडताळणी झालेल्या स्रोतांमध्ये शिवणकाम-विशिष्ट बाजार आकडा सापडला नाही — पण महाराष्ट्राचा व्यापक वस्त्रोद्योग आणि MSME आधार मजबूत आहे, आणि स्थानिक शिवणकाम/दुरुस्ती सेवांची मागणी मोठ्या चढ-उतारांऐवजी स्थिर ग्रामीण लोकसंख्या वाढीसोबत चालते.",
    },
  },
  agri_input_retail: {
    confidence: "low",
    text: {
      en: "A specific market figure for agri-input retail wasn't found in verified sources — but Maharashtra's large agricultural base (one of India's top states by cultivated area) means steady, recurring demand for seeds, fertilizer, and farming supplies near rural markets.",
      hi: "कृषि इनपुट खुदरा के लिए विशिष्ट बाज़ार आंकड़ा सत्यापित स्रोतों में नहीं मिला — लेकिन महाराष्ट्र का बड़ा कृषि आधार (खेती योग्य क्षेत्र के मामले में भारत के शीर्ष राज्यों में से एक) ग्रामीण बाज़ारों के पास बीज, उर्वरक और कृषि आपूर्ति की स्थिर, आवर्ती मांग दर्शाता है।",
      mr: "कृषी निविष्ठा किरकोळसाठी विशिष्ट बाजार आकडा पडताळणी झालेल्या स्रोतांमध्ये सापडला नाही — पण महाराष्ट्राचा मोठा कृषी आधार (लागवडीखालील क्षेत्रानुसार भारतातील अग्रगण्य राज्यांपैकी एक) ग्रामीण बाजारांजवळ बियाणे, खते आणि शेती साहित्याची स्थिर, आवर्ती मागणी दर्शवतो.",
    },
  },
};