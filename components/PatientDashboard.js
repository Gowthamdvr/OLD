function PatientDashboard() {
  try {
    const [view, setView] = React.useState('book');
    const [appointments, setAppointments] = React.useState([]);
    const [doctors, setDoctors] = React.useState([]);

    React.useEffect(() => {
      loadDoctors();
      loadAppointments();
    }, []);

    const loadDoctors = async () => {
      const result = await trickleListObjects('doctor', 50, true);
      setDoctors(result.items);
    };

    const loadAppointments = async () => {
      const result = await trickleListObjects('appointment', 50, true);
      setAppointments(result.items);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 py-8" data-name="patient-dashboard" data-file="components/PatientDashboard.js">
        <div className="flex space-x-4 mb-6">
          <button onClick={() => setView('book')} className={`px-6 py-2 rounded-lg font-medium ${view === 'book' ? 'bg-[var(--primary-color)] text-white' : 'bg-white'}`}>
            Book Appointment
          </button>
          <button onClick={() => setView('history')} className={`px-6 py-2 rounded-lg font-medium ${view === 'history' ? 'bg-[var(--primary-color)] text-white' : 'bg-white'}`}>
            My Appointments
          </button>
        </div>

        {view === 'book' ? (
          <BookingForm doctors={doctors} onSuccess={loadAppointments} />
        ) : (
          <AppointmentHistory appointments={appointments} onUpdate={loadAppointments} />
        )}
      </div>
    );
  } catch (error) {
    console.error('PatientDashboard error:', error);
    return null;
  }
}