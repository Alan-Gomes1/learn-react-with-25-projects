import { useEffect, useState } from "react";
import "./styles.css";

type Product = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const skip = count === 0 ? 0 : count * 20;
        const url = `https://dummyjson.com/products?limit=20&skip=${skip}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        if (data && data.products && data.products.length) {
          setProducts((prev) => [...prev, ...data.products]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [count]);

  const disableButton = products.length >= 100;

  if (loading) {
    return <div>Loading data, please wait!</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item, idx) => (
              <div className="product" key={idx}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-conatiner">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableButton ? <p>You have reached to 100 products</p> : null}
      </div>
    </div>
  );
}
