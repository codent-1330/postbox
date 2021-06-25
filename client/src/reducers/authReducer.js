// Records whether a user is logged in or not
  // used to show user dashboard components etc using react router
import { FETCH_USER } from '../actions/types';


export default function(state = null, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
