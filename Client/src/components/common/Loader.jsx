const Loader = ({
  text = "Loading...",
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-50">
        <span className="loading loading-spinner loading-lg text-success"></span>

        <p className="mt-4 text-lg font-medium">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <span className="loading loading-spinner loading-lg text-success"></span>

      <p className="mt-3 text-base font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;