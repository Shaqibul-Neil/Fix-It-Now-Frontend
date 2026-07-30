"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ReviewFilter from "../dependencies/components/ReviewFilter";
import { useAdminReviewsQuery } from "../dependencies/hooks/useReviewQuery";
import { useAdminReviewsColumns } from "../dependencies/table/AdminReviewsTableColumn";

const AdminReviewsPage = () => {
  const { data, isError, error, isFetching } = useAdminReviewsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminReviewsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Reviews"
          description="Every review lands here as pending. Publish it to put it on the technician's profile."
        />

        <ReviewFilter showSearch showStatus />
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
          emptyMessage="No reviews match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default AdminReviewsPage;
