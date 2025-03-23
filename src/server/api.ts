// src/server/api.ts

import { remultExpress } from 'remult/remult-express'
import { Player } from '../shared/Player'
import { Ship } from '../shared/Ship'
import { Country } from '../shared/Country'

export const api = remultExpress({
    entities: [Player, Ship, Country],
    admin: true,
})