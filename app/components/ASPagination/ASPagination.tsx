import React, { FC } from 'react'
import { connectPagination } from 'react-instantsearch-dom'
import { createStyles, makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme) => createStyles({
  root: {
    marginBottom: theme.spacing(4),
  },
}))

interface PaginationProps {
  currentRefinement: number,
  nbPages: number
  refine: (args: any) => any
}

const ASPagination: FC<PaginationProps> = ({ currentRefinement, nbPages, refine }) => {
  const styles = useStyles()
  const [page, setPage] = React.useState(currentRefinement)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    refine(value)
  }

  return (
    <Pagination
      className={styles.root}
      hidePrevButton
      hideNextButton
      count={nbPages}
      page={page}
      onChange={handleChange}
    />
  )
}

export default connectPagination(ASPagination)
