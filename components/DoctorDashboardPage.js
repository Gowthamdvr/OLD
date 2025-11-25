function DoctorDashboardPage() {
  try {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      const currentUser = sessionStorage.getItem('currentUser');
      if (!currentUser) {
        window.location.href = 'login_doctor.html';
        return;
      }
      const userData = JSON.parse(currentUser);
      if (userData.objectData.role !== 'doctor') {
        window.location.href = 'login_doctor.html';
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
                <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
                <p className="text-cyan-200 mt-1">Welcome, Doctor</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-cyan-200 text-sm">{user.objectData.fullName}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-[var(--primary-color)] rounded-lg hover:bg-cyan-50">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <button onClick={() => navigate('doctor_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-calendar-check text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">My Appointments</h3>
              <p className="text-gray-600 text-sm mt-2">View your scheduled appointments</p>
            </button>

            <button onClick={() => navigate('doctor_portal.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-check-circle text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Approve/Reject</h3>
              <p className="text-gray-600 text-sm mt-2">Manage appointment requests</p>
            </button>

            <button className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-clock text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Availability</h3>
              <p className="text-gray-600 text-sm mt-2">Coming soon</p>
            </button>

            <button className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-file-plus text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Prescriptions</h3>
              <p className="text-gray-600 text-sm mt-2">Coming soon</p>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DoctorDashboardPage error:', error);
    return null;
  }
}