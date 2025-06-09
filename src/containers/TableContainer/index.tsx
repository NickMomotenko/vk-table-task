import { useUsers } from "../../context/UserContext";

import { Container } from "../../components/Container";
import { InfiniteBlock } from "../../components/InfiniteBlock";

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

import Table from "../../components/Table";

const LIMIT = 20;

export const TableContainer = () => {
  const { users, setUsers } = useUsers();

  const { isLoading, hasMore, loaderRef } = useInfiniteScroll({
    fetchData: async (page) => {
      const res = await fetch(
        `http://localhost:3000/users?_page=${page}&_limit=${LIMIT}&_sort=id&_order=asc`
      );
      const json = await res.json();
      setUsers((prev) => [...prev, ...json]);
      return json;
    },
    limit: LIMIT,
  });

  return (
    <Container>
      <Table data={users} />
      <InfiniteBlock ref={loaderRef} isLoading={isLoading} hasMore={hasMore} />
    </Container>
  );
};
