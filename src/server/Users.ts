import { Entity, Fields, Validators } from 'remult'

@Entity('users', {
  allowApiCrud: true,
})
export class User {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.boolean()
  admin = false
}