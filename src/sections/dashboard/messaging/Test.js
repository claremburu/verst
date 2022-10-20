<Box>
  <Button variant="contained" onClick={setMtOpen}>
    New Mt Route
  </Button>

  <Modal
    sx={{ height: '100%' }}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Typography sx={{ my: 1 }} variant="subtitle2">
      Select SMPP Server Account
    </Typography>
    <FormControl sx={{ minWidth: '100%' }} size="small">
      <Select
        value={smppClients}
        onChange={handleSmppClients}
        // displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        multiple
      >
        {smppUsers?.map(({ userId, serverName }) => (
          <MenuItem value={userId}>{serverName}</MenuItem>
        ))}
      </Select>
    </FormControl>
    {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
    {/* <FormControl sx={{ minWidth: '100%' }} size="small">
        <Select
          value={groups}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {filters.map(filter => <MenuItem value={filters}>{filter}</MenuItem>)}
        </Select>
      </FormControl> */}
    {/* <TextField placeholder="Account Name" size="small" fullWidth /> */}

    <Typography sx={{ my: 1 }} variant="subtitle2">
      Select one or more filters
    </Typography>
    <FormControl sx={{ width: '100%' }} size="small">
      <Select
        value={filterIds}
        onChange={handleChangeFilters}
        multiple
        // displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {filters?.map(({ filterId, filterName, filterType }) => (
          <MenuItem value={filterId}>
            {filterName} - {filterType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {/* <TextField sx={{ minWidth: '100%' }} minRows={4} multiline fullWidth /> */}
    {/* <Typography sx={{ my: 1 }} variant="subtitle2">
      Enter Rate
    </Typography> */}
    {/* <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth size="small" value={rate} onChange={handleRate} /> */}
    <Typography sx={{ my: 1 }} variant="subtitle2">
      Supplier
    </Typography>
    <FormControl sx={{ minWidth: '100%' }} size="small">
      <Select
        value={stateClients}
        onChange={handleClients}
        // displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {clients?.map(({ clientId, clientName }) => (
          <MenuItem value={clientId}>{clientName}</MenuItem>
        ))}
      </Select>
    </FormControl>
    {/* <Typography sx={{ my: 1 }} variant="subtitle2">
      Route Destination
    </Typography> */}
    {/* <TextField sx={{ minWidth: '100%' }} fullWidth placeholder="route destination" size="small" value={routeDestination} onChange={handleRouteDestination}/> */}
    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }} spacing={2}>
      <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="contained" endIcon={<SaveIcon />} onClick={handleCreateMtRoutes}>
        Save
      </Button>
    </Stack>
  </Modal>
</Box>;
