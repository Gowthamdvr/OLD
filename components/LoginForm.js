function LoginForm({ role, dashboardUrl }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await trickleListObjects('user', 100, true);
      const user = result.items.find(u => 
        u.objectData.username === username && 
        u.objectData.password === password &&
        u.objectData.role === role
      );

      if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = dashboardUrl;
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  const roleConfig = {
    admin: { title: 'Admin', icon: 'shield', color: 'purple' },
    doctor: { title: 'Doctor', icon: 'stethoscope', color: 'cyan' },
    receptionist: { title: 'Receptionist', icon: 'user-check', color: 'emerald' },
    patient: { title: 'Patient', icon: 'user', color: 'orange' }
  };

  const config = roleConfig[role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary-color)] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-color)] rounded-full mb-4">
            <div className={`icon-${config.icon} text-3xl text-white`}></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{config.title} Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <div className="icon-alert-circle text-xl mr-2"></div>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="index.html" className="text-[var(--primary-color)] hover:underline text-sm">
              Back to Home
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo credentials: {role} / {role}123</p>
        </div>
      </div>
    </div>
  );
}