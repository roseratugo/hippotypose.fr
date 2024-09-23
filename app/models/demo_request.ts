import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DemoRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare telephoneCode: string

  @column()
  declare phoneNumber: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}