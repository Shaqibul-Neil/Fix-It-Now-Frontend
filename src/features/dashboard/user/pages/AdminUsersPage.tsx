"use client";

import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import UserFilter from "../dependencies/components/UserFilter";
import { useAdminUsersQuery } from "../dependencies/hooks/useUserQuery";
import { useAdminUsersColumns } from "../dependencies/table/AdminUsersColumns";

const AdminUsersPage = () => {
  const { data, isError, error, isFetching } = useAdminUsersQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals } = useAdminUsersColumns();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Users"
        description="Every account on the platform — customers, technicians and admins."
        divClassName="mb-0"
      />

      <div className="flex flex-col gap-4">
        <UserFilter />

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
            emptyMessage="No accounts match this filter."
          />
        )}
      </div>

      {modals}
    </section>
  );
};

export default AdminUsersPage;
