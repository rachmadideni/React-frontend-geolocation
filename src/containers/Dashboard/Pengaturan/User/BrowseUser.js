import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

// USER CARD
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

// ADD USER FAB
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
]

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  )
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0
  return inputLength === 0
    ? []
    : suggestions.filter((suggestion) => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue
        if (keep) {
          count += 1
        }
        return keep
      })
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

const styles = (theme) => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    backgroundColor: '#FAFAFA',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

// USER CARD

function UserCard(props) {
  return (
    <Grid item xs style={{ width: '95%' }}>
      <Card elevation={2}>
        <CardHeader
          title="Ahmad Dhani"
          subheader="Operator"
          avatar={<Avatar style={{ backgroundColor: red[500] }}>A</Avatar>}
          action={
            <IconButton
              onClick={props.handleExpandClick}
              aria-expanded={props.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        ></CardHeader>
        <Collapse in={props.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/*<Typography component="p">
	            deskripsi user
	          </Typography>*/}
            <List component="span">
              <ListItem>
                <ListItemText primary={`nama user : ahmad dani`} />
              </ListItem>
            </List>
            <Divider />
            <List component="span">
              <ListItem>
                <ListItemText primary={`Password : admin`} />
              </ListItem>
            </List>
            <Divider />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}

class BrowseUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      single: '',
      suggestions: [],
      expanded: false,
    }
  }

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }))
  }

  // TODO FETCH USER
  fetchUserData = () => {}

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (name) => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })
  }

  render() {
    const { classes } = this.props
    const autoSuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    }
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          style={{
            display: 'flex',
            flex: 1,
            width: '90%',
            marginTop: 20,
            //marginLeft:15,
          }}
        >
          <Grid
            item
            xs
            style={{
              //display:'flex',
              //height:'100%',
              flex: 1,
            }}
          >
            <Typography variant="h6" color="primary">
              Info User
            </Typography>
            <Autosuggest
              {...autoSuggestProps}
              inputProps={{
                classes,
                placeholder: 'Filter berdasarkan nama user',
                value: this.state.single,
                onChange: this.handleChange('single'),
              }}
              theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
              }}
              renderSuggestionContainer={(options) => (
                <Paper {...options.containerProps} square>
                  {options.children}
                </Paper>
              )}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{
                marginTop: 10,
              }}
            >
              submit
            </Button>
          </Grid>

          <Grid
            item
            style={{
              marginTop: 20,
              //display:'flex',
              //height:'250px',
              flex: 1,
            }}
          >
            <UserCard
              expanded={this.state.expanded}
              handleExpandClick={this.handleExpandClick}
            />
          </Grid>
          <Grid
            item
            xs
            style={{
              //display:'flex',
              //height:'250px',
              alignItems: 'center',
              flex: 1,
              //backgroundColor:'yellow',
              //alignItems:'flex-end',
              justifyContent: 'center',
            }}
          >
            <Tooltip title="Buat User Baru" aria-label="Buat User Baru">
              <Fab
                color="primary"
                aria-label="Add"
                style={{
                  position: 'relative',
                  top: 300,
                  left: 320,
                  right: 0,
                  bottom: 25,
                  backgroundColor: green[500],
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(BrowseUser)
