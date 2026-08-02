import type { ColumnDef } from "@tanstack/react-table";
import AppAvatar from "../cards/AppAvatar";
import Text from "../texts/Text";

// Avatar + name + email in one cell. Not a component — a column factory, called
// alongside the other columns.
const ContactColumn = <TRow,>(
  id: string,
  label: string,
  read: (row: TRow) => {
    name: string;
    // Left out where the row carries no address to show — the cell is then the
    // avatar and the name alone.
    email?: string | null;
    avatar?: string | null;
  },
): ColumnDef<TRow> => ({
  id,
  header: label,
  size: 240,
  cell: ({ row }) => {
    const { name, email, avatar } = read(row.original);

    return (
      <div className="flex min-w-0 items-center gap-3">
        <AppAvatar src={avatar} name={name} className="size-10 shrink-0" />

        <div className="min-w-0 leading-tight">
          <span className="block truncate font-medium">{name}</span>

          {email && (
            <Text
              variant="normal-xs"
              as="span"
              className="block truncate text-project-muted-foreground"
            >
              {email}
            </Text>
          )}
        </div>
      </div>
    );
  },
});

export default ContactColumn;
