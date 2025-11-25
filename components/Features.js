function Features() {
  try {
    const features = [
      { icon: 'user-search', title: 'Find Doctors', description: 'Browse through our list of qualified doctors and specialists' },
      { icon: 'calendar-days', title: 'Easy Scheduling', description: 'Book appointments at your convenient date and time' },
      { icon: 'clock', title: 'View History', description: 'Track all your past and upcoming appointments' },
      { icon: 'shield-check', title: 'Secure System', description: 'Your medical data is safe and confidential' }
    ];

    return (
      <section className="py-20 bg-white" data-name="features" data-file="components/Features.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Simple and efficient healthcare management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[var(--secondary-color)] rounded-xl flex items-center justify-center">
                    <div className={`icon-${feature.icon} text-3xl text-[var(--primary-color)]`}></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}