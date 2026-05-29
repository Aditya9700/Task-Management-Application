/* src/services/authService.js */
import api from './api';

const USER_KEY = 'aerotask_user';
const TOKEN_KEY = 'aerotask_token';

export const authService = {
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error('Please fill in all fields');
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      const { data } = response.data;

      // Persist profile customizations locally since they aren't stored in basic user schema on backend
      const userRole = localStorage.getItem(`${USER_KEY}_role_${data._id}`) || 
                       (email.toLowerCase() === 'admin@aerotask.com' ? 'Product Lead' : 'Software Engineer');
      const userBio = localStorage.getItem(`${USER_KEY}_bio_${data._id}`) || 
                      (email.toLowerCase() === 'admin@aerotask.com' ? 'Designing the future of collaborative workspaces at AeroTask Inc.' : 'Ready to manage tasks efficiently and build beautiful products.');

      const sessionUser = {
        id: data._id,
        name: data.name,
        email: data.email,
        avatar: '', // Fallback to initials
        role: userRole,
        bio: userBio,
        createdTasksCount: email.toLowerCase() === 'admin@aerotask.com' ? 12 : 0,
        completedTasksCount: email.toLowerCase() === 'admin@aerotask.com' ? 8 : 0
      };

      localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
      localStorage.setItem(TOKEN_KEY, data.token);

      return sessionUser;
    } catch (err) {
      // SMART FALLBACK SEEDING: If this is the portfolio demo user and they don't exist yet, auto-register
      if (email.toLowerCase() === 'admin@aerotask.com' && password === 'password') {
        console.log('Demo admin account not found on backend. Seeding admin user automatically...');
        try {
          // Register the admin account
          await api.post('/auth/register', {
            name: 'Alex Rivera',
            email: 'admin@aerotask.com',
            password: 'password'
          });

          // Log in with the newly registered user
          const retryResponse = await api.post('/auth/login', { email, password });
          const { data } = retryResponse.data;

          const sessionUser = {
            id: data._id,
            name: data.name,
            email: data.email,
            avatar: '',
            role: 'Product Lead',
            bio: 'Designing the future of collaborative workspaces at AeroTask Inc.',
            createdTasksCount: 12,
            completedTasksCount: 8
          };

          localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
          localStorage.setItem(TOKEN_KEY, data.token);

          return sessionUser;
        } catch (seedError) {
          console.error('Failed to auto-seed demo admin user:', seedError);
          throw new Error('Portfolio demo auto-creation failed: ' + seedError.message);
        }
      }
      throw err;
    }
  },

  register: async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const response = await api.post('/auth/register', { name, email, password });
    const { data } = response.data;

    // Build session user object with synthesized default properties
    const sessionUser = {
      id: data._id,
      name: data.name,
      email: data.email,
      avatar: '',
      role: 'Software Engineer',
      bio: 'Ready to manage tasks efficiently and build beautiful products.',
      createdTasksCount: 0,
      completedTasksCount: 0
    };

    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    localStorage.setItem(TOKEN_KEY, data.token);

    return sessionUser;
  },

  logout: async () => {
    // Clear user session cache
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    return true;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  updateProfile: async (updatedFields) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('Not authenticated');

    // Save profile customizations like job role & bio locally in a user-specific storage key
    if (updatedFields.role !== undefined) {
      localStorage.setItem(`${USER_KEY}_role_${currentUser.id}`, updatedFields.role);
    }
    if (updatedFields.bio !== undefined) {
      localStorage.setItem(`${USER_KEY}_bio_${currentUser.id}`, updatedFields.bio);
    }

    const updatedUser = {
      ...currentUser,
      ...updatedFields
    };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
};
