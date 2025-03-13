import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface HookReturnType {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const usePage1Hook = (): HookReturnType => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      try {
        // Sample data
        const sampleData: Product[] = [
          { id: 1, name: "Product A", price: 100 },
          { id: 2, name: "Product B", price: 200 },
        ];
        setData(sampleData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return { data, loading, error }; // ✅ Now returns `loading` and `error`
};

export default usePage1Hook;
