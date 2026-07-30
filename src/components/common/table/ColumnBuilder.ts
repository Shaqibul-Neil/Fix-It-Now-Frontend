import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

// A column bound to a field on the row. `key` is checked against TData, so a
// renamed field breaks the build instead of rendering blank.
type TBaseColumn<T, K extends keyof T> = {
  key: K;
  label: string;
  size?: number;
  render?: (value: T[K], row: T) => ReactNode;
};

// A column that is not a field: index numbers, action menus, anything derived
// from the whole row.
type TCustomColumn<T> = {
  id: string;
  label: string;
  size?: number;
  render?: (row: T, index: number) => ReactNode;
};

type TColumnBuilderConfig<T> =
  | { [K in keyof T]: TBaseColumn<T, K> }[keyof T]
  | TCustomColumn<T>;

export const buildColumn = <T,>(
  config: TColumnBuilderConfig<T>[],
): ColumnDef<T>[] => {
  return config.map((col) => {
    if ("id" in col) {
      return {
        id: col.id,
        header: col.label,
        size: col.size,
        cell: ({ row }) => col.render?.(row.original, row.index),
      } as ColumnDef<T>;
    }

    const baseCol = col as TBaseColumn<T, keyof T>;
    return {
      id: baseCol.key as string,
      accessorKey: baseCol.key as string,
      size: baseCol.size,
      header: baseCol.label,
      cell: ({ row }) => {
        const value = row.original[baseCol.key];
        if (baseCol.render) return baseCol.render(value, row.original);
        // String(null) prints the literal word, so blanks get a dash instead.
        return value === null || value === undefined ? "—" : String(value);
      },
    } as ColumnDef<T>;
  });
};
