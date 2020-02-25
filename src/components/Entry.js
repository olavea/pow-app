import React, { useState, useEffect } from "react"
import { isFuture, isToday } from "date-fns"
import classnames from "classnames"

import { Container, Paper, makeStyles } from "@material-ui/core"

import { useCycleDayState } from "../cycle"
import { useDataActions } from "../database"

import EntryHeader from "./EntryHeader"
import EntryNote from "./EntryNote"
import EntryPredictions from "./EntryPredictions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
  main: {
    zIndex: 1,
  },
  today: {
    borderColor: theme.palette.secondary.light,
    borderWidth: 2,
    borderStyle: "solid",
  },
  predictions: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    background: theme.palette.grey[100],
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  tags: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

const Entry = ({ date, entryId, entry }) => {
  const classes = useStyles()
  const [note, setNote] = useState()
  const { upsertEntry } = useDataActions()
  const { cycleDay, predictions, isMenstruation } = useCycleDayState({
    date: entryId,
    note,
  })

  useEffect(() => {
    if (!entry) return

    setNote(entry.note)
  }, [entry])

  const onNoteChange = (note) => {
    setNote(note)
    upsertEntry(entryId, { note })
  }

  return (
    <Container component="article" className={classes.root}>
      <EntryHeader
        date={date}
        isToday={isToday(date)}
        isMenstruation={isMenstruation || predictions.isMenstruation}
        cycleDay={cycleDay}
      ></EntryHeader>
      {!isFuture(date) && (
        <Paper
          elevation={isToday(date) ? 3 : 1}
          className={classnames(classes.main, {
            [classes.today]: isToday(date),
          })}
        >
          <EntryNote
            note={note}
            isToday={isToday(date)}
            onNoteChange={onNoteChange}
          ></EntryNote>
        </Paper>
      )}
      <EntryPredictions predictions={predictions.tags}></EntryPredictions>
    </Container>
  )
}

export default Entry
