"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import PaymentFilter from "../dependencies/components/PaymentFilter";
import { useAdminPaymentsQuery } from "../dependencies/hooks/usePaymentQuery";
import { useAdminPaymentsColumns } from "../dependencies/table/AdminPaymentsTableColumn";

const AdminTransactionsPage = () => {
  const { data, isError, error, isFetching } = useAdminPaymentsQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminPaymentsColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Transactions"
          description="Every payment that moved through the gateway."
        />

        <PaymentFilter showSearch />
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
          emptyMessage="No transactions match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default AdminTransactionsPage;
