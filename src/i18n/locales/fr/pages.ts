import authentication from './authentication.json'
import maintenance from './maintenance.json'

const features = {
	authentication,
	maintenance
}

export type TFeaturesFr = typeof features
export default features
