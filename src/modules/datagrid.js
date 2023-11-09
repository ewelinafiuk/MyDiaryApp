import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { icons } from '../constants/constants';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', description: '', startDate: new Date(), endDate: new Date(), isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add new event
        </Button>
      </GridToolbarContainer>
    );
  }

function MyDataGrid({rows, setRows, categoriesRows}) {
    const [rowModesModel, setRowModesModel] = useState({});
    const [snackbar, setSnackbar] = useState()
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        if (!validateRow(params.row)){
          setRows(rows.filter((row) => row.id !== params.row.id));
        }
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const validateRow = (row) => {
      const notEpmty = !!row.name && !!row.description && !!row.startDate && !!row.endDate && !!row.categoryName
      const validDate = new Date(row.startDate) < new Date(row.endDate)
      return notEpmty && validDate
    }
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      if (typeof(newRow?.icon) !== typeof('')) {
        const iconName = icons.find(i => i.value === newRow.icon)?.label
        newRow = {...newRow, icon: iconName}
      }
      const updatedRow = { ...newRow, isNew: false };
      if (validateRow(updatedRow)) {
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      }
      else {
        setSnackbar({ children: 'To save insert all required data and make sure end date is greater than start date!', severity: 'error' })
      }
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    const handleCloseSnackbar = () => setSnackbar(null);

    const columns = [
        { field: 'name', headerName: 'Name', width: 200, editable: true},
        { field: 'description', headerName: 'Description',  width: 300, editable: true },
        { field: 'startDate', headerName: 'Start Date', valueGetter: ({ value }) => new Date(value), type: 'date', width: 150, editable: true},
        { field: 'endDate', 
          headerName: 'End Date', type: 'date', valueGetter: ({ value }) => new Date(value), width: 150,  editable: true},
        { field: 'categoryName', headerName: 'Category', width: 120, editable: true, type: 'singleSelect', valueOptions: categoriesRows.map(c => c.name) },
        { field: 'icon', 
          headerName: 'Icon',  
          width: 120,
          renderCell: (params) => {return params?.value},
          valueGetter: (params) => {return icons.find(i => i.label === params.value)?.value},
          editable: true, 
          type: 'singleSelect', 
          valueOptions: icons.map(c => c.label)
        },
        {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 80,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    return (
        <div>
            <div style={{ height: 'fit-content', marginLeft: 100, marginRight: 100, marginTop: 50, backgroundColor: 'white'}}>
            <DataGrid 
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                rows={rows} 
                columns={columns}
            />
            {!!snackbar && (
              <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
              >
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
            </div>
        </div>
        
    )
  }
  
  export default MyDataGrid;