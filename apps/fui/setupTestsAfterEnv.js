import { useState, useContext, useEffect } from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// testing globals
global.render = render;
global.fireEvent = fireEvent;
global.renderHook = renderHook;
// cannot inject screen here, as something is already in the way (idky what at this point and no longer care to find out)
// global.screen = screen;
global.userEvent = userEvent;

// react globals
global.useState = useState;
global.useContext = useContext;
global.useEffect = useEffect;
