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
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals, openCreate } = useTechnicianServicesColumns();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="My services"
        description="Manage the services you offer — create, update, or remove them."
        divClassName="mb-0"
        action={{ text: "Add service", onClick: openCreate }}
      />

      <div className="flex flex-col gap-4">
        <ServiceFilter showRecordStatus />

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

export default TechnicianServicesPage;
