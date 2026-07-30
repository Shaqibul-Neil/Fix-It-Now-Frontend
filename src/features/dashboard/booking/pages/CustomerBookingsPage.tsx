"use client";

import { Plus } from "lucide-react";
import {
  AppButton,
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import BookingFilter from "../dependencies/components/BookingFilter";
import { useCustomerBookingsQuery } from "../dependencies/hooks/useBookingQuery";
import { useCustomerBookingsColumns } from "../dependencies/table/CustomerBookingsTableColumn";

const CustomerBookingsPage = () => {
  const { data, isError, error, isFetching } = useCustomerBookingsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useCustomerBookingsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="My bookings"
          description="Track every job you have booked and pay once it is accepted."
        />

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
          <BookingFilter />

          {/* A booking needs a service, so this goes to the catalogue rather
              than opening an empty form. */}
          <AppButton
            href="/dashboard/customer/services"
            text="New booking"
            leftIcon={Plus}
            className="shrink-0"
          />
        </div>
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
          emptyMessage="You have no bookings yet."
        />
      )}

      {modals}
    </section>
  );
};

export default CustomerBookingsPage;
