import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

const usePage11Hook = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: Product[] = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data. Please check your API.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default usePage11Hook;
