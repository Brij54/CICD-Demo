
import { useEffect, useState } from 'react';

const usePage11Hook = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/flightlist1', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
        //console.log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
    }
    };

    fetchData();
  }, []);

  return {
    data, isLoading
  };
};

export default usePage11Hook;