import { useState } from 'react';
import { Player } from './shared/Player';
import { Country } from './shared/Country';
import { 
  Button, TextField, Select, MenuItem, 
  Paper, Typography, Box, Snackbar, Alert,
  useMediaQuery, useTheme, Stack, Avatar
} from '@mui/material';

import woodIcon from './assets/wood-pile.svg';
import goldIcon from './assets/gold-stack.svg';
import diamondIcon from './assets/crystal-growth.svg';
import moneyIcon from './assets/cash.svg';
// אייקונים מ-game-icons.net (ניתן להמיר ל-SVG או להשתמש כתמונות)
const RESOURCE_ICONS = {
    wood: woodIcon,
    gold: goldIcon,
    diamond: diamondIcon,
    money: moneyIcon
  };


export const TradeComponent = ({ 
  player, 
  currentCity, 
  onTradeComplete 
}: {
  player: Player;
  currentCity: Country;
  onTradeComplete: (updatedPlayer: Player) => void;
}) => {
  const [resource, setResource] = useState<keyof Player['storage']>('wood');
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });

  const handleTrade = async (action: 'buy' | 'sell') => {
    try {
      const updatedPlayer = await Player[action](player.id, resource, quantity);
      onTradeComplete(updatedPlayer);
      setSnackbar({ 
        open: true, 
        message: `${action === 'buy' ? 'Purchased' : 'Sold'} ${quantity} ${resource}`,
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({ 
        open: true, 
        message: error?.message || 'Transaction failed',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/price-tag.svg" 
          sx={{ width: 32, height: 32, mr: 1 }} 
        />
        Market Transactions
      </Typography>

      <Stack spacing={3}>
        {/* בחירת משאב */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Select Resource
          </Typography>
          <Select
            value={resource}
            onChange={(e) => setResource(e.target.value as keyof Player['storage'])}
            fullWidth
            sx={{ bgcolor: 'background.paper' }}
          >
            {Object.entries(RESOURCE_ICONS).map(([res, icon]) => {
              if (res === 'money') return null;
              return (
                <MenuItem key={res} value={res} sx={{ py: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={icon} sx={{ width: 24, height: 24 }} />
                    <Typography textTransform="capitalize">{res}</Typography>
                  </Stack>
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        {/* כמות */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Quantity
          </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
            sx={{ bgcolor: 'background.paper' }}
          />
        </Box>

        {/* סיכום טרנזקציה */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          bgcolor: 'action.hover',
          borderRadius: 2
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={RESOURCE_ICONS[resource]} sx={{ width: 28, height: 28 }} />
              <Typography>{quantity} × {resource}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={RESOURCE_ICONS.money} sx={{ width: 28, height: 28 }} />
              <Typography fontWeight="bold">
                {currentCity.prices[resource] * quantity}$
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* כפתורי פעולה */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleTrade('buy')}
            disabled={player.money < currentCity.prices[resource] * quantity}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Buy Now
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleTrade('sell')}
            disabled={player.storage[resource] < quantity}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Sell Now
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};