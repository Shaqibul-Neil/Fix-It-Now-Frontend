"use client";
import {
  AppError,
  PageHeader,
  PaginatedTable,
  TableSkeleton,
} from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import CategoryFilter from "../dependencies/components/CategoryFilter";
import { useAdminCategoriesQuery } from "../dependencies/hooks/useCategoryQuery";
import { useAdminCategoriesColumns } from "../dependencies/table/AdminCategoriesColumns";

const AdminCategoriesPage = () => {
  const { data, isError, error, isFetching } = useAdminCategoriesQuery();
  const { page, pageSize, setPage, setPageSize } = useServerPagination();
  const { columns, modals, openCreate } = useAdminCategoriesColumns();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        description="Every category services are grouped under — create, update, or remove them."
        divClassName="mb-0"
        action={{ text: "Add category", onClick: openCreate }}
      />

      <div className="flex flex-col gap-4">
        <CategoryFilter />

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
            emptyMessage="No categories match this filter."
          />
        )}
      </div>

      {modals}
    </section>
  );
};

export default AdminCategoriesPage;
