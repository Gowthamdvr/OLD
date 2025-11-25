function Hero() {
  try {
    return (
      <section className="bg-gradient-to-br from-[var(--secondary-color)] to-white py-20" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
                Book Your Doctor Appointment Online
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8">
                Simple, fast, and efficient healthcare appointment management system. 
                Schedule your visit with ease and manage your healthcare better.
              </p>
              <div className="flex space-x-4">
                <button onClick={() => window.location.href = 'login_patient.html'} className="btn-primary text-lg">
                  Book Appointment
                </button>
                <button onClick={() => window.location.href = 'login_admin.html'} className="px-6 py-3 bg-white text-[var(--primary-color)] border-2 border-[var(--primary-color)] rounded-lg font-medium hover:bg-[var(--secondary-color)] text-lg">
                  Admin Portal
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-[var(--secondary-color)] rounded-full flex items-center justify-center">
                    <div className="icon-calendar-check text-4xl text-[var(--primary-color)]"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Quick Booking</h3>
                <p className="text-center text-[var(--text-secondary)]">
                  Get instant access to available doctors and book appointments in just a few clicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}