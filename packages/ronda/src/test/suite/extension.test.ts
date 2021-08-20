import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as extension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', async () => {
		const ext = vscode.extensions.getExtension("ronda");
		if(!ext){
			return;
		}
		const myExtensionContext = await ext.activate();
		myExtensionContext
	});
});
