import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import {colors} from '../constants/constants'


function EditToolbar(props) {
    const { setCategories, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setCategories((oldRows) => [...oldRows, { id, name: '', description: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add new category
        </Button>
      </GridToolbarContainer>
    );
  }

function CategoriesGrid({categories, setCategories}) {
    const [rowModesModel, setRowModesModel] = React.useState({});
  
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };
    
      const handleDeleteClick = (id) => () => {
        setCategories(categories.filter((row) => row.id !== id));
      };
    
      const handleCancelClick = (id) => () => {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = categories.find((row) => row.id === id);
        if (editedRow.isNew) {
          setCategories(categories.filter((row) => row.id !== id));
        }
      };
    
      const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setCategories(categories.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      };
    
      const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
      };
  
      
    const columns = [
        { field: 'name', headerName: 'Name', width: 150, editable: true},
        { field: 'color', headerName: 'Color', width: 150, editable: true, valueOptions: colors.map(c => c), type: 'singleSelect', 
        renderCell: (props)  => {
            return <div style={{width: '100%', height: '100%', backgroundColor: props.value}} />
        }},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
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
          }
    ];

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div style={{ height: 'fit-content', width: 500, marginTop:50, backgroundColor: 'white'}}>
            <DataGrid 
                editMode="row"
                rows={categories} 
                columns={columns}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setCategories, setRowModesModel },
                }}
            />
            </div>
        </div>
        
    )
  }
  
  export default CategoriesGrid;