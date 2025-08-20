const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  );
};

export default Loading;