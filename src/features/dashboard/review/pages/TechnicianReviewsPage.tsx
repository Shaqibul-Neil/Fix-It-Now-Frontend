"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ReviewFilter from "../dependencies/components/ReviewFilter";
import { useTechnicianReviewsQuery } from "../dependencies/hooks/useReviewQuery";
import { useTechnicianReviewsColumns } from "../dependencies/table/TechnicianReviewsTableColumn";

const TechnicianReviewsPage = () => {
  const { data, isError, error, isFetching } = useTechnicianReviewsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useTechnicianReviewsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="My reviews"
          description="What your customers wrote after a completed job. Only published reviews count towards your rating."
        />

        <ReviewFilter />
      </div>

      {isFetching && <TableSkeleton />}

      {isError && !isFetching && <AppError message={error?.message} />}

      {data && !isError && !isFetching && (
        <PaginatedTable
          data={data.items}
          columns={columns}
          total={data.total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          emptyMessage="No published reviews yet."
        />
      )}

      {modals}
    </section>
  );
};

export default TechnicianReviewsPage;
