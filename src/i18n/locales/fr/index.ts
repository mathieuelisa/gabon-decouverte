import common from './common.json'
import features from './pages'

const fr = {
	common,
	...features
}

export * from './pages'
export type TLocalFr = typeof fr
export default fr
