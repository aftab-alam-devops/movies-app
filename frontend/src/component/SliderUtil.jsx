import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data = [] }) => {
  const settings = {
    dots: true,
    infinite: data.length > 4,   // prevent crash if less items
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  // Safety check
  if (!Array.isArray(data)) {
    console.log("Invalid data passed to SliderUtil:", data);
    return <div>No data available</div>;
  }

  return (
    <Slider {...settings}>
      {data.map((movie) => (
        <div key={movie._id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderUtil;