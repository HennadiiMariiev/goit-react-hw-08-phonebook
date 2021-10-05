import { createSelector } from 'reselect';

export const getState = (state) => state;

export const getItems = (state) => state.contacts.items;

export const getFilter = (state) => state.contacts.filter;

export const getFilteredContacts = createSelector([getItems, getFilter], (items, filter) => {
  if (filter.trim() === '') {
    return items;
  }

  return items.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
});
