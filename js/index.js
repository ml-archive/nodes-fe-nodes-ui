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

require('./modules/layout');
require('./modules/sidebar');

require('./modules/alerts');
require('./modules/confirm');
require('./modules/tooltips');
require('./modules/popovers');

require('./modules/roles');
require('./modules/capabilities');

require('./modules/labels');
require('./modules/inputs');
require('./modules/slugify');
require('./modules/wysiwyg');
require('./modules/links');