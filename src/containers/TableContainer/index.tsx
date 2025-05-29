import { useEffect, useState, useRef, useCallback } from "react";
import Table from "../../components/Table";
import { Container } from "../../components/Container";

const LIMIT = 20;

export const TableContainer = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchPosts = useCallback(async (pageNumber: number) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/users?_page=${pageNumber}&_limit=${LIMIT}&_sort=idNum&_order=asc`
      );
      if (!response.ok) throw new Error("Ошибка сети: " + response.status);

      const fetchedData = await response.json();
      setData((prev) => [...prev, ...fetchedData]);
      setHasMore(fetchedData.length === LIMIT);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !isLoading &&
        !isFetchingRef.current 
      ) {
        setPage((prev) => prev + 1);
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isLoading]);

  return (
    <Container>
      <Table data={data} />
      <div ref={loaderRef} style={{ height: 40, textAlign: "center" }}>
        {isLoading && "Загрузка..."}
        {!hasMore && "Данных больше нет"}
      </div>
    </Container>
  );
};
