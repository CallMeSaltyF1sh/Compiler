//import React from 'react';
//import { Route } from 'react-router-dom';
import CodePane from './containers/CodePane';
import Plot from './containers/Plot';
import Details from './containers/Details';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';

export const routes = [
    {
        path: '/codepane',
        component: CodePane,
        icon: CodeRoundedIcon,
        sideBarName: 'Code Pane'
    },
    {
        path: '/plot',
        component: Plot,
        icon: BrushRoundedIcon,
        sideBarName: 'Produced Pattern'
    },
    {
        path: '/details',
        component: Details,
        icon: EqualizerRoundedIcon,
        sideBarName: 'Detailed Info'
    }
]