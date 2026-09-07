# Sanvithi-Inspired Personal Portfolio

Trang web Portfolio cá nhân cao cấp lấy cảm hứng từ **Sanvithi.com (Sanvi Saya's Portfolio)**. Được xây dựng chuẩn hóa thuần Front-end, sẵn sàng đưa lên GitHub, deploy Vercel và tích hợp Supabase Backend.

---

## 📁 Cấu trúc thư mục chuẩn (Project Structure)

```text
Portfolio/
├── assets/                  # Thư mục hình ảnh & mockup dự án
│   ├── fintech.png
│   ├── saas.png
│   ├── design-system.png
│   └── ecommerce.png
├── css/
│   └── style.css            # Design system, CSS variables, 3D Parallax & Dark/Light mode
├── js/
│   └── script.js            # Dynamic render, Case Study Modal, Hero tabs & Toast
├── index.html               # Trang HTML5 chuẩn Semantic SEO
└── README.md                # Hướng dẫn triển khai & tích hợp
```

---

## 🚀 Hướng dẫn Triển khai (Deployment Guide)

### 1. Đưa lên GitHub (Push to GitHub)
```bash
cd Portfolio
git init
git add .
git commit -m "Initial portfolio release"
git branch -M main
git remote add origin https://github.com/USERNAME/my-portfolio.git
git push -u origin main
```

### 2. Triển khai miễn phí trên Vercel (Deploy to Vercel)
1. Đăng nhập [Vercel](https://vercel.com/) bằng tài khoản GitHub.
2. Nhấp **Add New Project** -> Chọn repository `my-portfolio`.
3. Bấm **Deploy**. Trang web sẽ tự động kích hoạt và cập nhật tên miền `yourname.vercel.app`.

---

## ⚡ Hướng dẫn tích hợp Supabase (Khi muốn nâng cấp Backend)

Để chuyển dự án từ tĩnh (static data trong `script.js`) thành hệ thống động quản lý từ Supabase:

1. **Cài đặt Supabase JS Client** trong `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
2. **Khởi tạo Supabase Client** trong `js/script.js`:
   ```javascript
   const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
   const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   ```
3. **Fetch danh sách dự án từ Database**:
   ```javascript
   async function loadProjectsFromSupabase() {
     const { data, error } = await supabase.from('projects').select('*');
     if (data) {
       // Render danh sách dự án động
     }
   }
   ```

---

© 2026 Designed with Framer motion aesthetic & built with clean HTML, CSS, JavaScript.
