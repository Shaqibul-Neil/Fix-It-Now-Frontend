"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import TechnicianFilter from "../dependencies/components/TechnicianFilter";
import { useAdminTechniciansQuery } from "../dependencies/hooks/useTechnicianQuery";
import { useAdminTechniciansColumns } from "../dependencies/table/AdminTechniciansColumns";

const AdminTechniciansPage = () => {
  const { data, isError, error, isFetching } = useAdminTechniciansQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminTechniciansColumns();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Technicians"
        description="Approve an onboarding before the technician shows up for customers."
        divClassName="mb-0"
      />

      <div className="flex flex-col gap-4">
        <TechnicianFilter />
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
            emptyMessage="No technicians match this filter."
          />
        )}
      </div>
      {modals}
    </section>
  );
};

export default AdminTechniciansPage;
