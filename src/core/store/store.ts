import produce, { Draft } from 'immer'
import { HitsAssignment } from '../appStates/assignHitsState'
import { Fleet } from '../appStates/fleetSetupState'

export interface PlayerStore {
  fleets: Fleet[]
  hits: number
}

export interface Store {
  appState: string | null
  attacker: PlayerStore
  defender: PlayerStore
}

export const baseStore: Store = Object.freeze({
  appState: null,
  attacker: {
    fleets: [],
    hits: 0,
  },
  defender: {
    fleets: [],
    hits: 0,
  },
})

export const setAppState = produce(
  (draft: Draft<Store>, newAppState: string) => {
    draft.appState = newAppState
  }
)

export const setAttackerFleets = produce(
  (draft: Draft<Store>, fleets: Fleet[]) => {
    draft.attacker.fleets = fleets
  }
)

export const setDefenderFleets = produce(
  (draft: Draft<Store>, fleets: Fleet[]) => {
    draft.defender.fleets = fleets
  }
)

export const setAttackerHits = produce((draft: Draft<Store>, hits: number) => {
  draft.attacker.hits = hits
})

export const setDefenderHits = produce((draft: Draft<Store>, hits: number) => {
  draft.defender.hits = hits
})

export const assignAttackerHits = produce(
  (draft: Draft<Store>, hitsAssignment: HitsAssignment) => {
    const { fleetIdentifier, numberOfAssignments } = hitsAssignment
    draft.attacker.fleets[fleetIdentifier].splice(0, numberOfAssignments)
    draft.defender.hits = draft.defender.hits - numberOfAssignments
  }
)

export const assignDefenderHits = produce(
  (draft: Draft<Store>, hitsAssignment: HitsAssignment) => {
    const { fleetIdentifier, numberOfAssignments } = hitsAssignment
    draft.defender.fleets[fleetIdentifier].splice(0, numberOfAssignments)
    draft.attacker.hits = draft.attacker.hits - numberOfAssignments
  }
)

export const getAttackerFleetSize = (store: Store) => {
  return store.attacker.fleets.reduce((acc, fleet) => acc + fleet.length, 0)
}

export const getDefenderFleetSize = (store: Store) => {
  return store.defender.fleets.reduce((acc, fleet) => acc + fleet.length, 0)
}
