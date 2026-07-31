"use client";
import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import ServiceFilter from "../dependencies/components/ServiceFilter";
import { useTechnicianServicesQuery } from "../dependencies/hooks/useServiceQuery";
import { useTechnicianServicesColumns } from "../dependencies/table/TechnicianServicesColumns";

const TechnicianServicesPage = () => {
  const { data, isError, error, isFetching } = useTechnicianServicesQuery();
  console.log(data);
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns } = useTechnicianServicesColumns();

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

export default TechnicianServicesPage;
