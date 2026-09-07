/**
 * Cấu hình Kết nối Supabase Backend
 * Bạn chỉ cần thay thế SUPABASE_URL và SUPABASE_ANON_KEY bên dưới
 * bằng thông tin lấy từ Supabase Dashboard (Project Settings -> API).
 */

const SUPABASE_URL = 'https://pdwqctgttzmretikyhsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Gdqscue4WTLnx_LKq4lWdg_HCPEck3d';

// Kiểm tra và khởi tạo Supabase Client
let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Kết nối Supabase thành công!');
} else {
  console.warn('⚠️ Supabase chưa được cấu hình key thực tế. Đang sử dụng chế độ Fallback Local Data.');
}
