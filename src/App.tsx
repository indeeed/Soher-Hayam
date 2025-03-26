import { useState, useEffect } from 'react';
import { Login } from './Login';
import { Home } from './Home';
import { Player } from './shared/Player';
import { Container, Box } from '@mui/material';
import { remult } from 'remult';

export const App = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPlayer = sessionStorage.getItem('currentPlayer');
    if (!savedPlayer) return setLoading(false);

    (async () => {
      try {
        const parsedPlayer = JSON.parse(savedPlayer);
        const freshPlayer = await remult.repo(Player).findId(parsedPlayer.id);
        if (freshPlayer) {
          setPlayer(freshPlayer);
          sessionStorage.setItem('currentPlayer', JSON.stringify(freshPlayer));
        }
      } catch (error) {
        sessionStorage.removeItem('currentPlayer');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogin = (player: Player) => {
    setPlayer(player);
    sessionStorage.setItem('currentPlayer', JSON.stringify(player));
  };

  const handleLogout = () => {
    setPlayer(null);
    sessionStorage.removeItem('currentPlayer');
  };

  if (loading) return <Container><Box sx={{ marginTop: 4, textAlign: 'center' }}>Loading...</Box></Container>;

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        {!player ? <Login onLogin={handleLogin} /> : <Home player={player} onPlayerUpdate={setPlayer} onLogout={handleLogout} />}
      </Box>
    </Container>
  );
};