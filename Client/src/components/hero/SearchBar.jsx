import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
  className = "",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 w-full ${className}`}
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full pl-12"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchBar;