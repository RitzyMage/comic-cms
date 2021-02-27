import { exec } from "child_process";
import { resolve } from "path";

let run = async (command: string) =>
  await new Promise((resolve, onError) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        onError(error);
      }
      console.error(stderr);
      resolve(stdout);
    });
  });

export default class BuildController {
  async generateStaticBuild() {
    let result = await run("cd ../client && npm run generate");
    console.log(result);
  }
}
