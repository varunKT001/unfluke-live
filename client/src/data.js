import AddIcon from '@mui/icons-material/Add';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RadarIcon from '@mui/icons-material/Radar';

export const MiniDrawerList = [
  { name: 'Create strategy', icon: <AddIcon />, url: '/' },
  {
    name: 'My strategies',
    icon: <BorderAllIcon />,
    url: '/my-strategies',
  },
  {
    name: 'Orders',
    icon: <ShoppingBagIcon />,
    url: '/orders',
  },
  {
    name: 'Positions',
    icon: <RadarIcon />,
    url: '/Positions',
  },
];
