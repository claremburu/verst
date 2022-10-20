<Card id="messages">
<MessagesToolbar
  numSelected={selected.length}
  filterName={filterName}
  onFilterName={handleFilterByName}
  // onDeleteUsers={() => handleDeleteUser(selected)}
/>

<Scrollbar>
  {/* <Button onClick={DownloadPDF}>Download</Button> */}
  <TableContainer sx={{ minWidth: 800 }} id="messages">
    {/* <Button variant='contained' onClick={DownloadPDF}>Download</Button> */}
    <Table sx={{ minWidth: 650 }} size="small">
      <MessagesListHead
        order={order}
        orderBy={orderBy}
        headLabel={TABLE_HEAD}
        rowCount={productList.length}
        numSelected={selected.length}
        onRequestSort={handleRequestSort}
        onSelectAllClick={handleSelectAllClick}
      />

      <TableBody>
        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          const { campaignId, msisdn, message, rate, currency, operatorName } = row;

          const isItemSelected = selected.indexOf(campaignId) !== -1;

          return (
            <StyledTableRow
              hover
              key={campaignId}
              tabIndex={-1}
              role="checkbox"
              selected={isItemSelected}
              aria-checked={isItemSelected}
            >
              <StyledTableCell padding="checkbox">
                <Checkbox checked={isItemSelected} onClick={() => handleClick(campaignId)} />
              </StyledTableCell>
              <StyledTableCell>{msisdn}</StyledTableCell>
              <StyledTableCell>{message}</StyledTableCell>
              <StyledTableCell>{rate}</StyledTableCell>
              <StyledTableCell>{currency}</StyledTableCell>
              <StyledTableCell>{operatorName}</StyledTableCell>
              <TableCell align="right">
                <MessagesMoreMenu userData={row} />
              </TableCell>
            </StyledTableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>

      {isNotFound && (
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              <Box sx={{ py: 3 }}>
                <SearchNotFound searchQuery={filterName} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  </TableContainer>

  <div style={{ height: 300, width: '100%' }}>
    <DataGrid
      {...data}
      loading={loading}
      components={{
        Toolbar: CustomToolbar,
      }}
    />
  </div>
</Scrollbar>

<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={productList.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, value) => setPage(value)}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
</Card>