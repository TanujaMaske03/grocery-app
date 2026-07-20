import PropTypes from "prop-types";

const CategoryCard = ({
  category,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Category Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Category Name */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {category.name}
        </h2>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default CategoryCard;