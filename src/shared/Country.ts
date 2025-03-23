import { Entity, Fields } from 'remult'

@Entity('countries', {
  allowApiCrud: true,
})
export class Country {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.object()
  location: Location = { x: 0, y: 0 } // מיקום הארץ במפה

  @Fields.object()
  prices: Prices = { wood: 10, gold: 50, diamond: 100 } // מחירי החפצים בארץ זו

  @Fields.createdAt()
  createdAt?: Date
}

// מיקום (Location)
interface Location {
  x: number // קואורדינטה X
  y: number // קואורדינטה Y
}

// מחירי חפצים (Prices)
interface Prices {
  wood: number // מחיר עץ
  gold: number // מחיר זהב
  diamond: number // מחיר יהלום
}