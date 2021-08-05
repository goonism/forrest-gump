import { ExtensionContext } from "vscode";
import newFeature from "./commands/new-feature";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  context.subscriptions.push(newFeature());
}

// this method is called when your extension is deactivated
export function deactivate() {}
