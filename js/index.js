/**
 * Config
 */
require('./config/chart');

/**
 * Utils
 */
require('./utils/smarter-resize');
require('./utils/eval-data-options');

// Assign Nodes to window, so legacy code wont break
window.Nodes = require('./utils/nodes');

/**
 * Components
 */
require('./modules/file-picker');
require('./modules/date-time-picker');
require('./modules/dropdown-menu');
require('./modules/sidebar');
require('./modules/layout');
require('./modules/inputs');
require('./modules/alerts');
require('./modules/tooltips');
require('./modules/links');
require('./modules/slugify');
require('./modules/roles');
require('./modules/popovers');
require('./modules/wysiwyg');
require('./modules/capabilities');
require('./modules/confirm');
require('./modules/labels');