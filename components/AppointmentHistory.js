function AppointmentHistory({ appointments, onUpdate }) {
  try {
    const handleCancel = async (id) => {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        try {
          await trickleUpdateObject('appointment', id, { status: 'Cancelled' });
          onUpdate();
        } catch (error) {
          alert('Failed to cancel appointment');
        }
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-8" data-name="appointment-history" data-file="components/AppointmentHistory.js">
        <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments found</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(apt => (
              <div key={apt.objectId} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{apt.objectData.doctorName}</h3>
                  <p className="text-gray-600">{apt.objectData.specialty}</p>
                  <p className="text-sm text-gray-500">{apt.objectData.date} at {apt.objectData.time}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${apt.objectData.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {apt.objectData.status}
                  </span>
                </div>
                {apt.objectData.status === 'Scheduled' && (
                  <button onClick={() => handleCancel(apt.objectId)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AppointmentHistory error:', error);
    return null;
  }
}