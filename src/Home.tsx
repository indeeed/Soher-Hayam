
import { Player } from './shared/Player'
import { Box, Typography, Paper, Container } from '@mui/material'

interface HomeProps {
  player: Player
}

export const Home = ({ player }: HomeProps) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome, {player.name}!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">
            <strong>Money:</strong> {player.money}
          </Typography>
          <Typography variant="body1">
            <strong>Storage:</strong>
          </Typography>
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="body2">Wood: {player.storage.wood}</Typography>
            <Typography variant="body2">Gold: {player.storage.gold}</Typography>
            <Typography variant="body2">Diamond: {player.storage.diamond}</Typography>
          </Box>
          
        </Box>
      </Paper>
    </Container>
  )
}