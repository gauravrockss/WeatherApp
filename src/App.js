import {
    Box,
    Card,
    CardContent,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [data, setData] = useState({});
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = () => {
        getWeather(input);
        setInput('');
    };
    async function getWeather(name) {
        if (!name) return;
        try {
            const responce = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e7305845f9d9a8b94b26e7d5615e4e99&units=metric`
            );
            setData(responce.data);
        } catch (e) {
            console.log(e);
        }
    }
    console.log(data);
    useEffect(() => {
        getWeather('delhi');
    }, []);

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    height: '100vh',
                    background: `url(${process.env.PUBLIC_URL}/images/weather.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                width='100%'
                height='90vh'
            >
                <Typography variant='h2' py={2} color='white'>
                    Weather Forcasting
                </Typography>
                <Card
                    sx={{
                        p: 3,
                        minWidth: 400,

                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                        backdropFilter: 'blur(5px)',
                        // webkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <CardContent>
                        <Paper component='form'>
                            <InputBase
                                onChange={handleChange}
                                value={input}
                                sx={{ ml: 5, flex: 1 }}
                                placeholder='Search Location'
                                inputProps={{
                                    'aria-label': 'search google maps',
                                }}
                            />
                            <IconButton
                                type='button'
                                sx={{ p: '10px' }}
                                onClick={handleClick}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Box textAlign='center' py={4} color='white'>
                            {/* <Image name='cloud.png' width='30%' /> */}
                            {data?.weather?.map((i) => (
                                <img
                                    src={`https://openweathermap.org/img/wn/${i.icon}@2x.png`}
                                    alt=''
                                />
                            ))}
                            <Box py={2}>
                                <Typography variant='h4'>
                                    {data?.main?.temp}°celsius
                                </Typography>
                                <Typography variant='h4'>
                                    {' '}
                                    {data?.name}
                                </Typography>
                            </Box>
                            <Grid container mt={3}>
                                <Grid item lg={6}>
                                    <Box display='flex'>
                                        <Box>
                                            <IconButton>
                                                <WaterIcon
                                                    fontSize='large'
                                                    sx={{ color: 'white' }}
                                                />
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography variant='h6'>
                                                {data?.main?.humidity}%
                                            </Typography>
                                            <Typography variant='h6'>
                                                Humidity
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item lg={6}>
                                    <Box display='flex'>
                                        <Box>
                                            <IconButton>
                                                <AirIcon
                                                    fontSize='large'
                                                    sx={{ color: 'white' }}
                                                />
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography variant='h6'>
                                                {data?.wind?.speed} km/h
                                            </Typography>
                                            <Typography variant='h6'>
                                                Wind
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default App;
