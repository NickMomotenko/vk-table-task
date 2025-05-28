import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Container } from "../../components/Container";

export const TableContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Ошибка сети: " + response.status);
        }
        const fetchedData = await response.json();
        console.log(fetchedData);

        setData(fetchedData);
      } catch (error) {
        console.log(222);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Table data={data} />
    </Container>
  );
};
