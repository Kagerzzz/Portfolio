/**
 * Sanvithi.com Portfolio - Creative Neubrutalism Engine
 * Confetti Particles, Live Clocks, Dynamic Cursor, 3D Parallax Tilt & Supabase DB
 */

// Hero Questions & Interactive Perspectives
const HERO_PERSPECTIVES = [
  { key: "who", label: "✦ WHO I AM", text: "Chỉ là một designer với niềm đam mê lớn với phát triển sản phẩm.", theme: "who", color: "var(--neo-green)" },
  { key: "care", label: "♥ WHAT I CARE ABOUT", text: "Tìm kiếm sự cân bằng giữa giá trị, thẩm mỹ, và tính hữu dụng.", theme: "care", color: "var(--neo-pink)" },
  { key: "believe", label: "★ WHAT I BELIEVE IN", text: "Thấu hiểu người dùng trước khi tìm cách giải quyết vấn đề của họ.", theme: "believe", color: "var(--neo-yellow)" },
  { key: "cook", label: "⚡ WHAT I CAN COOK", text: "Biến những ý tưởng thành trải nghiệm, rồi để trải nghiệm chạm tới người dùng.", theme: "cook", color: "var(--neo-orange)" },
  { key: "upto", label: "☕ WHAT I'M UP TO", text: "Lang thang giữa thiết kế, công nghệ, khách hàng và những ý tưởng tạo nên giá trị.", theme: "upto", color: "var(--neo-cyan)" }
];

const HERO_TAB_DATA = {
  who: HERO_PERSPECTIVES[0].text,
  care: HERO_PERSPECTIVES[1].text,
  believe: HERO_PERSPECTIVES[2].text,
  cook: HERO_PERSPECTIVES[3].text,
  upto: HERO_PERSPECTIVES[4].text
};

// All Real Sanvithi.com Projects + Flagship TaskSync
const PROJECTS_DATA = [
  {
    id: "tasksync",
    title: "TaskSync — Next-Gen Work Management & Team Collaboration Platform",
    client: "Vertex Solutions Company",
    role: "Lead Product Designer & UX Architect",
    year: "2025 ∙ Shipped",
    tags: ["Mobile App", "Work Management", "Product Strategy", "Design System", "Shipped"],
    summary: "An advanced, seamless collaboration and management platform. With messaging, video conferencing, cloud docs, and a smart calendar, as well as management tools that can be used to set goals, streamline approvals, and much more.",
    image: "assets/tasksync/tasksync-cover.png",
    metrics: [
      { val: "+40%", label: "Team Productivity" },
      { val: "-65%", label: "Context Switching" },
      { val: "98%", label: "On-time Attendance" }
    ],
    overview: "TaskSync is a unified mobile-first work management platform combining team communication, calendar agendas, geofenced GPS attendance, and multi-tenant organization management into one coherent ecosystem.",
    challenge: "Modern distributed teams suffer from severe digital fragmentation, constantly jumping between separate apps for task management, internal messaging, time-clock tracking, and administrative approvals.",
    solution: "A unified mobile-first ecosystem connecting communication, daily agenda execution, GPS geofenced attendance, and multi-tenant organization switching in one cohesive experience.",
    content: `
      <div class="cs-header">
        <div class="cs-badge-strip">
          <span class="cs-pill" style="background: var(--neo-yellow);">✦ FLAGSHIP CASE STUDY</span>
          <span class="cs-pill" style="background: var(--neo-cyan);">MOBILE APP &amp; WORKSPACE</span>
          <span class="cs-pill" style="background: var(--neo-green);">SHIPPED V1.0 🚀</span>
        </div>
        <h1 class="cs-title">TaskSync — Next-Gen Work Management &amp; Team Collaboration Platform</h1>
        <p class="cs-lead">An advanced, seamless collaboration and management platform. With messaging, video conferencing, cloud docs, and a smart calendar, as well as management tools that can be used to set goals, streamline approvals, and much more.</p>
        
        <div class="cs-meta-grid">
          <div class="cs-meta-item">
            <span class="cs-meta-label">Role</span>
            <span class="cs-meta-val">Lead Product Designer &amp; UX Architect</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Client</span>
            <span class="cs-meta-val">Vertex Solutions Company</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Timeline</span>
            <span class="cs-meta-val">6 Months (Discovery to Shipped)</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Deliverables</span>
            <span class="cs-meta-val">iOS, Android App &amp; Multi-Tenant System</span>
          </div>
        </div>

        <div class="modal-metrics-grid">
          <div class="metric-item">
            <div class="metric-num">+40%</div>
            <div class="metric-label">Team Task Velocity</div>
          </div>
          <div class="metric-item">
            <div class="metric-num">-65%</div>
            <div class="metric-label">Context-Switching Time</div>
          </div>
          <div class="metric-item">
            <div class="metric-num">98%</div>
            <div class="metric-label">On-Time Attendance Check-in</div>
          </div>
        </div>

        <div class="doc-img-block" style="margin-top: 24px;">
          <img src="assets/tasksync/tasksync-cover.png" alt="TaskSync Flagship Mockup" class="modal-hero-banner" style="height: auto; max-height: 480px; object-fit: contain; background: #E8EDF5; border-radius: 16px;">
          <div class="doc-caption" style="text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); margin-top: 8px;">✦ TaskSync Mobile Command Hub — 100% Native iOS Experience</div>
        </div>
      </div>

      <!-- SECTION 01: STRATEGY -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">01</span>
          <h2 class="cs-section-title">Strategy: User Need vs. Business Goal</h2>
        </div>
        <p class="cs-section-desc">To design a truly indispensable workplace app, we aligned daily employee clarity with enterprise administrative governance.</p>

        <div class="cs-bento-2">
          <div class="cs-bento-card accent-pink">
            <div class="cs-card-title"><span>👤</span> User Need (Employees &amp; Leads)</div>
            <ul class="cs-bullet-list">
              <li><strong>Overcome App Fatigue:</strong> Eliminate the need to toggle between 4-5 apps just to start a work day (Slack for chat, Asana for tasks, Google Calendar for schedule, separate HR portal for attendance).</li>
              <li><strong>Frictionless Daily Routine:</strong> A single "Today Task" queue that surfaces priority meetings, deadlines, and live session timers in one glance.</li>
              <li><strong>Instant Administrative Approvals:</strong> Submit leave requests, expense approvals, and member invitations directly on mobile with real-time status feedback.</li>
              <li><strong>Seamless Multi-Company Switching:</strong> Freedom for consultants and multi-org members to switch companies without painful logout/login loops.</li>
            </ul>
          </div>
          <div class="cs-bento-card accent-cyan">
            <div class="cs-card-title"><span>🏢</span> Business Goal (Vertex Solutions &amp; Enterprise)</div>
            <ul class="cs-bullet-list">
              <li><strong>Consolidate SaaS Costs:</strong> Replace multiple disparate subscriptions with an all-in-one scalable platform, cutting enterprise software licensing costs by up to 35%.</li>
              <li><strong>Accurate, Fraud-Proof Attendance:</strong> Enforce geofenced GPS check-in/out at designated office sites (e.g. 1234 Silicon Avenue) to eliminate manual timesheet auditing.</li>
              <li><strong>Accelerate Approval Cycles:</strong> Reduce request turnaround time from 48 hours to under 2 hours via automated mobile push notifications and approval cards.</li>
              <li><strong>Secure Multi-Tenant Architecture:</strong> Provide enterprise-grade tenant isolation, granular role-based permissions, and centralized org management.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- SECTION 02: COMPETITOR AUDIT -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">02</span>
          <h2 class="cs-section-title">Competitor Audit &amp; Market Opportunity</h2>
        </div>
        <p class="cs-section-desc">We benchmarked industry leaders to uncover critical white spaces where TaskSync could differentiate through mobile ergonomics and native operational depth.</p>

        <div class="cs-table-container">
          <table class="cs-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Core Strength</th>
                <th>GPS &amp; Attendance</th>
                <th>Multi-Org Switcher</th>
                <th>Mobile Usability</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr class="highlight-row">
                <td><strong>TaskSync</strong> <span class="cs-badge-highlight">OUR SOLUTION</span></td>
                <td>All-in-One: Chat, Tasks, Docs, Calendar, HR &amp; Admin Suite</td>
                <td>Native Live Session Stopwatch &amp; Geofenced Check-in</td>
                <td>Instant Bottom Sheet Switcher (Vertex ↔ DigitalWorld)</td>
                <td>Mobile-first ergonomics, thumb-friendly navigation</td>
                <td>Unified daily command center with zero tool fragmentation</td>
              </tr>
              <tr>
                <td><strong>Slack</strong></td>
                <td>Team messaging &amp; 3rd party bots</td>
                <td>Requires external integrations</td>
                <td>Full app reload per workspace</td>
                <td>Message-heavy, tasks easily lost in chat stream</td>
                <td>Excellent communication, but lacks native task execution</td>
              </tr>
              <tr>
                <td><strong>Asana</strong></td>
                <td>Complex desktop project tracking</td>
                <td>None</td>
                <td>Single workspace context</td>
                <td>Cluttered mobile grids, difficult to update on the go</td>
                <td>Great for project managers, cumbersome for frontline staff</td>
              </tr>
              <tr>
                <td><strong>Lark / Feishu</strong></td>
                <td>Enterprise super-app suite</td>
                <td>Built-in attendance modules</td>
                <td>Enterprise hierarchy</td>
                <td>Information overload, steep learning curve</td>
                <td>Feature-heavy; can feel intimidating and slow for agile teams</td>
              </tr>
              <tr>
                <td><strong>Monday.com</strong></td>
                <td>Customizable board views</td>
                <td>Basic time tracking widget</td>
                <td>Limited mobile account switching</td>
                <td>Slow rendering on complex boards</td>
                <td>Visual on desktop, compromised mobile UX</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cs-callout-banner">
          <div class="cs-callout-title">💡 The Market Opportunity: "Lightweight Enterprise Power"</div>
          <p style="margin: 0; font-size: 13.5px; line-height: 1.6;">Existing tools forced teams to choose between an over-engineered corporate giant (Lark) or a disconnected stack of point solutions (Slack + Asana + HR apps). TaskSync occupies the sweet spot: the lightweight agility of a consumer app combined with the operational rigor of enterprise-grade work management.</p>
        </div>
      </section>

      <!-- SECTION 03: USER INTERVIEW -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">03</span>
          <h2 class="cs-section-title">User Interviews &amp; Field Insights</h2>
        </div>
        <p class="cs-section-desc">We conducted 12 qualitative in-depth interviews with operations leads, team managers, and individual contributors to uncover daily workflow frictions.</p>

        <div class="cs-quotes-grid">
          <div class="cs-quote-card">
            <div class="cs-quote-text">"Every morning starts with chaos: I check Slack for urgent messages, open Asana to see what's due, and check Google Calendar for calls. By the time I finish tool-hopping, I've lost 30 minutes of focus."</div>
            <div class="cs-quote-author">
              <div class="cs-quote-avatar">AS</div>
              <div>
                <div style="font-weight: 700; font-size: 13px;">Alex Smith</div>
                <div style="color: var(--text-dim); font-size: 11px;">Operations Lead ∙ Vertex Solutions</div>
              </div>
            </div>
          </div>

          <div class="cs-quote-card">
            <div class="cs-quote-text">"At the end of every month, our HR team spent days chasing down employees who forgot to clock in on the company intranet portal. We desperately needed an automatic, geofenced mobile check-in."</div>
            <div class="cs-quote-author">
              <div class="cs-quote-avatar" style="background: var(--neo-pink);">SJ</div>
              <div>
                <div style="font-weight: 700; font-size: 13px;">Sarah Jenkins</div>
                <div style="color: var(--text-dim); font-size: 11px;">People &amp; Culture Specialist</div>
              </div>
            </div>
          </div>

          <div class="cs-quote-card">
            <div class="cs-quote-text">"I consult for two different client companies. Having to log out of my workspace app and log back in multiple times a day on mobile is painful. I need to switch contexts with a single tap."</div>
            <div class="cs-quote-author">
              <div class="cs-quote-avatar" style="background: var(--neo-cyan);">DK</div>
              <div>
                <div style="font-weight: 700; font-size: 13px;">David Kim</div>
                <div style="color: var(--text-dim); font-size: 11px;">Tech Lead &amp; Multi-Org Consultant</div>
              </div>
            </div>
          </div>

          <div class="cs-quote-card">
            <div class="cs-quote-text">"Most enterprise software looks like an Excel spreadsheet crammed into a 6-inch phone. I just want a clean dashboard that tells me: what must I do today, and what is waiting on me?"</div>
            <div class="cs-quote-author">
              <div class="cs-quote-avatar" style="background: var(--neo-green);">LP</div>
              <div>
                <div style="font-weight: 700; font-size: 13px;">Linh Phạm</div>
                <div style="color: var(--text-dim); font-size: 11px;">Senior UI/UX Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 04: USER PERSONAS -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">04</span>
          <h2 class="cs-section-title">User Personas &amp; Behavioral Archetypes</h2>
        </div>
        <p class="cs-section-desc">Synthesized from research findings, we created two core personas representing administrative management and individual execution.</p>

        <div class="cs-persona-grid">
          <div class="cs-persona-card">
            <div class="cs-persona-header">
              <img src="assets/avt.jpg" alt="Alex Smith" class="cs-persona-avatar">
              <div>
                <div class="cs-persona-name">Alex Smith (32)</div>
                <div class="cs-persona-role">Operations Lead &amp; Org Admin</div>
              </div>
            </div>
            <div class="cs-persona-body">
              <p style="margin: 0; color: var(--text-muted); font-size: 13px;">Alex oversees cross-functional operations across design and engineering at Vertex Solutions. He is constantly moving between client pitch meetings, sprint check-ins, and budget approvals.</p>
              <div>
                <strong style="color: var(--text-main); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">Primary Goals:</strong>
                <ul class="cs-bullet-list" style="margin-top: 6px;">
                  <li>Instant bird's-eye view of team task completion.</li>
                  <li>One-tap approval for leave and expense requests.</li>
                  <li>Automated attendance oversight without micromanagement.</li>
                </ul>
              </div>
              <div>
                <strong style="color: var(--text-main); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">Pain Points:</strong>
                <ul class="cs-bullet-list" style="margin-top: 6px;">
                  <li>Important approvals get buried in fast-moving chat channels.</li>
                  <li>Lack of real-time visibility into who is on-site vs remote.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="cs-persona-card">
            <div class="cs-persona-header">
              <img src="assets/avatar-thanhieu.jpg" alt="Linh Pham" class="cs-persona-avatar">
              <div>
                <div class="cs-persona-name">Linh Phạm (26)</div>
                <div class="cs-persona-role">Senior Product Designer &amp; Contributor</div>
              </div>
            </div>
            <div class="cs-persona-body">
              <p style="margin: 0; color: var(--text-muted); font-size: 13px;">Linh is a hands-on designer crafting design systems and user flows for Vertex Solutions, while also providing design advisory to partner companies like DigitalWorld.</p>
              <div>
                <strong style="color: var(--text-main); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">Primary Goals:</strong>
                <ul class="cs-bullet-list" style="margin-top: 6px;">
                  <li>Zero distraction when in deep design focus.</li>
                  <li>Fast GPS check-in upon arriving at 1234 Silicon Avenue.</li>
                  <li>Switch between Vertex Solutions and DigitalWorld workspaces instantly.</li>
                </ul>
              </div>
              <div>
                <strong style="color: var(--text-main); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">Pain Points:</strong>
                <ul class="cs-bullet-list" style="margin-top: 6px;">
                  <li>Excessive status update meetings interrupting creative flow.</li>
                  <li>Cumbersome desktop-only corporate portals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 05: VISUAL STYLE & DESIGN SYSTEM -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">05</span>
          <h2 class="cs-section-title">Visual Style &amp; Design System Tokens</h2>
        </div>
        <p class="cs-section-desc">TaskSync's visual language blends clean contemporary SaaS typography with energetic, high-contrast Neubrutalist feedback tokens to ensure effortless readability on small screens.</p>

        <div class="cs-palette-grid">
          <div class="cs-swatch">
            <div class="cs-swatch-color" style="background: #4361EE;"></div>
            <div class="cs-swatch-info">
              <div class="cs-swatch-name">Royal Indigo</div>
              <div class="cs-swatch-hex">#4361EE</div>
            </div>
          </div>
          <div class="cs-swatch">
            <div class="cs-swatch-color" style="background: #4CC9F0;"></div>
            <div class="cs-swatch-info">
              <div class="cs-swatch-name">Sky Cyan</div>
              <div class="cs-swatch-hex">#4CC9F0</div>
            </div>
          </div>
          <div class="cs-swatch">
            <div class="cs-swatch-color" style="background: #10B981;"></div>
            <div class="cs-swatch-info">
              <div class="cs-swatch-name">Emerald Success</div>
              <div class="cs-swatch-hex">#10B981</div>
            </div>
          </div>
          <div class="cs-swatch">
            <div class="cs-swatch-color" style="background: #FFB703;"></div>
            <div class="cs-swatch-info">
              <div class="cs-swatch-name">Amber Warning</div>
              <div class="cs-swatch-hex">#FFB703</div>
            </div>
          </div>
          <div class="cs-swatch">
            <div class="cs-swatch-color" style="background: #F72585;"></div>
            <div class="cs-swatch-info">
              <div class="cs-swatch-name">Punch Pink</div>
              <div class="cs-swatch-hex">#F72585</div>
            </div>
          </div>
        </div>

        <div class="cs-bento-2">
          <div class="cs-bento-card accent-green">
            <div class="cs-card-title"><span>📐</span> Spatial Hierarchy &amp; Micro-Interactions</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0;">Designed on an 8px progressive spatial grid. Interactive cards feature tactile <code>24px-28px</code> pill radii with subtle Neubrutalist border offsets, giving users tactile certainty on mobile tap targets.</p>
          </div>
          <div class="cs-bento-card accent-yellow">
            <div class="cs-card-title"><span>🔤</span> Typography &amp; Dynamic State Badges</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0;">Clear SF Pro / Inter font pairing with high-visibility numeric counters. Status chips (<code>On Progress</code> in deep blue, <code>To-do</code> in warm orange, <code>Done</code> in vibrant emerald) ensure instantaneous scanning.</p>
          </div>
        </div>
      </section>

      <!-- SECTION 06: USER INTERFACE SHOWCASE (REAL SCREENS) -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">06</span>
          <h2 class="cs-section-title">User Interface Showcase &amp; End-to-End Flows</h2>
        </div>
        <p class="cs-section-desc">A deep-dive into the actual shipped interface screens of TaskSync, showcasing end-to-end user journeys from onboarding to deep enterprise administration.</p>

        <!-- Flow 1 -->
        <div style="margin-bottom: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="cs-pill" style="background: var(--neo-cyan);">FLOW 01</span>
            <h3 style="font-size: 1.25rem; margin: 0;">Onboarding, Biometric Login &amp; OTP Security</h3>
          </div>
          <div class="cs-screens-grid-3">
            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-onboarding.png" alt="TaskSync Welcome Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 01</span>
                <div class="cs-screen-title">Welcome &amp; Value Proposition</div>
                <div class="cs-screen-desc">Playful 3D illustration and concise branding establishing trust and focus from the very first launch.</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-login.png" alt="TaskSync Login Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 02</span>
                <div class="cs-screen-title">Sign In &amp; Biometrics</div>
                <div class="cs-screen-desc">Clean single-tap FaceID/Fingerprint authentication along with Google and Facebook OAuth integration.</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-otp.png" alt="TaskSync OTP Verification" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 03</span>
                <div class="cs-screen-title">OTP Security Verification</div>
                <div class="cs-screen-desc">6-digit auto-advancing verification code input with immediate resend timer and error validation.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Flow 2 -->
        <div style="margin-bottom: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="cs-pill" style="background: var(--neo-yellow);">FLOW 02</span>
            <h3 style="font-size: 1.25rem; margin: 0;">Command Center (Home) &amp; Multi-Tenant Switcher</h3>
          </div>
          <div class="cs-screens-grid-2">
            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-home.png" alt="TaskSync Home Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 04</span>
                <div class="cs-screen-title">Unified Workspace Dashboard</div>
                <div class="cs-screen-desc">Real-time status counters (23 All task, 12 Todo list), active "Today task" tracker (10:00 - 14:00 on Progress), and an 8-icon module grid (Admin suite, Task, Attendance, Reminder, Request, Mailbox, Salary, Report).</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-workspace-switch.png" alt="TaskSync Multi-tenant Switcher" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 05</span>
                <div class="cs-screen-title">Instant Organization Switcher</div>
                <div class="cs-screen-desc">Bottom sheet drawer allowing seamless toggling between multiple enterprise tenants (e.g., Vertex Solutions Company as Owner vs. DigitalWorld as Graphic Designer) with instant permission re-scoping.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Flow 3 -->
        <div style="margin-bottom: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="cs-pill" style="background: var(--neo-green);">FLOW 03</span>
            <h3 style="font-size: 1.25rem; margin: 0;">Centralized Communication Hub &amp; Smart GPS Attendance</h3>
          </div>
          <div class="cs-screens-grid-2">
            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-mailbox.png" alt="TaskSync Mailbox Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 06</span>
                <div class="cs-screen-title">Mailbox &amp; System Notifications</div>
                <div class="cs-screen-desc">Intelligent triage separating Messenger from System notices. Real-time approval alerts ("Your Leave requirement has been accepted") and attendance check-in reminders with unread badges.</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-attendance.png" alt="TaskSync Attendance Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 07</span>
                <div class="cs-screen-title">Geofenced Attendance &amp; Live Timer</div>
                <div class="cs-screen-desc">Live session stopwatch (01:27:22), location-stamped GPS check-in/out at 1234 Silicon Avenue, lunch break recording, and daily time summary metrics (05h 22m total, 0 late-in).</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Flow 4 -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="cs-pill" style="background: var(--neo-pink);">FLOW 04</span>
            <h3 style="font-size: 1.25rem; margin: 0;">Agile Task Board, Admin Console &amp; Profile Security</h3>
          </div>
          <div class="cs-screens-grid-3">
            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-tasks.png" alt="TaskSync Task Management Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 08</span>
                <div class="cs-screen-title">Daily Agenda &amp; Task Planner</div>
                <div class="cs-screen-desc">Interactive weekly calendar strip, multi-state status filters (All, To-do, On progress, Done), color-coded cards, and floating action button for quick task creation.</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-admin.png" alt="TaskSync Admin Suite Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 09</span>
                <div class="cs-screen-title">Admin Suite &amp; Org Management</div>
                <div class="cs-screen-desc">Centralized console to manage company profile, add/manage members and departments, configure security settings, and access the enterprise help center.</div>
              </div>
            </div>

            <div class="cs-screen-card">
              <div class="cs-phone-frame">
                <img src="assets/tasksync/tasksync-settings.png" alt="TaskSync Settings Screen" loading="lazy">
              </div>
              <div class="cs-screen-info">
                <span class="cs-screen-tag">SCREEN 10</span>
                <div class="cs-screen-title">User Account &amp; System Settings</div>
                <div class="cs-screen-desc">User avatar profile management, company affiliation, access links, personal notification preferences, and persistent bottom navigation bar.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 07: IMPACT & REFLECTION -->
      <section class="cs-section">
        <div class="cs-section-header">
          <span class="cs-section-num">07</span>
          <h2 class="cs-section-title">Measurable Impact &amp; Designer Reflection</h2>
        </div>
        <p class="cs-section-desc">TaskSync shipped to over 1,500 enterprise users across Vertex Solutions and client partner organizations with remarkable adoption metrics.</p>

        <div class="cs-bento-2">
          <div class="cs-bento-card accent-green">
            <div class="cs-card-title"><span>🚀</span> Quantitative Impact</div>
            <ul class="cs-bullet-list">
              <li><strong>+40% Sprint Task Velocity:</strong> Teams delivered assigned tickets significantly faster thanks to unified daily agenda visibility.</li>
              <li><strong>-65% Reduction in Context-Switching:</strong> Employees reported saving an estimated 45 minutes daily by not jumping between 4 separate tools.</li>
              <li><strong>98% On-Time Check-In Accuracy:</strong> GPS geofenced check-in virtually eliminated manual attendance reconciliation for HR.</li>
              <li><strong>Zero Security Breaches:</strong> Multi-tenant isolation ensured confidential projects across Vertex and DigitalWorld remained strictly segregated.</li>
            </ul>
          </div>
          <div class="cs-bento-card accent-pink">
            <div class="cs-card-title"><span>💡</span> Key Designer Takeaways</div>
            <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">"Designing an enterprise super-app for mobile is an exercise in relentless prioritization. By grouping 8 core workplace modules into a thumb-accessible grid and giving 'Today Task' the hero spot, we transformed complex enterprise operations into a delightful, stress-free daily companion."</p>
          </div>
        </div>
      </section>
    `
  },
  {
    id: "explora",
    title: "Explora — Empowering scientists to deliver faster personalized cancer care",
    client: "Cellworks Biotech",
    role: "Founding Product Designer",
    year: "13 Months ∙ Shipped",
    tags: ["0 to 1", "Design Systems", "R&D Tool", "Shipped"],
    summary: "I set the product strategy for a biotech platform that saves 1 hour of research time everyday for scientists.",
    image: "assets/saas.png",
    metrics: [
      { val: "~$1.2M", label: "Recovered in Productivity" },
      { val: "100%", label: "Organization Adoption" },
      { val: "9 → 1", label: "Systems Consolidated" }
    ],
    overview: "Explora is a 0-to-1 unified R&D workspace built for Cellworks, a biotech company focused on curing cancer. Before Explora, scientists juggled 9+ legacy tools and spreadsheets.",
    challenge: "Scientists & engineers spent hours tool-hopping, waiting for legacy systems to process simulations, which created a massive productivity lag in cancer research.",
    solution: "I led the 0 to 1 design to consolidate 9+ legacy tools into a singular IDE with split-workspace grids, parallel simulation plotting, and automated progress tracking."
  },
  {
    id: "miraai",
    title: "Mira.ai — Innovating the future of AI in pregnancy nutrition",
    client: "Passion Project / Research",
    role: "Product Designer",
    year: "16 Weeks ∙ Product Concept",
    tags: ["Wearable", "Visual Design", "Systems Design", "Product Concept", "Pregnancy Nutrition"],
    summary: "I designed an AI-first nutrition assistant that turns complex health data into clear everyday decisions for pregnant women.",
    image: "assets/ecommerce.png",
    metrics: [
      { val: "15/15", label: "Testers Greater Confidence" },
      { val: "100%", label: "Preferred AI Context" },
      { val: "~70%", label: "Pregnancies with Nausea" }
    ],
    overview: "Mira.ai combines physiological sensing (HRV metrics) on the Apple Watch with a bio-digital twin in the mobile app to adapt recipes and provide real-time nausea relief.",
    challenge: "Most pregnancy apps count kicks and bump sizes but ignore the body carrying it — missing the daily realities of nausea, discomfort, and shifting nutrient needs.",
    solution: "We designed a smart watch strap with median-nerve stimulation and a transparent AI assistant that explains every food suggestion and asks for human consent before acting."
  },
  {
    id: "manage",
    title: "Manage (Siemens) — Accelerating field operations with intuitive interaction",
    client: "Siemens (Acquired Manage)",
    role: "Product Designer",
    year: "4 Months ∙ Shipped",
    tags: ["Enterprise / SaaS", "Interaction Design", "Lighting & Energy Management System", "Shipped"],
    summary: "I rebuilt a core workflow of a lighting management platform, cutting setup time from 5 days to 2 for field engineers.",
    image: "assets/design-system.png",
    metrics: [
      { val: "5 → 2", label: "Days Setup Time" },
      { val: "100%", label: "Commissioning Accuracy" },
      { val: "+25%", label: "Screen Real Estate" }
    ],
    overview: "Manage is the primary interface for field engineers commissioning 1,000+ smart sensors across massive commercial building construction sites.",
    challenge: "The legacy interface was a 'wall of data' requiring click marathons and manual coordinate entries, taking 5 full days to commission a single building.",
    solution: "I redesigned the core workflow with direct drag-to-group selection, sticky instruction strips, and a collapsible high-density floor plan interface."
  },
  {
    id: "ai-consumer-research",
    title: "AI Consumer Research Platform — Expert Data Collection App",
    client: "Co-led with 2 Founders",
    role: "Product Design",
    year: "Consumer ∙ Shipped",
    tags: ["Co-led with 2 Founders", "Consumer-facing", "AI Platform", "Product Design", "Shipped"],
    summary: "I envisioned the MVP mobile app screens to enable experts to participate in AI-driven research.",
    image: "assets/fintech.png",
    metrics: [
      { val: "2", label: "Founders Co-led" },
      { val: "MVP", label: "Shipped to App Store" },
      { val: "AI", label: "Driven Insights" }
    ],
    overview: "Mobile application enabling domain experts to participate in specialized AI model training and evaluation tasks.",
    challenge: "Creating an engaging consumer UX while collecting high-precision annotations from technical experts.",
    solution: "Streamlined micro-tasking interface with instant visual feedback and gamified progress tracking."
  },
  {
    id: "ai-insurance-claims",
    title: "AI-Native Insurance Claim Management — B2B Prototype",
    client: "Co-led with Founder",
    role: "Lead Designer & Prototyper",
    year: "B2B ∙ Prototype",
    tags: ["Co-led with Founder", "AI-native", "B2B", "Prototype", "Insurance Claim Management"],
    summary: "I prototyped the MVP version of an AI-native insurance claim management platform for the founder to pitch to investors.",
    image: "assets/saas.png",
    metrics: [
      { val: "10x", label: "Faster Claim Processing" },
      { val: "B2B", label: "Enterprise Ready" },
      { val: "Seed", label: "Investor Pitch Ready" }
    ],
    overview: "A automated claims processing engine using multimodal AI models to inspect damage reports, verify policy terms, and draft settlement offers.",
    challenge: "Insurance adjusters needed full auditability for automated AI decisions.",
    solution: "Designed a side-by-side human-in-the-loop dashboard highlighting evidence sources and risk confidence scores."
  }
];

let activeProjects = [...PROJECTS_DATA];

// Initialize Events
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMoodSwitcher();
  initLiveClocks();
  initHeroTabs();
  renderProjects();
  initModalEvents();
  initCursorTrailEngine();
  initCustomCursorAndBadge();
  initMagneticElements();
  init3DParallaxTilt();
  initConfettiEngine();
  
  // Asynchronously fetch dynamic data from Vercel Blob Store
  loadProjectsFromBlob();
});

/* Fetch projects dynamically from Vercel Blob Store */
async function loadProjectsFromBlob() {
  if (typeof fetchProjectsFromVercelBlob !== 'function') return;

  try {
    const data = await fetchProjectsFromVercelBlob();
    if (data && Array.isArray(data) && data.length > 0) {
      const blobProjects = data.map(p => ({
        id: p.id,
        title: p.title || '',
        client: p.client || '',
        role: p.role || '',
        year: p.year || '',
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map(s=>s.trim()) : []),
        summary: p.summary || p.title,
        image: p.image_url || p.image || 'assets/saas.png',
        metrics: p.metrics || [],
        overview: p.overview || '',
        challenge: p.challenge || '',
        solution: p.solution || '',
        content: p.content || ''
      }));
      
      // Preserve local flagship projects (like tasksync) at the top if not present in remote blob
      const localFlagships = PROJECTS_DATA.filter(lp => !blobProjects.some(bp => bp.id === lp.id));
      activeProjects = [...localFlagships, ...blobProjects];
      
      renderProjects();
      init3DParallaxTilt();
      console.log('✅ [Vercel Blob] Đã load thành công', activeProjects.length, 'dự án!');
    }
  } catch (err) {
    console.warn("⚠️ Vercel Blob loading error (falling back to static local data):", err);
  }
}

/* Theme Toggle (Light / Dark) */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("sanvithi_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sanvithi_theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.innerHTML = theme === "dark"
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

/* Mood Switcher (Color Palette Customizer) */
function initMoodSwitcher() {
  const moodDots = document.querySelectorAll(".mood-dot");
  const savedMood = localStorage.getItem("sanvithi_mood") || "default";
  document.documentElement.setAttribute("data-mood", savedMood);

  moodDots.forEach(dot => {
    if (dot.getAttribute("data-set-mood") === savedMood) dot.classList.add("active");
    else dot.classList.remove("active");

    dot.addEventListener("click", () => {
      moodDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      const selectedMood = dot.getAttribute("data-set-mood");
      document.documentElement.setAttribute("data-mood", selectedMood);
      localStorage.setItem("sanvithi_mood", selectedMood);
      fireConfetti();
    });
  });
}

/* Live Dual Clocks (San Francisco & Bangalore) */
function initLiveClocks() {
  const sfEl = document.getElementById("sf-time");
  const blrEl = document.getElementById("blr-time");
  if (!sfEl || !blrEl) return;

  function tick() {
    const now = new Date();
    const sfTime = now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: true });
    const blrTime = now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });

    sfEl.innerText = `SF ${sfTime}`;
    blrEl.innerText = `BLR ${blrTime}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* Bento Hero Showcase Card & Auto-Rotation Engine */
function initHeroTabs() {
  const card = document.getElementById("bento-hero-card");
  const tabBtns = document.querySelectorAll(".hero-num-tab");
  const headline = document.getElementById("hero-dynamic-text");
  const badge = document.getElementById("hero-topic-badge");
  const progressBar = document.getElementById("hero-progress-bar");
  const prevBtn = document.getElementById("hero-prev-btn");
  const nextBtn = document.getElementById("hero-next-btn");

  if (!headline || !tabBtns.length) return;

  let currentIndex = 0;
  const DURATION = 6500; // 6.5 seconds per statement
  let startTime = performance.now();
  let isPaused = false;

  function setPerspective(index, manual = false) {
    currentIndex = (index + HERO_PERSPECTIVES.length) % HERO_PERSPECTIVES.length;
    const current = HERO_PERSPECTIVES[currentIndex];

    // Update active tab buttons
    tabBtns.forEach((btn, i) => {
      btn.classList.toggle("active", i === currentIndex);
    });

    // Update topic badge
    if (badge) {
      badge.className = `hero-topic-pill topic-${current.theme}`;
      badge.innerText = current.label;
    }

    // Animate text update
    headline.style.opacity = "0";
    headline.style.transform = "translateY(6px)";
    setTimeout(() => {
      headline.innerText = current.text;
      headline.style.opacity = "1";
      headline.style.transform = "translateY(0)";
    }, 150);

    // Update progress bar color
    if (progressBar) {
      progressBar.style.backgroundColor = current.color;
      if (manual) {
        startTime = performance.now();
        progressBar.style.width = "0%";
      }
    }
  }

  // Next / Prev button listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setPerspective(currentIndex - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setPerspective(currentIndex + 1, true);
    });
  }

  // Number tabs click
  tabBtns.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setPerspective(i, true);
    });
  });

  // Progress Bar & Auto-Rotate Loop
  function progressLoop(now) {
    if (!isPaused) {
      const elapsed = now - startTime;
      const progress = Math.min(100, (elapsed / DURATION) * 100);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (elapsed >= DURATION) {
        setPerspective(currentIndex + 1, false);
        startTime = performance.now();
      }
    } else {
      // Pause progress
      startTime = now - (parseFloat(progressBar ? progressBar.style.width || 0 : 0) / 100) * DURATION;
    }

    requestAnimationFrame(progressLoop);
  }

  requestAnimationFrame(progressLoop);

  // Pause auto-rotation when user is interacting with card
  if (card) {
    card.addEventListener("mouseenter", () => { isPaused = true; });
    card.addEventListener("mouseleave", () => { isPaused = false; });
    card.addEventListener("touchstart", () => { isPaused = true; }, { passive: true });
    card.addEventListener("touchend", () => {
      setTimeout(() => { isPaused = false; }, 2500);
    }, { passive: true });
  }
}

/* Render Projects Grid with Retro Window OS, HUD Brackets, & Quick-Metrics */
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const countBadge = document.getElementById("work-count-badge");
  if (countBadge) {
    countBadge.textContent = `${String(activeProjects.length).padStart(2, "0")} CASE STUDIES ✦`;
  }

  container.innerHTML = activeProjects.map((project, index) => {
    const numStamp = (index + 1).toString().padStart(2, "0");
    const themeClass = `card-theme-${index % 5}`;
    
    // Status text mapping
    let statusBadge = "FEATURED ✦";
    const tagsLower = (project.tags || []).map(t => t.toLowerCase());
    if (tagsLower.some(t => t.includes("shipped"))) statusBadge = "LIVE SHIPPED 🚀";
    else if (tagsLower.some(t => t.includes("concept"))) statusBadge = "AI CONCEPT ✦";
    else if (tagsLower.some(t => t.includes("prototype"))) statusBadge = "B2B PROTOTYPE 💡";

    return `
    <article class="project-item ${themeClass}" id="${project.id}" onclick="handleCardClick('${project.id}', event)">
      
      <!-- Retro Window Bar -->
      <div class="card-window-bar">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-slug">sanvi.design/case/${project.id}</div>
        <div class="window-status">${statusBadge}</div>
      </div>

      <!-- Card Main Body -->
      <div class="project-card-body">
        <div class="project-number-stamp">#${numStamp}</div>
        
        <!-- Transparent Media Stage -->
        <div class="project-media">
          <img src="${project.image}" alt="${project.title}" class="project-img">
        </div>

        <!-- Project Meta & Information -->
        <div>
          <div class="project-tags">
            ${(project.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join("")}
          </div>
          <h2 class="project-title-large">${project.summary}</h2>

          <button class="btn-read-case" onclick="event.stopPropagation(); handleCardClick('${project.id}', event)">
            <span>explore case study</span>
            <span class="btn-arrow">↗</span>
          </button>
        </div>
      </div>

    </article>
  `;
  }).join("");
}

function handleCardClick(id, event) {
  fireConfetti(event);
  openCaseStudyModal(id);
}

/* 3D Parallax Mouse Tilt Animation with Neubrutalist Hard Shadow */
function init3DParallaxTilt() {
  const cards = document.querySelectorAll(".project-item");
  cards.forEach(card => {
    const img = card.querySelector(".project-img");
    if (!img) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      const shadowX = Math.round(-rotateY * 1.2 + 4);
      const shadowY = Math.round(rotateX * 1.2 + 6);
      
      img.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.05) translateY(-6px)`;
      img.style.boxShadow = `${shadowX}px ${shadowY}px 0px var(--border-color)`;
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)";
      img.style.boxShadow = "var(--shadow-neo-sm)";
    });
  });
}

/* ==========================================================================
   Interactive Screen Mouse Effects:
   1. Stardust & Sparkle Particle Engine (Canvas)
   2. Dual-Layer Neubrutalist Dynamic Cursor & Context Badge
   3. Subtle Magnetic Element Drift
   ========================================================================== */

/* High Performance Neubrutalism Sparkle & Shape Cursor Trail */
function initCursorTrailEngine() {
  const canvas = document.getElementById("cursor-trail-canvas");
  if (!canvas) return;

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouchDevice) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const PALETTE = ["#FFDE59", "#FF90E8", "#70E000", "#4CC9F0", "#FF914D", "#FFFFFF"];
  const SHAPES = ["star", "cross", "diamond", "dot"];

  let lastX = -100;
  let lastY = -100;
  let lastTime = performance.now();

  function spawnParticle(x, y, burst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.3;
    const size = burst ? Math.random() * 12 + 8 : Math.random() * 9 + 6;
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (burst ? 0.4 : 0.7), // gentle float upwards
      size,
      initialSize: size,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      alpha: 1,
      decay: burst ? Math.random() * 0.025 + 0.02 : Math.random() * 0.035 + 0.025
    });
  }

  // Draw 4-point sparkle star (Neubrutalism ✦)
  function drawSparkleStar(c, size) {
    c.beginPath();
    const half = size / 2;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const x1 = Math.cos(a) * half;
      const y1 = Math.sin(a) * half;
      const aNext = a + Math.PI / 4;
      const x2 = Math.cos(aNext) * (half * 0.28);
      const y2 = Math.sin(aNext) * (half * 0.28);
      if (i === 0) c.moveTo(x1, y1);
      else c.lineTo(x1, y1);
      c.lineTo(x2, y2);
    }
    c.closePath();
    c.fill();
    c.lineWidth = 1;
    c.strokeStyle = "#000000";
    c.stroke();
  }

  // Draw retro cross (+)
  function drawCross(c, size) {
    const w = size * 0.25;
    const h = size;
    c.fillRect(-w / 2, -h / 2, w, h);
    c.fillRect(-h / 2, -w / 2, h, w);
    c.lineWidth = 1;
    c.strokeStyle = "#000000";
    c.strokeRect(-w / 2, -h / 2, w, h);
    c.strokeRect(-h / 2, -w / 2, h, w);
  }

  // Draw diamond (◆)
  function drawDiamond(c, size) {
    c.beginPath();
    c.moveTo(0, -size / 2);
    c.lineTo(size / 2, 0);
    c.lineTo(0, size / 2);
    c.lineTo(-size / 2, 0);
    c.closePath();
    c.fill();
    c.lineWidth = 1;
    c.strokeStyle = "#000000";
    c.stroke();
  }

  // Mouse move event
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const dist = Math.hypot(x - lastX, y - lastY);
    const now = performance.now();
    const dt = now - lastTime || 16;
    const speed = dist / dt;

    if (dist > 8) {
      const count = Math.min(3, Math.floor(dist / 15) + 1);
      for (let i = 0; i < count; i++) {
        const factor = i / count;
        spawnParticle(lastX + (x - lastX) * factor, lastY + (y - lastY) * factor, speed > 1.2);
      }
      lastX = x;
      lastY = y;
      lastTime = now;
    }
  });

  // Burst on click
  document.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
      spawnParticle(e.clientX, e.clientY, true);
    }
  });

  // Render loop
  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.alpha -= p.decay;
      p.size = Math.max(0, p.initialSize * p.alpha);

      if (p.alpha <= 0 || p.size <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (p.shape === "star") {
        drawSparkleStar(ctx, p.size);
      } else if (p.shape === "cross") {
        drawCross(ctx, p.size);
      } else if (p.shape === "diamond") {
        drawDiamond(ctx, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
      }

      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* Dual-Layer Neubrutalist Dynamic Cursor & Context-Aware Floating Badge */
function initCustomCursorAndBadge() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const badge = document.getElementById("floating-badge");
  if (!dot || !ring || !badge) return;

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouchDevice) {
    dot.style.display = "none";
    ring.style.display = "none";
    badge.style.display = "none";
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let badgeX = -100, badgeY = -100;
  let idleTimer = null;

  function showCursor() {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  }

  function hideCursor() {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
    badge.classList.remove("visible");
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot movement
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    // Ensure cursor is always visible when moving inside the window
    showCursor();

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!badge.classList.contains("explore") && !badge.classList.contains("pop")) {
        badge.classList.remove("visible");
      }
    }, 1800);
  });

  document.addEventListener("mouseenter", showCursor);

  document.addEventListener("mouseleave", hideCursor);

  // Restore cursor when switching back to this tab
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hideCursor();
    }
  });

  window.addEventListener("blur", hideCursor);

  window.addEventListener("focus", () => {
    // When window re-gains focus, cursor will show as soon as user moves mouse
  });

  document.addEventListener("mousedown", () => {
    ring.classList.add("clicking");
  });

  document.addEventListener("mouseup", () => {
    ring.classList.remove("clicking");
  });

  // Smooth spring lerp loop for outer ring and floating badge
  function animLoop() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    badgeX += (mouseX - badgeX) * 0.16;
    badgeY += (mouseY - badgeY) * 0.16;
    badge.style.transform = `translate(${badgeX + 18}px, ${badgeY + 18}px)`;

    requestAnimationFrame(animLoop);
  }
  requestAnimationFrame(animLoop);

  // Context-aware hover detector
  document.addEventListener("mouseover", (e) => {
    const projectCard = e.target.closest(".project-item");
    const rotatingBadge = e.target.closest(".hero-rotating-badge");
    const themeBtn = e.target.closest("#theme-toggle");
    const sayHiBtn = e.target.closest(".btn-say-hi, a[href='#resume']");
    const heroTab = e.target.closest(".hero-tab-btn, .hero-num-tab, .hero-arrow-btn");
    const moodDot = e.target.closest(".mood-dot");
    const generalInteractive = e.target.closest("button, a, input, textarea, .nav-brand");

    if (projectCard) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible explore";
      badge.innerHTML = "EXPLORE CASE ↗";
    } else if (rotatingBadge) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible pop";
      badge.innerHTML = "POP CONFETTI! ✦";
    } else if (themeBtn) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible";
      badge.innerHTML = "SWITCH THEME ☼";
    } else if (sayHiBtn) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible interactive";
      badge.innerHTML = "SAY HELLO ✉";
    } else if (heroTab) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible interactive";
      badge.innerHTML = "CLICK TO READ ✦";
    } else if (moodDot) {
      ring.classList.add("active-hover");
      badge.className = "floating-cursor-badge visible";
      badge.innerHTML = "CHANGE MOOD 🎨";
    } else if (generalInteractive) {
      ring.classList.add("active-hover");
      badge.classList.remove("visible");
    } else {
      ring.classList.remove("active-hover");
      badge.classList.remove("visible", "explore", "pop", "interactive");
    }
  });
}

/* Subtle Magnetic Float on Key Neubrutalist Elements */
function initMagneticElements() {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouchDevice) return;

  const magnets = document.querySelectorAll(".hero-rotating-badge, .btn-say-hi");
  magnets.forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* Compose starter rich doc layout if project has no custom content yet */
function getStarterDocContent(p) {
  const firstTag = (p.tags && p.tags[0]) || 'CASE STUDY ✦';
  return `
    <div class="doc-callout">
      <span class="doc-badge">${firstTag}</span>
      <h1 style="margin: 12px 0 8px; font-size: 28px; line-height: 1.2;">${p.title}</h1>
      <p style="margin: 0; font-size: 16px; color: var(--text-muted);">${p.summary || ''}</p>
    </div>

    ${p.image ? `
      <div class="doc-img-block">
        <img src="${p.image}" alt="${p.title}" class="doc-img" style="width: 100%;">
        <div class="doc-caption">Visual Showcase ∙ ${p.client || 'Project'}</div>
      </div>
    ` : ''}

    <div class="doc-grid-2">
      <div class="doc-grid-col">
        <h3>The Challenge</h3>
        <p>${p.challenge || p.overview || 'Mô tả thách thức và bối cảnh dự án...'}</p>
      </div>
      <div class="doc-grid-col">
        <h3>The Solution & Impact</h3>
        <p>${p.solution || 'Chi tiết các giải pháp thiết kế và tác động đạt được...'}</p>
      </div>
    </div>
  `;
}

/* Modal Case Study - 100% Free-Form Custom Doc Canvas */
function openCaseStudyModal(id) {
  const p = activeProjects.find(item => item.id === id) || PROJECTS_DATA.find(item => item.id === id);
  if (!p) return;

  const modal = document.getElementById("case-study-modal");
  const content = document.getElementById("modal-content-target");

  const docHtml = (p.content && p.content.trim()) ? p.content : getStarterDocContent(p);

  content.innerHTML = `
    <div class="case-study-doc-content">
      ${docHtml}
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  fireConfetti();
}

function initModalEvents() {
  const modal = document.getElementById("case-study-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modal && modal.classList.contains("active")) closeModal();
      closeContactModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById("case-study-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* ==========================================================================
   Contact / Say Hi Popup Modal & Email Submission Engine
   ========================================================================== */
function openContactModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById("contact-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  const nameInput = document.getElementById("contact-name");
  const msgInput = document.getElementById("contact-message");
  const gmailLink = document.getElementById("contact-direct-gmail");

  function updateGmailLink() {
    if (!gmailLink) return;
    const n = nameInput ? nameInput.value.trim() : "";
    const m = msgInput ? msgInput.value.trim() : "";
    const subject = encodeURIComponent(n ? `[Portfolio] Tin nhắn từ ${n}` : "[Portfolio] Liên hệ công việc");
    const body = encodeURIComponent(m ? `${m}\n\n---\nNgười gửi: ${n}` : "");
    gmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=thanhieu.work@gmail.com&su=${subject}&body=${body}`;
  }

  if (nameInput) {
    nameInput.addEventListener("input", updateGmailLink);
    setTimeout(() => nameInput.focus(), 150);
  }
  if (msgInput) {
    msgInput.addEventListener("input", updateGmailLink);
  }
  updateGmailLink();
}

function closeContactModal() {
  const modal = document.getElementById("contact-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleContactOverlayClick(event) {
  if (event.target && event.target.id === "contact-modal") {
    closeContactModal();
  }
}

// Cấu hình Web3Forms Access Key cho Thân Hiếu (thanhieu.work@gmail.com)
const WEB3FORMS_ACCESS_KEY = "4fb69466-138c-47ff-9493-df5b10220ffb";

async function handleContactSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const msgInput = document.getElementById("contact-message");
  const submitBtn = document.getElementById("contact-submit-btn");
  const submitText = document.getElementById("submit-text");
  const statusEl = document.getElementById("contact-status");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const message = msgInput ? msgInput.value.trim() : "";

  if (!name || !email || !message) return;

  submitBtn.disabled = true;
  submitText.innerText = "Đang gửi...";
  statusEl.className = "contact-status-msg hidden";

  try {
    // Nếu chưa cấu hình Access Key, tự động mở soạn thảo Gmail với đầy đủ nội dung điền sẵn
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=thanhieu.work@gmail.com&su=${encodeURIComponent(`[Portfolio] Tin nhắn từ ${name}`)}&body=${encodeURIComponent(`${message}\n\n---\nNgười gửi: ${name}\nEmail: ${email}`)}`;
      window.open(gmailUrl, "_blank");
      
      statusEl.className = "contact-status-msg success";
      statusEl.innerHTML = `📬 Đã mở khung soạn thư Gmail gửi tới <strong>thanhieu.work@gmail.com</strong>! Bạn chỉ cần nhấn nút Gửi (Send) trên Gmail là xong.<br><small style="color:#222; font-size:11px; display:inline-block; margin-top:6px;">✦ Tip: Chỉ cần dán Access Key từ Web3Forms vào script.js để kích hoạt gửi ngầm 100%.</small>`;
      statusEl.classList.remove("hidden");
      document.getElementById("contact-form").reset();
      fireConfetti(event);
      return;
    }

    // Gửi ngầm qua API Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name,
        email: email,
        message: message,
        from_name: `${name} (Portfolio)`,
        subject: `[Portfolio] Tin nhắn mới từ ${name}`
      })
    });

    const data = await response.json();
    if (data.success) {
      statusEl.className = "contact-status-msg success";
      statusEl.innerHTML = "🎉 Cảm ơn bạn! Tin nhắn đã được gửi trực tiếp đến hộp thư thanhieu.work@gmail.com của Thân Hiếu. Mình sẽ phản hồi bạn sớm nhất!";
      statusEl.classList.remove("hidden");
      document.getElementById("contact-form").reset();
      fireConfetti(event);
      setTimeout(() => {
        closeContactModal();
        statusEl.classList.add("hidden");
      }, 4500);
    } else {
      throw new Error(data.message || "Gửi không thành công");
    }
  } catch (error) {
    statusEl.className = "contact-status-msg warning";
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=thanhieu.work@gmail.com&su=${encodeURIComponent(`[Portfolio] Tin nhắn từ ${name}`)}&body=${encodeURIComponent(`${message}\n\n---\nNgười gửi: ${name}\nEmail: ${email}`)}`;
    statusEl.innerHTML = `⚠️ Đang tạm ngưng kết nối nền. <a href="${mailtoUrl}" target="_blank" style="text-decoration:underline; font-weight:800; color:#000;">Bấm vào đây để mở và gửi ngay qua Gmail của bạn ↗</a>`;
    statusEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitText.innerText = "Gửi tin nhắn ✦";
  }
}

/* Copy Email Toast with Confetti Burst */
function copyEmailToast(event) {
  const email = "thanhieu.work@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`email copied: ${email} ✦`);
    fireConfetti(event);
  }).catch(() => {
    showToast(`email: ${email} ✦`);
    fireConfetti(event);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

/* ==========================================================================
   Lightweight Neubrutalist Confetti Engine (Zero Dependencies)
   ========================================================================== */
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimationId = null;

function initConfettiEngine() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  confettiCtx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
}

function fireConfetti(event = null) {
  if (!confettiCtx) return;
  const colors = ["#FFDE59", "#FF90E8", "#70E000", "#4CC9F0", "#FF914D", "#FFFFFF", "#000000"];
  const startX = event && event.clientX ? event.clientX : window.innerWidth / 2;
  const startY = event && event.clientY ? event.clientY : window.innerHeight * 0.4;

  const count = 55;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 5 + Math.random() * 9;
    confettiParticles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 3,
      size: 7 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      alpha: 1,
      decay: 0.015 + Math.random() * 0.02
    });
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas || !confettiCtx) return;

  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // gravity
    p.vx *= 0.98; // air resistance
    p.rotation += p.vRot;
    p.alpha -= p.decay;

    if (p.alpha <= 0 || p.y > canvas.height) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.globalAlpha = p.alpha;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.strokeStyle = "#000000";
    confettiCtx.lineWidth = 1.5;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimationId = null;
    confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
