function ReceptionistDashboard() {
  try {
    const [doctors, setDoctors] = React.useState([]);
    const [formData, setFormData] = React.useState({
      patientName: '', email: '', phone: '', doctorId: '', date: '', time: '', reason: ''
    });
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
      loadDoctors();
    }, []);

    const loadDoctors = async () => {
      const result = await trickleListObjects('doctor', 50, true);
      setDoctors(result.items);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
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
        
        setMessage('Walk-in appointment created successfully!');
        setFormData({ patientName: '', email: '', phone: '', doctorId: '', date: '', time: '', reason: '' });
      } catch (error) {
        setMessage('Failed to create appointment');
      }
    };

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Receptionist Portal</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Add Walk-in Appointment</h2>
            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Patient Name" required value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" placeholder="Email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" />
              <input type="tel" placeholder="Phone" required value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" />
              <select required value={formData.doctorId}
                onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select Doctor</option>
                {doctors.map(doc => (
                  <option key={doc.objectId} value={doc.objectId}>
                    {doc.objectData.name} - {doc.objectData.specialty}
                  </option>
                ))}
              </select>
              <input type="date" required value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" />
              <input type="time" required value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" />
              <textarea placeholder="Reason for visit" required value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
              <button type="submit" className="btn-primary w-full">Create Appointment</button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
            <div className="space-y-4">
              {doctors.map(doc => (
                <div key={doc.objectId} className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg">{doc.objectData.name}</h3>
                  <p className="text-gray-600">{doc.objectData.specialty}</p>
                  <p className="text-sm text-gray-500 mt-2">Available: {doc.objectData.availability}</p>
                  <p className="text-sm text-gray-500">Experience: {doc.objectData.experience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ReceptionistDashboard error:', error);
    return null;
  }
}