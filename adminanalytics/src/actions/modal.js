import * as actionType from './action_types';

export function openModal() {
  return {
    type: actionType.SHOW_MODAL
  };
}

export function closeModal() {
  return {
    type: actionType.CLOSE_MODAL
  };
}