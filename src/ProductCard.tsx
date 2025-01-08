import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [result, setresult] = useState<Product[]>([]);

  useEffect(() => {
    fetch("../public/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleSearch = () => {
    let res = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (res.length != 0) {
      setresult(res);
    } else {
      res = [];
      setresult(res);
    }
  };

  return (
    <main>
      <input
        type="text"
        id="searchBar"
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {result.length > 0 ? (
        result.map((product) => (
          <div className="resultCard" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div id="stats">
              <p>ID: {product.id}</p>
              <p>NAME: {product.name}</p>
              <p>PRICE: {product.price}</p>
              <p>CATEGORY: {product.category}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "red" }}>No Product Found with the given name</p>
      )}
    </main>
  );
};

export default ProductCard;
