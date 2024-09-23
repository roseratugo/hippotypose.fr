import { BaseSchema } from '@adonisjs/lucid/schema'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const hashedPassword = await hash.make('Darkonis@72700')
    await this.db.table(this.tableName).insert({
      full_name: 'Ugo ROSERAT',
      email: 'roserat.ugo@gmail.com',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }

  async down() {
    await this.db.from(this.tableName).where('email', 'roserat.ugo@gmail.com').delete()
  }
}
