import { Connection } from 'typeorm';

export const clearAllTables = async (connection: Connection): Promise<void> => {
  await Promise.all(
    connection.entityMetadatas.map(({ name }) => {
      return connection.createQueryBuilder().delete().from(name).execute();
    }),
  );
};
