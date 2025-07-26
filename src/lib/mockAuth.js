// 本地模拟认证系统
class MockAuth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('linkup_users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('linkup_current_user') || 'null');
    this.sessions = new Map();
  }

  // 注册用户
  async signUp(email, password, metadata = {}) {
    try {
      // 检查用户是否已存在
      const existingUser = this.users.find(user => user.email === email);
      if (existingUser) {
        return {
          data: null,
          error: { message: '该邮箱已被注册' }
        };
      }

      // 创建新用户
      const newUser = {
        id: this.generateUUID(),
        email,
        password: this.hashPassword(password), // 简单哈希（实际项目中应使用更安全的方法）
        name: metadata.name || '',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString() // 模拟邮箱已验证
      };

      this.users.push(newUser);
      localStorage.setItem('linkup_users', JSON.stringify(this.users));

      // 自动登录
      const session = this.createSession(newUser);
      
      return {
        data: {
          user: this.sanitizeUser(newUser),
          session
        },
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: { message: '注册失败，请重试' }
      };
    }
  }

  // 用户登录
  async signInWithPassword({ email, password }) {
    try {
      const user = this.users.find(u => u.email === email);
      if (!user) {
        return {
          data: null,
          error: { message: '用户不存在' }
        };
      }

      if (user.password !== this.hashPassword(password)) {
        return {
          data: null,
          error: { message: '密码错误' }
        };
      }

      const session = this.createSession(user);
      
      return {
        data: {
          user: this.sanitizeUser(user),
          session
        },
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: { message: '登录失败，请重试' }
      };
    }
  }

  // 用户登出
  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('linkup_current_user');
    localStorage.removeItem('linkup_session');
    return { error: null };
  }

  // 获取当前会话
  async getSession() {
    const session = JSON.parse(localStorage.getItem('linkup_session') || 'null');
    if (session && this.isSessionValid(session)) {
      return {
        data: { session },
        error: null
      };
    }
    return {
      data: { session: null },
      error: null
    };
  }

  // 监听认证状态变化
  onAuthStateChange(callback) {
    // 简单的事件监听器
    const checkAuth = () => {
      const session = JSON.parse(localStorage.getItem('linkup_session') || 'null');
      callback('SIGNED_IN', session);
    };

    // 初始检查
    checkAuth();

    // 监听存储变化
    window.addEventListener('storage', checkAuth);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            window.removeEventListener('storage', checkAuth);
          }
        }
      }
    };
  }

  // 辅助方法
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  hashPassword(password) {
    // 简单哈希（实际项目中应使用bcrypt等）
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return hash.toString();
  }

  createSession(user) {
    const session = {
      access_token: 'mock_token_' + Date.now(),
      refresh_token: 'mock_refresh_' + Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24小时后过期
      user: this.sanitizeUser(user)
    };

    this.currentUser = user;
    localStorage.setItem('linkup_current_user', JSON.stringify(this.sanitizeUser(user)));
    localStorage.setItem('linkup_session', JSON.stringify(session));

    return session;
  }

  sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  isSessionValid(session) {
    return session && session.expires_at > Date.now();
  }
}

// 模拟数据库操作
class MockDatabase {
  constructor() {
    this.tables = {
      profiles: JSON.parse(localStorage.getItem('linkup_profiles') || '[]'),
      matches: JSON.parse(localStorage.getItem('linkup_matches') || '[]'),
      messages: JSON.parse(localStorage.getItem('linkup_messages') || '[]')
    };
  }

  from(tableName) {
    return {
      select: (columns = '*') => {
        const data = this.tables[tableName] || [];
        return Promise.resolve({ data, error: null });
      },
      
      insert: (data) => {
        if (!this.tables[tableName]) {
          this.tables[tableName] = [];
        }
        
        const newRecord = {
          id: this.generateUUID(),
          ...data,
          created_at: new Date().toISOString()
        };
        
        this.tables[tableName].push(newRecord);
        localStorage.setItem(`linkup_${tableName}`, JSON.stringify(this.tables[tableName]));
        
        return Promise.resolve({ data: newRecord, error: null });
      },
      
      update: (data) => ({
        eq: (column, value) => {
          const table = this.tables[tableName] || [];
          const index = table.findIndex(record => record[column] === value);
          
          if (index !== -1) {
            table[index] = { ...table[index], ...data, updated_at: new Date().toISOString() };
            localStorage.setItem(`linkup_${tableName}`, JSON.stringify(table));
            return Promise.resolve({ data: table[index], error: null });
          }
          
          return Promise.resolve({ data: null, error: { message: '记录未找到' } });
        }
      }),
      
      delete: () => ({
        eq: (column, value) => {
          const table = this.tables[tableName] || [];
          const index = table.findIndex(record => record[column] === value);
          
          if (index !== -1) {
            const deleted = table.splice(index, 1)[0];
            localStorage.setItem(`linkup_${tableName}`, JSON.stringify(table));
            return Promise.resolve({ data: deleted, error: null });
          }
          
          return Promise.resolve({ data: null, error: { message: '记录未找到' } });
        }
      })
    };
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// 创建模拟客户端
const mockAuth = new MockAuth();
const mockDb = new MockDatabase();

export const mockSupabase = {
  auth: {
    signUp: (options) => mockAuth.signUp(options.email, options.password, options.options?.data),
    signInWithPassword: mockAuth.signInWithPassword.bind(mockAuth),
    signOut: mockAuth.signOut.bind(mockAuth),
    getSession: mockAuth.getSession.bind(mockAuth),
    onAuthStateChange: mockAuth.onAuthStateChange.bind(mockAuth)
  },
  from: mockDb.from.bind(mockDb)
};

// 预设一些测试用户
const initTestUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('linkup_users') || '[]');
  if (existingUsers.length === 0) {
    const testUsers = [
      {
        id: 'test-user-1',
        email: 'test@linkup.com',
        password: mockAuth.hashPassword('12345678'),
        name: '测试用户',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString()
      },
      {
        id: 'test-user-2',
        email: 'demo@linkup.com',
        password: mockAuth.hashPassword('password'),
        name: '演示用户',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('linkup_users', JSON.stringify(testUsers));
    console.log('🔧 已创建测试用户：');
    console.log('📧 test@linkup.com / 12345678');
    console.log('📧 demo@linkup.com / password');
  }
};

// 初始化测试数据
initTestUsers();