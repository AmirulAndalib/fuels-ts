import { versions } from '@fuel-ts/versions';
import toml from '@iarna/toml';
import { mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { runScaffoldCli, setupProgram } from '../src/cli';
import * as doesTemplateExistMod from '../src/lib/doesTemplateExist';
import { templates } from '../src/lib/setupProgram';

import type { ProjectPaths } from './utils/bootstrapProject';
import {
  bootstrapProject,
  cleanupFilesystem,
  copyTemplate,
  resetFilesystem,
} from './utils/bootstrapProject';
import { generateArgv } from './utils/generateArgs';
import { mockExecSync } from './utils/mockExecSync';
import { mockLogger } from './utils/mockLogger';
import { filterOriginalTemplateFiles, getAllFiles } from './utils/templateFiles';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('CLI', { timeout: 15_000 }, () => {
  const { error, log } = mockLogger();
  let paths: ProjectPaths;

  beforeEach(() => {
    paths = bootstrapProject(__filename);
    copyTemplate(paths.templateSource, paths.templateRoot);
    mockExecSync();
  });

  afterEach(() => {
    resetFilesystem(paths.projectRoot);
    resetFilesystem(paths.templateRoot);
    vi.resetAllMocks();
  });

  afterAll(() => {
    cleanupFilesystem();
  });

  test('create-fuels extracts the template to the specified directory', async () => {
    const args = generateArgv({ projectName: paths.projectRoot, template: paths.templateName });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    });

    let originalTemplateFiles = await getAllFiles(paths.templateSource);
    originalTemplateFiles = filterOriginalTemplateFiles(originalTemplateFiles);

    const testProjectFiles = (await getAllFiles(paths.projectRoot)).filter(
      (filename) => !filename.includes('dist')
    );

    expect(originalTemplateFiles.sort()).toEqual(testProjectFiles.sort());
  });

  test('create-fuels checks the versions on the fuel-toolchain file', async () => {
    const args = generateArgv({ projectName: paths.projectRoot, template: paths.templateName });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    });

    const fuelToolchain = readFileSync(paths.fuelToolchainPath, 'utf-8');
    const parsedFuelToolchain = toml.parse(fuelToolchain);

    const { toolchain, components } = parsedFuelToolchain;

    expect(toolchain).toEqual({ channel: 'testnet' });
    expect(components).toEqual({
      forc: versions.FORC,
      'fuel-core': versions.FUEL_CORE,
    });
  });

  test('should rewrite for the appropriate package manager', async () => {
    process.env.npm_config_user_agent = 'bun';

    const args = generateArgv({
      projectName: paths.projectRoot,
      template: paths.templateName,
    });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    });

    const packageJson = readFileSync(paths.packageJsonPath, 'utf-8');
    expect(packageJson).toContain('bun run prebuild');

    const readmePath = join(paths.projectRoot, 'README.md');
    const readme = readFileSync(readmePath, 'utf-8');
    expect(readme).toContain('bun run fuels:dev');
    expect(readme).toContain('bun run dev');

    delete process.env.npm_config_user_agent;
  });

  test('create-fuels reports an error if the project directory already exists', async () => {
    const args = generateArgv({ projectName: paths.projectRoot, template: paths.templateName });

    // Generate the project once
    mkdirSync(paths.projectRoot, { recursive: true });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    // Generate the project again
    await runScaffoldCli({
      program: setupProgram(),
      args,
    }).catch((e) => {
      expect(e).toBeInstanceOf(Error);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(`A folder already exists at ${paths.projectRoot}`)
    );
  });

  test('create-fuels reports an error if the template does not exist', async () => {
    const args = generateArgv({
      projectName: paths.projectRoot,
      template: 'non-existent-template',
    });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(false);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    }).catch((e) => {
      expect(e).toBeInstanceOf(Error);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(`Template 'non-existent-template' does not exist.`)
    );
    expect(log).toHaveBeenCalledWith();
    expect(log).toHaveBeenCalledWith('Available templates:');
    for (const template of templates) {
      expect(log).toHaveBeenCalledWith(`  - ${template}`);
    }
  });

  test('should have a package.json with overrides', async () => {
    const args = generateArgv({
      projectName: paths.projectRoot,
      template: paths.templateName,
    });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    });

    const packageJson = readFileSync(paths.packageJsonPath, 'utf-8');
    const packageJsonObject = JSON.parse(packageJson);

    expect(packageJsonObject).toEqual(
      expect.objectContaining({
        overrides: expect.any(Object),
      })
    );
  });

  test('should rewrite overrides for pnpm', async () => {
    process.env.npm_config_user_agent = 'pnpm';

    const args = generateArgv({
      projectName: paths.projectRoot,
      template: paths.templateName,
    });

    vi.spyOn(doesTemplateExistMod, 'doesTemplateExist').mockReturnValueOnce(true);

    await runScaffoldCli({
      program: setupProgram(),
      args,
    });

    const packageJson = readFileSync(paths.packageJsonPath, 'utf-8');
    const packageJsonObject = JSON.parse(packageJson);

    expect(packageJsonObject.overrides).toBeUndefined();
    expect(packageJsonObject).toEqual(
      expect.objectContaining({
        pnpm: {
          overrides: expect.any(Object),
        },
      })
    );

    delete process.env.npm_config_user_agent;
  });
});
