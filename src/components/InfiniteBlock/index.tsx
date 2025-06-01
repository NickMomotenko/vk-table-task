import { forwardRef } from "react";

import './styles.scss'

interface InfiniteBlockProps {
  isLoading?: boolean;
  hasMore?: boolean;
}

export const InfiniteBlock = forwardRef<HTMLDivElement, InfiniteBlockProps>(
  ({ isLoading, hasMore }, ref) => {
    return (
      <div ref={ref} className="infinite-scroll" data-testid="infinite-block">
        {isLoading && "Загрузка..."}
        {!hasMore && "Данных больше нет"}
      </div>
    );
  }
);
