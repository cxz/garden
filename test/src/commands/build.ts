import { join } from "path"
import { GardenContext } from "../../../src/context"
import { BuildCommand } from "../../../src/commands/build"
import { expect } from "chai"

describe("commands.build", () => {
  const projectRootA = join(__dirname, "..", "..", "data", "test-project-a")

  it("should build all modules in a project", async () => {
    const ctx = new GardenContext(projectRootA)
    const command = new BuildCommand()

    const result = await command.action(ctx, { module: undefined }, { force: true })

    expect(result).to.eql({
      "build.module-a": { fresh: true, buildLog: "A\n" },
      "build.module-b": { fresh: true, buildLog: "B\n" },
      "build.module-c": { fresh: true },
    })
  })

  it("should optionally build single module and its dependencies", async () => {
    const ctx = new GardenContext(projectRootA)
    const command = new BuildCommand()

    const result = await command.action(ctx, { module: "module-b" }, { force: true })

    expect(result).to.eql({
      "build.module-a": { fresh: true, buildLog: "A\n" },
      "build.module-b": { fresh: true, buildLog: "B\n" },
    })
  })
})
