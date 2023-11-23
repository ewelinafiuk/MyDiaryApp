import React from 'react';
import { icons } from '../constants/icons';
import MyDataGrid from './datagrid';

const styles = {
    container: { 
        height: 'fit-content', 
        marginLeft: 100, 
        marginRight: 100, 
        marginTop: 50, 
        backgroundColor: 'white'
    },
    header: {
      paddingTop: 10,
      marginBottom: 10,
      fontSize: 20
    }
  };

  
function EventsGrid({rows, setRows, categoriesRows}) {

    const validateRow = (row) => {
      const notEpmty = !!row.name && !!row.description && !!row.startDate && !!row.endDate && !!row.categoryId
      const validDate = new Date(row.startDate) < new Date(row.endDate)
      return notEpmty && validDate
    }

    const validationErrorText = "To save insert all required data and make sure end date is greater than start date!"
  
    const newRow = { name: '', description: '', startDate: new Date(), endDate: new Date() }

    const columns = [
        { field: 'name', headerName: 'Name', width: 200, editable: true},
        { field: 'description', headerName: 'Description',  width: 300, editable: true },
        { field: 'startDate', headerName: 'Start Date', valueGetter: ({ value }) => new Date(value), type: 'date', width: 150, editable: true},
        { field: 'endDate', 
          headerName: 'End Date', type: 'date', valueGetter: ({ value }) => new Date(value), width: 150,  editable: true},
        { field: 'categoryId', 
          headerName: 'Category', 
          width: 120, 
          editable: true, 
          type: 'singleSelect', 
          valueOptions: categoriesRows.map(c => c.name),
          valueGetter: ({value}) => categoriesRows.find(c => c.id === value)?.name,
          valueSetter: (params) => {
            const categoryId = categoriesRows.find(c => c.name === params.value)?.id
            return {...params.row, categoryId}
          }
        },
        { field: 'icon', 
          headerName: 'Icon',  
          width: 120,
          renderCell: (params) => {return params?.value},
          valueGetter: (params) => {return icons.find(i => i.label === params.value)?.value},
          editable: true, 
          type: 'singleSelect', 
          valueOptions: icons.map(c => c.label)
        }
    ];

    return (
        <div style={styles.container}>
          <div style={styles.header} >Events table </div>
            <MyDataGrid 
                rows={rows} 
                setRows={setRows}
                columns={columns}
                validation={validateRow} 
                validationErrorText={validationErrorText}
                newRow={newRow}
            />
        </div>
        
    )
  }
  
  export default EventsGrid;