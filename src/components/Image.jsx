import { Box } from '@mui/material';
import React from 'react';

const Image = props => {
    const { name, sx, ...rest } = props;
    return (
        <Box
            component='img'
            src={`${process.env.PUBLIC_URL}/images/${name}`}
            sx={{ maxWidth: '100%', ...sx }}
            {...rest}
        />
    );
};

export default Image;
