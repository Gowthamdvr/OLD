function AdminDashboardPage() {
  try {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      const currentUser = sessionStorage.getItem('currentUser');
      if (!currentUser) {
        window.location.href = 'login_admin.html';
        return;
      }
      const userData = JSON.parse(currentUser);
      if (userData.objectData.role !== 'admin') {
        window.location.href = 'login_admin.html';
        return;
      }
      setUser(userData);
    }, []);

    const navigate = (page) => {
      window.location.href = page;
    };

    const handleLogout = () => {
      sessionStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    };

    if (!user) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-[var(--primary-color)] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-purple-200 mt-1">Welcome, Administrator</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-purple-200 text-sm">{user.objectData.fullName}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-[var(--primary-color)] rounded-lg hover:bg-purple-50">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <button onClick={() => navigate('admin_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-users text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Manage Patients</h3>
              <p className="text-gray-600 text-sm mt-2">View and manage patient records</p>
            </button>

            <button onClick={() => navigate('admin_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-stethoscope text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Manage Doctors</h3>
              <p className="text-gray-600 text-sm mt-2">Add or edit doctor profiles</p>
            </button>

            <button onClick={() => navigate('admin_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-calendar text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Appointments</h3>
              <p className="text-gray-600 text-sm mt-2">View all system appointments</p>
            </button>

            <button onClick={() => navigate('admin_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-file-text text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Reports</h3>
              <p className="text-gray-600 text-sm mt-2">Generate PDF reports</p>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminDashboardPage error:', error);
    return null;
  }
}