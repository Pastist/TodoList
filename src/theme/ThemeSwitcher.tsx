import { IconButton,} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeSwitcher = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeSwitcher must be used within AppThemeProvider');
  }
  const { mode, toggleTheme } = context;

  return (
    <div>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        title={`Переключиться на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </div>
  );
};
