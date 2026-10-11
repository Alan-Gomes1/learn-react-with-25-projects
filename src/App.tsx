import "./App.css";
import Accordion from "./components/Accodion";
import ImageSlider from "./components/ImageSlider";
import LoadMoreData from "./components/LoadMoreData";
import RandomColor from "./components/RandomColor";
import StarRating from "./components/StarRating";

function App() {
  return (
    <>
      <Accordion />
      <RandomColor />
      <StarRating numOfStar={10} />
      <ImageSlider url={"https://picsum.photos/v2/list"} page={1} limit={10} />
      <LoadMoreData />
    </>
  );
}

export default App;
