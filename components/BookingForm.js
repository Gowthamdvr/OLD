function BookingForm({ doctors, onSuccess }) {
  try {
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
        setFormData({ patientName: '', email: '', phone: '', doctorId: '', date: '', time: '', reason: '' });
        onSuccess();
      } catch (error) {
        setMessage('Failed to book appointment. Please try again.');
      }
      setLoading(false);
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-8" data-name="booking-form" data-file="components/BookingForm.js">
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
    );
  } catch (error) {
    console.error('BookingForm error:', error);
    return null;
  }
}