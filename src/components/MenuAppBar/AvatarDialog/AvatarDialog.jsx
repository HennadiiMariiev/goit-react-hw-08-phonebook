import { Typography } from '@mui/material';
import { avatarDescription } from 'helpers/avatarDescription';
import React from 'react';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { ListItem, List, ListItemButton, ListItemText, Divider, Dialog, DialogTitle } from '@mui/material';
import { avatarImages } from 'helpers/imagesImportFunction';
import styles from './avatarDialog.module.scss';

export function AvatarDialog({ onClose, open }) {
  const handleListItemClick = (value) => {
    onClose(value);
  };

  const avatarsData = avatarImages.map((el, index) => ({
    src: el.default,
    name: avatarDescription[index],
  }));

  const avatarsArray = avatarsData.map((el, index) => (
    <ListItem className={styles.wrapper} key={index}>
      <ListItemButton onClick={() => handleListItemClick(el.src)} key={index}>
        <UserAvatar name="user avatar" src={el.src} size="50" className={styles.icon} />
        <ListItemText className={styles.text}>{el.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={styles.title}>Select your avatar</DialogTitle>
      <List className={styles.list}>{avatarsArray}</List>
    </Dialog>
  );
}
