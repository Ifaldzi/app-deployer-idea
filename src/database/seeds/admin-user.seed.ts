import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default class AdminUserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash('admin1234', 10);
    await repository.insert([
      {
        username: 'admin',
        name: 'Top Level Admin',
        password: hashedPassword,
        email: 'admin@test.com',
      },
    ]);
  }
}
