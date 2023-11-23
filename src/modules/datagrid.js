import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { icons } from '../constants/icons';
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
    const { setRows, setRowModesModel, newRow } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, ...newRow, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add new
        </Button>
      </GridToolbarContainer>
    );
  }

function MyDataGrid({rows, setRows, columns, validation, validationErrorText, onDeleteValidation, newRow}) {
    const [rowModesModel, setRowModesModel] = useState({});
    const [snackbar, setSnackbar] = useState()
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        if (!validation(params.row)){
          setRows(rows.filter((row) => row.id !== params.row.id));
        }
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      if (onDeleteValidation && onDeleteValidation(id)) {
        setSnackbar({ children: 'Cannot delete this row', severity: 'error' })
      }
      else {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id)
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id))
      }
    };
  
    const processRowUpdate = (newRow) => {
      if (typeof(newRow?.icon) !== typeof('')) {
        const iconName = icons.find(i => i.value === newRow.icon)?.label
        newRow = {...newRow, icon: iconName}
      }
      const updatedRow = { ...newRow, isNew: false }
      if (validation(updatedRow)) {
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        return updatedRow;
      }
      else {
        setSnackbar({ children: validationErrorText, severity: 'error' })
      }
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel)
    };
  
    const handleCloseSnackbar = () => setSnackbar(null);

    const allColumns = [
        ...columns,
        {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 80,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
  
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
                columns={allColumns}
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
    )
  }
  
  export default MyDataGrid;