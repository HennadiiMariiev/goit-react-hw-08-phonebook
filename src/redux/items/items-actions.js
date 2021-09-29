import { createAction } from '@reduxjs/toolkit';
// pending
export const fetchContactsRequest = createAction('items/fetchContactsRequest');
// fullfilled
export const fetchContactsSuccess = createAction('items/fetchContactsSuccess');
//rejected
export const fetchContactsError = createAction('items/fetchContactsError');

export const fetchSingleContactSuccess = createAction('items/fetchSingleContactSuccess');

export const fetchRemoveContactSuccess = createAction('items/fetchRemoveContactSuccess');

export const fetchRemoveAllContactsSuccess = createAction('items/fetchRemoveAllContactsSuccess');
