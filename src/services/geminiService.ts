import { GoogleGenAI } from '@google/genai';

const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
               (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
               '';

let aiInstance: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with key:', err);
  }
}

export interface GeneratedCopyResult {
  headline: string;
  problem: string;
  advantage: string;
  bulletPoints: string[];
  callToAction: string;
  hashtags: string[];
  predictiveRoi: number;
  viralPotential: number;
  sentiment: string;
}

export async function generateMarketingCopy(
  medium: string,
  tone: string,
  audience: string,
  brief: string
): Promise<GeneratedCopyResult> {
  if (aiInstance) {
    try {
      const prompt = `You are Market Pilot AI, an elite B2B and SaaS copywriter and performance growth strategist.
Generate high-converting advertising or social copy for:
- Target Medium: ${medium}
- Tone Profile: ${tone}
- Target Audience: ${audience}
- Creative Brief / Key Angles: ${brief}

Return ONLY valid JSON matching this schema:
{
  "headline": "A punchy, scroll-stopping hook statement with quotes",
  "problem": "1-2 sentences highlighting the costly pain point or harsh truth",
  "advantage": "A highlighted growth takeaway or stat (e.g. Autonomous Growth Advantage)",
  "bulletPoints": [
    "Sub-hour pacing: detailed explanation",
    "Blended ROAS safeguard: detailed explanation",
    "Zero manual spreadsheets: detailed explanation"
  ],
  "callToAction": "Direct question or invitation to comment/click",
  "hashtags": ["#GrowthMarketing", "#PerformanceAds", "#B2BSaaS"],
  "predictiveRoi": 94,
  "viralPotential": 88,
  "sentiment": "Positive Sentiment"
}`;

      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return {
          headline: parsed.headline || `"Most growth leads burn 12+ hours every week manually shifting ad spend."`,
          problem: parsed.problem || 'By the time you notice your CPA spiked 40% yesterday, your daily budget is already gone.',
          advantage: parsed.advantage || '"Autonomous budget reallocation yields a 3.4x faster response to impression fatigue."',
          bulletPoints: parsed.bulletPoints || [
            'Sub-hour pacing: Automatically reallocate funds before midday drag hits.',
            'Blended ROAS safeguard: Never let a low-intent channel drain top-of-funnel wins.',
            'Zero manual spreadsheets: Save 6-8 engineer/marketer hours weekly.'
          ],
          callToAction: parsed.callToAction || "What is your team's protocol when an ad set surges at 2 AM? Let's swap notes in the comments. 👇",
          hashtags: parsed.hashtags || ['#GrowthMarketing', '#PerformanceAds', '#B2BSaaS', '#MarketingAutomation', '#AdOps'],
          predictiveRoi: parsed.predictiveRoi || 94,
          viralPotential: parsed.viralPotential || 88,
          sentiment: parsed.sentiment || 'Positive Sentiment'
        };
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to curated AI generation:', e);
    }
  }

  // High-converting intelligent fallback based on parameters
  await new Promise((r) => setTimeout(r, 700));

  if (medium.includes('Google Search')) {
    return {
      headline: `"Stop Wasting 38% of Search Ad Budget on Low-Converting Keywords"`,
      problem: `Broad match query leakage bleeds ad spend while high-intent enterprise buyers slip to competitors.`,
      advantage: `Automated Negative Keyword Harvester reclaims up to $4,200/mo in zero-intent search queries.`,
      bulletPoints: [
        `Real-time bid adjustments: Scale CPC only on verified high-LTV buying intent.`,
        `PMax optimization: Isolate search queries from display remarketing cannibalization.`,
        `Direct CRM sync: Send lead quality signals back into Google Smart Bidding.`
      ],
      callToAction: `Start your 14-day automated audit today. Zero code required.`,
      hashtags: ['#PPC', '#GoogleAds', '#SaaSMarketing', '#DemandGen'],
      predictiveRoi: 96,
      viralPotential: 75,
      sentiment: 'High Intent'
    };
  }

  return {
    headline: `"Most growth leads burn 12+ hours every week manually shifting ad spend between Meta and Google."`,
    problem: `The harsh truth? By the time you notice your Meta CPA spiked 40% yesterday, your daily budget is already gone.`,
    advantage: `"Autonomous budget reallocation yields a 3.4x faster response to impression fatigue than manual monitoring."`,
    bulletPoints: [
      `Sub-hour pacing: Automatically reallocate funds before midday drag hits.`,
      `Blended ROAS safeguard: Never let a low-intent channel drain top-of-funnel wins.`,
      `Zero manual spreadsheets: Save 6-8 engineer/marketer hours weekly.`
    ],
    callToAction: `What is your team’s protocol when an ad set surges at 2 AM? Let’s swap notes in the comments. 👇`,
    hashtags: ['#GrowthMarketing', '#PerformanceAds', '#B2BSaaS', '#MarketingAutomation', '#AdOps'],
    predictiveRoi: 94,
    viralPotential: 88,
    sentiment: 'Positive Sentiment'
  };
}

export async function askCopilot(question: string): Promise<string> {
  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the Market Pilot AI Copilot, Sarah Chen's strategic marketing co-pilot at Acme Growth Co.
Current stats:
- Total Revenue: $148,650 (+18.4%)
- Blended ROAS: 4.58x (Top 5%)
- Active Campaigns: 12 (Google Ads, Meta, LinkedIn)
- Pipeline Value: $248,500 (1,842 leads)
- Top Hot Lead: Alex Morgan ($24,000 ARR)

Answer concisely with data-backed, tactical marketing advice in 2-3 sentences.
User prompt: "${question}"`
      });
      if (response.text) return response.text;
    } catch (err) {
      console.warn('Copilot Gemini error:', err);
    }
  }

  // Dynamic curated responses
  if (question.toLowerCase().includes('reallocate') || question.toLowerCase().includes('budget')) {
    return 'Done! I simulated shifting $2,000 from paused "EU Brand Awareness" into "Summer SaaS Scale-Up" (5.2x ROAS) and Google Search Ads. Projected yield: +38 qualified demos by Friday.';
  }
  if (question.toLowerCase().includes('report') || question.toLowerCase().includes('board')) {
    return 'Executive report drafted! Blended ROAS is up +18.4% at 4.58x, qualified pipeline reached $248,500, and CPL dropped to $10.96 across all active B2B campaigns.';
  }
  if (question.toLowerCase().includes('ad copies') || question.toLowerCase().includes('creative')) {
    return 'Generated 3 high-converting copy angles in Content Studio targeting B2B Founders: 1) "The 12-Hour Spreadsheets Trap", 2) "Sub-hour Pacing Benchmark", 3) "From 2.9x to 5.2x ROAS Case Study".';
  }

  return `Analysis complete: Based on current performance metrics (4.58x Blended ROAS across $32,480 spend), accelerating your top-of-funnel LinkedIn sprint while maintaining strict CPA caps on Google Search will yield the strongest incremental pipeline.`;
}
