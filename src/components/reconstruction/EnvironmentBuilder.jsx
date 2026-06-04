import IndoorHouseEnv from './environments/IndoorHouseEnv'
import StreetEnv from './environments/StreetEnv'
import AlleyEnv from './environments/AlleyEnv'
import OfficeEnv from './environments/OfficeEnv'
import StoreEnv from './environments/StoreEnv'
import ParkingLotEnv from './environments/ParkingLotEnv'
import WarehouseEnv from './environments/WarehouseEnv'
import { isOutdoorEnv } from '../../utils/resolveEnvironment'

export default function EnvironmentBuilder({
  envType = 'HOUSE',
  doorRef,
  victimWasSleeping = false,
  isNight = false,
  hasGold = false,
}) {
  switch (envType) {
    case 'STREET':
      return <StreetEnv isNight={isNight} />
    case 'ALLEY':
      return <AlleyEnv />
    case 'OFFICE':
      return <OfficeEnv />
    case 'STORE':
      return <StoreEnv hasGold={hasGold} />
    case 'PARKING_LOT':
      return <ParkingLotEnv isNight={isNight} />
    case 'WAREHOUSE':
      return <WarehouseEnv />
    case 'APARTMENT':
      return <IndoorHouseEnv doorRef={doorRef} victimWasSleeping={victimWasSleeping} isApartment />
    case 'HOUSE':
    default:
      return <IndoorHouseEnv doorRef={doorRef} victimWasSleeping={victimWasSleeping} />
  }
}

export function isOutdoorLocation(envType) {
  return isOutdoorEnv(envType)
}
