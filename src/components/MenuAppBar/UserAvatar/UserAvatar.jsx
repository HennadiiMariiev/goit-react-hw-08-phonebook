import React from 'react';
import Avatar from '@mui/material/Avatar';

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

const stringAvatar = (name) => {
  let initials = 'US';

  if (name.split(' ').length === 1) {
    initials = name.slice(0, 2);
  } else if (name.split(' ').length === 2) {
    initials = name.split(' ')[0][0] + name.split(' ')[1][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
};

export function UserAvatar({ name = 'user', src = '', size = 35 }) {
  return <Avatar {...stringAvatar(name)} sx={{ width: size, height: size }} src={src} />;
}
