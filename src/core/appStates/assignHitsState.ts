import {
  assignAttackerHits,
  assignDefenderHits,
  getAttackerFleetSize,
  getDefenderFleetSize,
  PlayerStore,
  Store,
} from '../store/store'
import { Combatant } from './combatState'
import { AppState, AppStateParameters } from '../'

const APP_STATE_NAME = 'ASSIGN_HITS_STATE'

const NEXT_APP_STATE_NAME = 'COMBAT_STATE'

export const ASSIGNED_HITS_DEFENDER = 'ASSIGNED_HITS_DEFENDER'
export const ASSIGNED_HITS_ATTACKER = 'ASSIGNED_HITS_ATTACKER'

type FleetIdentifier = number
type NumberOfAssignments = number

export interface HitsAssignment {
  fleetIdentifier: FleetIdentifier
  numberOfAssignments: NumberOfAssignments
}

interface AssignHitsAppStateParameters extends AppStateParameters {
  [ASSIGNED_HITS_DEFENDER]: HitsAssignment[]
  [ASSIGNED_HITS_ATTACKER]: HitsAssignment[]
}

const doTheThing = (
  store: Store,
  parameters: AssignHitsAppStateParameters
): [Store, string] => {
  parameters[ASSIGNED_HITS_ATTACKER].forEach((hitsAssignment) => {
    store = assignAttackerHits(store, hitsAssignment)
  })

  parameters[ASSIGNED_HITS_DEFENDER].forEach((hitsAssignment) => {
    store = assignDefenderHits(store, hitsAssignment)
  })

  const attackerFleetSize = getAttackerFleetSize(store)
  const defenderFleetSize = getDefenderFleetSize(store)

  const nextAppStateName =
    attackerFleetSize === 0 || defenderFleetSize === 0
      ? ''
      : NEXT_APP_STATE_NAME
  return [store, nextAppStateName]
}

type Hits = PlayerStore['hits']

export interface AssignHitsStateEntryValues {
  attacker: Hits
  defender: Hits
}

const getHits = (store: Store, combatant: Combatant) => store[combatant].hits

const assignHitsAppState: AppState = {
  stateName: APP_STATE_NAME,
  runState: doTheThing,
  getStateEntryValues: (store: Store): AssignHitsStateEntryValues => ({
    attacker: getHits(store, 'attacker'),
    defender: getHits(store, 'defender'),
  }),
  parameters: [ASSIGNED_HITS_ATTACKER, ASSIGNED_HITS_DEFENDER],
}

export default assignHitsAppState
