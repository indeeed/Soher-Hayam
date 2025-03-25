import { BackendMethod, Entity, Fields, remult } from 'remult'
import { Ship } from './Ship'
import { Country } from './Country'

@Entity('players', {
  allowApiCrud: true,
})
export class Player {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.number()
  money = 0

  @Fields.object()
  ship?: Ship

  @Fields.object()
  storage = { wood: 0, gold: 0, diamond: 0 }

  @Fields.object()
  location?: Country

  @Fields.createdAt()
  createdAt?: Date

  @BackendMethod({ allowed: true })
  static async buy(playerId: string, resource: keyof Player['storage'], quantity: number) {
    const playerRepo = remult.repo(Player);
    const cityRepo = remult.repo(Country);
    
    const player = await playerRepo.findId(playerId);
    if (!player) throw "Player not found";
    if (!player.location) throw "Player has no location";
    
    const city = await cityRepo.findFirst({ name: player.location.name });
    if (!city) throw "City not found";
    
    const totalCost = city.prices[resource] * quantity;
    if (player.money < totalCost) throw "Not enough money";
    
    const updatedPlayer = await playerRepo.save({
      ...player,
      money: player.money - totalCost,
      storage: {
        ...player.storage,
        [resource]: player.storage[resource] + quantity
      }
    });
    
    return updatedPlayer;
  }

  @BackendMethod({ allowed: true })
  static async sell(playerId: string, resource: keyof Player['storage'], quantity: number) {
    const playerRepo = remult.repo(Player);
    const cityRepo = remult.repo(Country);
    
    const player = await playerRepo.findId(playerId);
    if (!player) throw "Player not found";
    if (!player.location) throw "Player has no location";
    
    const city = await cityRepo.findFirst({ name: player.location.name });
    if (!city) throw "City not found";
    
    if (player.storage[resource] < quantity) throw "Not enough resources";
    
    const totalValue = city.prices[resource] * quantity;
    const updatedPlayer = await playerRepo.save({
      ...player,
      money: player.money + totalValue,
      storage: {
        ...player.storage,
        [resource]: player.storage[resource] - quantity
      }
    });
    
    return updatedPlayer;
  }
}