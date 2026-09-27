# 🌾 UdyamSaathi

### AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant for Rural Micro-Entrepreneurs

**Smart India Hackathon 2026 · SIH26091 · Team NEXUS**

![Smart India Hackathon 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-2F5233?style=for-the-badge)
![React TypeScript](https://img.shields.io/badge/React-TypeScript-3178C6?style=for-the-badge&logo=react&logoColor=white)
![FastAPI Python](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

**📍 Local Insights** · **💰 Financial Planning** · **🏦 Scheme Guidance** · **📊 Business Advisory**

---

## 🌱 What is UdyamSaathi?

**UdyamSaathi** — meaning *business companion* — is a web-based decision-support platform designed for rural micro-entrepreneurs and aspiring small business owners.

It takes three simple inputs:

```text
📍 District / Location
        ↓
🏪 Business Sector
        ↓
💰 Available Capital
        ↓
🧠 Advisory Analysis
        ↓
📊 Personalized Business Report
```

The platform combines hyper-local feasibility analysis, capital structuring, financing guidance, profitability outlook, multilingual explanations, and report visualization into one guided experience.

> **UdyamSaathi is a decision-support tool, not a lending platform.** It does not disburse loans or connect users directly to a bank.

---

## 🎯 The Problem

Rural micro-entrepreneurs often lack access to:

| Challenge | Why it matters |
|---|---|
| 📍 **Localized market intelligence** | Generic advice may ignore local demand, competition, seasonality and logistics. |
| 💰 **Structured financial planning** | Entrepreneurs may not know how to divide capital between fixed assets, working capital and reserves. |
| 🏦 **Financing & scheme awareness** | Suitable financing routes can be difficult to identify and understand. |
| 🌐 **Accessible language** | Financial and business information is often difficult to use when it is not available in familiar regional languages. |

UdyamSaathi brings these pieces together into a single, guided advisory journey.

---

## 💡 Our Solution

UdyamSaathi transforms a small amount of user input into a structured advisory report covering:

- 📈 **Local feasibility** — district-level demand, competition, seasonality and logistics factors
- 💼 **Capital structuring** — fixed capital, working capital and reserve allocation
- 🏦 **Financial planning** — project cost, loan requirement, financing route, interest rate and tenure
- 🧮 **EMI planning** — amortization schedule and applicable moratorium information
- 📊 **Profitability outlook** — an indicative stabilization window, not a guaranteed prediction
- 🧩 **Factor analysis** — clearer interpretation of the strongest and weakest feasibility factors
- 🧠 **SWOT-style insights** — strengths, weaknesses, opportunities and threats
- 🏛️ **Government scheme guidance** — informational and navigational scheme resources
- 🤖 **AI narrative** — a plain-language explanation of the structured report
- 🌐 **Multilingual experience** — English, Hindi and Marathi

---

## ✨ Key Features

### 📍 1. Hyper-Local Feasibility
```text
📈 Demand   🏪 Competition   🌦️ Seasonality   🚚 Logistics
```
Produces a **0–100 feasibility score**, recommendation band and factor-level interpretation.

### 💰 2. Capital Structuring
```text
💼 Fixed Capital + 🔄 Working Capital + 🛡️ Reserve / Emergency Buffer
```

### 🏦 3. Financial & Loan Planning
Project cost · Loan amount · Financing scheme · Interest rate · Tenure · EMI/amortization schedule · Moratorium information

### 📈 4. Profitability Outlook
```text
🚀 Business Start → 📦 Initial Setup → ⚙️ Operations Stabilize → 📈 Stabilization Window
```
Presented as a general pattern for the score/sector context — **not a guaranteed forecast**.

### 🧩 5. Factor-Based Insights
```text
Demand        █████████░  Strong
Competition   ██████░░░░  Moderate
Seasonality   ████████░░  Good
Logistics     █████░░░░░  Needs Attention
```

### 🧠 6. SWOT Analysis
💪 Strengths · ⚠️ Weaknesses · 🚀 Opportunities · 🛡️ Threats

### 🏛️ 7. Government Scheme Guidance
Informational and navigational only — not for approving or disbursing loans.

### 🌐 8. Multilingual Experience

| Language | Availability |
|---|---|
| 🇬🇧 English | ✅ |
| 🇮🇳 हिंदी | ✅ |
| 🇮🇳 मराठी | ✅ |

Static interface labels are maintained through the central translation system, while computed advisory content is supplied through the backend response.

---

## 🖥️ User Journey

```text
👋 Welcome → 📍 Locate → 🏪 Business Options → 💰 Capital → 📊 Advisory Report
                                                                    │
                            ┌───────────┬───────────┬──────────┬───┘
                            ▼           ▼           ▼          ▼
                          📈 Feasi-   🧩 Factor   🧠 SWOT   💰 Finance   🏛️ Schemes
                             bility     Analysis
```

---

## 🎨 Redesigned Report Experience

The latest UI/UX update introduces a richer report experience with dedicated components for:

- 📊 Factor-band visualization · 🧠 SWOT analysis · 📈 Profitability timeline
- 🏛️ Government schemes · 📑 Report tabs · ❓ FAQ / help experience
- 👋 Welcome/onboarding experience · 🖼️ Sector-specific imagery

### Newly introduced frontend pieces

```text
frontend/src/
├── assets/
│   ├── sector-agri-input-retail.jpg
│   ├── sector-dairy.jpg
│   ├── sector-food-processing.jpg
│   ├── sector-poultry.jpg
│   ├── sector-retail.jpg
│   └── sector-tailoring.jpg
├── components/
│   ├── FactorBandGrid.tsx
│   ├── GovernmentSchemes.tsx
│   ├── ProfitabilityTimeline.tsx
│   ├── ReportTabs.tsx
│   └── SwotPanel.tsx
├── screen/
│   ├── WelcomeScreen.tsx
│   └── FaqScreen.tsx
├── faqData.ts
├── govtSchemesData.ts
└── sectorImages.ts
```

---

## 🏗️ System Architecture

```text
                         👤 USER
                           │
                           ▼
              ┌────────────────────────┐
              │   React + TypeScript   │
              │       Frontend         │
              └───────────┬────────────┘
                          │ API / HTTP
                          ▼
              ┌────────────────────────┐
              │     FastAPI Backend    │
              └───────────┬────────────┘
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
   ┌────────────┐  ┌────────────┐  ┌───────────────┐
   │ Feasibility│  │ Financial  │  │ Profitability │
   │   Engine   │  │   Engine   │  │    Engine     │
   └────────────┘  └────────────┘  └───────────────┘
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                 ┌────────────────┐
                 │  🧠 LLM Narrator│
                 └───────┬────────┘
                         ▼
                 📊 Advisory Response
                         │
                         ▼
                 ┌─────────────────┐
                 │ Report Interface│
                 └─────────────────┘
```

---

## 🧠 Backend Engines

| Engine | Responsibility |
|---|---|
| `feasibility_engine.py` | Computes sector feasibility from demand, competition, seasonality and logistics factors |
| `bootstrap_engine.py` | Splits available capital into fixed, working and reserve components |
| `financial_engine.py` | Builds project financing, loan amount, scheme route and EMI/amortization schedule |
| `profitability_outlook.py` | Estimates a typical stabilization window and produces an outlook note |
| `narrator.py` | Uses Gemini to turn the structured report into a plain-language narrative in the selected language |

---

## 🔌 Frontend ↔ Backend Contract

The frontend does not hardcode computed business logic or financial numbers. The backend provides the structured `AdvisoryResponse`, while `translations.ts` handles static interface text — headings, buttons, labels, sector names, scheme labels. This separation keeps computation and presentation distinct.

---

## 📂 Project Structure

```text
UdyamSaathi/
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── screen/
│       ├── api.ts
│       ├── faqData.ts
│       ├── govtSchemesData.ts
│       ├── sectorImages.ts
│       ├── translations.ts
│       └── types.ts
├── backend/
│   ├── engines/
│   │   ├── feasibility_engine.py
│   │   ├── financial_engine.py
│   │   ├── bootstrap_engine.py
│   │   └── profitability_outlook.py
│   ├── llm/
│   │   └── narrator.py
│   ├── data/
│   └── main.py
├── .gitignore
├── package.json
└── README.md
```

---

## 📍 Current Prototype Coverage

**Districts:** 📍 Pune (Rural Talukas) · 📍 Ahmednagar
**Sectors:** 🌾 Agri Input Retail · 🐄 Dairy · 🐔 Poultry · 🍱 Food Processing · 🛍️ Retail · 🧵 Tailoring
**Languages:** 🇬🇧 English · 🇮🇳 Hindi · 🇮🇳 Marathi

> Adding another district requires a corresponding JSON data file following the existing backend data structure — no frontend change needed.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | React 19 + TypeScript |
| ⚡ Build | Vite |
| 📊 Charts | Recharts |
| 🎯 Icons | lucide-react |
| 🐍 Backend | FastAPI + Python |
| 🤖 AI Narrative | Gemini |
| 📄 Export | html2canvas + jsPDF |
| 📧 Email | Resend |
| 🗂️ Data | Flat JSON files |
| 🔀 Version Control | Git + GitHub |

---

## 🚀 Running Locally

### Prerequisites
- Python 3.11+ · Node.js 18+ · Gemini API key · Resend API key (optional, for email reports)

### Backend

```powershell
cd backend
venv\Scripts\Activate.ps1
```

`.env` inside `backend/` (never commit this):
```env
GEMINI_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
```

```powershell
uvicorn main:app --reload --port 8000
```
Docs at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm run dev
```
Runs at `http://localhost:5173`, expects the backend at `http://localhost:8000`.

---

## 📊 Project Status

- ✅ Hyper-local feasibility scoring · Capital structuring · Financial planning · Loan routing · EMI/amortization scheduling
- ✅ English / Hindi / Marathi interface + AI-generated narrative
- ✅ PDF/PNG export · Email report delivery
- ✅ Factor analysis · SWOT-style analysis · Profitability timeline
- ✅ Government scheme guidance · FAQ/onboarding experience · Redesigned report interface
- 🚧 Per-sector market-insight banner (Phase H7)
- 🚧 Hero section for the advisory report screen
- 🚧 Expansion of district and sector coverage

---

## 🏆 Smart India Hackathon 2026

| Detail | Information |
|---|---|
| 🎯 Event | Smart India Hackathon 2026 |
| 🆔 Problem Statement | SIH26091 |
| 💡 Problem | AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs |
| 👥 Team | NEXUS |
| 👤 Team Lead | Anshu Raj Verma |

---

## 🔮 Future Scope

- 🗺️ Wider district and state coverage · 📊 More granular local datasets
- 🌐 Additional Indian languages · 📱 Mobile-first / PWA experience
- 🤖 Improved AI-assisted explanations · 🏦 Deeper financing and scheme integration
- 📈 More advanced business projections · 🔄 Regularly refreshed market datasets

---

## ⚠️ Disclaimer

> **UdyamSaathi is a decision-support and educational tool.** It does not disburse loans, guarantee financing, or guarantee business success. Figures, feasibility scores and projections are estimates. Users should independently verify scheme eligibility, interest rates, financing terms and other requirements with the relevant bank or government channelizing agency before making financial decisions.

---

### Built for Smart India Hackathon 2026 🇮🇳

**UdyamSaathi** — *Turning local business decisions into structured, understandable guidance.*

🌾 📍 💰 🏦 📊 🤖

**Made with ❤️ by Team NEXUS**