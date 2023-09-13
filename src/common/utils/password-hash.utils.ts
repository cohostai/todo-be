import * as bcrypt from 'bcrypt';

async function hash(password: string, saltOrRounds: string): Promise<string> {
  return bcrypt.hashSync(password, saltOrRounds);
}

async function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compareSync(password, hash);
}

export { hash, compare };
