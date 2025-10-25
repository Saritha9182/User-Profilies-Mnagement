export const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Processing...
    </div>
  );
};