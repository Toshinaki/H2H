import _ from "@lodash";
import YAML from "yaml";
// tauri apis
import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  removeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";

/**
 * Saves JSON data to a file asynchronously, with a frequency limit.
 *
 * @param {string} path - The relative path of the file to save the JSON data.
 * @param {unknown} data - The JSON data to be saved.
 * @param {BaseDirectory} [dir=BaseDirectory.Document] - The base directory for the file. Default is `BaseDirectory.Document`.
 * @param {boolean} [overwrite=false] - Specifies whether to overwrite the file if it already exists. Default is false.
 * @returns {Promise<void>} A Promise that resolves when the JSON data is successfully saved to the file.
 * @throws {Error} An error is thrown if the file already exists at the specified path and overwrite is set to false.
 */
export const writeJSON = _.throttle(
  async (
    path: string,
    data: unknown,
    dir: BaseDirectory = BaseDirectory.Document,
    overwrite = false
  ) =>
    exists(path, { dir }).then(async (fileExists) => {
      if (fileExists && !overwrite) {
        throw new Error(`File already exists at: ${path}`);
      } else {
        return writeTextFile(path, JSON.stringify(data), { dir });
      }
    }),
  500
);

/**
 * Reads a JSON file asynchronously from the specified path.
 *
 * @template T - The type of the parsed JSON data.
 * @param {string} path - The relative path of the JSON file to read.
 * @param {BaseDirectory} [dir=BaseDirectory.Document] - The base directory for the file. Default is `BaseDirectory.Document`.
 * @param {T} [defaultValue] - The default value to return if the JSON file doesn't exist and createIfMissing is set to `true`.
 * @param {boolean} [createIfMissing=false] - Specifies whether to create the JSON file with the defaultValue if it doesn't exist. Default is `false`.
 * @returns {Promise<T | undefined>} A Promise that resolves to the parsed JSON data, or defaultValue if createIfMissing is true and the file doesn't exist. Otherwise, it returns undefined.
 * @throws {Error} An error is thrown if the path doesn't end with the .json extension, or if createIfMissing is false and the JSON file doesn't exist.
 */
export async function readJSON<T>(
  path: string,
  dir: BaseDirectory = BaseDirectory.Document,
  defaultValue?: T,
  createIfMissing = false
): Promise<T | undefined> {
  if (!path.endsWith(".json")) {
    throw new Error(`Invalid JSON file: ${path}`);
  }
  return exists(path, { dir }).then(async (fileExists) => {
    if (fileExists) {
      return JSON.parse(await readTextFile(path, { dir })) as T;
    } else if (createIfMissing) {
      await writeJSON(path, JSON.stringify(defaultValue, null, 2), dir);
      return defaultValue;
    } else {
      throw new Error(`JSON file doesn't exist: ${path}`);
    }
  });
}

/**
 * Writes data to a YAML file at the specified path.
 *
 * @param path - The relative path to the YAML file.
 * @param data - The data to write to the file.
 * @param dir - The base directory where the file should be written. Defaults to BaseDirectory.Document.
 * @param overwrite - If set to false, throws an error if the file already exists. Defaults to false.
 * @returns A promise that resolves when the file has been successfully written.
 * @throws An error if the file already exists and overwrite is set to false.
 */
// export const writeYAML = async (
//   path: string,
//   data: unknown,
//   dir: BaseDirectory = BaseDirectory.Document,
//   overwrite = false
// ) =>
//   exists(path, { dir }).then(async (fileExists) => {
//     if (!path.length) {
//       throw new Error(`Invalid path: "${path}"`);
//     }
//     if (fileExists && !overwrite) {
//       throw new Error(`File already exists at: ${path}`);
//     } else {
//       const nodes = _.rsplit(path, "/", 1);
//       const parentPath = nodes.length === 1 ? "" : nodes[0];
//       await exists(parentPath, { dir }).then(async (pathExists) => {
//         if (!pathExists) {
//           await createDir(parentPath, { dir, recursive: true });
//         }
//       });
//       const yamlData = YAML.stringify(data);
//       return writeTextFile(path, yamlData, { dir });
//     }
//   });
export const writeYAML = _.throttle(
  async (
    path: string,
    data: unknown,
    dir: BaseDirectory = BaseDirectory.Document,
    overwrite = false
  ) =>
    exists(path, { dir }).then(async (fileExists) => {
      if (!path.length) {
        throw new Error(`Invalid path: "${path}"`);
      }
      if (fileExists && !overwrite) {
        throw new Error(`File already exists at: ${path}`);
      } else {
        const nodes = _.rsplit(path, "/", 1);
        const parentPath = nodes.length === 1 ? "" : nodes[0];
        await exists(parentPath, { dir }).then(async (pathExists) => {
          if (!pathExists) {
            await createDir(parentPath, { dir, recursive: true });
          }
        });
        const yamlData = YAML.stringify(data);
        return writeTextFile(path, yamlData, { dir });
      }
    }),
  500
);

/**

 * Reads a YAML file from the specified path and returns its contents as an object.

 * @param path - The relative path to the YAML file.
 * @param dir - The base directory where the file is located. Defaults to BaseDirectory.Document.
 * @param suppressError - If true, suppresses the error and returns undefined if the file doesn't exist (default: false).
 * @param defaultValue - The default value to return if the file doesn't exist. Optional.
 * @param createIfMissing - If set to true, creates the file with the default value if it doesn't exist. Defaults to false.
 * @returns A Promise that resolves to the parsed YAML contents of the file.
 * @throws An error if the file path is invalid or the file doesn't exist (unless suppressError is true).
 */
export async function readYAML<T>(
  path: string,
  dir: BaseDirectory = BaseDirectory.Document,
  suppressError = false,
  createIfMissing = false,
  defaultValue?: T
): Promise<T | undefined> {
  if (!path.endsWith(".yaml") && !path.endsWith(".yml")) {
    throw new Error(`Invalid YAML file: ${path}`);
  }
  return exists(path, { dir }).then(async (fileExists) => {
    if (fileExists) {
      const fileContents = await readTextFile(path, { dir });
      return YAML.parse(fileContents) as T;
    } else if (createIfMissing) {
      await writeYAML(path, defaultValue, dir);
      return defaultValue;
    } else if (!suppressError) {
      throw new Error(`YAML file doesn't exist: ${path}`);
    } else {
      return undefined;
    }
  });
}

export async function deleteFile(path: string, dir: BaseDirectory = BaseDirectory.Document) {
  return await removeFile(path, { dir });
}
