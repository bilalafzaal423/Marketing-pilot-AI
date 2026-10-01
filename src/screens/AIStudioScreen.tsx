import React, { useState } from 'react';
import { CopyLibraryItem } from '../types';
import { generateMarketingCopy, GeneratedCopyResult } from '../services/geminiService';

interface AIStudioScreenProps {
  libraryItems: CopyLibraryItem[];
  onScheduleItem?: (itemTitle: string) => void;
}

export const AIStudioScreen: React.FC<AIStudioScreenProps> = ({
  libraryItems,
  onScheduleItem,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'saved' | 'voice'>('generator');
  const [selectedMedium, setSelectedMedium] = useState('LinkedIn Post');
  const [toneProfile, setToneProfile] = useState('Authoritative & Data');
  const [outputLength, setOutputLength] = useState('Medium (~200w)');
  const [targetAudience] = useState('B2B SaaS Founders & Performance Marketers');
  const [creativeBrief, setCreativeBrief] = useState(
    'Announcing our automated budget balancer which reallocates funds in real-time between Google & Meta, saving 6 hours per week.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generated copy state
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedCopyResult>({
    headline: '"Most growth leads burn 12+ hours every week manually shifting ad spend between Meta and Google."',
    problem: 'The harsh truth? By the time you notice your Meta CPA spiked 40% yesterday, your daily budget is already gone.',
    advantage: '"Autonomous budget reallocation yields a 3.4x faster response to impression fatigue than manual monitoring."',
    bulletPoints: [
      'Sub-hour pacing: Automatically reallocate funds before midday drag hits.',
      'Blended ROAS safeguard: Never let a low-intent channel drain top-of-funnel wins.',
      'Zero manual spreadsheets: Save 6-8 engineer/marketer hours weekly.'
    ],
    callToAction: "What is your team’s protocol when an ad set surges at 2 AM? Let’s swap notes in the comments. 👇",
    hashtags: ['#GrowthMarketing', '#PerformanceAds', '#B2BSaaS', '#MarketingAutomation', '#AdOps'],
    predictiveRoi: 94,
    viralPotential: 88,
    sentiment: 'Positive Sentiment'
  });

  const mediums = [
    { label: 'LinkedIn Post', icon: 'post_add' },
    { label: 'Google Search Ad', icon: 'travel_explore' },
    { label: 'Meta Carousel Ad', icon: 'campaign' },
    { label: 'Blog Article', icon: 'article' },
    { label: 'Email Campaign', icon: 'mail' },
  ];

  const quickTemplates = [
    { label: '✨ Feature Launch', prompt: 'Announcing our new automated ad budget balancer that syncs with real-time conversion velocity.' },
    { label: '📊 Case Study Hook', prompt: 'How a Series B SaaS team cut blended CAC by 42% while scaling monthly ad spend from $10k to $60k.' },
    { label: '⚡ Pain Point Teaser', prompt: 'Why manually monitoring Meta ad frequency at 2 AM is burning out your growth team and draining margin.' },
    { label: '🎯 FOMO Discount', prompt: 'Limited invite: First 50 SaaS founders get 60 days of automated attribution telemetry completely free.' },
  ];

  const handleGenerate = async (overridePrompt?: string) => {
    setIsGenerating(true);
    try {
      const res = await generateMarketingCopy(
        selectedMedium,
        toneProfile,
        targetAudience,
        overridePrompt || creativeBrief
      );
      setGeneratedOutput(res);
      setIsEditing(false);
    } catch {
      // Handled in geminiService
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `${generatedOutput.headline}\n\n${generatedOutput.problem}\n\n🚀 Autonomous Growth Advantage:\n${generatedOutput.advantage}\n\nKey takeaways:\n${generatedOutput.bulletPoints.map(b => `• ${b}`).join('\n')}\n\n${generatedOutput.callToAction}\n\n${generatedOutput.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-10 px-gutter-mobile space-y-space-md max-w-4xl mx-auto">
      {/* Studio Header Section */}
      <section className="flex flex-col space-y-space-xs pt-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-primary text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              Content Studio
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Claude 3.5 &amp; GPT-4o
            </span>
          </div>
        </div>

        {/* Balance & Token Utility Bar */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container shadow-sm border border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[16px]">token</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                Token Quota
              </span>
              <span className="font-mono-metric text-mono-metric font-semibold text-on-surface">
                48,200 available
              </span>
            </div>
          </div>
          <button
            className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm hover:bg-primary-fixed transition-colors cursor-pointer font-semibold"
            type="button"
            onClick={() => alert('Quota management: You have 48,200 tokens. Next reset on the 1st of the month.')}
          >
            Upgrade Tier
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-surface-container-high mt-1 shadow-inner">
          <button
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all text-center cursor-pointer ${
              activeSubTab === 'generator'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="tab-generator"
            type="button"
            onClick={() => setActiveSubTab('generator')}
          >
            Generator
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all text-center cursor-pointer ${
              activeSubTab === 'saved'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="tab-saved"
            type="button"
            onClick={() => setActiveSubTab('saved')}
          >
            Saved <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-[10px] ml-0.5 font-bold">18</span>
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all text-center cursor-pointer ${
              activeSubTab === 'voice'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="tab-voice"
            type="button"
            onClick={() => setActiveSubTab('voice')}
          >
            Voice Profiles
          </button>
        </div>
      </section>

      {activeSubTab === 'saved' ? (
        <section className="space-y-3">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Saved Campaigns &amp; High-Yield Copy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {libraryItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[10px] font-bold">
                    {item.channel}
                  </span>
                  <span className="font-mono-metric text-label-sm text-emerald-600 font-bold">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {item.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {item.snippet}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
                  <span className="font-label-sm text-label-sm text-outline">{item.usedAgo}</span>
                  <button
                    onClick={() => {
                      setGeneratedOutput((prev) => ({
                        ...prev,
                        headline: `"${item.title}"`,
                        problem: item.snippet,
                      }));
                      setActiveSubTab('generator');
                    }}
                    className="text-primary font-label-sm font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    Load into Editor <span className="material-symbols-outlined text-[14px]">edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : activeSubTab === 'voice' ? (
        <section className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-3">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Acme Growth Co Voice Profiles
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            These personas govern vocabulary, technical depth, and conversion density across generated copies.
          </p>
          <div className="space-y-2 pt-1">
            {[
              { title: 'Authoritative & Data-Backed', desc: 'Direct, ROI-centric, citing performance benchmarks and financial metrics.', active: true },
              { title: 'Challenger / Provocative', desc: 'Challenges traditional agency dogma, highlights hidden ad waste.', active: false },
              { title: 'Engineering & Technical', desc: 'Focuses on API speed, multi-touch algorithms, and sub-hour auto-pacing.', active: false },
            ].map((voice, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  voice.active ? 'bg-primary-fixed/30 border-primary' : 'bg-surface-container-low border-surface-container'
                }`}
              >
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-surface">{voice.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{voice.desc}</p>
                </div>
                {voice.active ? (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-semibold">Active</span>
                ) : (
                  <button
                    onClick={() => alert(`Activated voice profile: ${voice.title}`)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high cursor-pointer"
                  >
                    Select
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Content Type Horizontal Scroller */}
          <section className="flex flex-col space-y-1.5">
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline px-0.5 font-semibold">
              Target Medium
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-gutter-mobile px-gutter-mobile">
              {mediums.map((m) => (
                <button
                  key={m.label}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl font-label-md text-label-md font-medium flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition-all ${
                    selectedMedium === m.label
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container border border-surface-container/60'
                  }`}
                  type="button"
                  onClick={() => setSelectedMedium(m.label)}
                >
                  <span className="material-symbols-outlined text-[16px]">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </section>

          {/* Generation Parameters Accordion Module */}
          <section className="p-3.5 rounded-xl bg-surface-container-lowest shadow-md space-y-space-sm border border-surface-container/60">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
                Campaign Parameters
              </span>
              <button
                onClick={() => alert('Smart Presets loaded for high-growth B2B SaaS campaigns')}
                className="font-label-sm text-label-sm text-primary font-semibold hover:underline cursor-pointer"
              >
                Smart Presets
              </button>
            </div>

            {/* Micro-Config 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col space-y-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Tone Profile</span>
                <select
                  value={toneProfile}
                  onChange={(e) => setToneProfile(e.target.value)}
                  className="h-9 px-2.5 rounded-lg bg-surface-container-low text-on-surface text-label-md font-label-md shadow-sm outline-none cursor-pointer border border-surface-container"
                >
                  <option value="Authoritative & Data">Authoritative &amp; Data</option>
                  <option value="Conversational & Punchy">Conversational &amp; Punchy</option>
                  <option value="Thought Leadership">Thought Leadership</option>
                  <option value="Urgent & Direct">Urgent &amp; Direct</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Output Length</span>
                <select
                  value={outputLength}
                  onChange={(e) => setOutputLength(e.target.value)}
                  className="h-9 px-2.5 rounded-lg bg-surface-container-low text-on-surface text-label-md font-label-md shadow-sm outline-none cursor-pointer border border-surface-container"
                >
                  <option value="Short (~100w)">Short (~100w)</option>
                  <option value="Medium (~200w)">Medium (~200w)</option>
                  <option value="Long (~400w)">Long (~400w)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1 col-span-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Target Audience Profile</span>
                <div className="h-9 px-2.5 rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface text-label-md font-label-md shadow-sm border border-surface-container">
                  <span className="truncate">{targetAudience}</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                </div>
              </div>
            </div>

            {/* Prompt Area */}
            <div className="flex flex-col space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Creative Brief &amp; Key Angles
                </label>
                <button
                  className="text-primary font-label-sm text-label-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => {
                    setCreativeBrief(
                      'Announce our AI budget autopilot that dynamically re-allocates underperforming Meta ad sets into high-intent Google Search terms with 5.4x historical ROAS.'
                    );
                  }}
                >
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  Optimize Prompt
                </button>
              </div>

              <div className="relative rounded-xl bg-surface-container-low p-2.5 shadow-inner border border-surface-container">
                <textarea
                  className="w-full bg-transparent text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none resize-none"
                  id="prompt-input"
                  rows={3}
                  value={creativeBrief}
                  onChange={(e) => setCreativeBrief(e.target.value)}
                  placeholder="Describe the campaign angle... e.g. Announcing our automated budget balancer which reallocates funds in real-time, saving 6 hours per week."
                />
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <button
                      type="button"
                      onClick={() => alert('Speech-to-text ready')}
                      className="hover:text-primary cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">mic</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Document attachment uploaded')}
                      className="hover:text-primary cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    </button>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    {creativeBrief.length}/500
                  </span>
                </div>
              </div>

              {/* Quick Template Chips */}
              <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none">
                {quickTemplates.map((t) => (
                  <button
                    key={t.label}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors cursor-pointer"
                    type="button"
                    onClick={() => {
                      setCreativeBrief(t.prompt);
                      handleGenerate(t.prompt);
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* CTA Primary Button */}
              <button
                className="w-full h-11 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg hover:bg-secondary transition-all active:scale-[0.98] cursor-pointer"
                id="btn-generate"
                type="button"
                onClick={() => handleGenerate()}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    <span>Synthesizing Copy with AI...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    <span>Generate High-Converting Copy</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Interactive AI Output & Editor Card */}
          <section className="p-4 rounded-xl bg-surface-container-lowest shadow-xl flex flex-col space-y-space-sm relative border border-surface-container/60">
            {/* Top Metadata Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                  {selectedMedium} Variant A
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  Generated just now
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:text-primary'
                  }`}
                  title="Bookmark"
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark</span>
                </button>
                <button
                  className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  title="History"
                  type="button"
                  onClick={() => alert('View version history (3 iterations)')}
                >
                  <span className="material-symbols-outlined text-[16px]">history</span>
                </button>
              </div>
            </div>

            {/* Performance Metric HUD */}
            <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-highest"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${generatedOutput.predictiveRoi}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-headline-sm text-headline-sm text-primary font-bold">
                    {generatedOutput.predictiveRoi}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    Predictive ROI Score
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Optimal tone, timing &amp; readability
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] font-bold">
                  Viral Pot: {generatedOutput.viralPotential}%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary font-label-sm text-[10px] font-semibold">
                  {generatedOutput.sentiment}
                </span>
              </div>
            </div>

            {/* Output Display / Editable Canvas */}
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-[11px] font-label-sm text-outline font-semibold">Headline:</label>
                <input
                  type="text"
                  value={generatedOutput.headline}
                  onChange={(e) =>
                    setGeneratedOutput({ ...generatedOutput, headline: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-surface-container-low font-headline-sm font-bold text-primary border border-surface-container"
                />

                <label className="text-[11px] font-label-sm text-outline font-semibold">Pain Point / Problem:</label>
                <textarea
                  value={generatedOutput.problem}
                  onChange={(e) =>
                    setGeneratedOutput({ ...generatedOutput, problem: e.target.value })
                  }
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low font-body-md text-on-surface border border-surface-container"
                />

                <label className="text-[11px] font-label-sm text-outline font-semibold">Call to Action:</label>
                <input
                  type="text"
                  value={generatedOutput.callToAction}
                  onChange={(e) =>
                    setGeneratedOutput({ ...generatedOutput, callToAction: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-surface-container-low font-body-md text-secondary font-semibold border border-surface-container"
                />

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-label-md font-semibold cursor-pointer"
                >
                  Done Editing
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md space-y-3 leading-relaxed shadow-sm">
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold text-primary">
                  {generatedOutput.headline}
                </p>

                <p>{generatedOutput.problem}</p>

                <div className="p-3 rounded-lg bg-surface-container border-l-4 border-primary space-y-1">
                  <p className="font-label-md text-label-md text-primary font-semibold">
                    🚀 Autonomous Growth Advantage
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {generatedOutput.advantage}
                  </p>
                </div>

                <p className="space-y-1">Here is what high-performing revenue teams are doing differently:</p>

                <ul className="space-y-1.5 pl-1">
                  {generatedOutput.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">
                        check_circle
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-secondary font-semibold">{generatedOutput.callToAction}</p>

                <p className="text-tertiary font-mono-metric text-body-sm pt-1">
                  {generatedOutput.hashtags.join(' ')}
                </p>
              </div>
            )}

            {/* Action Toolbar */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <button
                className={`h-10 rounded-lg flex flex-col items-center justify-center transition-colors shadow-sm cursor-pointer ${
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                id="btn-copy"
                type="button"
                onClick={handleCopy}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copied ? 'done' : 'content_copy'}
                </span>
                <span className="font-label-sm text-[10px] font-semibold">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>

              <button
                className={`h-10 rounded-lg flex flex-col items-center justify-center transition-colors shadow-sm cursor-pointer ${
                  isEditing
                    ? 'bg-primary-container text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                id="btn-edit"
                type="button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span className="font-label-sm text-[10px]">
                  {isEditing ? 'Preview' : 'Edit'}
                </span>
              </button>

              <button
                className="h-10 rounded-lg bg-surface-container flex flex-col items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer"
                id="btn-re-angle"
                type="button"
                onClick={() => handleGenerate()}
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span className="font-label-sm text-[10px]">Re-angle</span>
              </button>

              <button
                className="h-10 rounded-lg bg-primary-fixed text-on-primary-fixed-variant flex flex-col items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-sm font-semibold cursor-pointer"
                id="btn-schedule"
                type="button"
                onClick={() => {
                  if (onScheduleItem) {
                    onScheduleItem(generatedOutput.headline);
                  } else {
                    alert(`Scheduled "${generatedOutput.headline}" for LinkedIn distribution at 9:15 AM tomorrow!`);
                  }
                }}
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                <span className="font-label-sm text-[10px]">Schedule</span>
              </button>
            </div>
          </section>

          {/* Saved Creative Library Carousel */}
          <section className="flex flex-col space-y-space-xs pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  folder_special
                </span>
                High-Converting Library
              </span>
              <button
                onClick={() => setActiveSubTab('saved')}
                className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
              >
                View All ({libraryItems.length})
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Horizontal Swipeable Asset Cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-gutter-mobile px-gutter-mobile">
              {libraryItems.map((item) => (
                <div
                  key={item.id}
                  className="w-[260px] flex-shrink-0 p-3.5 rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between space-y-3 border border-surface-container/60 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm text-[10px] font-bold">
                        {item.channel}
                      </span>
                      <span className="font-mono-metric text-label-sm text-primary font-bold">
                        {item.badge}
                      </span>
                    </div>
                    <h2 className="font-headline-sm text-label-lg font-bold text-on-surface line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {item.snippet}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-low">
                    <span className="font-label-sm text-label-sm text-outline">{item.usedAgo}</span>
                    <button
                      className="text-primary font-label-sm text-label-sm font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                      type="button"
                      onClick={() => alert(`Deployed "${item.title}" into active campaign schedule.`)}
                    >
                      Deploy <span className="material-symbols-outlined text-[14px]">send</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
