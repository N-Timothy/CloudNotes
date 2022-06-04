import {TableColumn} from 'typeorm'

interface AddTimestampsOptions {
  deleted_at: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function addTimestamps(
  options: AddTimestampsOptions = {
    deleted_at: true,
  },
): TableColumn[] {
  let {deleted_at} = options
  let columns: TableColumn[] = []
  columns.push(
    new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      isNullable: false,
      default: 'now()',
    }),
    new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      isNullable: false,
      default: 'now()',
    }),
  )

  if (deleted_at) {
    columns.push(
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    )
  }

  return columns
}

export {addTimestamps}
