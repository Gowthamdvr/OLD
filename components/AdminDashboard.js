function AdminDashboard() {
  try {
    const [view, setView] = React.useState('appointments');
    const [appointments, setAppointments] = React.useState([]);
    const [doctors, setDoctors] = React.useState([]);
    const [stats, setStats] = React.useState({ total: 0, scheduled: 0, cancelled: 0 });

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      const appts = await trickleListObjects('appointment', 100, true);
      const docs = await trickleListObjects('doctor', 100, true);
      setAppointments(appts.items);
      setDoctors(docs.items);
      
      const scheduled = appts.items.filter(a => a.objectData.status === 'Scheduled').length;
      const cancelled = appts.items.filter(a => a.objectData.status === 'Cancelled').length;
      setStats({ total: appts.items.length, scheduled, cancelled });
    };

    return (
      <div className="max-w-7xl mx-auto px-4 py-8" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="icon-calendar text-2xl text-blue-600"></div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-check-circle text-2xl text-green-600"></div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Scheduled</p>
                <p className="text-3xl font-bold">{stats.scheduled}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="icon-x-circle text-2xl text-red-600"></div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>
                <p className="text-3xl font-bold">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button onClick={() => setView('appointments')} className={`px-6 py-2 rounded-lg font-medium ${view === 'appointments' ? 'bg-[var(--primary-color)] text-white' : 'bg-white'}`}>
              Appointments
            </button>
            <button onClick={() => setView('doctors')} className={`px-6 py-2 rounded-lg font-medium ${view === 'doctors' ? 'bg-[var(--primary-color)] text-white' : 'bg-white'}`}>
              Doctors
            </button>
          </div>
          <button onClick={() => generateReport(appointments, stats)} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2">
            <div className="icon-file-text text-lg"></div>
            <span>Generate Report</span>
          </button>
        </div>

        {view === 'appointments' ? (
          <AppointmentList appointments={appointments} onUpdate={loadData} />
        ) : (
          <DoctorList doctors={doctors} onUpdate={loadData} />
        )}
      </div>
    );
  } catch (error) {
    console.error('AdminDashboard error:', error);
    return null;
  }
}
