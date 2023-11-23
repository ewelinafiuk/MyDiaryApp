import * as React from 'react';
import {colors} from '../constants/colors'
import MyDataGrid from './datagrid';

const styles = {
  container: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center'
  },
  gridContainer: { 
    height: 'fit-content', 
    width: 400, 
    marginTop:50, 
    backgroundColor: 'white'
  },
  header: {
    paddingTop: 10,
    marginBottom: 10,
    fontSize: 20
  }
};

function CategoriesGrid({categories, setCategories, events}) {

  const validateRow = (row) => {
    return !!row.name && !!row.color
  }

  const validateOnDelete = (id) => {
    const cat = categories.find(c => c.id === id)
    const e = events.find(e => e.categoryId === cat.id)
    return !!e
  }

  const validationErrorText = "To save insert all required data!"
  
  const newRow = { name: '' }

  const columns = [
      { field: 'name', headerName: 'Name', width: 120, editable: true},
      { field: 'color', 
        headerName: 'Color', 
        width: 150, 
        editable: true, 
        valueOptions: colors.map(c => c), 
        type: 'singleSelect', 
        renderCell: (props)  => {
            return <div style={{width: '100%', height: '100%', backgroundColor: props.value}} />
        }
      }
  ];

  return (
      <div style={styles.container}>
          <div style={styles.gridContainer}>
          <div style={styles.header} >Categories table </div>
            <MyDataGrid 
              columns={columns} 
              rows={categories} 
              setRows={setCategories} 
              validation={validateRow} 
              onDeleteValidation={validateOnDelete}
              validationErrorText={validationErrorText}
              newRow={newRow}
            />
          </div>
      </div> 
  )
}
  
export default CategoriesGrid;