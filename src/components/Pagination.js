import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const PlayerPagination = ({ pageCount, dataPerPage, updateData }) => {
  const [ page, setPage ] = useState(1)

  const handlePageChange = (event, value) => {
    setPage(value)
    const firstPageIndex = (value - 1) * dataPerPage
    const lastPageIndex = firstPageIndex + dataPerPage
    updateData(firstPageIndex, lastPageIndex)
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  const paginationInlineStyle = {
    //backgroundColor: '#18212B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div style={paginationInlineStyle}>
      <ThemeProvider theme={darkTheme}>
        <Pagination variant="outlined" count={pageCount} page={page} onChange={handlePageChange} />
      </ThemeProvider>
    </div>
  )
}

export default PlayerPagination;