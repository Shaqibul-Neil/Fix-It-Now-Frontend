"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import BookingFilter from "../dependencies/components/BookingFilter";
import { useTechnicianBookingsQuery } from "../dependencies/hooks/useBookingQuery";
import { useTechnicianBookingsColumns } from "../dependencies/table/TechnicianBookingsTableColumn";

const TechnicianJobsPage = () => {
  const { data, isError, error, isFetching } = useTechnicianBookingsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useTechnicianBookingsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Your jobs"
          description="Accept new requests and move active jobs along."
        />

        <BookingFilter />
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
          emptyMessage="No jobs match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default TechnicianJobsPage;
