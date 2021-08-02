import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListSubheader from '@material-ui/core/ListSubheader'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { VariableSizeList } from 'react-window'
import { Typography } from '@material-ui/core'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

const LISTBOX_PADDING = 8 // px
const debug = false

function renderRow(props) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          role='listbox'
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

ListboxComponent.propTypes = {
  children: PropTypes.node,
}

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
})

const renderGroup = (params) => [
  <ListSubheader key={params.key} component='div'>
    {params.group}
  </ListSubheader>,
  params.children,
]

export default function Virtualize({ props }) {
  const { LIST, values, handleOnChange } = props

  if (debug) console.log(LIST, values, handleOnChange)
  const classes = useStyles()

  return (
    <Autocomplete
      size='small'
      // style={{ width: 300 }}
      value={values}
      classes={classes}
      multiple
      filterSelectedOptions
      disableListWrap
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={LIST}
      getOptionLabel={(option) => {
        return `${option.stitches} ${option.name}`
      }}
      onChange={(e, value) => {
        handleOnChange(e, value)
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      renderInput={(params) => <TextField {...params} label='Products' margin='normal' size='small' required placeholder='Choose Products' />}
      renderOption={(option, { inputValue }) => {
        const matches = match(`${option.stitches} ${option.name}`, inputValue)
        const parts = parse(`${option.stitches} ${option.name}`, matches)

        return (
          <Typography noWrap>
            {parts.map((part, index) => {
              if (debug) console.log(part)
              return (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              )
            })}
          </Typography>
        )
      }}
    />
  )
}
