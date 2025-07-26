import { createClient } from '@supabase/supabase-js';

// 提供有效的默认值，避免 URL 构造错误
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// 检查是否为演示模式
const isDemoMode = supabaseUrl === 'https://demo.supabase.co' || supabaseAnonKey === 'demo-anon-key';

let supabase = null;

try {
  // 只有在有效配置时才创建 Supabase 客户端
  if (!isDemoMode) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('🔧 Supabase 运行在演示模式下，请在 .env 文件中配置真实的 Supabase 凭据');
    // 创建一个模拟的 Supabase 客户端
    supabase = {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: { message: '演示模式：请配置真实的 Supabase 凭据' } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: '演示模式：请配置真实的 Supabase 凭据' } }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: { message: '演示模式：请配置真实的 Supabase 凭据' } }),
        update: () => Promise.resolve({ data: null, error: { message: '演示模式：请配置真实的 Supabase 凭据' } }),
        delete: () => Promise.resolve({ data: null, error: { message: '演示模式：请配置真实的 Supabase 凭据' } })
      })
    };
  }
} catch (error) {
  console.error('Supabase 初始化失败:', error);
  // 提供一个安全的默认客户端
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase 配置错误' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase 配置错误' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase 配置错误' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase 配置错误' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase 配置错误' } })
    })
  };
}

export { supabase };
