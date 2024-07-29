import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('User')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('username', 'varchar(32)', col => col.notNull().unique())
    .addColumn('password', 'varchar(32)', col => col.notNull().unique())
    .execute()

  await db.schema
    .createTable('Exam')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(32)', col => col.notNull())
    .addColumn('description', 'text', col => col.notNull())
    .execute()

  await db.schema
    .createTable('Lab')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(32)', col => col.notNull())
    .addColumn('phone', 'varchar(32)', col => col.notNull())
    .execute()

  await db.schema
    .createTable('ExamLab')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('examId', 'integer', col => col.notNull().references('Exam.id'))
    .addColumn('labId', 'integer', col => col.notNull().references('Lab.id'))
    .addColumn('price', 'decimal(10, 2)')
    .execute()

  await db.schema
    .createTable('LabCollection')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('date', 'date', col => col.notNull())
    .addColumn('labId', 'integer', col => col.notNull().references('Lab.id'))
    .addColumn('capacity', 'integer', col => col.notNull())
    .execute()

  await db.schema
    .createTable('CollectionItem')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('examId', 'integer', col => col.notNull().references('Exam.id'))
    .addColumn('patientName', 'varchar(32)', col => col.notNull())
    .execute()

  await db.schema
    .createTable('Collection')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('labCollectionId', 'integer', col => col.notNull().references('LabCollection.id'))
    .addColumn('collectionItemId', 'integer', col => col.notNull().references('CollectionItem.id'))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('Collection').execute()
  await db.schema.dropTable('CollectionItem').execute()
  await db.schema.dropTable('LabCollection').execute()
  await db.schema.dropTable('ExamLab').execute()
  await db.schema.dropTable('Lab').execute()
  await db.schema.dropTable('Exam').execute()
  await db.schema.dropTable('User').execute()
}