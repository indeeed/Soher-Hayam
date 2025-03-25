import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { Player } from './shared/Player';
import { Country } from './shared/Country';
import { TradeComponent } from './TradeComponent';
import { 
  Box, Typography, Paper, Container, 
  Grid, Stack, Avatar, useMediaQuery, 
  useTheme, Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PublicIcon from '@mui/icons-material/Public';

import israelMap from './assets/Israel_Wikivoyage_map.png';
import woodIcon from './assets/wood-pile.svg';
import goldIcon from './assets/gold-stack.svg';
import diamondIcon from './assets/crystal-growth.svg';
import moneyIcon from './assets/cash.svg';
import locationIcon from './assets/treasure-map.svg';
import character from './assets/character.svg';

const RESOURCE_ICONS = {
  wood: woodIcon,
  gold: goldIcon,
  diamond: diamondIcon,
  money: moneyIcon,
  location: locationIcon
};

interface HomeProps {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
}

const Countrys = remult.repo(Country);

export const Home = ({ player, onPlayerUpdate }: HomeProps) => {
  const [cities, setCities] = useState<Country[]>([]);
  const [isTraveling, setIsTraveling] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    Countrys.find().then(setCities);
  }, []);

  const currentCity = cities.find(c => c.name === player.location?.name) || cities[0];

  const handleTravel = async (city: Country) => {
    if (isTraveling || city.name === currentCity?.name) return;
    
    setIsTraveling(true);
    try {
      const updatedPlayer = await remult.repo(Player).save({ 
        ...player, 
        location: city 
      });
      onPlayerUpdate(updatedPlayer);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Travel failed");
    } finally {
      setIsTraveling(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Player Stats Section - Redesigned */}
      <Paper elevation={3} sx={{ 
        p: isMobile ? 1 : 3, 
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)'
      }}>
        <Grid container spacing={2} alignItems="center">
          {/* Player Avatar and Basic Info */}
          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
               src={character}
               sx={{ 
                width: isMobile ? 56 : 64, 
                height: isMobile ? 56 : 64,
                bgcolor: 'primary.main',
                fontSize: isMobile ? '1.5rem' : '2rem'
                
              }}>
                {player.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">{player.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Merchant Level: 1
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          {/* Money and Location */}
          <Grid item xs={6} md={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* <AccountBalanceWalletIcon color="primary" fontSize={isMobile ? 'medium' : 'large'} /> */}
              <Avatar
               src={moneyIcon}
               sx={{ 
                bgcolor: 'primary',
                fontSize: isMobile ? 'medium' : 'large'
                
              }}>
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Balance</Typography>
                <Typography variant="h6" fontWeight="bold">
                  ${player.money.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* <PublicIcon color="primary" fontSize={isMobile ? 'medium' : 'large'} /> */}
              <Avatar
               src={locationIcon}
               sx={{ 
                bgcolor: 'primary',
                fontSize: isMobile ? 'medium' : 'large'
                
              }}></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {currentCity?.name || 'Unknown'}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          {/* Resources */}
          {Object.entries(player.storage).map(([resource, amount]) => (
            <Grid key={resource} item xs={4} md={1}>
              <Stack alignItems="center" spacing={0.5}>
                <Avatar 
                  src={RESOURCE_ICONS[resource as keyof typeof RESOURCE_ICONS]}
                  sx={{ 
                    width: isMobile ? 32 : 40, 
                    height: isMobile ? 32 : 40 
                  }}
                />
                <Typography variant="body2" textTransform="capitalize">
                  {resource}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {amount}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Map and Trading Area */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: 3,
        mb: 3 
      }}>
        {/* Map */}
        <Paper elevation={3} sx={{
          p: 2, 
          borderRadius: 2,
          flex: isMobile ? 'none' : 0.2,
          width: isMobile ? '100%' : 'auto',
        }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TravelExploreIcon sx={{ mr: 1 }} /> Travel Map
          </Typography>
          
          <Box sx={{
            margin: "auto",
            position: 'relative', 
            height: isMobile ? 250 : 370,
            width: '100%',
            backgroundImage: `url(${israelMap})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 1,
          }}>
            {cities.map(city => (
              <Box key={city.name} sx={{
                position: 'absolute',
                left: `${city.location.x}%`,
                top: `${city.location.y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Typography 
                  variant="caption" 
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.3)',
                    px: 1,
                    borderRadius: 1,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    fontSize: 10,
                  }}
                >
                  {city.name}
                </Typography>
                <LocationOnIcon
                  onClick={() => handleTravel(city)}
                  sx={{ 
                    fontSize: 35,
                    color: city.name === currentCity?.name ? 'primary.main' : 'secondary.main',
                    filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.2)'
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Trading Area */}
        {currentCity && (
          <Paper elevation={3} sx={{ 
              p: 2, 
              borderRadius: 2,
              flex: isMobile ? 'none' : 0.4,
              width: isMobile ? '100%' : 'auto'
          }}>
              <TradeComponent
                  player={player}
                  currentCity={currentCity}
                  onTradeComplete={onPlayerUpdate}
              />
          </Paper>
        )}

        {/* Market Prices */}
        <Paper elevation={3} sx={{ 
          p: 2, 
          borderRadius: 2,
          flex: isMobile ? 'none' : 0.4,
          width: isMobile ? '100%' : 'auto'
        }}>
          <Typography variant="h6" gutterBottom>Market Prices</Typography>
          <Box sx={{ 
            maxHeight: isMobile ? 300 : 420,
            overflowY: 'auto',
            pr: 1
          }}>
            {cities.map(city => (
              <Box 
                key={city.name} 
                sx={{ 
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: city.name === currentCity?.name ? 'action.selected' : 'background.default',
                  transition: 'all 0.3s'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {city.name}
                </Typography>
                {Object.entries(city.prices).map(([resource, price]) => (
                  <Box 
                    key={resource} 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5
                    }}
                  >
                    <Typography variant="body2">
                      {resource.charAt(0).toUpperCase() + resource.slice(1)}:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ${price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};