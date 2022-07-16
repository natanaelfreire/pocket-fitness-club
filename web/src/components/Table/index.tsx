import React from "react";

interface TableProps<TItem, TData extends keyof TItem> {
  items: TItem[];
  loading?: boolean;
  columns: {
    head: string;
    position?: 'left' | 'center' | 'right';
    renderItem: (item: TItem) => React.ReactNode;
  }[];
}

export function Table<TItem, TData extends keyof TItem,>(props: TableProps<TItem, TData>) {
  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          {
            (props.columns).map(({ head, position }) => (
              <th
                key={head}
                className={`${position === 'center' ? 'text-center ' : (position === 'right' ? 'text-right ' : 'text-left ')} 
                  border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-stone-700 dark:text-slate-200`}
              >
                {head}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          props.items.map((item, indexItem) => (
            <tr
              key={indexItem}
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8"
            >
              {
                props.columns.map((column, indexColumn) => (
                  <td
                    key={indexColumn}
                    className={`${column.position === 'center' ? 'text-center ' : (column.position === 'right' ? 'text-right ' : 'text-left ')}
                      border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-600 dark:text-slate-400`}
                  >
                    {column.renderItem(item)}
                  </td>
                ))
              }
            </tr>
          ))
        }
        {
          props.loading ?
            <tr>
              <td colSpan={props.columns.length} className="text-center">
                CARREGANDO...
              </td>
            </tr> :
            props.items.length === 0 &&
            <tr
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
            >
              <td
                colSpan={props.columns.length}
                className="text-center border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
              >
                Nenhum registro encontrado.
              </td>
            </tr>
        }
      </tbody>
    </table>
  );
}
