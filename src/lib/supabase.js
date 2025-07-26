import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './mockAuth.js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 检查是否配置了 Supabase 环境变量
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

let supabase

if (isSupabaseConfigured) {
  // 使用真实的 Supabase 客户端
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Supabase 已连接')
} else {
  // 演示模式：使用增强的本地模拟认证系统
  console.log('🔧 演示模式：使用本地模拟认证系统')
  console.log('📧 测试账号：test@linkup.com / 12345678')
  console.log('📧 演示账号：demo@linkup.com / password')
  
  supabase = mockSupabase
}

export { supabase };
