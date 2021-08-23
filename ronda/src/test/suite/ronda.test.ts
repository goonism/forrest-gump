import * as assert from "assert"

import * as Sinon from "Sinon"
import * as vscode from "vscode"
import * as extension from "../../extension"

suite("Ronda Test Suite", () => {
  vscode.window.showInformationMessage("Start Ronda tests.")

  test("Test directory path is correct", async () => {
    let infoMessages = Sinon.stub(vscode.window, "showInputBox")
    // TODO: Get this working
    await vscode.commands.executeCommand("ronda.newFeature")
  })
})
