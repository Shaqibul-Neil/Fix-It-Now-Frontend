"use client";
import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ServiceFilter from "../dependencies/components/ServiceFilter";
import { useAdminServicesQuery } from "../dependencies/hooks/useServiceQuery";
import { useAdminServicesColumns } from "../dependencies/table/AdminServicesColumns";

const AdminServicesPage = () => {
  const { data, isError, error, isFetching } = useAdminServicesQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminServicesColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Services"
          description="Every service listed across technicians on the platform."
        />

        <ServiceFilter />
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
          emptyMessage="No services match this filter."
        />
      )}

      {modals}
    </section>
  );
};

export default AdminServicesPage;
