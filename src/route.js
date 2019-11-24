//import React from 'react';
//import { Route } from 'react-router-dom';
import CodePane from './containers/CodePane';
import { Dashboard } from '@material-ui/icons';
//import CodeIcon from '@material-ui/icons/Code';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import FilterIcon from '@material-ui/icons/Filter';
import CollectionsRoundedIcon from '@material-ui/icons/CollectionsRounded';

export const routes = [
    {
        path: '/',
        component: CodePane,
        icon: CodeRoundedIcon,
        sideBarName: 'CodePane'
    }
]