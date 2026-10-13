import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

type ImageSliderProps = {
  url: string;
  page: number;
  limit: number;
};

type ImageItem = {
  id: string;
  download_url: string;
};

export default function ImageSlider({ url, page, limit }: ImageSliderProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url === "") return;

    const controller = new AbortController();

    async function loadImages() {
      setLoading(true);
      setErrorMsg("");

      try {
        const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data: ImageItem[] = await response.json();
        setImages(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMsg(
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadImages();
    return () => controller.abort();
  }, [url, page, limit]);

  if (loading) {
    return <div>Loading data, please wait!</div>;
  }

  if (errorMsg !== "") {
    return <div>Error ocurred: {errorMsg}</div>;
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <div className="container">
      <div className="content">
        <BsArrowLeftCircleFill
          style={{ cursor: "pointer" }}
          onClick={handlePrevious}
          className="arrow arrow-left"
        />
        {images && images.length
          ? images.map((item, idx) => (
              <img
                key={item.id}
                alt={item.download_url}
                src={item.download_url}
                className={
                  currentSlide === idx
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))
          : null}
        <BsArrowRightCircleFill
          style={{ cursor: "pointer" }}
          onClick={handleNext}
          className="arrow arrow-right"
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, idx) => (
                <button
                  key={idx}
                  className={
                    currentSlide == idx
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                  onClick={() => setCurrentSlide(idx)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
}
