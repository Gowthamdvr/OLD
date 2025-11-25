const Auth = {
  getCurrentUser: () => {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  checkAuth: (requiredRole) => {
    const user = Auth.getCurrentUser();
    if (!user) {
      window.location.href = `login_${requiredRole}.html`;
      return false;
    }
    if (user.objectData.role !== requiredRole) {
      window.location.href = `login_${requiredRole}.html`;
      return false;
    }
    return true;
  },

  logout: () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
};