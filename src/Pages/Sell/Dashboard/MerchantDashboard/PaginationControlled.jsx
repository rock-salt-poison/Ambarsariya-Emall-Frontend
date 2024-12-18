import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({pageLabels}) {
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={4} alignItems="center">
      {pageLabels[page - 1]}
      <Pagination count={pageLabels.length} page={page} onChange={handleChange} />
    </Stack>
  );
}
