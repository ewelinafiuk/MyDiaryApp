import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import WorkIcon from '@mui/icons-material/Work';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhoneIcon from '@mui/icons-material/Phone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export const categories = [
    {id: 1, name: 'Party', color: 'lightBlue'},
    {id: 2, name: 'Concert', color: 'pink'},
    {id: 3, name: 'Holiday', color: 'lightGreen'},
    {id: 4, name: 'Night out', color: 'grey'}
]

export const events = [
    {id: 1, name: 'Party', description: 'Super fun', startDate: '10/02/2022', endDate: '11/02/2022', categoryName: 'Party', icon: 'Celebration'},
    {id: 2, name: 'Holidays', description: 'Super fun', startDate: '11/02/2022', endDate: '12/02/2022', categoryName: 'Holiday', icon: 'NightLife'},
    {id: 3, name: 'Movie', description: 'Super fun', startDate: '05/12/2022', endDate: '05/12/2022', categoryName: 'Night out', icon: 'Movie'},
    {id: 4, name: 'Birthdays', description: 'Super fun', startDate: '02/05/2023', endDate: '02/05/2023', categoryName: 'Party', icon: 'Cake'},
    {id: 5, name: 'Concert', description: 'Super fun', startDate: '10/08/2022', endDate: '11/08/2022', categoryName: 'Concert', icon: 'Concert'}
]

export const icons = [
    {label: 'Cake' , value: <CakeIcon/>},
    {label: 'Celebration' , value: <CelebrationIcon/>},
    {label: 'NightLife' , value: <NightlifeIcon/>},
    {label: 'Movie' , value: <MovieFilterIcon/>},
    {label: 'Concert', value: <TheaterComedyIcon/>},
    {label: 'Home', value: <HomeWorkIcon/>},
    {label: 'Work', value: <WorkIcon/>},
    {label: 'Photos', value: <AddAPhotoIcon/>},
    {label: 'Phone', value: <PhoneIcon/>},
    {label: 'Important', value: <PriorityHighIcon/>},
]