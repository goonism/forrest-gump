import * as vscode from "vscode";

import { readJson, copy } from "fs-extra";

import { workspace, window } from "vscode";

export default (): vscode.Disposable =>
  vscode.commands.registerCommand("ronda.newFeature", async () => {
    try {
      //#region Initialize

      const config = workspace.getConfiguration();

      const { namespace, templateModule } = config;

      const workingPaths = await getWorkingPaths(config);

      const [, pluginFilePath, sourcePath, templateModulePath] = workingPaths;

      const [newFeatureName, newModuleSourcePath] = await inputModuleName(
        namespace,
        sourcePath
      );

      //#endregion

      //#region Generating
      vscode.window.showWarningMessage(`Generating ${newFeatureName} . . . 🎁`);

      const pluginFileJSON = await readJson(pluginFilePath);

      const pluginModules = pluginFileJSON.Modules;

      //#region Checking plugin entry

      checkModuleExist(pluginModules, newFeatureName);

      //#endregion

      const newModuleEntry = getModuleEntry(newFeatureName);
      pluginFileJSON.Modules.push(newModuleEntry);

      await prepareModule(copy, pluginFilePath, pluginFileJSON, [
        templateModulePath,
        newModuleSourcePath,
      ]);

      await createModule(templateModule, newFeatureName, newModuleSourcePath);

      //#endregion

      //#endregion
      vscode.window.showInformationMessage(`Success ! ! ! 🎉`);
    } catch (error) {
      vscode.window.showErrorMessage(error.message);
    }
  });
