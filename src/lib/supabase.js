import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './mockAuth.js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 调试信息
console.log('🔍 环境变量检查:')
console.log('VITE_SUPABASE_URL:', supabaseUrl)
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '已设置' : '未设置')

// 检查是否配置了有效的 Supabase 环境变量
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://demo.supabase.co' && 
  !supabaseUrl.includes('demo') &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('supabase.co')

let supabase

if (isSupabaseConfigured) {
  // 使用真实的 Supabase 客户端
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Supabase 已连接:', supabaseUrl)
} else {
  // 演示模式：使用增强的本地模拟认证系统
  console.log('🔧 演示模式：使用本地模拟认证系统')
  console.log('📧 测试账号：test@linkup.com / 12345678')
  console.log('📧 演示账号：demo@linkup.com / password')
  
  supabase = mockSupabase
}

export { supabase };
