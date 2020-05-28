// include svg icon
import RiverWithTreesIcon from '../../../icons/river'
import MarkerIcon from '../../../icons/marker'

export function getSectionIcon(value) {
  switch (value) {
    case 'RIVER_WITH_TREES':
      return RiverWithTreesIcon
    case 'MARKER':
      return MarkerIcon
    default:
      return null
  }
}
