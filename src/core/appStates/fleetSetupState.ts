import { Store, setAttackerFleets, setDefenderFleets } from '../store/store'
import { AppState } from '..'

const APP_STATE_NAME = 'FLEET_SETUP_STATE'
const NEXT_APP_STATE_NAME = 'COMBAT_STATE'

export type Fleet = Ship[]

export type CombatValue = number
export type HasSustainDamage = boolean
export type Capacity = number
export interface Ship {
  combatValue: CombatValue
  hasSustainDamage: HasSustainDamage
  capacity: Capacity
}

export const FLEET_SETUP_ATTACKER = 'FLEET_SETUP_ATTACKER'
export const FLEET_SETUP_DEFENDER = 'FLEET_SETUP_DEFENDER'

type AppStateParameters = object
interface FleetSetupAppStateParameters extends AppStateParameters {
  [FLEET_SETUP_DEFENDER]: Fleet[]
  [FLEET_SETUP_ATTACKER]: Fleet[]
}

const doTheThing = (
  store: Store,
  parameters: FleetSetupAppStateParameters
): [Store, string] => {
  const attackerFleets = parameters[FLEET_SETUP_ATTACKER]
  let nextStore = setAttackerFleets(store, attackerFleets)
  const defenderFleets = parameters[FLEET_SETUP_DEFENDER]
  nextStore = setDefenderFleets(nextStore, defenderFleets)

  return [nextStore, NEXT_APP_STATE_NAME]
}

const fleetAppState: AppState = {
  stateName: APP_STATE_NAME,
  runState: doTheThing,
  parameters: [FLEET_SETUP_DEFENDER, FLEET_SETUP_ATTACKER],
  getStateEntryValues: () => {
    return null
  },
}

export default fleetAppState
