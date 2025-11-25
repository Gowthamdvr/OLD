function PatientBookingPage() {
  try {
    const [user, setUser] = React.useState(null);
    const [view, setView] = React.useState('book');
    const [doctors, setDoctors] = React.useState([]);
    const [appointments, setAppointments] = React.useState([]);
    const [formData, setFormData] = React.useState({
      patientName: '',
      email: '',
      phone: '',
      doctorId: '',
      date: '',
      time: '',
      reason: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

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
      setFormData({
        ...formData,
        patientName: userData.objectData.fullName,
        email: userData.objectData.email
      });
      loadDoctors();
      loadAppointments();
    }, []);

    const loadDoctors = async () => {
      const result = await trickleListObjects('doctor', 50, true);
      setDoctors(result.items);
    };

    const loadAppointments = async () => {
      const result = await trickleListObjects('appointment', 100, true);
      setAppointments(result.items);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      try {
        const doctor = doctors.find(d => d.objectId === formData.doctorId);
        await trickleCreateObject('appointment', {
          patientName: formData.patientName,
          email: formData.email,
          phone: formData.phone,
          doctorName: doctor?.objectData.name || '',
          specialty: doctor?.objectData.specialty || '',
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          status: 'Scheduled'
        });

        setMessage('Appointment booked successfully!');
        setFormData({ ...formData, doctorId: '', date: '', time: '', reason: '' });
        loadAppointments();
      } catch (error) {
        setMessage('Failed to book appointment. Please try again.');
      }
      setLoading(false);
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
                <h1 className="text-3xl font-bold">Patient Portal</h1>
                <p className="text-orange-200 mt-1">Welcome, {user.objectData.fullName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => window.location.href = 'patient_dashboard.html'} className="px-4 py-2 bg-white text-[var(--primary-color)] rounded-lg hover:bg-orange-50">
                  Dashboard
                </button>
                <button onClick={handleLogout} className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex space-x-4 mb-6">
            <button onClick={() => setView('book')} className={`px-6 py-2 rounded-lg font-medium ${view === 'book' ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-700'}`}>
              Book Appointment
            </button>
            <button onClick={() => setView('history')} className={`px-6 py-2 rounded-lg font-medium ${view === 'history' ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-700'}`}>
              My Appointments
            </button>
          </div>

          {view === 'book' ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Book New Appointment</h2>
              {message && <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required value={formData.patientName} onChange={(e) => setFormData({...formData, patientName: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="tel" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <select required value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Doctor</option>
                    {doctors.map(doc => <option key={doc.objectId} value={doc.objectId}>{doc.objectData.name} - {doc.objectData.specialty}</option>)}
                  </select>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <textarea placeholder="Reason for visit" required value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Booking...' : 'Book Appointment'}</button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
              <div className="space-y-4">
                {appointments.filter(apt => apt.objectData.email === user.objectData.email).map(apt => (
                  <div key={apt.objectId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{apt.objectData.doctorName}</h3>
                        <p className="text-gray-600">{apt.objectData.specialty}</p>
                        <p className="text-sm text-gray-500 mt-2">Date: {apt.objectData.date} at {apt.objectData.time}</p>
                        <p className="text-sm text-gray-500">Reason: {apt.objectData.reason}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${apt.objectData.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : apt.objectData.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {apt.objectData.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientBookingPage error:', error);
    return null;
  }
}