import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData, RegisterFormData } from '../types/user';
import Button from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
    remember: false
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!registerData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!registerData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (registerData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;

    setLoading(true);
    try {
      // TODO: Implement actual authentication
      console.log('Login attempt:', loginData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Đăng nhập thất bại' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegister()) return;

    setLoading(true);
    try {
      console.log('Register attempt:', registerData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
      setErrors({ general: 'Đăng ký thất bại' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    // TODO: Implement Google OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <div className="text-xl font-bold">OC Manager</div>
                <div className="text-sm opacity-90">Character & Community</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Chào mừng trở lại!</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Quản lý nhân vật OC, theo dõi hoạt động, và kết nối với cộng đồng - tất cả ở một nơi.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Giao diện sạch, trực quan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Bảo mật & xác thực nhiều tầng</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Tích hợp Google Sign-In</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    OC
                  </div>
                  <span className="font-bold text-gray-900">OC Manager</span>
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900">Xin chào</h2>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'login' ? 'Đăng nhập vào tài khoản của bạn' : 'Tạo tài khoản mới'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-6 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'login'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'register'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Đăng ký
                </button>
              </div>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <div>
                {/* Google Login */}
                <Button
                  variant="secondary"
                  onClick={handleGoogleLogin}
                  className="w-full mb-4"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                >
                  Đăng nhập bằng Google
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">hoặc</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    error={errors.email}
                    placeholder="you@example.com"
                  />

                  <Input
                    label="Mật khẩu"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    error={errors.password}
                    placeholder="••••••••"
                  />

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginData.remember}
                        onChange={(e) => setLoginData({...loginData, remember: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">Ghi nhớ tôi</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      Quên mật khẩu?
                    </a>
                  </div>

                  {errors.general && (
                    <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                      {errors.general}
                    </div>
                  )}

                  <Button type="submit" className="w-full" loading={loading}>
                    Đăng nhập
                  </Button>
                </form>
              </div>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  label="Họ & tên"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  error={errors.name}
                  placeholder="Nguyễn Văn A"
                />

                <Input
                  label="Email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  error={errors.email}
                  placeholder="you@example.com"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Mật khẩu"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    error={errors.password}
                    placeholder="Ít nhất 8 ký tự"
                  />
                  <Input
                    label="Xác nhận"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    error={errors.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={registerData.agreeToTerms}
                    onChange={(e) => setRegisterData({...registerData, agreeToTerms: e.target.checked})}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">
                    Tôi đồng ý với{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      điều khoản sử dụng
                    </a>{' '}
                    và{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      chính sách bảo mật
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <div className="text-red-600 text-sm">{errors.agreeToTerms}</div>
                )}

                {errors.general && (
                  <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.general}
                  </div>
                )}

                <Button type="submit" className="w-full" loading={loading}>
                  Tạo tài khoản
                </Button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              {activeTab === 'login' ? (
                <>
                  Chưa có tài khoản?{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Đăng ký ngay
                  </button>
                </>
              ) : (
                <>
                  Đã có tài khoản?{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;