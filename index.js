'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');


/**
 * @name include
 * @module include
 * @description Require module from a given path
 * @param {...String} modulePath Path to search for a module
 * @return {Object|Error} found module or throw error
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { include } = require('@lykmapipo/include');
 *
 * const User = include('models', 'user');
 * const utils = include('..', 'utils');
 *
 */
function include(...modulePath) {
  const _modulePath = _.compact([...modulePath]);
  let _path = path.join(..._modulePath);
  // handle @cwd
  if (_.startsWith(_path, '@cwd')) {
    _path = _.replace(_path, '@cwd', process.cwd());
  }
  // handle @dirname
  // handle @parent
  const _import = require(_path);
  return _import;
}


/**
 * @name includeFrom
 * @module includeFrom
 * @description Create a shortcut to require module from a base path
 * @param {...String} basePath A base path to use to search for modules
 * @return {Object|Error} found module or throw error
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { includeFrom } = require('@lykmapipo/include');
 *
 * const User = includeFrom('models', 'user');
 *
 * const includeModel = includeFrom('models');
 * const User = includeModel('user');
 *
 */
function includeFrom(...basePath) {
  const _basePath = _.compact([...basePath]);
  return function _includeFrom(...modulePath) {
    let _modulePath = _.compact([...modulePath]);
    _modulePath = [].concat(_basePath).concat(_modulePath);
    return include(..._modulePath);
  };
}


/**
 * @name includeFromDirname
 * @module includeFromDirname
 * @description Create a shortcut to require module from current module directory
 * @param {...String} modulePath Path to search for a module
 * @return {Object|Error} found module or throw error
 * @see {@link https://nodejs.org/api/modules.html#modules_dirname}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { includeFromDirname } = require('@lykmapipo/include');
 *
 * const User = includeFromDirname('user');
 *
 */
function includeFromDirname(...modulePath) {
  // Prevent caching of this module so module.parent is always accurate
  delete require.cache[__filename];
  const parentFile = module.parent.filename;
  const parentDir = path.dirname(parentFile);
  return includeFrom(parentDir)(...modulePath);
}


/**
 * @name includeFromCwd
 * @module includeFromCwd
 * @description Create a shortcut to require module from current working directory
 * @param {...String} modulePath Path to search for a module
 * @return {Object|Error} found module or throw error
 * @see {@link https://nodejs.org/api/modules.html#modules_dirname}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { includeFromCwd } = require('@lykmapipo/include');
 *
 * const User = includeFromCwd('user');
 *
 */
function includeFromCwd(...modulePath) {
  return includeFrom(process.cwd())(...modulePath);
}


/* extends */
include.include = include;
include.includeFrom = includeFrom;
include.includeFromDirname = includeFromDirname;
include.includeFromCwd = includeFromCwd;


/* exports */
module.exports = exports = include;
