import React, {useEffect} from 'react';
import {LANDING_PAGE} from '../../constants';

const HomePage = () => {
    useEffect(() => {
        window.location.href = LANDING_PAGE
    },[])
    return(
        <div>
            
        </div>
    )
}

export default HomePage