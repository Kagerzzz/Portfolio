const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'tasksync');
const TEMP_DIR = path.resolve(__dirname, 'temp_html_v2');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Common Design System CSS matching forget-pw-1, 2, 3, 4, 5, 6
function getCommonCSS() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body {
      width: 375px;
      height: 812px;
      background: #F8F9FD;
      color: #222B45;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    /* Standard iOS Top Status Bar */
    .status-bar {
      height: 44px;
      padding: 12px 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      color: #222B45;
      z-index: 50;
      flex-shrink: 0;
    }
    .status-bar.white-text { color: #FFFFFF !important; }
    .status-bar.white-text svg path,
    .status-bar.white-text svg rect { fill: #FFFFFF !important; stroke: #FFFFFF !important; }
    .status-icons { display: flex; align-items: center; gap: 6px; }

    /* iPhone Bottom Home Indicator */
    .home-indicator {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 134px;
      height: 4px;
      background: #222B45;
      border-radius: 2px;
      z-index: 60;
    }
    .home-indicator.white-bar { background: #FFFFFF !important; }

    /* Top Navigation Header - Type A (Back Arrow + Left Aligned Title) */
    .nav-header {
      height: 52px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FFFFFF;
      flex-shrink: 0;
      border-bottom: 1px solid #EDF1F7;
    }
    .nav-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .back-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }
    .nav-title {
      font-size: 20px;
      font-weight: 700;
      color: #222B45;
      letter-spacing: -0.2px;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 14px;
      color: #8F9CAE;
    }

    /* Tab Switcher Strip (Like forget-pw-4 & forget-pw-2) */
    .tab-strip {
      height: 44px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      border-bottom: 1px solid #EDF1F7;
      flex-shrink: 0;
    }
    .tab-item {
      padding: 10px 12px;
      font-size: 14px;
      font-weight: 500;
      color: #8F9CAE;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
    }
    .tab-item.active {
      color: #3E79F7;
      font-weight: 600;
      border-bottom: 2px solid #3E79F7;
    }
    .tab-right-dropdown {
      margin-left: auto;
      font-size: 13px;
      font-weight: 500;
      color: #3E79F7;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Screen Content Scroll Area */
    .content-area {
      flex: 1;
      padding: 16px;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* TaskSync Standard Cards with Bottom Border */
    .task-card {
      background: #FFFFFF;
      border-radius: 12px;
      padding: 14px 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid #F1F3F9;
    }
    .task-card.border-blue { border-bottom: 2.5px solid #4E6AF3; }
    .task-card.border-orange { border-bottom: 2.5px solid #FF8A00; }
    .task-card.border-green { border-bottom: 2.5px solid #00BA88; }
    .task-card.border-purple { border-bottom: 2.5px solid #7B2CBF; }

    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: #222B45;
      line-height: 1.3;
    }
    .card-desc {
      font-size: 12px;
      color: #8F9CAE;
      line-height: 1.4;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
      padding-top: 8px;
      border-top: 1px solid #F7F9FC;
    }
    .card-time {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #8F9CAE;
    }

    /* Badges matching forget-pw-4 */
    .badge-progress {
      background: #4E6AF3;
      color: #FFFFFF;
      border-radius: 14px;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-todo {
      background: #FF8A00;
      color: #FFFFFF;
      border-radius: 14px;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-done {
      background: #00BA88;
      color: #FFFFFF;
      border-radius: 14px;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-system {
      background: #EDF3FF;
      color: #3E79F7;
      border-radius: 6px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
    }

    /* Floating Navigation Bar (Identical to forget-pw-1, 2, 6) */
    .floating-bottom-nav {
      position: absolute;
      bottom: 14px;
      left: 16px;
      right: 16px;
      height: 62px;
      background: #FFFFFF;
      border-radius: 36px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 50;
      border: 1px solid #EDF1F7;
    }
    .nav-tab-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      color: #8F9CAE;
      font-size: 10.5px;
      font-weight: 500;
      text-decoration: none;
    }
    .nav-tab-btn.active {
      color: #3E79F7;
      font-weight: 600;
    }

    /* Floating Action Button (+) */
    .fab-btn {
      position: absolute;
      right: 20px;
      bottom: 86px;
      width: 48px;
      height: 48px;
      border-radius: 24px;
      background: #4E6AF3;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 18px rgba(78, 106, 243, 0.4);
      z-index: 45;
      font-size: 26px;
      cursor: pointer;
    }
  `;
}

// 1. Calendar Screen (Matching forget-pw-4 layout & Bottom Bar)
function getCalendarHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.calendar-week-strip {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 14px;
  background: #FFFFFF;
  border-bottom: 1px solid #EDF1F7;
}
.cal-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 42px;
  padding: 6px 0;
  border-radius: 10px;
}
.cal-col.active {
  background: #4E6AF3;
  color: #FFFFFF !important;
}
.cal-day-name { font-size: 11px; font-weight: 500; color: #8F9CAE; }
.cal-day-num { font-size: 16px; font-weight: 700; color: #222B45; }
.cal-col.active .cal-day-name,
.cal-col.active .cal-day-num { color: #FFFFFF !important; }
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; background: #FF9F1C;">
        <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="nav-title">Calendar</div>
    </div>
    <div class="nav-actions">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
    <div class="tab-item active">All</div>
    <div class="tab-item">Schedule</div>
    <div class="tab-item">Meetings</div>
    <div class="tab-item">Deadlines</div>
    <div class="tab-right-dropdown">October ▾</div>
  </div>

  <!-- Weekly Strip matching forget-pw-4 -->
  <div class="calendar-week-strip">
    <div class="cal-col"><span class="cal-day-name">Thu</span><span class="cal-day-num">26</span></div>
    <div class="cal-col"><span class="cal-day-name">Fri</span><span class="cal-day-num">27</span></div>
    <div class="cal-col"><span class="cal-day-name">Sat</span><span class="cal-day-num">28</span></div>
    <div class="cal-col"><span class="cal-day-name">Sun</span><span class="cal-day-num">29</span></div>
    <div class="cal-col active"><span class="cal-day-name">Mon</span><span class="cal-day-num">30</span></div>
    <div class="cal-col"><span class="cal-day-name">Tue</span><span class="cal-day-num">31</span></div>
  </div>

  <div class="content-area">
    <div class="task-card border-blue">
      <div class="card-title">Meeting with team</div>
      <div class="card-desc">Meeting to discuss business development and personnel sprint scope...</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          10:00 - 14:00
        </div>
        <span class="badge-progress">On Progress</span>
      </div>
    </div>

    <div class="task-card border-orange">
      <div class="card-title">Design Sprint: UI Kit Review</div>
      <div class="card-desc">Sync with Linh Pham on component tokens, biometric states and dark mode.</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          14:30 - 16:00
        </div>
        <span class="badge-todo">To-do</span>
      </div>
    </div>

    <div class="task-card border-green">
      <div class="card-title">Client Demo — Partner Handover</div>
      <div class="card-desc">Demonstrate final clickable prototype with enterprise stakeholders on Meet.</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          16:30 - 17:30
        </div>
        <span class="badge-done">Done</span>
      </div>
    </div>
  </div>

  <div class="fab-btn">+</div>

  <div class="floating-bottom-nav">
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Home
    </div>
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Mail box
    </div>
    <div class="nav-tab-btn active">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Calendar
    </div>
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Setting
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 2. Direct Chat & Team Conversation (Clean White & Native TaskSync style)
function getChatHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.chat-body {
  flex: 1;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: hidden;
}
.chat-date-pill {
  align-self: center;
  background: #EDF1F7;
  color: #8F9CAE;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
}
.msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}
.msg-row.outgoing {
  justify-content: flex-end;
}
.chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.bubble {
  max-width: 250px;
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.45;
}
.bubble.incoming {
  background: #FFFFFF;
  color: #222B45;
  border-radius: 16px 16px 16px 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  border: 1px solid #EDF1F7;
}
.bubble.outgoing {
  background: #4E6AF3;
  color: #FFFFFF;
  border-radius: 16px 16px 4px 16px;
}
.audio-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #EDF1F7;
  border-radius: 16px 16px 16px 4px;
  padding: 10px 14px;
  width: 220px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}
.play-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4E6AF3;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}
.wave-bars {
  display: flex;
  align-items: center;
  gap: 2.5px;
  flex: 1;
  height: 20px;
}
.wave-bar {
  width: 3px;
  background: #4E6AF3;
  border-radius: 2px;
}
.figma-attachment {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #EDF1F7;
  border-radius: 12px;
  padding: 10px 12px;
  width: 240px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.figma-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #7B2CBF;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
.chat-input-bar {
  height: 64px;
  background: #FFFFFF;
  border-top: 1px solid #EDF1F7;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.input-field {
  flex: 1;
  height: 40px;
  background: #F8F9FD;
  border: 1px solid #EDF1F7;
  border-radius: 20px;
  padding: 0 14px;
  font-size: 13px;
  color: #222B45;
  display: flex;
  align-items: center;
}
.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #4E6AF3;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div style="display:flex; align-items:center; gap:8px;">
        <div style="width:34px; height:34px; border-radius:50%; overflow:hidden; position:relative;">
          <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avatar-thanhieu.jpg" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; bottom:1px; right:1px; width:8px; height:8px; border-radius:50%; background:#00BA88; border:1.5px solid #fff;"></div>
        </div>
        <div>
          <div style="font-size:15px; font-weight:700; color:#222B45;">Linh Phạm</div>
          <div style="font-size:11px; color:#00BA88; font-weight:500;">Online ∙ Product Designer</div>
        </div>
      </div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E79F7" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E79F7" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    </div>
  </div>

  <div class="chat-body">
    <div class="chat-date-pill">Today, 10:24 AM</div>

    <div class="msg-row">
      <div class="chat-avatar">
        <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avatar-thanhieu.jpg" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="bubble incoming">
        Hi Alex! I've updated the TaskSync mobile design system tokens and biometric auth screens.
      </div>
    </div>

    <div class="msg-row outgoing">
      <div class="bubble outgoing">
        Awesome Linh! Can you share the latest Figma file and component specs?
      </div>
    </div>

    <div class="msg-row">
      <div class="chat-avatar">
        <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avatar-thanhieu.jpg" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="audio-card">
        <div class="play-btn">▶</div>
        <div class="wave-bars">
          <div class="wave-bar" style="height:8px;"></div>
          <div class="wave-bar" style="height:16px;"></div>
          <div class="wave-bar" style="height:12px;"></div>
          <div class="wave-bar" style="height:18px;"></div>
          <div class="wave-bar" style="height:6px;"></div>
          <div class="wave-bar" style="height:14px;"></div>
          <div class="wave-bar" style="height:10px;"></div>
        </div>
        <span style="font-size:11px; font-weight:600; color:#8F9CAE;">0:28</span>
      </div>
    </div>

    <div class="msg-row outgoing">
      <div class="figma-attachment">
        <div class="figma-icon">FIG</div>
        <div style="flex:1;">
          <div style="font-size:12px; font-weight:700; color:#222B45;">TaskSync_DesignSystem_v2.4.fig</div>
          <div style="font-size:10px; color:#8F9CAE;">14.2 MB ∙ Figma File</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E79F7" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </div>
    </div>
  </div>

  <div class="chat-input-bar">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
    <div class="input-field">Type a message...</div>
    <div class="send-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 3. HD Video Conferencing Screen
function getVideoHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #0E131F !important; color: #FFFFFF !important; }
.video-header {
  height: 52px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.video-grid {
  flex: 1;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}
.video-cell {
  position: relative;
  background: #1B2234;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-cell.active-speaker {
  border: 2px solid #4E6AF3;
  box-shadow: 0 0 16px rgba(78, 106, 243, 0.4);
}
.cell-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #FFFFFF;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}
.video-controls {
  height: 78px;
  padding: 10px 20px 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #151C2C;
  border-radius: 24px 24px 0 0;
}
.ctrl-btn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #252F48;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}
.ctrl-btn.end {
  background: #FF3B30;
}
</style>
</head>
<body>
  <div class="status-bar white-text">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#FFFFFF"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#FFFFFF"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#FFFFFF"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#FFFFFF"/><path d="M20 3.5V7.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="video-header">
    <button class="back-btn" style="color:#FFFFFF;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    </button>
    <div>
      <div style="font-size:14px; font-weight:700; text-align:center;">Sprint 42: UI Kit Review</div>
      <div style="font-size:11px; color:#8F9CAE; text-align:center;">00:24:18 ∙ <span style="color:#FF3B30;">● REC</span></div>
    </div>
    <div style="width:22px;"></div>
  </div>

  <div class="video-grid">
    <div class="video-cell active-speaker">
      <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
      <div class="cell-badge"><span>🎙️</span> Alex Smith (Host)</div>
    </div>
    <div class="video-cell">
      <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avatar-thanhieu.jpg" style="width:100%; height:100%; object-fit:cover;">
      <div class="cell-badge">Linh Phạm</div>
    </div>
    <div class="video-cell">
      <div style="width:54px; height:54px; border-radius:50%; background:#FF9F1C; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700;">SJ</div>
      <div class="cell-badge">Sarah Jenkins</div>
    </div>
    <div class="video-cell" style="background:#1E293B;">
      <div style="font-size:28px;">📊</div>
      <div style="font-size:11px; color:#C5CEE0; margin-top:4px;">Screen Sharing</div>
      <div class="cell-badge">Figma Workspace</div>
    </div>
  </div>

  <div class="video-controls">
    <div class="ctrl-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
    </div>
    <div class="ctrl-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    </div>
    <div class="ctrl-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <div class="ctrl-btn end">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/></svg>
    </div>
  </div>
  <div class="home-indicator white-bar"></div>
</body>
</html>`;
}

// 4. Collaborative Cloud Docs Screen
function getDocsHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.doc-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #EDF1F7;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.doc-meta { font-size: 11px; color: #8F9CAE; display: flex; align-items: center; gap: 8px; }
.doc-h1 { font-size: 18px; font-weight: 700; color: #222B45; line-height: 1.3; }
.doc-p { font-size: 13px; color: #222B45; line-height: 1.6; }
.cursor-pill {
  display: inline-flex;
  align-items: center;
  background: #FF8A00;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  vertical-align: middle;
  margin-left: 2px;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #222B45;
  padding: 4px 0;
}
.check-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #00BA88;
  background: #00BA88;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}
.check-box.empty {
  background: #fff;
  border-color: #8F9CAE;
}
.doc-callout {
  background: #EDF3FF;
  border-left: 3px solid #3E79F7;
  padding: 8px 12px;
  border-radius: 0 8px 8px 0;
  font-size: 12px;
  color: #3E79F7;
}
.format-bar {
  height: 50px;
  background: #FFFFFF;
  border-top: 1px solid #EDF1F7;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 700;
  color: #8F9CAE;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Cloud Docs</div>
    </div>
    <div class="nav-actions">
      <div style="display:flex; margin-right:4px;">
        <div style="width:24px; height:24px; border-radius:50%; background:#4E6AF3; color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; border:1.5px solid #fff;">AS</div>
        <div style="width:24px; height:24px; border-radius:50%; background:#00BA88; color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; border:1.5px solid #fff; margin-left:-6px;">LP</div>
      </div>
      <span class="badge-system">Share</span>
    </div>
  </div>

  <div class="content-area">
    <div class="doc-card">
      <div class="doc-meta">
        <span>Workspace ➔ Design System</span>
        <span>•</span>
        <span>v2.4 Edited just now</span>
      </div>

      <div class="doc-h1">TaskSync Mobile Specs &amp; Token Architecture</div>

      <div class="doc-p">
        All interactive cards utilize an 8px progressive grid system with rounded 12px corners<span class="cursor-pill">Linh Phạm</span> to maintain consistency across iOS and Android platforms.
      </div>

      <div style="display:flex; flex-direction:column; gap:4px; margin:4px 0;">
        <div class="check-item"><div class="check-box">✓</div><span>Define 8 core module squircle colors</span></div>
        <div class="check-item"><div class="check-box">✓</div><span>Standardize bottom accent borders</span></div>
        <div class="check-item"><div class="check-box empty"></div><span style="color:#8F9CAE;">Sync tokens with engineering team</span></div>
      </div>

      <div class="doc-callout">
        💡 Note: All cards conform strictly to TaskSync native ergonomics.
      </div>
    </div>
  </div>

  <div class="format-bar">
    <span>B</span>
    <span>I</span>
    <span>U</span>
    <span>H1</span>
    <span>☑️</span>
    <span>🔗</span>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 5. Deep Task Detail Screen (Matching forget-pw-4 & forget-pw-5 row style)
function getTaskDetailHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #EDF1F7;
}
.row-left { display: flex; align-items: center; gap: 10px; }
.row-label { font-size: 11px; color: #8F9CAE; }
.row-val { font-size: 13.5px; font-weight: 600; color: #222B45; }
.action-submit-btn {
  height: 48px;
  background: #4E6AF3;
  color: #FFFFFF;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(78, 106, 243, 0.35);
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Task Detail</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </div>
  </div>

  <div class="content-area">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span class="badge-system" style="font-size:12px;">#TASK-1042</span>
      <span class="badge-progress">On Progress</span>
    </div>

    <div style="font-size:18px; font-weight:700; color:#222B45; line-height:1.3;">
      Revamp Mobile Onboarding &amp; Biometrics Flow
    </div>

    <!-- Details Card -->
    <div class="task-card" style="padding:10px 16px;">
      <div class="row-item">
        <div class="row-left">
          <div style="width:28px; height:28px; border-radius:50%; background:#4E6AF3; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700;">AS</div>
          <div>
            <div class="row-label">Assignee</div>
            <div class="row-val">Alex Smith</div>
          </div>
        </div>
        <span style="color:#8F9CAE;">›</span>
      </div>

      <div class="row-item">
        <div class="row-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E79F7" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <div>
            <div class="row-label">Due Date</div>
            <div class="row-val" style="color:#FF3B30;">Tomorrow, 18:00 (18 Oct)</div>
          </div>
        </div>
        <span style="color:#8F9CAE;">›</span>
      </div>

      <div class="row-item" style="border-bottom:none;">
        <div class="row-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div>
            <div class="row-label">Logged Hours</div>
            <div class="row-val">04h 30m of 06h 00m</div>
          </div>
        </div>
        <span class="badge-todo">75%</span>
      </div>
    </div>

    <!-- Subtasks Checklist Card -->
    <div class="task-card border-blue">
      <div style="font-size:14px; font-weight:700; color:#222B45; margin-bottom:4px;">Subtasks (3 of 4 Done)</div>
      
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; text-decoration:line-through; color:#8F9CAE;">
          <div style="width:16px; height:16px; border-radius:4px; background:#00BA88; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;">✓</div>
          Competitor benchmark teardown
        </div>
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; text-decoration:line-through; color:#8F9CAE;">
          <div style="width:16px; height:16px; border-radius:4px; background:#00BA88; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;">✓</div>
          Wireframe FaceID &amp; OTP fallbacks
        </div>
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; text-decoration:line-through; color:#8F9CAE;">
          <div style="width:16px; height:16px; border-radius:4px; background:#00BA88; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px;">✓</div>
          High-fidelity components in Figma
        </div>
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:#222B45;">
          <div style="width:16px; height:16px; border-radius:4px; border:1.5px solid #8F9CAE;"></div>
          Interactive prototype &amp; user test
        </div>
      </div>
    </div>

    <button class="action-submit-btn">Mark Task as Completed</button>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 6. Submit Request Screen (Matching forget-pw-5 styling)
function getRequestHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.form-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #EDF1F7;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
}
.input-box {
  background: #F8F9FD;
  border: 1px solid #EDF1F7;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13.5px;
  color: #222B45;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.route-step {
  display: flex;
  align-items: center;
  gap: 10px;
}
.route-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4E6AF3;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Create Request</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <div class="tab-item active">Leave Request</div>
    <div class="tab-item">Overtime (OT)</div>
    <div class="tab-item">Expense</div>
    <div class="tab-item">Device</div>
  </div>

  <div class="content-area">
    <div class="form-card">
      <div>
        <div style="font-size:12px; font-weight:600; color:#8F9CAE; margin-bottom:6px;">REQUEST TYPE</div>
        <div class="input-box">
          <span style="font-weight:600;">Annual Paid Leave (AL)</span>
          <span class="badge-done">12.5 days left</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div>
          <div style="font-size:11px; color:#8F9CAE; margin-bottom:4px;">FROM</div>
          <div class="input-box"><span>Oct 15, 2026</span> 📅</div>
        </div>
        <div>
          <div style="font-size:11px; color:#8F9CAE; margin-bottom:4px;">TO</div>
          <div class="input-box"><span>Oct 16, 2026</span> 📅</div>
        </div>
      </div>

      <div style="background:#EDF3FF; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; font-weight:600; color:#3E79F7;">Total Deducted:</span>
        <span class="badge-progress">2 Working Days</span>
      </div>

      <div>
        <div style="font-size:12px; font-weight:600; color:#8F9CAE; margin-bottom:6px;">REASON</div>
        <div class="input-box" style="height:50px; align-items:flex-start;">
          <span style="color:#222B45; font-size:12px;">Personal family errands. Sprint tasks handed over to Linh Pham.</span>
        </div>
      </div>
    </div>

    <!-- Approval Route -->
    <div class="task-card">
      <div style="font-size:13px; font-weight:700; color:#222B45; margin-bottom:4px;">Approval Route</div>
      <div class="route-step">
        <div class="route-num">1</div>
        <div>
          <div style="font-size:13px; font-weight:600; color:#222B45;">Sarah Jenkins</div>
          <div style="font-size:11px; color:#00BA88;">Team Lead ∙ Pending Approval</div>
        </div>
      </div>
      <div style="width:2px; height:12px; background:#EDF1F7; margin-left:11px;"></div>
      <div class="route-step">
        <div class="route-num" style="background:#C5CEE0;">2</div>
        <div>
          <div style="font-size:13px; font-weight:600; color:#8F9CAE;">Michael Vance</div>
          <div style="font-size:11px; color:#8F9CAE;">Head of Human Resources</div>
        </div>
      </div>
    </div>

    <button style="height:48px; background:#4E6AF3; color:#fff; border-radius:12px; font-size:15px; font-weight:600; border:none; cursor:pointer; box-shadow:0 4px 14px rgba(78,106,243,0.35);">Submit Request</button>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 7. Salary & Payroll Hub Screen (Matching Attendance Hero & Stats in forget-pw-3)
function getSalaryHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.salary-hero-card {
  background: linear-gradient(135deg, #4D5BF9 0%, #3A8EF6 100%);
  border-radius: 16px;
  color: #FFFFFF;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 8px 24px rgba(62, 121, 247, 0.28);
}
.stat-3-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.stat-box {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  border: 1px solid #EDF1F7;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.salary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #EDF1F7;
  font-size: 13px;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Salary &amp; Payroll</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </div>
  </div>

  <div class="content-area">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:12px; font-weight:600; color:#8F9CAE;">CYCLE</span>
      <span class="badge-system">September 2026 ▾</span>
    </div>

    <!-- Salary Hero Card (Gradient matching Attendance) -->
    <div class="salary-hero-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; opacity:0.85;">Net Disbursed Salary</span>
        <span style="background:rgba(255,255,255,0.25); color:#fff; font-size:11px; font-weight:600; padding:2px 8px; border-radius:10px;">● PAID</span>
      </div>
      <div style="font-size:34px; font-weight:800; letter-spacing:-0.5px;">$4,850.00</div>
      <div style="font-size:11px; opacity:0.85; border-top:1px solid rgba(255,255,255,0.2); padding-top:6px; margin-top:2px;">
        Transferred to Chase Bank (••4921) ∙ Sep 30, 2026
      </div>
    </div>

    <!-- Stat 3 Grid matching forget-pw-3 -->
    <div class="stat-3-grid">
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#00BA88;">22 / 22</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Days Present</div>
      </div>
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#3E79F7;">8.5 hrs</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Overtime Log</div>
      </div>
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#FF8A00;">100%</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Punctuality</div>
      </div>
    </div>

    <!-- Breakdown Details -->
    <div class="task-card">
      <div style="font-size:13px; font-weight:700; color:#222B45; margin-bottom:4px;">Earnings &amp; Deductions</div>
      
      <div class="salary-row">
        <span style="color:#8F9CAE;">Base Monthly Salary</span>
        <span style="font-weight:700; color:#222B45;">$4,200.00</span>
      </div>
      <div class="salary-row">
        <span style="color:#8F9CAE;">Sprint Performance Incentive</span>
        <span style="font-weight:700; color:#00BA88;">+$850.00</span>
      </div>
      <div class="salary-row">
        <span style="color:#8F9CAE;">Remote Connectivity Stipend</span>
        <span style="font-weight:700; color:#00BA88;">+$150.00</span>
      </div>
      <div class="salary-row" style="border-bottom:none;">
        <span style="color:#8F9CAE;">Withholding Tax &amp; Social Ins.</span>
        <span style="font-weight:700; color:#FF3B30;">-$350.00</span>
      </div>
    </div>

    <div style="background:#FFFFFF; border:1px solid #EDF1F7; border-radius:12px; height:46px; display:flex; align-items:center; justify-content:center; gap:8px; font-size:13px; font-weight:600; color:#222B45;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Download Official Payslip (PDF)
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 8. Performance Analytics Screen (Matching forget-pw-3 Report section)
function getReportHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.stat-3-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.stat-box {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  border: 1px solid #EDF1F7;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.chart-wrap {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 90px;
  padding-bottom: 4px;
  border-bottom: 1px solid #EDF1F7;
}
.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.bar-fill {
  width: 28px;
  border-radius: 6px 6px 0 0;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Performance Report</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <div class="tab-item">Daily</div>
    <div class="tab-item">Weekly</div>
    <div class="tab-item active">Monthly</div>
    <div class="tab-right-dropdown">September 2026 ▾</div>
  </div>

  <div class="content-area">
    <!-- Stat 3 Grid -->
    <div class="stat-3-grid">
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#3E79F7;">168.5h</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Hours Logged</div>
      </div>
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#00BA88;">42</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Tasks Done</div>
      </div>
      <div class="stat-box">
        <div style="font-size:18px; font-weight:800; color:#FF8A00;">98%</div>
        <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">On-Time Rate</div>
      </div>
    </div>

    <!-- Chart Card -->
    <div class="task-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:13px; font-weight:700; color:#222B45;">Weekly Workload Distribution</span>
        <span style="font-size:11px; color:#3E79F7; font-weight:600;">Avg: 42h/wk</span>
      </div>

      <div class="chart-wrap">
        <div class="bar-col">
          <span style="font-size:10px; color:#8F9CAE;">40h</span>
          <div class="bar-fill" style="height:55px; background:#B3C5FF;"></div>
          <span style="font-size:11px; color:#8F9CAE;">W1</span>
        </div>
        <div class="bar-col">
          <span style="font-size:10px; color:#8F9CAE;">44h</span>
          <div class="bar-fill" style="height:65px; background:#4E6AF3;"></div>
          <span style="font-size:11px; color:#8F9CAE;">W2</span>
        </div>
        <div class="bar-col">
          <span style="font-size:10px; color:#8F9CAE;">42h</span>
          <div class="bar-fill" style="height:60px; background:#4E6AF3;"></div>
          <span style="font-size:11px; color:#8F9CAE;">W3</span>
        </div>
        <div class="bar-col">
          <span style="font-size:10px; color:#8F9CAE;">42.5h</span>
          <div class="bar-fill" style="height:62px; background:#00BA88;"></div>
          <span style="font-size:11px; color:#8F9CAE;">W4</span>
        </div>
      </div>
    </div>

    <!-- Domain Breakdown -->
    <div class="task-card">
      <div style="font-size:13px; font-weight:700; color:#222B45; margin-bottom:6px;">Time Allocation by Domain</div>
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span style="color:#8F9CAE;">UI/UX Design</span>
        <span style="font-weight:700; color:#3E79F7;">55% (92.5h)</span>
      </div>
      <div style="width:100%; height:6px; background:#F1F3F9; border-radius:3px; overflow:hidden; margin-bottom:10px;">
        <div style="width:55%; height:100%; background:#4E6AF3;"></div>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span style="color:#8F9CAE;">Team Sync &amp; Video Calls</span>
        <span style="font-weight:700; color:#7B2CBF;">25% (42.0h)</span>
      </div>
      <div style="width:100%; height:6px; background:#F1F3F9; border-radius:3px; overflow:hidden; margin-bottom:10px;">
        <div style="width:25%; height:100%; background:#7B2CBF;"></div>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span style="color:#8F9CAE;">QA &amp; Reviews</span>
        <span style="font-weight:700; color:#00BA88;">12% (20.0h)</span>
      </div>
      <div style="width:100%; height:6px; background:#F1F3F9; border-radius:3px; overflow:hidden;">
        <div style="width:12%; height:100%; background:#00BA88;"></div>
      </div>
    </div>

    <div style="background:#E8F8F0; border-radius:12px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-size:11px; color:#00BA88; font-weight:600;">QUARTERLY ASSESSMENT</div>
        <div style="font-size:15px; font-weight:800; color:#00BA88;">Rating A+ (Outstanding Performance)</div>
      </div>
      <span style="font-size:22px;">⭐</span>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 9. OKRs & Goals Tracking Screen (Matching forget-pw-4 task cards)
function getGoalsHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">OKRs &amp; Goals</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <div class="tab-item">Company</div>
    <div class="tab-item active">Team OKRs</div>
    <div class="tab-item">Personal</div>
    <div class="tab-right-dropdown">Q4 2026 ▾</div>
  </div>

  <div class="content-area">
    <!-- Top Overall Progress Card -->
    <div class="task-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:11px; color:#8F9CAE; font-weight:600;">OVERALL Q4 PROGRESS</div>
          <div style="font-size:22px; font-weight:800; color:#222B45;">78% Completed</div>
        </div>
        <span class="badge-done">Ahead of Schedule</span>
      </div>
      <div style="width:100%; height:6px; background:#EDF1F7; border-radius:3px; overflow:hidden; margin-top:6px;">
        <div style="width:78%; height:100%; background:linear-gradient(90deg, #4E6AF3, #00BA88);"></div>
      </div>
    </div>

    <!-- Goal 1 (border-blue) -->
    <div class="task-card border-blue">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="card-title">🚀 Scale Design System Across Apps</div>
        <span class="badge-progress">85% Done</span>
      </div>
      <div class="card-desc">Achieve 90% mobile developer token adoption and zero AA defect compliance.</div>
      
      <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px; padding-top:6px; border-top:1px solid #F7F9FC;">
        <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#222B45;">
          <span>KR 1: Publish 40 core component tokens</span>
          <span style="font-weight:700; color:#00BA88;">100%</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#222B45;">
          <span>KR 2: Mobile dev adoption in iOS/Android</span>
          <span style="font-weight:700; color:#4E6AF3;">75%</span>
        </div>
      </div>
    </div>

    <!-- Goal 2 (border-orange) -->
    <div class="task-card border-orange">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="card-title">📱 Launch TaskSync Mobile v2.4</div>
        <span class="badge-todo">64% Done</span>
      </div>
      <div class="card-desc">Finalize 20 high-fidelity screens and validate flows with 50 pilot enterprise users.</div>

      <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px; padding-top:6px; border-top:1px solid #F7F9FC;">
        <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#222B45;">
          <span>KR 1: 20 native screens finalized</span>
          <span style="font-weight:700; color:#00BA88;">90%</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#222B45;">
          <span>KR 2: Usability tests with enterprise testers</span>
          <span style="font-weight:700; color:#FF8A00;">45%</span>
        </div>
      </div>
    </div>
  </div>

  <div class="fab-btn">+</div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 10. Smart Reminders & Geofence Alerts (Matching Task cards & toggle)
function getReminderHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.toggle-switch {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: #4E6AF3;
  position: relative;
  flex-shrink: 0;
}
.toggle-switch.off { background: #C5CEE0; }
.toggle-knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  position: absolute;
  top: 2px;
  right: 2px;
}
.toggle-switch.off .toggle-knob {
  left: 2px;
  right: auto;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#222B45"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#222B45"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#222B45"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#222B45"/><path d="M20 3.5V7.5" stroke="#222B45" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="nav-header">
    <div class="nav-header-left">
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Reminder</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <div class="tab-item active">All (4)</div>
    <div class="tab-item">Geofenced (2)</div>
    <div class="tab-item">Completed</div>
  </div>

  <div class="content-area">
    <!-- Geofence Banner -->
    <div style="background:#EDF3FF; border:1px solid #D0E1FD; border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:10px;">
      <div style="width:34px; height:34px; border-radius:8px; background:#4E6AF3; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        📍
      </div>
      <div style="flex:1;">
        <div style="font-size:12.5px; font-weight:700; color:#3E79F7;">Office Geofence Active (100m)</div>
        <div style="font-size:11px; color:#8F9CAE;">Auto-reminds when entering 1234 Silicon Avenue.</div>
      </div>
    </div>

    <!-- Reminder 1 -->
    <div class="task-card border-blue">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="card-title">Check-in GPS Attendance before 09:00 AM</div>
          <div class="card-desc" style="margin-top:2px;">⏰ Daily at 08:45 AM ∙ HQ Office Zone</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>
    </div>

    <!-- Reminder 2 -->
    <div class="task-card border-orange">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="card-title">Submit Weekly Timesheet &amp; Sprint Report</div>
          <div class="card-desc" style="margin-top:2px;">⏰ Every Friday at 16:30 PM</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>
    </div>

    <!-- Reminder 3 -->
    <div class="task-card border-green">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="card-title">Design Sprint Review: Prepare Slides</div>
          <div class="card-desc" style="margin-top:2px;">⏰ Today at 14:15 PM (15m before event)</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>
    </div>

    <!-- Reminder 4 -->
    <div class="task-card" style="border-bottom: 2.5px solid #EDF1F7;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="card-title" style="color:#8F9CAE;">Review Leave Request for Sarah Jenkins</div>
          <div class="card-desc" style="margin-top:2px;">⏰ Tomorrow at 10:00 AM</div>
        </div>
        <div class="toggle-switch off"><div class="toggle-knob"></div></div>
      </div>
    </div>
  </div>

  <div class="fab-btn">+</div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

const SCREENS = [
  { name: 'tasksync-calendar.png', htmlFn: getCalendarHTML },
  { name: 'tasksync-chat.png', htmlFn: getChatHTML },
  { name: 'tasksync-video.png', htmlFn: getVideoHTML },
  { name: 'tasksync-docs.png', htmlFn: getDocsHTML },
  { name: 'tasksync-task-detail.png', htmlFn: getTaskDetailHTML },
  { name: 'tasksync-request.png', htmlFn: getRequestHTML },
  { name: 'tasksync-salary.png', htmlFn: getSalaryHTML },
  { name: 'tasksync-report.png', htmlFn: getReportHTML },
  { name: 'tasksync-goals.png', htmlFn: getGoalsHTML },
  { name: 'tasksync-reminder.png', htmlFn: getReminderHTML }
];

console.log('Rendering all 10 screens with the exact TaskSync design system...');

for (const screen of SCREENS) {
  const htmlPath = path.join(TEMP_DIR, screen.name.replace('.png', '.html'));
  const outPngPath = path.join(OUT_DIR, screen.name);

  fs.writeFileSync(htmlPath, screen.htmlFn(), 'utf8');

  const cmd = `"${EDGE_PATH}" --headless=new --screenshot="${outPngPath}" --window-size=375,812 --force-device-scale-factor=2 --hide-scrollbars "file:///${htmlPath.replace(/\\\\/g, '/')}"`;
  
  try {
    console.log(`Rendering ${screen.name}...`);
    execSync(cmd, { stdio: 'pipe' });
    execSync('powershell -Command "Start-Sleep -Milliseconds 800"');

    if (fs.existsSync(outPngPath)) {
      const size = fs.statSync(outPngPath).size;
      console.log(`✔ SUCCESS: ${screen.name} (${size} bytes)`);
    } else {
      console.error(`✖ ERROR: ${screen.name} was not created`);
    }
  } catch (err) {
    console.error(`✖ EXCEPTION rendering ${screen.name}:`, err.message);
  }
}

console.log('Finished rendering all 10 synchronized screens.');
