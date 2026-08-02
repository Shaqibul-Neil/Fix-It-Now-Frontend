"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ServiceFilter from "../dependencies/components/ServiceFilter";
import { useServicesQuery } from "../dependencies/hooks/useServiceQuery";
import { useCustomerServicesColumns } from "../dependencies/table/CustomerServicesTableColumn";

const CustomerServicesPage = () => {
  const { data, isError, error, isFetching } = useServicesQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useCustomerServicesColumns();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Browse services"
        description="Pick a service and book the technician who offers it."
        divClassName="mb-0"
      />

      <div className="flex flex-col gap-4">
        <ServiceFilter showTechnicianScope />

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
            emptyMessage="No services match this filter."
          />
        )}
      </div>

      {modals}
    </section>
  );
};

export default CustomerServicesPage;
