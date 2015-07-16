import Decision from './decision';
import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('newDecision', new Decision(value.get('newDecision')))
    .set('list', value.get('list').map(decision => new Decision(decision)));
}
