import { useEffect, useRef, useState } from "react";

type UseInfiniteScrollProps<T> = {
  fetchData: (page: number) => Promise<T[]>;
  limit: number;
};

export const useInfiniteScroll = <T,>({
  fetchData,
  limit,
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async (pageNum: number) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const newData = await fetchData(pageNum);

      setData((prev) => {
        const existingIds = new Set(prev.map((d: any) => d.id));
        const unique = newData.filter((d: any) => !existingIds.has(d.id));
        return [...prev, ...unique];
      });

      setHasMore(newData.length === limit);
    } catch (e) {
      console.error("Ошибка при загрузке данных:", e);
      alert('Ошибка при загрузке данных')
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMore(page);
  }, [page]);

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

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, isLoading]);

  return { data, isLoading, hasMore, loaderRef };
};
