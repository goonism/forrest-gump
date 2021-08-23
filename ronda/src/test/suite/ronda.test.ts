import * as vscode from "vscode"

suite("Ronda Test Suite", () => {
  vscode.window.showInformationMessage("Start Ronda tests.")

  test("Test directory path is correct", async () => {
    // let infoMessages = Sinon.stub(vscode.window, "showInputBox")
    // TODO: Get this working
    await vscode.commands.executeCommand("ronda.newFeature")
  })
})
