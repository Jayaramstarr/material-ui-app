import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import FormControl from "@material-ui/core/FormControl"

import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
    bold:{
      fontWeight:700
    },
    feild:{
      marginTop:20,
      marginBottom:20,
      display:'block'
    }
})

const Create = () => {
  
  const classes = useStyles() 
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')

  const handleSubmit = e => {
    e.preventDefault()
    if(title && details)
    {
      fetch('http://localhost:8000/notes', {
        method:'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({ title, details, category })
      })
      .then(() => history.push('/'))
    }
    else
    {
      title ?  setTitleError(false) : setTitleError(true)
      details ? setDetailsError(false) : setDetailsError(true)
    }
  }



  return (
    <Container>
      <Typography
        color="textSecondary"
        className={classes.bold}
        variant="h6"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={ e => setTitle(e.target.value) }
          className={classes.feild}
          label="Note Title"
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={ e => setDetails(e.target.value) }
          className={classes.feild}
          label="Details"
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.feild}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
            <FormControlLabel control={<Radio/>} value="money" label="Money"/>
            <FormControlLabel control={<Radio/>} value="todos" label="Todos"/>
            <FormControlLabel control={<Radio/>} value="reminders" label="Reminders"/>
            <FormControlLabel control={<Radio/>} value="work" label="Work"/>
          </RadioGroup>          
        </FormControl>
        

        <Button 
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon/>}
          >
          Submit
        </Button>
      </form>
      <br/>
    </Container>
  )
}

export default Create