import React from 'react';
import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';
import { Fab } from '@mui/material';
import { useCurrentButton } from 'hooks/useCurrentButton';

export function ButtonWrapper({ title, icon, onClick, disabled = false, progress = null }) {
  const [isCurrentButton, setIsCurrentButton] = useCurrentButton();

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Tooltip title={title} arrow>
        <div>
          <Fab
            aria-label={title}
            color="primary"
            size="medium"
            disabled={disabled}
            onClick={() => {
              setIsCurrentButton(true);
              onClick();
            }}
          >
            {icon}
          </Fab>
        </div>
      </Tooltip>
      {isCurrentButton && progress}
    </Box>
  );
}
