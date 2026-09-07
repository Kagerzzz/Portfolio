-- ==========================================================================
-- Supabase PostgreSQL Database Schema & Seed Data for Sanvithi Portfolio
-- Copy và dán toàn bộ đoạn mã này vào Supabase SQL Editor để khởi tạo 1-click!
-- ==========================================================================

-- 1. Tạo bảng Bảng dự án (projects)
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  summary text not null,
  client text,
  role text,
  year text,
  stage_bg text default 'explora',
  image_url text,
  tags jsonb default '[]'::jsonb,
  left_labels jsonb default '[]'::jsonb,
  right_labels jsonb default '[]'::jsonb,
  metrics jsonb default '[]'::jsonb,
  overview text,
  challenge text,
  solution text,
  order_index int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Phân quyền bảo mật Row Level Security (RLS)
alter table projects enable row level security;

-- Cho phép công chúng đọc danh sách dự án
create policy "Allow public read access to projects" 
  on projects for select using (true);

-- Chỉ cho phép người dùng đăng nhập (Admin) Thêm/Sửa/Xóa dự án
create policy "Allow authenticated admin full access to projects" 
  on projects for all using (auth.role() = 'authenticated');

-- 3. Tạo bảng Thẻ Hero (hero_tabs)
create table if not exists hero_tabs (
  id text primary key,
  content text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table hero_tabs enable row level security;

create policy "Allow public read access to hero_tabs" 
  on hero_tabs for select using (true);

create policy "Allow authenticated admin full access to hero_tabs" 
  on hero_tabs for all using (auth.role() = 'authenticated');

-- 4. Chèn dữ liệu mặc định (Seed Data)
insert into hero_tabs (id, content) values
  ('who', 'Designer who creates meaningful experiences through visual and motion design.'),
  ('care', 'Pointing my time and skills toward a healthier, greener future for humanity.'),
  ('believe', 'Humans are capable of creating out-of-the-world sublime things when they come together.'),
  ('cook', 'Rich South Indian curries, comforting pasta & fresh matcha lattes.'),
  ('upto', 'Supporting founders in building design-first AI products & exploring gouache painting.')
on conflict (id) do update set content = excluded.content;

insert into projects (slug, title, summary, client, role, year, stage_bg, image_url, tags, left_labels, right_labels, metrics, overview, challenge, solution, order_index) values
(
  'explora',
  'Explora — Empowering scientists to deliver faster personalized cancer care',
  'I set the product strategy for a biotech platform that saves 1 hour of research time everyday for scientists.',
  'Cellworks Biotech',
  'Founding Product Designer',
  '13 Months ∙ Shipped',
  'explora',
  'assets/saas.png',
  '["0 to 1", "Design Systems", "R&D Tool", "Shipped"]'::jsonb,
  '["Design Systems", "Shipped"]'::jsonb,
  '["0 to 1", "R&D tool"]'::jsonb,
  '[{"val": "~$1.2M", "label": "Recovered in Productivity"}, {"val": "100%", "label": "Organization Adoption"}, {"val": "9 → 1", "label": "Systems Consolidated"}]'::jsonb,
  'Explora is a 0-to-1 unified R&D workspace built for Cellworks, a biotech company focused on curing cancer. Before Explora, scientists juggled 9+ legacy tools and spreadsheets.',
  'Scientists & engineers spent hours tool-hopping, waiting for legacy systems to process simulations, which created a massive productivity lag in cancer research.',
  'I led the 0 to 1 design to consolidate 9+ legacy tools into a singular IDE with split-workspace grids, parallel simulation plotting, and automated progress tracking.',
  1
),
(
  'miraai',
  'Mira.ai — Innovating the future of AI in pregnancy nutrition',
  'I designed an AI-first nutrition assistant that turns complex health data into clear everyday decisions for pregnant women.',
  'Passion Project / Research',
  'Product Designer',
  '16 Weeks ∙ Product Concept',
  'miraai',
  'assets/ecommerce.png',
  '["Wearable", "Visual Design", "Systems Design", "Product Concept", "Pregnancy Nutrition"]'::jsonb,
  '["Wearable", "Visual Design"]'::jsonb,
  '["Systems Design", "Product Concept"]'::jsonb,
  '[{"val": "15/15", "label": "Testers Greater Confidence"}, {"val": "100%", "label": "Preferred AI Context"}, {"val": "~70%", "label": "Pregnancies with Nausea"}]'::jsonb,
  'Mira.ai combines physiological sensing (HRV metrics) on the Apple Watch with a bio-digital twin in the mobile app to adapt recipes and provide real-time nausea relief.',
  'Most pregnancy apps count kicks and bump sizes but ignore the body carrying it — missing the daily realities of nausea, discomfort, and shifting nutrient needs.',
  'We designed a smart watch strap with median-nerve stimulation and a transparent AI assistant that explains every food suggestion and asks for human consent before acting.',
  2
),
(
  'manage',
  'Manage (Siemens) — Accelerating field operations with intuitive interaction',
  'I rebuilt a core workflow of a lighting management platform, cutting setup time from 5 days to 2 for field engineers.',
  'Siemens (Acquired Manage)',
  'Product Designer',
  '4 Months ∙ Shipped',
  'manage',
  'assets/design-system.png',
  '["Enterprise / SaaS", "Interaction Design", "Lighting & Energy Management System", "Shipped"]'::jsonb,
  '["Enterprise / SaaS", "Interaction Design"]'::jsonb,
  '["Lighting & Energy", "Shipped"]'::jsonb,
  '[{"val": "5 → 2", "label": "Days Setup Time"}, {"val": "100%", "label": "Commissioning Accuracy"}, {"val": "+25%", "label": "Screen Real Estate"}]'::jsonb,
  'Manage is the primary interface for field engineers commissioning 1,000+ smart sensors across massive commercial building construction sites.',
  'The legacy interface was a ''wall of data'' requiring click marathons and manual coordinate entries, taking 5 full days to commission a single building.',
  'I redesigned the core workflow with direct drag-to-group selection, sticky instruction strips, and a collapsible high-density floor plan interface.',
  3
)
on conflict (slug) do nothing;
