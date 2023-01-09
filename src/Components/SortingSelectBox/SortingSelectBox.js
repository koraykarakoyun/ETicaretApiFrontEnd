import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

export default function SortingSelectBox(props) {
    const [data, setData] = React.useState();
    const menuitemStyle = {
        color: "black",
        textDecoration: "none"
    }
    const handleChange = (event) => {
        setData(event.target.value);
    };
    if (props.category != undefined) {
        return (

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sıralama</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={""}
                        label="Sıralama"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}><Link style={menuitemStyle} to={"/" + props.category}>Varsayılan</Link></MenuItem>
                        <MenuItem value={2}><Link style={menuitemStyle} to={"/" + props.category + "/name&asc"}>Urun Adi---A'dan Z'ye</Link></MenuItem>
                        <MenuItem value={3}><Link style={menuitemStyle} to={"/" + props.category + "/name&desc"}>Urun Adi---Z'den A'ya</Link></MenuItem>
                        <MenuItem value={4}><Link style={menuitemStyle} to={"/" + props.category + "/price&asc"}>Artan Fiyat</Link></MenuItem>
                        <MenuItem value={5}><Link style={menuitemStyle} to={"/" + props.category + "/price&desc"}>Azalan Fiyat</Link></MenuItem>

                    </Select>
                </FormControl>
            </Box>
        );
    }
    else {
        return (

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sıralama</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={""}
                        label="Sıralama"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}><Link style={menuitemStyle} to={"/"}>Varsayılan</Link></MenuItem>
                        <MenuItem value={2}><Link style={menuitemStyle} to={"/name&asc"}>Urun Adi---A'dan Z'ye</Link></MenuItem>
                        <MenuItem value={3}><Link style={menuitemStyle} to={"/name&desc"}>Urun Adi---Z'den A'ya</Link></MenuItem>
                        <MenuItem value={4}><Link style={menuitemStyle} to={"/price&asc"}>Artan Fiyat </Link></MenuItem>
                        <MenuItem value={5}><Link style={menuitemStyle} to={"/price&desc"}>Azalan Fiyat</Link></MenuItem>

                    </Select>
                </FormControl>
            </Box>
        );
    }
}