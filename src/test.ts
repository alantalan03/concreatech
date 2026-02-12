// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import './app/modules/auth/pages/login/login.component.spec';

declare var require: {
	<T>(path: string): T;
	(paths: string[], callback: (...modules: any[]) => void): void;
	ensure: (
		paths: string[],
		callback: (require: <T>(path: string) => T) => void
	) => void;
	context: (
		directory: string,
		useSubdirectories: boolean,
		regExp: RegExp
	) => any;
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

// Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// context.keys().map(context);
