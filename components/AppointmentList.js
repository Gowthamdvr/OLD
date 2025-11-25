function AppointmentList({ appointments, onUpdate }) {
  try {
    const handleDelete = async (id) => {
      if (confirm('Delete this appointment?')) {
        try {
          await trickleDeleteObject('appointment', id);
          onUpdate();
        } catch (error) {
          alert('Failed to delete appointment');
        }
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-8" data-name="appointment-list" data-file="components/AppointmentList.js">
        <h2 className="text-2xl font-bold mb-6">All Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Doctor</th>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(apt => (
                  <tr key={apt.objectId} className="border-t">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{apt.objectData.patientName}</p>
                        <p className="text-sm text-gray-500">{apt.objectData.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{apt.objectData.doctorName}</p>
                        <p className="text-sm text-gray-500">{apt.objectData.specialty}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{apt.objectData.date} {apt.objectData.time}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${apt.objectData.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {apt.objectData.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(apt.objectId)} className="text-red-600 hover:text-red-800">
                        <div className="icon-trash text-lg"></div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AppointmentList error:', error);
    return null;
  }
}