function DoctorDashboard() {
  try {
    const [user, setUser] = React.useState(null);
    const [appointments, setAppointments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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
      loadAppointments(userData.objectData.fullName);
    }, []);

    const loadAppointments = async (doctorName) => {
      try {
        setLoading(true);
        const result = await trickleListObjects('appointment', 100, true);
        const filtered = result.items.filter(apt => 
          apt.objectData.doctorName === doctorName
        );
        setAppointments(filtered);
      } catch (error) {
        console.error('Failed to load appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleApprove = async (id, action) => {
      try {
        await trickleUpdateObject('appointment', id, { 
          status: action === 'approve' ? 'Approved' : 'Rejected' 
        });
        loadAppointments(user.objectData.fullName);
      } catch (error) {
        alert('Failed to update appointment');
      }
    };

    const handleLogout = () => {
      sessionStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    };

    if (!user) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Dr. {user.objectData.fullName}</h1>
            <p className="text-gray-600">Doctor Portal</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => window.location.href = 'doctor_dashboard.html'} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
              Dashboard
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments</p>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.objectId} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{apt.objectData.patientName}</h3>
                      <p className="text-sm text-gray-600">{apt.objectData.reason}</p>
                      <p className="text-sm text-gray-500">{apt.objectData.date} at {apt.objectData.time}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                        apt.objectData.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                        apt.objectData.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {apt.objectData.status}
                      </span>
                    </div>
                    {apt.objectData.status === 'Scheduled' && (
                      <div className="flex space-x-2">
                        <button onClick={() => handleApprove(apt.objectId, 'approve')} 
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                          Approve
                        </button>
                        <button onClick={() => handleApprove(apt.objectId, 'reject')} 
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('DoctorDashboard error:', error);
    return null;
  }
}
