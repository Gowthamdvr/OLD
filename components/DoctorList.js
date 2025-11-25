function DoctorList({ doctors, onUpdate }) {
  try {
    const [showForm, setShowForm] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', specialty: '', experience: '', availability: '' });

    const handleAdd = async (e) => {
      e.preventDefault();
      try {
        await trickleCreateObject('doctor', formData);
        setFormData({ name: '', specialty: '', experience: '', availability: '' });
        setShowForm(false);
        onUpdate();
      } catch (error) {
        alert('Failed to add doctor');
      }
    };

    const handleDelete = async (id) => {
      if (confirm('Delete this doctor?')) {
        try {
          await trickleDeleteObject('doctor', id);
          onUpdate();
        } catch (error) {
          alert('Failed to delete doctor');
        }
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-8" data-name="doctor-list" data-file="components/DoctorList.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Doctors</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Doctor'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Doctor Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Specialty" required value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} className="px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Experience (e.g., 10 years)" required value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Availability (e.g., Mon-Fri)" required value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} className="px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="btn-primary">Save Doctor</button>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {doctors.map(doc => (
            <div key={doc.objectId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{doc.objectData.name}</h3>
                  <p className="text-gray-600">{doc.objectData.specialty}</p>
                  <p className="text-sm text-gray-500 mt-2">Experience: {doc.objectData.experience}</p>
                  <p className="text-sm text-gray-500">Available: {doc.objectData.availability}</p>
                </div>
                <button onClick={() => handleDelete(doc.objectId)} className="text-red-600 hover:text-red-800">
                  <div className="icon-trash text-lg"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('DoctorList error:', error);
    return null;
  }
}