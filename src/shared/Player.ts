import { Entity, Fields } from 'remult'
import { Ship } from './Ship' // ייבוא הטיפוס Ship
import { Country } from './Country' // ייבוא הטיפוס Country

@Entity('players', {
  allowApiCrud: true,
})
export class Player {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.number()
  money = 0 // כסף לקנייה ומכירה

  @Fields.object()
  ship?: Ship // הספינה של השחקן

  @Fields.object()
  storage: Storage = { wood: 0, gold: 0, diamond: 0 } // מחסן אישי

  @Fields.object()
  location?: Country // מיקום נוכחי של השחקן

  @Fields.createdAt()
  createdAt?: Date
}

// מחסן אישי (Storage)
interface Storage {
  wood: number // כמות עץ
  gold: number // כמות זהב
  diamond: number // כמות יהלומים
}