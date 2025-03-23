import { Entity, Fields } from 'remult'
import { Player } from './Player' // ייבוא הטיפוס Player

@Entity('ships', {
  allowApiCrud: true,
})
export class Ship {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.number()
  capacity = 100 // קיבולת הספינה (למשל, 100 יחידות)

  @Fields.number()
  speed = 10 // מהירות הספינה

  @Fields.object()
  owner?: Player // בעל הספינה

  @Fields.createdAt()
  createdAt?: Date
}