"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ReviewFilter from "../dependencies/components/ReviewFilter";
import { useCustomerReviewsQuery } from "../dependencies/hooks/useReviewQuery";
import { useCustomerReviewsColumns } from "../dependencies/table/CustomerReviewsTableColumn";

const CustomerReviewsPage = () => {
  const { data, isError, error, isFetching } = useCustomerReviewsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useCustomerReviewsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="My reviews"
          description="Everything you have written about the technicians you hired."
        />

        <ReviewFilter showStatus />
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
          emptyMessage="You have not reviewed a completed booking yet."
        />
      )}

      {modals}
    </section>
  );
};

export default CustomerReviewsPage;
