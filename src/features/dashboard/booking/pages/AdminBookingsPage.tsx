"use client";

import { AppError, PageHeader, PaginatedTable, TableSkeleton } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import BookingFilter from "../dependencies/components/BookingFilter";
import { useAdminBookingsQuery } from "../dependencies/hooks/useBookingQuery";
import { useAdminBookingsColumns } from "../dependencies/table/AdminBookingsTableColumn";

const AdminBookingsPage = () => {
  const { data, isError, error, isFetching } = useAdminBookingsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminBookingsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="All bookings"
          description="Every booking on the platform, newest first."
        />

        <BookingFilter />
      </div>

      {/* Every fetch shows the skeleton — a filter change reads as a reload,
          not a spinner beside the input. */}
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
          emptyMessage="No bookings match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default AdminBookingsPage;
