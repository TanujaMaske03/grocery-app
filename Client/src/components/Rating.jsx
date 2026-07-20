import PropTypes from "prop-types";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value = 0, totalReviews = 0, size = "text-lg" }) => {
  const renderStar = (index) => {
    if (value >= index) {
      return <FaStar className="text-yellow-400" />;
    }

    if (value >= index - 0.5) {
      return <FaStarHalfAlt className="text-yellow-400" />;
    }

    return <FaRegStar className="text-yellow-400" />;
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{renderStar(star)}</span>
        ))}
      </div>

      <span className="text-sm text-gray-500">
        ({totalReviews} Reviews)
      </span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  totalReviews: PropTypes.number,
  size: PropTypes.string,
};

export default Rating;