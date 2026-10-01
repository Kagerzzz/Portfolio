const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'tasksync');
const TEMP_DIR = path.resolve(__dirname, 'temp_redesign_orig');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

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

    .content-area {
      flex: 1;
      padding: 16px;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

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

// 1. Onboarding / Welcome Screen
function getOnboardingHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #FFFFFF; }
.hero-visual {
  height: 410px;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-circle-glow {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFB703, #FB8500);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 40px rgba(251, 133, 0, 0.35);
}
.floating-task-card {
  position: absolute;
  right: 24px;
  bottom: 30px;
  background: #FFFFFF;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);
  border: 1px solid #EDF1F7;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 170px;
}
.floating-avatar-badge {
  position: absolute;
  left: 28px;
  bottom: 80px;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.welcome-body {
  flex: 1;
  padding: 24px 24px 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.welcome-title {
  font-size: 32px;
  font-weight: 800;
  color: #222B45;
  line-height: 1.15;
  letter-spacing: -0.5px;
}
.welcome-title span { color: #4E6AF3; }
.welcome-desc {
  font-size: 14px;
  color: #8F9CAE;
  line-height: 1.55;
  margin-top: 8px;
}
.start-btn {
  height: 52px;
  background: linear-gradient(135deg, #4E6AF3, #3A0CA3);
  color: #FFFFFF;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px rgba(78, 106, 243, 0.38);
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

  <div class="hero-visual">
    <div class="hero-circle-glow">
      <div style="font-size:74px;">⏳</div>
    </div>

    <div class="floating-avatar-badge">
      <div style="width:28px; height:28px; border-radius:50%; background:#4E6AF3; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700;">AS</div>
      <div style="font-size:11px; font-weight:700; color:#222B45;">Alex Smith</div>
    </div>

    <div class="floating-task-card">
      <div style="display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; color:#00BA88;">
        <span>✓</span> Daily Tasks
      </div>
      <div style="width:100%; height:4px; background:#EDF1F7; border-radius:2px;"><div style="width:80%; height:100%; background:#00BA88; border-radius:2px;"></div></div>
      <div style="font-size:10px; color:#8F9CAE;">8 of 10 completed</div>
    </div>
  </div>

  <div class="welcome-body">
    <div>
      <div class="welcome-title">
        Welcome to<br><span>TaskSync</span>
      </div>
      <div class="welcome-desc">
        Top work management application. Stay organized, collaborate with messaging, video calls, smart calendar and automated GPS attendance.
      </div>
    </div>

    <button class="start-btn">Get Started →</button>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 2. Sign In Screen
function getLoginHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #FFFFFF; }
.login-wrap {
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4E6AF3, #3A0CA3);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 8px 20px rgba(78, 106, 243, 0.35);
  margin-bottom: 16px;
}
.input-label {
  font-size: 11px;
  font-weight: 700;
  color: #8F9CAE;
  margin-bottom: 6px;
  letter-spacing: 0.05em;
}
.input-group {
  background: #F8F9FD;
  border: 1.5px solid #EDF1F7;
  border-radius: 12px;
  height: 48px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #222B45;
  margin-bottom: 14px;
}
.biometric-btn {
  height: 48px;
  background: #EDF3FF;
  border: 1px solid #D0E1FD;
  border-radius: 12px;
  color: #3E79F7;
  font-size: 13.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 10px;
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

  <div class="login-wrap">
    <div>
      <div class="brand-mark">⚡</div>
      <div style="font-size:24px; font-weight:800; color:#222B45;">Sign In</div>
      <div style="font-size:13px; color:#8F9CAE; margin-top:4px;">Enter your enterprise credentials to access TaskSync</div>

      <div style="margin-top:24px;">
        <div class="input-label">EMAIL ADDRESS</div>
        <div class="input-group">
          <span>✉️</span>
          <span style="font-weight:500;">alex.smith@vertex.com</span>
        </div>

        <div class="input-label">PASSWORD</div>
        <div class="input-group" style="justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span>🔒</span>
            <span>••••••••••••</span>
          </div>
          <span>👁️</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-top:4px;">
          <label style="color:#8F9CAE; display:flex; align-items:center; gap:6px;"><input type="checkbox" checked> Remember me</label>
          <span style="color:#4E6AF3; font-weight:600;">Forgot Password?</span>
        </div>
      </div>
    </div>

    <div>
      <button style="width:100%; height:50px; background:#4E6AF3; color:#fff; border-radius:12px; font-size:15px; font-weight:700; border:none; box-shadow:0 6px 18px rgba(78,106,243,0.35); cursor:pointer;">
        Sign In
      </button>

      <div class="biometric-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E79F7" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        Sign in with FaceID / Biometrics
      </div>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 3. OTP Security Screen
function getOTPHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #FFFFFF; }
.otp-wrap {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.otp-boxes {
  display: flex;
  justify-content: space-between;
  margin: 24px 0 16px;
}
.otp-cell {
  width: 44px;
  height: 52px;
  border-radius: 12px;
  background: #F8F9FD;
  border: 1.5px solid #EDF1F7;
  font-size: 22px;
  font-weight: 800;
  color: #222B45;
  display: flex;
  align-items: center;
  justify-content: center;
}
.otp-cell.active {
  border-color: #4E6AF3;
  background: #FFFFFF;
  box-shadow: 0 4px 14px rgba(78, 106, 243, 0.2);
}
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 14px;
}
.key-btn {
  height: 50px;
  border-radius: 12px;
  background: #F8F9FD;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #222B45;
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
      <div class="nav-title">OTP Verification</div>
    </div>
  </div>

  <div class="otp-wrap">
    <div>
      <div style="width:48px; height:48px; border-radius:50%; background:#EDF3FF; color:#4E6AF3; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:12px;">🛡️</div>
      <div style="font-size:22px; font-weight:800; color:#222B45;">Verify Security Code</div>
      <div style="font-size:13px; color:#8F9CAE; margin-top:4px;">We have sent a 6-digit code to <span style="color:#4E6AF3; font-weight:600;">alex.smith@vertex.com</span></div>

      <div class="otp-boxes">
        <div class="otp-cell">4</div>
        <div class="otp-cell">8</div>
        <div class="otp-cell">2</div>
        <div class="otp-cell active">9</div>
        <div class="otp-cell" style="color:#C5CEE0;">-</div>
        <div class="otp-cell" style="color:#C5CEE0;">-</div>
      </div>

      <div style="text-align:center; font-size:12px; color:#8F9CAE;">
        Didn't receive code? <span style="color:#4E6AF3; font-weight:700;">Resend in 00:42</span>
      </div>
    </div>

    <div>
      <div class="keypad">
        <div class="key-btn">1</div><div class="key-btn">2</div><div class="key-btn">3</div>
        <div class="key-btn">4</div><div class="key-btn">5</div><div class="key-btn">6</div>
        <div class="key-btn">7</div><div class="key-btn">8</div><div class="key-btn">9</div>
        <div class="key-btn" style="font-size:16px;">⚲</div><div class="key-btn">0</div><div class="key-btn">⌫</div>
      </div>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 4. Home Dashboard Screen (Matching original forget-pw-1.png)
function getHomeHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.home-hero-header {
  background: linear-gradient(135deg, #4A56E2 0%, #3D7BEF 100%);
  padding: 0 16px 24px;
  border-radius: 0 0 24px 24px;
}
.home-profile-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 18px;
}
.home-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #FFFFFF;
}
.stat-carousel {
  display: flex;
  gap: 12px;
  overflow-x: hidden;
  margin-top: -12px;
  padding: 0 16px;
}
.stat-card-pill {
  flex: 1;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 14px 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #EDF1F7;
}
.stat-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.module-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 10px;
  margin-top: 10px;
}
.module-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.module-squircle {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 22px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.module-label {
  font-size: 11px;
  font-weight: 500;
  color: #222B45;
  text-align: center;
}
</style>
</head>
<body>
  <div class="status-bar white-text" style="background:#4A56E2;">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#FFFFFF"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#FFFFFF"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#FFFFFF"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#FFFFFF"/><path d="M20 3.5V7.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="home-hero-header">
    <div class="home-profile-row">
      <div style="display:flex; align-items:center; gap:10px;">
        <div class="home-avatar">
          <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <div style="font-size:13px; color:#E0E7FF; font-weight:500;">Hi 👋 Alex Smith !</div>
          <div style="font-size:18px; font-weight:700; color:#FFFFFF;">Welcome back</div>
        </div>
      </div>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    </div>
  </div>

  <div class="stat-carousel">
    <div class="stat-card-pill">
      <div class="stat-icon-circle" style="background:#EDF3FF; color:#4E6AF3;">📋</div>
      <div style="font-size:13px; font-weight:700; color:#222B45;">All task (23)</div>
    </div>
    <div class="stat-card-pill">
      <div class="stat-icon-circle" style="background:#E8F8F0; color:#00BA88;">☑️</div>
      <div style="font-size:13px; font-weight:700; color:#222B45;">Todo list (12)</div>
    </div>
    <div class="stat-card-pill">
      <div class="stat-icon-circle" style="background:#FDE8E8; color:#FF3B30;">📑</div>
      <div style="font-size:13px; font-weight:700; color:#222B45;">Completed (8)</div>
    </div>
  </div>

  <div class="content-area" style="padding-top:10px;">
    <!-- Today Task Section -->
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div>
          <span style="font-size:16px; font-weight:700; color:#222B45;">Today task (1)</span>
          <div style="font-size:11px; color:#8F9CAE;">Wednesday, 12 February</div>
        </div>
        <button style="background:#EDF3FF; color:#3E79F7; border:none; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;">+ New task</button>
      </div>

      <div class="task-card border-blue" style="padding:12px 14px;">
        <div class="card-title">Meeting with team</div>
        <div class="card-desc">Meeting to discuss business development and personnel...</div>
        <div class="card-footer">
          <div class="card-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            10:00 - 14:00
          </div>
          <span class="badge-progress">On Progress</span>
        </div>
      </div>
    </div>

    <!-- Workspace Section -->
    <div style="margin-top:4px;">
      <div style="font-size:16px; font-weight:700; color:#222B45; margin-bottom:6px;">Workspace</div>
      
      <div class="module-grid">
        <div class="module-item"><div class="module-squircle" style="background:#3954DB;">🏢</div><span class="module-label">Admin suite</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#00BA88;">📋</div><span class="module-label">Task</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#7B2CBF;">📍</div><span class="module-label">Attendance</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#17C3B2;">⏰</div><span class="module-label">Reminder</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#FF4D4D;">💬</div><span class="module-label">Request</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#FF9F1C;">📬</div><span class="module-label">Mailbox</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#FFC107;">💰</div><span class="module-label">Salary</span></div>
        <div class="module-item"><div class="module-squircle" style="background:#A855F7;">📊</div><span class="module-label">Report</span></div>
      </div>
    </div>
  </div>

  <div class="floating-bottom-nav">
    <div class="nav-tab-btn active">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Home
    </div>
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Mail box
    </div>
    <div class="nav-tab-btn">
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

// 5. Workspace Switcher Screen (Matching Frame 1171276635.png)
function getWorkspaceSwitchHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.switch-drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.18);
  padding: 12px 18px 28px;
  z-index: 55;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.drag-pill {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: #CBD5E1;
  align-self: center;
}
.org-cards-row {
  display: flex;
  gap: 12px;
  overflow-x: hidden;
}
.org-card {
  flex: 1;
  height: 140px;
  border-radius: 14px;
  border: 1.5px solid #EDF1F7;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
}
.org-card.selected {
  border-color: #3E79F7;
  background: #F8FAFE;
  box-shadow: 0 4px 14px rgba(62, 121, 247, 0.12);
}
</style>
</head>
<body>
  <!-- Dimmed Home Background from rendered home screen -->
  <img src="file:///${path.join(OUT_DIR, 'tasksync-home.png').replace(/\\/g, '/')}" style="position:absolute; top:0; left:0; width:375px; height:812px; filter: brightness(0.6) blur(0.5px); object-fit:cover; z-index:1;">

  <div class="switch-drawer">
    <div class="drag-pill"></div>

    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:40px; height:40px; border-radius:50%; overflow:hidden;">
          <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <div style="font-size:15px; font-weight:700; color:#222B45;">Alex Smith !</div>
          <div style="font-size:12px; color:#8F9CAE;">Vertex Solutions Company</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="org-cards-row">
      <div class="org-card" style="border:1.5px dashed #CBD5E1; align-items:center; justify-content:center; gap:8px;">
        <div style="width:36px; height:36px; border-radius:50%; background:#EDF3FF; color:#3E79F7; display:flex; align-items:center; justify-content:center; font-size:20px;">+</div>
        <div style="font-size:12px; font-weight:700; color:#3E79F7;">Add new</div>
      </div>

      <div class="org-card selected">
        <div style="width:40px; height:40px; border-radius:10px; background:#1E1B4B; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px;">🧠</div>
        <div>
          <div style="font-size:12px; font-weight:700; color:#222B45;">Vertex Solutions</div>
          <div style="font-size:10px; color:#3E79F7; font-weight:600;">Owner (Active)</div>
        </div>
      </div>

      <div class="org-card">
        <div style="width:40px; height:40px; border-radius:10px; background:#EDF3FF; display:flex; align-items:center; justify-content:center; color:#3E79F7; font-size:18px;">🌐</div>
        <div>
          <div style="font-size:12px; font-weight:700; color:#222B45;">DigitalWorld</div>
          <div style="font-size:10px; color:#8F9CAE;">Designer</div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 6. Mailbox Screen (Matching original forget-pw-2.png)
function getMailboxHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.mail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #FFFFFF;
  border-bottom: 1px solid #F1F3F9;
}
.mail-icon-sq {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  flex-shrink: 0;
}
.badge-count {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FF3B30;
  color: #fff;
  font-size: 10px;
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
      <div style="width: 34px; height: 34px; border-radius: 50%; overflow: hidden;">
        <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="nav-title">Mail box</div>
    </div>
    <div class="nav-actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    </div>
  </div>

  <div class="tab-strip">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
    <div class="tab-item active">All</div>
    <div class="tab-item">Messenger</div>
    <div class="tab-item">System</div>
  </div>

  <div style="flex:1; overflow-y:hidden;">
    <div class="mail-item">
      <div class="mail-icon-sq" style="background:#00BA88;">📋</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div><span style="font-weight:700; font-size:14px;">Task</span> <span class="badge-system">System</span></div>
          <span style="font-size:11px; color:#8F9CAE;">12:30</span>
        </div>
        <div style="font-size:12px; color:#8F9CAE; margin-top:2px;">You have a new task at 12:00, Wednesday, 12 F...</div>
      </div>
      <div class="badge-count">2</div>
    </div>

    <div class="mail-item">
      <div class="mail-icon-sq" style="background:#7B2CBF;">📍</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div><span style="font-weight:700; font-size:14px;">Attendance</span> <span class="badge-system">System</span></div>
          <span style="font-size:11px; color:#8F9CAE;">07:30</span>
        </div>
        <div style="font-size:12px; color:#8F9CAE; margin-top:2px;">Don't forget to checkin your work at 08:00 today</div>
      </div>
      <div class="badge-count">1</div>
    </div>

    <div class="mail-item">
      <div style="width:44px; height:44px; border-radius:50%; overflow:hidden; flex-shrink:0;">
        <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avatar-thanhieu.jpg" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; font-size:14px;">Linh Phạm</span>
          <span style="font-size:11px; color:#8F9CAE;">Yesterday</span>
        </div>
        <div style="font-size:12px; color:#8F9CAE; margin-top:2px;">How are you today? Have you checked the tokens?</div>
      </div>
      <span style="color:#00BA88; font-size:14px;">✓</span>
    </div>

    <div class="mail-item">
      <div class="mail-icon-sq" style="background:#3954DB;">🏢</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div><span style="font-weight:700; font-size:14px;">Admin suite</span> <span class="badge-system">System</span></div>
          <span style="font-size:11px; color:#8F9CAE;">12 February</span>
        </div>
        <div style="font-size:12px; color:#8F9CAE; margin-top:2px;">Approving the request to participate in the organiza...</div>
      </div>
    </div>

    <div class="mail-item">
      <div class="mail-icon-sq" style="background:#FF4D4D;">💬</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div><span style="font-weight:700; font-size:14px;">Request</span> <span class="badge-system">System</span></div>
          <span style="font-size:11px; color:#8F9CAE;">02 February</span>
        </div>
        <div style="font-size:12px; color:#8F9CAE; margin-top:2px;">Your "Leave" requirement has been accepted</div>
      </div>
    </div>
  </div>

  <div class="floating-bottom-nav">
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Home
    </div>
    <div class="nav-tab-btn active">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Mail box
    </div>
    <div class="nav-tab-btn">
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

// 7. Attendance Screen (Matching original forget-pw-3.png)
function getAttendanceHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
.timer-hero-card {
  background: linear-gradient(135deg, #4D5BF9 0%, #3A8EF6 100%);
  border-radius: 16px;
  color: #FFFFFF;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 24px rgba(62, 121, 247, 0.28);
}
.stop-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeline-track {
  position: relative;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 4px 0;
}
.timeline-track::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: #3E79F7;
}
.timeline-node {
  position: relative;
}
.timeline-dot {
  position: absolute;
  left: -20px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #3E79F7;
  border: 2px solid #FFFFFF;
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
      <div class="nav-title">Attendance</div>
    </div>
  </div>

  <div class="content-area">
    <div class="timer-hero-card">
      <div>
        <div style="font-size:12px; opacity:0.85;">Current Session</div>
        <div style="font-size:40px; font-weight:800; letter-spacing:-0.5px;">01:27:22</div>
      </div>
      <div class="stop-btn">
        <div style="width:16px; height:16px; background:#fff; border-radius:3px;"></div>
      </div>
    </div>

    <!-- Timeline Events -->
    <div class="task-card" style="padding:14px 16px;">
      <div class="timeline-track">
        <div class="timeline-node">
          <div class="timeline-dot"></div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:13px;">08:27</span>
            <span style="background:#E8F8F0; color:#00BA88; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:600;">Checkin</span>
          </div>
          <div style="font-size:11.5px; color:#8F9CAE; margin-top:2px;">📍 1234 Silicon Avenue, Suite 567</div>
        </div>

        <div class="timeline-node">
          <div class="timeline-dot"></div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:13px;">11:59</span>
            <span style="background:#FEECEB; color:#FF3B30; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:600;">Checkout</span>
            <span style="background:#F1F3F5; color:#8F9CAE; padding:2px 8px; border-radius:6px; font-size:11px;">Lunch break</span>
          </div>
          <div style="font-size:11.5px; color:#8F9CAE; margin-top:2px;">📍 1234 Silicon Avenue, Suite 567</div>
        </div>

        <div class="timeline-node">
          <div class="timeline-dot"></div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:13px;">13:27</span>
            <span style="background:#E8F8F0; color:#00BA88; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:600;">Checkin</span>
          </div>
          <div style="font-size:11.5px; color:#8F9CAE; margin-top:2px;">📍 1234 Silicon Avenue, Suite 567</div>
        </div>
      </div>
    </div>

    <!-- Report Stats -->
    <div>
      <div style="font-size:15px; font-weight:700; color:#222B45; margin-bottom:6px;">Report</div>
      <div class="stat-3-grid">
        <div class="stat-box">
          <div style="font-size:18px; font-weight:800; color:#3E79F7;">05h 22m</div>
          <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Today total</div>
        </div>
        <div class="stat-box">
          <div style="font-size:18px; font-weight:800; color:#FFC107;">0</div>
          <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Late in</div>
        </div>
        <div class="stat-box">
          <div style="font-size:18px; font-weight:800; color:#FF3B30;">0</div>
          <div style="font-size:10px; color:#8F9CAE; margin-top:2px;">Early leave</div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 8. Tasks List Screen (Matching original forget-pw-4.png)
function getTasksHTML() {
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
      <button class="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222B45" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div class="nav-title">Task</div>
    </div>
  </div>

  <div class="tab-strip">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
    <div class="tab-item active">All</div>
    <div class="tab-item">To-do</div>
    <div class="tab-item">On progress</div>
    <div class="tab-item">Done</div>
    <div class="tab-right-dropdown">Daily ▾</div>
  </div>

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
      <div class="card-desc">Meeting to discuss business development and personnel...</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          10:00 - 14:00
        </div>
        <span class="badge-progress">On Progress</span>
      </div>
    </div>

    <div class="task-card border-orange">
      <div class="card-title">Landing Page Agency Creative</div>
      <div class="card-desc">Review responsiveness, CTA conversion rate and dark theme.</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          15:00 - 18:00
        </div>
        <span class="badge-todo">To-do</span>
      </div>
    </div>

    <div class="task-card border-green">
      <div class="card-title">Contact customers</div>
      <div class="card-desc">Confirm the deposit and make payment for enterprise subscription.</div>
      <div class="card-footer">
        <div class="card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F9CAE" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          08:00 - 10:00
        </div>
        <span class="badge-done">Done</span>
      </div>
    </div>
  </div>

  <div class="fab-btn">+</div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 9. Admin Suite Screen (Matching original forget-pw-5.png)
function getAdminHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #FFFFFF; }
.admin-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F1F3F9;
}
.row-left-content {
  display: flex;
  align-items: center;
  gap: 14px;
}
.row-icon-wrap {
  width: 28px;
  display: flex;
  justify-content: center;
  font-size: 20px;
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
      <div class="nav-title">Admin suite</div>
    </div>
  </div>

  <div style="flex:1; overflow-y:hidden;">
    <div style="padding:16px 16px 8px; font-size:16px; font-weight:700; color:#222B45;">Organization Profile</div>

    <div class="admin-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🏢</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Organization name</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Vertex Solutions Company</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="admin-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🔗</div>
        <div style="font-size:14px; font-weight:600; color:#222B45;">Profile photo, access link, and more</div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div style="padding:20px 16px 8px; font-size:16px; font-weight:700; color:#222B45;">Console</div>

    <div class="admin-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">👥</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Member &amp; Dept</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Add and manage member and dept</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="admin-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🛡️</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Security</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Config security setting</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="admin-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">❓</div>
        <div style="font-size:14px; font-weight:600; color:#222B45;">Help center</div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 10. Settings Screen (Matching original forget-pw-6.png)
function getSettingsHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getCommonCSS()}
body { background: #FFFFFF; }
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F1F3F9;
}
.row-left-content {
  display: flex;
  align-items: center;
  gap: 14px;
}
.row-icon-wrap {
  width: 28px;
  display: flex;
  justify-content: center;
  font-size: 20px;
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

  <div style="padding: 10px 16px 0;">
    <div style="font-size:22px; font-weight:700; color:#222B45;">Setting</div>
  </div>

  <div style="display:flex; justify-content:center; padding:16px 0 12px;">
    <div style="width:72px; height:72px; border-radius:50%; overflow:hidden; border:2px solid #EDF1F7; box-shadow:0 4px 14px rgba(0,0,0,0.06);">
      <img src="C:/Users/thanh/Documents/antigravity/wonderful-hopper/Portfolio/assets/avt.jpg" style="width:100%; height:100%; object-fit:cover;">
    </div>
  </div>

  <div style="flex:1; overflow-y:hidden;">
    <div class="setting-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🏢</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Organization name</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Vertex Solutions Company</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="setting-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🔗</div>
        <div style="font-size:14px; font-weight:600; color:#222B45;">Profile photo, access link, and more</div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="setting-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">👥</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Member &amp; Dept</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Add and manage member and dept</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="setting-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">🛡️</div>
        <div>
          <div style="font-size:11px; color:#8F9CAE;">Security</div>
          <div style="font-size:14px; font-weight:600; color:#222B45;">Config security setting</div>
        </div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>

    <div class="setting-row">
      <div class="row-left-content">
        <div class="row-icon-wrap" style="color:#3954DB;">❓</div>
        <div style="font-size:14px; font-weight:600; color:#222B45;">Help center</div>
      </div>
      <span style="color:#8F9CAE; font-size:18px;">›</span>
    </div>
  </div>

  <div class="floating-bottom-nav">
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Home
    </div>
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Mail box
    </div>
    <div class="nav-tab-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Calendar
    </div>
    <div class="nav-tab-btn active">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Setting
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

const SCREENS = [
  { name: 'tasksync-onboarding.png', htmlFn: getOnboardingHTML },
  { name: 'tasksync-login.png', htmlFn: getLoginHTML },
  { name: 'tasksync-otp.png', htmlFn: getOTPHTML },
  { name: 'tasksync-home.png', htmlFn: getHomeHTML },
  { name: 'tasksync-workspace-switch.png', htmlFn: getWorkspaceSwitchHTML },
  { name: 'tasksync-mailbox.png', htmlFn: getMailboxHTML },
  { name: 'tasksync-attendance.png', htmlFn: getAttendanceHTML },
  { name: 'tasksync-tasks.png', htmlFn: getTasksHTML },
  { name: 'tasksync-admin.png', htmlFn: getAdminHTML },
  { name: 'tasksync-settings.png', htmlFn: getSettingsHTML }
];

console.log('Redesigning the original 10 screens to match the modern high-end design system...');

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

console.log('All original 10 screens redesigned.');
