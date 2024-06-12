import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

global.render = render;
// cannot inject screen here, as something is already in the way (idky what at this point and no longer care to find out)
// global.screen = screen;
global.userEvent = userEvent;
