"""
Profitability Outlook Mapper — additional module.

This does NOT predict revenue or profit numbers (we have no reliable basis
for that). Instead, it reuses the feasibility score's recommendation band
(already computed by feasibility_engine.py) and maps it to a qualitative,
range-based outlook statement. This is deliberately conservative: no rupee
figures, no specific timelines claimed as fact — only general patterns,
clearly framed as typical/expected rather than guaranteed.

MULTILINGUAL NOTE: the "recommendation" band key itself (High Potential /
Moderate Potential / Caution) stays in English internally — the frontend
uses this exact string to pick badge colors, so translating it would break
that logic. Only the descriptive text (outlook_text, stabilization window,
disclaimer) is translated, since that's what's actually read as prose.
"""

from dataclasses import dataclass

OUTLOOK_MAP = {
    "High Potential": {
        "outlook_text": {
            "en": "Businesses scoring in this range typically see steadier early demand and lower competitive pressure, which usually helps cash flow stabilize sooner than average for the sector.",
            "hi": "इस श्रेणी में स्कोर करने वाले व्यवसायों में आमतौर पर शुरुआती मांग अधिक स्थिर होती है और प्रतिस्पर्धी दबाव कम होता है, जिससे आमतौर पर नकदी प्रवाह क्षेत्र के औसत से जल्दी स्थिर हो जाता है।",
            "mr": "या श्रेणीत गुण मिळवणाऱ्या व्यवसायांमध्ये सहसा सुरुवातीची मागणी अधिक स्थिर असते आणि स्पर्धात्मक दबाव कमी असतो, त्यामुळे रोख प्रवाह क्षेत्राच्या सरासरीपेक्षा लवकर स्थिर होण्यास मदत होते.",
        },
        "typical_stabilization_window": {
            "en": "approximately 3-6 months",
            "hi": "लगभग 3-6 महीने",
            "mr": "साधारणपणे 3-6 महिने",
        },
    },
    "Moderate Potential": {
        "outlook_text": {
            "en": "Businesses scoring in this range usually see workable but not exceptional demand, with moderate competition. Cash flow stabilization may take somewhat longer, and closely tracking working capital in the early months is advisable.",
            "hi": "इस श्रेणी में स्कोर करने वाले व्यवसायों में आमतौर पर काम चलाऊ लेकिन असाधारण नहीं मांग होती है, मध्यम प्रतिस्पर्धा के साथ। नकदी प्रवाह को स्थिर होने में कुछ अधिक समय लग सकता है, और शुरुआती महीनों में कार्यशील पूंजी पर बारीकी से नज़र रखना उचित है।",
            "mr": "या श्रेणीत गुण मिळवणाऱ्या व्यवसायांमध्ये सहसा ठीकठाक पण असाधारण नसलेली मागणी असते, मध्यम स्पर्धेसह. रोख प्रवाह स्थिर होण्यास थोडा जास्त वेळ लागू शकतो, आणि सुरुवातीच्या महिन्यांत खेळत्या भांडवलावर बारकाईने लक्ष ठेवणे योग्य आहे.",
        },
        "typical_stabilization_window": {
            "en": "approximately 6-9 months",
            "hi": "लगभग 6-9 महीने",
            "mr": "साधारणपणे 6-9 महिने",
        },
    },
    "Caution": {
        "outlook_text": {
            "en": "Businesses scoring in this range face higher competitive or seasonal risk in this locality. This does not mean the business will fail, but it suggests starting at a smaller scale, keeping a larger reserve buffer, and reassessing after the first few months before committing further capital.",
            "hi": "इस श्रेणी में स्कोर करने वाले व्यवसायों को इस क्षेत्र में अधिक प्रतिस्पर्धी या मौसमी जोखिम का सामना करना पड़ता है। इसका मतलब यह नहीं है कि व्यवसाय विफल हो जाएगा, लेकिन यह सुझाव देता है कि छोटे पैमाने पर शुरुआत करें, बड़ा आरक्षित बफर रखें, और आगे पूंजी लगाने से पहले पहले कुछ महीनों के बाद पुनर्मूल्यांकन करें।",
            "mr": "या श्रेणीत गुण मिळवणाऱ्या व्यवसायांना या भागात अधिक स्पर्धात्मक किंवा हंगामी जोखीम असते. याचा अर्थ व्यवसाय अयशस्वी होईल असा नाही, पण लहान प्रमाणात सुरुवात करणे, मोठा राखीव निधी ठेवणे, आणि पुढील भांडवल गुंतवण्यापूर्वी पहिल्या काही महिन्यांनंतर पुनर्मूल्यांकन करणे सुचवले जाते.",
        },
        "typical_stabilization_window": {
            "en": "9-12 months or longer, approach cautiously",
            "hi": "9-12 महीने या उससे अधिक, सावधानी से आगे बढ़ें",
            "mr": "9-12 महिने किंवा त्याहून अधिक, सावधगिरीने पुढे जा",
        },
    },
}

DEFAULT_OUTLOOK = {
    "outlook_text": {
        "en": "Insufficient data to characterize typical outcomes for this score band.",
        "hi": "इस स्कोर श्रेणी के लिए विशिष्ट परिणामों को दर्शाने हेतु पर्याप्त डेटा नहीं है।",
        "mr": "या गुण श्रेणीसाठी ठराविक निकाल दर्शवण्यासाठी पुरेसा डेटा नाही.",
    },
    "typical_stabilization_window": {"en": "unknown", "hi": "अज्ञात", "mr": "अज्ञात"},
}

_DISCLAIMER = {
    "en": "This is a general pattern based on the feasibility score band, not a prediction of this specific business's revenue or profit.",
    "hi": "यह व्यवहार्यता स्कोर श्रेणी पर आधारित एक सामान्य पैटर्न है, इस विशिष्ट व्यवसाय की आय या लाभ की भविष्यवाणी नहीं है।",
    "mr": "हा व्यवहार्यता गुणांक श्रेणीवर आधारित एक सामान्य नमुना आहे, या विशिष्ट व्यवसायाच्या उत्पन्नाचा किंवा नफ्याचा अंदाज नाही.",
}


@dataclass
class ProfitabilityOutlook:
    recommendation: str
    outlook_text: str
    typical_stabilization_window: str
    evidence_tag: str = "expert_rule"
    disclaimer: str = ""


def get_profitability_outlook(recommendation: str, language: str = "en") -> ProfitabilityOutlook:
    """Given a recommendation band string (English key, from the
    feasibility engine) and a language code, returns a qualitative
    outlook with text in the requested language."""
    band_data = OUTLOOK_MAP.get(recommendation, DEFAULT_OUTLOOK)
    outlook_text = band_data["outlook_text"].get(language, band_data["outlook_text"]["en"])
    window = band_data["typical_stabilization_window"].get(language, band_data["typical_stabilization_window"]["en"])
    disclaimer = _DISCLAIMER.get(language, _DISCLAIMER["en"])

    return ProfitabilityOutlook(
        recommendation=recommendation,
        outlook_text=outlook_text,
        typical_stabilization_window=window,
        disclaimer=disclaimer,
    )


if __name__ == "__main__":
    for lang in ["en", "hi", "mr"]:
        print(f"=== {lang} ===")
        for band in ["High Potential", "Moderate Potential", "Caution"]:
            result = get_profitability_outlook(band, language=lang)
            print(f"{band}: {result.typical_stabilization_window}")
            print(f"  {result.outlook_text[:60]}...")
        print()