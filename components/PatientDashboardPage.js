function PatientDashboardPage() {
  try {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      const currentUser = sessionStorage.getItem('currentUser');
      if (!currentUser) {
        window.location.href = 'login_patient.html';
        return;
      }
      const userData = JSON.parse(currentUser);
      if (userData.objectData.role !== 'patient') {
        window.location.href = 'login_patient.html';
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
                <h1 className="text-3xl font-bold">Patient Dashboard</h1>
                <p className="text-orange-200 mt-1">Welcome, Patient</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-orange-200 text-sm">{user.objectData.fullName}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-[var(--primary-color)] rounded-lg hover:bg-orange-50">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <button onClick={() => navigate('patient_booking.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-calendar-plus text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Book Appointment</h3>
              <p className="text-gray-600 text-sm mt-2">Schedule a new appointment</p>
            </button>

            <button onClick={() => navigate('patient_booking.html')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-history text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Appointment Status</h3>
              <p className="text-gray-600 text-sm mt-2">View your appointment history</p>
            </button>

            <button className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-user text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">My Profile</h3>
              <p className="text-gray-600 text-sm mt-2">Coming soon</p>
            </button>

            <button className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="icon-file-down text-2xl text-[var(--primary-color)]"></div>
              </div>
              <h3 className="font-bold text-lg">Prescriptions</h3>
              <p className="text-gray-600 text-sm mt-2">Coming soon</p>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientDashboardPage error:', error);
    return null;
  }
}