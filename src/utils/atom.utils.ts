import { atomWithStorage as atomWithStorageBase, createJSONStorage } from 'jotai/utils'
import type { AsyncStorage, SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

const localStorage = createJSONStorage(() =>
	typeof window === 'undefined' ? (undefined as unknown as Storage) : window.localStorage
)
const sessionStorage = createJSONStorage(() =>
	typeof window === 'undefined' ? (undefined as unknown as Storage) : window.sessionStorage
)
export const atomWithLocalStorage = <VALUE>(key: string, initialValue: VALUE) => {
	return atomWithStorageBase<VALUE>(key, initialValue, localStorage as SyncStorage<VALUE>, {
		getOnInit: true
	})
}
export const atomWithSessionStorage = <VALUE>(key: string, initialValue: VALUE) => {
	return atomWithStorageBase<VALUE>(key, initialValue, sessionStorage as AsyncStorage<VALUE>, {
		getOnInit: true
	})
}
