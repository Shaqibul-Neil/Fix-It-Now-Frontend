import { PageHeader, Text } from "@/src/components";
import { getCategories } from "../dependencies/api/category.api";
import CategoryCard from "../dependencies/components/CategoryCard";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 xl:px-8">
      <PageHeader
        title="Browse categories"
        description={`${categories.length} categor${categories.length === 1 ? "y" : "ies"} to pick from`}
        divClassName="mb-0"
      />

      {categories.length === 0 ? (
        <Text
          variant="normal-sm"
          as="p"
          className="text-project-muted-foreground"
        >
          No categories are live right now.
        </Text>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesPage;
