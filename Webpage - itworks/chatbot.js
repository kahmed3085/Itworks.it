/* ================================================================
   ITWORKS — IVY AI ASSISTANT WIDGET  v1.0
   Standalone floating chatbot for all pages.
   Drop-in: <script src="chatbot.js"></script> before </body>
   ================================================================ */
(function () {
  'use strict';

  // ── Navigation helper ────────────────────────────────────────
  function base() {
    const p = window.location.pathname;
    return (p.includes('blog.html') || p.includes('careers.html')) ? 'index.html' : '';
  }

  // ── NAV chip map ─────────────────────────────────────────────
  const NAV = {
    'Book a Discovery Call'  : 'https://cal.com/kashif-ahmed-q1odeg/30min',
    'Book a free call'       : 'https://cal.com/kashif-ahmed-q1odeg/30min',
    'Go to Contact Page'     : base() + '#contact',
    'Fill in the BANT form'  : base() + '#contact',
    'View all services'      : base() + '#services',
    'See all services'       : base() + '#services',
    'Read the LHC case study': 'blog.html#lhc-case-study',
    'Go to Blog'             : 'blog.html',
    'See case studies'       : 'blog.html',
    'View Careers Page'      : 'careers.html',
    'Apply Now'              : 'careers.html',
  };

  // ── Knowledge Base ───────────────────────────────────────────
  const KB = [
    {
      p: ['hello','hi ','hey ','howdy','greetings','good morning','good afternoon','good evening','start','begin'],
      r: `Hi there! 👋 I'm **Ivy**, ItWorks' AI assistant.\n\nI can answer questions about our services, how we work, pricing, our team — or help you book a **free Discovery Call**.\n\nWhat can I help you with today?`,
      c: ['What does ItWorks do?','Our Services','Book a Discovery Call']
    },
    {
      p: ['what is itworks','what does itworks','who are you','about itworks','tell me about itworks','about you','what you do','what do you do'],
      r: `**ItWorks** is an AI-first managed services company based in London. 🤖\n\nWe help businesses grow faster, cut costs, and future-proof their operations using intelligent automation and AI.\n\nUnlike traditional IT companies, we're not just keeping the lights on — we're building systems that **actively drive your growth**. Every engagement starts with a free 30-minute Discovery Call.`,
      c: ['Our Services','What is Agentic AI?','Book a Discovery Call']
    },
    {
      p: ['services','what do you offer','what can you help','offerings','solutions','products','what do you provide'],
      r: `Our six core services: 🚀\n\n☁️ **Cloud Automation** — Scale smarter, slash cloud costs\n🛡️ **AI-Driven Security** — Proactive threat detection\n🖥️ **Managed IT Support** — 24/7 intelligent helpdesk\n⚙️ **Process Optimisation** — Automate your workflows\n📊 **AI Analytics** — Data-driven dashboards & insights\n🔄 **Digital Transformation** — End-to-end AI strategy\n\nEvery solution is **bespoke** — we don't do off-the-shelf packages.`,
      c: ['How much does it cost?','Book a Discovery Call','What is AI automation?']
    },
    {
      p: ['discovery call','book a call','free call','schedule a call','talk to someone','speak to someone','get started','contact','reach out'],
      r: `Our Discovery Call is **100% free** — no pitch, no pressure. 📞\n\nIn 30 minutes we will:\n✅ Understand your business goals\n✅ Identify where AI delivers the most value\n✅ Give you honest, tailored recommendations\n\nYou can fill in our **BANT form** (takes 2 minutes) and we'll confirm your slot — or book directly in our calendar.\n\nWhich would you prefer?`,
      c: ['Book a Discovery Call','What is BANT?','How long does it take?']
    },
    {
      p: ['price','cost','how much','pricing','rates','fees','charges','budget','afford','packages','plans'],
      r: `We don't publish fixed prices — intentionally. 💡\n\nEvery business has different challenges, team sizes, and goals. A solution that's perfect for one client would be overkill (or insufficient) for another.\n\nThe best way to understand what's right for you — and what it would cost — is a **free 30-minute Discovery Call**. We'll give you a clear proposal from there.\n\nNo commitment. Just clarity.`,
      c: ['Book a Discovery Call','What do you offer?']
    },
    {
      p: ['bant','what is bant','bant form','bant framework','budget authority need timeline'],
      r: `BANT is a qualification framework that makes your Discovery Call **immediately valuable**. 📋\n\n**B — Budget** helps us recommend solutions in your range\n**A — Authority** ensures we're talking to the right person\n**N — Need** means we understand your real challenge\n**T — Timeline** helps us match urgency with approach\n\nBy sharing this before we meet, we arrive prepared with real ideas — not a generic presentation.`,
      c: ['Fill in the BANT form','Book a Discovery Call']
    },
    {
      p: ['agentic ai','agentic','ai agent','ai agents','autonomous ai','what is agentic','agents'],
      r: `Agentic AI is one of the most transformative things happening in tech right now — and it's core to what we build. 🤖\n\nUnlike a chatbot that answers questions, **Agentic AI acts on your behalf**:\n• Monitors data continuously\n• Makes decisions within defined boundaries\n• Takes real actions — sends emails, updates CRMs, triggers alerts\n• Gets smarter with every interaction\n\nExample: An AI that identifies a lapsed customer, checks flight availability at Heathrow, and sends a personalised re-booking message — **entirely automatically**. That's what we build for clients like LHC.`,
      c: ['See the LHC case study','What is AI automation?','Book a Discovery Call']
    },
    {
      p: ['ai automation','automation','automate','workflow automation','process automation','n8n','make','zapier','integromat','automate my business'],
      r: `AI automation means using intelligent software to handle repetitive tasks — freeing your team for work that actually requires human thinking. ⚙️\n\nWe build automations using **n8n, Make, and custom AI pipelines** for things like:\n• Lead follow-up and nurturing\n• Customer re-engagement campaigns\n• Invoice and document processing\n• Report generation\n• CRM updates and data sync\n• Booking confirmations\n\nMost clients see meaningful time savings within **4–6 weeks** of kickoff.`,
      c: ['See the LHC case study','Book a Discovery Call','How long does it take?']
    },
    {
      p: ['lhc','london heathrow cars','heathrow cars','case study','portfolio','example client','transport','airport transfer','ride hailing'],
      r: `Our proudest current engagement is with **London Heathrow Cars (LHC)** — an airport transfer company devastated by Covid. ✈️\n\nWe're rebuilding their entire growth engine using AI:\n🤖 24/7 AI booking assistant\n🔄 Automated customer re-engagement\n⭐ AI reputation management\n🗓️ Smart driver dispatch & scheduling\n📊 Real-time revenue dashboard\n\nThis is a **live, active engagement** — we're documenting results in our blog as they come in. A real-world example of what Agentic AI looks like in practice.`,
      c: ['Read the LHC case study','What is Agentic AI?','Book a Discovery Call']
    },
    {
      p: ['how long','timeline','when can you start','how fast','turnaround','timeframe','how quickly','time to deliver'],
      r: `Here's our typical delivery roadmap: 📅\n\n**Weeks 1–2:** Discovery & AI Blueprint\n**Weeks 3–6:** Foundation — first automations live\n**Weeks 7–12:** Full deployment & AI scale\n**Ongoing:** Optimise, measure, grow\n\nMost clients see working automations within **4–6 weeks** of kickoff. We can typically schedule your Discovery Call within **48 hours** of your request.`,
      c: ['Book a Discovery Call','How much does it cost?']
    },
    {
      p: ['security','cybersecurity','cyber security','cyber threat','hacking','breach','protection','vulnerability','firewall'],
      r: `Our **AI-Driven Security** is proactive, not reactive. 🛡️\n\nInstead of waiting for an incident:\n• AI continuously monitors your digital perimeter\n• Detects unusual patterns before they become breaches\n• Automatically responds to low-level threats\n• Escalates to human experts when needed\n• Generates daily security intelligence reports\n\nOne of our clients caught a sophisticated attack **before it became a breach** — the service paid for itself on day one.`,
      c: ['See all services','Book a Discovery Call']
    },
    {
      p: ['cloud','aws','azure','gcp','google cloud','infrastructure','devops','cloud cost','cloud management'],
      r: `Our **Cloud Automation** service manages your infrastructure intelligently across AWS, Azure, and GCP. ☁️\n\nWe typically help clients:\n• Cut cloud spend by **30–60%**\n• Automate deployments and scaling\n• Eliminate manual infrastructure tasks\n• Achieve 99.9%+ uptime\n• Get clear visibility into cloud costs\n\nMost cloud waste comes from unoptimised configurations that sit unnoticed for months. We find and fix these fast.`,
      c: ['See all services','Book a Discovery Call']
    },
    {
      p: ['managed it','it support','helpdesk','help desk','it management','outsource it','it team'],
      r: `Our **Managed IT Support** is 24/7 — but it's not your typical helpdesk. 🖥️\n\nWe use AI to triage and resolve the majority of tickets automatically. Human engineers handle what AI escalates. The result:\n• Faster resolution times\n• Lower cost than an in-house team\n• Proactive issue prevention\n• Full visibility via your own dashboard\n\nYou get enterprise-grade IT without the enterprise price tag.`,
      c: ['See all services','Book a Discovery Call']
    },
    {
      p: ['analytics','reporting','dashboard','data','insights','business intelligence','metrics','kpi'],
      r: `Our **AI Analytics & Reporting** service turns raw data into decisions. 📊\n\nWe build custom dashboards that:\n• Pull data from all your systems in real time\n• Surface the metrics that actually matter\n• Use AI to flag anomalies and opportunities\n• Generate automated weekly/monthly reports\n\nNo more spreadsheet consolidation. No more guessing. Just clear, actionable intelligence.`,
      c: ['See all services','Book a Discovery Call']
    },
    {
      p: ['digital transformation','modernise','modernize','legacy system','transform my business','digitise','digitize'],
      r: `**Digital Transformation** is the big picture service — and it's what we love most. 🔄\n\nWe map your entire operation, identify where AI can create the most value, and build a phased roadmap to get you there. This includes:\n• Legacy system modernisation\n• AI integration at every layer\n• Team training and change management\n• Ongoing measurement and optimisation\n\nWe treat this as a genuine long-term partnership, not a project.`,
      c: ['See all services','Book a Discovery Call']
    },
    {
      p: ['hiring','jobs','careers','work for','join the team','vacancies','open roles','apply','employment','job opening','positions'],
      r: `Yes — we're growing fast and actively hiring! 🚀\n\nAll **8 open roles are fully remote**:\n\n📈 Growth Engineer\n⚡ Team Lead (AI Automations)\n🗂️ Project Manager\n📋 Project Coordinator\n🤝 Client Success Manager\n🏗️ AI Solution Architect\n🔄 Automations Expert\n🎓 Onboarding Specialist\n\nAll roles require 2+ years experience. Visit our Careers page to read full JDs and apply — CVs go directly to our team.`,
      c: ['View Careers Page']
    },
    {
      p: ['industry','industries','sector','who do you work with','what type of business','which businesses','type of company'],
      r: `We work across a wide range of industries — our AI solutions are deliberately industry-agnostic. 🌍\n\nCurrent and past client sectors include:\n• Transport & Logistics\n• Finance & Professional Services\n• Retail & eCommerce\n• Healthcare Administration\n• Property & Real Estate\n• Marketing Agencies\n• B2B Services\n\nIf your business has repetitive processes and growth ambitions — we can almost certainly help.`,
      c: ['Book a Discovery Call','See the LHC case study']
    },
    {
      p: ['small business','startup','sme','small company','new business','early stage','solopreneur','sole trader'],
      r: `Absolutely — SMEs often see the **fastest and highest ROI** from AI automation. 📈\n\nWhy? Larger enterprises have legacy systems, bureaucracy, and slow procurement cycles. SMEs can implement decisively and start seeing results within weeks.\n\nMany of our clients are growing businesses that want to compete with bigger players — without the enterprise price tag. That's exactly the gap we fill.`,
      c: ['Book a free call','What do you offer?']
    },
    {
      p: ['what makes you different','why choose itworks','why itworks','unique','competitive','different from others'],
      r: `Three things genuinely set us apart: 💡\n\n**1. AI-first, not AI-adjacent**\nWe don't bolt AI onto traditional IT. Every solution has AI at its core.\n\n**2. No generic packages**\nWe start with a Discovery Call to understand your *actual* problem, then design accordingly.\n\n**3. Embedded partners, not vendors**\nWe don't disappear after delivery. We stay alongside you, optimising and growing the system over time.\n\nWe're not the cheapest option — but we're the option that delivers measurable, compounding results.`,
      c: ['Book a Discovery Call','See the LHC case study']
    },
    {
      p: ['blog','article','read','content','post','resources','news'],
      r: `Our blog covers real AI strategy, live case studies, and practical guides for business growth. 📝\n\nFeatured right now:\n✈️ **LHC × ItWorks** — How we're rebuilding an airport transfer company with Agentic AI after Covid devastated the business.\n\nAlso on the blog:\n• What is Agentic AI — and why every business needs it now\n• Why SMEs overpay for cloud by 40%\n• AI-driven cybersecurity in practice`,
      c: ['Read the LHC case study','Go to Blog']
    },
    {
      p: ['roi','return on investment','results','what results','proven','track record','does it work'],
      r: `Real results from our clients: 📊\n\n• **52% cloud cost reduction** in the first quarter for a B2B operations firm\n• **30+ hours/week** saved by automating manual processes\n• **0 critical vulnerabilities** and a breach caught before it happened\n• **99.98% uptime** over a 90-day period\n• Lapsed customer re-engagement generating **3× repeat bookings** (LHC, in progress)\n\nEvery engagement includes a KPI dashboard so you can see exactly what you're getting.`,
      c: ['Book a Discovery Call','See the LHC case study']
    },
    {
      p: ['location','where are you','london','uk','united kingdom','based','office','remote','where do you operate'],
      r: `ItWorks is based in **London, UK** — but we operate globally. 🌍\n\nOur team is fully remote and distributed. We've worked with clients across the UK, Europe, and internationally.\n\nAll our services are delivered remotely, meaning you get access to elite AI expertise regardless of your location.`,
      c: ['Book a Discovery Call','Our Services']
    },
    {
      p: ['thank','thanks','great','helpful','perfect','awesome','brilliant','excellent','wonderful','cheers'],
      r: `You're very welcome! 😊\n\nI'm here anytime you have questions. If you're ready to explore what AI can do for your business, the next step is a **free 30-minute Discovery Call** — no commitment, just a genuine conversation.\n\nAnything else I can help with?`,
      c: ['Book a Discovery Call','Our Services']
    },
    {
      p: ['bye','goodbye','see you','take care','later','ciao','done'],
      r: `Thanks for chatting! 👋\n\nWhenever you're ready to explore what AI can do for your business, we're here. Have a great day!\n\n— Ivy, ItWorks AI`,
      c: ['Book a Discovery Call']
    }
  ];

  const FALLBACK = {
    r: `That's a great question — and it might be better answered directly by our team. 🤝\n\nI don't have a specific answer for that, but our AI Growth Consultants will. The quickest route is a **free Discovery Call** — 30 minutes, no commitment.\n\nIs there anything else I can help with in the meantime?`,
    c: ['What does ItWorks do?','Our Services','Book a Discovery Call']
  };

  // ── Intent Detection ─────────────────────────────────────────
  function detect(input) {
    const s = input.toLowerCase().trim();
    for (const item of KB) {
      if (item.p.some(kw => s.includes(kw))) return item;
    }
    // Partial word fallback
    for (const item of KB) {
      if (item.p.some(kw => kw.trim().split(' ').some(w => w.length > 3 && s.includes(w)))) return item;
    }
    return null;
  }

  // ── Text renderer (markdown bold + newlines) ─────────────────
  function render(txt) {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // ── Typing delay (realistic) ─────────────────────────────────
  function delay(txt) {
    const words = txt.split(' ').length;
    return Math.min(600 + words * 28, 2400);
  }

  // ─────────────────────────────────────────────────────────────
  //  CSS
  // ─────────────────────────────────────────────────────────────
  const CSS = `
    #iw-wrap * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Montserrat', -apple-system, sans-serif; }

    /* ── WhatsApp Button ── */
    #iw-wa {
      position: fixed; bottom: 28px; right: 104px; z-index: 99999;
      width: 54px; height: 54px; border-radius: 50%;
      background: #25d366;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.45);
      text-decoration: none;
      transition: transform 0.3s, box-shadow 0.3s;
      animation: iwWaPop 0.5s 1s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes iwWaPop { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
    #iw-wa:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.65); }
    #iw-wa-label {
      position: absolute; bottom: 68px; right: 104px;
      background: rgba(6,12,30,0.92); color: #fff;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.3px;
      padding: 5px 10px; border-radius: 8px; white-space: nowrap;
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
      border: 1px solid rgba(37,211,102,0.3);
    }
    #iw-wa:hover + #iw-wa-label, #iw-wa-label:hover { opacity: 1; }

    /* ── Toggle Button ── */
    #iw-toggle {
      position: fixed; bottom: 28px; right: 28px; z-index: 99999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(59,130,246,0.5), 0 0 0 0 rgba(59,130,246,0.4);
      transition: transform 0.3s, box-shadow 0.3s;
      animation: iw-pulse-ring 3s infinite 2s;
    }
    #iw-toggle:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(59,130,246,0.65); }
    #iw-toggle svg { transition: opacity 0.2s, transform 0.3s; }
    #iw-toggle.open .iw-ico-chat { opacity: 0; transform: scale(0.5) rotate(45deg); position: absolute; }
    #iw-toggle.open .iw-ico-close { opacity: 1; transform: scale(1) rotate(0); }
    .iw-ico-close { opacity: 0; transform: scale(0.5); position: absolute; transition: opacity 0.2s, transform 0.3s; }

    /* notification dot */
    #iw-notif {
      position: absolute; top: 3px; right: 3px;
      width: 14px; height: 14px; border-radius: 50%;
      background: #ef4444; border: 2px solid #030712;
      animation: iw-blink 1.5s ease-in-out infinite;
    }

    @keyframes iw-pulse-ring {
      0%   { box-shadow: 0 4px 24px rgba(59,130,246,.5), 0 0 0 0   rgba(59,130,246,.4); }
      70%  { box-shadow: 0 4px 24px rgba(59,130,246,.5), 0 0 0 14px rgba(59,130,246,0); }
      100% { box-shadow: 0 4px 24px rgba(59,130,246,.5), 0 0 0 0   rgba(59,130,246,0); }
    }
    @keyframes iw-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes iw-slideup { from{opacity:0;transform:translateY(20px) scale(.97)} to{opacity:1;transform:none} }
    @keyframes iw-fadein  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    @keyframes iw-dots {
      0%,80%,100%{transform:scale(.6);opacity:.4}
      40%{transform:scale(1);opacity:1}
    }

    /* ── Chat Window ── */
    #iw-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 99998;
      width: 370px; height: 540px;
      background: rgba(6,12,30,0.92);
      border: 1px solid rgba(59,130,246,0.25);
      border-radius: 20px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(59,130,246,0.1);
      display: flex; flex-direction: column; overflow: hidden;
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s, transform 0.3s;
      transform: translateY(16px) scale(0.97);
    }
    #iw-window.open {
      opacity: 1; pointer-events: all;
      transform: none;
      animation: iw-slideup 0.35s ease;
    }

    /* ── Header ── */
    #iw-header {
      background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.12));
      border-bottom: 1px solid rgba(59,130,246,0.2);
      padding: 14px 16px;
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    .iw-hinfo { display: flex; align-items: center; gap: 10px; }
    .iw-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg,#3b82f6,#8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem; font-weight: 800; color: #fff; flex-shrink: 0;
      box-shadow: 0 0 16px rgba(59,130,246,0.4);
    }
    .iw-bot-name { font-size: 0.875rem; font-weight: 700; color: #f1f5f9; letter-spacing: -0.2px; }
    .iw-status { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #94a3b8; margin-top: 1px; }
    .iw-online-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; box-shadow: 0 0 6px #22c55e; }
    .iw-close-btn {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; width: 28px; height: 28px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #94a3b8; font-size: 0.75rem;
      transition: background 0.2s, color 0.2s;
    }
    .iw-close-btn:hover { background: rgba(255,255,255,0.12); color: #f1f5f9; }

    /* ── Messages ── */
    #iw-msgs {
      flex: 1; overflow-y: auto; padding: 16px 14px 10px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    #iw-msgs::-webkit-scrollbar { width: 3px; }
    #iw-msgs::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 2px; }

    .iw-msg { display: flex; gap: 8px; animation: iw-fadein 0.3s ease; max-width: 100%; }
    .iw-msg.bot { align-items: flex-start; }
    .iw-msg.user { justify-content: flex-end; }

    .iw-msg-av {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg,#3b82f6,#8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.6rem; font-weight: 800; color: #fff; flex-shrink: 0;
      margin-top: 2px;
    }

    .iw-bubble {
      padding: 10px 13px; border-radius: 14px;
      font-size: 0.83rem; line-height: 1.7; max-width: 82%;
    }
    .bot .iw-bubble {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.09);
      color: #e2e8f0; border-radius: 4px 14px 14px 14px;
    }
    .user .iw-bubble {
      background: linear-gradient(135deg,#3b82f6,#6366f1);
      color: #fff; border-radius: 14px 4px 14px 14px;
      box-shadow: 0 2px 12px rgba(59,130,246,0.3);
    }
    .iw-bubble strong { color: #fff; font-weight: 700; }

    /* ── Typing indicator ── */
    .iw-typing-dots { display: flex; gap: 4px; padding: 14px 16px; }
    .iw-typing-dots span {
      width: 6px; height: 6px; border-radius: 50%;
      background: #94a3b8; display: block;
      animation: iw-dots 1.4s ease-in-out infinite;
    }
    .iw-typing-dots span:nth-child(2) { animation-delay: 0.16s; }
    .iw-typing-dots span:nth-child(3) { animation-delay: 0.32s; }

    /* ── Chips ── */
    #iw-chips {
      padding: 6px 14px 10px;
      display: flex; gap: 7px; flex-wrap: wrap;
      flex-shrink: 0; min-height: 0;
    }
    .iw-chip {
      padding: 5px 12px; border-radius: 50px;
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.25);
      color: #93c5fd; font-size: 0.72rem; font-weight: 600;
      cursor: pointer; white-space: nowrap;
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
      letter-spacing: 0.2px;
    }
    .iw-chip:hover { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.5); color: #bfdbfe; transform: translateY(-1px); }

    /* ── Input row ── */
    #iw-input-row {
      display: flex; gap: 8px; padding: 10px 14px 14px;
      border-top: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
    }
    #iw-input {
      flex: 1; padding: 9px 14px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 50px;
      color: #f1f5f9; font-size: 0.82rem; font-weight: 500; outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    #iw-input:focus { border-color: rgba(59,130,246,0.5); background: rgba(255,255,255,0.1); }
    #iw-input::placeholder { color: rgba(148,163,184,0.6); }
    #iw-send {
      width: 36px; height: 36px; border-radius: 50%; border: none; cursor: pointer;
      background: linear-gradient(135deg,#3b82f6,#8b5cf6);
      color: #fff; font-size: 1rem; display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 10px rgba(59,130,246,0.3);
      flex-shrink: 0;
    }
    #iw-send:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(59,130,246,0.5); }

    /* ── Grid overlay reflection ── */
    #iw-window::before {
      content: '';
      position: absolute; inset: 0; border-radius: 20px; pointer-events: none;
      background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      z-index: 0;
    }
    #iw-header, #iw-msgs, #iw-chips, #iw-input-row { position: relative; z-index: 1; }

    /* ── Mobile ── */
    @media (max-width: 480px) {
      #iw-window { width: calc(100vw - 24px); right: 12px; bottom: 88px; height: 70vh; }
      #iw-toggle { bottom: 18px; right: 18px; }
      #iw-wa { bottom: 18px; right: 90px; width: 48px; height: 48px; }
      #iw-wa-label { display: none; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  //  HTML
  // ─────────────────────────────────────────────────────────────
  const HTML = `
    <div id="iw-wrap">
      <!-- Chat Window -->
      <div id="iw-window" role="dialog" aria-label="ItWorks AI Assistant">
        <div id="iw-header">
          <div class="iw-hinfo">
            <div class="iw-avatar">IW</div>
            <div>
              <div class="iw-bot-name">Ivy · ItWorks AI</div>
              <div class="iw-status"><span class="iw-online-dot"></span> Online · Usually replies instantly</div>
            </div>
          </div>
          <button class="iw-close-btn" id="iw-close-btn" aria-label="Close chat">✕</button>
        </div>
        <div id="iw-msgs"></div>
        <div id="iw-chips"></div>
        <div id="iw-input-row">
          <input id="iw-input" type="text" placeholder="Ask me anything about ItWorks..." maxlength="300" autocomplete="off" />
          <button id="iw-send" aria-label="Send message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <!-- WhatsApp Button -->
      <!-- ⚠️ Replace YOUR_WHATSAPP_NUMBER with your number incl. country code, no spaces or + e.g. 447700900123 -->
      <a id="iw-wa" href="https://wa.me/923025344435?text=Hi%20ItWorks!%20I%27d%20like%20to%20learn%20more%20about%20your%20AI%20services." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <div id="iw-wa-label">Chat on WhatsApp</div>

      <!-- Toggle Button -->
      <button id="iw-toggle" aria-label="Open AI assistant">
        <div id="iw-notif" title="Chat with Ivy"></div>
        <!-- Chat icon -->
        <svg class="iw-ico-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        <!-- Close icon -->
        <svg class="iw-ico-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `;

  // ─────────────────────────────────────────────────────────────
  //  STATE & REFS
  // ─────────────────────────────────────────────────────────────
  let isOpen     = false;
  let hasOpened  = false;
  let isTyping   = false;
  let el         = {};

  // ─────────────────────────────────────────────────────────────
  //  DOM HELPERS
  // ─────────────────────────────────────────────────────────────
  function scrollBottom() {
    el.msgs.scrollTop = el.msgs.scrollHeight;
  }

  function setChips(chips) {
    el.chips.innerHTML = '';
    if (!chips || !chips.length) return;
    chips.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'iw-chip';
      btn.textContent = text;
      btn.addEventListener('click', () => onChip(text));
      el.chips.appendChild(btn);
    });
  }

  function addBotBubble(html, chips) {
    const row = document.createElement('div');
    row.className = 'iw-msg bot';
    row.innerHTML = `<div class="iw-msg-av">IW</div><div class="iw-bubble">${html}</div>`;
    el.msgs.appendChild(row);
    scrollBottom();
    if (chips) setChips(chips);
  }

  function addUserBubble(text) {
    const row = document.createElement('div');
    row.className = 'iw-msg user';
    row.innerHTML = `<div class="iw-bubble">${text}</div>`;
    el.msgs.appendChild(row);
    scrollBottom();
    setChips([]);
  }

  function addTyping() {
    const row = document.createElement('div');
    row.className = 'iw-msg bot';
    row.id = 'iw-typing-row';
    row.innerHTML = `<div class="iw-msg-av">IW</div><div class="iw-bubble" style="padding:0;background:transparent;border:none;"><div class="iw-typing-dots"><span></span><span></span><span></span></div></div>`;
    el.msgs.appendChild(row);
    scrollBottom();
  }

  function removeTyping() {
    const t = document.getElementById('iw-typing-row');
    if (t) t.remove();
  }

  // ─────────────────────────────────────────────────────────────
  //  RESPOND
  // ─────────────────────────────────────────────────────────────
  function respond(input) {
    if (isTyping) return;
    isTyping = true;

    const match = detect(input) || FALLBACK;
    addTyping();

    setTimeout(() => {
      removeTyping();
      addBotBubble(render(match.r), match.c);
      isTyping = false;
    }, delay(match.r));
  }

  // ─────────────────────────────────────────────────────────────
  //  CHIP CLICK
  // ─────────────────────────────────────────────────────────────
  function onChip(text) {
    if (NAV[text]) {
      // Navigation chip
      addUserBubble(text);
      const url = NAV[text];
      setTimeout(() => {
        addBotBubble(`Taking you there now... 🚀`, []);
        setTimeout(() => { window.location.href = url; }, 700);
      }, 300);
      return;
    }
    // Ask chip — treat as typed message
    addUserBubble(text);
    respond(text);
  }

  // ─────────────────────────────────────────────────────────────
  //  SEND
  // ─────────────────────────────────────────────────────────────
  function send() {
    const val = el.input.value.trim();
    if (!val || isTyping) return;
    el.input.value = '';
    setChips([]);
    addUserBubble(val);
    respond(val);
  }

  // ─────────────────────────────────────────────────────────────
  //  OPEN / CLOSE / TOGGLE
  // ─────────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    el.window.classList.add('open');
    el.toggle.classList.add('open');
    if (el.notif) el.notif.style.display = 'none';

    if (!hasOpened) {
      hasOpened = true;
      // Welcome message after brief delay
      setTimeout(() => {
        const welcome = KB[0]; // greeting
        addBotBubble(render(welcome.r), welcome.c);
      }, 400);
    }

    setTimeout(() => el.input.focus(), 350);
  }

  function closeChat() {
    isOpen = false;
    el.window.classList.remove('open');
    el.toggle.classList.remove('open');
  }

  function toggleChat() {
    isOpen ? closeChat() : openChat();
  }

  // ─────────────────────────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────────────────────────
  function init() {
    // Inject CSS
    const style = document.createElement('style');
    style.id = 'iw-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper);

    // Cache refs
    el.wrap   = document.getElementById('iw-wrap');
    el.window = document.getElementById('iw-window');
    el.toggle = document.getElementById('iw-toggle');
    el.msgs   = document.getElementById('iw-msgs');
    el.chips  = document.getElementById('iw-chips');
    el.input  = document.getElementById('iw-input');
    el.send   = document.getElementById('iw-send');
    el.notif  = document.getElementById('iw-notif');
    el.close  = document.getElementById('iw-close-btn');

    // Events
    el.toggle.addEventListener('click', toggleChat);
    el.close.addEventListener('click', closeChat);
    el.send.addEventListener('click', send);
    el.input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

    // Close on Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

    // Auto-open teaser after 12 seconds (first visit only)
    if (!sessionStorage.getItem('iw_opened')) {
      setTimeout(() => {
        if (!isOpen) {
          openChat();
          sessionStorage.setItem('iw_opened', '1');
        }
      }, 12000);
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  BOOT
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
