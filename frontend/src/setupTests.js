// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react'; // so that we can use JSX syntax
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react'; // testing helpers
import userEvent from '@testing-library/user-event'; // testing helpers for imitating user events
import 'jest-dom/extend-expect'; // to extend Jest's expect with DOM assertions

import './helpers/initTestLocalization'; // to configure i18n for tests
import Root from './index.js'; // the app that we are going to test

