import { Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';

export const UserCard = ({ user, onEdit, onDelete, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.department}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Mail size={16} className="mr-3 text-gray-400" />
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={16} className="mr-3 text-gray-400" />
          <span className="text-sm">{user.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-3 text-gray-400" />
          <span className="text-sm">{user.address}</span>
        </div>
      </div>

      {user.skills && user.skills.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};