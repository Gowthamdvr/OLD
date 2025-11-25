function Header() {
  try {
    const navigate = (page) => {
      window.location.href = page;
    };

    return (
      <header className="bg-white border-b border-[var(--border-color)] sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('index.html')}>
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-heart-pulse text-xl text-white"></div>
              </div>
              <span className="text-2xl font-bold text-[var(--primary-color)]">MediCare</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('login_patient.html')} className="px-4 py-2 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] rounded-lg font-medium transition-colors">
                Patient
              </button>
              <button onClick={() => navigate('login_doctor.html')} className="px-4 py-2 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] rounded-lg font-medium transition-colors">
                Doctor
              </button>
              <button onClick={() => navigate('login_receptionist.html')} className="px-4 py-2 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] rounded-lg font-medium transition-colors">
                Receptionist
              </button>
              <button onClick={() => navigate('login_admin.html')} className="btn-primary">
                Admin
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}