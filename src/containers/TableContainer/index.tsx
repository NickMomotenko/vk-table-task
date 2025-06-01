import { useEffect, useRef, useState } from "react";
import { useUsers } from "../../context/UserContext";
import { Container } from "../../components/Container";
import Table from "../../components/Table";
import { InfiniteBlock } from "../../components/InfiniteBlock";

const LIMIT = 20;

export const TableContainer = () => {
  const { users, setUsers } = useUsers();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchPosts = async (pageNumber: number) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/users?_page=${pageNumber}&_limit=${LIMIT}&_sort=id&_order=asc`
      );
      const data = await res.json();

      setUsers((prev) => {
        const newIds = data.map((d: any) => d.id);
        const isAlreadyLoaded = prev.some((u: any) => newIds.includes(u.id));
        return isAlreadyLoaded ? prev : [...prev, ...data];
      });

      setHasMore(data.length === LIMIT);
    } catch (err) {
      alert("Возможно ты не запустил сервер db или что то пошло не так");
      console.error("Ошибка:", err);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !isFetchingRef.current &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    });

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore]);

  return (
    <Container>
      <Table data={users} />
      <InfiniteBlock ref={loaderRef} isLoading={isLoading} hasMore={hasMore} />
    </Container>
  );
};
