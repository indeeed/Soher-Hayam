import React, { useState } from 'react'
import { remult } from 'remult'
import { Player } from './shared/Player'
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material'

interface LoginProps {
  onLogin: (player: Player) => void
}

export const Login = ({ onLogin }: LoginProps) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    try {
      const playerRepo = remult.repo(Player)
      const player = await playerRepo.findFirst({ name })

      if (!player) {
        setError('User not found')
        return
      }

      onLogin(player)
    } catch (err) {
      setError('Login failed')
      console.error(err)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Enter your name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}