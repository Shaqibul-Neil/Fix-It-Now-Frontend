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
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Services"
        description="Every service listed across technicians on the platform."
        divClassName="mb-0"
      />

      <div className="flex flex-col gap-4">
        <ServiceFilter showRecordStatus showTechnicianScope />

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

export default AdminServicesPage;
