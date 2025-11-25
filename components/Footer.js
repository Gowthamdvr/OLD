function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-primary)] text-white py-8" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-heart-pulse text-lg text-white"></div>
              </div>
              <span className="text-xl font-bold">MediCare</span>
            </div>
            <p className="text-gray-400">Medical Appointment Management System</p>
            <p className="text-gray-500 text-sm mt-4">© 2025 MediCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}