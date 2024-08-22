require('dotenv').config();
import { readFileSync } from 'fs';
import { join } from 'path';
import { connection } from '../src/config/connection';

const executeSQLFile = async (filePath) => {
  let client;

  try {
    client = await connection();
    const sql = readFileSync(filePath, 'utf8');
    await client.query(sql);    
  } catch (err) {
    console.error('Erro ao executar o arquivo SQL:', err);
  } finally {
    if (client) client.release();
  }
}

(async () => {
  const sql = join(__dirname, './ddl.sql');
  await executeSQLFile(sql);
  console.log('Script DDL executado com sucesso...\n');
})();
