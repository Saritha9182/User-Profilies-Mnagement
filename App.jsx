import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { Loader } from './components/Loader';
import { Plus, AlertCircle } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [users, setUsers] = useLocalStorage('userProfiles', []);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');

  // Simulate initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddUser = async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        ...userData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      
      setUsers(prev => [...prev, newUser]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...userData, id: user.id } : user
      ));
      
      setEditingUser(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (userData) => {
    if (editingUser) {
      handleEditUser(userData);
    } else {
      handleAddUser(userData);
    }
  };

  const openAddForm = () => {
    setEditingUser(null);
    setShowForm(true);
    setError('');
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setShowForm(true);
    setError('');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setError('');
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 ml-4 flex-shrink-0"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage your organization's user profiles</p>
            </div>
            <button
              onClick={openAddForm}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
            >
              <Plus size={20} className="mr-2" />
              Add User
            </button>
          </div>

          <UserList
            users={users}
            onEdit={openEditForm}
            onDelete={handleDeleteUser}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterDepartment={filterDepartment}
            onFilterChange={setFilterDepartment}
          />
        </div>

        {/* User Form Modal */}
        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;