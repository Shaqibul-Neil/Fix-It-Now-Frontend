"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import PaymentFilter from "../dependencies/components/PaymentFilter";
import { useCustomerPaymentsQuery } from "../dependencies/hooks/usePaymentQuery";
import { useCustomerPaymentsColumns } from "../dependencies/table/CustomerPaymentsTableColumn";

const CustomerPaymentsPage = () => {
  const { data, isError, error, isFetching } = useCustomerPaymentsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useCustomerPaymentsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="My payments"
          description="Every payment you have made for a booking."
        />

        <PaymentFilter />
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
          emptyMessage="No payments match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default CustomerPaymentsPage;
