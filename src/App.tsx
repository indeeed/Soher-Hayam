import React, { useState } from 'react'
import { Login } from './Login'
import { Home } from './Home'
import { Player } from './shared/Player'
import { Container, Box } from '@mui/material'

export const App = () => {
  const [player, setPlayer] = useState<Player | null>(null)

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        {!player ? (
          <Login onLogin={(player) => setPlayer(player)} />
        ) : (
          <Home player={player} />
        )}
      </Box>
    </Container>
  )
}