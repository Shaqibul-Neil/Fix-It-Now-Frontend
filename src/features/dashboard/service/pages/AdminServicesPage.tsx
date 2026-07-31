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
  console.log(data);
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns } = useAdminServicesColumns();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="Browse services"
          description="Pick a service and book the technician who offers it."
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
    </section>
  );
};

export default AdminServicesPage;
