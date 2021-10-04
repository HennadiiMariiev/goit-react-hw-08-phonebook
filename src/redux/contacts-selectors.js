import { createSelector } from 'reselect';

export const getState = (state) => state;

export const getItems = (state) => state.contacts.items;

export const getFilter = (state) => state.contacts.filter;

export const getFilteredContacts = createSelector([getItems, getFilter], (items, filter) => {
  // console.log('filter ', filter);

  if (filter.trim() === '') {
    return items;
  }

  return items.filter((contact) => {
    console.log(
      'includes:',
      contact.name.toLowerCase(),
      filter.toLowerCase(),
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
});
