-- Insert mock admin user (password: admin123)
-- In a real application, you would use a proper password hashing mechanism
INSERT INTO users (email, password)
VALUES ('admin@example.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- Insert mock photos data
INSERT INTO photos (title, description, url, category, tags, is_featured)
VALUES
  ('水母', '水族馆中的水母', 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1000', '自然', ARRAY['水族馆', '海洋生物'], true),
  ('咖啡馆', '城市中的咖啡馆', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000', '城市', ARRAY['咖啡', '城市生活'], false),
  ('夜景', '城市夜景', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000', '城市', ARRAY['夜景', '城市'], true),
  ('小巷', '老城区的小巷', 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?q=80&w=1000', '城市', ARRAY['街道', '建筑'], false),
  ('咖啡标志', '墙上的咖啡标志', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000', '城市', ARRAY['咖啡', '标志'], false),
  ('红色背景', '红色背景下的人物剪影', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000', '人物', ARRAY['剪影', '红色'], true),
  ('办公室', '现代办公室', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000', '室内', ARRAY['办公室', '工作空间'], false),
  ('老街', '老街区', 'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1000', '城市', ARRAY['街道', '历史'], false),
  ('屋顶', '城市屋顶', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000', '城市', ARRAY['建筑', '视角'], true),
  ('绿色树林', '绿色的树林', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000', '自然', ARRAY['树林', '绿色'], false),
  ('夜店', '夜店灯光', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000', '城市', ARRAY['夜生活', '灯光'], false),
  ('街道', '夜晚的街道', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000', '城市', ARRAY['街道', '夜景'], true)
ON CONFLICT DO NOTHING;
