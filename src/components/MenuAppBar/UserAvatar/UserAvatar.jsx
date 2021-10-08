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

const stringAvatar = (name) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

export function UserAvatar({ name, src = '', size = 35 }) {
  return <Avatar {...stringAvatar(name)} sx={{ width: size, height: size }} src={src} />;
}
