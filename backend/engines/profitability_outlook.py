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
disclaimer, stage labels/text) is translated, since that's what's actually
read as prose.

STAGES (added — Phase 6): the Figma reference design shows a 3-stage
timeline (Setup & Early Operations / Revenue Ramp-Up / Stable Operations)
rather than a single dense paragraph. This module stays sector-agnostic —
it has no access to sector-specific facts (that's feasibility_engine.py's
job) — so each stage's text describes the GENERAL pattern for that
recommendation band, not a specific sector's steps (no "buy an animal",
no "sow the crop" — those would be sector-specific claims this module
isn't positioned to make honestly). The three stages are the same
structural shape used in the Figma design: a phase label, a rough month
range, and a short qualitative description; only the content differs
by recommendation band, since risk/pacing genuinely differs by band.

`outlook_text` (the old single-paragraph field) is kept unchanged for
backward compatibility with anything still reading it directly — the new
`stages` field is additive, not a replacement.
"""

from dataclasses import dataclass, field

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
        "stages": [
            {
                "phase": {"en": "Month 1–2", "hi": "महीना 1–2", "mr": "महिना 1–2"},
                "label": {
                    "en": "Setup & Early Operations",
                    "hi": "स्थापना और शुरुआती संचालन",
                    "mr": "स्थापना आणि सुरुवातीचे कामकाज",
                },
                "text": {
                    "en": "Initial setup and first sales typically move quickly in this band, since local demand conditions are favorable from the start.",
                    "hi": "इस श्रेणी में शुरुआती स्थापना और पहली बिक्री आमतौर पर तेज़ी से होती है, क्योंकि स्थानीय मांग की स्थिति शुरू से ही अनुकूल होती है।",
                    "mr": "या श्रेणीत सुरुवातीची स्थापना आणि पहिली विक्री साधारणपणे वेगाने होते, कारण स्थानिक मागणीची स्थिती सुरुवातीपासूनच अनुकूल असते.",
                },
            },
            {
                "phase": {"en": "Month 2–4", "hi": "महीना 2–4", "mr": "महिना 2–4"},
                "label": {
                    "en": "Revenue Ramp-Up",
                    "hi": "राजस्व में वृद्धि",
                    "mr": "उत्पन्नात वाढ",
                },
                "text": {
                    "en": "Revenue typically builds steadily in this window, with lower-than-average competitive pressure easing the path to consistent sales.",
                    "hi": "इस अवधि में राजस्व आमतौर पर स्थिर रूप से बढ़ता है, और औसत से कम प्रतिस्पर्धी दबाव लगातार बिक्री का रास्ता आसान बनाता है।",
                    "mr": "या कालावधीत उत्पन्न साधारणपणे स्थिरपणे वाढते, आणि सरासरीपेक्षा कमी स्पर्धात्मक दबावामुळे सातत्यपूर्ण विक्रीचा मार्ग सुकर होतो.",
                },
            },
            {
                "phase": {"en": "Month 4+", "hi": "महीना 4+", "mr": "महिना 4+"},
                "label": {
                    "en": "Stable Operations",
                    "hi": "स्थिर संचालन",
                    "mr": "स्थिर कामकाज",
                },
                "text": {
                    "en": "Cash flow tends to stabilize by this point for businesses in this band. Continue tracking monthly costs closely even after stabilization.",
                    "hi": "इस श्रेणी के व्यवसायों में नकदी प्रवाह आमतौर पर इस समय तक स्थिर हो जाता है। स्थिर होने के बाद भी मासिक लागतों पर बारीकी से नज़र रखना जारी रखें।",
                    "mr": "या श्रेणीतील व्यवसायांमध्ये रोख प्रवाह साधारणपणे यावेळेपर्यंत स्थिर होतो. स्थिर झाल्यानंतरही मासिक खर्चावर बारकाईने लक्ष ठेवणे सुरू ठेवा.",
                },
            },
        ],
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
        "stages": [
            {
                "phase": {"en": "Month 1–3", "hi": "महीना 1–3", "mr": "महिना 1–3"},
                "label": {
                    "en": "Setup & Early Operations",
                    "hi": "स्थापना और शुरुआती संचालन",
                    "mr": "स्थापना आणि सुरुवातीचे कामकाज",
                },
                "text": {
                    "en": "Initial setup and first sales in this band typically take a bit longer to gain traction — moderate competition means early months are about establishing your customer base.",
                    "hi": "इस श्रेणी में शुरुआती स्थापना और पहली बिक्री को गति पकड़ने में थोड़ा अधिक समय लग सकता है — मध्यम प्रतिस्पर्धा का मतलब है कि शुरुआती महीने ग्राहक आधार स्थापित करने के बारे में हैं।",
                    "mr": "या श्रेणीत सुरुवातीची स्थापना आणि पहिली विक्री गती पकडण्यास थोडा जास्त वेळ लागू शकतो — मध्यम स्पर्धेचा अर्थ असा की सुरुवातीचे महिने ग्राहक आधार तयार करण्याबद्दल असतात.",
                },
            },
            {
                "phase": {"en": "Month 3–6", "hi": "महीना 3–6", "mr": "महिना 3–6"},
                "label": {
                    "en": "Revenue Ramp-Up",
                    "hi": "राजस्व में वृद्धि",
                    "mr": "उत्पन्नात वाढ",
                },
                "text": {
                    "en": "Revenue typically builds gradually through this window. Working capital buffers matter here — keep a close eye on monthly costs versus incoming sales.",
                    "hi": "इस अवधि में राजस्व आमतौर पर धीरे-धीरे बढ़ता है। यहां कार्यशील पूंजी बफर मायने रखते हैं — मासिक लागत बनाम आने वाली बिक्री पर बारीकी से नज़र रखें।",
                    "mr": "या कालावधीत उत्पन्न साधारणपणे हळूहळू वाढते. येथे खेळते भांडवल बफर महत्त्वाचे असतात — मासिक खर्च आणि येणारी विक्री यावर बारकाईने लक्ष ठेवा.",
                },
            },
            {
                "phase": {"en": "Month 6+", "hi": "महीना 6+", "mr": "महिना 6+"},
                "label": {
                    "en": "Stable Operations",
                    "hi": "स्थिर संचालन",
                    "mr": "स्थिर कामकाज",
                },
                "text": {
                    "en": "Cash flow stabilization is typical by this point, though somewhat later than a high-potential setup. Maintain your reserve buffer for any seasonal or competitive dips.",
                    "hi": "इस बिंदु तक नकदी प्रवाह का स्थिर होना सामान्य है, हालांकि उच्च-संभावना वाले सेटअप की तुलना में थोड़ा देर से। किसी भी मौसमी या प्रतिस्पर्धी गिरावट के लिए अपना आरक्षित बफर बनाए रखें।",
                    "mr": "याक्षणी रोख प्रवाह स्थिर होणे सामान्य आहे, जरी उच्च-संभाव्यतेच्या सेटअपपेक्षा थोडे उशिरा. कोणत्याही हंगामी किंवा स्पर्धात्मक घसरणीसाठी तुमचा राखीव बफर कायम ठेवा.",
                },
            },
        ],
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
        "stages": [
            {
                "phase": {"en": "Month 1–3", "hi": "महीना 1–3", "mr": "महिना 1–3"},
                "label": {
                    "en": "Setup & Early Operations",
                    "hi": "स्थापना और शुरुआती संचालन",
                    "mr": "स्थापना आणि सुरुवातीचे कामकाज",
                },
                "text": {
                    "en": "Start at a smaller scale in this band — higher competitive or seasonal risk in this locality means early months should focus on validating demand before committing further capital.",
                    "hi": "इस श्रेणी में छोटे पैमाने पर शुरुआत करें — इस क्षेत्र में अधिक प्रतिस्पर्धी या मौसमी जोखिम का मतलब है कि शुरुआती महीनों में आगे पूंजी लगाने से पहले मांग की पुष्टि पर ध्यान देना चाहिए।",
                    "mr": "या श्रेणीत लहान प्रमाणात सुरुवात करा — या भागातील अधिक स्पर्धात्मक किंवा हंगामी जोखमीचा अर्थ असा की सुरुवातीच्या महिन्यांत पुढील भांडवल गुंतवण्यापूर्वी मागणीची पडताळणी करण्यावर लक्ष केंद्रित करावे.",
                },
            },
            {
                "phase": {"en": "Month 3–8", "hi": "महीना 3–8", "mr": "महिना 3–8"},
                "label": {
                    "en": "Revenue Ramp-Up",
                    "hi": "राजस्व में वृद्धि",
                    "mr": "उत्पन्नात वाढ",
                },
                "text": {
                    "en": "Revenue growth may be uneven through this window given the higher risk profile. Reassess after the first few months before scaling up further, and keep a larger-than-usual reserve buffer.",
                    "hi": "अधिक जोखिम प्रोफ़ाइल को देखते हुए, इस अवधि में राजस्व वृद्धि असमान हो सकती है। आगे विस्तार करने से पहले पहले कुछ महीनों के बाद पुनर्मूल्यांकन करें, और सामान्य से बड़ा आरक्षित बफर रखें।",
                    "mr": "अधिक जोखीम प्रोफाइल लक्षात घेता, या कालावधीत उत्पन्न वाढ असमान असू शकते. पुढे विस्तार करण्यापूर्वी पहिल्या काही महिन्यांनंतर पुनर्मूल्यांकन करा, आणि नेहमीपेक्षा मोठा राखीव बफर ठेवा.",
                },
            },
            {
                "phase": {"en": "Month 8–12+", "hi": "महीना 8–12+", "mr": "महिना 8–12+"},
                "label": {
                    "en": "Stable Operations (if reached)",
                    "hi": "स्थिर संचालन (यदि पहुंचे)",
                    "mr": "स्थिर कामकाज (गाठल्यास)",
                },
                "text": {
                    "en": "Cash flow stabilization, if it happens, typically takes longer in this band. This does not mean the business will fail — it means a cautious, staged approach with regular reassessment is advisable.",
                    "hi": "यदि नकदी प्रवाह स्थिर होता है, तो इस श्रेणी में आमतौर पर अधिक समय लगता है। इसका मतलब यह नहीं है कि व्यवसाय विफल हो जाएगा — इसका मतलब है कि नियमित पुनर्मूल्यांकन के साथ एक सतर्क, चरणबद्ध दृष्टिकोण उचित है।",
                    "mr": "जर रोख प्रवाह स्थिर झाला, तर या श्रेणीत साधारणपणे जास्त वेळ लागतो. याचा अर्थ व्यवसाय अयशस्वी होईल असा नाही — याचा अर्थ नियमित पुनर्मूल्यांकनासह सावध, टप्प्याटप्प्याने दृष्टिकोन घेणे योग्य आहे.",
                },
            },
        ],
    },
}

DEFAULT_OUTLOOK = {
    "outlook_text": {
        "en": "Insufficient data to characterize typical outcomes for this score band.",
        "hi": "इस स्कोर श्रेणी के लिए विशिष्ट परिणामों को दर्शाने हेतु पर्याप्त डेटा नहीं है।",
        "mr": "या गुण श्रेणीसाठी ठराविक निकाल दर्शवण्यासाठी पुरेसा डेटा नाही.",
    },
    "typical_stabilization_window": {"en": "unknown", "hi": "अज्ञात", "mr": "अज्ञात"},
    "stages": [],
}

_DISCLAIMER = {
    "en": "This is a general pattern based on the feasibility score band, not a prediction of this specific business's revenue or profit.",
    "hi": "यह व्यवहार्यता स्कोर श्रेणी पर आधारित एक सामान्य पैटर्न है, इस विशिष्ट व्यवसाय की आय या लाभ की भविष्यवाणी नहीं है।",
    "mr": "हा व्यवहार्यता गुणांक श्रेणीवर आधारित एक सामान्य नमुना आहे, या विशिष्ट व्यवसायाच्या उत्पन्नाचा किंवा नफ्याचा अंदाज नाही.",
}


@dataclass
class ProfitabilityStage:
    phase: str
    label: str
    text: str
    evidence_tag: str = "expert_rule"


@dataclass
class ProfitabilityOutlook:
    recommendation: str
    outlook_text: str
    typical_stabilization_window: str
    evidence_tag: str = "expert_rule"
    disclaimer: str = ""
    stages: list = field(default_factory=list)  # NEW — list[ProfitabilityStage]


def _pick(bilingual: dict, language: str) -> str:
    """Same fallback rule used elsewhere in the backend: requested
    language if defined, else English, so a missing translation never
    crashes the report."""
    return bilingual.get(language, bilingual["en"])


def get_profitability_outlook(recommendation: str, language: str = "en") -> ProfitabilityOutlook:
    """Given a recommendation band string (English key, from the
    feasibility engine) and a language code, returns a qualitative
    outlook with text in the requested language, including a 3-stage
    timeline (stages) alongside the original single-paragraph
    outlook_text (kept for backward compatibility)."""
    band_data = OUTLOOK_MAP.get(recommendation, DEFAULT_OUTLOOK)
    outlook_text = _pick(band_data["outlook_text"], language)
    window = _pick(band_data["typical_stabilization_window"], language)
    disclaimer = _pick(_DISCLAIMER, language)

    stages = [
        ProfitabilityStage(
            phase=_pick(stage["phase"], language),
            label=_pick(stage["label"], language),
            text=_pick(stage["text"], language),
            evidence_tag="expert_rule",
        )
        for stage in band_data.get("stages", [])
    ]

    return ProfitabilityOutlook(
        recommendation=recommendation,
        outlook_text=outlook_text,
        typical_stabilization_window=window,
        disclaimer=disclaimer,
        stages=stages,
    )


if __name__ == "__main__":
    for lang in ["en", "hi", "mr"]:
        print(f"=== {lang} ===")
        for band in ["High Potential", "Moderate Potential", "Caution"]:
            result = get_profitability_outlook(band, language=lang)
            print(f"{band}: {result.typical_stabilization_window}  ({len(result.stages)} stages)")
            for stage in result.stages:
                print(f"  [{stage.phase}] {stage.label}: {stage.text[:50]}...")
        print()