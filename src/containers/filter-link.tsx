import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Link } from '../components/link'
import { setVisibilityFilter } from '@/module/actions'

const mapStateToProps: MapStateToProps<
  {
    active: boolean
  },
  {
    filter: string
  },
  {
    visibilityFilter: string
  }
> = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  }
}

const mapDispatchToProps: MapDispatchToProps<
  {
    onClick(): void
  },
  { filter: string }
> = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
  }
}

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link)
