-- 创建订阅者表
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建RLS策略
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户添加订阅者
CREATE POLICY "Allow anonymous users to subscribe" 
ON subscribers FOR INSERT 
TO anon
WITH CHECK (true);

-- 允许已认证用户查看订阅者
CREATE POLICY "Allow authenticated users to view subscribers" 
ON subscribers FOR SELECT 
TO authenticated
USING (true);

-- 允许已认证用户更新订阅者
CREATE POLICY "Allow authenticated users to update subscribers" 
ON subscribers FOR UPDATE 
TO authenticated
USING (true);

-- 允许已认证用户删除订阅者
CREATE POLICY "Allow authenticated users to delete subscribers" 
ON subscribers FOR DELETE 
TO authenticated
USING (true);

-- 创建邮件发送记录表
CREATE TABLE IF NOT EXISTS email_logs (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sent_to VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建RLS策略
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- 允许已认证用户查看和添加邮件日志
CREATE POLICY "Allow authenticated users to view and add email logs" 
ON email_logs FOR ALL 
TO authenticated
USING (true);
