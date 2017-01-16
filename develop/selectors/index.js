import { createSelector } from 'reselect';

export const currentRoute = state => state.routing.locationBeforeTransitions.pathname;

export const isChatUrlMatch = createSelector([currentRoute], (pathname) => pathname === '/chat');
