import { paramCase } from "change-case"
import fs from "fs-extra"
import inquirer from "inquirer"
import path from "path"

async function main() {
  const dirs = fs
    .readdirSync(process.cwd(), { withFileTypes: true })
    .filter(
      (dir) =>
        dir.isDirectory() && dir.name[0] !== "." && dir.name !== "node_modules"
    )
    .map((dir) => dir.name)

  const {
    rawFeatureName,
    projectName,
    featureBasePath,
    rawFeatureDirectories
  } = await inquirer.prompt([
    {
      message: "New feature name",
      type: "input",
      name: "rawFeatureName"
    },
    {
      message: "Parent project",
      type: "list",
      choices: dirs,
      name: "projectName",
      default: dirs.includes("app") ? "app" : dirs[0]
    },
    {
      message: "Base feature path",
      type: "input",
      name: "featureBasePath",
      default: "features"
    },
    {
      message: "Feature directory structure",
      type: "input",
      name: "rawFeatureDirectories",
      default: "components, hooks, utils"
    }
  ])

  const appFeaturePath = path.resolve(
    path.join(process.cwd(), projectName, featureBasePath)
  )

  const featureName = paramCase(rawFeatureName)

  const newfeaturePath = path.join(appFeaturePath, featureName)

  await fs.ensureDir(newfeaturePath)

  const featureDirectories = rawFeatureDirectories
    .split(",")
    .map((dir) => dir.trim())

  const featureDirectoriesPaths = featureDirectories.map((directory) =>
    path.join(newfeaturePath, directory)
  )

  await Promise.all(featureDirectoriesPaths.map((fdp) => fs.ensureDir(fdp)))

  console.log("🎉 New feature created!")

  console.dir(featureDirectoriesPaths)
}

main()
