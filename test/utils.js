"use strict";

const { join } = require("path");
const { existsSync, readFileSync, writeFileSync, rmSync } = require("fs");
const { parse } = require("@ltd/j-toml");

/**
 * Loads content of the file and returns it as {string}.
 *
 * If error is thrown, returns {null}.
 * @param {string} filepath path to file to be loaded
 * @returns {string | null} content of the file as {string}
 */
const loadFile = (filepath) => {
  const path = join(process.cwd(), filepath);
  try {
    if (!existsSync(path)) {
      throw new Error(`${path} not found.`);
    }
    return readFileSync(path, { encoding: "utf-8", flag: "r" });
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Parses string with .toml file format and returns the {object}.
 *
 * If error is thrown, returns {null}.
 * @param {string} content toml-formatted string to be parsed
 * returning .toml file content as string
 * @returns {object | null} parsed toml file
 */
const parseToml = (content) => {
  try {
    return parse(content, 1, "\n");
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Wrapper. Loads .toml file and parses the content.
 *
 * If error is thrown, returns {null}.
 * @param {string} filepath path to .toml config file
 * @returns {object | null} content of .toml config file
 */
const getTomlConfig = (filepath) => {
  return parseToml(loadFile(filepath));
};

/**
 * Parse custom dimensions from request url strings and returns them as object.
 *
 * If regExp pattern is not matched in requestString, returns {null}.
 *
 * @param {string} requestString request url to be matched against regExp
 * @param {string} dimsRegExpString stringRegexp to be parsed out of request url
 * @param {string} splitter splitter between key, value, e.g. `=`
 * @returns {object | null} parsed custom dimensions
 */
const parseCustomDimensions = (requestString, dimsRegExpString, splitter) => {
  const r = new RegExp(dimsRegExpString, "g");
  const found = requestString.match(r);

  if (found) {
    const output = {};
    found.forEach((item) => {
      const split = item.split(splitter);
      output[split[0]] = split[1];
    });

    return output;
  }
  return null;
};
/**
 * Converts values of the props to <true | false>.
 *
 * True, if value is not "undefined" OR it is not empty string.
 *
 * Else false.
 *
 * @param {object} parsedCustomDims parsed custom dimensions object
 * @returns {object} {key: boolean}
 */
const valuesToBool = (parsedCustomDims) => {
  const output = {};
  for (const [key, value] of Object.entries(parsedCustomDims)) {
    if (typeof value !== "undefined" && value !== "") {
      output[key] = true;
      continue;
    }
    output[key] = false;
  }
  return output;
};
/**
 * Wrapper.
 *
 * Parses custom dimensions from the request string and than converts values of the object to <boolean> type.
 * @param {string} requestString
 * @param {string} dimsRegExpString
 * @param {string} splitter
 * @returns {object}
 */
const parseCustomDimsToBools = (requestString, dimsRegExpString, splitter) => {
  return valuesToBool(
    parseCustomDimensions(requestString, dimsRegExpString, splitter)
  );
};
/**
 * Writes empty Playwright's context state file to the project root.
 * @param {string} [filepath=state.json] filepath to be written to
 * @returns {undefined}
 */
const writeContextState = (filepath = "state.json") => {
  return writeFileSync(join(process.cwd(), filepath), "{}", {
    encoding: "utf-8",
  });
};
/**
 * Deletes the Playwright's context state file.
 * @param {string} [filepath="state.json"] filepath to be deleted
 * @returns {undefined}
 */
const deleteContextState = (filepath = "state.json") => {
  return rmSync(join(process.cwd(), filepath), { recursive: true });
};
/**
 * Checks, whether stored state contains just empty object, e.g. was just freshly created.
 * @param {string} [filepath=state.json] filepath to be checked
 * @returns {boolean}
 */
const isContextStateEmpty = (filepath = "state.json") => {
  const content = JSON.parse(loadFile(filepath));
  const keys = Object.keys(content);

  if (keys.length == 0) {
    return true;
  }
  return false;
};

module.exports = {
  getTomlConfig,
  parseCustomDimsToBools,
  writeContextState,
  deleteContextState,
  isContextStateEmpty,
};
