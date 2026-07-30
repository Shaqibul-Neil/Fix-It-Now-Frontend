import type { ColumnDef } from "@tanstack/react-table";
import Text from "../texts/Text";

// Name + email + phone in one cell. Not a component — a column factory, called
// alongside the other columns.
const ContactColumn = <TRow,>(
  id: string,
  label: string,
  read: (row: TRow) => { name: string; email: string; phone: string | null },
): ColumnDef<TRow> => ({
  id,
  header: label,
  size: 230,
  cell: ({ row }) => {
    const { name, email, phone } = read(row.original);

    return (
      <div className="min-w-0 leading-tight">
        <span className="block truncate font-medium">{name}</span>
        <Text
          variant="normal-xs"
          as="span"
          className="block truncate text-project-muted-foreground"
        >
          {email}
        </Text>
        <Text
          variant="normal-xs"
          as="span"
          className="block truncate text-project-muted-foreground"
        >
          {phone ?? "—"}
        </Text>
      </div>
    );
  },
});

export default ContactColumn;
