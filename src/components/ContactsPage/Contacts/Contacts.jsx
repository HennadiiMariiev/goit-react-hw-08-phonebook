import ContactItem from 'components/ContactsPage/ContactItem/ContactItem';
import Divider from '@mui/material/Divider';
import { fetchRemoveAllContacts } from 'redux/items/items-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getState } from 'redux/contacts-selectors';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useCurrentButton } from 'hooks/useCurrentButton';
import styles from 'components/ContactsPage/contactPage.module.scss';
import { getIsLoading } from 'redux/loading/loading-selector';

export const Contacts = () => {
  const state = useSelector(getState);
  const isLoading = useSelector(getIsLoading);
  const [isCurrentButton, setIsCurrentButton] = useCurrentButton();
  const dispatch = useDispatch();

  const makeContactsList = getFilteredContacts(state).map(({ name, number, id }) => {
    return <ContactItem id={id} name={name} number={number} key={id} />;
  });

  return (
    <div className={styles.contacts}>
      <Divider variant="middle" />
      {makeContactsList.length === 0 ? (
        <>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography variant="h4" component="h4" className={styles.noContacts}>
              No contacts...
            </Typography>
          )}
        </>
      ) : (
        <div className={styles.wrapper}>
          <Typography variant="h4" component="h4" className={styles.title}>
            Contacts
          </Typography>
          <List className={styles.list}>{makeContactsList}</List>

          <LoadingButton
            variant="contained"
            loading={isCurrentButton}
            onClick={() => {
              setIsCurrentButton(true);
              dispatch(fetchRemoveAllContacts());
            }}
            className={styles.button}
            startIcon={<DeleteIcon className={styles.icon} />}
          >
            Delete all
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
