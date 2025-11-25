class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login_admin.html';
      return null;
    }
    const userData = JSON.parse(currentUser);
    if (userData.objectData.role !== 'admin') {
      window.location.href = 'login_admin.html';
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AdminDashboard />
      </div>
    );
  } catch (error) {
    console.error('App error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);