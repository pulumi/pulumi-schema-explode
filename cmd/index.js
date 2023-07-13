#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5063:
/***/ ((module) => {

"use strict";


module.exports = ({onlyFirst = false} = {}) => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
};


/***/ }),

/***/ 2068:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* module decorator */ module = __nccwpck_require__.nmd(module);


const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = __nccwpck_require__(6931);
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 1508:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var object        = __nccwpck_require__(6561)
  , stringifiable = __nccwpck_require__(8080)
  , forOf         = __nccwpck_require__(6756);

module.exports = function (text, style) {
	var result = "";
	text = stringifiable(text);
	object(style);
	forOf(text, function (char) { result += style[char] || char; });
	return result;
};


/***/ }),

/***/ 6241:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d              = __nccwpck_require__(4571)
  , assign         = __nccwpck_require__(1377)
  , forEach        = __nccwpck_require__(9575)
  , map            = __nccwpck_require__(7289)
  , primitiveSet   = __nccwpck_require__(2796)
  , setPrototypeOf = __nccwpck_require__(7165)
  , memoize        = __nccwpck_require__(5841)
  , memoizeMethods = __nccwpck_require__(1936)
  , sgr            = __nccwpck_require__(8139)
  , supportsColor  = __nccwpck_require__(4947);

var mods           = sgr.mods
  , join           = Array.prototype.join
  , defineProperty = Object.defineProperty
  , max            = Math.max
  , min            = Math.min
  , variantModes   = primitiveSet("_fg", "_bg")
  , xtermMatch     = process.platform === "win32" ? __nccwpck_require__(9035) : null;

var getFn;

// Some use cli-color as: console.log(clc.red('Error!'));
// Which is inefficient as on each call it configures new clc object
// with memoization we reuse once created object
var memoized = memoize(function (scope, mod) {
	return defineProperty(getFn(), "_cliColorData", d(assign({}, scope._cliColorData, mod)));
});

var proto = Object.create(
	Function.prototype,
	assign(
		map(mods, function (mod) {
			return d.gs(function () { return memoized(this, mod); });
		}),
		memoizeMethods({
			// xterm (255) color
			xterm: d(function (code) {
				code = isNaN(code) ? 255 : min(max(code, 0), 255);
				return defineProperty(
					getFn(), "_cliColorData",
					d(
						assign({}, this._cliColorData, {
							_fg: [xtermMatch ? xtermMatch[code] : "38;5;" + code, 39]
						})
					)
				);
			}),
			bgXterm: d(function (code) {
				code = isNaN(code) ? 255 : min(max(code, 0), 255);
				return defineProperty(
					getFn(), "_cliColorData",
					d(
						assign({}, this._cliColorData, {
							_bg: [xtermMatch ? xtermMatch[code] + 10 : "48;5;" + code, 49]
						})
					)
				);
			})
		})
	)
);

var getEndRe = memoize(function (code) { return new RegExp("\x1b\\[" + code + "m", "g"); }, {
	primitive: true
});

getFn = function () {
	return setPrototypeOf(
		function self(/* …msg*/) {
			var start = ""
			  , end = ""
			  , msg = join.call(arguments, " ")
			  , conf = self._cliColorData
			  , hasAnsi = sgr.hasCSI(msg);
			forEach(
				conf,
				function (mod, key) {
					end = sgr(mod[1]) + end;
					start += sgr(mod[0]);
					if (hasAnsi) {
						msg = msg.replace(getEndRe(mod[1]), variantModes[key] ? sgr(mod[0]) : "");
					}
				},
				null,
				true
			);
			if (!supportsColor.isColorSupported()) return msg;
			return start + msg + end;
		},
		proto
	);
};

module.exports = Object.defineProperties(getFn(), {
	xtermSupported: d(!xtermMatch),
	_cliColorData: d("", {})
});


/***/ }),

/***/ 6470:
/***/ ((module) => {

"use strict";


module.exports = "\x07";


/***/ }),

/***/ 9828:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var generate          = __nccwpck_require__(2906)
  , from              = __nccwpck_require__(2406)
  , iterable          = __nccwpck_require__(3205)
  , isValue           = __nccwpck_require__(2285)
  , stringifiable     = __nccwpck_require__(1481)
  , repeat            = __nccwpck_require__(5650)
  , getStrippedLength = __nccwpck_require__(5478);

var push = Array.prototype.push;

module.exports = function (inputRows /*, options*/) {
	var options = Object(arguments[1])
	  , colsMeta = []
	  , colsOptions = options.columns || []
	  , rows = [];

	from(iterable(inputRows), function (row) {
		var rowRows = [[]];
		from(iterable(row), function (cellStr, columnIndex) {
			var cellRows = stringifiable(cellStr).split("\n");
			while (cellRows.length > rowRows.length) rowRows.push(generate(columnIndex, ""));
			cellRows.forEach(function (cellRow, rowRowIndex) {
				rowRows[rowRowIndex][columnIndex] = cellRow;
			});
		});
		push.apply(rows, rowRows);
	});

	return (
		rows
			.map(function (row) {
				return from(iterable(row), function (str, index) {
					var col = colsMeta[index], strLength;
					if (!col) col = colsMeta[index] = { width: 0 };
					str = stringifiable(str);
					strLength = getStrippedLength(str);
					if (strLength > col.width) col.width = strLength;
					return { str: str, length: strLength };
				});
			})
			.map(function (row) {
				return row
					.map(function (item, index) {
						var pad, align = "left", colOptions = colsOptions && colsOptions[index];
						align = colOptions && colOptions.align === "right" ? "right" : "left";
						pad = repeat.call(" ", colsMeta[index].width - item.length);
						if (align === "left") return item.str + pad;
						return pad + item.str;
					})
					.join(isValue(options.sep) ? options.sep : " | ");
			})
			.join("\n") + "\n"
	);
};


/***/ }),

/***/ 5715:
/***/ ((module) => {

"use strict";


module.exports = {
	screen: "\x1b[2J",
	screenLeft: "\x1b[1J",
	screenRight: "\x1b[J",
	line: "\x1b[2K",
	lineLeft: "\x1b[1K",
	lineRight: "\x1b[K"
};


/***/ }),

/***/ 5478:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/*
 * get actual length of ANSI-formatted string
 */

var strip = __nccwpck_require__(1335);

module.exports = function (str) { return strip(str).length; };


/***/ }),

/***/ 1047:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d = __nccwpck_require__(4571);

module.exports = Object.defineProperties(__nccwpck_require__(6241), {
	windowSize: d(__nccwpck_require__(9717)),
	erase: d(__nccwpck_require__(5715)),
	move: d(__nccwpck_require__(3759)),
	beep: d(__nccwpck_require__(6470)),
	columns: d(__nccwpck_require__(9828)),
	strip: d(__nccwpck_require__(1335)),
	getStrippedLength: d(__nccwpck_require__(5478)),
	slice: d(__nccwpck_require__(2421)),
	throbber: d(__nccwpck_require__(7307)),
	reset: d(__nccwpck_require__(1749)),
	art: d(__nccwpck_require__(1508))
});


/***/ }),

/***/ 8139:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/* CSI - control sequence introducer */
/* SGR - set graphic rendition */

var assign       = __nccwpck_require__(1377)
  , includes     = __nccwpck_require__(7689)
  , forOwn       = __nccwpck_require__(9575)
  , onlyKey      = __nccwpck_require__(7726)
  , forEachRight = __nccwpck_require__(8137)
  , uniq         = __nccwpck_require__(5684);

var CSI = "\x1b[";

var sgr = function (code) { return CSI + code + "m"; };

sgr.CSI = CSI;

var mods = assign(
	{
		// Style
		bold: { _bold: [1, 22] },
		italic: { _italic: [3, 23] },
		underline: { _underline: [4, 24] },
		blink: { _blink: [5, 25] },
		inverse: { _inverse: [7, 27] },
		strike: { _strike: [9, 29] }

		// Color
	},
	["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"].reduce(function (
		obj,
		color,
		index
	) {
		// foreground
		obj[color] = { _fg: [30 + index, 39] };
		obj[color + "Bright"] = { _fg: [90 + index, 39] };

		// background
		obj["bg" + color[0].toUpperCase() + color.slice(1)] = { _bg: [40 + index, 49] };
		obj["bg" + color[0].toUpperCase() + color.slice(1) + "Bright"] = { _bg: [100 + index, 49] };

		return obj;
	}, {})
);

sgr.mods = mods;

sgr.openers = {};
sgr.closers = {};

forOwn(mods, function (mod) {
	var modPair = mod[onlyKey(mod)];

	sgr.openers[modPair[0]] = modPair;
	sgr.closers[modPair[1]] = modPair;
});

sgr.openStyle = function (openedMods, code) { openedMods.push(sgr.openers[code]); };

sgr.closeStyle = function (openedMods, code) {
	forEachRight.call(openedMods, function (modPair, index) {
		if (modPair[1] === code) {
			openedMods.splice(index, 1);
		}
	});
};

/* prepend openers */
sgr.prepend = function (currentMods) {
	return currentMods.map(function (modPair) { return sgr(modPair[0]); });
};

/* complete non-closed openers with corresponding closers */
sgr.complete = function (openedMods, closerCodes) {
	closerCodes.forEach(function (code) { sgr.closeStyle(openedMods, code); });

	// mods must be closed from the last opened to first opened
	openedMods = openedMods.reverse();

	openedMods = openedMods.map(function (modPair) { return modPair[1]; });

	// one closer can close many openers (31, 32 -> 39)
	openedMods = uniq.call(openedMods);

	return openedMods.map(sgr);
};

var hasCSI = function (str) { return includes.call(str, CSI); };

sgr.hasCSI = hasCSI;

var extractCode = function (csi) {
	var code = csi.slice(2, -1);
	code = Number(code);
	return code;
};

sgr.extractCode = extractCode;

module.exports = sgr;


/***/ }),

/***/ 4947:
/***/ ((module) => {

"use strict";


// store whether supports-color mode is enabled or not.
var state = null;

// force supports-color mode
var enableColor = function () { state = true; };

// disable supports-color mode
var disableColor = function () { state = false; };

// use the NO_COLOR environment variable (default)
var autoDetectSupport = function () { state = null; };

// determine whether supports-color mode is enabled.
var isColorSupported = function () { return state === null ? !process.env.NO_COLOR : state; };

module.exports = {
	enableColor: enableColor,
	disableColor: disableColor,
	autoDetectSupport: autoDetectSupport,
	isColorSupported: isColorSupported
};


/***/ }),

/***/ 226:
/***/ ((module) => {

"use strict";


module.exports = [
	"000000", "800000", "008000", "808000", "000080", "800080", "008080", "c0c0c0", "808080",
	"ff0000", "00ff00", "ffff00", "0000ff", "ff00ff", "00ffff", "ffffff", "000000", "00005f",
	"000087", "0000af", "0000d7", "0000ff", "005f00", "005f5f", "005f87", "005faf", "005fd7",
	"005fff", "008700", "00875f", "008787", "0087af", "0087d7", "0087ff", "00af00", "00af5f",
	"00af87", "00afaf", "00afd7", "00afff", "00d700", "00d75f", "00d787", "00d7af", "00d7d7",
	"00d7ff", "00ff00", "00ff5f", "00ff87", "00ffaf", "00ffd7", "00ffff", "5f0000", "5f005f",
	"5f0087", "5f00af", "5f00d7", "5f00ff", "5f5f00", "5f5f5f", "5f5f87", "5f5faf", "5f5fd7",
	"5f5fff", "5f8700", "5f875f", "5f8787", "5f87af", "5f87d7", "5f87ff", "5faf00", "5faf5f",
	"5faf87", "5fafaf", "5fafd7", "5fafff", "5fd700", "5fd75f", "5fd787", "5fd7af", "5fd7d7",
	"5fd7ff", "5fff00", "5fff5f", "5fff87", "5fffaf", "5fffd7", "5fffff", "870000", "87005f",
	"870087", "8700af", "8700d7", "8700ff", "875f00", "875f5f", "875f87", "875faf", "875fd7",
	"875fff", "878700", "87875f", "878787", "8787af", "8787d7", "8787ff", "87af00", "87af5f",
	"87af87", "87afaf", "87afd7", "87afff", "87d700", "87d75f", "87d787", "87d7af", "87d7d7",
	"87d7ff", "87ff00", "87ff5f", "87ff87", "87ffaf", "87ffd7", "87ffff", "af0000", "af005f",
	"af0087", "af00af", "af00d7", "af00ff", "af5f00", "af5f5f", "af5f87", "af5faf", "af5fd7",
	"af5fff", "af8700", "af875f", "af8787", "af87af", "af87d7", "af87ff", "afaf00", "afaf5f",
	"afaf87", "afafaf", "afafd7", "afafff", "afd700", "afd75f", "afd787", "afd7af", "afd7d7",
	"afd7ff", "afff00", "afff5f", "afff87", "afffaf", "afffd7", "afffff", "d70000", "d7005f",
	"d70087", "d700af", "d700d7", "d700ff", "d75f00", "d75f5f", "d75f87", "d75faf", "d75fd7",
	"d75fff", "d78700", "d7875f", "d78787", "d787af", "d787d7", "d787ff", "d7af00", "d7af5f",
	"d7af87", "d7afaf", "d7afd7", "d7afff", "d7d700", "d7d75f", "d7d787", "d7d7af", "d7d7d7",
	"d7d7ff", "d7ff00", "d7ff5f", "d7ff87", "d7ffaf", "d7ffd7", "d7ffff", "ff0000", "ff005f",
	"ff0087", "ff00af", "ff00d7", "ff00ff", "ff5f00", "ff5f5f", "ff5f87", "ff5faf", "ff5fd7",
	"ff5fff", "ff8700", "ff875f", "ff8787", "ff87af", "ff87d7", "ff87ff", "ffaf00", "ffaf5f",
	"ffaf87", "ffafaf", "ffafd7", "ffafff", "ffd700", "ffd75f", "ffd787", "ffd7af", "ffd7d7",
	"ffd7ff", "ffff00", "ffff5f", "ffff87", "ffffaf", "ffffd7", "ffffff", "080808", "121212",
	"1c1c1c", "262626", "303030", "3a3a3a", "444444", "4e4e4e", "585858", "626262", "6c6c6c",
	"767676", "808080", "8a8a8a", "949494", "9e9e9e", "a8a8a8", "b2b2b2", "bcbcbc", "c6c6c6",
	"d0d0d0", "dadada", "e4e4e4", "eeeeee"
];


/***/ }),

/***/ 9035:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var push = Array.prototype.push
  , reduce = Array.prototype.reduce
  , abs = Math.abs
  , colors
  , match
  , result
  , i;

colors = (__nccwpck_require__(226).map)(function (color) {
	return {
		r: parseInt(color.slice(0, 2), 16),
		g: parseInt(color.slice(2, 4), 16),
		b: parseInt(color.slice(4), 16)
	};
});

match = colors.slice(0, 16);

module.exports = result = [];

i = 0;
while (i < 8) {
	result.push(30 + i++);
}
i = 0;
while (i < 8) {
	result.push(90 + i++);
}
push.apply(
	result,
	colors.slice(16).map(function (data) {
		var index, diff = Infinity;
		match.every(function (innerMatch, currentIndex) {
			var ndiff = reduce.call(
				"rgb",
				function (currentDiff, channel) {
					currentDiff += abs(innerMatch[channel] - data[channel]);
					return currentDiff;
				},
				0
			);
			if (ndiff < diff) {
				index = currentIndex;
				diff = ndiff;
			}
			return ndiff;
		});
		return result[index];
	})
);


/***/ }),

/***/ 3759:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d     = __nccwpck_require__(4571)
  , trunc = __nccwpck_require__(9394);

var up, down, right, left, abs = Math.abs, floor = Math.floor, max = Math.max;

var getMove = function (control) {
	return function (num) {
		num = isNaN(num) ? 0 : max(floor(num), 0);
		return num ? "\x1b[" + num + control : "";
	};
};

module.exports = Object.defineProperties(
	function (x, y) {
		x = isNaN(x) ? 0 : floor(x);
		y = isNaN(y) ? 0 : floor(y);
		return (x > 0 ? right(x) : left(-x)) + (y > 0 ? down(y) : up(-y));
	},
	{
		up: d((up = getMove("A"))),
		down: d((down = getMove("B"))),
		right: d((right = getMove("C"))),
		left: d((left = getMove("D"))),
		to: d(function (x, y) {
			x = isNaN(x) ? 1 : max(floor(x), 0) + 1;
			y = isNaN(y) ? 1 : max(floor(y), 0) + 1;
			return "\x1b[" + y + ";" + x + "H";
		}),
		lines: d(function (n) {
			var dir;
			n = trunc(n) || 0;
			dir = n >= 0 ? "B" : "A";
			n = floor(abs(n));
			return "\x1b[" + n + dir + "\x1b[1G";
		}),
		top: d("\x1b[5000F"),
		bottom: d("\x1b[5000B"),
		lineBegin: d("\x1b[5000D"),
		lineEnd: d("\x1b[5000C")
	}
);


/***/ }),

/***/ 5648:
/***/ ((module) => {

"use strict";


module.exports = function () {
	// Borrowed from ansi-regex package
	// https://github.com/chalk/ansi-regex/blob/a28b8e7ee67aa9996ba44bf123f0436eea62d285/index.js

	return new RegExp(
		"[\\u001B\\u009B][[\\]()#;?]" +
			"*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]" +
			"+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" +
			"|" +
			"(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
		"g"
	);
};


/***/ }),

/***/ 1749:
/***/ ((module) => {

"use strict";


module.exports = "\x1b[2J\x1b[0;0H";


/***/ }),

/***/ 2421:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint max-lines: "off" */



var reAnsi        = __nccwpck_require__(5648)
  , stringifiable = __nccwpck_require__(8080)
  , length        = __nccwpck_require__(5478)
  , sgr           = __nccwpck_require__(8139)
  , max           = Math.max;

var Token = function (token) { this.token = token; };

var tokenize = function (str) {
	var match = reAnsi().exec(str);

	if (!match) {
		return [str];
	}

	var index = match.index, head, prehead, tail;

	if (index === 0) {
		head = match[0];
		tail = str.slice(head.length);

		return [new Token(head)].concat(tokenize(tail));
	}

	prehead = str.slice(0, index);
	head = match[0];
	tail = str.slice(index + head.length);

	return [prehead, new Token(head)].concat(tokenize(tail));
};

var isChunkInSlice = function (chunk, index, begin, end) {
	var endIndex = chunk.length + index;

	if (begin > endIndex) return false;
	if (end < index) return false;
	return true;
};

// eslint-disable-next-line max-lines-per-function
var sliceSeq = function (seq, begin, end) {
	var sliced = seq.reduce(
		function (state, chunk) {
			var index = state.index;

			if (chunk instanceof Token) {
				var code = sgr.extractCode(chunk.token);

				if (index <= begin) {
					if (code in sgr.openers) {
						sgr.openStyle(state.preOpeners, code);
					}
					if (code in sgr.closers) {
						sgr.closeStyle(state.preOpeners, code);
					}
				} else if (index < end) {
					if (code in sgr.openers) {
						sgr.openStyle(state.inOpeners, code);
						state.seq.push(chunk);
					} else if (code in sgr.closers) {
						state.inClosers.push(code);
						state.seq.push(chunk);
					}
				}
			} else {
				var nextChunk = "";

				if (isChunkInSlice(chunk, index, begin, end)) {
					var relBegin = Math.max(begin - index, 0)
					  , relEnd = Math.min(end - index, chunk.length);

					nextChunk = chunk.slice(relBegin, relEnd);
				}

				state.seq.push(nextChunk);
				state.index = index + chunk.length;
			}

			return state;
		},
		{
			index: 0,
			seq: [],

			// preOpeners -> [ mod ]
			// preOpeners must be prepended to the slice if they wasn't closed til the end of it
			// preOpeners must be closed if they wasn't closed til the end of the slice
			preOpeners: [],

			// inOpeners  -> [ mod ]
			// inOpeners already in the slice and must not be prepended to the slice
			// inOpeners must be closed if they wasn't closed til the end of the slice
			inOpeners: [], // opener CSI inside slice

			// inClosers -> [ code ]
			// closer CSIs for determining which pre/in-Openers must be closed
			inClosers: []
		}
	);

	sliced.seq = [].concat(
		sgr.prepend(sliced.preOpeners), sliced.seq,
		sgr.complete([].concat(sliced.preOpeners, sliced.inOpeners), sliced.inClosers)
	);

	return sliced.seq;
};

module.exports = function (str /*, begin, end*/) {
	var seq, begin = Number(arguments[1]), end = Number(arguments[2]), len;

	str = stringifiable(str);
	len = length(str);

	if (isNaN(begin)) {
		begin = 0;
	}
	if (isNaN(end)) {
		end = len;
	}
	if (begin < 0) {
		begin = max(len + begin, 0);
	}
	if (end < 0) {
		end = max(len + end, 0);
	}

	seq = tokenize(str);
	seq = sliceSeq(seq, begin, end);
	return seq
		.map(function (chunk) {
			if (chunk instanceof Token) {
				return chunk.token;
			}

			return chunk;
		})
		.join("");
};


/***/ }),

/***/ 1335:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Strip ANSI formatting from string



var stringifiable = __nccwpck_require__(1481)
  , r             = __nccwpck_require__(5648)();

module.exports = function (str) { return stringifiable(str).replace(r, ""); };


/***/ }),

/***/ 7307:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


var compose      = __nccwpck_require__(4274)
  , callable     = __nccwpck_require__(6097)
  , d            = __nccwpck_require__(4571)
  , validTimeout = __nccwpck_require__(9953);

var chars = "-\\|/", l = chars.length, ThrobberIterator;

ThrobberIterator = function () {
	// no setup needed
};
Object.defineProperties(ThrobberIterator.prototype, {
	index: d(-1),
	running: d(false),
	next: d(function () {
		var str = this.running ? "\u0008" : "";
		if (!this.running) this.running = true;
		return str + chars[(this.index = (this.index + 1) % l)];
	}),
	reset: d(function () {
		if (!this.running) return "";
		this.index = -1;
		this.running = false;
		return "\u0008";
	})
});

module.exports = exports = function (write, interval /*, format*/) {
	var format = arguments[2], token, iterator = new ThrobberIterator();
	callable(write);
	interval = validTimeout(interval);
	if (format !== undefined) write = compose.call(write, callable(format));
	return {
		start: function () {
			if (token) return;
			token = setInterval(function () { write(iterator.next()); }, interval);
		},
		restart: function () {
			this.stop();
			this.start();
		},
		stop: function () {
			if (!token) return;
			clearInterval(token);
			token = null;
			write(iterator.reset());
		}
	};
};

Object.defineProperty(exports, "Iterator", (d(ThrobberIterator)));


/***/ }),

/***/ 9717:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var d = __nccwpck_require__(4571);

Object.defineProperties(exports, {
	width: d.gs("ce", function () { return process.stdout.columns || 0; }),
	height: d.gs("ce", function () { return process.stdout.rows || 0; })
});


/***/ }),

/***/ 7391:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __nccwpck_require__(8510);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 6931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const conversions = __nccwpck_require__(7391);
const route = __nccwpck_require__(880);

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const conversions = __nccwpck_require__(7391);

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 8510:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 6362:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue             = __nccwpck_require__(3134)
  , ensureValue         = __nccwpck_require__(942)
  , ensurePlainFunction = __nccwpck_require__(3681)
  , copy                = __nccwpck_require__(3382)
  , normalizeOptions    = __nccwpck_require__(4488)
  , map                 = __nccwpck_require__(7289);

var bind = Function.prototype.bind
  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ }),

/***/ 4571:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue         = __nccwpck_require__(3134)
  , isPlainFunction = __nccwpck_require__(6796)
  , assign          = __nccwpck_require__(1377)
  , normalizeOpts   = __nccwpck_require__(4488)
  , contains        = __nccwpck_require__(7689);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 7579:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isPlainFunction = __nccwpck_require__(6796)
  , ensureValue     = __nccwpck_require__(942)
  , isValue         = __nccwpck_require__(3134)
  , map             = __nccwpck_require__(7289)
  , contains        = __nccwpck_require__(7689);

var call = Function.prototype.call
  , defineProperty = Object.defineProperty
  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , getPrototypeOf = Object.getPrototypeOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , cacheDesc = { configurable: false, enumerable: false, writable: false, value: null }
  , define;

define = function (name, options) {
	var value, dgs, cacheName, desc, writable = false, resolvable, flat;
	options = Object(ensureValue(options));
	cacheName = options.cacheName;
	flat = options.flat;
	if (!isValue(cacheName)) cacheName = name;
	delete options.cacheName;
	value = options.value;
	resolvable = isPlainFunction(value);
	delete options.value;
	dgs = { configurable: Boolean(options.configurable), enumerable: Boolean(options.enumerable) };
	if (name !== cacheName) {
		dgs.get = function () {
			if (hasOwnProperty.call(this, cacheName)) return this[cacheName];
			cacheDesc.value = resolvable ? call.call(value, this, options) : value;
			cacheDesc.writable = writable;
			defineProperty(this, cacheName, cacheDesc);
			cacheDesc.value = null;
			if (desc) defineProperty(this, name, desc);
			return this[cacheName];
		};
	} else if (!flat) {
		dgs.get = function self() {
			var ownDesc;
			if (hasOwnProperty.call(this, name)) {
				ownDesc = getOwnPropertyDescriptor(this, name);
				// It happens in Safari, that getter is still called after property
				// was defined with a value, following workarounds that
				// While in IE11 it may happen that here ownDesc is undefined (go figure)
				if (ownDesc) {
					if (ownDesc.hasOwnProperty("value")) return ownDesc.value;
					if (typeof ownDesc.get === "function" && ownDesc.get !== self) {
						return ownDesc.get.call(this);
					}
					return value;
				}
			}
			desc.value = resolvable ? call.call(value, this, options) : value;
			defineProperty(this, name, desc);
			desc.value = null;
			return this[name];
		};
	} else {
		dgs.get = function self() {
			var base = this, ownDesc;
			if (hasOwnProperty.call(this, name)) {
				// It happens in Safari, that getter is still called after property
				// was defined with a value, following workarounds that
				ownDesc = getOwnPropertyDescriptor(this, name);
				if (ownDesc.hasOwnProperty("value")) return ownDesc.value;
				if (typeof ownDesc.get === "function" && ownDesc.get !== self) {
					return ownDesc.get.call(this);
				}
			}
			while (!hasOwnProperty.call(base, name)) base = getPrototypeOf(base);
			desc.value = resolvable ? call.call(value, base, options) : value;
			defineProperty(base, name, desc);
			desc.value = null;
			return base[name];
		};
	}
	dgs.set = function (value) {
		if (hasOwnProperty.call(this, name)) {
			throw new TypeError("Cannot assign to lazy defined '" + name + "' property of " + this);
		}
		dgs.get.call(this);
		this[cacheName] = value;
	};
	if (options.desc) {
		desc = {
			configurable: contains.call(options.desc, "c"),
			enumerable: contains.call(options.desc, "e")
		};
		if (cacheName === name) {
			desc.writable = contains.call(options.desc, "w");
			desc.value = null;
		} else {
			writable = contains.call(options.desc, "w");
			desc.get = dgs.get;
			desc.set = dgs.set;
		}
		delete options.desc;
	} else if (cacheName === name) {
		desc = {
			configurable: Boolean(options.configurable),
			enumerable: Boolean(options.enumerable),
			writable: Boolean(options.writable),
			value: null
		};
	}
	delete options.configurable;
	delete options.enumerable;
	delete options.writable;
	return dgs;
};

module.exports = function (props) {
	return map(props, function (desc, name) { return define(name, desc); });
};


/***/ }),

/***/ 4087:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(9819);


/***/ }),

/***/ 9819:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

// Generated by CoffeeScript 1.3.1

/*
Module difflib -- helpers for computing deltas between objects.

Function getCloseMatches(word, possibilities, n=3, cutoff=0.6):
    Use SequenceMatcher to return list of the best "good enough" matches.

Function contextDiff(a, b):
    For two lists of strings, return a delta in context diff format.

Function ndiff(a, b):
    Return a delta: the difference between `a` and `b` (lists of strings).

Function restore(delta, which):
    Return one of the two sequences that generated an ndiff delta.

Function unifiedDiff(a, b):
    For two lists of strings, return a delta in unified diff format.

Class SequenceMatcher:
    A flexible class for comparing pairs of sequences of any type.

Class Differ:
    For producing human-readable deltas from sequences of lines of text.
*/


(function() {
  var Differ, Heap, IS_CHARACTER_JUNK, IS_LINE_JUNK, SequenceMatcher, assert, contextDiff, floor, getCloseMatches, max, min, ndiff, restore, unifiedDiff, _any, _arrayCmp, _calculateRatio, _countLeading, _formatRangeContext, _formatRangeUnified, _has,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  floor = Math.floor, max = Math.max, min = Math.min;

  Heap = __nccwpck_require__(6106);

  assert = __nccwpck_require__(9491);

  _calculateRatio = function(matches, length) {
    if (length) {
      return 2.0 * matches / length;
    } else {
      return 1.0;
    }
  };

  _arrayCmp = function(a, b) {
    var i, la, lb, _i, _ref, _ref1;
    _ref = [a.length, b.length], la = _ref[0], lb = _ref[1];
    for (i = _i = 0, _ref1 = min(la, lb); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      if (a[i] < b[i]) {
        return -1;
      }
      if (a[i] > b[i]) {
        return 1;
      }
    }
    return la - lb;
  };

  _has = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  _any = function(items) {
    var item, _i, _len;
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (item) {
        return true;
      }
    }
    return false;
  };

  SequenceMatcher = (function() {

    SequenceMatcher.name = 'SequenceMatcher';

    /*
      SequenceMatcher is a flexible class for comparing pairs of sequences of
      any type, so long as the sequence elements are hashable.  The basic
      algorithm predates, and is a little fancier than, an algorithm
      published in the late 1980's by Ratcliff and Obershelp under the
      hyperbolic name "gestalt pattern matching".  The basic idea is to find
      the longest contiguous matching subsequence that contains no "junk"
      elements (R-O doesn't address junk).  The same idea is then applied
      recursively to the pieces of the sequences to the left and to the right
      of the matching subsequence.  This does not yield minimal edit
      sequences, but does tend to yield matches that "look right" to people.
    
      SequenceMatcher tries to compute a "human-friendly diff" between two
      sequences.  Unlike e.g. UNIX(tm) diff, the fundamental notion is the
      longest *contiguous* & junk-free matching subsequence.  That's what
      catches peoples' eyes.  The Windows(tm) windiff has another interesting
      notion, pairing up elements that appear uniquely in each sequence.
      That, and the method here, appear to yield more intuitive difference
      reports than does diff.  This method appears to be the least vulnerable
      to synching up on blocks of "junk lines", though (like blank lines in
      ordinary text files, or maybe "<P>" lines in HTML files).  That may be
      because this is the only method of the 3 that has a *concept* of
      "junk" <wink>.
    
      Example, comparing two strings, and considering blanks to be "junk":
    
      >>> isjunk = (c) -> c is ' '
      >>> s = new SequenceMatcher(isjunk,
                                  'private Thread currentThread;',
                                  'private volatile Thread currentThread;')
    
      .ratio() returns a float in [0, 1], measuring the "similarity" of the
      sequences.  As a rule of thumb, a .ratio() value over 0.6 means the
      sequences are close matches:
    
      >>> s.ratio().toPrecision(3)
      '0.866'
    
      If you're only interested in where the sequences match,
      .getMatchingBlocks() is handy:
    
      >>> for [a, b, size] in s.getMatchingBlocks()
      ...   console.log("a[#{a}] and b[#{b}] match for #{size} elements");
      a[0] and b[0] match for 8 elements
      a[8] and b[17] match for 21 elements
      a[29] and b[38] match for 0 elements
    
      Note that the last tuple returned by .get_matching_blocks() is always a
      dummy, (len(a), len(b), 0), and this is the only case in which the last
      tuple element (number of elements matched) is 0.
    
      If you want to know how to change the first sequence into the second,
      use .get_opcodes():
    
      >>> for [op, a1, a2, b1, b2] in s.getOpcodes()
      ...   console.log "#{op} a[#{a1}:#{a2}] b[#{b1}:#{b2}]"
      equal a[0:8] b[0:8]
      insert a[8:8] b[8:17]
      equal a[8:29] b[17:38]
    
      See the Differ class for a fancy human-friendly file differencer, which
      uses SequenceMatcher both to compare sequences of lines, and to compare
      sequences of characters within similar (near-matching) lines.
    
      See also function getCloseMatches() in this module, which shows how
      simple code building on SequenceMatcher can be used to do useful work.
    
      Timing:  Basic R-O is cubic time worst case and quadratic time expected
      case.  SequenceMatcher is quadratic time for the worst case and has
      expected-case behavior dependent in a complicated way on how many
      elements the sequences have in common; best case time is linear.
    
      Methods:
    
      constructor(isjunk=null, a='', b='')
          Construct a SequenceMatcher.
    
      setSeqs(a, b)
          Set the two sequences to be compared.
    
      setSeq1(a)
          Set the first sequence to be compared.
    
      setSeq2(b)
          Set the second sequence to be compared.
    
      findLongestMatch(alo, ahi, blo, bhi)
          Find longest matching block in a[alo:ahi] and b[blo:bhi].
    
      getMatchingBlocks()
          Return list of triples describing matching subsequences.
    
      getOpcodes()
          Return list of 5-tuples describing how to turn a into b.
    
      ratio()
          Return a measure of the sequences' similarity (float in [0,1]).
    
      quickRatio()
          Return an upper bound on .ratio() relatively quickly.
    
      realQuickRatio()
          Return an upper bound on ratio() very quickly.
    */


    function SequenceMatcher(isjunk, a, b, autojunk) {
      this.isjunk = isjunk;
      if (a == null) {
        a = '';
      }
      if (b == null) {
        b = '';
      }
      this.autojunk = autojunk != null ? autojunk : true;
      /*
          Construct a SequenceMatcher.
      
          Optional arg isjunk is null (the default), or a one-argument
          function that takes a sequence element and returns true iff the
          element is junk.  Null is equivalent to passing "(x) -> 0", i.e.
          no elements are considered to be junk.  For example, pass
              (x) -> x in ' \t'
          if you're comparing lines as sequences of characters, and don't
          want to synch up on blanks or hard tabs.
      
          Optional arg a is the first of two sequences to be compared.  By
          default, an empty string.  The elements of a must be hashable.  See
          also .setSeqs() and .setSeq1().
      
          Optional arg b is the second of two sequences to be compared.  By
          default, an empty string.  The elements of b must be hashable. See
          also .setSeqs() and .setSeq2().
      
          Optional arg autojunk should be set to false to disable the
          "automatic junk heuristic" that treats popular elements as junk
          (see module documentation for more information).
      */

      this.a = this.b = null;
      this.setSeqs(a, b);
    }

    SequenceMatcher.prototype.setSeqs = function(a, b) {
      /* 
      Set the two sequences to be compared. 
      
      >>> s = new SequenceMatcher()
      >>> s.setSeqs('abcd', 'bcde')
      >>> s.ratio()
      0.75
      */
      this.setSeq1(a);
      return this.setSeq2(b);
    };

    SequenceMatcher.prototype.setSeq1 = function(a) {
      /* 
      Set the first sequence to be compared. 
      
      The second sequence to be compared is not changed.
      
      >>> s = new SequenceMatcher(null, 'abcd', 'bcde')
      >>> s.ratio()
      0.75
      >>> s.setSeq1('bcde')
      >>> s.ratio()
      1.0
      
      SequenceMatcher computes and caches detailed information about the
      second sequence, so if you want to compare one sequence S against
      many sequences, use .setSeq2(S) once and call .setSeq1(x)
      repeatedly for each of the other sequences.
      
      See also setSeqs() and setSeq2().
      */
      if (a === this.a) {
        return;
      }
      this.a = a;
      return this.matchingBlocks = this.opcodes = null;
    };

    SequenceMatcher.prototype.setSeq2 = function(b) {
      /*
          Set the second sequence to be compared. 
      
          The first sequence to be compared is not changed.
      
          >>> s = new SequenceMatcher(null, 'abcd', 'bcde')
          >>> s.ratio()
          0.75
          >>> s.setSeq2('abcd')
          >>> s.ratio()
          1.0
      
          SequenceMatcher computes and caches detailed information about the
          second sequence, so if you want to compare one sequence S against
          many sequences, use .setSeq2(S) once and call .setSeq1(x)
          repeatedly for each of the other sequences.
      
          See also setSeqs() and setSeq1().
      */
      if (b === this.b) {
        return;
      }
      this.b = b;
      this.matchingBlocks = this.opcodes = null;
      this.fullbcount = null;
      return this._chainB();
    };

    SequenceMatcher.prototype._chainB = function() {
      var b, b2j, elt, i, idxs, indices, isjunk, junk, n, ntest, popular, _i, _j, _len, _len1, _ref;
      b = this.b;
      this.b2j = b2j = {};
      for (i = _i = 0, _len = b.length; _i < _len; i = ++_i) {
        elt = b[i];
        indices = _has(b2j, elt) ? b2j[elt] : b2j[elt] = [];
        indices.push(i);
      }
      junk = {};
      isjunk = this.isjunk;
      if (isjunk) {
        _ref = Object.keys(b2j);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          elt = _ref[_j];
          if (isjunk(elt)) {
            junk[elt] = true;
            delete b2j[elt];
          }
        }
      }
      popular = {};
      n = b.length;
      if (this.autojunk && n >= 200) {
        ntest = floor(n / 100) + 1;
        for (elt in b2j) {
          idxs = b2j[elt];
          if (idxs.length > ntest) {
            popular[elt] = true;
            delete b2j[elt];
          }
        }
      }
      this.isbjunk = function(b) {
        return _has(junk, b);
      };
      return this.isbpopular = function(b) {
        return _has(popular, b);
      };
    };

    SequenceMatcher.prototype.findLongestMatch = function(alo, ahi, blo, bhi) {
      /* 
      Find longest matching block in a[alo...ahi] and b[blo...bhi].  
      
      If isjunk is not defined:
      
      Return [i,j,k] such that a[i...i+k] is equal to b[j...j+k], where
          alo <= i <= i+k <= ahi
          blo <= j <= j+k <= bhi
      and for all [i',j',k'] meeting those conditions,
          k >= k'
          i <= i'
          and if i == i', j <= j'
      
      In other words, of all maximal matching blocks, return one that
      starts earliest in a, and of all those maximal matching blocks that
      start earliest in a, return the one that starts earliest in b.
      
      >>> isjunk = (x) -> x is ' '
      >>> s = new SequenceMatcher(isjunk, ' abcd', 'abcd abcd')
      >>> s.findLongestMatch(0, 5, 0, 9)
      [1, 0, 4]
      
      >>> s = new SequenceMatcher(null, 'ab', 'c')
      >>> s.findLongestMatch(0, 2, 0, 1)
      [0, 0, 0]
      */

      var a, b, b2j, besti, bestj, bestsize, i, isbjunk, j, j2len, k, newj2len, _i, _j, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      _ref = [this.a, this.b, this.b2j, this.isbjunk], a = _ref[0], b = _ref[1], b2j = _ref[2], isbjunk = _ref[3];
      _ref1 = [alo, blo, 0], besti = _ref1[0], bestj = _ref1[1], bestsize = _ref1[2];
      j2len = {};
      for (i = _i = alo; alo <= ahi ? _i < ahi : _i > ahi; i = alo <= ahi ? ++_i : --_i) {
        newj2len = {};
        _ref2 = (_has(b2j, a[i]) ? b2j[a[i]] : []);
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          j = _ref2[_j];
          if (j < blo) {
            continue;
          }
          if (j >= bhi) {
            break;
          }
          k = newj2len[j] = (j2len[j - 1] || 0) + 1;
          if (k > bestsize) {
            _ref3 = [i - k + 1, j - k + 1, k], besti = _ref3[0], bestj = _ref3[1], bestsize = _ref3[2];
          }
        }
        j2len = newj2len;
      }
      while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        _ref4 = [besti - 1, bestj - 1, bestsize + 1], besti = _ref4[0], bestj = _ref4[1], bestsize = _ref4[2];
      }
      while (besti + bestsize < ahi && bestj + bestsize < bhi && !isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
        bestsize++;
      }
      while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        _ref5 = [besti - 1, bestj - 1, bestsize + 1], besti = _ref5[0], bestj = _ref5[1], bestsize = _ref5[2];
      }
      while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
        bestsize++;
      }
      return [besti, bestj, bestsize];
    };

    SequenceMatcher.prototype.getMatchingBlocks = function() {
      /*
          Return list of triples describing matching subsequences.
      
          Each triple is of the form [i, j, n], and means that
          a[i...i+n] == b[j...j+n].  The triples are monotonically increasing in
          i and in j.  it's also guaranteed that if
          [i, j, n] and [i', j', n'] are adjacent triples in the list, and
          the second is not the last triple in the list, then i+n != i' or
          j+n != j'.  IOW, adjacent triples never describe adjacent equal
          blocks.
      
          The last triple is a dummy, [a.length, b.length, 0], and is the only
          triple with n==0.
      
          >>> s = new SequenceMatcher(null, 'abxcd', 'abcd')
          >>> s.getMatchingBlocks()
          [[0, 0, 2], [3, 2, 2], [5, 4, 0]]
      */

      var ahi, alo, bhi, blo, i, i1, i2, j, j1, j2, k, k1, k2, la, lb, matchingBlocks, nonAdjacent, queue, x, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
      if (this.matchingBlocks) {
        return this.matchingBlocks;
      }
      _ref = [this.a.length, this.b.length], la = _ref[0], lb = _ref[1];
      queue = [[0, la, 0, lb]];
      matchingBlocks = [];
      while (queue.length) {
        _ref1 = queue.pop(), alo = _ref1[0], ahi = _ref1[1], blo = _ref1[2], bhi = _ref1[3];
        _ref2 = x = this.findLongestMatch(alo, ahi, blo, bhi), i = _ref2[0], j = _ref2[1], k = _ref2[2];
        if (k) {
          matchingBlocks.push(x);
          if (alo < i && blo < j) {
            queue.push([alo, i, blo, j]);
          }
          if (i + k < ahi && j + k < bhi) {
            queue.push([i + k, ahi, j + k, bhi]);
          }
        }
      }
      matchingBlocks.sort(_arrayCmp);
      i1 = j1 = k1 = 0;
      nonAdjacent = [];
      for (_i = 0, _len = matchingBlocks.length; _i < _len; _i++) {
        _ref3 = matchingBlocks[_i], i2 = _ref3[0], j2 = _ref3[1], k2 = _ref3[2];
        if (i1 + k1 === i2 && j1 + k1 === j2) {
          k1 += k2;
        } else {
          if (k1) {
            nonAdjacent.push([i1, j1, k1]);
          }
          _ref4 = [i2, j2, k2], i1 = _ref4[0], j1 = _ref4[1], k1 = _ref4[2];
        }
      }
      if (k1) {
        nonAdjacent.push([i1, j1, k1]);
      }
      nonAdjacent.push([la, lb, 0]);
      return this.matchingBlocks = nonAdjacent;
    };

    SequenceMatcher.prototype.getOpcodes = function() {
      /* 
      Return list of 5-tuples describing how to turn a into b.
      
      Each tuple is of the form [tag, i1, i2, j1, j2].  The first tuple
      has i1 == j1 == 0, and remaining tuples have i1 == the i2 from the
      tuple preceding it, and likewise for j1 == the previous j2.
      
      The tags are strings, with these meanings:
      
      'replace':  a[i1...i2] should be replaced by b[j1...j2]
      'delete':   a[i1...i2] should be deleted.
                  Note that j1==j2 in this case.
      'insert':   b[j1...j2] should be inserted at a[i1...i1].
                  Note that i1==i2 in this case.
      'equal':    a[i1...i2] == b[j1...j2]
      
      >>> s = new SequenceMatcher(null, 'qabxcd', 'abycdf')
      >>> s.getOpcodes()
      [ [ 'delete'  , 0 , 1 , 0 , 0 ] ,
        [ 'equal'   , 1 , 3 , 0 , 2 ] ,
        [ 'replace' , 3 , 4 , 2 , 3 ] ,
        [ 'equal'   , 4 , 6 , 3 , 5 ] ,
        [ 'insert'  , 6 , 6 , 5 , 6 ] ]
      */

      var ai, answer, bj, i, j, size, tag, _i, _len, _ref, _ref1, _ref2;
      if (this.opcodes) {
        return this.opcodes;
      }
      i = j = 0;
      this.opcodes = answer = [];
      _ref = this.getMatchingBlocks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], ai = _ref1[0], bj = _ref1[1], size = _ref1[2];
        tag = '';
        if (i < ai && j < bj) {
          tag = 'replace';
        } else if (i < ai) {
          tag = 'delete';
        } else if (j < bj) {
          tag = 'insert';
        }
        if (tag) {
          answer.push([tag, i, ai, j, bj]);
        }
        _ref2 = [ai + size, bj + size], i = _ref2[0], j = _ref2[1];
        if (size) {
          answer.push(['equal', ai, i, bj, j]);
        }
      }
      return answer;
    };

    SequenceMatcher.prototype.getGroupedOpcodes = function(n) {
      var codes, group, groups, i1, i2, j1, j2, nn, tag, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (n == null) {
        n = 3;
      }
      /* 
      Isolate change clusters by eliminating ranges with no changes.
      
      Return a list groups with upto n lines of context.
      Each group is in the same format as returned by get_opcodes().
      
      >>> a = [1...40].map(String)
      >>> b = a.slice()
      >>> b[8...8] = 'i'
      >>> b[20] += 'x'
      >>> b[23...28] = []
      >>> b[30] += 'y'
      >>> s = new SequenceMatcher(null, a, b)
      >>> s.getGroupedOpcodes()
      [ [ [ 'equal'  , 5 , 8  , 5 , 8 ],
          [ 'insert' , 8 , 8  , 8 , 9 ],
          [ 'equal'  , 8 , 11 , 9 , 12 ] ],
        [ [ 'equal'   , 16 , 19 , 17 , 20 ],
          [ 'replace' , 19 , 20 , 20 , 21 ],
          [ 'equal'   , 20 , 22 , 21 , 23 ],
          [ 'delete'  , 22 , 27 , 23 , 23 ],
          [ 'equal'   , 27 , 30 , 23 , 26 ] ],
        [ [ 'equal'   , 31 , 34 , 27 , 30 ],
          [ 'replace' , 34 , 35 , 30 , 31 ],
          [ 'equal'   , 35 , 38 , 31 , 34 ] ] ]
      */

      codes = this.getOpcodes();
      if (!codes.length) {
        codes = [['equal', 0, 1, 0, 1]];
      }
      if (codes[0][0] === 'equal') {
        _ref = codes[0], tag = _ref[0], i1 = _ref[1], i2 = _ref[2], j1 = _ref[3], j2 = _ref[4];
        codes[0] = [tag, max(i1, i2 - n), i2, max(j1, j2 - n), j2];
      }
      if (codes[codes.length - 1][0] === 'equal') {
        _ref1 = codes[codes.length - 1], tag = _ref1[0], i1 = _ref1[1], i2 = _ref1[2], j1 = _ref1[3], j2 = _ref1[4];
        codes[codes.length - 1] = [tag, i1, min(i2, i1 + n), j1, min(j2, j1 + n)];
      }
      nn = n + n;
      groups = [];
      group = [];
      for (_i = 0, _len = codes.length; _i < _len; _i++) {
        _ref2 = codes[_i], tag = _ref2[0], i1 = _ref2[1], i2 = _ref2[2], j1 = _ref2[3], j2 = _ref2[4];
        if (tag === 'equal' && i2 - i1 > nn) {
          group.push([tag, i1, min(i2, i1 + n), j1, min(j2, j1 + n)]);
          groups.push(group);
          group = [];
          _ref3 = [max(i1, i2 - n), max(j1, j2 - n)], i1 = _ref3[0], j1 = _ref3[1];
        }
        group.push([tag, i1, i2, j1, j2]);
      }
      if (group.length && !(group.length === 1 && group[0][0] === 'equal')) {
        groups.push(group);
      }
      return groups;
    };

    SequenceMatcher.prototype.ratio = function() {
      /*
          Return a measure of the sequences' similarity (float in [0,1]).
      
          Where T is the total number of elements in both sequences, and
          M is the number of matches, this is 2.0*M / T.
          Note that this is 1 if the sequences are identical, and 0 if
          they have nothing in common.
      
          .ratio() is expensive to compute if you haven't already computed
          .getMatchingBlocks() or .getOpcodes(), in which case you may
          want to try .quickRatio() or .realQuickRatio() first to get an
          upper bound.
          
          >>> s = new SequenceMatcher(null, 'abcd', 'bcde')
          >>> s.ratio()
          0.75
          >>> s.quickRatio()
          0.75
          >>> s.realQuickRatio()
          1.0
      */

      var match, matches, _i, _len, _ref;
      matches = 0;
      _ref = this.getMatchingBlocks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        matches += match[2];
      }
      return _calculateRatio(matches, this.a.length + this.b.length);
    };

    SequenceMatcher.prototype.quickRatio = function() {
      /*
          Return an upper bound on ratio() relatively quickly.
      
          This isn't defined beyond that it is an upper bound on .ratio(), and
          is faster to compute.
      */

      var avail, elt, fullbcount, matches, numb, _i, _j, _len, _len1, _ref, _ref1;
      if (!this.fullbcount) {
        this.fullbcount = fullbcount = {};
        _ref = this.b;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elt = _ref[_i];
          fullbcount[elt] = (fullbcount[elt] || 0) + 1;
        }
      }
      fullbcount = this.fullbcount;
      avail = {};
      matches = 0;
      _ref1 = this.a;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        elt = _ref1[_j];
        if (_has(avail, elt)) {
          numb = avail[elt];
        } else {
          numb = fullbcount[elt] || 0;
        }
        avail[elt] = numb - 1;
        if (numb > 0) {
          matches++;
        }
      }
      return _calculateRatio(matches, this.a.length + this.b.length);
    };

    SequenceMatcher.prototype.realQuickRatio = function() {
      /*
          Return an upper bound on ratio() very quickly.
      
          This isn't defined beyond that it is an upper bound on .ratio(), and
          is faster to compute than either .ratio() or .quickRatio().
      */

      var la, lb, _ref;
      _ref = [this.a.length, this.b.length], la = _ref[0], lb = _ref[1];
      return _calculateRatio(min(la, lb), la + lb);
    };

    return SequenceMatcher;

  })();

  getCloseMatches = function(word, possibilities, n, cutoff) {
    var result, s, score, x, _i, _j, _len, _len1, _ref, _results;
    if (n == null) {
      n = 3;
    }
    if (cutoff == null) {
      cutoff = 0.6;
    }
    /*
      Use SequenceMatcher to return list of the best "good enough" matches.
    
      word is a sequence for which close matches are desired (typically a
      string).
    
      possibilities is a list of sequences against which to match word
      (typically a list of strings).
    
      Optional arg n (default 3) is the maximum number of close matches to
      return.  n must be > 0.
    
      Optional arg cutoff (default 0.6) is a float in [0, 1].  Possibilities
      that don't score at least that similar to word are ignored.
    
      The best (no more than n) matches among the possibilities are returned
      in a list, sorted by similarity score, most similar first.
    
      >>> getCloseMatches('appel', ['ape', 'apple', 'peach', 'puppy'])
      ['apple', 'ape']
      >>> KEYWORDS = require('coffee-script').RESERVED
      >>> getCloseMatches('wheel', KEYWORDS)
      ['when', 'while']
      >>> getCloseMatches('accost', KEYWORDS)
      ['const']
    */

    if (!(n > 0)) {
      throw new Error("n must be > 0: (" + n + ")");
    }
    if (!((0.0 <= cutoff && cutoff <= 1.0))) {
      throw new Error("cutoff must be in [0.0, 1.0]: (" + cutoff + ")");
    }
    result = [];
    s = new SequenceMatcher();
    s.setSeq2(word);
    for (_i = 0, _len = possibilities.length; _i < _len; _i++) {
      x = possibilities[_i];
      s.setSeq1(x);
      if (s.realQuickRatio() >= cutoff && s.quickRatio() >= cutoff && s.ratio() >= cutoff) {
        result.push([s.ratio(), x]);
      }
    }
    result = Heap.nlargest(result, n, _arrayCmp);
    _results = [];
    for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
      _ref = result[_j], score = _ref[0], x = _ref[1];
      _results.push(x);
    }
    return _results;
  };

  _countLeading = function(line, ch) {
    /*
      Return number of `ch` characters at the start of `line`.
    
      >>> _countLeading('   abc', ' ')
      3
    */

    var i, n, _ref;
    _ref = [0, line.length], i = _ref[0], n = _ref[1];
    while (i < n && line[i] === ch) {
      i++;
    }
    return i;
  };

  Differ = (function() {

    Differ.name = 'Differ';

    /*
      Differ is a class for comparing sequences of lines of text, and
      producing human-readable differences or deltas.  Differ uses
      SequenceMatcher both to compare sequences of lines, and to compare
      sequences of characters within similar (near-matching) lines.
    
      Each line of a Differ delta begins with a two-letter code:
    
          '- '    line unique to sequence 1
          '+ '    line unique to sequence 2
          '  '    line common to both sequences
          '? '    line not present in either input sequence
    
      Lines beginning with '? ' attempt to guide the eye to intraline
      differences, and were not present in either input sequence.  These lines
      can be confusing if the sequences contain tab characters.
    
      Note that Differ makes no claim to produce a *minimal* diff.  To the
      contrary, minimal diffs are often counter-intuitive, because they synch
      up anywhere possible, sometimes accidental matches 100 pages apart.
      Restricting synch points to contiguous matches preserves some notion of
      locality, at the occasional cost of producing a longer diff.
    
      Example: Comparing two texts.
    
      >>> text1 = ['1. Beautiful is better than ugly.\n',
      ...   '2. Explicit is better than implicit.\n',
      ...   '3. Simple is better than complex.\n',
      ...   '4. Complex is better than complicated.\n']
      >>> text1.length
      4
      >>> text2 = ['1. Beautiful is better than ugly.\n',
      ...   '3.   Simple is better than complex.\n',
      ...   '4. Complicated is better than complex.\n',
      ...   '5. Flat is better than nested.\n']
    
      Next we instantiate a Differ object:
    
      >>> d = new Differ()
    
      Note that when instantiating a Differ object we may pass functions to
      filter out line and character 'junk'.
    
      Finally, we compare the two:
    
      >>> result = d.compare(text1, text2)
      [ '  1. Beautiful is better than ugly.\n',
        '- 2. Explicit is better than implicit.\n',
        '- 3. Simple is better than complex.\n',
        '+ 3.   Simple is better than complex.\n',
        '?   ++\n',
        '- 4. Complex is better than complicated.\n',
        '?          ^                     ---- ^\n',
        '+ 4. Complicated is better than complex.\n',
        '?         ++++ ^                      ^\n',
        '+ 5. Flat is better than nested.\n' ]
    
      Methods:
    
      constructor(linejunk=null, charjunk=null)
          Construct a text differencer, with optional filters.
      compare(a, b)
          Compare two sequences of lines; generate the resulting delta.
    */


    function Differ(linejunk, charjunk) {
      this.linejunk = linejunk;
      this.charjunk = charjunk;
      /*
          Construct a text differencer, with optional filters.
      
          The two optional keyword parameters are for filter functions:
      
          - `linejunk`: A function that should accept a single string argument,
            and return true iff the string is junk. The module-level function
            `IS_LINE_JUNK` may be used to filter out lines without visible
            characters, except for at most one splat ('#').  It is recommended
            to leave linejunk null. 
      
          - `charjunk`: A function that should accept a string of length 1. The
            module-level function `IS_CHARACTER_JUNK` may be used to filter out
            whitespace characters (a blank or tab; **note**: bad idea to include
            newline in this!).  Use of IS_CHARACTER_JUNK is recommended.
      */

    }

    Differ.prototype.compare = function(a, b) {
      /*
          Compare two sequences of lines; generate the resulting delta.
      
          Each sequence must contain individual single-line strings ending with
          newlines. Such sequences can be obtained from the `readlines()` method
          of file-like objects.  The delta generated also consists of newline-
          terminated strings, ready to be printed as-is via the writeline()
          method of a file-like object.
      
          Example:
      
          >>> d = new Differ
          >>> d.compare(['one\n', 'two\n', 'three\n'],
          ...           ['ore\n', 'tree\n', 'emu\n'])
          [ '- one\n',
            '?  ^\n',
            '+ ore\n',
            '?  ^\n',
            '- two\n',
            '- three\n',
            '?  -\n',
            '+ tree\n',
            '+ emu\n' ]
      */

      var ahi, alo, bhi, blo, cruncher, g, line, lines, tag, _i, _j, _len, _len1, _ref, _ref1;
      cruncher = new SequenceMatcher(this.linejunk, a, b);
      lines = [];
      _ref = cruncher.getOpcodes();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], tag = _ref1[0], alo = _ref1[1], ahi = _ref1[2], blo = _ref1[3], bhi = _ref1[4];
        switch (tag) {
          case 'replace':
            g = this._fancyReplace(a, alo, ahi, b, blo, bhi);
            break;
          case 'delete':
            g = this._dump('-', a, alo, ahi);
            break;
          case 'insert':
            g = this._dump('+', b, blo, bhi);
            break;
          case 'equal':
            g = this._dump(' ', a, alo, ahi);
            break;
          default:
            throw new Error("unknow tag (" + tag + ")");
        }
        for (_j = 0, _len1 = g.length; _j < _len1; _j++) {
          line = g[_j];
          lines.push(line);
        }
      }
      return lines;
    };

    Differ.prototype._dump = function(tag, x, lo, hi) {
      /*
          Generate comparison results for a same-tagged range.
      */

      var i, _i, _results;
      _results = [];
      for (i = _i = lo; lo <= hi ? _i < hi : _i > hi; i = lo <= hi ? ++_i : --_i) {
        _results.push("" + tag + " " + x[i]);
      }
      return _results;
    };

    Differ.prototype._plainReplace = function(a, alo, ahi, b, blo, bhi) {
      var first, g, line, lines, second, _i, _j, _len, _len1, _ref;
      assert(alo < ahi && blo < bhi);
      if (bhi - blo < ahi - alo) {
        first = this._dump('+', b, blo, bhi);
        second = this._dump('-', a, alo, ahi);
      } else {
        first = this._dump('-', a, alo, ahi);
        second = this._dump('+', b, blo, bhi);
      }
      lines = [];
      _ref = [first, second];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        g = _ref[_i];
        for (_j = 0, _len1 = g.length; _j < _len1; _j++) {
          line = g[_j];
          lines.push(line);
        }
      }
      return lines;
    };

    Differ.prototype._fancyReplace = function(a, alo, ahi, b, blo, bhi) {
      /*
          When replacing one block of lines with another, search the blocks
          for *similar* lines; the best-matching pair (if any) is used as a
          synch point, and intraline difference marking is done on the
          similar pair. Lots of work, but often worth it.
      
          Example:
          >>> d = new Differ
          >>> d._fancyReplace(['abcDefghiJkl\n'], 0, 1,
          ...                 ['abcdefGhijkl\n'], 0, 1)
          [ '- abcDefghiJkl\n',
            '?    ^  ^  ^\n',
            '+ abcdefGhijkl\n',
            '?    ^  ^  ^\n' ]
      */

      var aelt, ai, ai1, ai2, atags, belt, bestRatio, besti, bestj, bj, bj1, bj2, btags, cruncher, cutoff, eqi, eqj, i, j, la, lb, line, lines, tag, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _o, _ref, _ref1, _ref10, _ref11, _ref12, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      _ref = [0.74, 0.75], bestRatio = _ref[0], cutoff = _ref[1];
      cruncher = new SequenceMatcher(this.charjunk);
      _ref1 = [null, null], eqi = _ref1[0], eqj = _ref1[1];
      lines = [];
      for (j = _i = blo; blo <= bhi ? _i < bhi : _i > bhi; j = blo <= bhi ? ++_i : --_i) {
        bj = b[j];
        cruncher.setSeq2(bj);
        for (i = _j = alo; alo <= ahi ? _j < ahi : _j > ahi; i = alo <= ahi ? ++_j : --_j) {
          ai = a[i];
          if (ai === bj) {
            if (eqi === null) {
              _ref2 = [i, j], eqi = _ref2[0], eqj = _ref2[1];
            }
            continue;
          }
          cruncher.setSeq1(ai);
          if (cruncher.realQuickRatio() > bestRatio && cruncher.quickRatio() > bestRatio && cruncher.ratio() > bestRatio) {
            _ref3 = [cruncher.ratio(), i, j], bestRatio = _ref3[0], besti = _ref3[1], bestj = _ref3[2];
          }
        }
      }
      if (bestRatio < cutoff) {
        if (eqi === null) {
          _ref4 = this._plainReplace(a, alo, ahi, b, blo, bhi);
          for (_k = 0, _len = _ref4.length; _k < _len; _k++) {
            line = _ref4[_k];
            lines.push(line);
          }
          return lines;
        }
        _ref5 = [eqi, eqj, 1.0], besti = _ref5[0], bestj = _ref5[1], bestRatio = _ref5[2];
      } else {
        eqi = null;
      }
      _ref6 = this._fancyHelper(a, alo, besti, b, blo, bestj);
      for (_l = 0, _len1 = _ref6.length; _l < _len1; _l++) {
        line = _ref6[_l];
        lines.push(line);
      }
      _ref7 = [a[besti], b[bestj]], aelt = _ref7[0], belt = _ref7[1];
      if (eqi === null) {
        atags = btags = '';
        cruncher.setSeqs(aelt, belt);
        _ref8 = cruncher.getOpcodes();
        for (_m = 0, _len2 = _ref8.length; _m < _len2; _m++) {
          _ref9 = _ref8[_m], tag = _ref9[0], ai1 = _ref9[1], ai2 = _ref9[2], bj1 = _ref9[3], bj2 = _ref9[4];
          _ref10 = [ai2 - ai1, bj2 - bj1], la = _ref10[0], lb = _ref10[1];
          switch (tag) {
            case 'replace':
              atags += Array(la + 1).join('^');
              btags += Array(lb + 1).join('^');
              break;
            case 'delete':
              atags += Array(la + 1).join('-');
              break;
            case 'insert':
              btags += Array(lb + 1).join('+');
              break;
            case 'equal':
              atags += Array(la + 1).join(' ');
              btags += Array(lb + 1).join(' ');
              break;
            default:
              throw new Error("unknow tag (" + tag + ")");
          }
        }
        _ref11 = this._qformat(aelt, belt, atags, btags);
        for (_n = 0, _len3 = _ref11.length; _n < _len3; _n++) {
          line = _ref11[_n];
          lines.push(line);
        }
      } else {
        lines.push('  ' + aelt);
      }
      _ref12 = this._fancyHelper(a, besti + 1, ahi, b, bestj + 1, bhi);
      for (_o = 0, _len4 = _ref12.length; _o < _len4; _o++) {
        line = _ref12[_o];
        lines.push(line);
      }
      return lines;
    };

    Differ.prototype._fancyHelper = function(a, alo, ahi, b, blo, bhi) {
      var g;
      g = [];
      if (alo < ahi) {
        if (blo < bhi) {
          g = this._fancyReplace(a, alo, ahi, b, blo, bhi);
        } else {
          g = this._dump('-', a, alo, ahi);
        }
      } else if (blo < bhi) {
        g = this._dump('+', b, blo, bhi);
      }
      return g;
    };

    Differ.prototype._qformat = function(aline, bline, atags, btags) {
      /*
          Format "?" output and deal with leading tabs.
      
          Example:
      
          >>> d = new Differ
          >>> d._qformat('\tabcDefghiJkl\n', '\tabcdefGhijkl\n',
          [ '- \tabcDefghiJkl\n',
            '? \t ^ ^  ^\n',
            '+ \tabcdefGhijkl\n',
            '? \t ^ ^  ^\n' ]
      */

      var common, lines;
      lines = [];
      common = min(_countLeading(aline, '\t'), _countLeading(bline, '\t'));
      common = min(common, _countLeading(atags.slice(0, common), ' '));
      common = min(common, _countLeading(btags.slice(0, common), ' '));
      atags = atags.slice(common).replace(/\s+$/, '');
      btags = btags.slice(common).replace(/\s+$/, '');
      lines.push('- ' + aline);
      if (atags.length) {
        lines.push("? " + (Array(common + 1).join('\t')) + atags + "\n");
      }
      lines.push('+ ' + bline);
      if (btags.length) {
        lines.push("? " + (Array(common + 1).join('\t')) + btags + "\n");
      }
      return lines;
    };

    return Differ;

  })();

  IS_LINE_JUNK = function(line, pat) {
    if (pat == null) {
      pat = /^\s*#?\s*$/;
    }
    /*
      Return 1 for ignorable line: iff `line` is blank or contains a single '#'.
        
      Examples:
    
      >>> IS_LINE_JUNK('\n')
      true
      >>> IS_LINE_JUNK('  #   \n')
      true
      >>> IS_LINE_JUNK('hello\n')
      false
    */

    return pat.test(line);
  };

  IS_CHARACTER_JUNK = function(ch, ws) {
    if (ws == null) {
      ws = ' \t';
    }
    /*
      Return 1 for ignorable character: iff `ch` is a space or tab.
    
      Examples:
      >>> IS_CHARACTER_JUNK(' ').should.be.true
      true
      >>> IS_CHARACTER_JUNK('\t').should.be.true
      true
      >>> IS_CHARACTER_JUNK('\n').should.be.false
      false
      >>> IS_CHARACTER_JUNK('x').should.be.false
      false
    */

    return __indexOf.call(ws, ch) >= 0;
  };

  _formatRangeUnified = function(start, stop) {
    /*
      Convert range to the "ed" format'
    */

    var beginning, length;
    beginning = start + 1;
    length = stop - start;
    if (length === 1) {
      return "" + beginning;
    }
    if (!length) {
      beginning--;
    }
    return "" + beginning + "," + length;
  };

  unifiedDiff = function(a, b, _arg) {
    var file1Range, file2Range, first, fromdate, fromfile, fromfiledate, group, i1, i2, j1, j2, last, line, lines, lineterm, n, started, tag, todate, tofile, tofiledate, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    _ref = _arg != null ? _arg : {}, fromfile = _ref.fromfile, tofile = _ref.tofile, fromfiledate = _ref.fromfiledate, tofiledate = _ref.tofiledate, n = _ref.n, lineterm = _ref.lineterm;
    /*
      Compare two sequences of lines; generate the delta as a unified diff.
    
      Unified diffs are a compact way of showing line changes and a few
      lines of context.  The number of context lines is set by 'n' which
      defaults to three.
    
      By default, the diff control lines (those with ---, +++, or @@) are
      created with a trailing newline.  
    
      For inputs that do not have trailing newlines, set the lineterm
      argument to "" so that the output will be uniformly newline free.
    
      The unidiff format normally has a header for filenames and modification
      times.  Any or all of these may be specified using strings for
      'fromfile', 'tofile', 'fromfiledate', and 'tofiledate'.
      The modification times are normally expressed in the ISO 8601 format.
    
      Example:
    
      >>> unifiedDiff('one two three four'.split(' '),
      ...             'zero one tree four'.split(' '), {
      ...               fromfile: 'Original'
      ...               tofile: 'Current',
      ...               fromfiledate: '2005-01-26 23:30:50',
      ...               tofiledate: '2010-04-02 10:20:52',
      ...               lineterm: ''
      ...             })
      [ '--- Original\t2005-01-26 23:30:50',
        '+++ Current\t2010-04-02 10:20:52',
        '@@ -1,4 +1,4 @@',
        '+zero',
        ' one',
        '-two',
        '-three',
        '+tree',
        ' four' ]
    */

    if (fromfile == null) {
      fromfile = '';
    }
    if (tofile == null) {
      tofile = '';
    }
    if (fromfiledate == null) {
      fromfiledate = '';
    }
    if (tofiledate == null) {
      tofiledate = '';
    }
    if (n == null) {
      n = 3;
    }
    if (lineterm == null) {
      lineterm = '\n';
    }
    lines = [];
    started = false;
    _ref1 = (new SequenceMatcher(null, a, b)).getGroupedOpcodes();
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      group = _ref1[_i];
      if (!started) {
        started = true;
        fromdate = fromfiledate ? "\t" + fromfiledate : '';
        todate = tofiledate ? "\t" + tofiledate : '';
        lines.push("--- " + fromfile + fromdate + lineterm);
        lines.push("+++ " + tofile + todate + lineterm);
      }
      _ref2 = [group[0], group[group.length - 1]], first = _ref2[0], last = _ref2[1];
      file1Range = _formatRangeUnified(first[1], last[2]);
      file2Range = _formatRangeUnified(first[3], last[4]);
      lines.push("@@ -" + file1Range + " +" + file2Range + " @@" + lineterm);
      for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
        _ref3 = group[_j], tag = _ref3[0], i1 = _ref3[1], i2 = _ref3[2], j1 = _ref3[3], j2 = _ref3[4];
        if (tag === 'equal') {
          _ref4 = a.slice(i1, i2);
          for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
            line = _ref4[_k];
            lines.push(' ' + line);
          }
          continue;
        }
        if (tag === 'replace' || tag === 'delete') {
          _ref5 = a.slice(i1, i2);
          for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
            line = _ref5[_l];
            lines.push('-' + line);
          }
        }
        if (tag === 'replace' || tag === 'insert') {
          _ref6 = b.slice(j1, j2);
          for (_m = 0, _len4 = _ref6.length; _m < _len4; _m++) {
            line = _ref6[_m];
            lines.push('+' + line);
          }
        }
      }
    }
    return lines;
  };

  _formatRangeContext = function(start, stop) {
    /*
      Convert range to the "ed" format'
    */

    var beginning, length;
    beginning = start + 1;
    length = stop - start;
    if (!length) {
      beginning--;
    }
    if (length <= 1) {
      return "" + beginning;
    }
    return "" + beginning + "," + (beginning + length - 1);
  };

  contextDiff = function(a, b, _arg) {
    var file1Range, file2Range, first, fromdate, fromfile, fromfiledate, group, i1, i2, j1, j2, last, line, lines, lineterm, n, prefix, started, tag, todate, tofile, tofiledate, _, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    _ref = _arg != null ? _arg : {}, fromfile = _ref.fromfile, tofile = _ref.tofile, fromfiledate = _ref.fromfiledate, tofiledate = _ref.tofiledate, n = _ref.n, lineterm = _ref.lineterm;
    /*
      Compare two sequences of lines; generate the delta as a context diff.
    
      Context diffs are a compact way of showing line changes and a few
      lines of context.  The number of context lines is set by 'n' which
      defaults to three.
    
      By default, the diff control lines (those with *** or ---) are
      created with a trailing newline.  This is helpful so that inputs
      created from file.readlines() result in diffs that are suitable for
      file.writelines() since both the inputs and outputs have trailing
      newlines.
    
      For inputs that do not have trailing newlines, set the lineterm
      argument to "" so that the output will be uniformly newline free.
    
      The context diff format normally has a header for filenames and
      modification times.  Any or all of these may be specified using
      strings for 'fromfile', 'tofile', 'fromfiledate', and 'tofiledate'.
      The modification times are normally expressed in the ISO 8601 format.
      If not specified, the strings default to blanks.
    
      Example:
      >>> a = ['one\n', 'two\n', 'three\n', 'four\n']
      >>> b = ['zero\n', 'one\n', 'tree\n', 'four\n']
      >>> contextDiff(a, b, {fromfile: 'Original', tofile: 'Current'})
      [ '*** Original\n',
        '--- Current\n',
        '***************\n',
        '*** 1,4 ****\n',
        '  one\n',
        '! two\n',
        '! three\n',
        '  four\n',
        '--- 1,4 ----\n',
        '+ zero\n',
        '  one\n',
        '! tree\n',
        '  four\n' ]
    */

    if (fromfile == null) {
      fromfile = '';
    }
    if (tofile == null) {
      tofile = '';
    }
    if (fromfiledate == null) {
      fromfiledate = '';
    }
    if (tofiledate == null) {
      tofiledate = '';
    }
    if (n == null) {
      n = 3;
    }
    if (lineterm == null) {
      lineterm = '\n';
    }
    prefix = {
      insert: '+ ',
      "delete": '- ',
      replace: '! ',
      equal: '  '
    };
    started = false;
    lines = [];
    _ref1 = (new SequenceMatcher(null, a, b)).getGroupedOpcodes();
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      group = _ref1[_i];
      if (!started) {
        started = true;
        fromdate = fromfiledate ? "\t" + fromfiledate : '';
        todate = tofiledate ? "\t" + tofiledate : '';
        lines.push("*** " + fromfile + fromdate + lineterm);
        lines.push("--- " + tofile + todate + lineterm);
        _ref2 = [group[0], group[group.length - 1]], first = _ref2[0], last = _ref2[1];
        lines.push('***************' + lineterm);
        file1Range = _formatRangeContext(first[1], last[2]);
        lines.push("*** " + file1Range + " ****" + lineterm);
        if (_any((function() {
          var _j, _len1, _ref3, _results;
          _results = [];
          for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
            _ref3 = group[_j], tag = _ref3[0], _ = _ref3[1], _ = _ref3[2], _ = _ref3[3], _ = _ref3[4];
            _results.push(tag === 'replace' || tag === 'delete');
          }
          return _results;
        })())) {
          for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
            _ref3 = group[_j], tag = _ref3[0], i1 = _ref3[1], i2 = _ref3[2], _ = _ref3[3], _ = _ref3[4];
            if (tag !== 'insert') {
              _ref4 = a.slice(i1, i2);
              for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
                line = _ref4[_k];
                lines.push(prefix[tag] + line);
              }
            }
          }
        }
        file2Range = _formatRangeContext(first[3], last[4]);
        lines.push("--- " + file2Range + " ----" + lineterm);
        if (_any((function() {
          var _l, _len3, _ref5, _results;
          _results = [];
          for (_l = 0, _len3 = group.length; _l < _len3; _l++) {
            _ref5 = group[_l], tag = _ref5[0], _ = _ref5[1], _ = _ref5[2], _ = _ref5[3], _ = _ref5[4];
            _results.push(tag === 'replace' || tag === 'insert');
          }
          return _results;
        })())) {
          for (_l = 0, _len3 = group.length; _l < _len3; _l++) {
            _ref5 = group[_l], tag = _ref5[0], _ = _ref5[1], _ = _ref5[2], j1 = _ref5[3], j2 = _ref5[4];
            if (tag !== 'delete') {
              _ref6 = b.slice(j1, j2);
              for (_m = 0, _len4 = _ref6.length; _m < _len4; _m++) {
                line = _ref6[_m];
                lines.push(prefix[tag] + line);
              }
            }
          }
        }
      }
    }
    return lines;
  };

  ndiff = function(a, b, linejunk, charjunk) {
    if (charjunk == null) {
      charjunk = IS_CHARACTER_JUNK;
    }
    /*
      Compare `a` and `b` (lists of strings); return a `Differ`-style delta.
    
      Optional keyword parameters `linejunk` and `charjunk` are for filter
      functions (or None):
    
      - linejunk: A function that should accept a single string argument, and
        return true iff the string is junk.  The default is null, and is
        recommended; 
    
      - charjunk: A function that should accept a string of length 1. The
        default is module-level function IS_CHARACTER_JUNK, which filters out
        whitespace characters (a blank or tab; note: bad idea to include newline
        in this!).
    
      Example:
      >>> a = ['one\n', 'two\n', 'three\n']
      >>> b = ['ore\n', 'tree\n', 'emu\n']
      >>> ndiff(a, b)
      [ '- one\n',
        '?  ^\n',
        '+ ore\n',
        '?  ^\n',
        '- two\n',
        '- three\n',
        '?  -\n',
        '+ tree\n',
        '+ emu\n' ]
    */

    return (new Differ(linejunk, charjunk)).compare(a, b);
  };

  restore = function(delta, which) {
    /*
      Generate one of the two sequences that generated a delta.
    
      Given a `delta` produced by `Differ.compare()` or `ndiff()`, extract
      lines originating from file 1 or 2 (parameter `which`), stripping off line
      prefixes.
    
      Examples:
      >>> a = ['one\n', 'two\n', 'three\n']
      >>> b = ['ore\n', 'tree\n', 'emu\n']
      >>> diff = ndiff(a, b)
      >>> restore(diff, 1)
      [ 'one\n',
        'two\n',
        'three\n' ]
      >>> restore(diff, 2)
      [ 'ore\n',
        'tree\n',
        'emu\n' ]
    */

    var line, lines, prefixes, tag, _i, _len, _ref;
    tag = {
      1: '- ',
      2: '+ '
    }[which];
    if (!tag) {
      throw new Error("unknow delta choice (must be 1 or 2): " + which);
    }
    prefixes = ['  ', tag];
    lines = [];
    for (_i = 0, _len = delta.length; _i < _len; _i++) {
      line = delta[_i];
      if (_ref = line.slice(0, 2), __indexOf.call(prefixes, _ref) >= 0) {
        lines.push(line.slice(2));
      }
    }
    return lines;
  };

  exports._arrayCmp = _arrayCmp;

  exports.SequenceMatcher = SequenceMatcher;

  exports.getCloseMatches = getCloseMatches;

  exports._countLeading = _countLeading;

  exports.Differ = Differ;

  exports.IS_LINE_JUNK = IS_LINE_JUNK;

  exports.IS_CHARACTER_JUNK = IS_CHARACTER_JUNK;

  exports._formatRangeUnified = _formatRangeUnified;

  exports.unifiedDiff = unifiedDiff;

  exports._formatRangeContext = _formatRangeContext;

  exports.contextDiff = contextDiff;

  exports.ndiff = ndiff;

  exports.restore = restore;

}).call(this);


/***/ }),

/***/ 8212:
/***/ ((module) => {

"use strict";


module.exports = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};


/***/ }),

/***/ 1128:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __nccwpck_require__(5282);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),

/***/ 2324:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var numberIsNaN       = __nccwpck_require__(6881)
  , toPosInt          = __nccwpck_require__(3755)
  , value             = __nccwpck_require__(5282)
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement /*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};


/***/ }),

/***/ 8137:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt          = __nccwpck_require__(3755)
  , callable          = __nccwpck_require__(6097)
  , value             = __nccwpck_require__(5282)
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , call              = Function.prototype.call;

module.exports = function (cb /*, thisArg*/) {
	var i, self, thisArg;

	self = Object(value(this));
	callable(cb);
	thisArg = arguments[1];

	for (i = toPosInt(self.length) - 1; i >= 0; --i) {
		if (objHasOwnProperty.call(self, i)) call.call(cb, thisArg, self[i], i, self);
	}
};


/***/ }),

/***/ 5684:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var indexOf = __nccwpck_require__(2324)
  , filter  = Array.prototype.filter
  , isFirst;

isFirst = function (value, index) { return indexOf.call(this, value) === index; };

module.exports = function () { return filter.call(this, isFirst, this); };


/***/ }),

/***/ 2406:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(6619)() ? Array.from : __nccwpck_require__(8049);


/***/ }),

/***/ 6619:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};


/***/ }),

/***/ 8049:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var iteratorSymbol = (__nccwpck_require__(1228).iterator)
  , isArguments    = __nccwpck_require__(1375)
  , isFunction     = __nccwpck_require__(1003)
  , toPosInt       = __nccwpck_require__(3755)
  , callable       = __nccwpck_require__(6097)
  , validValue     = __nccwpck_require__(5282)
  , isValue        = __nccwpck_require__(2285)
  , isString       = __nccwpck_require__(5624)
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike /*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};


/***/ }),

/***/ 2906:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt = __nccwpck_require__(3755)
  , value    = __nccwpck_require__(5282)
  , slice    = Array.prototype.slice;

module.exports = function (length /*, …fill*/) {
	var arr, currentLength;
	length = toPosInt(value(length));
	if (length === 0) return [];

	arr = arguments.length < 2 ? [undefined] : slice.call(arguments, 1, 1 + length);

	while ((currentLength = arr.length) < length) {
		arr = arr.concat(arr.slice(0, length - currentLength));
	}
	return arr;
};


/***/ }),

/***/ 2353:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var from    = __nccwpck_require__(2406)
  , isArray = Array.isArray;

module.exports = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from(arrayLike); };


/***/ }),

/***/ 9684:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var assign            = __nccwpck_require__(1377)
  , isObject          = __nccwpck_require__(1380)
  , isValue           = __nccwpck_require__(2285)
  , captureStackTrace = Error.captureStackTrace;

module.exports = function (message /*, code, ext*/) {
	var err = new Error(message), code = arguments[1], ext = arguments[2];
	if (!isValue(ext)) {
		if (isObject(code)) {
			ext = code;
			code = null;
		}
	}
	if (isValue(ext)) assign(err, ext);
	if (isValue(code)) err.code = code;
	if (captureStackTrace) captureStackTrace(err, module.exports);
	return err;
};


/***/ }),

/***/ 4274:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue  = __nccwpck_require__(2285)
  , callable = __nccwpck_require__(6097)
  , aFrom    = __nccwpck_require__(2406);

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , callFn = function (arg, fn) { return call.call(fn, this, arg); };

module.exports = function (fnIgnored /*, …fnn*/) {
	var fns, first;
	var args = aFrom(arguments);
	fns = isValue(this) ? [this].concat(args) : args;
	fns.forEach(callable);
	fns = fns.reverse();
	first = fns[0];
	fns = fns.slice(1);
	return function (argIgnored) { return fns.reduce(callFn, apply.call(first, this, arguments)); };
};


/***/ }),

/***/ 1490:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt = __nccwpck_require__(3755);

var test = function (arg1, arg2) { return arg2; };

var desc, defineProperty, generate, mixin;

try {
	Object.defineProperty(test, "length", {
		configurable: true,
		writable: false,
		enumerable: false,
		value: 1
	});
}
catch (ignore) {}

if (test.length === 1) {
	// ES6
	desc = { configurable: true, writable: false, enumerable: false };
	defineProperty = Object.defineProperty;
	module.exports = function (fn, length) {
		length = toPosInt(length);
		if (fn.length === length) return fn;
		desc.value = length;
		return defineProperty(fn, "length", desc);
	};
} else {
	mixin = __nccwpck_require__(1070);
	generate = (function () {
		var cache = [];
		return function (length) {
			var args, i = 0;
			if (cache[length]) return cache[length];
			args = [];
			while (length--) args.push("a" + (++i).toString(36));
			// eslint-disable-next-line no-new-func
			return new Function(
				"fn",
				"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
			);
		};
	})();
	module.exports = function (src, length) {
		var target;
		length = toPosInt(length);
		if (src.length === length) return src;
		target = generate(length)(src);
		try { mixin(target, src); }
		catch (ignore) {}
		return target;
	};
}


/***/ }),

/***/ 1375:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };


/***/ }),

/***/ 1003:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};


/***/ }),

/***/ 6049:
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 2024:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var iteratorSymbol = (__nccwpck_require__(1228).iterator)
  , isValue        = __nccwpck_require__(2285)
  , isArrayLike    = __nccwpck_require__(3416);

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (typeof value[iteratorSymbol] === "function") return true;
	return isArrayLike(value);
};


/***/ }),

/***/ 3205:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isObject = __nccwpck_require__(1380)
  , is       = __nccwpck_require__(2024);

module.exports = function (value) {
	if (is(value) && isObject(value)) return value;
	throw new TypeError(value + " is not an iterable or array-like object");
};


/***/ }),

/***/ 2293:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(1492)() ? Math.sign : __nccwpck_require__(8745);


/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};


/***/ }),

/***/ 8745:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};


/***/ }),

/***/ 9394:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(9019)() ? Math.trunc : __nccwpck_require__(5707);


/***/ }),

/***/ 9019:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var trunc = Math.trunc;
	if (typeof trunc !== "function") return false;
	return trunc(13.67) === 13 && trunc(-13.67) === -13;
};


/***/ }),

/***/ 5707:
/***/ ((module) => {

"use strict";


var floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (value === Infinity) return Infinity;
	if (value === -Infinity) return -Infinity;
	if (value > 0) return floor(value);
	return -floor(-value);
};


/***/ }),

/***/ 6881:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(5587)() ? Number.isNaN : __nccwpck_require__(3259);


/***/ }),

/***/ 5587:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};


/***/ }),

/***/ 3259:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};


/***/ }),

/***/ 9836:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var sign  = __nccwpck_require__(2293)
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),

/***/ 3755:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toInteger = __nccwpck_require__(9836)
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),

/***/ 7175:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable                = __nccwpck_require__(6097)
  , value                   = __nccwpck_require__(5282)
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),

/***/ 1377:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(8732)() ? Object.assign : __nccwpck_require__(7795);


/***/ }),

/***/ 8732:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 7795:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var keys  = __nccwpck_require__(8336)
  , value = __nccwpck_require__(5282)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 3382:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var aFrom  = __nccwpck_require__(2406)
  , assign = __nccwpck_require__(1377)
  , value  = __nccwpck_require__(5282);

module.exports = function (obj /*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};


/***/ }),

/***/ 8465:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__nccwpck_require__(3579)()) {
	shim = __nccwpck_require__(5410);
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = { configurable: false, enumerable: false, writable: true, value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
})();


/***/ }),

/***/ 7726:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var value                   = __nccwpck_require__(5282)
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var i;
	value(obj);
	for (i in obj) {
		if (objPropertyIsEnumerable.call(obj, i)) return i;
	}
	return null;
};


/***/ }),

/***/ 9575:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(7175)("forEach");


/***/ }),

/***/ 3416:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isFunction = __nccwpck_require__(1003)
  , isObject   = __nccwpck_require__(1380)
  , isValue    = __nccwpck_require__(2285);

module.exports = function (value) {
	return (
		(isValue(value) &&
			typeof value.length === "number" &&
			// Just checking ((typeof x === 'object') && (typeof x !== 'function'))
			// won't work right for some cases, e.g.:
			// type of instance of NodeList in Safari is a 'function'
			((isObject(value) && !isFunction(value)) || typeof value === "string")) ||
		false
	);
};


/***/ }),

/***/ 1448:
/***/ ((module) => {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === "function"; };


/***/ }),

/***/ 1380:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue = __nccwpck_require__(2285);

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };


/***/ }),

/***/ 2285:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var _undefined = __nccwpck_require__(6049)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 8336:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(7491)() ? Object.keys : __nccwpck_require__(3890);


/***/ }),

/***/ 7491:
/***/ ((module) => {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 3890:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue = __nccwpck_require__(2285);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 7289:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var callable = __nccwpck_require__(6097)
  , forEach  = __nccwpck_require__(9575)
  , call     = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};


/***/ }),

/***/ 1070:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var value                    = __nccwpck_require__(5282)
  , defineProperty           = Object.defineProperty
  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , getOwnPropertyNames      = Object.getOwnPropertyNames
  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

module.exports = function (target, source) {
	var error, sourceObject = Object(value(source));
	target = Object(value(target));
	getOwnPropertyNames(sourceObject).forEach(function (name) {
		try {
			defineProperty(target, name, getOwnPropertyDescriptor(source, name));
		} catch (e) { error = e; }
	});
	if (typeof getOwnPropertySymbols === "function") {
		getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
			try {
				defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
			} catch (e) { error = e; }
		});
	}
	if (error !== undefined) throw error;
	return target;
};


/***/ }),

/***/ 4488:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue = __nccwpck_require__(2285);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg /*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};


/***/ }),

/***/ 7165:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(3579)() ? Object.setPrototypeOf : __nccwpck_require__(5410);


/***/ }),

/***/ 3579:
/***/ ((module) => {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};


/***/ }),

/***/ 5410:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject         = __nccwpck_require__(1380)
  , value            = __nccwpck_require__(5282)
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty   = Object.defineProperty
  , nullDesc         = { configurable: true, enumerable: false, writable: true, value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
})(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
);

__nccwpck_require__(8465);


/***/ }),

/***/ 6097:
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 6561:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isObject = __nccwpck_require__(1380);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),

/***/ 5282:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue = __nccwpck_require__(2285);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 8080:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var ensureValue   = __nccwpck_require__(5282)
  , stringifiable = __nccwpck_require__(1481);

module.exports = function (value) { return stringifiable(ensureValue(value)); };


/***/ }),

/***/ 1481:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isCallable = __nccwpck_require__(1448);

module.exports = function (stringifiable) {
	try {
		if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
		return String(stringifiable);
	} catch (e) {
		throw new TypeError("Passed argument cannot be stringifed");
	}
};


/***/ }),

/***/ 3949:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isCallable = __nccwpck_require__(1448);

module.exports = function (value) {
	try {
		if (value && isCallable(value.toString)) return value.toString();
		return String(value);
	} catch (e) {
		return "<Non-coercible to string value>";
	}
};


/***/ }),

/***/ 7689:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(9710)() ? String.prototype.contains : __nccwpck_require__(1706);


/***/ }),

/***/ 9710:
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 1706:
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 5650:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(4403)() ? String.prototype.repeat : __nccwpck_require__(5076);


/***/ }),

/***/ 4403:
/***/ ((module) => {

"use strict";


var str = "foo";

module.exports = function () {
	if (typeof str.repeat !== "function") return false;
	return str.repeat(2) === "foofoo";
};


/***/ }),

/***/ 5076:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Thanks
// @rauchma http://www.2ality.com/2014/01/efficient-string-repeat.html
// @mathiasbynens https://github.com/mathiasbynens/String.prototype.repeat/blob/4a4b567def/repeat.js



var value     = __nccwpck_require__(5282)
  , toInteger = __nccwpck_require__(9836);

module.exports = function (count) {
	var str = String(value(this)), result;
	count = toInteger(count);
	if (count < 0) throw new RangeError("Count must be >= 0");
	if (!isFinite(count)) throw new RangeError("Count must be < ∞");

	result = "";
	while (count) {
		if (count % 2) result += str;
		if (count > 1) str += str;
		// eslint-disable-next-line no-bitwise
		count >>= 1;
	}
	return result;
};


/***/ }),

/***/ 5624:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};


/***/ }),

/***/ 3298:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var safeToString = __nccwpck_require__(3949);

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		return JSON.stringify(char).slice(1, -1);
	});
	return string;
};


/***/ }),

/***/ 3254:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var setPrototypeOf = __nccwpck_require__(7165)
  , contains       = __nccwpck_require__(7689)
  , d              = __nccwpck_require__(4571)
  , Symbol         = __nccwpck_require__(1228)
  , Iterator       = __nccwpck_require__(4580);

var defineProperty = Object.defineProperty, ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";
	else if (contains.call(kind, "key+value")) kind = "key+value";
	else if (contains.call(kind, "key")) kind = "key";
	else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));


/***/ }),

/***/ 6756:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isArguments = __nccwpck_require__(1375)
  , callable    = __nccwpck_require__(6097)
  , isString    = __nccwpck_require__(5624)
  , get         = __nccwpck_require__(5561);

var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";
	else if (isString(iterable)) mode = "string";
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),

/***/ 5561:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isArguments    = __nccwpck_require__(1375)
  , isString       = __nccwpck_require__(5624)
  , ArrayIterator  = __nccwpck_require__(3254)
  , StringIterator = __nccwpck_require__(999)
  , iterable       = __nccwpck_require__(7747)
  , iteratorSymbol = (__nccwpck_require__(1228).iterator);

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),

/***/ 4580:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var clear    = __nccwpck_require__(1128)
  , assign   = __nccwpck_require__(1377)
  , callable = __nccwpck_require__(6097)
  , value    = __nccwpck_require__(5282)
  , d        = __nccwpck_require__(4571)
  , autoBind = __nccwpck_require__(6362)
  , Symbol   = __nccwpck_require__(1228);

var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete Iterator.prototype.constructor;

defineProperties(
	Iterator.prototype,
	assign(
		{
			_next: d(function () {
				var i;
				if (!this.__list__) return undefined;
				if (this.__redo__) {
					i = this.__redo__.shift();
					if (i !== undefined) return i;
				}
				if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
				this._unBind();
				return undefined;
			}),
			next: d(function () {
				return this._createResult(this._next());
			}),
			_createResult: d(function (i) {
				if (i === undefined) return { done: true, value: undefined };
				return { done: false, value: this._resolve(i) };
			}),
			_resolve: d(function (i) {
				return this.__list__[i];
			}),
			_unBind: d(function () {
				this.__list__ = null;
				delete this.__redo__;
				if (!this.__context__) return;
				this.__context__.off("_add", this._onAdd);
				this.__context__.off("_delete", this._onDelete);
				this.__context__.off("_clear", this._onClear);
				this.__context__ = null;
			}),
			toString: d(function () {
				return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
			})
		},
		autoBind({
			_onAdd: d(function (index) {
				if (index >= this.__nextIndex__) return;
				++this.__nextIndex__;
				if (!this.__redo__) {
					defineProperty(this, "__redo__", d("c", [index]));
					return;
				}
				this.__redo__.forEach(function (redo, i) {
					if (redo >= index) this.__redo__[i] = ++redo;
				}, this);
				this.__redo__.push(index);
			}),
			_onDelete: d(function (index) {
				var i;
				if (index >= this.__nextIndex__) return;
				--this.__nextIndex__;
				if (!this.__redo__) return;
				i = this.__redo__.indexOf(index);
				if (i !== -1) this.__redo__.splice(i, 1);
				this.__redo__.forEach(function (redo, j) {
					if (redo > index) this.__redo__[j] = --redo;
				}, this);
			}),
			_onClear: d(function () {
				if (this.__redo__) clear.call(this.__redo__);
				this.__nextIndex__ = 0;
			})
		})
	)
);

defineProperty(
	Iterator.prototype,
	Symbol.iterator,
	d(function () {
		return this;
	})
);


/***/ }),

/***/ 2811:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isArguments = __nccwpck_require__(1375)
  , isValue     = __nccwpck_require__(2285)
  , isString    = __nccwpck_require__(5624);

var iteratorSymbol = (__nccwpck_require__(1228).iterator)
  , isArray        = Array.isArray;

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === "function";
};


/***/ }),

/***/ 999:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __nccwpck_require__(7165)
  , d              = __nccwpck_require__(4571)
  , Symbol         = __nccwpck_require__(1228)
  , Iterator       = __nccwpck_require__(4580);

var defineProperty = Object.defineProperty, StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));


/***/ }),

/***/ 7747:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isIterable = __nccwpck_require__(2811);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),

/***/ 1228:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(3338)()
	? (__nccwpck_require__(3407).Symbol)
	: __nccwpck_require__(4347);


/***/ }),

/***/ 3338:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var global     = __nccwpck_require__(3407)
  , validTypes = { object: true, symbol: true };

module.exports = function () {
	var Symbol = global.Symbol;
	var symbol;
	if (typeof Symbol !== "function") return false;
	symbol = Symbol("test symbol");
	try { String(symbol); }
	catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),

/***/ 3880:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	if (!value) return false;
	if (typeof value === "symbol") return true;
	if (!value.constructor) return false;
	if (value.constructor.name !== "Symbol") return false;
	return value[value.constructor.toStringTag] === "Symbol";
};


/***/ }),

/***/ 7467:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d = __nccwpck_require__(4571);

var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

var created = create(null);
module.exports = function (desc) {
	var postfix = 0, name, ie11BugWorkaround;
	while (created[desc + (postfix || "")]) ++postfix;
	desc += postfix || "";
	created[desc] = true;
	name = "@@" + desc;
	defineProperty(
		objPrototype,
		name,
		d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		})
	);
	return name;
};


/***/ }),

/***/ 2605:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d            = __nccwpck_require__(4571)
  , NativeSymbol = (__nccwpck_require__(3407).Symbol);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d(
			"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
		),
		isConcatSpreadable: d(
			"",
			(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
				SymbolPolyfill("isConcatSpreadable")
		),
		iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
		match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
		replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
		search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
		species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
		split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
		toPrimitive: d(
			"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
		),
		toStringTag: d(
			"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
		),
		unscopables: d(
			"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
		)
	});
};


/***/ }),

/***/ 4823:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var d              = __nccwpck_require__(4571)
  , validateSymbol = __nccwpck_require__(9371);

var registry = Object.create(null);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (registry[key]) return registry[key];
			return (registry[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (symbol) {
			var key;
			validateSymbol(symbol);
			for (key in registry) {
				if (registry[key] === symbol) return key;
			}
			return undefined;
		})
	});
};


/***/ }),

/***/ 4347:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d                    = __nccwpck_require__(4571)
  , validateSymbol       = __nccwpck_require__(9371)
  , NativeSymbol         = (__nccwpck_require__(3407).Symbol)
  , generateName         = __nccwpck_require__(7467)
  , setupStandardSymbols = __nccwpck_require__(2605)
  , setupSymbolRegistry  = __nccwpck_require__(4823);

var create = Object.create
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty;

var SymbolPolyfill, HiddenSymbol, isNativeSafe;

if (typeof NativeSymbol === "function") {
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
} else {
	NativeSymbol = null;
}

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};

setupStandardSymbols(SymbolPolyfill);
setupSymbolRegistry(SymbolPolyfill);

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d("", function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(
	SymbolPolyfill.prototype,
	SymbolPolyfill.toPrimitive,
	d("", function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === "symbol") return symbol;
		return symbol.toString();
	})
);
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
);

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
);


/***/ }),

/***/ 9371:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isSymbol = __nccwpck_require__(3880);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),

/***/ 2644:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { dirname, resolve } = __nccwpck_require__(1017);
const { readdirSync, statSync } = __nccwpck_require__(7147);

module.exports = function (start, callback) {
	let dir = resolve('.', start);
	let tmp, stats = statSync(dir);

	if (!stats.isDirectory()) {
		dir = dirname(dir);
	}

	while (true) {
		tmp = callback(dir, readdirSync(dir));
		if (tmp) return resolve(dir, tmp);
		dir = dirname(tmp = dir);
		if (tmp === dir) break;
	}
}


/***/ }),

/***/ 3647:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


var d        = __nccwpck_require__(4571)
  , callable = __nccwpck_require__(6097)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 4053:
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ is resolved with global context, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ 3407:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(3831)() ? globalThis : __nccwpck_require__(4053);


/***/ }),

/***/ 3831:
/***/ ((module) => {

"use strict";


module.exports = function () {
	if (typeof globalThis !== "object") return false;
	if (!globalThis) return false;
	return globalThis.Array === Array;
};


/***/ }),

/***/ 9468:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z4 = unixify;
__webpack_unused_export__ = correctPath;
var isWin = process.platform === 'win32';

function removeTrailingSeparator(str) {
  var i = str.length - 1;

  if (i < 2) {
    return str;
  }

  while (isSeparator(str, i)) {
    i--;
  }

  return str.substr(0, i + 1);
}

function isSeparator(str, i) {
  var _char = str[i];
  return i > 0 && (_char === '/' || isWin && _char === '\\');
}

function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  str = str.replace(/[\\\/]+/g, '/');

  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }

  return str;
}

function unixify(filepath) {
  var stripTrailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isWin) {
    filepath = normalizePath(filepath, stripTrailing);
    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, '');
  }

  return filepath;
}

function correctPath(filepath) {
  return unixify(filepath.replace(/^\\\\\?\\.:\\/, '\\'));
}

/***/ }),

/***/ 107:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fsAsyncMethods = exports.fsSyncMethods = exports.fsProps = void 0;
var fsProps = ['constants', 'F_OK', 'R_OK', 'W_OK', 'X_OK', 'Stats'];
exports.fsProps = fsProps;
var fsSyncMethods = ['renameSync', 'ftruncateSync', 'truncateSync', 'chownSync', 'fchownSync', 'lchownSync', 'chmodSync', 'fchmodSync', 'lchmodSync', 'statSync', 'lstatSync', 'fstatSync', 'linkSync', 'symlinkSync', 'readlinkSync', 'realpathSync', 'unlinkSync', 'rmdirSync', 'mkdirSync', 'mkdirpSync', 'readdirSync', 'closeSync', 'openSync', 'utimesSync', 'futimesSync', 'fsyncSync', 'writeSync', 'readSync', 'readFileSync', 'writeFileSync', 'appendFileSync', 'existsSync', 'accessSync', 'fdatasyncSync', 'mkdtempSync', 'copyFileSync', 'createReadStream', 'createWriteStream'];
exports.fsSyncMethods = fsSyncMethods;
var fsAsyncMethods = ['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown', 'chmod', 'fchmod', 'lchmod', 'stat', 'lstat', 'fstat', 'link', 'symlink', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'mkdirp', 'readdir', 'close', 'open', 'utimes', 'futimes', 'fsync', 'write', 'read', 'readFile', 'writeFile', 'appendFile', 'exists', 'access', 'fdatasync', 'mkdtemp', 'copyFile', 'watchFile', 'unwatchFile', 'watch'];
exports.fsAsyncMethods = fsAsyncMethods;

/***/ }),

/***/ 6863:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __nccwpck_require__(7147)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __nccwpck_require__(1734)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),

/***/ 1734:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __nccwpck_require__(1017);
var isWindows = process.platform === 'win32';
var fs = __nccwpck_require__(7147);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),

/***/ 351:
/***/ ((module) => {

"use strict";

// Call this function in a another function to find out the file from
// which that function was called from. (Inspects the v8 stack trace)
//
// Inspired by http://stackoverflow.com/questions/13227489
module.exports = function getCallerFile(position) {
    if (position === void 0) { position = 2; }
    if (position >= Error.stackTraceLimit) {
        throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
    }
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;
    if (stack !== null && typeof stack === 'object') {
        // stack[0] holds this file
        // stack[1] holds where this function was called
        // stack[2] holds the file we're interested in
        return stack[position] ? stack[position].getFileName() : undefined;
    }
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7625:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var fs = __nccwpck_require__(7147)
var path = __nccwpck_require__(1017)
var minimatch = __nccwpck_require__(6453)
var isAbsolute = (__nccwpck_require__(1017).isAbsolute)
var Minimatch = minimatch.Minimatch

function alphasort (a, b) {
  return a.localeCompare(b, 'en')
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute
  self.fs = options.fs || fs

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = path.resolve(cwd)
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  self.nomount = !!options.nomount

  if (process.platform === "win32") {
    self.root = self.root.replace(/\\/g, "/")
    self.cwd = self.cwd.replace(/\\/g, "/")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  }

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true
  // always treat \ in patterns as escapes, not path separators
  options.allowWindowsEscape = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),

/***/ 1957:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var rp = __nccwpck_require__(6863)
var minimatch = __nccwpck_require__(6453)
var Minimatch = minimatch.Minimatch
var inherits = __nccwpck_require__(4124)
var EE = (__nccwpck_require__(2361).EventEmitter)
var path = __nccwpck_require__(1017)
var assert = __nccwpck_require__(9491)
var isAbsolute = (__nccwpck_require__(1017).isAbsolute)
var globSync = __nccwpck_require__(9010)
var common = __nccwpck_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __nccwpck_require__(2492)
var util = __nccwpck_require__(3837)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __nccwpck_require__(1223)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) ||
      isAbsolute(pattern.map(function (p) {
        return typeof p === 'string' ? p : '[*]'
      }).join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    self.fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  self.fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    self.fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return self.fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),

/***/ 1046:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var balanced = __nccwpck_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m) return [str];

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  if (/\$$/.test(m.pre)) {    
    for (var k = 0; k < post.length; k++) {
      var expansion = pre+ '{' + m.body + '}' + post[k];
      expansions.push(expansion);
    }
  } else {
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }

    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.
    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length)
      var incr = n.length == 3
        ? Math.abs(numeric(n[2]))
        : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);

      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\')
            c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0)
                c = '-' + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];

      for (var j = 0; j < n.length; j++) {
        N.push.apply(N, expand(n[j], false));
      }
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
  }

  return expansions;
}



/***/ }),

/***/ 3438:
/***/ ((module) => {

const isWindows = typeof process === 'object' &&
  process &&
  process.platform === 'win32'
module.exports = isWindows ? { sep: '\\' } : { sep: '/' }


/***/ }),

/***/ 6453:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const minimatch = module.exports = (p, pattern, options = {}) => {
  assertValidPattern(pattern)

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  return new Minimatch(pattern, options).match(p)
}

module.exports = minimatch

const path = __nccwpck_require__(3438)
minimatch.sep = path.sep

const GLOBSTAR = Symbol('globstar **')
minimatch.GLOBSTAR = GLOBSTAR
const expand = __nccwpck_require__(1046)

const plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = '[^/]'

// * => any number of characters
const star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// "abc" -> { a:true, b:true, c:true }
const charSet = s => s.split('').reduce((set, c) => {
  set[c] = true
  return set
}, {})

// characters that need to be escaped in RegExp.
const reSpecials = charSet('().*{}+?[]^$\\!')

// characters that indicate we have to add the pattern start
const addPatternStartSet = charSet('[.(')

// normalizes slashes.
const slashSplit = /\/+/

minimatch.filter = (pattern, options = {}) =>
  (p, i, list) => minimatch(p, pattern, options)

const ext = (a, b = {}) => {
  const t = {}
  Object.keys(a).forEach(k => t[k] = a[k])
  Object.keys(b).forEach(k => t[k] = b[k])
  return t
}

minimatch.defaults = def => {
  if (!def || typeof def !== 'object' || !Object.keys(def).length) {
    return minimatch
  }

  const orig = minimatch

  const m = (p, pattern, options) => orig(p, pattern, ext(def, options))
  m.Minimatch = class Minimatch extends orig.Minimatch {
    constructor (pattern, options) {
      super(pattern, ext(def, options))
    }
  }
  m.Minimatch.defaults = options => orig.defaults(ext(def, options)).Minimatch
  m.filter = (pattern, options) => orig.filter(pattern, ext(def, options))
  m.defaults = options => orig.defaults(ext(def, options))
  m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options))
  m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options))
  m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options))

  return m
}





// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options)

const braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern)

  // Thanks to Yeting Li <https://github.com/yetingli> for
  // improving this regexp to avoid a ReDOS vulnerability.
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

const MAX_PATTERN_LENGTH = 1024 * 64
const assertValidPattern = pattern => {
  if (typeof pattern !== 'string') {
    throw new TypeError('invalid pattern')
  }

  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError('pattern is too long')
  }
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const SUBPARSE = Symbol('subparse')

minimatch.makeRe = (pattern, options) =>
  new Minimatch(pattern, options || {}).makeRe()

minimatch.match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options)
  list = list.filter(f => mm.match(f))
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

// replace stuff like \* with *
const globUnescape = s => s.replace(/\\(.)/g, '$1')
const regExpEscape = s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

class Minimatch {
  constructor (pattern, options) {
    assertValidPattern(pattern)

    if (!options) options = {}

    this.options = options
    this.set = []
    this.pattern = pattern
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape ||
      options.allowWindowsEscape === false
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, '/')
    }
    this.regexp = null
    this.negate = false
    this.comment = false
    this.empty = false
    this.partial = !!options.partial

    // make the set of regexps etc.
    this.make()
  }

  debug () {}

  make () {
    const pattern = this.pattern
    const options = this.options

    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true
      return
    }
    if (!pattern) {
      this.empty = true
      return
    }

    // step 1: figure out negation, etc.
    this.parseNegate()

    // step 2: expand braces
    let set = this.globSet = this.braceExpand()

    if (options.debug) this.debug = (...args) => console.error(...args)

    this.debug(this.pattern, set)

    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(s => s.split(slashSplit))

    this.debug(this.pattern, set)

    // glob --> regexps
    set = set.map((s, si, set) => s.map(this.parse, this))

    this.debug(this.pattern, set)

    // filter out everything that didn't compile properly.
    set = set.filter(s => s.indexOf(false) === -1)

    this.debug(this.pattern, set)

    this.set = set
  }

  parseNegate () {
    if (this.options.nonegate) return

    const pattern = this.pattern
    let negate = false
    let negateOffset = 0

    for (let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++) {
      negate = !negate
      negateOffset++
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset)
    this.negate = negate
  }

  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne (file, pattern, partial) {
    var options = this.options

    this.debug('matchOne',
      { 'this': this, file: file, pattern: pattern })

    this.debug('matchOne', file.length, pattern.length)

    for (var fi = 0,
        pi = 0,
        fl = file.length,
        pl = pattern.length
        ; (fi < fl) && (pi < pl)
        ; fi++, pi++) {
      this.debug('matchOne loop')
      var p = pattern[pi]
      var f = file[fi]

      this.debug(pattern, p, f)

      // should be impossible.
      // some invalid regexp stuff in the set.
      /* istanbul ignore if */
      if (p === false) return false

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f])

        // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit
        var fr = fi
        var pr = pi + 1
        if (pr === pl) {
          this.debug('** at the end')
          // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.
          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' ||
              (!options.dot && file[fi].charAt(0) === '.')) return false
          }
          return true
        }

        // ok, let's see if we can swallow whatever we can.
        while (fr < fl) {
          var swallowee = file[fr]

          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

          // XXX remove this slice.  Just pass the start index.
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee)
            // found a match.
            return true
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (swallowee === '.' || swallowee === '..' ||
              (!options.dot && swallowee.charAt(0) === '.')) {
              this.debug('dot detected!', file, fr, pattern, pr)
              break
            }

            // ** swallows a segment, and continue.
            this.debug('globstar swallow a segment, and continue')
            fr++
          }
        }

        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        /* istanbul ignore if */
        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
          if (fr === fl) return true
        }
        return false
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit
      if (typeof p === 'string') {
        hit = f === p
        this.debug('string match', p, f, hit)
      } else {
        hit = f.match(p)
        this.debug('pattern match', p, f, hit)
      }

      if (!hit) return false
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial
    } else /* istanbul ignore else */ if (pi === pl) {
      // ran out of pattern, still have file left.
      // this is only acceptable if we're on the very last
      // empty segment of a file with a trailing slash.
      // a/* should match a/b/
      return (fi === fl - 1) && (file[fi] === '')
    }

    // should be unreachable.
    /* istanbul ignore next */
    throw new Error('wtf?')
  }

  braceExpand () {
    return braceExpand(this.pattern, this.options)
  }

  parse (pattern, isSub) {
    assertValidPattern(pattern)

    const options = this.options

    // shortcuts
    if (pattern === '**') {
      if (!options.noglobstar)
        return GLOBSTAR
      else
        pattern = '*'
    }
    if (pattern === '') return ''

    let re = ''
    let hasMagic = !!options.nocase
    let escaping = false
    // ? => one single character
    const patternListStack = []
    const negativeLists = []
    let stateChar
    let inClass = false
    let reClassStart = -1
    let classStart = -1
    let cs
    let pl
    let sp
    // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.
    const patternStart = pattern.charAt(0) === '.' ? '' // anything
    // not (start or / followed by . or .. followed by / or end)
    : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
    : '(?!\\.)'

    const clearStateChar = () => {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star
            hasMagic = true
          break
          case '?':
            re += qmark
            hasMagic = true
          break
          default:
            re += '\\' + stateChar
          break
        }
        this.debug('clearStateChar %j %j', stateChar, re)
        stateChar = false
      }
    }

    for (let i = 0, c; (i < pattern.length) && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c)

      // skip over any that are escaped.
      if (escaping) {
        /* istanbul ignore next - completely not allowed, even escaped. */
        if (c === '/') {
          return false
        }

        if (reSpecials[c]) {
          re += '\\'
        }
        re += c
        escaping = false
        continue
      }

      switch (c) {
        /* istanbul ignore next */
        case '/': {
          // Should already be path-split by now.
          return false
        }

        case '\\':
          clearStateChar()
          escaping = true
        continue

        // the various stateChar values
        // for the "extglob" stuff.
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

          // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp
          if (inClass) {
            this.debug('  in class')
            if (c === '!' && i === classStart + 1) c = '^'
            re += c
            continue
          }

          // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.
          this.debug('call clearStateChar %j', stateChar)
          clearStateChar()
          stateChar = c
          // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.
          if (options.noext) clearStateChar()
        continue

        case '(':
          if (inClass) {
            re += '('
            continue
          }

          if (!stateChar) {
            re += '\\('
            continue
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          })
          // negation is (?:(?!js)[^/]*)
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
          this.debug('plType %j %j', stateChar, re)
          stateChar = false
        continue

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)'
            continue
          }

          clearStateChar()
          hasMagic = true
          pl = patternListStack.pop()
          // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>
          re += pl.close
          if (pl.type === '!') {
            negativeLists.push(pl)
          }
          pl.reEnd = re.length
        continue

        case '|':
          if (inClass || !patternListStack.length) {
            re += '\\|'
            continue
          }

          clearStateChar()
          re += '|'
        continue

        // these are mostly the same in regexp and glob
        case '[':
          // swallow any state-tracking char before the [
          clearStateChar()

          if (inClass) {
            re += '\\' + c
            continue
          }

          inClass = true
          classStart = i
          reClassStart = re.length
          re += c
        continue

        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c
            continue
          }

          // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }

          // finish up the class.
          hasMagic = true
          inClass = false
          re += c
        continue

        default:
          // swallow any state char that wasn't consumed
          clearStateChar()

          if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\'
          }

          re += c
          break

      } // switch
    } // for

    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1)
      sp = this.parse(cs, SUBPARSE)
      re = re.substr(0, reClassStart) + '\\[' + sp[0]
      hasMagic = hasMagic || sp[1]
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      let tail
      tail = re.slice(pl.reStart + pl.open.length)
      this.debug('setting tail', re, pl)
      // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
        /* istanbul ignore else - should already be done */
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\'
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + '|'
      })

      this.debug('tail=%j\n   %s', tail, tail, pl, re)
      const t = pl.type === '*' ? star
        : pl.type === '?' ? qmark
        : '\\' + pl.type

      hasMagic = true
      re = re.slice(0, pl.reStart) + t + '\\(' + tail
    }

    // handle trailing things that only matter at the very end.
    clearStateChar()
    if (escaping) {
      // trailing \\
      re += '\\\\'
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    const addPatternStart = addPatternStartSet[re.charAt(0)]

    // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.
    for (let n = negativeLists.length - 1; n > -1; n--) {
      const nl = negativeLists[n]

      const nlBefore = re.slice(0, nl.reStart)
      const nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
      let nlAfter = re.slice(nl.reEnd)
      const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter

      // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.
      const openParensBefore = nlBefore.split('(').length - 1
      let cleanAfter = nlAfter
      for (let i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
      }
      nlAfter = cleanAfter

      const dollar = nlAfter === '' && isSub !== SUBPARSE ? '$' : ''
      re = nlBefore + nlFirst + nlAfter + dollar + nlLast
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re
    }

    if (addPatternStart) {
      re = patternStart + re
    }

    // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [re, hasMagic]
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern)
    }

    const flags = options.nocase ? 'i' : ''
    try {
      return Object.assign(new RegExp('^' + re + '$', flags), {
        _glob: pattern,
        _src: re,
      })
    } catch (er) /* istanbul ignore next - should be impossible */ {
      // If it was an invalid regular expression, then it can't match
      // anything.  This trick looks for a character after the end of
      // the string, which is of course impossible, except in multi-line
      // mode, but it's not a /m regex.
      return new RegExp('$.')
    }
  }

  makeRe () {
    if (this.regexp || this.regexp === false) return this.regexp

    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    const set = this.set

    if (!set.length) {
      this.regexp = false
      return this.regexp
    }
    const options = this.options

    const twoStar = options.noglobstar ? star
      : options.dot ? twoStarDot
      : twoStarNoDot
    const flags = options.nocase ? 'i' : ''

    // coalesce globstars and regexpify non-globstar patterns
    // if it's the only item, then we just do one twoStar
    // if it's the first, and there are more, prepend (\/|twoStar\/)? to next
    // if it's the last, append (\/twoStar|) to previous
    // if it's in the middle, append (\/|\/twoStar\/) to previous
    // then filter out GLOBSTAR symbols
    let re = set.map(pattern => {
      pattern = pattern.map(p =>
        typeof p === 'string' ? regExpEscape(p)
        : p === GLOBSTAR ? GLOBSTAR
        : p._src
      ).reduce((set, p) => {
        if (!(set[set.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
          set.push(p)
        }
        return set
      }, [])
      pattern.forEach((p, i) => {
        if (p !== GLOBSTAR || pattern[i-1] === GLOBSTAR) {
          return
        }
        if (i === 0) {
          if (pattern.length > 1) {
            pattern[i+1] = '(?:\\\/|' + twoStar + '\\\/)?' + pattern[i+1]
          } else {
            pattern[i] = twoStar
          }
        } else if (i === pattern.length - 1) {
          pattern[i-1] += '(?:\\\/|' + twoStar + ')?'
        } else {
          pattern[i-1] += '(?:\\\/|\\\/' + twoStar + '\\\/)' + pattern[i+1]
          pattern[i+1] = GLOBSTAR
        }
      })
      return pattern.filter(p => p !== GLOBSTAR).join('/')
    }).join('|')

    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = '^(?:' + re + ')$'

    // can match anything, as long as it's not this.
    if (this.negate) re = '^(?!' + re + ').*$'

    try {
      this.regexp = new RegExp(re, flags)
    } catch (ex) /* istanbul ignore next - should be impossible */ {
      this.regexp = false
    }
    return this.regexp
  }

  match (f, partial = this.partial) {
    this.debug('match', f, this.pattern)
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false
    if (this.empty) return f === ''

    if (f === '/' && partial) return true

    const options = this.options

    // windows: need to use /, not \
    if (path.sep !== '/') {
      f = f.split(path.sep).join('/')
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit)
    this.debug(this.pattern, 'split', f)

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    const set = this.set
    this.debug(this.pattern, 'set', set)

    // Find the basename of the path by looking for the last non-empty segment
    let filename
    for (let i = f.length - 1; i >= 0; i--) {
      filename = f[i]
      if (filename) break
    }

    for (let i = 0; i < set.length; i++) {
      const pattern = set[i]
      let file = f
      if (options.matchBase && pattern.length === 1) {
        file = [filename]
      }
      const hit = this.matchOne(file, pattern, partial)
      if (hit) {
        if (options.flipNegate) return true
        return !this.negate
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false
    return this.negate
  }

  static defaults (def) {
    return minimatch.defaults(def).Minimatch
  }
}

minimatch.Minimatch = Minimatch


/***/ }),

/***/ 9010:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = globSync
globSync.GlobSync = GlobSync

var rp = __nccwpck_require__(6863)
var minimatch = __nccwpck_require__(6453)
var Minimatch = minimatch.Minimatch
var Glob = (__nccwpck_require__(1957).Glob)
var util = __nccwpck_require__(3837)
var path = __nccwpck_require__(1017)
var assert = __nccwpck_require__(9491)
var isAbsolute = (__nccwpck_require__(1017).isAbsolute)
var common = __nccwpck_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert.ok(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert.ok(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) ||
      isAbsolute(pattern.map(function (p) {
        return typeof p === 'string' ? p : '[*]'
      }).join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = this.fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, this.fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = this.fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = this.fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),

/***/ 6106:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(5177);


/***/ }),

/***/ 5177:
/***/ (function(module) {

// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else if (true) {
      return module.exports = factory();
    } else {}
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),

/***/ 2492:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
var reqs = Object.create(null)
var once = __nccwpck_require__(1223)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),

/***/ 4124:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

try {
  var util = __nccwpck_require__(3837);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __nccwpck_require__(8544);
}


/***/ }),

/***/ 8544:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 4882:
/***/ ((module) => {

"use strict";
/* eslint-disable yoda */


const isFullwidthCodePoint = codePoint => {
	if (Number.isNaN(codePoint)) {
		return false;
	}

	// Code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (
		codePoint >= 0x1100 && (
			codePoint <= 0x115F || // Hangul Jamo
			codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
			codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
			// CJK Radicals Supplement .. Enclosed CJK Letters and Months
			(0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
			// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
			(0x3250 <= codePoint && codePoint <= 0x4DBF) ||
			// CJK Unified Ideographs .. Yi Radicals
			(0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
			// Hangul Jamo Extended-A
			(0xA960 <= codePoint && codePoint <= 0xA97C) ||
			// Hangul Syllables
			(0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
			// CJK Compatibility Ideographs
			(0xF900 <= codePoint && codePoint <= 0xFAFF) ||
			// Vertical Forms
			(0xFE10 <= codePoint && codePoint <= 0xFE19) ||
			// CJK Compatibility Forms .. Small Form Variants
			(0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
			// Halfwidth and Fullwidth Forms
			(0xFF01 <= codePoint && codePoint <= 0xFF60) ||
			(0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
			// Kana Supplement
			(0x1B000 <= codePoint && codePoint <= 0x1B001) ||
			// Enclosed Ideographic Supplement
			(0x1F200 <= codePoint && codePoint <= 0x1F251) ||
			// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
			(0x20000 <= codePoint && codePoint <= 0x3FFFD)
		)
	) {
		return true;
	}

	return false;
};

module.exports = isFullwidthCodePoint;
module.exports["default"] = isFullwidthCodePoint;


/***/ }),

/***/ 8794:
/***/ ((module) => {

module.exports = isPromise;
module.exports["default"] = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ }),

/***/ 8329:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const color = __nccwpck_require__(1047)

const { extendedTypeOf } = __nccwpck_require__(2356)

const Theme = {
  ' ' (s) { return s },
  '+': color.green,
  '-': color.red
}

const subcolorizeToCallback = function (options, key, diff, output, color, indent) {
  let subvalue
  const prefix = key ? `${key}: ` : ''
  const subindent = indent + '  '

  const outputElisions = (n) => {
    let maxElisions = options.maxElisions === undefined ? Infinity : options.maxElisions
    if (n < maxElisions) {
      for (let i = 0; i < n; i++) {
        output(' ', subindent + '...')
      }
    } else {
      output(' ', subindent + `... (${n} entries)`)
    }
  }

  switch (extendedTypeOf(diff)) {
    case 'object':
      if (('__old' in diff) && ('__new' in diff) && (Object.keys(diff).length === 2)) {
        subcolorizeToCallback(options, key, diff.__old, output, '-', indent)
        return subcolorizeToCallback(options, key, diff.__new, output, '+', indent)
      } else {
        output(color, `${indent}${prefix}{`)
        for (const subkey of Object.keys(diff)) {
          let m
          subvalue = diff[subkey]
          if ((m = subkey.match(/^(.*)__deleted$/))) {
            subcolorizeToCallback(options, m[1], subvalue, output, '-', subindent)
          } else if ((m = subkey.match(/^(.*)__added$/))) {
            subcolorizeToCallback(options, m[1], subvalue, output, '+', subindent)
          } else {
            subcolorizeToCallback(options, subkey, subvalue, output, color, subindent)
          }
        }
        return output(color, `${indent}}`)
      }

    case 'array': {
      output(color, `${indent}${prefix}[`)

      let looksLikeDiff = true
      for (const item of diff) {
        if ((extendedTypeOf(item) !== 'array') || !((item.length === 2) || ((item.length === 1) && (item[0] === ' '))) || !(typeof (item[0]) === 'string') || (item[0].length !== 1) || !([' ', '-', '+', '~'].includes(item[0]))) {
          looksLikeDiff = false
        }
      }

      if (looksLikeDiff) {
        let op
        let elisionCount = 0
        for ([op, subvalue] of diff) {
          if (op === ' ' && subvalue == null) {
            elisionCount++
          } else {
            if (elisionCount > 0) {
              outputElisions(elisionCount)
            }
            elisionCount = 0

            if (![' ', '~', '+', '-'].includes(op)) {
              throw new Error(`Unexpected op '${op}' in ${JSON.stringify(diff, null, 2)}`)
            }
            if (op === '~') { op = ' ' }
            subcolorizeToCallback(options, '', subvalue, output, op, subindent)
          }
        }
        if (elisionCount > 0) {
          outputElisions(elisionCount)
        }
      } else {
        for (subvalue of diff) {
          subcolorizeToCallback(options, '', subvalue, output, color, subindent)
        }
      }

      return output(color, `${indent}]`)
    }

    default:
      if (diff === 0 || diff === null || diff === false || diff === '' || diff) {
        return output(color, indent + prefix + JSON.stringify(diff))
      }
  }
}

const colorizeToCallback = (diff, options, output) =>
  subcolorizeToCallback(options, '', diff, output, ' ', '')

const colorizeToArray = function (diff, options = {}) {
  const output = []
  colorizeToCallback(diff, options, (color, line) => output.push(`${color}${line}`))
  return output
}

const colorize = function (diff, options = {}) {
  const output = []
  colorizeToCallback(diff, options, function (color, line) {
    if (options.color != null ? options.color : true) {
      return output.push(((options.theme != null ? options.theme[color] : undefined) != null ? (options.theme != null ? options.theme[color] : undefined) : Theme[color])(`${color}${line}`) + '\n')
    } else {
      return output.push(`${color}${line}\n`)
    }
  })
  return output.join('')
}

module.exports = { colorize, colorizeToArray, colorizeToCallback }


/***/ }),

/***/ 9031:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { SequenceMatcher } = __nccwpck_require__(4087)
const { extendedTypeOf, roundObj } = __nccwpck_require__(2356)
const { colorize } = __nccwpck_require__(8329)

class JsonDiff {
  constructor (options) {
    options.outputKeys = options.outputKeys || []
    this.options = options
  }

  isScalar (obj) {
    return typeof obj !== 'object' || obj === null
  }

  objectDiff (obj1, obj2) {
    let result = {}
    let score = 0
    let equal = true

    for (const [key, value] of Object.entries(obj1)) {
      if (! this.options.outputNewOnly) {
        let postfix = "__deleted"

        if (!(key in obj2)) {
          result[`${key}${postfix}`] = value
          score -= 30
          equal = false
        }
      }
    }

    for (const [key, value] of Object.entries(obj2)) {
      let postfix = ! this.options.outputNewOnly ? "__added" : ""

      if (!(key in obj1)) {
        result[`${key}${postfix}`] = value
        score -= 30
        equal = false
      }
    }

    for (const [key, value1] of Object.entries(obj1)) {
      if (key in obj2) {
        score += 20
        const value2 = obj2[key]
        const change = this.diff(value1, value2)
        if (!change.equal) {
          result[key] = change.result
          equal = false
        } else if (this.options.full || this.options.outputKeys.includes(key)) {
          result[key] = value1
        }
        // console.log(`key ${key} change.score=${change.score} ${change.result}`)
        score += Math.min(20, Math.max(-10, change.score / 5)) // BATMAN!
      }
    }

    if (equal) {
      score = 100 * Math.max(Object.keys(obj1).length, 0.5)
      if (!this.options.full) {
        result = undefined
      }
    } else {
      score = Math.max(0, score)
    }

    // console.log(`objectDiff(${JSON.stringify(obj1, null, 2)} <=> ${JSON.stringify(obj2, null, 2)}) == ${JSON.stringify({score, result, equal})}`)
    return { score, result, equal }
  }

  findMatchingObject (item, index, fuzzyOriginals) {
    // console.log("findMatchingObject: " + JSON.stringify({item, fuzzyOriginals}, null, 2))
    let bestMatch = null

    for (const [key, { item: candidate, index: matchIndex }] of Object.entries(fuzzyOriginals)) {
      if (key !== '__next') {
        const indexDistance = Math.abs(matchIndex - index)
        if (extendedTypeOf(item) === extendedTypeOf(candidate)) {
          const { score } = this.diff(item, candidate)
          if (
            !bestMatch ||
            score > bestMatch.score ||
            (score === bestMatch.score &&
              indexDistance < bestMatch.indexDistance)
          ) {
            bestMatch = { score, key, indexDistance }
          }
        }
      }
    }

    // console.log"findMatchingObject result = " + JSON.stringify(bestMatch, null, 2)
    return bestMatch
  }

  scalarize (array, originals, fuzzyOriginals) {
    const fuzzyMatches = []
    if (fuzzyOriginals) {
      // Find best fuzzy match for each object in the array
      const keyScores = {}
      for (let index = 0; index < array.length; index++) {
        const item = array[index]
        if (this.isScalar(item)) {
          continue
        }
        const bestMatch = this.findMatchingObject(item, index, fuzzyOriginals)
        if (bestMatch && (!keyScores[bestMatch.key] || bestMatch.score > keyScores[bestMatch.key].score)) {
          keyScores[bestMatch.key] = { score: bestMatch.score, index }
        }
      }
      for (const [key, match] of Object.entries(keyScores)) {
        fuzzyMatches[match.index] = key
      }
    }

    const result = []
    for (let index = 0; index < array.length; index++) {
      const item = array[index]
      if (this.isScalar(item)) {
        result.push(item)
      } else {
        const key = fuzzyMatches[index] || '__$!SCALAR' + originals.__next++
        originals[key] = { item, index }
        result.push(key)
      }
    }
    return result
  }

  isScalarized (item, originals) {
    return typeof item === 'string' && item in originals
  }

  descalarize (item, originals) {
    if (this.isScalarized(item, originals)) {
      return originals[item].item
    } else {
      return item
    }
  }

  arrayDiff (obj1, obj2) {
    const originals1 = { __next: 1 }
    const seq1 = this.scalarize(obj1, originals1)
    const originals2 = { __next: originals1.__next }
    const seq2 = this.scalarize(obj2, originals2, originals1)

    if (this.options.sort) {
      seq1.sort()
      seq2.sort()
    }
    const opcodes = new SequenceMatcher(null, seq1, seq2).getOpcodes()

    // console.log(`arrayDiff:\nobj1 = ${JSON.stringify(obj1, null, 2)}\nobj2 = ${JSON.stringify(obj2, null, 2)}\nseq1 = ${JSON.stringify(seq1, null, 2)}\nseq2 = ${JSON.stringify(seq2, null, 2)}\nopcodes = ${JSON.stringify(opcodes, null, 2)}`)

    let result = []
    let score = 0
    let equal = true

    for (const [op, i1, i2, j1, j2] of opcodes) {
      let i, j
      let asc, end
      let asc1, end1
      let asc2, end2
      if (!(op === 'equal' || (this.options.keysOnly && op === 'replace'))) {
        equal = false
      }

      switch (op) {
        case 'equal':
          for (
            i = i1, end = i2, asc = i1 <= end;
            asc ? i < end : i > end;
            asc ? i++ : i--
          ) {
            const item = seq1[i]
            if (this.isScalarized(item, originals1)) {
              if (!this.isScalarized(item, originals2)) {
                throw new Error(
                  `internal bug: isScalarized(item, originals1) != isScalarized(item, originals2) for item ${JSON.stringify(
                    item
                  )}`
                )
              }
              const item1 = this.descalarize(item, originals1)
              const item2 = this.descalarize(item, originals2)
              const change = this.diff(item1, item2)
              if (!change.equal) {
                result.push(['~', change.result])
                equal = false
              } else {
                if (this.options.full || this.options.keepUnchangedValues) {
                  result.push([' ', item1])
                } else {
                  result.push([' '])
                }
              }
            } else {
              if (this.options.full || this.options.keepUnchangedValues) {
                result.push([' ', item])
              } else {
                result.push([' '])
              }
            }
            score += 10
          }
          break
        case 'delete':
          for (
            i = i1, end1 = i2, asc1 = i1 <= end1;
            asc1 ? i < end1 : i > end1;
            asc1 ? i++ : i--
          ) {
            result.push(['-', this.descalarize(seq1[i], originals1)])
            score -= 5
          }
          break
        case 'insert':
          for (
            j = j1, end2 = j2, asc2 = j1 <= end2;
            asc2 ? j < end2 : j > end2;
            asc2 ? j++ : j--
          ) {
            result.push(['+', this.descalarize(seq2[j], originals2)])
            score -= 5
          }
          break
        case 'replace':
          if (!this.options.keysOnly) {
            let asc3, end3
            let asc4, end4
            for (
              i = i1, end3 = i2, asc3 = i1 <= end3;
              asc3 ? i < end3 : i > end3;
              asc3 ? i++ : i--
            ) {
              result.push(['-', this.descalarize(seq1[i], originals1)])
              score -= 5
            }
            for (
              j = j1, end4 = j2, asc4 = j1 <= end4;
              asc4 ? j < end4 : j > end4;
              asc4 ? j++ : j--
            ) {
              result.push(['+', this.descalarize(seq2[j], originals2)])
              score -= 5
            }
          } else {
            let asc5, end5
            for (
              i = i1, end5 = i2, asc5 = i1 <= end5;
              asc5 ? i < end5 : i > end5;
              asc5 ? i++ : i--
            ) {
              const change = this.diff(
                this.descalarize(seq1[i], originals1),
                this.descalarize(seq2[i - i1 + j1], originals2)
              )
              if (!change.equal) {
                result.push(['~', change.result])
                equal = false
              } else {
                result.push([' '])
              }
            }
          }
          break
      }
    }

    if (equal || opcodes.length === 0) {
      if (!this.options.full) {
        result = undefined
      } else {
        result = obj1
      }
      score = 100
    } else {
      score = Math.max(0, score)
    }

    return { score, result, equal }
  }

  diff (obj1, obj2) {
    const type1 = extendedTypeOf(obj1)
    const type2 = extendedTypeOf(obj2)

    if (type1 === type2) {
      switch (type1) {
        case 'object':
          return this.objectDiff(obj1, obj2)

        case 'array':
          return this.arrayDiff(obj1, obj2)
      }
    }

    // Compare primitives or complex objects of different types
    let score = 100
    let result = obj1
    let equal
    if (!this.options.keysOnly) {
      equal = obj1 === obj2
      if (!equal) {
        score = 0

        if (this.options.outputNewOnly) {
          result = obj2
        } else {
          result = { __old: obj1, __new: obj2 }
        }
      } else if (!this.options.full) {
        result = undefined
      }
    } else {
      equal = true
      result = undefined
    }

    return { score, result, equal }
  }
}

function diff (obj1, obj2, options = {}) {
  if (options.precision !== undefined) {
    obj1 = roundObj(obj1, options.precision)
    obj2 = roundObj(obj2, options.precision)
  }
  return new JsonDiff(options).diff(obj1, obj2).result
}

function diffString (obj1, obj2, options = {}) {
  return colorize(diff(obj1, obj2, options), options)
}

module.exports = { diff, diffString }


/***/ }),

/***/ 2356:
/***/ ((module) => {

const extendedTypeOf = function (obj) {
  const result = typeof obj
  if (obj == null) {
    return 'null'
  } else if (result === 'object' && obj.constructor === Array) {
    return 'array'
  } else {
    return result
  }
}

const roundObj = function (data, precision) {
  const type = typeof data
  if (type === 'array') {
    return data.map((x) => roundObj(x, precision))
  } else if (type === 'object') {
    for (const key in data) {
      data[key] = roundObj(data[key], precision)
    }
    return data
  } else if (
    type === 'number' &&
    Number.isFinite(data) &&
    !Number.isInteger(data)
  ) {
    return +data.toFixed(precision)
  } else {
    return data
  }
}

module.exports = { extendedTypeOf, roundObj }


/***/ }),

/***/ 9537:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt = __nccwpck_require__(3755)

  , create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (limit) {
	var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
	limit = toPosInt(limit);
	return {
		hit: function (id) {
			var oldIndex = map[id], nuIndex = ++index;
			queue[nuIndex] = id;
			map[id] = nuIndex;
			if (!oldIndex) {
				++size;
				if (size <= limit) return;
				id = queue[base];
				del(id);
				return id;
			}
			delete queue[oldIndex];
			if (base !== oldIndex) return;
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		delete: del = function (id) {
			var oldIndex = map[id];
			if (!oldIndex) return;
			delete queue[oldIndex];
			delete map[id];
			--size;
			if (base !== oldIndex) return;
			if (!size) {
				index = 0;
				base = 1;
				return;
			}
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		clear: function () {
			size = 0;
			base = 1;
			queue = create(null);
			map = create(null);
			index = 0;
		}
	};
};


/***/ }),

/***/ 9851:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dirent = void 0;
var constants_1 = __nccwpck_require__(7071);
var encoding_1 = __nccwpck_require__(5162);
var S_IFMT = constants_1.constants.S_IFMT, S_IFDIR = constants_1.constants.S_IFDIR, S_IFREG = constants_1.constants.S_IFREG, S_IFBLK = constants_1.constants.S_IFBLK, S_IFCHR = constants_1.constants.S_IFCHR, S_IFLNK = constants_1.constants.S_IFLNK, S_IFIFO = constants_1.constants.S_IFIFO, S_IFSOCK = constants_1.constants.S_IFSOCK;
/**
 * A directory entry, like `fs.Dirent`.
 */
var Dirent = /** @class */ (function () {
    function Dirent() {
        this.name = '';
        this.mode = 0;
    }
    Dirent.build = function (link, encoding) {
        var dirent = new Dirent();
        var mode = link.getNode().mode;
        dirent.name = (0, encoding_1.strToEncoding)(link.getName(), encoding);
        dirent.mode = mode;
        return dirent;
    };
    Dirent.prototype._checkModeProperty = function (property) {
        return (this.mode & S_IFMT) === property;
    };
    Dirent.prototype.isDirectory = function () {
        return this._checkModeProperty(S_IFDIR);
    };
    Dirent.prototype.isFile = function () {
        return this._checkModeProperty(S_IFREG);
    };
    Dirent.prototype.isBlockDevice = function () {
        return this._checkModeProperty(S_IFBLK);
    };
    Dirent.prototype.isCharacterDevice = function () {
        return this._checkModeProperty(S_IFCHR);
    };
    Dirent.prototype.isSymbolicLink = function () {
        return this._checkModeProperty(S_IFLNK);
    };
    Dirent.prototype.isFIFO = function () {
        return this._checkModeProperty(S_IFIFO);
    };
    Dirent.prototype.isSocket = function () {
        return this._checkModeProperty(S_IFSOCK);
    };
    return Dirent;
}());
exports.Dirent = Dirent;
exports["default"] = Dirent;


/***/ }),

/***/ 6663:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stats = void 0;
var constants_1 = __nccwpck_require__(7071);
var getBigInt_1 = __nccwpck_require__(7539);
var S_IFMT = constants_1.constants.S_IFMT, S_IFDIR = constants_1.constants.S_IFDIR, S_IFREG = constants_1.constants.S_IFREG, S_IFBLK = constants_1.constants.S_IFBLK, S_IFCHR = constants_1.constants.S_IFCHR, S_IFLNK = constants_1.constants.S_IFLNK, S_IFIFO = constants_1.constants.S_IFIFO, S_IFSOCK = constants_1.constants.S_IFSOCK;
/**
 * Statistics about a file/directory, like `fs.Stats`.
 */
var Stats = /** @class */ (function () {
    function Stats() {
    }
    Stats.build = function (node, bigint) {
        if (bigint === void 0) { bigint = false; }
        var stats = new Stats();
        var uid = node.uid, gid = node.gid, atime = node.atime, mtime = node.mtime, ctime = node.ctime;
        var getStatNumber = !bigint ? function (number) { return number; } : getBigInt_1.default;
        // Copy all values on Stats from Node, so that if Node values
        // change, values on Stats would still be the old ones,
        // just like in Node fs.
        stats.uid = getStatNumber(uid);
        stats.gid = getStatNumber(gid);
        stats.rdev = getStatNumber(0);
        stats.blksize = getStatNumber(4096);
        stats.ino = getStatNumber(node.ino);
        stats.size = getStatNumber(node.getSize());
        stats.blocks = getStatNumber(1);
        stats.atime = atime;
        stats.mtime = mtime;
        stats.ctime = ctime;
        stats.birthtime = ctime;
        stats.atimeMs = getStatNumber(atime.getTime());
        stats.mtimeMs = getStatNumber(mtime.getTime());
        var ctimeMs = getStatNumber(ctime.getTime());
        stats.ctimeMs = ctimeMs;
        stats.birthtimeMs = ctimeMs;
        stats.dev = getStatNumber(0);
        stats.mode = getStatNumber(node.mode);
        stats.nlink = getStatNumber(node.nlink);
        return stats;
    };
    Stats.prototype._checkModeProperty = function (property) {
        return (Number(this.mode) & S_IFMT) === property;
    };
    Stats.prototype.isDirectory = function () {
        return this._checkModeProperty(S_IFDIR);
    };
    Stats.prototype.isFile = function () {
        return this._checkModeProperty(S_IFREG);
    };
    Stats.prototype.isBlockDevice = function () {
        return this._checkModeProperty(S_IFBLK);
    };
    Stats.prototype.isCharacterDevice = function () {
        return this._checkModeProperty(S_IFCHR);
    };
    Stats.prototype.isSymbolicLink = function () {
        return this._checkModeProperty(S_IFLNK);
    };
    Stats.prototype.isFIFO = function () {
        return this._checkModeProperty(S_IFIFO);
    };
    Stats.prototype.isSocket = function () {
        return this._checkModeProperty(S_IFSOCK);
    };
    return Stats;
}());
exports.Stats = Stats;
exports["default"] = Stats;


/***/ }),

/***/ 7071:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.constants = void 0;
exports.constants = {
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 64,
    O_EXCL: 128,
    O_NOCTTY: 256,
    O_TRUNC: 512,
    O_APPEND: 1024,
    O_DIRECTORY: 65536,
    O_NOATIME: 262144,
    O_NOFOLLOW: 131072,
    O_SYNC: 1052672,
    O_DIRECT: 16384,
    O_NONBLOCK: 2048,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    UV_FS_COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_EXCL: 1,
    COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE_FORCE: 4,
};


/***/ }),

/***/ 5162:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strToEncoding = exports.assertEncoding = exports.ENCODING_UTF8 = void 0;
var buffer_1 = __nccwpck_require__(8458);
var errors = __nccwpck_require__(1634);
exports.ENCODING_UTF8 = 'utf8';
function assertEncoding(encoding) {
    if (encoding && !buffer_1.Buffer.isEncoding(encoding))
        throw new errors.TypeError('ERR_INVALID_OPT_VALUE_ENCODING', encoding);
}
exports.assertEncoding = assertEncoding;
function strToEncoding(str, encoding) {
    if (!encoding || encoding === exports.ENCODING_UTF8)
        return str; // UTF-8
    if (encoding === 'buffer')
        return new buffer_1.Buffer(str); // `buffer` encoding
    return new buffer_1.Buffer(str).toString(encoding); // Custom encoding
}
exports.strToEncoding = strToEncoding;


/***/ }),

/***/ 7539:
/***/ ((__unused_webpack_module, exports) => {

if (typeof BigInt === 'function') exports["default"] = BigInt;
else
  exports["default"] = function BigIntNotSupported() {
    throw new Error('BigInt is not supported in this environment.');
  };


/***/ }),

/***/ 5069:
/***/ (function(module, exports, __nccwpck_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fs = exports.createFsFromVolume = exports.vol = exports.Volume = void 0;
var Stats_1 = __nccwpck_require__(6663);
var Dirent_1 = __nccwpck_require__(9851);
var volume_1 = __nccwpck_require__(3383);
var _a = __nccwpck_require__(107), fsSyncMethods = _a.fsSyncMethods, fsAsyncMethods = _a.fsAsyncMethods;
var constants_1 = __nccwpck_require__(7071);
var F_OK = constants_1.constants.F_OK, R_OK = constants_1.constants.R_OK, W_OK = constants_1.constants.W_OK, X_OK = constants_1.constants.X_OK;
exports.Volume = volume_1.Volume;
// Default volume.
exports.vol = new volume_1.Volume();
function createFsFromVolume(vol) {
    var fs = { F_OK: F_OK, R_OK: R_OK, W_OK: W_OK, X_OK: X_OK, constants: constants_1.constants, Stats: Stats_1.default, Dirent: Dirent_1.default };
    // Bind FS methods.
    for (var _i = 0, fsSyncMethods_1 = fsSyncMethods; _i < fsSyncMethods_1.length; _i++) {
        var method = fsSyncMethods_1[_i];
        if (typeof vol[method] === 'function')
            fs[method] = vol[method].bind(vol);
    }
    for (var _a = 0, fsAsyncMethods_1 = fsAsyncMethods; _a < fsAsyncMethods_1.length; _a++) {
        var method = fsAsyncMethods_1[_a];
        if (typeof vol[method] === 'function')
            fs[method] = vol[method].bind(vol);
    }
    fs.StatWatcher = vol.StatWatcher;
    fs.FSWatcher = vol.FSWatcher;
    fs.WriteStream = vol.WriteStream;
    fs.ReadStream = vol.ReadStream;
    fs.promises = vol.promises;
    fs._toUnixTimestamp = volume_1.toUnixTimestamp;
    return fs;
}
exports.createFsFromVolume = createFsFromVolume;
exports.fs = createFsFromVolume(exports.vol);
module.exports = __assign(__assign({}, module.exports), exports.fs);
module.exports.semantic = true;


/***/ }),

/***/ 8458:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferFrom = exports.bufferAllocUnsafe = exports.Buffer = void 0;
var buffer_1 = __nccwpck_require__(4300);
Object.defineProperty(exports, "Buffer", ({ enumerable: true, get: function () { return buffer_1.Buffer; } }));
function bufferV0P12Ponyfill(arg0) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new (buffer_1.Buffer.bind.apply(buffer_1.Buffer, __spreadArray([void 0, arg0], args, false)))();
}
var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
exports.bufferAllocUnsafe = bufferAllocUnsafe;
var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
exports.bufferFrom = bufferFrom;


/***/ }),

/***/ 1634:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.E = exports.AssertionError = exports.message = exports.RangeError = exports.TypeError = exports.Error = void 0;
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);
var kCode = typeof Symbol === 'undefined' ? '_kCode' : Symbol('code');
var messages = {}; // new Map();
function makeNodeError(Base) {
    return /** @class */ (function (_super) {
        __extends(NodeError, _super);
        function NodeError(key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, message(key, args)) || this;
            _this.code = key;
            _this[kCode] = key;
            _this.name = "".concat(_super.prototype.name, " [").concat(_this[kCode], "]");
            return _this;
        }
        return NodeError;
    }(Base));
}
var g = typeof globalThis !== 'undefined' ? globalThis : global;
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(options) {
        var _this = this;
        if (typeof options !== 'object' || options === null) {
            throw new exports.TypeError('ERR_INVALID_ARG_TYPE', 'options', 'object');
        }
        if (options.message) {
            _this = _super.call(this, options.message) || this;
        }
        else {
            _this = _super.call(this, "".concat(util.inspect(options.actual).slice(0, 128), " ") +
                "".concat(options.operator, " ").concat(util.inspect(options.expected).slice(0, 128))) || this;
        }
        _this.generatedMessage = !options.message;
        _this.name = 'AssertionError [ERR_ASSERTION]';
        _this.code = 'ERR_ASSERTION';
        _this.actual = options.actual;
        _this.expected = options.expected;
        _this.operator = options.operator;
        exports.Error.captureStackTrace(_this, options.stackStartFunction);
        return _this;
    }
    return AssertionError;
}(g.Error));
exports.AssertionError = AssertionError;
function message(key, args) {
    assert.strictEqual(typeof key, 'string');
    // const msg = messages.get(key);
    var msg = messages[key];
    assert(msg, "An invalid error message key was used: ".concat(key, "."));
    var fmt;
    if (typeof msg === 'function') {
        fmt = msg;
    }
    else {
        fmt = util.format;
        if (args === undefined || args.length === 0)
            return msg;
        args.unshift(msg);
    }
    return String(fmt.apply(null, args));
}
exports.message = message;
// Utility function for registering the error codes. Only used here. Exported
// *only* to allow for testing.
function E(sym, val) {
    messages[sym] = typeof val === 'function' ? val : String(val);
}
exports.E = E;
exports.Error = makeNodeError(g.Error);
exports.TypeError = makeNodeError(g.TypeError);
exports.RangeError = makeNodeError(g.RangeError);
// To declare an error message, use the E(sym, val) function above. The sym
// must be an upper case string. The val can be either a function or a string.
// The return value of the function must be a string.
// Examples:
// E('EXAMPLE_KEY1', 'This is the error value');
// E('EXAMPLE_KEY2', (a, b) => return `${a} ${b}`);
//
// Once an error code has been assigned, the code itself MUST NOT change and
// any given error code must never be reused to identify a different error.
//
// Any error code added here should also be added to the documentation
//
// Note: Please try to keep these in alphabetical order
E('ERR_ARG_NOT_ITERABLE', '%s must be iterable');
E('ERR_ASSERTION', '%s');
E('ERR_BUFFER_OUT_OF_BOUNDS', bufferOutOfBounds);
E('ERR_CHILD_CLOSED_BEFORE_REPLY', 'Child closed before reply received');
E('ERR_CONSOLE_WRITABLE_STREAM', 'Console expects a writable stream instance for %s');
E('ERR_CPU_USAGE', 'Unable to obtain cpu usage %s');
E('ERR_DNS_SET_SERVERS_FAILED', function (err, servers) { return "c-ares failed to set servers: \"".concat(err, "\" [").concat(servers, "]"); });
E('ERR_FALSY_VALUE_REJECTION', 'Promise was rejected with falsy value');
E('ERR_ENCODING_NOT_SUPPORTED', function (enc) { return "The \"".concat(enc, "\" encoding is not supported"); });
E('ERR_ENCODING_INVALID_ENCODED_DATA', function (enc) { return "The encoded data was not valid for encoding ".concat(enc); });
E('ERR_HTTP_HEADERS_SENT', 'Cannot render headers after they are sent to the client');
E('ERR_HTTP_INVALID_STATUS_CODE', 'Invalid status code: %s');
E('ERR_HTTP_TRAILER_INVALID', 'Trailers are invalid with this transfer encoding');
E('ERR_INDEX_OUT_OF_RANGE', 'Index out of range');
E('ERR_INVALID_ARG_TYPE', invalidArgType);
E('ERR_INVALID_ARRAY_LENGTH', function (name, len, actual) {
    assert.strictEqual(typeof actual, 'number');
    return "The array \"".concat(name, "\" (length ").concat(actual, ") must be of length ").concat(len, ".");
});
E('ERR_INVALID_BUFFER_SIZE', 'Buffer size must be a multiple of %s');
E('ERR_INVALID_CALLBACK', 'Callback must be a function');
E('ERR_INVALID_CHAR', 'Invalid character in %s');
E('ERR_INVALID_CURSOR_POS', 'Cannot set cursor row without setting its column');
E('ERR_INVALID_FD', '"fd" must be a positive integer: %s');
E('ERR_INVALID_FILE_URL_HOST', 'File URL host must be "localhost" or empty on %s');
E('ERR_INVALID_FILE_URL_PATH', 'File URL path %s');
E('ERR_INVALID_HANDLE_TYPE', 'This handle type cannot be sent');
E('ERR_INVALID_IP_ADDRESS', 'Invalid IP address: %s');
E('ERR_INVALID_OPT_VALUE', function (name, value) {
    return "The value \"".concat(String(value), "\" is invalid for option \"").concat(name, "\"");
});
E('ERR_INVALID_OPT_VALUE_ENCODING', function (value) { return "The value \"".concat(String(value), "\" is invalid for option \"encoding\""); });
E('ERR_INVALID_REPL_EVAL_CONFIG', 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
E('ERR_INVALID_SYNC_FORK_INPUT', 'Asynchronous forks do not support Buffer, Uint8Array or string input: %s');
E('ERR_INVALID_THIS', 'Value of "this" must be of type %s');
E('ERR_INVALID_TUPLE', '%s must be an iterable %s tuple');
E('ERR_INVALID_URL', 'Invalid URL: %s');
E('ERR_INVALID_URL_SCHEME', function (expected) { return "The URL must be ".concat(oneOf(expected, 'scheme')); });
E('ERR_IPC_CHANNEL_CLOSED', 'Channel closed');
E('ERR_IPC_DISCONNECTED', 'IPC channel is already disconnected');
E('ERR_IPC_ONE_PIPE', 'Child process can have only one IPC pipe');
E('ERR_IPC_SYNC_FORK', 'IPC cannot be used with synchronous forks');
E('ERR_MISSING_ARGS', missingArgs);
E('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
E('ERR_NAPI_CONS_FUNCTION', 'Constructor must be a function');
E('ERR_NAPI_CONS_PROTOTYPE_OBJECT', 'Constructor.prototype must be an object');
E('ERR_NO_CRYPTO', 'Node.js is not compiled with OpenSSL crypto support');
E('ERR_NO_LONGER_SUPPORTED', '%s is no longer supported');
E('ERR_PARSE_HISTORY_DATA', 'Could not parse history data in %s');
E('ERR_SOCKET_ALREADY_BOUND', 'Socket is already bound');
E('ERR_SOCKET_BAD_PORT', 'Port should be > 0 and < 65536');
E('ERR_SOCKET_BAD_TYPE', 'Bad socket type specified. Valid types are: udp4, udp6');
E('ERR_SOCKET_CANNOT_SEND', 'Unable to send data');
E('ERR_SOCKET_CLOSED', 'Socket is closed');
E('ERR_SOCKET_DGRAM_NOT_RUNNING', 'Not running');
E('ERR_STDERR_CLOSE', 'process.stderr cannot be closed');
E('ERR_STDOUT_CLOSE', 'process.stdout cannot be closed');
E('ERR_STREAM_WRAP', 'Stream has StringDecoder set or is in objectMode');
E('ERR_TLS_CERT_ALTNAME_INVALID', "Hostname/IP does not match certificate's altnames: %s");
E('ERR_TLS_DH_PARAM_SIZE', function (size) { return "DH parameter size ".concat(size, " is less than 2048"); });
E('ERR_TLS_HANDSHAKE_TIMEOUT', 'TLS handshake timeout');
E('ERR_TLS_RENEGOTIATION_FAILED', 'Failed to renegotiate');
E('ERR_TLS_REQUIRED_SERVER_NAME', '"servername" is required parameter for Server.addContext');
E('ERR_TLS_SESSION_ATTACK', 'TSL session renegotiation attack detected');
E('ERR_TRANSFORM_ALREADY_TRANSFORMING', 'Calling transform done when still transforming');
E('ERR_TRANSFORM_WITH_LENGTH_0', 'Calling transform done when writableState.length != 0');
E('ERR_UNKNOWN_ENCODING', 'Unknown encoding: %s');
E('ERR_UNKNOWN_SIGNAL', 'Unknown signal: %s');
E('ERR_UNKNOWN_STDIN_TYPE', 'Unknown stdin file type');
E('ERR_UNKNOWN_STREAM_TYPE', 'Unknown stream file type');
E('ERR_V8BREAKITERATOR', 'Full ICU data not installed. ' + 'See https://github.com/nodejs/node/wiki/Intl');
function invalidArgType(name, expected, actual) {
    assert(name, 'name is required');
    // determiner: 'must be' or 'must not be'
    var determiner;
    if (expected.includes('not ')) {
        determiner = 'must not be';
        expected = expected.split('not ')[1];
    }
    else {
        determiner = 'must be';
    }
    var msg;
    if (Array.isArray(name)) {
        var names = name.map(function (val) { return "\"".concat(val, "\""); }).join(', ');
        msg = "The ".concat(names, " arguments ").concat(determiner, " ").concat(oneOf(expected, 'type'));
    }
    else if (name.includes(' argument')) {
        // for the case like 'first argument'
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
    }
    else {
        var type = name.includes('.') ? 'property' : 'argument';
        msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
    }
    // if actual value received, output it
    if (arguments.length >= 3) {
        msg += ". Received type ".concat(actual !== null ? typeof actual : 'null');
    }
    return msg;
}
function missingArgs() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    assert(args.length > 0, 'At least one arg needs to be specified');
    var msg = 'The ';
    var len = args.length;
    args = args.map(function (a) { return "\"".concat(a, "\""); });
    switch (len) {
        case 1:
            msg += "".concat(args[0], " argument");
            break;
        case 2:
            msg += "".concat(args[0], " and ").concat(args[1], " arguments");
            break;
        default:
            msg += args.slice(0, len - 1).join(', ');
            msg += ", and ".concat(args[len - 1], " arguments");
            break;
    }
    return "".concat(msg, " must be specified");
}
function oneOf(expected, thing) {
    assert(expected, 'expected is required');
    assert(typeof thing === 'string', 'thing is required');
    if (Array.isArray(expected)) {
        var len = expected.length;
        assert(len > 0, 'At least one expected value needs to be specified');
        // tslint:disable-next-line
        expected = expected.map(function (i) { return String(i); });
        if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
        }
        else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        }
        else {
            return "of ".concat(thing, " ").concat(expected[0]);
        }
    }
    else {
        return "of ".concat(thing, " ").concat(String(expected));
    }
}
function bufferOutOfBounds(name, isWriting) {
    if (isWriting) {
        return 'Attempt to write outside buffer bounds';
    }
    else {
        return "\"".concat(name, "\" is outside of buffer bounds");
    }
}


/***/ }),

/***/ 1968:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = exports.Link = exports.Node = exports.SEP = void 0;
var process_1 = __nccwpck_require__(914);
var buffer_1 = __nccwpck_require__(8458);
var constants_1 = __nccwpck_require__(7071);
var events_1 = __nccwpck_require__(2361);
var Stats_1 = __nccwpck_require__(6663);
var S_IFMT = constants_1.constants.S_IFMT, S_IFDIR = constants_1.constants.S_IFDIR, S_IFREG = constants_1.constants.S_IFREG, S_IFLNK = constants_1.constants.S_IFLNK, O_APPEND = constants_1.constants.O_APPEND;
var getuid = function () { var _a, _b; return (_b = (_a = process_1.default.getuid) === null || _a === void 0 ? void 0 : _a.call(process_1.default)) !== null && _b !== void 0 ? _b : 0; };
var getgid = function () { var _a, _b; return (_b = (_a = process_1.default.getgid) === null || _a === void 0 ? void 0 : _a.call(process_1.default)) !== null && _b !== void 0 ? _b : 0; };
exports.SEP = '/';
/**
 * Node in a file system (like i-node, v-node).
 */
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node(ino, perm) {
        if (perm === void 0) { perm = 438; }
        var _this = _super.call(this) || this;
        // User ID and group ID.
        _this.uid = getuid();
        _this.gid = getgid();
        _this.atime = new Date();
        _this.mtime = new Date();
        _this.ctime = new Date();
        _this.perm = 438; // Permissions `chmod`, `fchmod`
        _this.mode = S_IFREG; // S_IFDIR, S_IFREG, etc.. (file by default?)
        // Number of hard links pointing at this Node.
        _this.nlink = 1;
        _this.perm = perm;
        _this.mode |= perm;
        _this.ino = ino;
        return _this;
    }
    Node.prototype.getString = function (encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        return this.getBuffer().toString(encoding);
    };
    Node.prototype.setString = function (str) {
        // this.setBuffer(bufferFrom(str, 'utf8'));
        this.buf = (0, buffer_1.bufferFrom)(str, 'utf8');
        this.touch();
    };
    Node.prototype.getBuffer = function () {
        if (!this.buf)
            this.setBuffer((0, buffer_1.bufferAllocUnsafe)(0));
        return (0, buffer_1.bufferFrom)(this.buf); // Return a copy.
    };
    Node.prototype.setBuffer = function (buf) {
        this.buf = (0, buffer_1.bufferFrom)(buf); // Creates a copy of data.
        this.touch();
    };
    Node.prototype.getSize = function () {
        return this.buf ? this.buf.length : 0;
    };
    Node.prototype.setModeProperty = function (property) {
        this.mode = (this.mode & ~S_IFMT) | property;
    };
    Node.prototype.setIsFile = function () {
        this.setModeProperty(S_IFREG);
    };
    Node.prototype.setIsDirectory = function () {
        this.setModeProperty(S_IFDIR);
    };
    Node.prototype.setIsSymlink = function () {
        this.setModeProperty(S_IFLNK);
    };
    Node.prototype.isFile = function () {
        return (this.mode & S_IFMT) === S_IFREG;
    };
    Node.prototype.isDirectory = function () {
        return (this.mode & S_IFMT) === S_IFDIR;
    };
    Node.prototype.isSymlink = function () {
        // return !!this.symlink;
        return (this.mode & S_IFMT) === S_IFLNK;
    };
    Node.prototype.makeSymlink = function (steps) {
        this.symlink = steps;
        this.setIsSymlink();
    };
    Node.prototype.write = function (buf, off, len, pos) {
        if (off === void 0) { off = 0; }
        if (len === void 0) { len = buf.length; }
        if (pos === void 0) { pos = 0; }
        if (!this.buf)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        if (pos + len > this.buf.length) {
            var newBuf = (0, buffer_1.bufferAllocUnsafe)(pos + len);
            this.buf.copy(newBuf, 0, 0, this.buf.length);
            this.buf = newBuf;
        }
        buf.copy(this.buf, pos, off, off + len);
        this.touch();
        return len;
    };
    // Returns the number of bytes read.
    Node.prototype.read = function (buf, off, len, pos) {
        if (off === void 0) { off = 0; }
        if (len === void 0) { len = buf.byteLength; }
        if (pos === void 0) { pos = 0; }
        if (!this.buf)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        var actualLen = len;
        if (actualLen > buf.byteLength) {
            actualLen = buf.byteLength;
        }
        if (actualLen + pos > this.buf.length) {
            actualLen = this.buf.length - pos;
        }
        this.buf.copy(buf, off, pos, pos + actualLen);
        return actualLen;
    };
    Node.prototype.truncate = function (len) {
        if (len === void 0) { len = 0; }
        if (!len)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        else {
            if (!this.buf)
                this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
            if (len <= this.buf.length) {
                this.buf = this.buf.slice(0, len);
            }
            else {
                var buf = (0, buffer_1.bufferAllocUnsafe)(0);
                this.buf.copy(buf);
                buf.fill(0, len);
            }
        }
        this.touch();
    };
    Node.prototype.chmod = function (perm) {
        this.perm = perm;
        this.mode = (this.mode & ~511) | perm;
        this.touch();
    };
    Node.prototype.chown = function (uid, gid) {
        this.uid = uid;
        this.gid = gid;
        this.touch();
    };
    Node.prototype.touch = function () {
        this.mtime = new Date();
        this.emit('change', this);
    };
    Node.prototype.canRead = function (uid, gid) {
        if (uid === void 0) { uid = getuid(); }
        if (gid === void 0) { gid = getgid(); }
        if (this.perm & 4 /* S.IROTH */) {
            return true;
        }
        if (gid === this.gid) {
            if (this.perm & 32 /* S.IRGRP */) {
                return true;
            }
        }
        if (uid === this.uid) {
            if (this.perm & 256 /* S.IRUSR */) {
                return true;
            }
        }
        return false;
    };
    Node.prototype.canWrite = function (uid, gid) {
        if (uid === void 0) { uid = getuid(); }
        if (gid === void 0) { gid = getgid(); }
        if (this.perm & 2 /* S.IWOTH */) {
            return true;
        }
        if (gid === this.gid) {
            if (this.perm & 16 /* S.IWGRP */) {
                return true;
            }
        }
        if (uid === this.uid) {
            if (this.perm & 128 /* S.IWUSR */) {
                return true;
            }
        }
        return false;
    };
    Node.prototype.del = function () {
        this.emit('delete', this);
    };
    Node.prototype.toJSON = function () {
        return {
            ino: this.ino,
            uid: this.uid,
            gid: this.gid,
            atime: this.atime.getTime(),
            mtime: this.mtime.getTime(),
            ctime: this.ctime.getTime(),
            perm: this.perm,
            mode: this.mode,
            nlink: this.nlink,
            symlink: this.symlink,
            data: this.getString(),
        };
    };
    return Node;
}(events_1.EventEmitter));
exports.Node = Node;
/**
 * Represents a hard link that points to an i-node `node`.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link(vol, parent, name) {
        var _this = _super.call(this) || this;
        _this.children = {};
        // Path to this node as Array: ['usr', 'bin', 'node'].
        _this._steps = [];
        // "i-node" number of the node.
        _this.ino = 0;
        // Number of children.
        _this.length = 0;
        _this.vol = vol;
        _this.parent = parent;
        _this.name = name;
        _this.syncSteps();
        return _this;
    }
    Object.defineProperty(Link.prototype, "steps", {
        get: function () {
            return this._steps;
        },
        // Recursively sync children steps, e.g. in case of dir rename
        set: function (val) {
            this._steps = val;
            for (var _i = 0, _a = Object.values(this.children); _i < _a.length; _i++) {
                var child = _a[_i];
                child === null || child === void 0 ? void 0 : child.syncSteps();
            }
        },
        enumerable: false,
        configurable: true
    });
    Link.prototype.setNode = function (node) {
        this.node = node;
        this.ino = node.ino;
    };
    Link.prototype.getNode = function () {
        return this.node;
    };
    Link.prototype.createChild = function (name, node) {
        if (node === void 0) { node = this.vol.createNode(); }
        var link = new Link(this.vol, this, name);
        link.setNode(node);
        if (node.isDirectory()) {
            // link.setChild('.', link);
            // link.getNode().nlink++;
            // link.setChild('..', this);
            // this.getNode().nlink++;
        }
        this.setChild(name, link);
        return link;
    };
    Link.prototype.setChild = function (name, link) {
        if (link === void 0) { link = new Link(this.vol, this, name); }
        this.children[name] = link;
        link.parent = this;
        this.length++;
        this.emit('child:add', link, this);
        return link;
    };
    Link.prototype.deleteChild = function (link) {
        delete this.children[link.getName()];
        this.length--;
        this.emit('child:delete', link, this);
    };
    Link.prototype.getChild = function (name) {
        if (Object.hasOwnProperty.call(this.children, name)) {
            return this.children[name];
        }
    };
    Link.prototype.getPath = function () {
        return this.steps.join(exports.SEP);
    };
    Link.prototype.getName = function () {
        return this.steps[this.steps.length - 1];
    };
    // del() {
    //     const parent = this.parent;
    //     if(parent) {
    //         parent.deleteChild(link);
    //     }
    //     this.parent = null;
    //     this.vol = null;
    // }
    /**
     * Walk the tree path and return the `Link` at that location, if any.
     * @param steps {string[]} Desired location.
     * @param stop {number} Max steps to go into.
     * @param i {number} Current step in the `steps` array.
     *
     * @return {Link|null}
     */
    Link.prototype.walk = function (steps, stop, i) {
        if (stop === void 0) { stop = steps.length; }
        if (i === void 0) { i = 0; }
        if (i >= steps.length)
            return this;
        if (i >= stop)
            return this;
        var step = steps[i];
        var link = this.getChild(step);
        if (!link)
            return null;
        return link.walk(steps, stop, i + 1);
    };
    Link.prototype.toJSON = function () {
        return {
            steps: this.steps,
            ino: this.ino,
            children: Object.keys(this.children),
        };
    };
    Link.prototype.syncSteps = function () {
        this.steps = this.parent ? this.parent.steps.concat([this.name]) : [this.name];
    };
    return Link;
}(events_1.EventEmitter));
exports.Link = Link;
/**
 * Represents an open file (file descriptor) that points to a `Link` (Hard-link) and a `Node`.
 */
var File = /** @class */ (function () {
    /**
     * Open a Link-Node pair. `node` is provided separately as that might be a different node
     * rather the one `link` points to, because it might be a symlink.
     * @param link
     * @param node
     * @param flags
     * @param fd
     */
    function File(link, node, flags, fd) {
        /**
         * A cursor/offset position in a file, where data will be written on write.
         * User can "seek" this position.
         */
        this.position = 0;
        this.link = link;
        this.node = node;
        this.flags = flags;
        this.fd = fd;
    }
    File.prototype.getString = function (encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        return this.node.getString();
    };
    File.prototype.setString = function (str) {
        this.node.setString(str);
    };
    File.prototype.getBuffer = function () {
        return this.node.getBuffer();
    };
    File.prototype.setBuffer = function (buf) {
        this.node.setBuffer(buf);
    };
    File.prototype.getSize = function () {
        return this.node.getSize();
    };
    File.prototype.truncate = function (len) {
        this.node.truncate(len);
    };
    File.prototype.seekTo = function (position) {
        this.position = position;
    };
    File.prototype.stats = function () {
        return Stats_1.default.build(this.node);
    };
    File.prototype.write = function (buf, offset, length, position) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = buf.length; }
        if (typeof position !== 'number')
            position = this.position;
        if (this.flags & O_APPEND)
            position = this.getSize();
        var bytes = this.node.write(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
    };
    File.prototype.read = function (buf, offset, length, position) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = buf.byteLength; }
        if (typeof position !== 'number')
            position = this.position;
        var bytes = this.node.read(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
    };
    File.prototype.chmod = function (perm) {
        this.node.chmod(perm);
    };
    File.prototype.chown = function (uid, gid) {
        this.node.chown(uid, gid);
    };
    return File;
}());
exports.File = File;


/***/ }),

/***/ 914:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

// Here we mock the global `process` variable in case we are not in Node's environment.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProcess = void 0;
/**
 * Looks to return a `process` object, if one is available.
 *
 * The global `process` is returned if defined;
 * otherwise `require('process')` is attempted.
 *
 * If that fails, `undefined` is returned.
 *
 * @return {IProcess | undefined}
 */
var maybeReturnProcess = function () {
    if (typeof process !== 'undefined') {
        return process;
    }
    try {
        return __nccwpck_require__(7282);
    }
    catch (_a) {
        return undefined;
    }
};
function createProcess() {
    var p = maybeReturnProcess() || {};
    if (!p.cwd)
        p.cwd = function () { return '/'; };
    if (!p.nextTick)
        p.nextTick = (__nccwpck_require__(4837)["default"]);
    if (!p.emitWarning)
        p.emitWarning = function (message, type) {
            // tslint:disable-next-line:no-console
            console.warn("".concat(type).concat(type ? ': ' : '').concat(message));
        };
    if (!p.env)
        p.env = {};
    return p;
}
exports.createProcess = createProcess;
exports["default"] = createProcess();


/***/ }),

/***/ 3421:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileHandle = void 0;
function promisify(vol, fn, getResult) {
    if (getResult === void 0) { getResult = function (input) { return input; }; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            vol[fn].bind(vol).apply(void 0, __spreadArray(__spreadArray([], args, false), [function (error, result) {
                    if (error)
                        return reject(error);
                    return resolve(getResult(result));
                }], false));
        });
    };
}
var FileHandle = /** @class */ (function () {
    function FileHandle(vol, fd) {
        this.vol = vol;
        this.fd = fd;
    }
    FileHandle.prototype.appendFile = function (data, options) {
        return promisify(this.vol, 'appendFile')(this.fd, data, options);
    };
    FileHandle.prototype.chmod = function (mode) {
        return promisify(this.vol, 'fchmod')(this.fd, mode);
    };
    FileHandle.prototype.chown = function (uid, gid) {
        return promisify(this.vol, 'fchown')(this.fd, uid, gid);
    };
    FileHandle.prototype.close = function () {
        return promisify(this.vol, 'close')(this.fd);
    };
    FileHandle.prototype.datasync = function () {
        return promisify(this.vol, 'fdatasync')(this.fd);
    };
    FileHandle.prototype.read = function (buffer, offset, length, position) {
        return promisify(this.vol, 'read', function (bytesRead) { return ({ bytesRead: bytesRead, buffer: buffer }); })(this.fd, buffer, offset, length, position);
    };
    FileHandle.prototype.readFile = function (options) {
        return promisify(this.vol, 'readFile')(this.fd, options);
    };
    FileHandle.prototype.stat = function (options) {
        return promisify(this.vol, 'fstat')(this.fd, options);
    };
    FileHandle.prototype.sync = function () {
        return promisify(this.vol, 'fsync')(this.fd);
    };
    FileHandle.prototype.truncate = function (len) {
        return promisify(this.vol, 'ftruncate')(this.fd, len);
    };
    FileHandle.prototype.utimes = function (atime, mtime) {
        return promisify(this.vol, 'futimes')(this.fd, atime, mtime);
    };
    FileHandle.prototype.write = function (buffer, offset, length, position) {
        return promisify(this.vol, 'write', function (bytesWritten) { return ({ bytesWritten: bytesWritten, buffer: buffer }); })(this.fd, buffer, offset, length, position);
    };
    FileHandle.prototype.writeFile = function (data, options) {
        return promisify(this.vol, 'writeFile')(this.fd, data, options);
    };
    return FileHandle;
}());
exports.FileHandle = FileHandle;
function createPromisesApi(vol) {
    if (typeof Promise === 'undefined')
        return null;
    return {
        FileHandle: FileHandle,
        access: function (path, mode) {
            return promisify(vol, 'access')(path, mode);
        },
        appendFile: function (path, data, options) {
            return promisify(vol, 'appendFile')(path instanceof FileHandle ? path.fd : path, data, options);
        },
        chmod: function (path, mode) {
            return promisify(vol, 'chmod')(path, mode);
        },
        chown: function (path, uid, gid) {
            return promisify(vol, 'chown')(path, uid, gid);
        },
        copyFile: function (src, dest, flags) {
            return promisify(vol, 'copyFile')(src, dest, flags);
        },
        lchmod: function (path, mode) {
            return promisify(vol, 'lchmod')(path, mode);
        },
        lchown: function (path, uid, gid) {
            return promisify(vol, 'lchown')(path, uid, gid);
        },
        link: function (existingPath, newPath) {
            return promisify(vol, 'link')(existingPath, newPath);
        },
        lstat: function (path, options) {
            return promisify(vol, 'lstat')(path, options);
        },
        mkdir: function (path, options) {
            return promisify(vol, 'mkdir')(path, options);
        },
        mkdtemp: function (prefix, options) {
            return promisify(vol, 'mkdtemp')(prefix, options);
        },
        open: function (path, flags, mode) {
            return promisify(vol, 'open', function (fd) { return new FileHandle(vol, fd); })(path, flags, mode);
        },
        readdir: function (path, options) {
            return promisify(vol, 'readdir')(path, options);
        },
        readFile: function (id, options) {
            return promisify(vol, 'readFile')(id instanceof FileHandle ? id.fd : id, options);
        },
        readlink: function (path, options) {
            return promisify(vol, 'readlink')(path, options);
        },
        realpath: function (path, options) {
            return promisify(vol, 'realpath')(path, options);
        },
        rename: function (oldPath, newPath) {
            return promisify(vol, 'rename')(oldPath, newPath);
        },
        rmdir: function (path) {
            return promisify(vol, 'rmdir')(path);
        },
        rm: function (path, options) {
            return promisify(vol, 'rm')(path, options);
        },
        stat: function (path, options) {
            return promisify(vol, 'stat')(path, options);
        },
        symlink: function (target, path, type) {
            return promisify(vol, 'symlink')(target, path, type);
        },
        truncate: function (path, len) {
            return promisify(vol, 'truncate')(path, len);
        },
        unlink: function (path) {
            return promisify(vol, 'unlink')(path);
        },
        utimes: function (path, atime, mtime) {
            return promisify(vol, 'utimes')(path, atime, mtime);
        },
        writeFile: function (id, data, options) {
            return promisify(vol, 'writeFile')(id instanceof FileHandle ? id.fd : id, data, options);
        },
    };
}
exports["default"] = createPromisesApi;


/***/ }),

/***/ 4837:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var _setImmediate;
if (typeof setImmediate === 'function')
    _setImmediate = setImmediate.bind(typeof globalThis !== 'undefined' ? globalThis : global);
else
    _setImmediate = setTimeout.bind(typeof globalThis !== 'undefined' ? globalThis : global);
exports["default"] = _setImmediate;


/***/ }),

/***/ 4586:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * `setTimeoutUnref` is just like `setTimeout`,
 * only in Node's environment it will "unref" its macro task.
 */
function setTimeoutUnref(callback, time, args) {
    var ref = setTimeout.apply(typeof globalThis !== 'undefined' ? globalThis : global, arguments);
    if (ref && typeof ref === 'object' && typeof ref.unref === 'function')
        ref.unref();
    return ref;
}
exports["default"] = setTimeoutUnref;


/***/ }),

/***/ 3383:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FSWatcher = exports.StatWatcher = exports.Volume = exports.toUnixTimestamp = exports.bufferToEncoding = exports.dataToBuffer = exports.dataToStr = exports.pathToSteps = exports.filenameToSteps = exports.pathToFilename = exports.flagsToNumber = exports.FLAGS = void 0;
var pathModule = __nccwpck_require__(1017);
var node_1 = __nccwpck_require__(1968);
var Stats_1 = __nccwpck_require__(6663);
var Dirent_1 = __nccwpck_require__(9851);
var buffer_1 = __nccwpck_require__(8458);
var setImmediate_1 = __nccwpck_require__(4837);
var process_1 = __nccwpck_require__(914);
var setTimeoutUnref_1 = __nccwpck_require__(4586);
var stream_1 = __nccwpck_require__(2781);
var constants_1 = __nccwpck_require__(7071);
var events_1 = __nccwpck_require__(2361);
var encoding_1 = __nccwpck_require__(5162);
var errors = __nccwpck_require__(1634);
var util = __nccwpck_require__(3837);
var promises_1 = __nccwpck_require__(3421);
var resolveCrossPlatform = pathModule.resolve;
var O_RDONLY = constants_1.constants.O_RDONLY, O_WRONLY = constants_1.constants.O_WRONLY, O_RDWR = constants_1.constants.O_RDWR, O_CREAT = constants_1.constants.O_CREAT, O_EXCL = constants_1.constants.O_EXCL, O_TRUNC = constants_1.constants.O_TRUNC, O_APPEND = constants_1.constants.O_APPEND, O_SYNC = constants_1.constants.O_SYNC, O_DIRECTORY = constants_1.constants.O_DIRECTORY, F_OK = constants_1.constants.F_OK, COPYFILE_EXCL = constants_1.constants.COPYFILE_EXCL, COPYFILE_FICLONE_FORCE = constants_1.constants.COPYFILE_FICLONE_FORCE;
var _a = pathModule.posix ? pathModule.posix : pathModule, sep = _a.sep, relative = _a.relative, join = _a.join, dirname = _a.dirname;
var isWin = process_1.default.platform === 'win32';
var kMinPoolSpace = 128;
// const kMaxLength = require('buffer').kMaxLength;
// ---------------------------------------- Error messages
// TODO: Use `internal/errors.js` in the future.
var ERRSTR = {
    PATH_STR: 'path must be a string or Buffer',
    // FD:             'file descriptor must be a unsigned 32-bit integer',
    FD: 'fd must be a file descriptor',
    MODE_INT: 'mode must be an int',
    CB: 'callback must be a function',
    UID: 'uid must be an unsigned int',
    GID: 'gid must be an unsigned int',
    LEN: 'len must be an integer',
    ATIME: 'atime must be an integer',
    MTIME: 'mtime must be an integer',
    PREFIX: 'filename prefix is required',
    BUFFER: 'buffer must be an instance of Buffer or StaticBuffer',
    OFFSET: 'offset must be an integer',
    LENGTH: 'length must be an integer',
    POSITION: 'position must be an integer',
};
var ERRSTR_OPTS = function (tipeof) { return "Expected options to be either an object or a string, but got ".concat(tipeof, " instead"); };
// const ERRSTR_FLAG = flag => `Unknown file open flag: ${flag}`;
var ENOENT = 'ENOENT';
var EBADF = 'EBADF';
var EINVAL = 'EINVAL';
var EPERM = 'EPERM';
var EPROTO = 'EPROTO';
var EEXIST = 'EEXIST';
var ENOTDIR = 'ENOTDIR';
var EMFILE = 'EMFILE';
var EACCES = 'EACCES';
var EISDIR = 'EISDIR';
var ENOTEMPTY = 'ENOTEMPTY';
var ENOSYS = 'ENOSYS';
var ERR_FS_EISDIR = 'ERR_FS_EISDIR';
function formatError(errorCode, func, path, path2) {
    if (func === void 0) { func = ''; }
    if (path === void 0) { path = ''; }
    if (path2 === void 0) { path2 = ''; }
    var pathFormatted = '';
    if (path)
        pathFormatted = " '".concat(path, "'");
    if (path2)
        pathFormatted += " -> '".concat(path2, "'");
    switch (errorCode) {
        case ENOENT:
            return "ENOENT: no such file or directory, ".concat(func).concat(pathFormatted);
        case EBADF:
            return "EBADF: bad file descriptor, ".concat(func).concat(pathFormatted);
        case EINVAL:
            return "EINVAL: invalid argument, ".concat(func).concat(pathFormatted);
        case EPERM:
            return "EPERM: operation not permitted, ".concat(func).concat(pathFormatted);
        case EPROTO:
            return "EPROTO: protocol error, ".concat(func).concat(pathFormatted);
        case EEXIST:
            return "EEXIST: file already exists, ".concat(func).concat(pathFormatted);
        case ENOTDIR:
            return "ENOTDIR: not a directory, ".concat(func).concat(pathFormatted);
        case EISDIR:
            return "EISDIR: illegal operation on a directory, ".concat(func).concat(pathFormatted);
        case EACCES:
            return "EACCES: permission denied, ".concat(func).concat(pathFormatted);
        case ENOTEMPTY:
            return "ENOTEMPTY: directory not empty, ".concat(func).concat(pathFormatted);
        case EMFILE:
            return "EMFILE: too many open files, ".concat(func).concat(pathFormatted);
        case ENOSYS:
            return "ENOSYS: function not implemented, ".concat(func).concat(pathFormatted);
        case ERR_FS_EISDIR:
            return "[ERR_FS_EISDIR]: Path is a directory: ".concat(func, " returned EISDIR (is a directory) ").concat(path);
        default:
            return "".concat(errorCode, ": error occurred, ").concat(func).concat(pathFormatted);
    }
}
function createError(errorCode, func, path, path2, Constructor) {
    if (func === void 0) { func = ''; }
    if (path === void 0) { path = ''; }
    if (path2 === void 0) { path2 = ''; }
    if (Constructor === void 0) { Constructor = Error; }
    var error = new Constructor(formatError(errorCode, func, path, path2));
    error.code = errorCode;
    return error;
}
// ---------------------------------------- Flags
// List of file `flags` as defined by Node.
var FLAGS;
(function (FLAGS) {
    // Open file for reading. An exception occurs if the file does not exist.
    FLAGS[FLAGS["r"] = O_RDONLY] = "r";
    // Open file for reading and writing. An exception occurs if the file does not exist.
    FLAGS[FLAGS["r+"] = O_RDWR] = "r+";
    // Open file for reading in synchronous mode. Instructs the operating system to bypass the local file system cache.
    FLAGS[FLAGS["rs"] = O_RDONLY | O_SYNC] = "rs";
    FLAGS[FLAGS["sr"] = FLAGS.rs] = "sr";
    // Open file for reading and writing, telling the OS to open it synchronously. See notes for 'rs' about using this with caution.
    FLAGS[FLAGS["rs+"] = O_RDWR | O_SYNC] = "rs+";
    FLAGS[FLAGS["sr+"] = FLAGS['rs+']] = "sr+";
    // Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    FLAGS[FLAGS["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
    // Like 'w' but fails if path exists.
    FLAGS[FLAGS["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
    FLAGS[FLAGS["xw"] = FLAGS.wx] = "xw";
    // Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
    FLAGS[FLAGS["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
    // Like 'w+' but fails if path exists.
    FLAGS[FLAGS["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
    FLAGS[FLAGS["xw+"] = FLAGS['wx+']] = "xw+";
    // Open file for appending. The file is created if it does not exist.
    FLAGS[FLAGS["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a";
    // Like 'a' but fails if path exists.
    FLAGS[FLAGS["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
    FLAGS[FLAGS["xa"] = FLAGS.ax] = "xa";
    // Open file for reading and appending. The file is created if it does not exist.
    FLAGS[FLAGS["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+";
    // Like 'a+' but fails if path exists.
    FLAGS[FLAGS["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
    FLAGS[FLAGS["xa+"] = FLAGS['ax+']] = "xa+";
})(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
function flagsToNumber(flags) {
    if (typeof flags === 'number')
        return flags;
    if (typeof flags === 'string') {
        var flagsNum = FLAGS[flags];
        if (typeof flagsNum !== 'undefined')
            return flagsNum;
    }
    // throw new TypeError(formatError(ERRSTR_FLAG(flags)));
    throw new errors.TypeError('ERR_INVALID_OPT_VALUE', 'flags', flags);
}
exports.flagsToNumber = flagsToNumber;
// ---------------------------------------- Options
function getOptions(defaults, options) {
    var opts;
    if (!options)
        return defaults;
    else {
        var tipeof = typeof options;
        switch (tipeof) {
            case 'string':
                opts = Object.assign({}, defaults, { encoding: options });
                break;
            case 'object':
                opts = Object.assign({}, defaults, options);
                break;
            default:
                throw TypeError(ERRSTR_OPTS(tipeof));
        }
    }
    if (opts.encoding !== 'buffer')
        (0, encoding_1.assertEncoding)(opts.encoding);
    return opts;
}
function optsGenerator(defaults) {
    return function (options) { return getOptions(defaults, options); };
}
function validateCallback(callback) {
    if (typeof callback !== 'function')
        throw TypeError(ERRSTR.CB);
    return callback;
}
function optsAndCbGenerator(getOpts) {
    return function (options, callback) {
        return typeof options === 'function' ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
    };
}
var optsDefaults = {
    encoding: 'utf8',
};
var getDefaultOpts = optsGenerator(optsDefaults);
var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
var readFileOptsDefaults = {
    flag: 'r',
};
var getReadFileOptions = optsGenerator(readFileOptsDefaults);
var writeFileDefaults = {
    encoding: 'utf8',
    mode: 438 /* MODE.DEFAULT */,
    flag: FLAGS[FLAGS.w],
};
var getWriteFileOptions = optsGenerator(writeFileDefaults);
var appendFileDefaults = {
    encoding: 'utf8',
    mode: 438 /* MODE.DEFAULT */,
    flag: FLAGS[FLAGS.a],
};
var getAppendFileOpts = optsGenerator(appendFileDefaults);
var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
var realpathDefaults = optsDefaults;
var getRealpathOptions = optsGenerator(realpathDefaults);
var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
var mkdirDefaults = {
    mode: 511 /* MODE.DIR */,
    recursive: false,
};
var getMkdirOptions = function (options) {
    if (typeof options === 'number')
        return Object.assign({}, mkdirDefaults, { mode: options });
    return Object.assign({}, mkdirDefaults, options);
};
var rmdirDefaults = {
    recursive: false,
};
var getRmdirOptions = function (options) {
    return Object.assign({}, rmdirDefaults, options);
};
var getRmOpts = optsGenerator(optsDefaults);
var getRmOptsAndCb = optsAndCbGenerator(getRmOpts);
var readdirDefaults = {
    encoding: 'utf8',
    withFileTypes: false,
};
var getReaddirOptions = optsGenerator(readdirDefaults);
var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
var statDefaults = {
    bigint: false,
};
var getStatOptions = function (options) {
    if (options === void 0) { options = {}; }
    return Object.assign({}, statDefaults, options);
};
var getStatOptsAndCb = function (options, callback) {
    return typeof options === 'function' ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
};
// ---------------------------------------- Utility functions
function getPathFromURLPosix(url) {
    if (url.hostname !== '') {
        throw new errors.TypeError('ERR_INVALID_FILE_URL_HOST', process_1.default.platform);
    }
    var pathname = url.pathname;
    for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === '%') {
            var third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === '2' && third === 102) {
                throw new errors.TypeError('ERR_INVALID_FILE_URL_PATH', 'must not include encoded / characters');
            }
        }
    }
    return decodeURIComponent(pathname);
}
function pathToFilename(path) {
    if (typeof path !== 'string' && !buffer_1.Buffer.isBuffer(path)) {
        try {
            if (!(path instanceof (__nccwpck_require__(7310).URL)))
                throw new TypeError(ERRSTR.PATH_STR);
        }
        catch (err) {
            throw new TypeError(ERRSTR.PATH_STR);
        }
        path = getPathFromURLPosix(path);
    }
    var pathString = String(path);
    nullCheck(pathString);
    // return slash(pathString);
    return pathString;
}
exports.pathToFilename = pathToFilename;
var resolve = function (filename, base) {
    if (base === void 0) { base = process_1.default.cwd(); }
    return resolveCrossPlatform(base, filename);
};
if (isWin) {
    var _resolve_1 = resolve;
    var unixify_1 = (__nccwpck_require__(9468)/* .unixify */ .Z4);
    resolve = function (filename, base) { return unixify_1(_resolve_1(filename, base)); };
}
function filenameToSteps(filename, base) {
    var fullPath = resolve(filename, base);
    var fullPathSansSlash = fullPath.substr(1);
    if (!fullPathSansSlash)
        return [];
    return fullPathSansSlash.split(sep);
}
exports.filenameToSteps = filenameToSteps;
function pathToSteps(path) {
    return filenameToSteps(pathToFilename(path));
}
exports.pathToSteps = pathToSteps;
function dataToStr(data, encoding) {
    if (encoding === void 0) { encoding = encoding_1.ENCODING_UTF8; }
    if (buffer_1.Buffer.isBuffer(data))
        return data.toString(encoding);
    else if (data instanceof Uint8Array)
        return (0, buffer_1.bufferFrom)(data).toString(encoding);
    else
        return String(data);
}
exports.dataToStr = dataToStr;
function dataToBuffer(data, encoding) {
    if (encoding === void 0) { encoding = encoding_1.ENCODING_UTF8; }
    if (buffer_1.Buffer.isBuffer(data))
        return data;
    else if (data instanceof Uint8Array)
        return (0, buffer_1.bufferFrom)(data);
    else
        return (0, buffer_1.bufferFrom)(String(data), encoding);
}
exports.dataToBuffer = dataToBuffer;
function bufferToEncoding(buffer, encoding) {
    if (!encoding || encoding === 'buffer')
        return buffer;
    else
        return buffer.toString(encoding);
}
exports.bufferToEncoding = bufferToEncoding;
function nullCheck(path, callback) {
    if (('' + path).indexOf('\u0000') !== -1) {
        var er = new Error('Path must be a string without null bytes');
        er.code = ENOENT;
        if (typeof callback !== 'function')
            throw er;
        process_1.default.nextTick(callback, er);
        return false;
    }
    return true;
}
function _modeToNumber(mode, def) {
    if (typeof mode === 'number')
        return mode;
    if (typeof mode === 'string')
        return parseInt(mode, 8);
    if (def)
        return modeToNumber(def);
    return undefined;
}
function modeToNumber(mode, def) {
    var result = _modeToNumber(mode, def);
    if (typeof result !== 'number' || isNaN(result))
        throw new TypeError(ERRSTR.MODE_INT);
    return result;
}
function isFd(path) {
    return path >>> 0 === path;
}
function validateFd(fd) {
    if (!isFd(fd))
        throw TypeError(ERRSTR.FD);
}
// converts Date or number to a fractional UNIX timestamp
function toUnixTimestamp(time) {
    // tslint:disable-next-line triple-equals
    if (typeof time === 'string' && +time == time) {
        return +time;
    }
    if (time instanceof Date) {
        return time.getTime() / 1000;
    }
    if (isFinite(time)) {
        if (time < 0) {
            return Date.now() / 1000;
        }
        return time;
    }
    throw new Error('Cannot parse time: ' + time);
}
exports.toUnixTimestamp = toUnixTimestamp;
function validateUid(uid) {
    if (typeof uid !== 'number')
        throw TypeError(ERRSTR.UID);
}
function validateGid(gid) {
    if (typeof gid !== 'number')
        throw TypeError(ERRSTR.GID);
}
function flattenJSON(nestedJSON) {
    var flatJSON = {};
    function flatten(pathPrefix, node) {
        for (var path in node) {
            var contentOrNode = node[path];
            var joinedPath = join(pathPrefix, path);
            if (typeof contentOrNode === 'string') {
                flatJSON[joinedPath] = contentOrNode;
            }
            else if (typeof contentOrNode === 'object' && contentOrNode !== null && Object.keys(contentOrNode).length > 0) {
                // empty directories need an explicit entry and therefore get handled in `else`, non-empty ones are implicitly considered
                flatten(joinedPath, contentOrNode);
            }
            else {
                // without this branch null, empty-object or non-object entries would not be handled in the same way
                // by both fromJSON() and fromNestedJSON()
                flatJSON[joinedPath] = null;
            }
        }
    }
    flatten('', nestedJSON);
    return flatJSON;
}
/**
 * `Volume` represents a file system.
 */
var Volume = /** @class */ (function () {
    function Volume(props) {
        if (props === void 0) { props = {}; }
        // I-node number counter.
        this.ino = 0;
        // A mapping for i-node numbers to i-nodes (`Node`);
        this.inodes = {};
        // List of released i-node numbers, for reuse.
        this.releasedInos = [];
        // A mapping for file descriptors to `File`s.
        this.fds = {};
        // A list of reusable (opened and closed) file descriptors, that should be
        // used first before creating a new file descriptor.
        this.releasedFds = [];
        // Max number of open files.
        this.maxFiles = 10000;
        // Current number of open files.
        this.openFiles = 0;
        this.promisesApi = (0, promises_1.default)(this);
        this.statWatchers = {};
        this.props = Object.assign({ Node: node_1.Node, Link: node_1.Link, File: node_1.File }, props);
        var root = this.createLink();
        root.setNode(this.createNode(true));
        var self = this; // tslint:disable-line no-this-assignment
        this.StatWatcher = /** @class */ (function (_super) {
            __extends(StatWatcher, _super);
            function StatWatcher() {
                return _super.call(this, self) || this;
            }
            return StatWatcher;
        }(StatWatcher));
        var _ReadStream = FsReadStream;
        this.ReadStream = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([self], args, false)) || this;
            }
            return class_1;
        }(_ReadStream));
        var _WriteStream = FsWriteStream;
        this.WriteStream = /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([self], args, false)) || this;
            }
            return class_2;
        }(_WriteStream));
        this.FSWatcher = /** @class */ (function (_super) {
            __extends(FSWatcher, _super);
            function FSWatcher() {
                return _super.call(this, self) || this;
            }
            return FSWatcher;
        }(FSWatcher));
        // root.setChild('.', root);
        // root.getNode().nlink++;
        // root.setChild('..', root);
        // root.getNode().nlink++;
        this.root = root;
    }
    Volume.fromJSON = function (json, cwd) {
        var vol = new Volume();
        vol.fromJSON(json, cwd);
        return vol;
    };
    Volume.fromNestedJSON = function (json, cwd) {
        var vol = new Volume();
        vol.fromNestedJSON(json, cwd);
        return vol;
    };
    Object.defineProperty(Volume.prototype, "promises", {
        get: function () {
            if (this.promisesApi === null)
                throw new Error('Promise is not supported in this environment.');
            return this.promisesApi;
        },
        enumerable: false,
        configurable: true
    });
    Volume.prototype.createLink = function (parent, name, isDirectory, perm) {
        if (isDirectory === void 0) { isDirectory = false; }
        if (!parent) {
            return new this.props.Link(this, null, '');
        }
        if (!name) {
            throw new Error('createLink: name cannot be empty');
        }
        return parent.createChild(name, this.createNode(isDirectory, perm));
    };
    Volume.prototype.deleteLink = function (link) {
        var parent = link.parent;
        if (parent) {
            parent.deleteChild(link);
            return true;
        }
        return false;
    };
    Volume.prototype.newInoNumber = function () {
        var releasedFd = this.releasedInos.pop();
        if (releasedFd)
            return releasedFd;
        else {
            this.ino = (this.ino + 1) % 0xffffffff;
            return this.ino;
        }
    };
    Volume.prototype.newFdNumber = function () {
        var releasedFd = this.releasedFds.pop();
        return typeof releasedFd === 'number' ? releasedFd : Volume.fd--;
    };
    Volume.prototype.createNode = function (isDirectory, perm) {
        if (isDirectory === void 0) { isDirectory = false; }
        var node = new this.props.Node(this.newInoNumber(), perm);
        if (isDirectory)
            node.setIsDirectory();
        this.inodes[node.ino] = node;
        return node;
    };
    Volume.prototype.getNode = function (ino) {
        return this.inodes[ino];
    };
    Volume.prototype.deleteNode = function (node) {
        node.del();
        delete this.inodes[node.ino];
        this.releasedInos.push(node.ino);
    };
    // Generates 6 character long random string, used by `mkdtemp`.
    Volume.prototype.genRndStr = function () {
        var str = (Math.random() + 1).toString(36).substr(2, 6);
        if (str.length === 6)
            return str;
        else
            return this.genRndStr();
    };
    // Returns a `Link` (hard link) referenced by path "split" into steps.
    Volume.prototype.getLink = function (steps) {
        return this.root.walk(steps);
    };
    // Just link `getLink`, but throws a correct user error, if link to found.
    Volume.prototype.getLinkOrThrow = function (filename, funcName) {
        var steps = filenameToSteps(filename);
        var link = this.getLink(steps);
        if (!link)
            throw createError(ENOENT, funcName, filename);
        return link;
    };
    // Just like `getLink`, but also dereference/resolves symbolic links.
    Volume.prototype.getResolvedLink = function (filenameOrSteps) {
        var steps = typeof filenameOrSteps === 'string' ? filenameToSteps(filenameOrSteps) : filenameOrSteps;
        var link = this.root;
        var i = 0;
        while (i < steps.length) {
            var step = steps[i];
            link = link.getChild(step);
            if (!link)
                return null;
            var node = link.getNode();
            if (node.isSymlink()) {
                steps = node.symlink.concat(steps.slice(i + 1));
                link = this.root;
                i = 0;
                continue;
            }
            i++;
        }
        return link;
    };
    // Just like `getLinkOrThrow`, but also dereference/resolves symbolic links.
    Volume.prototype.getResolvedLinkOrThrow = function (filename, funcName) {
        var link = this.getResolvedLink(filename);
        if (!link)
            throw createError(ENOENT, funcName, filename);
        return link;
    };
    Volume.prototype.resolveSymlinks = function (link) {
        // let node: Node = link.getNode();
        // while(link && node.isSymlink()) {
        //     link = this.getLink(node.symlink);
        //     if(!link) return null;
        //     node = link.getNode();
        // }
        // return link;
        return this.getResolvedLink(link.steps.slice(1));
    };
    // Just like `getLinkOrThrow`, but also verifies that the link is a directory.
    Volume.prototype.getLinkAsDirOrThrow = function (filename, funcName) {
        var link = this.getLinkOrThrow(filename, funcName);
        if (!link.getNode().isDirectory())
            throw createError(ENOTDIR, funcName, filename);
        return link;
    };
    // Get the immediate parent directory of the link.
    Volume.prototype.getLinkParent = function (steps) {
        return this.root.walk(steps, steps.length - 1);
    };
    Volume.prototype.getLinkParentAsDirOrThrow = function (filenameOrSteps, funcName) {
        var steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps(filenameOrSteps);
        var link = this.getLinkParent(steps);
        if (!link)
            throw createError(ENOENT, funcName, sep + steps.join(sep));
        if (!link.getNode().isDirectory())
            throw createError(ENOTDIR, funcName, sep + steps.join(sep));
        return link;
    };
    Volume.prototype.getFileByFd = function (fd) {
        return this.fds[String(fd)];
    };
    Volume.prototype.getFileByFdOrThrow = function (fd, funcName) {
        if (!isFd(fd))
            throw TypeError(ERRSTR.FD);
        var file = this.getFileByFd(fd);
        if (!file)
            throw createError(EBADF, funcName);
        return file;
    };
    /**
     * @todo This is not used anymore. Remove.
     */
    /*
    private getNodeByIdOrCreate(id: TFileId, flags: number, perm: number): Node {
      if (typeof id === 'number') {
        const file = this.getFileByFd(id);
        if (!file) throw Error('File nto found');
        return file.node;
      } else {
        const steps = pathToSteps(id as PathLike);
        let link = this.getLink(steps);
        if (link) return link.getNode();
  
        // Try creating a node if not found.
        if (flags & O_CREAT) {
          const dirLink = this.getLinkParent(steps);
          if (dirLink) {
            const name = steps[steps.length - 1];
            link = this.createLink(dirLink, name, false, perm);
            return link.getNode();
          }
        }
  
        throw createError(ENOENT, 'getNodeByIdOrCreate', pathToFilename(id));
      }
    }
    */
    Volume.prototype.wrapAsync = function (method, args, callback) {
        var _this = this;
        validateCallback(callback);
        (0, setImmediate_1.default)(function () {
            var result;
            try {
                result = method.apply(_this, args);
            }
            catch (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    };
    Volume.prototype._toJSON = function (link, json, path) {
        var _a;
        if (link === void 0) { link = this.root; }
        if (json === void 0) { json = {}; }
        var isEmpty = true;
        var children = link.children;
        if (link.getNode().isFile()) {
            children = (_a = {}, _a[link.getName()] = link.parent.getChild(link.getName()), _a);
            link = link.parent;
        }
        for (var name_1 in children) {
            isEmpty = false;
            var child = link.getChild(name_1);
            if (!child) {
                throw new Error('_toJSON: unexpected undefined');
            }
            var node = child.getNode();
            if (node.isFile()) {
                var filename = child.getPath();
                if (path)
                    filename = relative(path, filename);
                json[filename] = node.getString();
            }
            else if (node.isDirectory()) {
                this._toJSON(child, json, path);
            }
        }
        var dirPath = link.getPath();
        if (path)
            dirPath = relative(path, dirPath);
        if (dirPath && isEmpty) {
            json[dirPath] = null;
        }
        return json;
    };
    Volume.prototype.toJSON = function (paths, json, isRelative) {
        if (json === void 0) { json = {}; }
        if (isRelative === void 0) { isRelative = false; }
        var links = [];
        if (paths) {
            if (!(paths instanceof Array))
                paths = [paths];
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                var filename = pathToFilename(path);
                var link = this.getResolvedLink(filename);
                if (!link)
                    continue;
                links.push(link);
            }
        }
        else {
            links.push(this.root);
        }
        if (!links.length)
            return json;
        for (var _a = 0, links_1 = links; _a < links_1.length; _a++) {
            var link = links_1[_a];
            this._toJSON(link, json, isRelative ? link.getPath() : '');
        }
        return json;
    };
    Volume.prototype.fromJSON = function (json, cwd) {
        if (cwd === void 0) { cwd = process_1.default.cwd(); }
        for (var filename in json) {
            var data = json[filename];
            filename = resolve(filename, cwd);
            if (typeof data === 'string') {
                var dir = dirname(filename);
                this.mkdirpBase(dir, 511 /* MODE.DIR */);
                this.writeFileSync(filename, data);
            }
            else {
                this.mkdirpBase(filename, 511 /* MODE.DIR */);
            }
        }
    };
    Volume.prototype.fromNestedJSON = function (json, cwd) {
        this.fromJSON(flattenJSON(json), cwd);
    };
    Volume.prototype.reset = function () {
        this.ino = 0;
        this.inodes = {};
        this.releasedInos = [];
        this.fds = {};
        this.releasedFds = [];
        this.openFiles = 0;
        this.root = this.createLink();
        this.root.setNode(this.createNode(true));
    };
    // Legacy interface
    Volume.prototype.mountSync = function (mountpoint, json) {
        this.fromJSON(json, mountpoint);
    };
    Volume.prototype.openLink = function (link, flagsNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) { resolveSymlinks = true; }
        if (this.openFiles >= this.maxFiles) {
            // Too many open files.
            throw createError(EMFILE, 'open', link.getPath());
        }
        // Resolve symlinks.
        var realLink = link;
        if (resolveSymlinks)
            realLink = this.resolveSymlinks(link);
        if (!realLink)
            throw createError(ENOENT, 'open', link.getPath());
        var node = realLink.getNode();
        // Check whether node is a directory
        if (node.isDirectory()) {
            if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY)
                throw createError(EISDIR, 'open', link.getPath());
        }
        else {
            if (flagsNum & O_DIRECTORY)
                throw createError(ENOTDIR, 'open', link.getPath());
        }
        // Check node permissions
        if (!(flagsNum & O_WRONLY)) {
            if (!node.canRead()) {
                throw createError(EACCES, 'open', link.getPath());
            }
        }
        if (flagsNum & O_RDWR) {
        }
        var file = new this.props.File(link, node, flagsNum, this.newFdNumber());
        this.fds[file.fd] = file;
        this.openFiles++;
        if (flagsNum & O_TRUNC)
            file.truncate();
        return file;
    };
    Volume.prototype.openFile = function (filename, flagsNum, modeNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) { resolveSymlinks = true; }
        var steps = filenameToSteps(filename);
        var link = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps);
        if (link && flagsNum & O_EXCL)
            throw createError(EEXIST, 'open', filename);
        // Try creating a new file, if it does not exist.
        if (!link && flagsNum & O_CREAT) {
            // const dirLink: Link = this.getLinkParent(steps);
            var dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1));
            // if(!dirLink) throw createError(ENOENT, 'open', filename);
            if (!dirLink)
                throw createError(ENOENT, 'open', sep + steps.join(sep));
            if (flagsNum & O_CREAT && typeof modeNum === 'number') {
                link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
            }
        }
        if (link)
            return this.openLink(link, flagsNum, resolveSymlinks);
        throw createError(ENOENT, 'open', filename);
    };
    Volume.prototype.openBase = function (filename, flagsNum, modeNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) { resolveSymlinks = true; }
        var file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
        if (!file)
            throw createError(ENOENT, 'open', filename);
        return file.fd;
    };
    Volume.prototype.openSync = function (path, flags, mode) {
        if (mode === void 0) { mode = 438 /* MODE.DEFAULT */; }
        // Validate (1) mode; (2) path; (3) flags - in that order.
        var modeNum = modeToNumber(mode);
        var fileName = pathToFilename(path);
        var flagsNum = flagsToNumber(flags);
        return this.openBase(fileName, flagsNum, modeNum);
    };
    Volume.prototype.open = function (path, flags, a, b) {
        var mode = a;
        var callback = b;
        if (typeof a === 'function') {
            mode = 438 /* MODE.DEFAULT */;
            callback = a;
        }
        mode = mode || 438 /* MODE.DEFAULT */;
        var modeNum = modeToNumber(mode);
        var fileName = pathToFilename(path);
        var flagsNum = flagsToNumber(flags);
        this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
    };
    Volume.prototype.closeFile = function (file) {
        if (!this.fds[file.fd])
            return;
        this.openFiles--;
        delete this.fds[file.fd];
        this.releasedFds.push(file.fd);
    };
    Volume.prototype.closeSync = function (fd) {
        validateFd(fd);
        var file = this.getFileByFdOrThrow(fd, 'close');
        this.closeFile(file);
    };
    Volume.prototype.close = function (fd, callback) {
        validateFd(fd);
        this.wrapAsync(this.closeSync, [fd], callback);
    };
    Volume.prototype.openFileOrGetById = function (id, flagsNum, modeNum) {
        if (typeof id === 'number') {
            var file = this.fds[id];
            if (!file)
                throw createError(ENOENT);
            return file;
        }
        else {
            return this.openFile(pathToFilename(id), flagsNum, modeNum);
        }
    };
    Volume.prototype.readBase = function (fd, buffer, offset, length, position) {
        var file = this.getFileByFdOrThrow(fd);
        return file.read(buffer, Number(offset), Number(length), position);
    };
    Volume.prototype.readSync = function (fd, buffer, offset, length, position) {
        validateFd(fd);
        return this.readBase(fd, buffer, offset, length, position);
    };
    Volume.prototype.read = function (fd, buffer, offset, length, position, callback) {
        var _this = this;
        validateCallback(callback);
        // This `if` branch is from Node.js
        if (length === 0) {
            return process_1.default.nextTick(function () {
                if (callback)
                    callback(null, 0, buffer);
            });
        }
        (0, setImmediate_1.default)(function () {
            try {
                var bytes = _this.readBase(fd, buffer, offset, length, position);
                callback(null, bytes, buffer);
            }
            catch (err) {
                callback(err);
            }
        });
    };
    Volume.prototype.readFileBase = function (id, flagsNum, encoding) {
        var result;
        var isUserFd = typeof id === 'number';
        var userOwnsFd = isUserFd && isFd(id);
        var fd;
        if (userOwnsFd)
            fd = id;
        else {
            var filename = pathToFilename(id);
            var steps = filenameToSteps(filename);
            var link = this.getResolvedLink(steps);
            if (link) {
                var node = link.getNode();
                if (node.isDirectory())
                    throw createError(EISDIR, 'open', link.getPath());
            }
            fd = this.openSync(id, flagsNum);
        }
        try {
            result = bufferToEncoding(this.getFileByFdOrThrow(fd).getBuffer(), encoding);
        }
        finally {
            if (!userOwnsFd) {
                this.closeSync(fd);
            }
        }
        return result;
    };
    Volume.prototype.readFileSync = function (file, options) {
        var opts = getReadFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        return this.readFileBase(file, flagsNum, opts.encoding);
    };
    Volume.prototype.readFile = function (id, a, b) {
        var _a = optsAndCbGenerator(getReadFileOptions)(a, b), opts = _a[0], callback = _a[1];
        var flagsNum = flagsToNumber(opts.flag);
        this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
    };
    Volume.prototype.writeBase = function (fd, buf, offset, length, position) {
        var file = this.getFileByFdOrThrow(fd, 'write');
        return file.write(buf, offset, length, position);
    };
    Volume.prototype.writeSync = function (fd, a, b, c, d) {
        validateFd(fd);
        var encoding;
        var offset;
        var length;
        var position;
        var isBuffer = typeof a !== 'string';
        if (isBuffer) {
            offset = (b || 0) | 0;
            length = c;
            position = d;
        }
        else {
            position = b;
            encoding = c;
        }
        var buf = dataToBuffer(a, encoding);
        if (isBuffer) {
            if (typeof length === 'undefined') {
                length = buf.length;
            }
        }
        else {
            offset = 0;
            length = buf.length;
        }
        return this.writeBase(fd, buf, offset, length, position);
    };
    Volume.prototype.write = function (fd, a, b, c, d, e) {
        var _this = this;
        validateFd(fd);
        var offset;
        var length;
        var position;
        var encoding;
        var callback;
        var tipa = typeof a;
        var tipb = typeof b;
        var tipc = typeof c;
        var tipd = typeof d;
        if (tipa !== 'string') {
            if (tipb === 'function') {
                callback = b;
            }
            else if (tipc === 'function') {
                offset = b | 0;
                callback = c;
            }
            else if (tipd === 'function') {
                offset = b | 0;
                length = c;
                callback = d;
            }
            else {
                offset = b | 0;
                length = c;
                position = d;
                callback = e;
            }
        }
        else {
            if (tipb === 'function') {
                callback = b;
            }
            else if (tipc === 'function') {
                position = b;
                callback = c;
            }
            else if (tipd === 'function') {
                position = b;
                encoding = c;
                callback = d;
            }
        }
        var buf = dataToBuffer(a, encoding);
        if (tipa !== 'string') {
            if (typeof length === 'undefined')
                length = buf.length;
        }
        else {
            offset = 0;
            length = buf.length;
        }
        var cb = validateCallback(callback);
        (0, setImmediate_1.default)(function () {
            try {
                var bytes = _this.writeBase(fd, buf, offset, length, position);
                if (tipa !== 'string') {
                    cb(null, bytes, buf);
                }
                else {
                    cb(null, bytes, a);
                }
            }
            catch (err) {
                cb(err);
            }
        });
    };
    Volume.prototype.writeFileBase = function (id, buf, flagsNum, modeNum) {
        // console.log('writeFileBase', id, buf, flagsNum, modeNum);
        // const node = this.getNodeByIdOrCreate(id, flagsNum, modeNum);
        // node.setBuffer(buf);
        var isUserFd = typeof id === 'number';
        var fd;
        if (isUserFd)
            fd = id;
        else {
            fd = this.openBase(pathToFilename(id), flagsNum, modeNum);
            // fd = this.openSync(id as PathLike, flagsNum, modeNum);
        }
        var offset = 0;
        var length = buf.length;
        var position = flagsNum & O_APPEND ? undefined : 0;
        try {
            while (length > 0) {
                var written = this.writeSync(fd, buf, offset, length, position);
                offset += written;
                length -= written;
                if (position !== undefined)
                    position += written;
            }
        }
        finally {
            if (!isUserFd)
                this.closeSync(fd);
        }
    };
    Volume.prototype.writeFileSync = function (id, data, options) {
        var opts = getWriteFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        var modeNum = modeToNumber(opts.mode);
        var buf = dataToBuffer(data, opts.encoding);
        this.writeFileBase(id, buf, flagsNum, modeNum);
    };
    Volume.prototype.writeFile = function (id, data, a, b) {
        var options = a;
        var callback = b;
        if (typeof a === 'function') {
            options = writeFileDefaults;
            callback = a;
        }
        var cb = validateCallback(callback);
        var opts = getWriteFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        var modeNum = modeToNumber(opts.mode);
        var buf = dataToBuffer(data, opts.encoding);
        this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
    };
    Volume.prototype.linkBase = function (filename1, filename2) {
        var steps1 = filenameToSteps(filename1);
        var link1 = this.getLink(steps1);
        if (!link1)
            throw createError(ENOENT, 'link', filename1, filename2);
        var steps2 = filenameToSteps(filename2);
        // Check new link directory exists.
        var dir2 = this.getLinkParent(steps2);
        if (!dir2)
            throw createError(ENOENT, 'link', filename1, filename2);
        var name = steps2[steps2.length - 1];
        // Check if new file already exists.
        if (dir2.getChild(name))
            throw createError(EEXIST, 'link', filename1, filename2);
        var node = link1.getNode();
        node.nlink++;
        dir2.createChild(name, node);
    };
    Volume.prototype.copyFileBase = function (src, dest, flags) {
        var buf = this.readFileSync(src);
        if (flags & COPYFILE_EXCL) {
            if (this.existsSync(dest)) {
                throw createError(EEXIST, 'copyFile', src, dest);
            }
        }
        if (flags & COPYFILE_FICLONE_FORCE) {
            throw createError(ENOSYS, 'copyFile', src, dest);
        }
        this.writeFileBase(dest, buf, FLAGS.w, 438 /* MODE.DEFAULT */);
    };
    Volume.prototype.copyFileSync = function (src, dest, flags) {
        var srcFilename = pathToFilename(src);
        var destFilename = pathToFilename(dest);
        return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
    };
    Volume.prototype.copyFile = function (src, dest, a, b) {
        var srcFilename = pathToFilename(src);
        var destFilename = pathToFilename(dest);
        var flags;
        var callback;
        if (typeof a === 'function') {
            flags = 0;
            callback = a;
        }
        else {
            flags = a;
            callback = b;
        }
        validateCallback(callback);
        this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
    };
    Volume.prototype.linkSync = function (existingPath, newPath) {
        var existingPathFilename = pathToFilename(existingPath);
        var newPathFilename = pathToFilename(newPath);
        this.linkBase(existingPathFilename, newPathFilename);
    };
    Volume.prototype.link = function (existingPath, newPath, callback) {
        var existingPathFilename = pathToFilename(existingPath);
        var newPathFilename = pathToFilename(newPath);
        this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
    };
    Volume.prototype.unlinkBase = function (filename) {
        var steps = filenameToSteps(filename);
        var link = this.getLink(steps);
        if (!link)
            throw createError(ENOENT, 'unlink', filename);
        // TODO: Check if it is file, dir, other...
        if (link.length)
            throw Error('Dir not empty...');
        this.deleteLink(link);
        var node = link.getNode();
        node.nlink--;
        // When all hard links to i-node are deleted, remove the i-node, too.
        if (node.nlink <= 0) {
            this.deleteNode(node);
        }
    };
    Volume.prototype.unlinkSync = function (path) {
        var filename = pathToFilename(path);
        this.unlinkBase(filename);
    };
    Volume.prototype.unlink = function (path, callback) {
        var filename = pathToFilename(path);
        this.wrapAsync(this.unlinkBase, [filename], callback);
    };
    Volume.prototype.symlinkBase = function (targetFilename, pathFilename) {
        var pathSteps = filenameToSteps(pathFilename);
        // Check if directory exists, where we about to create a symlink.
        var dirLink = this.getLinkParent(pathSteps);
        if (!dirLink)
            throw createError(ENOENT, 'symlink', targetFilename, pathFilename);
        var name = pathSteps[pathSteps.length - 1];
        // Check if new file already exists.
        if (dirLink.getChild(name))
            throw createError(EEXIST, 'symlink', targetFilename, pathFilename);
        // Create symlink.
        var symlink = dirLink.createChild(name);
        symlink.getNode().makeSymlink(filenameToSteps(targetFilename));
        return symlink;
    };
    // `type` argument works only on Windows.
    Volume.prototype.symlinkSync = function (target, path, type) {
        var targetFilename = pathToFilename(target);
        var pathFilename = pathToFilename(path);
        this.symlinkBase(targetFilename, pathFilename);
    };
    Volume.prototype.symlink = function (target, path, a, b) {
        var callback = validateCallback(typeof a === 'function' ? a : b);
        var targetFilename = pathToFilename(target);
        var pathFilename = pathToFilename(path);
        this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
    };
    Volume.prototype.realpathBase = function (filename, encoding) {
        var steps = filenameToSteps(filename);
        var realLink = this.getResolvedLink(steps);
        if (!realLink)
            throw createError(ENOENT, 'realpath', filename);
        return (0, encoding_1.strToEncoding)(realLink.getPath(), encoding);
    };
    Volume.prototype.realpathSync = function (path, options) {
        return this.realpathBase(pathToFilename(path), getRealpathOptions(options).encoding);
    };
    Volume.prototype.realpath = function (path, a, b) {
        var _a = getRealpathOptsAndCb(a, b), opts = _a[0], callback = _a[1];
        var pathFilename = pathToFilename(path);
        this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
    };
    Volume.prototype.lstatBase = function (filename, bigint, throwIfNoEntry) {
        if (bigint === void 0) { bigint = false; }
        if (throwIfNoEntry === void 0) { throwIfNoEntry = false; }
        var link = this.getLink(filenameToSteps(filename));
        if (link) {
            return Stats_1.default.build(link.getNode(), bigint);
        }
        else if (!throwIfNoEntry) {
            return undefined;
        }
        else {
            throw createError(ENOENT, 'lstat', filename);
        }
    };
    Volume.prototype.lstatSync = function (path, options) {
        var _a = getStatOptions(options), _b = _a.throwIfNoEntry, throwIfNoEntry = _b === void 0 ? true : _b, _c = _a.bigint, bigint = _c === void 0 ? false : _c;
        return this.lstatBase(pathToFilename(path), bigint, throwIfNoEntry);
    };
    Volume.prototype.lstat = function (path, a, b) {
        var _a = getStatOptsAndCb(a, b), _b = _a[0], _c = _b.throwIfNoEntry, throwIfNoEntry = _c === void 0 ? true : _c, _d = _b.bigint, bigint = _d === void 0 ? false : _d, callback = _a[1];
        this.wrapAsync(this.lstatBase, [pathToFilename(path), bigint, throwIfNoEntry], callback);
    };
    Volume.prototype.statBase = function (filename, bigint, throwIfNoEntry) {
        if (bigint === void 0) { bigint = false; }
        if (throwIfNoEntry === void 0) { throwIfNoEntry = true; }
        var link = this.getResolvedLink(filenameToSteps(filename));
        if (link) {
            return Stats_1.default.build(link.getNode(), bigint);
        }
        else if (!throwIfNoEntry) {
            return undefined;
        }
        else {
            throw createError(ENOENT, 'stat', filename);
        }
    };
    Volume.prototype.statSync = function (path, options) {
        var _a = getStatOptions(options), _b = _a.bigint, bigint = _b === void 0 ? true : _b, _c = _a.throwIfNoEntry, throwIfNoEntry = _c === void 0 ? true : _c;
        return this.statBase(pathToFilename(path), bigint, throwIfNoEntry);
    };
    Volume.prototype.stat = function (path, a, b) {
        var _a = getStatOptsAndCb(a, b), _b = _a[0], _c = _b.bigint, bigint = _c === void 0 ? false : _c, _d = _b.throwIfNoEntry, throwIfNoEntry = _d === void 0 ? true : _d, callback = _a[1];
        this.wrapAsync(this.statBase, [pathToFilename(path), bigint, throwIfNoEntry], callback);
    };
    Volume.prototype.fstatBase = function (fd, bigint) {
        if (bigint === void 0) { bigint = false; }
        var file = this.getFileByFd(fd);
        if (!file)
            throw createError(EBADF, 'fstat');
        return Stats_1.default.build(file.node, bigint);
    };
    Volume.prototype.fstatSync = function (fd, options) {
        return this.fstatBase(fd, getStatOptions(options).bigint);
    };
    Volume.prototype.fstat = function (fd, a, b) {
        var _a = getStatOptsAndCb(a, b), opts = _a[0], callback = _a[1];
        this.wrapAsync(this.fstatBase, [fd, opts.bigint], callback);
    };
    Volume.prototype.renameBase = function (oldPathFilename, newPathFilename) {
        var link = this.getLink(filenameToSteps(oldPathFilename));
        if (!link)
            throw createError(ENOENT, 'rename', oldPathFilename, newPathFilename);
        // TODO: Check if it is directory, if non-empty, we cannot move it, right?
        var newPathSteps = filenameToSteps(newPathFilename);
        // Check directory exists for the new location.
        var newPathDirLink = this.getLinkParent(newPathSteps);
        if (!newPathDirLink)
            throw createError(ENOENT, 'rename', oldPathFilename, newPathFilename);
        // TODO: Also treat cases with directories and symbolic links.
        // TODO: See: http://man7.org/linux/man-pages/man2/rename.2.html
        // Remove hard link from old folder.
        var oldLinkParent = link.parent;
        if (oldLinkParent) {
            oldLinkParent.deleteChild(link);
        }
        // Rename should overwrite the new path, if that exists.
        var name = newPathSteps[newPathSteps.length - 1];
        link.name = name;
        link.steps = __spreadArray(__spreadArray([], newPathDirLink.steps, true), [name], false);
        newPathDirLink.setChild(link.getName(), link);
    };
    Volume.prototype.renameSync = function (oldPath, newPath) {
        var oldPathFilename = pathToFilename(oldPath);
        var newPathFilename = pathToFilename(newPath);
        this.renameBase(oldPathFilename, newPathFilename);
    };
    Volume.prototype.rename = function (oldPath, newPath, callback) {
        var oldPathFilename = pathToFilename(oldPath);
        var newPathFilename = pathToFilename(newPath);
        this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
    };
    Volume.prototype.existsBase = function (filename) {
        return !!this.statBase(filename);
    };
    Volume.prototype.existsSync = function (path) {
        try {
            return this.existsBase(pathToFilename(path));
        }
        catch (err) {
            return false;
        }
    };
    Volume.prototype.exists = function (path, callback) {
        var _this = this;
        var filename = pathToFilename(path);
        if (typeof callback !== 'function')
            throw Error(ERRSTR.CB);
        (0, setImmediate_1.default)(function () {
            try {
                callback(_this.existsBase(filename));
            }
            catch (err) {
                callback(false);
            }
        });
    };
    Volume.prototype.accessBase = function (filename, mode) {
        var link = this.getLinkOrThrow(filename, 'access');
        // TODO: Verify permissions
    };
    Volume.prototype.accessSync = function (path, mode) {
        if (mode === void 0) { mode = F_OK; }
        var filename = pathToFilename(path);
        mode = mode | 0;
        this.accessBase(filename, mode);
    };
    Volume.prototype.access = function (path, a, b) {
        var mode = F_OK;
        var callback;
        if (typeof a !== 'function') {
            mode = a | 0; // cast to number
            callback = validateCallback(b);
        }
        else {
            callback = a;
        }
        var filename = pathToFilename(path);
        this.wrapAsync(this.accessBase, [filename, mode], callback);
    };
    Volume.prototype.appendFileSync = function (id, data, options) {
        if (options === void 0) { options = appendFileDefaults; }
        var opts = getAppendFileOpts(options);
        // force append behavior when using a supplied file descriptor
        if (!opts.flag || isFd(id))
            opts.flag = 'a';
        this.writeFileSync(id, data, opts);
    };
    Volume.prototype.appendFile = function (id, data, a, b) {
        var _a = getAppendFileOptsAndCb(a, b), opts = _a[0], callback = _a[1];
        // force append behavior when using a supplied file descriptor
        if (!opts.flag || isFd(id))
            opts.flag = 'a';
        this.writeFile(id, data, opts, callback);
    };
    Volume.prototype.readdirBase = function (filename, options) {
        var steps = filenameToSteps(filename);
        var link = this.getResolvedLink(steps);
        if (!link)
            throw createError(ENOENT, 'readdir', filename);
        var node = link.getNode();
        if (!node.isDirectory())
            throw createError(ENOTDIR, 'scandir', filename);
        if (options.withFileTypes) {
            var list_1 = [];
            for (var name_2 in link.children) {
                var child = link.getChild(name_2);
                if (!child) {
                    continue;
                }
                list_1.push(Dirent_1.default.build(child, options.encoding));
            }
            if (!isWin && options.encoding !== 'buffer')
                list_1.sort(function (a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
            return list_1;
        }
        var list = [];
        for (var name_3 in link.children) {
            list.push((0, encoding_1.strToEncoding)(name_3, options.encoding));
        }
        if (!isWin && options.encoding !== 'buffer')
            list.sort();
        return list;
    };
    Volume.prototype.readdirSync = function (path, options) {
        var opts = getReaddirOptions(options);
        var filename = pathToFilename(path);
        return this.readdirBase(filename, opts);
    };
    Volume.prototype.readdir = function (path, a, b) {
        var _a = getReaddirOptsAndCb(a, b), options = _a[0], callback = _a[1];
        var filename = pathToFilename(path);
        this.wrapAsync(this.readdirBase, [filename, options], callback);
    };
    Volume.prototype.readlinkBase = function (filename, encoding) {
        var link = this.getLinkOrThrow(filename, 'readlink');
        var node = link.getNode();
        if (!node.isSymlink())
            throw createError(EINVAL, 'readlink', filename);
        var str = sep + node.symlink.join(sep);
        return (0, encoding_1.strToEncoding)(str, encoding);
    };
    Volume.prototype.readlinkSync = function (path, options) {
        var opts = getDefaultOpts(options);
        var filename = pathToFilename(path);
        return this.readlinkBase(filename, opts.encoding);
    };
    Volume.prototype.readlink = function (path, a, b) {
        var _a = getDefaultOptsAndCb(a, b), opts = _a[0], callback = _a[1];
        var filename = pathToFilename(path);
        this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
    };
    Volume.prototype.fsyncBase = function (fd) {
        this.getFileByFdOrThrow(fd, 'fsync');
    };
    Volume.prototype.fsyncSync = function (fd) {
        this.fsyncBase(fd);
    };
    Volume.prototype.fsync = function (fd, callback) {
        this.wrapAsync(this.fsyncBase, [fd], callback);
    };
    Volume.prototype.fdatasyncBase = function (fd) {
        this.getFileByFdOrThrow(fd, 'fdatasync');
    };
    Volume.prototype.fdatasyncSync = function (fd) {
        this.fdatasyncBase(fd);
    };
    Volume.prototype.fdatasync = function (fd, callback) {
        this.wrapAsync(this.fdatasyncBase, [fd], callback);
    };
    Volume.prototype.ftruncateBase = function (fd, len) {
        var file = this.getFileByFdOrThrow(fd, 'ftruncate');
        file.truncate(len);
    };
    Volume.prototype.ftruncateSync = function (fd, len) {
        this.ftruncateBase(fd, len);
    };
    Volume.prototype.ftruncate = function (fd, a, b) {
        var len = typeof a === 'number' ? a : 0;
        var callback = validateCallback(typeof a === 'number' ? b : a);
        this.wrapAsync(this.ftruncateBase, [fd, len], callback);
    };
    Volume.prototype.truncateBase = function (path, len) {
        var fd = this.openSync(path, 'r+');
        try {
            this.ftruncateSync(fd, len);
        }
        finally {
            this.closeSync(fd);
        }
    };
    Volume.prototype.truncateSync = function (id, len) {
        if (isFd(id))
            return this.ftruncateSync(id, len);
        this.truncateBase(id, len);
    };
    Volume.prototype.truncate = function (id, a, b) {
        var len = typeof a === 'number' ? a : 0;
        var callback = validateCallback(typeof a === 'number' ? b : a);
        if (isFd(id))
            return this.ftruncate(id, len, callback);
        this.wrapAsync(this.truncateBase, [id, len], callback);
    };
    Volume.prototype.futimesBase = function (fd, atime, mtime) {
        var file = this.getFileByFdOrThrow(fd, 'futimes');
        var node = file.node;
        node.atime = new Date(atime * 1000);
        node.mtime = new Date(mtime * 1000);
    };
    Volume.prototype.futimesSync = function (fd, atime, mtime) {
        this.futimesBase(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };
    Volume.prototype.futimes = function (fd, atime, mtime, callback) {
        this.wrapAsync(this.futimesBase, [fd, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };
    Volume.prototype.utimesBase = function (filename, atime, mtime) {
        var fd = this.openSync(filename, 'r+');
        try {
            this.futimesBase(fd, atime, mtime);
        }
        finally {
            this.closeSync(fd);
        }
    };
    Volume.prototype.utimesSync = function (path, atime, mtime) {
        this.utimesBase(pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };
    Volume.prototype.utimes = function (path, atime, mtime, callback) {
        this.wrapAsync(this.utimesBase, [pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };
    Volume.prototype.mkdirBase = function (filename, modeNum) {
        var steps = filenameToSteps(filename);
        // This will throw if user tries to create root dir `fs.mkdirSync('/')`.
        if (!steps.length) {
            throw createError(EEXIST, 'mkdir', filename);
        }
        var dir = this.getLinkParentAsDirOrThrow(filename, 'mkdir');
        // Check path already exists.
        var name = steps[steps.length - 1];
        if (dir.getChild(name))
            throw createError(EEXIST, 'mkdir', filename);
        dir.createChild(name, this.createNode(true, modeNum));
    };
    /**
     * Creates directory tree recursively.
     * @param filename
     * @param modeNum
     */
    Volume.prototype.mkdirpBase = function (filename, modeNum) {
        var steps = filenameToSteps(filename);
        var link = this.root;
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (!link.getNode().isDirectory())
                throw createError(ENOTDIR, 'mkdir', link.getPath());
            var child = link.getChild(step);
            if (child) {
                if (child.getNode().isDirectory())
                    link = child;
                else
                    throw createError(ENOTDIR, 'mkdir', child.getPath());
            }
            else {
                link = link.createChild(step, this.createNode(true, modeNum));
            }
        }
    };
    Volume.prototype.mkdirSync = function (path, options) {
        var opts = getMkdirOptions(options);
        var modeNum = modeToNumber(opts.mode, 511);
        var filename = pathToFilename(path);
        if (opts.recursive)
            this.mkdirpBase(filename, modeNum);
        else
            this.mkdirBase(filename, modeNum);
    };
    Volume.prototype.mkdir = function (path, a, b) {
        var opts = getMkdirOptions(a);
        var callback = validateCallback(typeof a === 'function' ? a : b);
        var modeNum = modeToNumber(opts.mode, 511);
        var filename = pathToFilename(path);
        if (opts.recursive)
            this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);
        else
            this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
    };
    // legacy interface
    Volume.prototype.mkdirpSync = function (path, mode) {
        this.mkdirSync(path, { mode: mode, recursive: true });
    };
    Volume.prototype.mkdirp = function (path, a, b) {
        var mode = typeof a === 'function' ? undefined : a;
        var callback = validateCallback(typeof a === 'function' ? a : b);
        this.mkdir(path, { mode: mode, recursive: true }, callback);
    };
    Volume.prototype.mkdtempBase = function (prefix, encoding, retry) {
        if (retry === void 0) { retry = 5; }
        var filename = prefix + this.genRndStr();
        try {
            this.mkdirBase(filename, 511 /* MODE.DIR */);
            return (0, encoding_1.strToEncoding)(filename, encoding);
        }
        catch (err) {
            if (err.code === EEXIST) {
                if (retry > 1)
                    return this.mkdtempBase(prefix, encoding, retry - 1);
                else
                    throw Error('Could not create temp dir.');
            }
            else
                throw err;
        }
    };
    Volume.prototype.mkdtempSync = function (prefix, options) {
        var encoding = getDefaultOpts(options).encoding;
        if (!prefix || typeof prefix !== 'string')
            throw new TypeError('filename prefix is required');
        nullCheck(prefix);
        return this.mkdtempBase(prefix, encoding);
    };
    Volume.prototype.mkdtemp = function (prefix, a, b) {
        var _a = getDefaultOptsAndCb(a, b), encoding = _a[0].encoding, callback = _a[1];
        if (!prefix || typeof prefix !== 'string')
            throw new TypeError('filename prefix is required');
        if (!nullCheck(prefix))
            return;
        this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
    };
    Volume.prototype.rmdirBase = function (filename, options) {
        var opts = getRmdirOptions(options);
        var link = this.getLinkAsDirOrThrow(filename, 'rmdir');
        // Check directory is empty.
        if (link.length && !opts.recursive)
            throw createError(ENOTEMPTY, 'rmdir', filename);
        this.deleteLink(link);
    };
    Volume.prototype.rmdirSync = function (path, options) {
        this.rmdirBase(pathToFilename(path), options);
    };
    Volume.prototype.rmdir = function (path, a, b) {
        var opts = getRmdirOptions(a);
        var callback = validateCallback(typeof a === 'function' ? a : b);
        this.wrapAsync(this.rmdirBase, [pathToFilename(path), opts], callback);
    };
    Volume.prototype.rmBase = function (filename, options) {
        if (options === void 0) { options = {}; }
        var link = this.getResolvedLink(filename);
        if (!link) {
            // "stat" is used to match Node's native error message.
            if (!options.force)
                throw createError(ENOENT, 'stat', filename);
            return;
        }
        if (link.getNode().isDirectory()) {
            if (!options.recursive) {
                throw createError(ERR_FS_EISDIR, 'rm', filename);
            }
        }
        this.deleteLink(link);
    };
    Volume.prototype.rmSync = function (path, options) {
        this.rmBase(pathToFilename(path), options);
    };
    Volume.prototype.rm = function (path, a, b) {
        var _a = getRmOptsAndCb(a, b), opts = _a[0], callback = _a[1];
        this.wrapAsync(this.rmBase, [pathToFilename(path), opts], callback);
    };
    Volume.prototype.fchmodBase = function (fd, modeNum) {
        var file = this.getFileByFdOrThrow(fd, 'fchmod');
        file.chmod(modeNum);
    };
    Volume.prototype.fchmodSync = function (fd, mode) {
        this.fchmodBase(fd, modeToNumber(mode));
    };
    Volume.prototype.fchmod = function (fd, mode, callback) {
        this.wrapAsync(this.fchmodBase, [fd, modeToNumber(mode)], callback);
    };
    Volume.prototype.chmodBase = function (filename, modeNum) {
        var fd = this.openSync(filename, 'r+');
        try {
            this.fchmodBase(fd, modeNum);
        }
        finally {
            this.closeSync(fd);
        }
    };
    Volume.prototype.chmodSync = function (path, mode) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.chmodBase(filename, modeNum);
    };
    Volume.prototype.chmod = function (path, mode, callback) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
    };
    Volume.prototype.lchmodBase = function (filename, modeNum) {
        var fd = this.openBase(filename, O_RDWR, 0, false);
        try {
            this.fchmodBase(fd, modeNum);
        }
        finally {
            this.closeSync(fd);
        }
    };
    Volume.prototype.lchmodSync = function (path, mode) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.lchmodBase(filename, modeNum);
    };
    Volume.prototype.lchmod = function (path, mode, callback) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
    };
    Volume.prototype.fchownBase = function (fd, uid, gid) {
        this.getFileByFdOrThrow(fd, 'fchown').chown(uid, gid);
    };
    Volume.prototype.fchownSync = function (fd, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.fchownBase(fd, uid, gid);
    };
    Volume.prototype.fchown = function (fd, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.fchownBase, [fd, uid, gid], callback);
    };
    Volume.prototype.chownBase = function (filename, uid, gid) {
        var link = this.getResolvedLinkOrThrow(filename, 'chown');
        var node = link.getNode();
        node.chown(uid, gid);
        // if(node.isFile() || node.isSymlink()) {
        //
        // } else if(node.isDirectory()) {
        //
        // } else {
        // TODO: What do we do here?
        // }
    };
    Volume.prototype.chownSync = function (path, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.chownBase(pathToFilename(path), uid, gid);
    };
    Volume.prototype.chown = function (path, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.chownBase, [pathToFilename(path), uid, gid], callback);
    };
    Volume.prototype.lchownBase = function (filename, uid, gid) {
        this.getLinkOrThrow(filename, 'lchown').getNode().chown(uid, gid);
    };
    Volume.prototype.lchownSync = function (path, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.lchownBase(pathToFilename(path), uid, gid);
    };
    Volume.prototype.lchown = function (path, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.lchownBase, [pathToFilename(path), uid, gid], callback);
    };
    Volume.prototype.watchFile = function (path, a, b) {
        var filename = pathToFilename(path);
        var options = a;
        var listener = b;
        if (typeof options === 'function') {
            listener = a;
            options = null;
        }
        if (typeof listener !== 'function') {
            throw Error('"watchFile()" requires a listener function');
        }
        var interval = 5007;
        var persistent = true;
        if (options && typeof options === 'object') {
            if (typeof options.interval === 'number')
                interval = options.interval;
            if (typeof options.persistent === 'boolean')
                persistent = options.persistent;
        }
        var watcher = this.statWatchers[filename];
        if (!watcher) {
            watcher = new this.StatWatcher();
            watcher.start(filename, persistent, interval);
            this.statWatchers[filename] = watcher;
        }
        watcher.addListener('change', listener);
        return watcher;
    };
    Volume.prototype.unwatchFile = function (path, listener) {
        var filename = pathToFilename(path);
        var watcher = this.statWatchers[filename];
        if (!watcher)
            return;
        if (typeof listener === 'function') {
            watcher.removeListener('change', listener);
        }
        else {
            watcher.removeAllListeners('change');
        }
        if (watcher.listenerCount('change') === 0) {
            watcher.stop();
            delete this.statWatchers[filename];
        }
    };
    Volume.prototype.createReadStream = function (path, options) {
        return new this.ReadStream(path, options);
    };
    Volume.prototype.createWriteStream = function (path, options) {
        return new this.WriteStream(path, options);
    };
    // watch(path: PathLike): FSWatcher;
    // watch(path: PathLike, options?: IWatchOptions | string): FSWatcher;
    Volume.prototype.watch = function (path, options, listener) {
        var filename = pathToFilename(path);
        var givenOptions = options;
        if (typeof options === 'function') {
            listener = options;
            givenOptions = null;
        }
        // tslint:disable-next-line prefer-const
        var _a = getDefaultOpts(givenOptions), persistent = _a.persistent, recursive = _a.recursive, encoding = _a.encoding;
        if (persistent === undefined)
            persistent = true;
        if (recursive === undefined)
            recursive = false;
        var watcher = new this.FSWatcher();
        watcher.start(filename, persistent, recursive, encoding);
        if (listener) {
            watcher.addListener('change', listener);
        }
        return watcher;
    };
    /**
     * Global file descriptor counter. UNIX file descriptors start from 0 and go sequentially
     * up, so here, in order not to conflict with them, we choose some big number and descrease
     * the file descriptor of every new opened file.
     * @type {number}
     * @todo This should not be static, right?
     */
    Volume.fd = 0x7fffffff;
    return Volume;
}());
exports.Volume = Volume;
function emitStop(self) {
    self.emit('stop');
}
var StatWatcher = /** @class */ (function (_super) {
    __extends(StatWatcher, _super);
    function StatWatcher(vol) {
        var _this = _super.call(this) || this;
        _this.onInterval = function () {
            try {
                var stats = _this.vol.statSync(_this.filename);
                if (_this.hasChanged(stats)) {
                    _this.emit('change', stats, _this.prev);
                    _this.prev = stats;
                }
            }
            finally {
                _this.loop();
            }
        };
        _this.vol = vol;
        return _this;
    }
    StatWatcher.prototype.loop = function () {
        this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
    };
    StatWatcher.prototype.hasChanged = function (stats) {
        // if(!this.prev) return false;
        if (stats.mtimeMs > this.prev.mtimeMs)
            return true;
        if (stats.nlink !== this.prev.nlink)
            return true;
        return false;
    };
    StatWatcher.prototype.start = function (path, persistent, interval) {
        if (persistent === void 0) { persistent = true; }
        if (interval === void 0) { interval = 5007; }
        this.filename = pathToFilename(path);
        this.setTimeout = persistent
            ? setTimeout.bind(typeof globalThis !== 'undefined' ? globalThis : global)
            : setTimeoutUnref_1.default;
        this.interval = interval;
        this.prev = this.vol.statSync(this.filename);
        this.loop();
    };
    StatWatcher.prototype.stop = function () {
        clearTimeout(this.timeoutRef);
        process_1.default.nextTick(emitStop, this);
    };
    return StatWatcher;
}(events_1.EventEmitter));
exports.StatWatcher = StatWatcher;
var pool;
function allocNewPool(poolSize) {
    pool = (0, buffer_1.bufferAllocUnsafe)(poolSize);
    pool.used = 0;
}
util.inherits(FsReadStream, stream_1.Readable);
exports.ReadStream = FsReadStream;
function FsReadStream(vol, path, options) {
    if (!(this instanceof FsReadStream))
        return new FsReadStream(vol, path, options);
    this._vol = vol;
    // a little bit bigger buffer and water marks by default
    options = Object.assign({}, getOptions(options, {}));
    if (options.highWaterMark === undefined)
        options.highWaterMark = 64 * 1024;
    stream_1.Readable.call(this, options);
    this.path = pathToFilename(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? 'r' : options.flags;
    this.mode = options.mode === undefined ? 438 : options.mode;
    this.start = options.start;
    this.end = options.end;
    this.autoClose = options.autoClose === undefined ? true : options.autoClose;
    this.pos = undefined;
    this.bytesRead = 0;
    if (this.start !== undefined) {
        if (typeof this.start !== 'number') {
            throw new TypeError('"start" option must be a Number');
        }
        if (this.end === undefined) {
            this.end = Infinity;
        }
        else if (typeof this.end !== 'number') {
            throw new TypeError('"end" option must be a Number');
        }
        if (this.start > this.end) {
            throw new Error('"start" option must be <= "end" option');
        }
        this.pos = this.start;
    }
    if (typeof this.fd !== 'number')
        this.open();
    this.on('end', function () {
        if (this.autoClose) {
            if (this.destroy)
                this.destroy();
        }
    });
}
FsReadStream.prototype.open = function () {
    var self = this; // tslint:disable-line no-this-assignment
    this._vol.open(this.path, this.flags, this.mode, function (er, fd) {
        if (er) {
            if (self.autoClose) {
                if (self.destroy)
                    self.destroy();
            }
            self.emit('error', er);
            return;
        }
        self.fd = fd;
        self.emit('open', fd);
        // start the flow of data.
        self.read();
    });
};
FsReadStream.prototype._read = function (n) {
    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._read(n);
        });
    }
    if (this.destroyed)
        return;
    if (!pool || pool.length - pool.used < kMinPoolSpace) {
        // discard the old pool.
        allocNewPool(this._readableState.highWaterMark);
    }
    // Grab another reference to the pool in the case that while we're
    // in the thread pool another read() finishes up the pool, and
    // allocates a new one.
    var thisPool = pool;
    var toRead = Math.min(pool.length - pool.used, n);
    var start = pool.used;
    if (this.pos !== undefined)
        toRead = Math.min(this.end - this.pos + 1, toRead);
    // already read everything we were supposed to read!
    // treat as EOF.
    if (toRead <= 0)
        return this.push(null);
    // the actual read.
    var self = this; // tslint:disable-line no-this-assignment
    this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
    // move the pool positions, and internal position for reading.
    if (this.pos !== undefined)
        this.pos += toRead;
    pool.used += toRead;
    function onread(er, bytesRead) {
        if (er) {
            if (self.autoClose && self.destroy) {
                self.destroy();
            }
            self.emit('error', er);
        }
        else {
            var b = null;
            if (bytesRead > 0) {
                self.bytesRead += bytesRead;
                b = thisPool.slice(start, start + bytesRead);
            }
            self.push(b);
        }
    }
};
FsReadStream.prototype._destroy = function (err, cb) {
    this.close(function (err2) {
        cb(err || err2);
    });
};
FsReadStream.prototype.close = function (cb) {
    var _this = this;
    var _a;
    if (cb)
        this.once('close', cb);
    if (this.closed || typeof this.fd !== 'number') {
        if (typeof this.fd !== 'number') {
            this.once('open', closeOnOpen);
            return;
        }
        return process_1.default.nextTick(function () { return _this.emit('close'); });
    }
    // Since Node 18, there is only a getter for '.closed'.
    // The first branch mimics other setters from Readable.
    // See https://github.com/nodejs/node/blob/v18.0.0/lib/internal/streams/readable.js#L1243
    if (typeof ((_a = this._readableState) === null || _a === void 0 ? void 0 : _a.closed) === 'boolean') {
        this._readableState.closed = true;
    }
    else {
        this.closed = true;
    }
    this._vol.close(this.fd, function (er) {
        if (er)
            _this.emit('error', er);
        else
            _this.emit('close');
    });
    this.fd = null;
};
// needed because as it will be called with arguments
// that does not match this.close() signature
function closeOnOpen(fd) {
    this.close();
}
util.inherits(FsWriteStream, stream_1.Writable);
exports.WriteStream = FsWriteStream;
function FsWriteStream(vol, path, options) {
    if (!(this instanceof FsWriteStream))
        return new FsWriteStream(vol, path, options);
    this._vol = vol;
    options = Object.assign({}, getOptions(options, {}));
    stream_1.Writable.call(this, options);
    this.path = pathToFilename(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? 'w' : options.flags;
    this.mode = options.mode === undefined ? 438 : options.mode;
    this.start = options.start;
    this.autoClose = options.autoClose === undefined ? true : !!options.autoClose;
    this.pos = undefined;
    this.bytesWritten = 0;
    if (this.start !== undefined) {
        if (typeof this.start !== 'number') {
            throw new TypeError('"start" option must be a Number');
        }
        if (this.start < 0) {
            throw new Error('"start" must be >= zero');
        }
        this.pos = this.start;
    }
    if (options.encoding)
        this.setDefaultEncoding(options.encoding);
    if (typeof this.fd !== 'number')
        this.open();
    // dispose on finish.
    this.once('finish', function () {
        if (this.autoClose) {
            this.close();
        }
    });
}
FsWriteStream.prototype.open = function () {
    this._vol.open(this.path, this.flags, this.mode, function (er, fd) {
        if (er) {
            if (this.autoClose && this.destroy) {
                this.destroy();
            }
            this.emit('error', er);
            return;
        }
        this.fd = fd;
        this.emit('open', fd);
    }.bind(this));
};
FsWriteStream.prototype._write = function (data, encoding, cb) {
    if (!(data instanceof buffer_1.Buffer || data instanceof Uint8Array))
        return this.emit('error', new Error('Invalid data'));
    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._write(data, encoding, cb);
        });
    }
    var self = this; // tslint:disable-line no-this-assignment
    this._vol.write(this.fd, data, 0, data.length, this.pos, function (er, bytes) {
        if (er) {
            if (self.autoClose && self.destroy) {
                self.destroy();
            }
            return cb(er);
        }
        self.bytesWritten += bytes;
        cb();
    });
    if (this.pos !== undefined)
        this.pos += data.length;
};
FsWriteStream.prototype._writev = function (data, cb) {
    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._writev(data, cb);
        });
    }
    var self = this; // tslint:disable-line no-this-assignment
    var len = data.length;
    var chunks = new Array(len);
    var size = 0;
    for (var i = 0; i < len; i++) {
        var chunk = data[i].chunk;
        chunks[i] = chunk;
        size += chunk.length;
    }
    var buf = buffer_1.Buffer.concat(chunks);
    this._vol.write(this.fd, buf, 0, buf.length, this.pos, function (er, bytes) {
        if (er) {
            if (self.destroy)
                self.destroy();
            return cb(er);
        }
        self.bytesWritten += bytes;
        cb();
    });
    if (this.pos !== undefined)
        this.pos += size;
};
FsWriteStream.prototype.close = function (cb) {
    var _this = this;
    var _a;
    if (cb)
        this.once('close', cb);
    if (this.closed || typeof this.fd !== 'number') {
        if (typeof this.fd !== 'number') {
            this.once('open', closeOnOpen);
            return;
        }
        return process_1.default.nextTick(function () { return _this.emit('close'); });
    }
    // Since Node 18, there is only a getter for '.closed'.
    // The first branch mimics other setters from Writable.
    // See https://github.com/nodejs/node/blob/v18.0.0/lib/internal/streams/writable.js#L766
    if (typeof ((_a = this._writableState) === null || _a === void 0 ? void 0 : _a.closed) === 'boolean') {
        this._writableState.closed = true;
    }
    else {
        this.closed = true;
    }
    this._vol.close(this.fd, function (er) {
        if (er)
            _this.emit('error', er);
        else
            _this.emit('close');
    });
    this.fd = null;
};
FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
// There is no shutdown() for files.
FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
// ---------------------------------------- FSWatcher
var FSWatcher = /** @class */ (function (_super) {
    __extends(FSWatcher, _super);
    function FSWatcher(vol) {
        var _this = _super.call(this) || this;
        _this._filename = '';
        _this._filenameEncoded = '';
        // _persistent: boolean = true;
        _this._recursive = false;
        _this._encoding = encoding_1.ENCODING_UTF8;
        _this._onNodeChange = function () {
            _this._emit('change');
        };
        _this._onParentChild = function (link) {
            if (link.getName() === _this._getName()) {
                _this._emit('rename');
            }
        };
        _this._emit = function (type) {
            _this.emit('change', type, _this._filenameEncoded);
        };
        _this._persist = function () {
            _this._timer = setTimeout(_this._persist, 1e6);
        };
        _this._vol = vol;
        return _this;
        // TODO: Emit "error" messages when watching.
        // this._handle.onchange = function(status, eventType, filename) {
        //     if (status < 0) {
        //         self._handle.close();
        //         const error = !filename ?
        //             errnoException(status, 'Error watching file for changes:') :
        //             errnoException(status, `Error watching file ${filename} for changes:`);
        //         error.filename = filename;
        //         self.emit('error', error);
        //     } else {
        //         self.emit('change', eventType, filename);
        //     }
        // };
    }
    FSWatcher.prototype._getName = function () {
        return this._steps[this._steps.length - 1];
    };
    FSWatcher.prototype.start = function (path, persistent, recursive, encoding) {
        if (persistent === void 0) { persistent = true; }
        if (recursive === void 0) { recursive = false; }
        if (encoding === void 0) { encoding = encoding_1.ENCODING_UTF8; }
        this._filename = pathToFilename(path);
        this._steps = filenameToSteps(this._filename);
        this._filenameEncoded = (0, encoding_1.strToEncoding)(this._filename);
        // this._persistent = persistent;
        this._recursive = recursive;
        this._encoding = encoding;
        try {
            this._link = this._vol.getLinkOrThrow(this._filename, 'FSWatcher');
        }
        catch (err) {
            var error = new Error("watch ".concat(this._filename, " ").concat(err.code));
            error.code = err.code;
            error.errno = err.code;
            throw error;
        }
        this._link.getNode().on('change', this._onNodeChange);
        this._link.on('child:add', this._onNodeChange);
        this._link.on('child:delete', this._onNodeChange);
        var parent = this._link.parent;
        if (parent) {
            // parent.on('child:add', this._onParentChild);
            parent.setMaxListeners(parent.getMaxListeners() + 1);
            parent.on('child:delete', this._onParentChild);
        }
        if (persistent)
            this._persist();
    };
    FSWatcher.prototype.close = function () {
        clearTimeout(this._timer);
        this._link.getNode().removeListener('change', this._onNodeChange);
        var parent = this._link.parent;
        if (parent) {
            // parent.removeListener('child:add', this._onParentChild);
            parent.removeListener('child:delete', this._onParentChild);
        }
    };
    return FSWatcher;
}(events_1.EventEmitter));
exports.FSWatcher = FSWatcher;


/***/ }),

/***/ 7192:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint consistent-this: 0, no-shadow:0, no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

// Support for asynchronous functions



var aFrom        = __nccwpck_require__(2406)
  , objectMap    = __nccwpck_require__(7289)
  , mixin        = __nccwpck_require__(1070)
  , defineLength = __nccwpck_require__(1490)
  , nextTick     = __nccwpck_require__(4152);

var slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create;

(__nccwpck_require__(4334).async) = function (tbi, conf) {
	var waiting = create(null)
	  , cache = create(null)
	  , base = conf.memoized
	  , original = conf.original
	  , currentCallback
	  , currentContext
	  , currentArgs;

	// Initial
	conf.memoized = defineLength(function (arg) {
		var args = arguments, last = args[args.length - 1];
		if (typeof last === "function") {
			currentCallback = last;
			args = slice.call(args, 0, -1);
		}
		return base.apply(currentContext = this, currentArgs = args);
	}, base);
	try { mixin(conf.memoized, base); }
	catch (ignore) {}

	// From cache (sync)
	conf.on("get", function (id) {
		var cb, context, args;
		if (!currentCallback) return;

		// Unresolved
		if (waiting[id]) {
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback];
			else waiting[id].push(currentCallback);
			currentCallback = null;
			return;
		}

		// Resolved, assure next tick invocation
		cb = currentCallback;
		context = currentContext;
		args = currentArgs;
		currentCallback = currentContext = currentArgs = null;
		nextTick(function () {
			var data;
			if (hasOwnProperty.call(cache, id)) {
				data = cache[id];
				conf.emit("getasync", id, args, context);
				apply.call(cb, data.context, data.args);
			} else {
				// Purged in a meantime, we shouldn't rely on cached value, recall
				currentCallback = cb;
				currentContext = context;
				currentArgs = args;
				base.apply(context, args);
			}
		});
	});

	// Not from cache
	conf.original = function () {
		var args, cb, origCb, result;
		if (!currentCallback) return apply.call(original, this, arguments);
		args = aFrom(arguments);
		cb = function self(err) {
			var cb, args, id = self.id;
			if (id == null) {
				// Shouldn't happen, means async callback was called sync way
				nextTick(apply.bind(self, this, arguments));
				return undefined;
			}
			delete self.id;
			cb = waiting[id];
			delete waiting[id];
			if (!cb) {
				// Already processed,
				// outcome of race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
				return undefined;
			}
			args = aFrom(arguments);
			if (conf.has(id)) {
				if (err) {
					conf.delete(id);
				} else {
					cache[id] = { context: this, args: args };
					conf.emit("setasync", id, typeof cb === "function" ? 1 : cb.length);
				}
			}
			if (typeof cb === "function") {
				result = apply.call(cb, this, args);
			} else {
				cb.forEach(function (cb) { result = apply.call(cb, this, args); }, this);
			}
			return result;
		};
		origCb = currentCallback;
		currentCallback = currentContext = currentArgs = null;
		args.push(cb);
		result = apply.call(original, this, args);
		cb.cb = origCb;
		currentCallback = cb;
		return result;
	};

	// After not from cache call
	conf.on("set", function (id) {
		if (!currentCallback) {
			conf.delete(id);
			return;
		}
		if (waiting[id]) {
			// Race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback.cb];
			else waiting[id].push(currentCallback.cb);
		} else {
			waiting[id] = currentCallback.cb;
		}
		delete currentCallback.cb;
		currentCallback.id = id;
		currentCallback = null;
	});

	// On delete
	conf.on("delete", function (id) {
		var result;
		// If false, we don't have value yet, so we assume that intention is not
		// to memoize this call. After value is obtained we don't cache it but
		// gracefully pass to callback
		if (hasOwnProperty.call(waiting, id)) return;
		if (!cache[id]) return;
		result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, slice.call(result.args, 1));
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		conf.emit(
			"clearasync", objectMap(oldCache, function (data) { return slice.call(data.args, 1); })
		);
	});
};


/***/ }),

/***/ 6245:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Call dispose callback on each cache purge



var callable   = __nccwpck_require__(6097)
  , forEach    = __nccwpck_require__(9575)
  , extensions = __nccwpck_require__(4334)

  , apply = Function.prototype.apply;

extensions.dispose = function (dispose, conf, options) {
	var del;
	callable(dispose);
	if ((options.async && extensions.async) || (options.promise && extensions.promise)) {
		conf.on("deleteasync", del = function (id, resultArray) {
			apply.call(dispose, null, resultArray);
		});
		conf.on("clearasync", function (cache) {
			forEach(cache, function (result, id) {
 del(id, result);
});
		});
		return;
	}
	conf.on("delete", del = function (id, result) {
 dispose(result);
});
	conf.on("clear", function (cache) {
		forEach(cache, function (result, id) {
 del(id, result);
});
	});
};


/***/ }),

/***/ 9474:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint consistent-this: 0 */

// Timeout cached values



var aFrom      = __nccwpck_require__(2406)
  , forEach    = __nccwpck_require__(9575)
  , nextTick   = __nccwpck_require__(4152)
  , isPromise  = __nccwpck_require__(8794)
  , timeout    = __nccwpck_require__(9953)
  , extensions = __nccwpck_require__(4334);

var noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;

extensions.maxAge = function (maxAge, conf, options) {
	var timeouts, postfix, preFetchAge, preFetchTimeouts;

	maxAge = timeout(maxAge);
	if (!maxAge) return;

	timeouts = create(null);
	postfix =
		(options.async && extensions.async) || (options.promise && extensions.promise)
			? "async"
			: "";
	conf.on("set" + postfix, function (id) {
		timeouts[id] = setTimeout(function () { conf.delete(id); }, maxAge);
		if (typeof timeouts[id].unref === "function") timeouts[id].unref();
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id]) {
			if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		}
		preFetchTimeouts[id] = setTimeout(function () {
			delete preFetchTimeouts[id];
		}, preFetchAge);
		if (typeof preFetchTimeouts[id].unref === "function") preFetchTimeouts[id].unref();
	});
	conf.on("delete" + postfix, function (id) {
		clearTimeout(timeouts[id]);
		delete timeouts[id];
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		delete preFetchTimeouts[id];
	});

	if (options.preFetch) {
		if (options.preFetch === true || isNaN(options.preFetch)) {
			preFetchAge = 0.333;
		} else {
			preFetchAge = max(min(Number(options.preFetch), 1), 0);
		}
		if (preFetchAge) {
			preFetchTimeouts = {};
			preFetchAge = (1 - preFetchAge) * maxAge;
			conf.on("get" + postfix, function (id, args, context) {
				if (!preFetchTimeouts[id]) {
					preFetchTimeouts[id] = "nextTick";
					nextTick(function () {
						var result;
						if (preFetchTimeouts[id] !== "nextTick") return;
						delete preFetchTimeouts[id];
						conf.delete(id);
						if (options.async) {
							args = aFrom(args);
							args.push(noop);
						}
						result = conf.memoized.apply(context, args);
						if (options.promise) {
							// Supress eventual error warnings
							if (isPromise(result)) {
								if (typeof result.done === "function") result.done(noop, noop);
								else result.then(noop, noop);
							}
						}
					});
				}
			});
		}
	}

	conf.on("clear" + postfix, function () {
		forEach(timeouts, function (id) { clearTimeout(id); });
		timeouts = {};
		if (preFetchTimeouts) {
			forEach(preFetchTimeouts, function (id) { if (id !== "nextTick") clearTimeout(id); });
			preFetchTimeouts = {};
		}
	});
};


/***/ }),

/***/ 1233:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Limit cache size, LRU (least recently used) algorithm.



var toPosInteger = __nccwpck_require__(3755)
  , lruQueue     = __nccwpck_require__(9537)
  , extensions   = __nccwpck_require__(4334);

extensions.max = function (max, conf, options) {
	var postfix, queue, hit;

	max = toPosInteger(max);
	if (!max) return;

	queue = lruQueue(max);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, hit = function (id) {
		id = queue.hit(id);
		if (id === undefined) return;
		conf.delete(id);
	});
	conf.on("get" + postfix, hit);
	conf.on("delete" + postfix, queue.delete);
	conf.on("clear" + postfix, queue.clear);
};


/***/ }),

/***/ 5796:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint max-statements: 0 */

// Support for functions returning promise



var objectMap     = __nccwpck_require__(7289)
  , primitiveSet  = __nccwpck_require__(2796)
  , ensureString  = __nccwpck_require__(8080)
  , toShortString = __nccwpck_require__(3298)
  , isPromise     = __nccwpck_require__(8794)
  , nextTick      = __nccwpck_require__(4152);

var create = Object.create
  , supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");

(__nccwpck_require__(4334).promise) = function (mode, conf) {
	var waiting = create(null), cache = create(null), promises = create(null);

	if (mode === true) {
		mode = null;
	} else {
		mode = ensureString(mode);
		if (!supportedModes[mode]) {
			throw new TypeError("'" + toShortString(mode) + "' is not valid promise mode");
		}
	}

	// After not from cache call
	conf.on("set", function (id, ignore, promise) {
		var isFailed = false;

		if (!isPromise(promise)) {
			// Non promise result
			cache[id] = promise;
			conf.emit("setasync", id, 1);
			return;
		}
		waiting[id] = 1;
		promises[id] = promise;
		var onSuccess = function (result) {
			var count = waiting[id];
			if (isFailed) {
				throw new Error(
					"Memoizee error: Detected unordered then|done & finally resolution, which " +
						"in turn makes proper detection of success/failure impossible (when in " +
						"'done:finally' mode)\n" +
						"Consider to rely on 'then' or 'done' mode instead."
				);
			}
			if (!count) return; // Deleted from cache before resolved
			delete waiting[id];
			cache[id] = result;
			conf.emit("setasync", id, count);
		};
		var onFailure = function () {
			isFailed = true;
			if (!waiting[id]) return; // Deleted from cache (or succeed in case of finally)
			delete waiting[id];
			delete promises[id];
			conf.delete(id);
		};

		var resolvedMode = mode;
		if (!resolvedMode) resolvedMode = "then";

		if (resolvedMode === "then") {
			var nextTickFailure = function () { nextTick(onFailure); };
			// Eventual finally needs to be attached to non rejected promise
			// (so we not force propagation of unhandled rejection)
			promise = promise.then(function (result) {
				nextTick(onSuccess.bind(this, result));
			}, nextTickFailure);
			// If `finally` is a function we attach to it to remove cancelled promises.
			if (typeof promise.finally === "function") {
				promise.finally(nextTickFailure);
			}
		} else if (resolvedMode === "done") {
			// Not recommended, as it may mute any eventual "Unhandled error" events
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done' mode"
				);
			}
			promise.done(onSuccess, onFailure);
		} else if (resolvedMode === "done:finally") {
			// The only mode with no side effects assuming library does not throw unconditionally
			// for rejected promises.
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done:finally' mode"
				);
			}
			if (typeof promise.finally !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'finally' " +
						"in 'done:finally' mode"
				);
			}
			promise.done(onSuccess);
			promise.finally(onFailure);
		}
	});

	// From cache (sync)
	conf.on("get", function (id, args, context) {
		var promise;
		if (waiting[id]) {
			++waiting[id]; // Still waiting
			return;
		}
		promise = promises[id];
		var emit = function () { conf.emit("getasync", id, args, context); };
		if (isPromise(promise)) {
			if (typeof promise.done === "function") promise.done(emit);
			else {
				promise.then(function () { nextTick(emit); });
			}
		} else {
			emit();
		}
	});

	// On delete
	conf.on("delete", function (id) {
		delete promises[id];
		if (waiting[id]) {
			delete waiting[id];
			return; // Not yet resolved
		}
		if (!hasOwnProperty.call(cache, id)) return;
		var result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, [result]);
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		waiting = create(null);
		promises = create(null);
		conf.emit("clearasync", objectMap(oldCache, function (data) { return [data]; }));
	});
};


/***/ }),

/***/ 9822:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Reference counter, useful for garbage collector like functionality



var d          = __nccwpck_require__(4571)
  , extensions = __nccwpck_require__(4334)

  , create = Object.create, defineProperties = Object.defineProperties;

extensions.refCounter = function (ignore, conf, options) {
	var cache, postfix;

	cache = create(null);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, function (id, length) {
 cache[id] = length || 1;
});
	conf.on("get" + postfix, function (id) {
 ++cache[id];
});
	conf.on("delete" + postfix, function (id) {
 delete cache[id];
});
	conf.on("clear" + postfix, function () {
 cache = {};
});

	defineProperties(conf.memoized, {
		deleteRef: d(function () {
			var id = conf.get(arguments);
			if (id === null) return null;
			if (!cache[id]) return null;
			if (!--cache[id]) {
				conf.delete(id);
				return true;
			}
			return false;
		}),
		getRefCount: d(function () {
			var id = conf.get(arguments);
			if (id === null) return 0;
			if (!cache[id]) return 0;
			return cache[id];
		})
	});
};


/***/ }),

/***/ 5841:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var normalizeOpts = __nccwpck_require__(4488)
  , resolveLength = __nccwpck_require__(1257)
  , plain         = __nccwpck_require__(4039);

module.exports = function (fn/*, options*/) {
	var options = normalizeOpts(arguments[1]), length;

	if (!options.normalizer) {
		length = options.length = resolveLength(options.length, fn.length, options.async);
		if (length !== 0) {
			if (options.primitive) {
				if (length === false) {
					options.normalizer = __nccwpck_require__(7054);
				} else if (length > 1) {
					options.normalizer = __nccwpck_require__(9543)(length);
				}
			} else if (length === false) options.normalizer = __nccwpck_require__(2929)();
				else if (length === 1) options.normalizer = __nccwpck_require__(1290)();
				else options.normalizer = __nccwpck_require__(6591)(length);
		}
	}

	// Assure extensions
	if (options.async) __nccwpck_require__(7192);
	if (options.promise) __nccwpck_require__(5796);
	if (options.dispose) __nccwpck_require__(6245);
	if (options.maxAge) __nccwpck_require__(9474);
	if (options.max) __nccwpck_require__(1233);
	if (options.refCounter) __nccwpck_require__(9822);

	return plain(fn, options);
};


/***/ }),

/***/ 5769:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */



var customError      = __nccwpck_require__(9684)
  , defineLength     = __nccwpck_require__(1490)
  , d                = __nccwpck_require__(4571)
  , ee               = (__nccwpck_require__(3647).methods)
  , resolveResolve   = __nccwpck_require__(7230)
  , resolveNormalize = __nccwpck_require__(9076);

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , create = Object.create
  , defineProperties = Object.defineProperties
  , on = ee.on
  , emit = ee.emit;

module.exports = function (original, length, options) {
	var cache = create(null)
	  , conf
	  , memLength
	  , get
	  , set
	  , del
	  , clear
	  , extDel
	  , extGet
	  , extHas
	  , normalizer
	  , getListeners
	  , setListeners
	  , deleteListeners
	  , memoized
	  , resolve;
	if (length !== false) memLength = length;
	else if (isNaN(original.length)) memLength = 1;
	else memLength = original.length;

	if (options.normalizer) {
		normalizer = resolveNormalize(options.normalizer);
		get = normalizer.get;
		set = normalizer.set;
		del = normalizer.delete;
		clear = normalizer.clear;
	}
	if (options.resolvers != null) resolve = resolveResolve(options.resolvers);

	if (get) {
		memoized = defineLength(function (arg) {
			var id, result, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id !== null) {
				if (hasOwnProperty.call(cache, id)) {
					if (getListeners) conf.emit("get", id, args, this);
					return cache[id];
				}
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (id === null) {
				id = get(args);
				if (id !== null) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				id = set(args);
			} else if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		}, memLength);
	} else if (length === 0) {
		memoized = function () {
			var result;
			if (hasOwnProperty.call(cache, "data")) {
				if (getListeners) conf.emit("get", "data", arguments, this);
				return cache.data;
			}
			if (arguments.length) result = apply.call(original, this, arguments);
			else result = call.call(original, this);
			if (hasOwnProperty.call(cache, "data")) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache.data = result;
			if (setListeners) conf.emit("set", "data", null, result);
			return result;
		};
	} else {
		memoized = function (arg) {
			var result, args = arguments, id;
			if (resolve) args = resolve(arguments);
			id = String(args[0]);
			if (hasOwnProperty.call(cache, id)) {
				if (getListeners) conf.emit("get", id, args, this);
				return cache[id];
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		};
	}
	conf = {
		original: original,
		memoized: memoized,
		profileName: options.profileName,
		get: function (args) {
			if (resolve) args = resolve(args);
			if (get) return get(args);
			return String(args[0]);
		},
		has: function (id) { return hasOwnProperty.call(cache, id); },
		delete: function (id) {
			var result;
			if (!hasOwnProperty.call(cache, id)) return;
			if (del) del(id);
			result = cache[id];
			delete cache[id];
			if (deleteListeners) conf.emit("delete", id, result);
		},
		clear: function () {
			var oldCache = cache;
			if (clear) clear();
			cache = create(null);
			conf.emit("clear", oldCache);
		},
		on: function (type, listener) {
			if (type === "get") getListeners = true;
			else if (type === "set") setListeners = true;
			else if (type === "delete") deleteListeners = true;
			return on.call(this, type, listener);
		},
		emit: emit,
		updateEnv: function () { original = conf.original; }
	};
	if (get) {
		extDel = defineLength(function (arg) {
			var id, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id === null) return;
			conf.delete(id);
		}, memLength);
	} else if (length === 0) {
		extDel = function () { return conf.delete("data"); };
	} else {
		extDel = function (arg) {
			if (resolve) arg = resolve(arguments)[0];
			return conf.delete(arg);
		};
	}
	extGet = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return cache.data;
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		return cache[id];
	});
	extHas = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return conf.has("data");
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		if (id === null) return false;
		return conf.has(id);
	});
	defineProperties(memoized, {
		__memoized__: d(true),
		delete: d(extDel),
		clear: d(conf.clear),
		_get: d(extGet),
		_has: d(extHas)
	});
	return conf;
};


/***/ }),

/***/ 5550:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var forEach       = __nccwpck_require__(9575)
  , normalizeOpts = __nccwpck_require__(4488)
  , callable      = __nccwpck_require__(6097)
  , lazy          = __nccwpck_require__(7579)
  , resolveLength = __nccwpck_require__(1257)
  , extensions    = __nccwpck_require__(4334);

module.exports = function (memoize) {
	return function (props) {
		forEach(props, function (desc) {
			var fn = callable(desc.value), length;
			desc.value = function (options) {
				if (options.getNormalizer) {
					options = normalizeOpts(options);
					if (length === undefined) {
						length = resolveLength(
							options.length,
							fn.length,
							options.async && extensions.async
						);
					}
					options.normalizer = options.getNormalizer(length);
					delete options.getNormalizer;
				}
				return memoize(fn.bind(this), options);
			};
		});
		return lazy(props);
	};
};


/***/ }),

/***/ 4334:
/***/ (() => {

"use strict";



/***/ }),

/***/ 1257:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt = __nccwpck_require__(3755);

module.exports = function (optsLength, fnLength, isAsync) {
	var length;
	if (isNaN(optsLength)) {
		length = fnLength;
		if (!(length >= 0)) return 1;
		if (isAsync && length) return length - 1;
		return length;
	}
	if (optsLength === false) return false;
	return toPosInt(optsLength);
};


/***/ }),

/***/ 9076:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var callable = __nccwpck_require__(6097);

module.exports = function (userNormalizer) {
	var normalizer;
	if (typeof userNormalizer === "function") return { set: userNormalizer, get: userNormalizer };
	normalizer = { get: callable(userNormalizer.get) };
	if (userNormalizer.set !== undefined) {
		normalizer.set = callable(userNormalizer.set);
		if (userNormalizer.delete) normalizer.delete = callable(userNormalizer.delete);
		if (userNormalizer.clear) normalizer.clear = callable(userNormalizer.clear);
		return normalizer;
	}
	normalizer.set = normalizer.get;
	return normalizer;
};


/***/ }),

/***/ 7230:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toArray  = __nccwpck_require__(2353)
  , isValue  = __nccwpck_require__(2285)
  , callable = __nccwpck_require__(6097);

var slice = Array.prototype.slice, resolveArgs;

resolveArgs = function (args) {
	return this.map(function (resolve, i) {
		return resolve ? resolve(args[i]) : args[i];
	}).concat(slice.call(args, this.length));
};

module.exports = function (resolvers) {
	resolvers = toArray(resolvers);
	resolvers.forEach(function (resolve) {
		if (isValue(resolve)) callable(resolve);
	});
	return resolveArgs.bind(resolvers);
};


/***/ }),

/***/ 1936:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports = __nccwpck_require__(5550)(__nccwpck_require__(5841));


/***/ }),

/***/ 1290:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var indexOf = __nccwpck_require__(2324);

module.exports = function () {
	var lastId = 0, argsMap = [], cache = [];
	return {
		get: function (args) {
			var index = indexOf.call(argsMap, args[0]);
			return index === -1 ? null : cache[index];
		},
		set: function (args) {
			argsMap.push(args[0]);
			cache.push(++lastId);
			return lastId;
		},
		delete: function (id) {
			var index = indexOf.call(cache, id);
			if (index !== -1) {
				argsMap.splice(index, 1);
				cache.splice(index, 1);
			}
		},
		clear: function () {
			argsMap = [];
			cache = [];
		}
	};
};


/***/ }),

/***/ 6591:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var indexOf = __nccwpck_require__(2324)
  , create  = Object.create;

module.exports = function (length) {
	var lastId = 0, map = [[], []], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) return null;
			return set[1][i] || null;
		},
		set: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
					set[1].push([[], []]);
				}
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				i = set[0].push(args[index]) - 1;
			}
			set[1][i] = ++lastId;
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, path = [], args = cache[id];
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				path.push(set, i);
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				return;
			}
			id = set[1][i];
			set[0].splice(i, 1);
			set[1].splice(i, 1);
			while (!set[0].length && path.length) {
				i = path.pop();
				set = path.pop();
				set[0].splice(i, 1);
				set[1].splice(i, 1);
			}
			delete cache[id];
		},
		clear: function () {
			map = [[], []];
			cache = create(null);
		}
	};
};


/***/ }),

/***/ 9543:
/***/ ((module) => {

"use strict";


module.exports = function (length) {
	if (!length) {
		return function () {
			return "";
		};
	}
	return function (args) {
		var id = String(args[0]), i = 0, currentLength = length;
		while (--currentLength) {
			id += "\u0001" + args[++i];
		}
		return id;
	};
};


/***/ }),

/***/ 2929:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint max-statements: 0 */



var indexOf = __nccwpck_require__(2324);

var create = Object.create;

module.exports = function () {
	var lastId = 0, map = [], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) return set[length] || null;
			if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) return null;
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				return set[1][i] || null;
			}
			return null;
		},
		set: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) {
				set[length] = ++lastId;
			} else {
				if (!set[length]) {
					set[length] = [[], []];
				}
				set = set[length];
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
						set[1].push([[], []]);
					}
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
				}
				set[1][i] = ++lastId;
			}
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
			if (length === 0) {
				delete set[length];
			} else if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					path.push(set, i);
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				id = set[1][i];
				set[0].splice(i, 1);
				set[1].splice(i, 1);
				while (!set[0].length && path.length) {
					i = path.pop();
					set = path.pop();
					set[0].splice(i, 1);
					set[1].splice(i, 1);
				}
			}
			delete cache[id];
		},
		clear: function () {
			map = [];
			cache = create(null);
		}
	};
};


/***/ }),

/***/ 7054:
/***/ ((module) => {

"use strict";


module.exports = function (args) {
	var id, i, length = args.length;
	if (!length) return "\u0002";
	id = String(args[i = 0]);
	while (--length) id += "\u0001" + args[++i];
	return id;
};


/***/ }),

/***/ 4039:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var callable      = __nccwpck_require__(6097)
  , forEach       = __nccwpck_require__(9575)
  , extensions    = __nccwpck_require__(4334)
  , configure     = __nccwpck_require__(5769)
  , resolveLength = __nccwpck_require__(1257);

module.exports = function self(fn /*, options */) {
	var options, length, conf;

	callable(fn);
	options = Object(arguments[1]);

	if (options.async && options.promise) {
		throw new Error("Options 'async' and 'promise' cannot be used together");
	}

	// Do not memoize already memoized function
	if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;

	// Resolve length;
	length = resolveLength(options.length, fn.length, options.async && extensions.async);

	// Configure cache map
	conf = configure(fn, length, options);

	// Bind eventual extensions
	forEach(extensions, function (extFn, name) {
		if (options[name]) extFn(options[name], conf, options);
	});

	if (self.__profiler__) self.__profiler__(conf);

	conf.updateEnv();
	return conf.memoized;
};


/***/ }),

/***/ 4152:
/***/ ((module) => {

"use strict";


var ensureCallable = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

var byObserver = function (Observer) {
	var node = document.createTextNode(''), queue, currentQueue, i = 0;
	new Observer(function () {
		var callback;
		if (!queue) {
			if (!currentQueue) return;
			queue = currentQueue;
		} else if (currentQueue) {
			queue = currentQueue.concat(queue);
		}
		currentQueue = queue;
		queue = null;
		if (typeof currentQueue === 'function') {
			callback = currentQueue;
			currentQueue = null;
			callback();
			return;
		}
		node.data = (i = ++i % 2); // Invoke other batch, to handle leftover callbacks in case of crash
		while (currentQueue) {
			callback = currentQueue.shift();
			if (!currentQueue.length) currentQueue = null;
			callback();
		}
	}).observe(node, { characterData: true });
	return function (fn) {
		ensureCallable(fn);
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn];
			else queue.push(fn);
			return;
		}
		queue = fn;
		node.data = (i = ++i % 2);
	};
};

module.exports = (function () {
	// Node.js
	if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
		return process.nextTick;
	}

	// queueMicrotask
	if (typeof queueMicrotask === "function") {
		return function (cb) { queueMicrotask(ensureCallable(cb)); };
	}

	// MutationObserver
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
		if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb) { setImmediate(ensureCallable(cb)); };
	}

	// Wide available standard
	if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
		return function (cb) { setTimeout(ensureCallable(cb), 0); };
	}

	return null;
}());


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 9200:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var fs = __nccwpck_require__(7147),
  join = (__nccwpck_require__(1017).join),
  resolve = (__nccwpck_require__(1017).resolve),
  dirname = (__nccwpck_require__(1017).dirname),
  defaultOptions = {
    extensions: ['js', 'json', 'coffee'],
    recurse: true,
    rename: function (name) {
      return name;
    },
    visit: function (obj) {
      return obj;
    }
  };

function checkFileInclusion(path, filename, options) {
  return (
    // verify file has valid extension
    (new RegExp('\\.(' + options.extensions.join('|') + ')$', 'i').test(filename)) &&

    // if options.include is a RegExp, evaluate it and make sure the path passes
    !(options.include && options.include instanceof RegExp && !options.include.test(path)) &&

    // if options.include is a function, evaluate it and make sure the path passes
    !(options.include && typeof options.include === 'function' && !options.include(path, filename)) &&

    // if options.exclude is a RegExp, evaluate it and make sure the path doesn't pass
    !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) &&

    // if options.exclude is a function, evaluate it and make sure the path doesn't pass
    !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename))
  );
}

function requireDirectory(m, path, options) {
  var retval = {};

  // path is optional
  if (path && !options && typeof path !== 'string') {
    options = path;
    path = null;
  }

  // default options
  options = options || {};
  for (var prop in defaultOptions) {
    if (typeof options[prop] === 'undefined') {
      options[prop] = defaultOptions[prop];
    }
  }

  // if no path was passed in, assume the equivelant of __dirname from caller
  // otherwise, resolve path relative to the equivalent of __dirname
  path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path);

  // get the path of each file in specified directory, append to current tree node, recurse
  fs.readdirSync(path).forEach(function (filename) {
    var joined = join(path, filename),
      files,
      key,
      obj;

    if (fs.statSync(joined).isDirectory() && options.recurse) {
      // this node is a directory; recurse
      files = requireDirectory(m, joined, options);
      // exclude empty directories
      if (Object.keys(files).length) {
        retval[options.rename(filename, joined, filename)] = files;
      }
    } else {
      if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
        // hash node key shouldn't include file extension
        key = filename.substring(0, filename.lastIndexOf('.'));
        obj = m.require(joined);
        retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
      }
    }
  });

  return retval;
}

module.exports = requireDirectory;
module.exports.defaults = defaultOptions;


/***/ }),

/***/ 2577:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const stripAnsi = __nccwpck_require__(5591);
const isFullwidthCodePoint = __nccwpck_require__(4882);
const emojiRegex = __nccwpck_require__(8212);

const stringWidth = string => {
	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	string = stripAnsi(string);

	if (string.length === 0) {
		return 0;
	}

	string = string.replace(emojiRegex(), '  ');

	let width = 0;

	for (let i = 0; i < string.length; i++) {
		const code = string.codePointAt(i);

		// Ignore control characters
		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
			continue;
		}

		// Ignore combining characters
		if (code >= 0x300 && code <= 0x36F) {
			continue;
		}

		// Surrogates
		if (code > 0xFFFF) {
			i++;
		}

		width += isFullwidthCodePoint(code) ? 2 : 1;
	}

	return width;
};

module.exports = stringWidth;
// TODO: remove this in the next major version
module.exports["default"] = stringWidth;


/***/ }),

/***/ 5591:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const ansiRegex = __nccwpck_require__(5063);

module.exports = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;


/***/ }),

/***/ 3686:
/***/ ((module) => {

"use strict";


module.exports = 2147483647;


/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var toPosInt   = __nccwpck_require__(3755)
  , maxTimeout = __nccwpck_require__(3686);

module.exports = function (value) {
	value = toPosInt(value);
	if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
	return value;
};


/***/ }),

/***/ 8951:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isPrototype = __nccwpck_require__(2884);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 6010:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue       = __nccwpck_require__(3134)
  , isObject      = __nccwpck_require__(862)
  , stringCoerce  = __nccwpck_require__(8113)
  , toShortString = __nccwpck_require__(1887);

var resolveMessage = function (message, value) {
	return message.replace("%v", toShortString(value));
};

module.exports = function (value, defaultMessage, inputOptions) {
	if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
	if (!isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var errorMessage = stringCoerce(inputOptions.errorMessage);
	if (!isValue(errorMessage)) errorMessage = defaultMessage;
	throw new TypeError(resolveMessage(errorMessage, value));
};


/***/ }),

/***/ 6765:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	try {
		return value.toString();
	} catch (error) {
		try { return String(value); }
		catch (error2) { return null; }
	}
};


/***/ }),

/***/ 1887:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var safeToString = __nccwpck_require__(6765);

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	if (string === null) return "<Non-coercible to string value>";
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		switch (char) {
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\u2028":
				return "\\u2028";
			case "\u2029":
				return "\\u2029";
			/* istanbul ignore next */
			default:
				throw new Error("Unexpected character");
		}
	});
	return string;
};


/***/ }),

/***/ 862:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue = __nccwpck_require__(3134);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 3681:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var resolveException = __nccwpck_require__(6010)
  , is               = __nccwpck_require__(6796);

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "%v is not a plain function", arguments[1]);
};


/***/ }),

/***/ 6796:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isFunction = __nccwpck_require__(8951);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 2884:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isObject = __nccwpck_require__(862);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 8113:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isValue  = __nccwpck_require__(3134)
  , isObject = __nccwpck_require__(862);

var objectToString = Object.prototype.toString;

module.exports = function (value) {
	if (!isValue(value)) return null;
	if (isObject(value)) {
		// Reject Object.prototype.toString coercion
		var valueToString = value.toString;
		if (typeof valueToString !== "function") return null;
		if (valueToString === objectToString) return null;
		// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
		// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
	}
	try {
		return "" + value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
};


/***/ }),

/***/ 942:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var resolveException = __nccwpck_require__(6010)
  , is               = __nccwpck_require__(3134);

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "Cannot use %v", arguments[1]);
};


/***/ }),

/***/ 3134:
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ 9824:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const stringWidth = __nccwpck_require__(2577);
const stripAnsi = __nccwpck_require__(5591);
const ansiStyles = __nccwpck_require__(2068);

const ESCAPES = new Set([
	'\u001B',
	'\u009B'
]);

const END_CODE = 39;

const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;

const wrapAnsi = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = uri => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;

// Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes
const wordLengths = string => string.split(' ').map(character => stringWidth(character));

// Wrap a long word across multiple rows
// Ansi escape codes do not count towards length
const wrapWord = (rows, word, columns) => {
	const characters = [...word];

	let isInsideEscape = false;
	let isInsideLinkEscape = false;
	let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

	for (const [index, character] of characters.entries()) {
		const characterLength = stringWidth(character);

		if (visible + characterLength <= columns) {
			rows[rows.length - 1] += character;
		} else {
			rows.push(character);
			visible = 0;
		}

		if (ESCAPES.has(character)) {
			isInsideEscape = true;
			isInsideLinkEscape = characters.slice(index + 1).join('').startsWith(ANSI_ESCAPE_LINK);
		}

		if (isInsideEscape) {
			if (isInsideLinkEscape) {
				if (character === ANSI_ESCAPE_BELL) {
					isInsideEscape = false;
					isInsideLinkEscape = false;
				}
			} else if (character === ANSI_SGR_TERMINATOR) {
				isInsideEscape = false;
			}

			continue;
		}

		visible += characterLength;

		if (visible === columns && index < characters.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// It's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case
	if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
};

// Trims spaces from a string ignoring invisible sequences
const stringVisibleTrimSpacesRight = string => {
	const words = string.split(' ');
	let last = words.length;

	while (last > 0) {
		if (stringWidth(words[last - 1]) > 0) {
			break;
		}

		last--;
	}

	if (last === words.length) {
		return string;
	}

	return words.slice(0, last).join(' ') + words.slice(last).join('');
};

// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode
//
// 'hard' will never allow a string to take up more than columns characters
//
// 'soft' allows long words to expand past the column length
const exec = (string, columns, options = {}) => {
	if (options.trim !== false && string.trim() === '') {
		return '';
	}

	let returnValue = '';
	let escapeCode;
	let escapeUrl;

	const lengths = wordLengths(string);
	let rows = [''];

	for (const [index, word] of string.split(' ').entries()) {
		if (options.trim !== false) {
			rows[rows.length - 1] = rows[rows.length - 1].trimStart();
		}

		let rowLength = stringWidth(rows[rows.length - 1]);

		if (index !== 0) {
			if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
				// If we start with a new word but the current row length equals the length of the columns, add a new row
				rows.push('');
				rowLength = 0;
			}

			if (rowLength > 0 || options.trim === false) {
				rows[rows.length - 1] += ' ';
				rowLength++;
			}
		}

		// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
		if (options.hard && lengths[index] > columns) {
			const remainingColumns = (columns - rowLength);
			const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
			const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
			if (breaksStartingNextLine < breaksStartingThisLine) {
				rows.push('');
			}

			wrapWord(rows, word, columns);
			continue;
		}

		if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
			if (options.wordWrap === false && rowLength < columns) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows.push('');
		}

		if (rowLength + lengths[index] > columns && options.wordWrap === false) {
			wrapWord(rows, word, columns);
			continue;
		}

		rows[rows.length - 1] += word;
	}

	if (options.trim !== false) {
		rows = rows.map(stringVisibleTrimSpacesRight);
	}

	const pre = [...rows.join('\n')];

	for (const [index, character] of pre.entries()) {
		returnValue += character;

		if (ESCAPES.has(character)) {
			const {groups} = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join('')) || {groups: {}};
			if (groups.code !== undefined) {
				const code = Number.parseFloat(groups.code);
				escapeCode = code === END_CODE ? undefined : code;
			} else if (groups.uri !== undefined) {
				escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
			}
		}

		const code = ansiStyles.codes.get(Number(escapeCode));

		if (pre[index + 1] === '\n') {
			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink('');
			}

			if (escapeCode && code) {
				returnValue += wrapAnsi(code);
			}
		} else if (character === '\n') {
			if (escapeCode && code) {
				returnValue += wrapAnsi(escapeCode);
			}

			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink(escapeUrl);
			}
		}
	}

	return returnValue;
};

// For each newline, invoke the method separately
module.exports = (string, columns, options) => {
	return String(string)
		.normalize()
		.replace(/\r\n/g, '\n')
		.split('\n')
		.map(line => exec(line, columns, options))
		.join('\n');
};


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 9892:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
const util_1 = __nccwpck_require__(3985);
exports.ZodIssueCode = util_1.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
exports.quotelessJson = quotelessJson;
class ZodError extends Error {
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    get errors() {
        return this.issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util_1.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
exports.ZodError = ZodError;
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};


/***/ }),

/***/ 9566:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getErrorMap = exports.setErrorMap = exports.defaultErrorMap = void 0;
const en_1 = __importDefault(__nccwpck_require__(468));
exports.defaultErrorMap = en_1.default;
let overrideErrorMap = en_1.default;
function setErrorMap(map) {
    overrideErrorMap = map;
}
exports.setErrorMap = setErrorMap;
function getErrorMap() {
    return overrideErrorMap;
}
exports.getErrorMap = getErrorMap;


/***/ }),

/***/ 9906:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZodParsedType = exports.getParsedType = void 0;
__exportStar(__nccwpck_require__(9566), exports);
__exportStar(__nccwpck_require__(888), exports);
__exportStar(__nccwpck_require__(9449), exports);
var util_1 = __nccwpck_require__(3985);
Object.defineProperty(exports, "getParsedType", ({ enumerable: true, get: function () { return util_1.getParsedType; } }));
Object.defineProperty(exports, "ZodParsedType", ({ enumerable: true, get: function () { return util_1.ZodParsedType; } }));
__exportStar(__nccwpck_require__(9335), exports);
__exportStar(__nccwpck_require__(9892), exports);


/***/ }),

/***/ 2513:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorUtil = void 0;
var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil = exports.errorUtil || (exports.errorUtil = {}));


/***/ }),

/***/ 888:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.addIssueToContext = exports.EMPTY_PATH = exports.makeIssue = void 0;
const errors_1 = __nccwpck_require__(9566);
const en_1 = __importDefault(__nccwpck_require__(468));
const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage,
    };
};
exports.makeIssue = makeIssue;
exports.EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const issue = exports.makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            errors_1.getErrorMap(),
            en_1.default,
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
exports.addIssueToContext = addIssueToContext;
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return exports.INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            syncPairs.push({
                key: await pair.key,
                value: await pair.value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return exports.INVALID;
            if (value.status === "aborted")
                return exports.INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (typeof value.value !== "undefined" || pair.alwaysSet) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
exports.ParseStatus = ParseStatus;
exports.INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
exports.DIRTY = DIRTY;
const OK = (value) => ({ status: "valid", value });
exports.OK = OK;
const isAborted = (x) => x.status === "aborted";
exports.isAborted = isAborted;
const isDirty = (x) => x.status === "dirty";
exports.isDirty = isDirty;
const isValid = (x) => x.status === "valid";
exports.isValid = isValid;
const isAsync = (x) => typeof Promise !== undefined && x instanceof Promise;
exports.isAsync = isAsync;


/***/ }),

/***/ 9449:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 3985:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParsedType = exports.ZodParsedType = exports.util = void 0;
var util;
(function (util) {
    util.assertEqual = (val) => val;
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array
            .map((val) => (typeof val === "string" ? `'${val}'` : val))
            .join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util = exports.util || (exports.util = {}));
exports.ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return exports.ZodParsedType.undefined;
        case "string":
            return exports.ZodParsedType.string;
        case "number":
            return isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
        case "boolean":
            return exports.ZodParsedType.boolean;
        case "function":
            return exports.ZodParsedType.function;
        case "bigint":
            return exports.ZodParsedType.bigint;
        case "object":
            if (Array.isArray(data)) {
                return exports.ZodParsedType.array;
            }
            if (data === null) {
                return exports.ZodParsedType.null;
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return exports.ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return exports.ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return exports.ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return exports.ZodParsedType.date;
            }
            return exports.ZodParsedType.object;
        default:
            return exports.ZodParsedType.unknown;
    }
};
exports.getParsedType = getParsedType;


/***/ }),

/***/ 3301:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.z = void 0;
const mod = __importStar(__nccwpck_require__(9906));
exports.z = mod;
__exportStar(__nccwpck_require__(9906), exports);
exports["default"] = mod;


/***/ }),

/***/ 468:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __nccwpck_require__(3985);
const ZodError_1 = __nccwpck_require__(9892);
const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodError_1.ZodIssueCode.invalid_type:
            if (issue.received === util_1.ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodError_1.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
            break;
        case ZodError_1.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodError_1.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodError_1.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodError_1.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodError_1.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util_1.util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodError_1.ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be greater than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.minimum)}`;
            else
                message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be smaller than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.maximum)}`;
            else
                message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodError_1.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        default:
            message = _ctx.defaultError;
            util_1.util.assertNever(issue);
    }
    return { message };
};
exports["default"] = errorMap;


/***/ }),

/***/ 9335:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["function"] = exports["enum"] = exports.effect = exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.custom = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.objectUtil = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
exports.NEVER = exports["void"] = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports["null"] = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports["instanceof"] = void 0;
const errors_1 = __nccwpck_require__(9566);
const errorUtil_1 = __nccwpck_require__(2513);
const parseUtil_1 = __nccwpck_require__(888);
const util_1 = __nccwpck_require__(3985);
const ZodError_1 = __nccwpck_require__(9892);
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        return this._path.concat(this._key);
    }
}
const handleResult = (ctx, result) => {
    if (parseUtil_1.isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        const error = new ZodError_1.ZodError(ctx.common.issues);
        return { success: false, error };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        if (typeof ctx.data === "undefined") {
            return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
        }
        return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this.superRefine = this._refinement;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.default = this.default.bind(this);
        this.describe = this.describe.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
    }
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return util_1.getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: util_1.getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new parseUtil_1.ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: util_1.getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (parseUtil_1.isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: util_1.getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: util_1.getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: [], parent: ctx });
        const result = await (parseUtil_1.isAsync(maybeAsyncResult)
            ? maybeAsyncResult
            : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodError_1.ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    optional() {
        return ZodOptional.create(this);
    }
    nullable() {
        return ZodNullable.create(this);
    }
    nullish() {
        return this.optional().nullable();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this);
    }
    or(option) {
        return ZodUnion.create([this, option]);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming);
    }
    transform(transform) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(undefined),
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
exports.ZodType = ZodType;
exports.Schema = ZodType;
exports.ZodSchema = ZodType;
const cuidRegex = /^c[^\s-]{8,}$/i;
const uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
// eslint-disable-next-line
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class ZodString extends ZodType {
    constructor() {
        super(...arguments);
        this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
            validation,
            code: ZodError_1.ZodIssueCode.invalid_string,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
        /**
         * @deprecated Use z.string().min(1) instead.
         * @see {@link ZodString.min}
         */
        this.nonempty = (message) => this.min(1, errorUtil_1.errorUtil.errToObj(message));
        this.trim = () => new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.string,
                received: ctx.parsedType,
            }
            //
            );
            return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util_1.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil_1.errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil_1.errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil_1.errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil_1.errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil_1.errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this.min(len, message).max(len, message);
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
exports.ZodString = ZodString;
ZodString.create = (params) => {
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.number,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        let ctx = undefined;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util_1.util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util_1.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil_1.errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int");
    }
}
exports.ZodNumber = ZodNumber;
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.bigint) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.bigint,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodBigInt = ZodBigInt;
ZodBigInt.create = (params) => {
    return new ZodBigInt({
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodBoolean = ZodBoolean;
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.date,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_date,
            });
            return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
exports.ZodDate = ZodDate;
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodUndefined = ZodUndefined;
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.null,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodNull = ZodNull;
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodAny = ZodAny;
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodUnknown = ZodUnknown;
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        parseUtil_1.addIssueToContext(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.never,
            received: ctx.parsedType,
        });
        return parseUtil_1.INVALID;
    }
}
exports.ZodNever = ZodNever;
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.void,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
}
exports.ZodVoid = ZodVoid;
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                parseUtil_1.addIssueToContext(ctx, {
                    code: ZodError_1.ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                parseUtil_1.addIssueToContext(ctx, {
                    code: ZodError_1.ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all(ctx.data.map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return parseUtil_1.ParseStatus.mergeArray(status, result);
            });
        }
        const result = ctx.data.map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return parseUtil_1.ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil_1.errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil_1.errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return this.min(len, message).max(len, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodArray = ZodArray;
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodObject      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second,
        };
    };
})(objectUtil = exports.objectUtil || (exports.objectUtil = {}));
const AugmentFactory = (def) => (augmentation) => {
    return new ZodObject({
        ...def,
        shape: () => ({
            ...def.shape(),
            ...augmentation,
        }),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return ZodArray.create(deepPartialify(schema.element));
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        this.augment = AugmentFactory(this._def);
        this.extend = AugmentFactory(this._def);
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util_1.util.objectKeys(shape);
        return (this._cached = { shape, keys });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever &&
            this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    parseUtil_1.addIssueToContext(ctx, {
                        code: ZodError_1.ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") {
            }
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    syncPairs.push({
                        key,
                        value: await pair.value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil_1.errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        var _a, _b, _c, _d;
                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        // const mergedShape = objectUtil.mergeShapes(
        //   this._def.shape(),
        //   merging._def.shape()
        // );
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        util_1.util.objectKeys(mask).map((key) => {
            // only add to shape if key corresponds to an element of the current shape
            if (this.shape[key])
                shape[key] = this.shape[key];
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        util_1.util.objectKeys(this.shape).map((key) => {
            if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        if (mask) {
            util_1.util.objectKeys(this.shape).map((key) => {
                if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
                    newShape[key] = this.shape[key];
                }
                else {
                    newShape[key] = this.shape[key].optional();
                }
            });
            return new ZodObject({
                ...this._def,
                shape: () => newShape,
            });
        }
        else {
            for (const key in this.shape) {
                const fieldSchema = this.shape[key];
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required() {
        const newShape = {};
        for (const key in this.shape) {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
                newField = newField._def.innerType;
            }
            newShape[key] = newField;
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util_1.util.objectKeys(this.shape));
    }
}
exports.ZodObject = ZodObject;
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError_1.ZodError(result.ctx.common.issues));
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError_1.ZodError(issues));
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return parseUtil_1.INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
exports.ZodUnion = ZodUnion;
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.options.get(discriminatorValue);
        if (!option) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
                options: this.validDiscriminatorValues,
                path: [discriminator],
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get validDiscriminatorValues() {
        return Array.from(this.options.keys());
    }
    get options() {
        return this._def.options;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, types, params) {
        // Get all the valid discriminator values
        const options = new Map();
        try {
            types.forEach((type) => {
                const discriminatorValue = type.shape[discriminator].value;
                options.set(discriminatorValue, type);
            });
        }
        catch (e) {
            throw new Error("The discriminator value could not be extracted from all the provided schemas");
        }
        // Assert that all the discriminator values are unique
        if (options.size !== types.length) {
            throw new Error("Some of the discriminator values are not unique");
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            ...processCreateParams(params),
        });
    }
}
exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
function mergeValues(a, b) {
    const aType = util_1.getParsedType(a);
    const bType = util_1.getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
        const bKeys = util_1.util.objectKeys(b);
        const sharedKeys = util_1.util
            .objectKeys(a)
            .filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === util_1.ZodParsedType.date &&
        bType === util_1.ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (parseUtil_1.isAborted(parsedLeft) || parseUtil_1.isAborted(parsedRight)) {
                return parseUtil_1.INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                parseUtil_1.addIssueToContext(ctx, {
                    code: ZodError_1.ZodIssueCode.invalid_intersection_types,
                });
                return parseUtil_1.INVALID;
            }
            if (parseUtil_1.isDirty(parsedLeft) || parseUtil_1.isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
exports.ZodIntersection = ZodIntersection;
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                type: "array",
            });
            return parseUtil_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                type: "array",
            });
            status.dirty();
        }
        const items = ctx.data
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return parseUtil_1.ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return parseUtil_1.ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
exports.ZodTuple = ZodTuple;
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            });
        }
        if (ctx.common.async) {
            return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
exports.ZodRecord = ZodRecord;
class ZodMap extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.map) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.map,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return parseUtil_1.INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return parseUtil_1.INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
exports.ZodMap = ZodMap;
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.set) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.set,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                parseUtil_1.addIssueToContext(ctx, {
                    code: ZodError_1.ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                parseUtil_1.addIssueToContext(ctx, {
                    code: ZodError_1.ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return parseUtil_1.INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil_1.errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil_1.errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodSet = ZodSet;
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.function) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.function,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        function makeArgsIssue(args, error) {
            return parseUtil_1.makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    errors_1.getErrorMap(),
                    errors_1.defaultErrorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodError_1.ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return parseUtil_1.makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    errors_1.getErrorMap(),
                    errors_1.defaultErrorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodError_1.ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            return parseUtil_1.OK(async (...args) => {
                const error = new ZodError_1.ZodError([]);
                const parsedArgs = await this._def.args
                    .parseAsync(args, params)
                    .catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await fn(...parsedArgs);
                const parsedReturns = await this._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            return parseUtil_1.OK((...args) => {
                const parsedArgs = this._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = fn(...parsedArgs.data);
                const parsedReturns = this._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args
                ? args
                : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
exports.ZodFunction = ZodFunction;
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
exports.ZodLazy = ZodLazy;
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
exports.ZodLiteral = ZodLiteral;
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            parseUtil_1.addIssueToContext(ctx, {
                expected: util_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_1.ZodIssueCode.invalid_type,
            });
            return parseUtil_1.INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            parseUtil_1.addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodError_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
}
exports.ZodEnum = ZodEnum;
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_1.ZodParsedType.string &&
            ctx.parsedType !== util_1.ZodParsedType.number) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            parseUtil_1.addIssueToContext(ctx, {
                expected: util_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_1.ZodIssueCode.invalid_type,
            });
            return parseUtil_1.INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            parseUtil_1.addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodError_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_1.INVALID;
        }
        return parseUtil_1.OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
exports.ZodNativeEnum = ZodNativeEnum;
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.promise &&
            ctx.common.async === false) {
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        const promisified = ctx.parsedType === util_1.ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return parseUtil_1.OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
exports.ZodPromise = ZodPromise;
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data);
            if (ctx.common.async) {
                return Promise.resolve(processed).then((processed) => {
                    return this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                });
            }
            else {
                return this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
        const checkCtx = {
            addIssue: (arg) => {
                parseUtil_1.addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "refinement") {
            const executeRefinement = (acc
            // effect: RefinementEffect<any>
            ) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return parseUtil_1.INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((inner) => {
                    if (inner.status === "aborted")
                        return parseUtil_1.INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                // if (base.status === "aborted") return INVALID;
                // if (base.status === "dirty") {
                //   return { status: "dirty", value: base.value };
                // }
                if (!parseUtil_1.isValid(base))
                    return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((base) => {
                    if (!parseUtil_1.isValid(base))
                        return base;
                    // if (base.status === "aborted") return INVALID;
                    // if (base.status === "dirty") {
                    //   return { status: "dirty", value: base.value };
                    // }
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
                });
            }
        }
        util_1.util.assertNever(effect);
    }
}
exports.ZodEffects = ZodEffects;
exports.ZodTransformer = ZodEffects;
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.undefined) {
            return parseUtil_1.OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodOptional = ZodOptional;
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.null) {
            return parseUtil_1.OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodNullable = ZodNullable;
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_1.ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
exports.ZodDefault = ZodDefault;
ZodDefault.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            parseUtil_1.addIssueToContext(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
exports.ZodNaN = ZodNaN;
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
exports.BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
exports.ZodBranded = ZodBranded;
const custom = (check, params = {}, fatal) => {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            if (!check(data)) {
                const p = typeof params === "function" ? params(data) : params;
                const p2 = typeof p === "string" ? { message: p } : p;
                ctx.addIssue({ code: "custom", ...p2, fatal });
            }
        });
    return ZodAny.create();
};
exports.custom = custom;
exports.late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
})(ZodFirstPartyTypeKind = exports.ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = {}));
// new approach that works for abstract classes
// but required TS 4.4+
// abstract class Class {
//   constructor(..._: any[]) {}
// }
// const instanceOfType = <T extends typeof Class>(
const instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => exports.custom((data) => data instanceof cls, params, true);
exports["instanceof"] = instanceOfType;
const stringType = ZodString.create;
exports.string = stringType;
const numberType = ZodNumber.create;
exports.number = numberType;
const nanType = ZodNaN.create;
exports.nan = nanType;
const bigIntType = ZodBigInt.create;
exports.bigint = bigIntType;
const booleanType = ZodBoolean.create;
exports.boolean = booleanType;
const dateType = ZodDate.create;
exports.date = dateType;
const undefinedType = ZodUndefined.create;
exports.undefined = undefinedType;
const nullType = ZodNull.create;
exports["null"] = nullType;
const anyType = ZodAny.create;
exports.any = anyType;
const unknownType = ZodUnknown.create;
exports.unknown = unknownType;
const neverType = ZodNever.create;
exports.never = neverType;
const voidType = ZodVoid.create;
exports["void"] = voidType;
const arrayType = ZodArray.create;
exports.array = arrayType;
const objectType = ZodObject.create;
exports.object = objectType;
const strictObjectType = ZodObject.strictCreate;
exports.strictObject = strictObjectType;
const unionType = ZodUnion.create;
exports.union = unionType;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
exports.discriminatedUnion = discriminatedUnionType;
const intersectionType = ZodIntersection.create;
exports.intersection = intersectionType;
const tupleType = ZodTuple.create;
exports.tuple = tupleType;
const recordType = ZodRecord.create;
exports.record = recordType;
const mapType = ZodMap.create;
exports.map = mapType;
const setType = ZodSet.create;
exports.set = setType;
const functionType = ZodFunction.create;
exports["function"] = functionType;
const lazyType = ZodLazy.create;
exports.lazy = lazyType;
const literalType = ZodLiteral.create;
exports.literal = literalType;
const enumType = ZodEnum.create;
exports["enum"] = enumType;
const nativeEnumType = ZodNativeEnum.create;
exports.nativeEnum = nativeEnumType;
const promiseType = ZodPromise.create;
exports.promise = promiseType;
const effectsType = ZodEffects.create;
exports.effect = effectsType;
exports.transformer = effectsType;
const optionalType = ZodOptional.create;
exports.optional = optionalType;
const nullableType = ZodNullable.create;
exports.nullable = nullableType;
const preprocessType = ZodEffects.createWithPreprocess;
exports.preprocess = preprocessType;
const ostring = () => stringType().optional();
exports.ostring = ostring;
const onumber = () => numberType().optional();
exports.onumber = onumber;
const oboolean = () => booleanType().optional();
exports.oboolean = oboolean;
exports.NEVER = parseUtil_1.INVALID;


/***/ }),

/***/ 9610:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __nccwpck_require__(7147);
const json_diff_1 = __importDefault(__nccwpck_require__(9031));
const memfs_1 = __importDefault(__nccwpck_require__(5069));
const glob_1 = __importDefault(__nccwpck_require__(1957));
const yargs_1 = __importDefault(__nccwpck_require__(8822));
const helpers_1 = __nccwpck_require__(6658);
const explode_1 = __nccwpck_require__(1326);
const implode_1 = __nccwpck_require__(9958);
const schema_parser_1 = __nccwpck_require__(1873);
const path_1 = __nccwpck_require__(1017);
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("explode [schema]", "Convert a schema file into files & folders", {
    schema: {
        description: "Path to the schema JSON file",
        demandOption: true,
        type: "string",
    },
    validate: {
        description: "Validate schema while reading",
        default: false,
        type: "boolean",
    },
    outDir: {
        description: "Exploded schema output directory",
        defaultDescription: "current working directory",
        type: "string",
    },
    format: {
        description: "Format of exploded files",
        default: "yaml",
        choices: ["yaml", "json"],
    },
}, (argv) => {
    const schemaPath = argv.schema;
    const dir = argv.outDir ?? process.cwd();
    const format = argv.format;
    if (format !== "yaml" && format !== "json") {
        throw new Error(`invalid format: ${format}`);
    }
    const schemaContent = (0, fs_1.readFileSync)(schemaPath, "utf-8");
    const schema = JSON.parse(schemaContent);
    if (argv.validate) {
        const valid = validate(schema, false);
        if (!valid) {
            console.log("Use `validate --debug` to see full validation detail");
            process.exitCode = 1;
            return;
        }
    }
    (0, explode_1.explode)(schema, { dir, format });
})
    .command("implode [options...]", "Pack files and folders into schema file", {
    cwd: {
        description: "Directory containing the exploded schema",
        defaultDescription: "current working directory",
        type: "string",
    },
    outFile: {
        description: "Path to output combined schema file to",
        defaultDescription: "schema.json",
        type: "string",
    },
    stdOut: {
        description: "Output to StdOut instead of file. Overrides outFile",
        type: "boolean",
    },
    indent: {
        description: "Pretty print JSON output with specified number of spaces",
        type: "number",
        demandOption: false,
    },
    validate: {
        description: "Validate schema while reading",
        default: false,
        type: "boolean",
    },
}, (argv) => {
    const cwd = argv.cwd ?? process.cwd();
    const outFile = argv.outFile ?? "schema.json";
    console.log("imploding", { cwd });
    const schema = (0, implode_1.implode)(cwd);
    if (argv.validate) {
        const valid = validate(schema, false);
        if (!valid) {
            console.log("Use `validate --debug` to see full validation detail");
            process.exitCode = 1;
            return;
        }
    }
    const schemaContent = JSON.stringify(schema, null, argv.indent);
    if (argv.stdOut) {
        process.stdout.write(schemaContent, "utf-8");
    }
    else {
        (0, fs_1.writeFileSync)(outFile, schemaContent, "utf-8");
    }
})
    .command("test [schema]", "Test impact of explode/implode", {
    schema: {
        description: "path to the schema JSON file",
        demandOption: true,
        type: "string",
    },
    quiet: {
        description: "Don't print any output if no difference",
        type: "boolean",
    },
}, (argv) => {
    const volume = new memfs_1.default.Volume();
    const fs = memfs_1.default.createFsFromVolume(volume);
    const schemaContent = (0, fs_1.readFileSync)(argv.schema, "utf-8");
    const schema = JSON.parse(schemaContent);
    (0, explode_1.explode)(schema, {
        writeFile(path, content) {
            // Force paths to lowercase to emulate git's default case-insensitivity (for macos and windows compatibility)
            const absPath = (0, path_1.join)("/", path.toLowerCase());
            fs.mkdirSync((0, path_1.dirname)(absPath), { recursive: true });
            fs.writeFileSync(absPath, content, { encoding: "utf-8" });
        },
    });
    const viaExplode = (0, implode_1.parseSchemaDir)({
        find(pattern) {
            return glob_1.default.sync(pattern, { cwd: "/", fs: fs });
        },
        readFile(path) {
            return fs.readFileSync((0, path_1.join)("/", path.toLowerCase()), {
                encoding: "utf-8",
            });
        },
    });
    const viaJSONParse = JSON.parse(JSON.stringify(schema));
    const diff = json_diff_1.default.diffString(viaJSONParse, viaExplode);
    if (diff !== "") {
        console.log(diff);
    }
    else if (!argv.quiet) {
        console.log("No changes");
    }
})
    .command("validate [schema]", "Validate schema for errors", {
    schema: {
        description: "path to the schema JSON file or directory",
        demandOption: true,
        type: "string",
    },
    quiet: {
        description: "Don't print any output if valid",
        type: "boolean",
    },
    debug: {
        description: "Show verbose validation errors",
        type: "boolean",
        default: false,
    },
}, (argv) => {
    const schemaPath = argv.schema;
    const stat = (0, fs_1.statSync)(schemaPath);
    const schema = stat.isFile()
        ? JSON.parse((0, fs_1.readFileSync)(schemaPath, "utf-8"))
        : (0, implode_1.implode)(schemaPath);
    const valid = validate(schema, argv.debug);
    if (!valid) {
        console.log("Add --debug to see full validation detail");
        process.exitCode = 1;
    }
    else if (!argv.quiet) {
        console.log(`Schema at ${schemaPath} is valid`);
    }
})
    .demandCommand()
    .strict()
    .help().argv;
function validate(schema, detailed) {
    const result = schema_parser_1.Schema.safeParse(schema);
    if (!result.success) {
        if (detailed) {
            console.error("\x1b[31m", result.error.toString(), "\x1b[0m");
        }
        else {
            for (const error of result.error.issues) {
                console.error("\x1b[31m", error.message, `(${error.code})`, "at path", error.path.join(" > "), "\x1b[0m");
            }
        }
        return false;
    }
    return true;
}


/***/ }),

/***/ 1326:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fsFileWriter = exports.explode = void 0;
const fs_1 = __nccwpck_require__(7147);
const path_1 = __importStar(__nccwpck_require__(1017));
const yaml_1 = __importDefault(__nccwpck_require__(4083));
function explode(schema, options) {
    const context = new Context(options);
    const { functions, types, resources, language, config, provider, ...remainingSchema } = schema;
    let base = remainingSchema;
    if (config !== undefined) {
        context.writeData("config", config);
    }
    if (provider !== undefined) {
        context.writeData("provider", provider);
    }
    base.language = writeLanguages(language, context);
    base.functions = writeTokens(context, "functions", functions);
    base.resources = writeTokens(context, "resources", resources);
    base.types = writeTokens(context, "types", types);
    context.writeData("base", base);
}
exports.explode = explode;
function fsFileWriter(dir) {
    return (filePath, content) => {
        const combinedPath = path_1.default.join(dir, filePath);
        const combinedDir = (0, path_1.dirname)(combinedPath);
        if (!(0, fs_1.existsSync)(combinedDir)) {
            (0, fs_1.mkdirSync)(combinedDir, { recursive: true });
        }
        return (0, fs_1.writeFileSync)(combinedPath, content, {
            encoding: "utf-8",
        });
    };
}
exports.fsFileWriter = fsFileWriter;
class Context {
    constructor(options) {
        if ("dir" in options) {
            this.write = fsFileWriter(options.dir);
        }
        else {
            this.write = options.writeFile;
        }
        const format = options.format ?? "yaml";
        this.ext = format;
        this.format = format === "yaml" ? formatYaml : formatJson;
        this.writeData = (pathWithoutExtension, data) => {
            this.write(`${pathWithoutExtension}.${this.ext}`, this.format(data));
        };
    }
}
function formatJson(data) {
    return JSON.stringify(data, null, 2);
}
function formatYaml(data) {
    return yaml_1.default.stringify(data, { lineWidth: 0, blockQuote: true });
}
function writeLanguages(language, context) {
    if (typeof language !== "object" || language == null) {
        return language;
    }
    const entries = Object.entries(language);
    if (entries.length === 0) {
        return language;
    }
    for (const [name, lang] of entries) {
        context.writeData(`language.${name}`, lang);
    }
}
function writeTokens(context, type, tokenEntries) {
    if (tokenEntries === undefined) {
        return;
    }
    const entries = Object.entries(tokenEntries);
    if (entries.length === 0) {
        return tokenEntries;
    }
    for (const [token, fn] of entries) {
        writeTokenSpec(type, token, fn, context);
    }
}
function writeTokenSpec(type, token, fn, context) {
    const [provider, modulePath, name] = token.split(":");
    const [module, submodule] = modulePath.split("/");
    const ignoreSubmodule = submodule === undefined ||
        submodule.localeCompare(name, undefined, { sensitivity: "base" }) === 0;
    const dir = ignoreSubmodule
        ? path_1.default.join(module, type)
        : path_1.default.join(module, submodule, type);
    const { description, spec } = formatForOutput(token, fn);
    context.writeData(path_1.default.join(dir, name), spec);
    if (description !== undefined) {
        context.write(path_1.default.join(dir, `${name}.md`), description);
    }
}
function formatForOutput(token, spec) {
    const withToken = { $token: token, ...spec };
    if (spec.description !== undefined && spec.description.length > 400) {
        withToken.description = undefined;
        return { description: spec.description, spec: withToken };
    }
    return { spec: withToken };
}


/***/ }),

/***/ 9958:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSchemaDir = exports.implode = void 0;
const fs_1 = __nccwpck_require__(7147);
const glob_1 = __nccwpck_require__(1957);
const path_1 = __nccwpck_require__(1017);
const yaml_1 = __importDefault(__nccwpck_require__(4083));
function implode(dir) {
    return parseSchemaDir({
        find(pattern) {
            return glob_1.glob.sync(pattern, { cwd: dir });
        },
        readFile(p) {
            return (0, fs_1.readFileSync)((0, path_1.join)(dir, p), "utf-8");
        },
    });
}
exports.implode = implode;
function parseSchemaDir(context) {
    const base = parsePath(context, "base");
    if (base === undefined) {
        throw new Error("base.yaml or base.json not found");
    }
    const config = parsePath(context, "config");
    if (config !== undefined) {
        base.config = config;
    }
    const provider = parsePath(context, "provider");
    if (provider !== undefined) {
        base.provider = provider;
    }
    const language = parseLanguage(context);
    if (language !== undefined) {
        base.language = language;
    }
    const functions = parseTokenSpecs(context, "functions");
    if (functions !== undefined) {
        base.functions = functions;
    }
    const resources = parseTokenSpecs(context, "resources");
    if (resources !== undefined) {
        base.resources = resources;
    }
    const types = parseTokenSpecs(context, "types");
    if (types !== undefined) {
        base.types = types;
    }
    return base;
}
exports.parseSchemaDir = parseSchemaDir;
function parseLanguage(context) {
    let count = 0;
    let language = {};
    const paths = context.find("language.*.*");
    for (const p of paths) {
        const [_, lang, ext] = p.split(".");
        language[lang] = parseContent(context.readFile(p), ext);
        count++;
    }
    if (count === 0) {
        return undefined;
    }
    return language;
}
function parseTokenSpecs(context, type) {
    let count = 0;
    const tokens = {};
    const paths = context.find(`**/${type}/*.@(json|yaml)`);
    for (const path of paths) {
        const ext = (0, path_1.extname)(path);
        let content = parseContent(context.readFile(path), ext);
        const token = content.$token;
        delete content.$token;
        if (!("description" in content)) {
            const mdPath = path.replace(ext, ".md");
            if (context.find(mdPath).length > 0) {
                const description = context.readFile(mdPath);
                // Keep description first
                content = { description, ...content };
            }
        }
        tokens[token] = content;
        count++;
    }
    if (count === 0) {
        return undefined;
    }
    return tokens;
}
function parsePath(context, pathWithoutExtension) {
    const paths = context.find(pathWithoutExtension + ".*");
    if (paths.length === 0) {
        return undefined;
    }
    const path = paths[0];
    return parseContent(context.readFile(path), (0, path_1.extname)(path));
}
function parseContent(content, extension) {
    switch (extension) {
        case ".json":
        case "json":
            return JSON.parse(content);
        case ".yaml":
        case "yaml":
            return yaml_1.default.parse(content);
    }
    throw new Error(`unknown extension: ${extension}`);
}


/***/ }),

/***/ 1873:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Schema = exports.Meta = exports.Config = exports.FunctionSpec = exports.ResourceSpec = exports.ResourceAlias = exports.ComplexTypeSpecObject = exports.ObjectTypeSpec = exports.PropertySpecUnion = exports.PropertySpecUnionDefaultInfo = exports.PropertySpecPrimitive = exports.PropertySpecNamed = exports.PropertySpecUnionDiscriminator = exports.PropertySpecMap = exports.PropertySpecArray = exports.PropertySpecDefaultInfo = exports.ComplexTypeSpecEnum = exports.EnumValueDefinition = exports.PrimitiveTypeEnum = void 0;
const zod_1 = __importDefault(__nccwpck_require__(3301));
exports.PrimitiveTypeEnum = zod_1.default.enum(["boolean", "integer", "number", "string"], { description: "Enum containing possible primitive types" });
exports.EnumValueDefinition = zod_1.default.object({
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the value is deprecated." })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the enum value, if any. Interpreted as Markdown.",
    })
        .optional(),
    name: zod_1.default
        .string({
        description: "If present, overrides the name of the enum value that would usually be derived from the value.",
    })
        .optional(),
    value: exports.PrimitiveTypeEnum.describe("The enum value itself"),
}, { description: "Enum Value Definition" });
exports.ComplexTypeSpecEnum = zod_1.default.object({
    description: zod_1.default
        .string({
        description: "The description of the type, if any. Interpreted as Markdown.",
    })
        .optional(),
    enum: zod_1.default.array(exports.EnumValueDefinition, {
        description: "The list of possible values for the enum",
    }),
    isOverlay: zod_1.default
        .boolean({
        description: "Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
        .optional(),
    language: zod_1.default
        .boolean({
        description: "Additional language-specific data about the type.",
    })
        .optional(),
    type: exports.PrimitiveTypeEnum.describe("The underlying primitive type of the enum"),
}, { description: "Enum Type Definition" });
exports.PropertySpecDefaultInfo = zod_1.default.object({
    environment: zod_1.default
        .string({
        description: "A set of environment variables to probe for a default value.",
    })
        .array(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the default value.",
    })
        .optional(),
}, {
    description: "Additional information about the property's default value, if any.",
});
exports.PropertySpecArray = zod_1.default.lazy(() => zod_1.default.object({
    const: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    default: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    defaultInfo: zod_1.default.optional(exports.PropertySpecDefaultInfo.describe("Additional information about the property's default value, if any.")),
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the property, if any. Interpreted as Markdown.",
    })
        .optional(),
    items: zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ], { description: "The element type of the array" }),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the property.",
    })
        .optional(),
    plain: zod_1.default
        .boolean({
        description: "Indicates that when used as an input, this type does not accept eventual values.",
    })
        .optional(),
    replaceOnChanges: zod_1.default
        .boolean({
        description: "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
    })
        .optional(),
    secret: zod_1.default
        .boolean({
        description: "Specifies whether the property is secret (default false).",
    })
        .optional(),
    type: zod_1.default.literal("array"),
}), {
    description: "Array Property Definition describes an object or resource property",
});
exports.PropertySpecMap = zod_1.default.lazy(() => zod_1.default.object({
    additionalProperties: zod_1.default
        .union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ], {
        description: `The element type of the map. Defaults to "string" when omitted.`,
    })
        .optional(),
    const: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    default: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    defaultInfo: exports.PropertySpecDefaultInfo.describe("Additional information about the property's default value, if any.").optional(),
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the property, if any. Interpreted as Markdown.",
    })
        .optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the property.",
    })
        .optional(),
    plain: zod_1.default
        .boolean({
        description: "Indicates that when used as an input, this type does not accept eventual values.",
    })
        .optional(),
    replaceOnChanges: zod_1.default
        .boolean({
        description: "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
    })
        .optional(),
    secret: zod_1.default
        .boolean({
        description: "Specifies whether the property is secret (default false).",
    })
        .optional(),
    type: zod_1.default.literal("object"),
}), {
    description: "Map Property Definition describes an object or resource property",
});
exports.PropertySpecUnionDiscriminator = zod_1.default.object({
    mapping: zod_1.default
        .record(zod_1.default.string(), zod_1.default.string(), {
        description: "an optional object to hold mappings between payload values and schema names or references",
    })
        .optional(),
    propertyName: zod_1.default.string({
        description: "PropertyName is the name of the property in the payload that will hold the discriminator value",
    }),
}, {
    description: "Informs the consumer of an alternative schema based on the value associated with it",
});
exports.PropertySpecNamed = zod_1.default.object({
    $ref: zod_1.default.string({
        description: `The URI of the referenced type. For example, the built-in Archive, Asset, and Any\ntypes are referenced as "pulumi.json#/Archive", "pulumi.json#/Asset", and "pulumi.json#/Any", respectively.\nA type from this document is referenced as "#/types/pulumi:type:token".\nA type from another document is referenced as "path#/types/pulumi:type:token", where path is of the form:\n  "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"\nA resource from this document is referenced as "#/resources/pulumi:type:token".\nA resource from another document is referenced as "path#/resources/pulumi:type:token", where path is of the form:\n  "/provider/vX.Y.Z/json" or "pulumi.json" or "http[s]://example.com/provider/vX.Y.Z/json"`,
    }),
    const: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    default: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    defaultInfo: exports.PropertySpecDefaultInfo.describe("Additional information about the property's default value, if any.").optional(),
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the property, if any. Interpreted as Markdown.",
    })
        .optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the property.",
    })
        .optional(),
    plain: zod_1.default
        .boolean({
        description: "Indicates that when used as an input, this type does not accept eventual values.",
    })
        .optional(),
    replaceOnChanges: zod_1.default
        .boolean({
        description: "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
    })
        .optional(),
    secret: zod_1.default
        .boolean({
        description: "pecifies whether the property is secret (default false).",
    })
        .optional(),
    type: zod_1.default
        .string({
        description: "gnored; present for compatibility with existing schemas",
    })
        .optional(),
}, {
    description: "Named Property Definition describes an object or resource property",
});
exports.PropertySpecPrimitive = zod_1.default.object({
    const: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    default: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    defaultInfo: zod_1.default.optional(exports.PropertySpecDefaultInfo.describe("Additional information about the property's default value, if any.")),
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the property is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the property, if any. Interpreted as Markdown.",
    })
        .optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the property.",
    })
        .optional(),
    plain: zod_1.default
        .boolean({
        description: "Indicates that when used as an input, this type does not accept eventual values.",
    })
        .optional(),
    replaceOnChanges: zod_1.default
        .boolean({
        description: "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
    })
        .optional(),
    secret: zod_1.default
        .boolean({
        description: "Specifies whether the property is secret (default false).",
    })
        .optional(),
    type: exports.PrimitiveTypeEnum.describe("The primitive type, if any"),
}, {
    description: "Primitive Property Definition describes an object or resource property",
});
exports.PropertySpecUnionDefaultInfo = zod_1.default.object({
    environment: zod_1.default
        .string({
        description: "A set of environment variables to probe for a default value.",
    })
        .array(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the default value.",
    })
        .optional(),
}, {
    description: "Additional information about the property's default value, if any.",
});
exports.PropertySpecUnion = zod_1.default.lazy(() => zod_1.default.object({
    const: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The constant value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    default: zod_1.default
        .union([zod_1.default.boolean(), zod_1.default.number(), zod_1.default.string()], {
        description: "The default value for the property, if any. The type of the value must be assignable to the type of the property.",
    })
        .optional(),
    defaultInfo: zod_1.default.optional(exports.PropertySpecUnionDefaultInfo.describe("Additional information about the property's default value, if any.")),
    deprecationMessage: zod_1.default
        .string({
        description: "Indicates whether the property is deprecated",
    })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the property, if any. Interpreted as Markdown.",
    })
        .optional(),
    discriminator: exports.PropertySpecUnionDiscriminator.describe("Informs the consumer of an alternative schema based on the value associated with it").optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the property.",
    })
        .optional(),
    oneOf: zod_1.default.array(zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ], {
        description: "If present, indicates that values of the type may be one of any of the listed types",
    })),
    plain: zod_1.default
        .boolean({
        description: "Indicates that when used as an input, this type does not accept eventual values.",
    })
        .optional(),
    replaceOnChanges: zod_1.default
        .boolean({
        description: "Specifies whether a change to the property causes its containing resource to be replaced instead of updated (default false).",
    })
        .optional(),
    secret: zod_1.default
        .boolean({
        description: "Specifies whether the property is secret (default false).",
    })
        .optional(),
    type: exports.PrimitiveTypeEnum.describe("The underlying primitive type of the union, if any").optional(),
}, {
    description: "Union Property Definition describes an object or resource property",
}));
exports.ObjectTypeSpec = zod_1.default.object({
    properties: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ]), {
        description: "A map from property name to propertySpec that describes the object's properties.",
    })
        .optional(),
    required: zod_1.default
        .array(zod_1.default.string(), {
        description: "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
        .optional(),
}, { description: "Object Type Details" });
exports.ComplexTypeSpecObject = zod_1.default.object({
    description: zod_1.default
        .string({
        description: "The description of the type, if any. Interpreted as Markdown.",
    })
        .optional(),
    isOverlay: zod_1.default
        .boolean({
        description: "Indicates that the implementation of the type should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
        .optional(),
    language: zod_1.default
        .any({ description: "Additional language-specific data about the type." })
        .optional(),
    properties: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ]), {
        description: "A map from property name to propertySpec that describes the object's properties.",
    })
        .optional(),
    required: zod_1.default
        .array(zod_1.default.string(), {
        description: "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
        .optional(),
}, { description: "Complex object Type Details" });
exports.ResourceAlias = zod_1.default.object({
    name: zod_1.default
        .string({ description: "The name portion of the alias, if any" })
        .optional(),
    project: zod_1.default
        .string({ description: "The project portion of the alias, if any" })
        .optional(),
    type: zod_1.default
        .string({ description: "The type portion of the alias, if any" })
        .optional(),
}, { description: "An alias for a resource" });
exports.ResourceSpec = zod_1.default.object({
    aliases: zod_1.default
        .array(exports.ResourceAlias, {
        description: "The list of aliases for the resource.",
    })
        .optional(),
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the resource is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the resource, if any. Interpreted as Markdown.",
    })
        .optional(),
    inputProperties: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ]), {
        description: "A map from property name to propertySpec that describes the resource's input properties.",
    })
        .optional(),
    isComponent: zod_1.default
        .boolean({
        description: "Indicates whether the resource is a component.",
    })
        .optional(),
    isOverlay: zod_1.default
        .boolean({
        description: "Indicates that the implementation of the resource should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
        .optional(),
    methods: zod_1.default
        .record(zod_1.default.string(), zod_1.default.string(), {
        description: "A map from method name to function token that describes the resource's method set.",
    })
        .optional(),
    properties: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ]), {
        description: "A map from property name to propertySpec that describes the object's properties.",
    })
        .optional(),
    required: zod_1.default
        .array(zod_1.default.string(), {
        description: "A list of the names of an object type's required properties. These properties must be set for inputs and will always be set for outputs.",
    })
        .optional(),
    requiredInputs: zod_1.default
        .array(zod_1.default.string(), {
        description: "A list of the names of the resource's required input properties.",
    })
        .optional(),
    stateInputs: exports.ObjectTypeSpec.describe("An optional objectTypeSpec that describes additional inputs that mau be necessary to get an existing resource. If this is unset, only an ID is necessary.").optional(),
}, { description: "Resource Definition describes a resource or component." });
exports.FunctionSpec = zod_1.default.object({
    deprecationMessage: zod_1.default
        .string({ description: "Indicates whether the function is deprecated" })
        .optional(),
    description: zod_1.default
        .string({
        description: "The description of the function, if any. Interpreted as Markdown.",
    })
        .optional(),
    inputs: exports.ObjectTypeSpec.describe("The bag of input values for the function, if any.").optional(),
    isOverlay: zod_1.default
        .boolean({
        description: "Indicates that the implementation of the function should not be generated from the schema, and is instead provided out-of-band by the package author",
    })
        .optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the function.",
    })
        .optional(),
    outputs: exports.ObjectTypeSpec.describe("The bag of output values for the function, if any.").optional(),
}, { description: "Function Definition describes a function." });
exports.Config = zod_1.default.object({
    required: zod_1.default
        .array(zod_1.default.string(), {
        description: "A list of the names of the package's required configuration variables.",
    })
        .optional(),
    variables: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([
        exports.PropertySpecPrimitive,
        exports.PropertySpecArray,
        exports.PropertySpecMap,
        exports.PropertySpecNamed,
        exports.PropertySpecUnion,
    ]), {
        description: "A map from variable name to propertySpec that describes a package's configuration variables.",
    })
        .optional(),
}, { description: "The package's configuration variables." });
exports.Meta = zod_1.default.object({
    moduleFormat: zod_1.default.string({
        description: `A regex that is used by the importer to extract a module name from the module portion of a type token. Packages that use the module format "namespace1/namespace2/.../namespaceN" do not need to specify a format. The regex must define one capturing group that contains the module name, which must be formatted as "namespace1/namespace2/...namespaceN".`,
    }),
}, { description: "Format metadata about this package." });
exports.Schema = zod_1.default.object({
    attribution: zod_1.default
        .string({
        description: "Freeform text attribution of derived work, if required.",
    })
        .optional(),
    config: exports.Config.describe("The package's configuration variables.").optional(),
    description: zod_1.default
        .string({
        description: "The description of the package. Descriptions are interpreted as Markdown.",
    })
        .optional(),
    displayName: zod_1.default
        .string({ description: "The human-friendly name of the package." })
        .optional(),
    functions: zod_1.default
        .record(zod_1.default.string(), exports.FunctionSpec, {
        description: "A map from token to functionSpec that describes the set of functions defined by this package.",
    })
        .optional(),
    homepage: zod_1.default.string({ description: "The package's homepage." }).optional(),
    keywords: zod_1.default
        .array(zod_1.default.string(), {
        description: "The list of keywords that are associated with the package, if any.",
    })
        .optional(),
    language: zod_1.default
        .any({
        description: "Additional language-specific data about the package.",
    })
        .optional(),
    license: zod_1.default
        .string({
        description: "The name of the license used for the package's contents.",
    })
        .optional(),
    logoUrl: zod_1.default
        .string({
        description: "The URL of the package's logo, if any.",
    })
        .optional(),
    meta: exports.Meta.describe("Format metadata about this package.").optional(),
    name: zod_1.default.string({
        description: `The unqualified name of the package (e.g. "aws", "azure", "gcp", "kubernetes", "random")`,
    }),
    pluginDownloadUrl: zod_1.default
        .string({
        description: "The URL to use when downloading the provider plugin binary.",
    })
        .optional(),
    provider: exports.ResourceSpec.describe("The provider type for this package.").optional(),
    publisher: zod_1.default
        .string({
        description: "The name of the person or organization that authored and published the package.",
    })
        .optional(),
    repository: zod_1.default
        .string({
        description: "The URL at which the package's sources can be found.",
    })
        .optional(),
    resources: zod_1.default
        .record(zod_1.default.string(), exports.ResourceSpec, {
        description: "A map from type token to resourceSpec that describes the set of resources and components defined by this package.",
    })
        .optional(),
    types: zod_1.default
        .record(zod_1.default.string(), zod_1.default.union([exports.ComplexTypeSpecObject, exports.ComplexTypeSpecEnum]), {
        description: "A map from type token to complexTypeSpec that describes the set of complex types (i.e. object, enum) defined by this package.",
    })
        .optional(),
    version: zod_1.default
        .string({
        description: "The version of the package. The version must be valid semver.",
    })
        .optional(),
}, { description: "A description of the schema for a Pulumi Package" });


/***/ }),

/***/ 5670:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 5670;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 9167:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 9167;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 4907:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 4907;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8109:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);
var resolveBlockMap = __nccwpck_require__(2986);
var resolveBlockSeq = __nccwpck_require__(2289);
var resolveFlowCollection = __nccwpck_require__(45);

function composeCollection(CN, ctx, token, tagToken, onError) {
    let coll;
    switch (token.type) {
        case 'block-map': {
            coll = resolveBlockMap.resolveBlockMap(CN, ctx, token, onError);
            break;
        }
        case 'block-seq': {
            coll = resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError);
            break;
        }
        case 'flow-collection': {
            coll = resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError);
            break;
        }
    }
    if (!tagToken)
        return coll;
    const tagName = ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg));
    if (!tagName)
        return coll;
    // Cast needed due to: https://github.com/Microsoft/TypeScript/issues/3841
    const Coll = coll.constructor;
    if (tagName === '!' || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
    }
    const expType = Node.isMap(coll) ? 'map' : 'seq';
    let tag = ctx.schema.tags.find(t => t.collection === expType && t.tag === tagName);
    if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
            ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
            tag = kt;
        }
        else {
            onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, true);
            coll.tag = tagName;
            return coll;
        }
    }
    const res = tag.resolve(coll, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg), ctx.options);
    const node = Node.isNode(res)
        ? res
        : new Scalar.Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag?.format)
        node.format = tag.format;
    return node;
}

exports.composeCollection = composeCollection;


/***/ }),

/***/ 5050:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Document = __nccwpck_require__(42);
var composeNode = __nccwpck_require__(8676);
var resolveEnd = __nccwpck_require__(1250);
var resolveProps = __nccwpck_require__(6985);

function composeDoc(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives }, options);
    const doc = new Document.Document(undefined, opts);
    const ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
    };
    const props = resolveProps.resolveProps(start, {
        indicator: 'doc-start',
        next: value ?? end?.[0],
        offset,
        onError,
        startOnNewline: true
    });
    if (props.found) {
        doc.directives.docStart = true;
        if (value &&
            (value.type === 'block-map' || value.type === 'block-seq') &&
            !props.hasNewline)
            onError(props.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker');
    }
    doc.contents = value
        ? composeNode.composeNode(ctx, value, props, onError)
        : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
    if (re.comment)
        doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
}

exports.composeDoc = composeDoc;


/***/ }),

/***/ 8676:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Alias = __nccwpck_require__(5639);
var composeCollection = __nccwpck_require__(8109);
var composeScalar = __nccwpck_require__(4766);
var resolveEnd = __nccwpck_require__(1250);
var utilEmptyScalarPosition = __nccwpck_require__(8781);

const CN = { composeNode, composeEmptyNode };
function composeNode(ctx, token, props, onError) {
    const { spaceBefore, comment, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
        case 'alias':
            node = composeAlias(ctx, token, onError);
            if (anchor || tag)
                onError(token, 'ALIAS_PROPS', 'An alias node must not specify any properties');
            break;
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'block-scalar':
            node = composeScalar.composeScalar(ctx, token, tag, onError);
            if (anchor)
                node.anchor = anchor.source.substring(1);
            break;
        case 'block-map':
        case 'block-seq':
        case 'flow-collection':
            node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
            if (anchor)
                node.anchor = anchor.source.substring(1);
            break;
        default: {
            const message = token.type === 'error'
                ? token.message
                : `Unsupported token (type: ${token.type})`;
            onError(token, 'UNEXPECTED_TOKEN', message);
            node = composeEmptyNode(ctx, token.offset, undefined, null, props, onError);
            isSrcToken = false;
        }
    }
    if (anchor && node.anchor === '')
        onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment) {
        if (token.type === 'scalar' && token.source === '')
            node.comment = comment;
        else
            node.commentBefore = comment;
    }
    // @ts-expect-error Type checking misses meaning of isSrcToken
    if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
    return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag }, onError) {
    const token = {
        type: 'scalar',
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ''
    };
    const node = composeScalar.composeScalar(ctx, token, tag, onError);
    if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === '')
            onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    }
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment)
        node.comment = comment;
    return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias.Alias(source.substring(1));
    if (alias.source === '')
        onError(offset, 'BAD_ALIAS', 'Alias cannot be an empty string');
    if (alias.source.endsWith(':'))
        onError(offset + source.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', true);
    const valueEnd = offset + source.length;
    const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re.offset];
    if (re.comment)
        alias.comment = re.comment;
    return alias;
}

exports.composeEmptyNode = composeEmptyNode;
exports.composeNode = composeNode;


/***/ }),

/***/ 4766:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);
var resolveBlockScalar = __nccwpck_require__(9485);
var resolveFlowScalar = __nccwpck_require__(7578);

function composeScalar(ctx, token, tagToken, onError) {
    const { value, type, comment, range } = token.type === 'block-scalar'
        ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError)
        : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken
        ? ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg))
        : null;
    const tag = tagToken && tagName
        ? findScalarTagByName(ctx.schema, value, tagName, tagToken, onError)
        : token.type === 'scalar'
            ? findScalarTagByTest(ctx, value, token, onError)
            : ctx.schema[Node.SCALAR];
    let scalar;
    try {
        const res = tag.resolve(value, msg => onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg), ctx.options);
        scalar = Node.isScalar(res) ? res : new Scalar.Scalar(res);
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg);
        scalar = new Scalar.Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type)
        scalar.type = type;
    if (tagName)
        scalar.tag = tagName;
    if (tag.format)
        scalar.format = tag.format;
    if (comment)
        scalar.comment = comment;
    return scalar;
}
function findScalarTagByName(schema, value, tagName, tagToken, onError) {
    if (tagName === '!')
        return schema[Node.SCALAR]; // non-specific tag
    const matchWithTest = [];
    for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
            if (tag.default && tag.test)
                matchWithTest.push(tag);
            else
                return tag;
        }
    }
    for (const tag of matchWithTest)
        if (tag.test?.test(value))
            return tag;
    const kt = schema.knownTags[tagName];
    if (kt && !kt.collection) {
        // Ensure that the known tag is available for stringifying,
        // but does not get used by default.
        schema.tags.push(Object.assign({}, kt, { default: false, test: undefined }));
        return kt;
    }
    onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, tagName !== 'tag:yaml.org,2002:str');
    return schema[Node.SCALAR];
}
function findScalarTagByTest({ directives, schema }, value, token, onError) {
    const tag = schema.tags.find(tag => tag.default && tag.test?.test(value)) || schema[Node.SCALAR];
    if (schema.compat) {
        const compat = schema.compat.find(tag => tag.default && tag.test?.test(value)) ??
            schema[Node.SCALAR];
        if (tag.tag !== compat.tag) {
            const ts = directives.tagString(tag.tag);
            const cs = directives.tagString(compat.tag);
            const msg = `Value may be parsed as either ${ts} or ${cs}`;
            onError(token, 'TAG_RESOLVE_FAILED', msg, true);
        }
    }
    return tag;
}

exports.composeScalar = composeScalar;


/***/ }),

/***/ 9493:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var directives = __nccwpck_require__(5400);
var Document = __nccwpck_require__(42);
var errors = __nccwpck_require__(4236);
var Node = __nccwpck_require__(1399);
var composeDoc = __nccwpck_require__(5050);
var resolveEnd = __nccwpck_require__(1250);

function getErrorPos(src) {
    if (typeof src === 'number')
        return [src, src + 1];
    if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === 'string' ? source.length : 1)];
}
function parsePrelude(prelude) {
    let comment = '';
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
            case '#':
                comment +=
                    (comment === '' ? '' : afterEmptyLine ? '\n\n' : '\n') +
                        (source.substring(1) || ' ');
                atComment = true;
                afterEmptyLine = false;
                break;
            case '%':
                if (prelude[i + 1]?.[0] !== '#')
                    i += 1;
                atComment = false;
                break;
            default:
                // This may be wrong after doc-end, but in that case it doesn't matter
                if (!atComment)
                    afterEmptyLine = true;
                atComment = false;
        }
    }
    return { comment, afterEmptyLine };
}
/**
 * Compose a stream of CST nodes into a stream of YAML Documents.
 *
 * ```ts
 * import { Composer, Parser } from 'yaml'
 *
 * const src: string = ...
 * const tokens = new Parser().parse(src)
 * const docs = new Composer().compose(tokens)
 * ```
 */
class Composer {
    constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
            const pos = getErrorPos(source);
            if (warning)
                this.warnings.push(new errors.YAMLWarning(pos, code, message));
            else
                this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        this.directives = new directives.Directives({ version: options.version || '1.2' });
        this.options = options;
    }
    decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        //console.log({ dc: doc.comment, prelude, comment })
        if (comment) {
            const dc = doc.contents;
            if (afterDoc) {
                doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment;
            }
            else if (afterEmptyLine || doc.directives.docStart || !dc) {
                doc.commentBefore = comment;
            }
            else if (Node.isCollection(dc) && !dc.flow && dc.items.length > 0) {
                let it = dc.items[0];
                if (Node.isPair(it))
                    it = it.key;
                const cb = it.commentBefore;
                it.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
            else {
                const cb = dc.commentBefore;
                dc.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
        }
        if (afterDoc) {
            Array.prototype.push.apply(doc.errors, this.errors);
            Array.prototype.push.apply(doc.warnings, this.warnings);
        }
        else {
            doc.errors = this.errors;
            doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
    }
    /**
     * Current stream status information.
     *
     * Mostly useful at the end of input for an empty stream.
     */
    streamInfo() {
        return {
            comment: parsePrelude(this.prelude).comment,
            directives: this.directives,
            errors: this.errors,
            warnings: this.warnings
        };
    }
    /**
     * Compose tokens into documents.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
            yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
    }
    /** Advance the composer by one CST token. */
    *next(token) {
        if (process.env.LOG_STREAM)
            console.dir(token, { depth: null });
        switch (token.type) {
            case 'directive':
                this.directives.add(token.source, (offset, message, warning) => {
                    const pos = getErrorPos(token);
                    pos[0] += offset;
                    this.onError(pos, 'BAD_DIRECTIVE', message, warning);
                });
                this.prelude.push(token.source);
                this.atDirectives = true;
                break;
            case 'document': {
                const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
                if (this.atDirectives && !doc.directives.docStart)
                    this.onError(token, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line');
                this.decorate(doc, false);
                if (this.doc)
                    yield this.doc;
                this.doc = doc;
                this.atDirectives = false;
                break;
            }
            case 'byte-order-mark':
            case 'space':
                break;
            case 'comment':
            case 'newline':
                this.prelude.push(token.source);
                break;
            case 'error': {
                const msg = token.source
                    ? `${token.message}: ${JSON.stringify(token.source)}`
                    : token.message;
                const error = new errors.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg);
                if (this.atDirectives || !this.doc)
                    this.errors.push(error);
                else
                    this.doc.errors.push(error);
                break;
            }
            case 'doc-end': {
                if (!this.doc) {
                    const msg = 'Unexpected doc-end without preceding document';
                    this.errors.push(new errors.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg));
                    break;
                }
                this.doc.directives.docEnd = true;
                const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
                this.decorate(this.doc, true);
                if (end.comment) {
                    const dc = this.doc.comment;
                    this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment;
                }
                this.doc.range[2] = end.offset;
                break;
            }
            default:
                this.errors.push(new errors.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', `Unsupported token ${token.type}`));
        }
    }
    /**
     * Call at end of input to yield any remaining document.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
            this.decorate(this.doc, true);
            yield this.doc;
            this.doc = null;
        }
        else if (forceDoc) {
            const opts = Object.assign({ _directives: this.directives }, this.options);
            const doc = new Document.Document(undefined, opts);
            if (this.atDirectives)
                this.onError(endOffset, 'MISSING_CHAR', 'Missing directives-end indicator line');
            doc.range = [0, endOffset, endOffset];
            this.decorate(doc, false);
            yield doc;
        }
    }
}

exports.Composer = Composer;


/***/ }),

/***/ 2986:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Pair = __nccwpck_require__(246);
var YAMLMap = __nccwpck_require__(6011);
var resolveProps = __nccwpck_require__(6985);
var utilContainsNewline = __nccwpck_require__(976);
var utilFlowIndentCheck = __nccwpck_require__(3669);
var utilMapIncludes = __nccwpck_require__(6899);

const startColMsg = 'All mapping items must start at the same column';
function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError) {
    const map = new YAMLMap.YAMLMap(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    let offset = bm.offset;
    for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        // key properties
        const keyProps = resolveProps.resolveProps(start, {
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
            if (key) {
                if (key.type === 'block-seq')
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'A block sequence may not be used as an implicit map key');
                else if ('indent' in key && key.indent !== bm.indent)
                    onError(offset, 'BAD_INDENT', startColMsg);
            }
            if (!keyProps.anchor && !keyProps.tag && !sep) {
                // TODO: assert being at last item?
                if (keyProps.comment) {
                    if (map.comment)
                        map.comment += '\n' + keyProps.comment;
                    else
                        map.comment = keyProps.comment;
                }
                continue;
            }
            if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
                onError(key ?? start[start.length - 1], 'MULTILINE_IMPLICIT_KEY', 'Implicit keys need to be on a single line');
            }
        }
        else if (keyProps.found?.indent !== bm.indent) {
            onError(offset, 'BAD_INDENT', startColMsg);
        }
        // key value
        const keyStart = keyProps.end;
        const keyNode = key
            ? composeNode(ctx, key, keyProps, onError)
            : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
            onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
        // value properties
        const valueProps = resolveProps.resolveProps(sep ?? [], {
            indicator: 'map-value-ind',
            next: value,
            offset: keyNode.range[2],
            onError,
            startOnNewline: !key || key.type === 'block-scalar'
        });
        offset = valueProps.end;
        if (valueProps.found) {
            if (implicitKey) {
                if (value?.type === 'block-map' && !valueProps.hasNewline)
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings');
                if (ctx.options.strict &&
                    keyProps.start < valueProps.found.offset - 1024)
                    onError(keyNode.range, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit block mapping key');
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
            if (ctx.schema.compat)
                utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
            offset = valueNode.range[2];
            const pair = new Pair.Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
        else {
            // key with no value
            if (implicitKey)
                onError(keyNode.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values');
            if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair.Pair(keyNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
    }
    map.range = [bm.offset, offset, offset];
    return map;
}

exports.resolveBlockMap = resolveBlockMap;


/***/ }),

/***/ 9485:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);

function resolveBlockScalar(scalar, strict, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, strict, onError);
    if (!header)
        return { value: '', type: null, comment: '', range: [start, start, start] };
    const type = header.mode === '>' ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    // determine the end of content & start of chomping
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === '' || content === '\r')
            chompStart = i;
        else
            break;
    }
    // shortcut for empty contents
    if (chompStart === 0) {
        const value = header.chomp === '+' && lines.length > 0
            ? '\n'.repeat(Math.max(1, lines.length - 1))
            : '';
        let end = start + header.length;
        if (scalar.source)
            end += scalar.source.length;
        return { value, type, comment: header.comment, range: [start, end, end] };
    }
    // find the indentation level to trim from start
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === '' || content === '\r') {
            if (header.indent === 0 && indent.length > trimIndent)
                trimIndent = indent.length;
        }
        else {
            if (indent.length < trimIndent) {
                const message = 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator';
                onError(offset + indent.length, 'MISSING_CHAR', message);
            }
            if (header.indent === 0)
                trimIndent = indent.length;
            contentStart = i;
            break;
        }
        offset += indent.length + content.length + 1;
    }
    // include trailing more-indented empty lines in content
    for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
            chompStart = i + 1;
    }
    let value = '';
    let sep = '';
    let prevMoreIndented = false;
    // leading whitespace is kept intact
    for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + '\n';
    for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === '\r';
        if (crlf)
            content = content.slice(0, -1);
        /* istanbul ignore if already caught in lexer */
        if (content && indent.length < trimIndent) {
            const src = header.indent
                ? 'explicit indentation indicator'
                : 'first line';
            const message = `Block scalar lines must not be less indented than their ${src}`;
            onError(offset - content.length - (crlf ? 2 : 1), 'BAD_INDENT', message);
            indent = '';
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
        }
        else if (indent.length > trimIndent || content[0] === '\t') {
            // more-indented content within a folded block
            if (sep === ' ')
                sep = '\n';
            else if (!prevMoreIndented && sep === '\n')
                sep = '\n\n';
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
            prevMoreIndented = true;
        }
        else if (content === '') {
            // empty line
            if (sep === '\n')
                value += '\n';
            else
                sep = '\n';
        }
        else {
            value += sep + content;
            sep = ' ';
            prevMoreIndented = false;
        }
    }
    switch (header.chomp) {
        case '-':
            break;
        case '+':
            for (let i = chompStart; i < lines.length; ++i)
                value += '\n' + lines[i][0].slice(trimIndent);
            if (value[value.length - 1] !== '\n')
                value += '\n';
            break;
        default:
            value += '\n';
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
    /* istanbul ignore if should not happen */
    if (props[0].type !== 'block-scalar-header') {
        onError(props[0], 'IMPOSSIBLE', 'Block scalar header not found');
        return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = '';
    let error = -1;
    for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === '-' || ch === '+'))
            chomp = ch;
        else {
            const n = Number(ch);
            if (!indent && n)
                indent = n;
            else if (error === -1)
                error = offset + i;
        }
    }
    if (error !== -1)
        onError(error, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${source}`);
    let hasSpace = false;
    let comment = '';
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
            case 'space':
                hasSpace = true;
            // fallthrough
            case 'newline':
                length += token.source.length;
                break;
            case 'comment':
                if (strict && !hasSpace) {
                    const message = 'Comments must be separated from other tokens by white space characters';
                    onError(token, 'MISSING_CHAR', message);
                }
                length += token.source.length;
                comment = token.source.substring(1);
                break;
            case 'error':
                onError(token, 'UNEXPECTED_TOKEN', token.message);
                length += token.source.length;
                break;
            /* istanbul ignore next should not happen */
            default: {
                const message = `Unexpected token in block scalar header: ${token.type}`;
                onError(token, 'UNEXPECTED_TOKEN', message);
                const ts = token.source;
                if (ts && typeof ts === 'string')
                    length += ts.length;
            }
        }
    }
    return { mode, indent, chomp, comment, length };
}
/** @returns Array of lines split up as `[indent, content]` */
function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m = first.match(/^( *)/);
    const line0 = m?.[1]
        ? [m[1], first.slice(m[1].length)]
        : ['', first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
    return lines;
}

exports.resolveBlockScalar = resolveBlockScalar;


/***/ }),

/***/ 2289:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var YAMLSeq = __nccwpck_require__(5161);
var resolveProps = __nccwpck_require__(6985);
var utilFlowIndentCheck = __nccwpck_require__(3669);

function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError) {
    const seq = new YAMLSeq.YAMLSeq(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    let offset = bs.offset;
    for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
            indicator: 'seq-item-ind',
            next: value,
            offset,
            onError,
            startOnNewline: true
        });
        offset = props.end;
        if (!props.found) {
            if (props.anchor || props.tag || value) {
                if (value && value.type === 'block-seq')
                    onError(offset, 'BAD_INDENT', 'All sequence items must start at the same column');
                else
                    onError(offset, 'MISSING_CHAR', 'Sequence item without - indicator');
            }
            else {
                // TODO: assert being at last item?
                if (props.comment)
                    seq.comment = props.comment;
                continue;
            }
        }
        const node = value
            ? composeNode(ctx, value, props, onError)
            : composeEmptyNode(ctx, offset, start, null, props, onError);
        if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
    }
    seq.range = [bs.offset, offset, offset];
    return seq;
}

exports.resolveBlockSeq = resolveBlockSeq;


/***/ }),

/***/ 1250:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function resolveEnd(end, offset, reqSpace, onError) {
    let comment = '';
    if (end) {
        let hasSpace = false;
        let sep = '';
        for (const token of end) {
            const { source, type } = token;
            switch (type) {
                case 'space':
                    hasSpace = true;
                    break;
                case 'comment': {
                    if (reqSpace && !hasSpace)
                        onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                    const cb = source.substring(1) || ' ';
                    if (!comment)
                        comment = cb;
                    else
                        comment += sep + cb;
                    sep = '';
                    break;
                }
                case 'newline':
                    if (comment)
                        sep += source;
                    hasSpace = true;
                    break;
                default:
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${type} at node end`);
            }
            offset += source.length;
        }
    }
    return { comment, offset };
}

exports.resolveEnd = resolveEnd;


/***/ }),

/***/ 45:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var YAMLMap = __nccwpck_require__(6011);
var YAMLSeq = __nccwpck_require__(5161);
var resolveEnd = __nccwpck_require__(1250);
var resolveProps = __nccwpck_require__(6985);
var utilContainsNewline = __nccwpck_require__(976);
var utilMapIncludes = __nccwpck_require__(6899);

const blockMsg = 'Block collections are not allowed within flow collections';
const isBlock = (token) => token && (token.type === 'block-map' || token.type === 'block-seq');
function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError) {
    const isMap = fc.start.source === '{';
    const fcName = isMap ? 'flow map' : 'flow sequence';
    const coll = isMap
        ? new YAMLMap.YAMLMap(ctx.schema)
        : new YAMLSeq.YAMLSeq(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot)
        ctx.atRoot = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
            flow: fcName,
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            startOnNewline: false
        });
        if (!props.found) {
            if (!props.anchor && !props.tag && !sep && !value) {
                if (i === 0 && props.comma)
                    onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
                else if (i < fc.items.length - 1)
                    onError(props.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${fcName}`);
                if (props.comment) {
                    if (coll.comment)
                        coll.comment += '\n' + props.comment;
                    else
                        coll.comment = props.comment;
                }
                offset = props.end;
                continue;
            }
            if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
                onError(key, // checked by containsNewline()
                'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
        }
        if (i === 0) {
            if (props.comma)
                onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
        }
        else {
            if (!props.comma)
                onError(props.start, 'MISSING_CHAR', `Missing , between ${fcName} items`);
            if (props.comment) {
                let prevItemComment = '';
                loop: for (const st of start) {
                    switch (st.type) {
                        case 'comma':
                        case 'space':
                            break;
                        case 'comment':
                            prevItemComment = st.source.substring(1);
                            break loop;
                        default:
                            break loop;
                    }
                }
                if (prevItemComment) {
                    let prev = coll.items[coll.items.length - 1];
                    if (Node.isPair(prev))
                        prev = prev.value ?? prev.key;
                    if (prev.comment)
                        prev.comment += '\n' + prevItemComment;
                    else
                        prev.comment = prevItemComment;
                    props.comment = props.comment.substring(prevItemComment.length + 1);
                }
            }
        }
        if (!isMap && !sep && !props.found) {
            // item is a value in a seq
            // → key & sep are empty, start does not include ? or :
            const valueNode = value
                ? composeNode(ctx, value, props, onError)
                : composeEmptyNode(ctx, props.end, sep, null, props, onError);
            coll.items.push(valueNode);
            offset = valueNode.range[2];
            if (isBlock(value))
                onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
        }
        else {
            // item is a key+value pair
            // key value
            const keyStart = props.end;
            const keyNode = key
                ? composeNode(ctx, key, props, onError)
                : composeEmptyNode(ctx, keyStart, start, null, props, onError);
            if (isBlock(key))
                onError(keyNode.range, 'BLOCK_IN_FLOW', blockMsg);
            // value properties
            const valueProps = resolveProps.resolveProps(sep ?? [], {
                flow: fcName,
                indicator: 'map-value-ind',
                next: value,
                offset: keyNode.range[2],
                onError,
                startOnNewline: false
            });
            if (valueProps.found) {
                if (!isMap && !props.found && ctx.options.strict) {
                    if (sep)
                        for (const st of sep) {
                            if (st === valueProps.found)
                                break;
                            if (st.type === 'newline') {
                                onError(st, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
                                break;
                            }
                        }
                    if (props.start < valueProps.found.offset - 1024)
                        onError(valueProps.found, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key');
                }
            }
            else if (value) {
                if ('source' in value && value.source && value.source[0] === ':')
                    onError(value, 'MISSING_CHAR', `Missing space after : in ${fcName}`);
                else
                    onError(valueProps.start, 'MISSING_CHAR', `Missing , or : between ${fcName} items`);
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : valueProps.found
                    ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError)
                    : null;
            if (valueNode) {
                if (isBlock(value))
                    onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
            }
            else if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair.Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            if (isMap) {
                const map = coll;
                if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
                    onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
                map.items.push(pair);
            }
            else {
                const map = new YAMLMap.YAMLMap(ctx.schema);
                map.flow = true;
                map.items.push(pair);
                coll.items.push(map);
            }
            offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
    }
    const expectedEnd = isMap ? '}' : ']';
    const [ce, ...ee] = fc.end;
    let cePos = offset;
    if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
    else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot
            ? `${name} must end with a ${expectedEnd}`
            : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? 'MISSING_CHAR' : 'BAD_INDENT', msg);
        if (ce && ce.source.length !== 1)
            ee.unshift(ce);
    }
    if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
            if (coll.comment)
                coll.comment += '\n' + end.comment;
            else
                coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
    }
    else {
        coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
}

exports.resolveFlowCollection = resolveFlowCollection;


/***/ }),

/***/ 7578:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var resolveEnd = __nccwpck_require__(1250);

function resolveFlowScalar(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
    switch (type) {
        case 'scalar':
            _type = Scalar.Scalar.PLAIN;
            value = plainValue(source, _onError);
            break;
        case 'single-quoted-scalar':
            _type = Scalar.Scalar.QUOTE_SINGLE;
            value = singleQuotedValue(source, _onError);
            break;
        case 'double-quoted-scalar':
            _type = Scalar.Scalar.QUOTE_DOUBLE;
            value = doubleQuotedValue(source, _onError);
            break;
        /* istanbul ignore next should not happen */
        default:
            onError(scalar, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${type}`);
            return {
                value: '',
                type: null,
                comment: '',
                range: [offset, offset + source.length, offset + source.length]
            };
    }
    const valueEnd = offset + source.length;
    const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
    return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
    };
}
function plainValue(source, onError) {
    let badChar = '';
    switch (source[0]) {
        /* istanbul ignore next should not happen */
        case '\t':
            badChar = 'a tab character';
            break;
        case ',':
            badChar = 'flow indicator character ,';
            break;
        case '%':
            badChar = 'directive indicator character %';
            break;
        case '|':
        case '>': {
            badChar = `block scalar indicator ${source[0]}`;
            break;
        }
        case '@':
        case '`': {
            badChar = `reserved character ${source[0]}`;
            break;
        }
    }
    if (badChar)
        onError(0, 'BAD_SCALAR_START', `Plain value cannot start with ${badChar}`);
    return foldLines(source);
}
function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, 'MISSING_CHAR', "Missing closing 'quote");
    return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
    /**
     * The negative lookbehind here and in the `re` RegExp is to
     * prevent causing a polynomial search time in certain cases.
     *
     * The try-catch is for Safari, which doesn't support this yet:
     * https://caniuse.com/js-regexp-lookbehind
     */
    let first, line;
    try {
        first = new RegExp('(.*?)(?<![ \t])[ \t]*\r?\n', 'sy');
        line = new RegExp('[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\r?\n', 'sy');
    }
    catch (_) {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
    }
    let match = first.exec(source);
    if (!match)
        return source;
    let res = match[1];
    let sep = ' ';
    let pos = first.lastIndex;
    line.lastIndex = pos;
    while ((match = line.exec(source))) {
        if (match[1] === '') {
            if (sep === '\n')
                res += sep;
            else
                sep = '\n';
        }
        else {
            res += sep + match[1];
            sep = ' ';
        }
        pos = line.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + (match?.[1] ?? '');
}
function doubleQuotedValue(source, onError) {
    let res = '';
    for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === '\r' && source[i + 1] === '\n')
            continue;
        if (ch === '\n') {
            const { fold, offset } = foldNewline(source, i);
            res += fold;
            i = offset;
        }
        else if (ch === '\\') {
            let next = source[++i];
            const cc = escapeCodes[next];
            if (cc)
                res += cc;
            else if (next === '\n') {
                // skip escaped newlines, but still trim the following line
                next = source[i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === '\r' && source[i + 1] === '\n') {
                // skip escaped CRLF newlines, but still trim the following line
                next = source[++i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === 'x' || next === 'u' || next === 'U') {
                const length = { x: 2, u: 4, U: 8 }[next];
                res += parseCharCode(source, i + 1, length, onError);
                i += length;
            }
            else {
                const raw = source.substr(i - 1, 2);
                onError(i - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
                res += raw;
            }
        }
        else if (ch === ' ' || ch === '\t') {
            // trim trailing whitespace
            const wsStart = i;
            let next = source[i + 1];
            while (next === ' ' || next === '\t')
                next = source[++i + 1];
            if (next !== '\n' && !(next === '\r' && source[i + 2] === '\n'))
                res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        }
        else {
            res += ch;
        }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, 'MISSING_CHAR', 'Missing closing "quote');
    return res;
}
/**
 * Fold a single newline into a space, multiple newlines to N - 1 newlines.
 * Presumes `source[offset] === '\n'`
 */
function foldNewline(source, offset) {
    let fold = '';
    let ch = source[offset + 1];
    while (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
        if (ch === '\r' && source[offset + 2] !== '\n')
            break;
        if (ch === '\n')
            fold += '\n';
        offset += 1;
        ch = source[offset + 1];
    }
    if (!fold)
        fold = ' ';
    return { fold, offset };
}
const escapeCodes = {
    '0': '\0',
    a: '\x07',
    b: '\b',
    e: '\x1b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
    v: '\v',
    N: '\u0085',
    _: '\u00a0',
    L: '\u2028',
    P: '\u2029',
    ' ': ' ',
    '"': '"',
    '/': '/',
    '\\': '\\',
    '\t': '\t'
};
function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code = ok ? parseInt(cc, 16) : NaN;
    if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
        return raw;
    }
    return String.fromCodePoint(code);
}

exports.resolveFlowScalar = resolveFlowScalar;


/***/ }),

/***/ 6985:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function resolveProps(tokens, { flow, indicator, next, offset, onError, startOnNewline }) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment = '';
    let commentSep = '';
    let hasNewline = false;
    let hasNewlineAfterProp = false;
    let reqSpace = false;
    let anchor = null;
    let tag = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
        if (reqSpace) {
            if (token.type !== 'space' &&
                token.type !== 'newline' &&
                token.type !== 'comma')
                onError(token.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
            reqSpace = false;
        }
        switch (token.type) {
            case 'space':
                // At the doc level, tabs at line start may be parsed
                // as leading white space rather than indentation.
                // In a flow collection, only the parser handles indent.
                if (!flow &&
                    atNewline &&
                    indicator !== 'doc-start' &&
                    token.source[0] === '\t')
                    onError(token, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
                hasSpace = true;
                break;
            case 'comment': {
                if (!hasSpace)
                    onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                const cb = token.source.substring(1) || ' ';
                if (!comment)
                    comment = cb;
                else
                    comment += commentSep + cb;
                commentSep = '';
                atNewline = false;
                break;
            }
            case 'newline':
                if (atNewline) {
                    if (comment)
                        comment += token.source;
                    else
                        spaceBefore = true;
                }
                else
                    commentSep += token.source;
                atNewline = true;
                hasNewline = true;
                if (anchor || tag)
                    hasNewlineAfterProp = true;
                hasSpace = true;
                break;
            case 'anchor':
                if (anchor)
                    onError(token, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor');
                if (token.source.endsWith(':'))
                    onError(token.offset + token.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', true);
                anchor = token;
                if (start === null)
                    start = token.offset;
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            case 'tag': {
                if (tag)
                    onError(token, 'MULTIPLE_TAGS', 'A node can have at most one tag');
                tag = token;
                if (start === null)
                    start = token.offset;
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            }
            case indicator:
                // Could here handle preceding comments differently
                if (anchor || tag)
                    onError(token, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${token.source} indicator`);
                if (found)
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.source} in ${flow ?? 'collection'}`);
                found = token;
                atNewline = false;
                hasSpace = false;
                break;
            case 'comma':
                if (flow) {
                    if (comma)
                        onError(token, 'UNEXPECTED_TOKEN', `Unexpected , in ${flow}`);
                    comma = token;
                    atNewline = false;
                    hasSpace = false;
                    break;
                }
            // else fallthrough
            default:
                onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.type} token`);
                atNewline = false;
                hasSpace = false;
        }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (reqSpace &&
        next &&
        next.type !== 'space' &&
        next.type !== 'newline' &&
        next.type !== 'comma' &&
        (next.type !== 'scalar' || next.source !== ''))
        onError(next.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
    return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        hasNewlineAfterProp,
        anchor,
        tag,
        end,
        start: start ?? end
    };
}

exports.resolveProps = resolveProps;


/***/ }),

/***/ 976:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function containsNewline(key) {
    if (!key)
        return null;
    switch (key.type) {
        case 'alias':
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            if (key.source.includes('\n'))
                return true;
            if (key.end)
                for (const st of key.end)
                    if (st.type === 'newline')
                        return true;
            return false;
        case 'flow-collection':
            for (const it of key.items) {
                for (const st of it.start)
                    if (st.type === 'newline')
                        return true;
                if (it.sep)
                    for (const st of it.sep)
                        if (st.type === 'newline')
                            return true;
                if (containsNewline(it.key) || containsNewline(it.value))
                    return true;
            }
            return false;
        default:
            return true;
    }
}

exports.containsNewline = containsNewline;


/***/ }),

/***/ 8781:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function emptyScalarPosition(offset, before, pos) {
    if (before) {
        if (pos === null)
            pos = before.length;
        for (let i = pos - 1; i >= 0; --i) {
            let st = before[i];
            switch (st.type) {
                case 'space':
                case 'comment':
                case 'newline':
                    offset -= st.source.length;
                    continue;
            }
            // Technically, an empty scalar is immediately after the last non-empty
            // node, but it's more useful to place it after any whitespace.
            st = before[++i];
            while (st?.type === 'space') {
                offset += st.source.length;
                st = before[++i];
            }
            break;
        }
    }
    return offset;
}

exports.emptyScalarPosition = emptyScalarPosition;


/***/ }),

/***/ 3669:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var utilContainsNewline = __nccwpck_require__(976);

function flowIndentCheck(indent, fc, onError) {
    if (fc?.type === 'flow-collection') {
        const end = fc.end[0];
        if (end.indent === indent &&
            (end.source === ']' || end.source === '}') &&
            utilContainsNewline.containsNewline(fc)) {
            const msg = 'Flow end indicator should be more indented than parent';
            onError(end, 'BAD_INDENT', msg, true);
        }
    }
}

exports.flowIndentCheck = flowIndentCheck;


/***/ }),

/***/ 6899:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);

function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false)
        return false;
    const isEqual = typeof uniqueKeys === 'function'
        ? uniqueKeys
        : (a, b) => a === b ||
            (Node.isScalar(a) &&
                Node.isScalar(b) &&
                a.value === b.value &&
                !(a.value === '<<' && ctx.schema.merge));
    return items.some(pair => isEqual(pair.key, search));
}

exports.mapIncludes = mapIncludes;


/***/ }),

/***/ 42:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Alias = __nccwpck_require__(5639);
var Collection = __nccwpck_require__(3466);
var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var toJS = __nccwpck_require__(2463);
var Schema = __nccwpck_require__(6831);
var stringify = __nccwpck_require__(8409);
var stringifyDocument = __nccwpck_require__(5225);
var anchors = __nccwpck_require__(8459);
var applyReviver = __nccwpck_require__(3412);
var createNode = __nccwpck_require__(9652);
var directives = __nccwpck_require__(5400);

class Document {
    constructor(value, replacer, options) {
        /** A comment before this Document */
        this.commentBefore = null;
        /** A comment immediately after this Document */
        this.comment = null;
        /** Errors encountered during parsing. */
        this.errors = [];
        /** Warnings encountered during parsing. */
        this.warnings = [];
        Object.defineProperty(this, Node.NODE_TYPE, { value: Node.DOC });
        let _replacer = null;
        if (typeof replacer === 'function' || Array.isArray(replacer)) {
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const opt = Object.assign({
            intAsBigInt: false,
            keepSourceTokens: false,
            logLevel: 'warn',
            prettyErrors: true,
            strict: true,
            uniqueKeys: true,
            version: '1.2'
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
            this.directives = options._directives.atDocument();
            if (this.directives.yaml.explicit)
                version = this.directives.yaml.version;
        }
        else
            this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        if (value === undefined)
            this.contents = null;
        else {
            this.contents = this.createNode(value, _replacer, options);
        }
    }
    /**
     * Create a deep copy of this Document and its contents.
     *
     * Custom Node values that inherit from `Object` still refer to their original instances.
     */
    clone() {
        const copy = Object.create(Document.prototype, {
            [Node.NODE_TYPE]: { value: Node.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
            copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = Node.isNode(this.contents)
            ? this.contents.clone(copy.schema)
            : this.contents;
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /** Adds a value to the document. */
    add(value) {
        if (assertCollection(this.contents))
            this.contents.add(value);
    }
    /** Adds a value to the document. */
    addIn(path, value) {
        if (assertCollection(this.contents))
            this.contents.addIn(path, value);
    }
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node, name) {
        if (!node.anchor) {
            const prev = anchors.anchorNames(this);
            node.anchor =
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                !name || prev.has(name) ? anchors.findNewAnchor(name || 'a', prev) : name;
        }
        return new Alias.Alias(node.anchor);
    }
    createNode(value, replacer, options) {
        let _replacer = undefined;
        if (typeof replacer === 'function') {
            value = replacer.call({ '': value }, '', value);
            _replacer = replacer;
        }
        else if (Array.isArray(replacer)) {
            const keyToStr = (v) => typeof v === 'number' || v instanceof String || v instanceof Number;
            const asStr = replacer.filter(keyToStr).map(String);
            if (asStr.length > 0)
                replacer = replacer.concat(asStr);
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(this, 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        anchorPrefix || 'a');
        const ctx = {
            aliasDuplicateObjects: aliasDuplicateObjects ?? true,
            keepUndefined: keepUndefined ?? false,
            onAnchor,
            onTagObj,
            replacer: _replacer,
            schema: this.schema,
            sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && Node.isCollection(node))
            node.flow = true;
        setAnchors();
        return node;
    }
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
            if (this.contents == null)
                return false;
            this.contents = null;
            return true;
        }
        return assertCollection(this.contents)
            ? this.contents.deleteIn(path)
            : false;
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key, keepScalar) {
        return Node.isCollection(this.contents)
            ? this.contents.get(key, keepScalar)
            : undefined;
    }
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
            return !keepScalar && Node.isScalar(this.contents)
                ? this.contents.value
                : this.contents;
        return Node.isCollection(this.contents)
            ? this.contents.getIn(path, keepScalar)
            : undefined;
    }
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key) {
        return Node.isCollection(this.contents) ? this.contents.has(key) : false;
    }
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path) {
        if (Collection.isEmptyPath(path))
            return this.contents !== undefined;
        return Node.isCollection(this.contents) ? this.contents.hasIn(path) : false;
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key, value) {
        if (this.contents == null) {
            this.contents = Collection.collectionFromPath(this.schema, [key], value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.set(key, value);
        }
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        if (Collection.isEmptyPath(path))
            this.contents = value;
        else if (this.contents == null) {
            this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.setIn(path, value);
        }
    }
    /**
     * Change the YAML version and schema used by the document.
     * A `null` version disables support for directives, explicit tags, anchors, and aliases.
     * It also requires the `schema` option to be given as a `Schema` instance value.
     *
     * Overrides all previously set schema options.
     */
    setSchema(version, options = {}) {
        if (typeof version === 'number')
            version = String(version);
        let opt;
        switch (version) {
            case '1.1':
                if (this.directives)
                    this.directives.yaml.version = '1.1';
                else
                    this.directives = new directives.Directives({ version: '1.1' });
                opt = { merge: true, resolveKnownTags: false, schema: 'yaml-1.1' };
                break;
            case '1.2':
            case 'next':
                if (this.directives)
                    this.directives.yaml.version = version;
                else
                    this.directives = new directives.Directives({ version });
                opt = { merge: false, resolveKnownTags: true, schema: 'core' };
                break;
            case null:
                if (this.directives)
                    delete this.directives;
                opt = null;
                break;
            default: {
                const sv = JSON.stringify(version);
                throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
            }
        }
        // Not using `instanceof Schema` to allow for duck typing
        if (options.schema instanceof Object)
            this.schema = options.schema;
        else if (opt)
            this.schema = new Schema.Schema(Object.assign(opt, options));
        else
            throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    // json & jsonArg are only used from toJSON()
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
            anchors: new Map(),
            doc: this,
            keep: !json,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100,
            stringify: stringify.stringify
        };
        const res = toJS.toJS(this.contents, jsonArg ?? '', ctx);
        if (typeof onAnchor === 'function')
            for (const { count, res } of ctx.anchors.values())
                onAnchor(res, count);
        return typeof reviver === 'function'
            ? applyReviver.applyReviver(reviver, { '': res }, '', res)
            : res;
    }
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    /** A YAML representation of the document. */
    toString(options = {}) {
        if (this.errors.length > 0)
            throw new Error('Document with errors cannot be stringified');
        if ('indent' in options &&
            (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
            const s = JSON.stringify(options.indent);
            throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
    }
}
function assertCollection(contents) {
    if (Node.isCollection(contents))
        return true;
    throw new Error('Expected a YAML collection as document contents');
}

exports.Document = Document;


/***/ }),

/***/ 8459:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var visit = __nccwpck_require__(9065);

/**
 * Verify that the input string is a valid anchor.
 *
 * Will throw on errors.
 */
function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
    }
    return true;
}
function anchorNames(root) {
    const anchors = new Set();
    visit.visit(root, {
        Value(_key, node) {
            if (node.anchor)
                anchors.add(node.anchor);
        }
    });
    return anchors;
}
/** Find a new anchor name with the given `prefix` and a one-indexed suffix. */
function findNewAnchor(prefix, exclude) {
    for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
            return name;
    }
}
function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = new Map();
    let prevAnchors = null;
    return {
        onAnchor: (source) => {
            aliasObjects.push(source);
            if (!prevAnchors)
                prevAnchors = anchorNames(doc);
            const anchor = findNewAnchor(prefix, prevAnchors);
            prevAnchors.add(anchor);
            return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
            for (const source of aliasObjects) {
                const ref = sourceObjects.get(source);
                if (typeof ref === 'object' &&
                    ref.anchor &&
                    (Node.isScalar(ref.node) || Node.isCollection(ref.node))) {
                    ref.node.anchor = ref.anchor;
                }
                else {
                    const error = new Error('Failed to resolve repeated object (this should not happen)');
                    error.source = source;
                    throw error;
                }
            }
        },
        sourceObjects
    };
}

exports.anchorIsValid = anchorIsValid;
exports.anchorNames = anchorNames;
exports.createNodeAnchors = createNodeAnchors;
exports.findNewAnchor = findNewAnchor;


/***/ }),

/***/ 3412:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Applies the JSON.parse reviver algorithm as defined in the ECMA-262 spec,
 * in section 24.5.1.1 "Runtime Semantics: InternalizeJSONProperty" of the
 * 2021 edition: https://tc39.es/ecma262/#sec-json.parse
 *
 * Includes extensions for handling Map and Set objects.
 */
function applyReviver(reviver, obj, key, val) {
    if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
            for (let i = 0, len = val.length; i < len; ++i) {
                const v0 = val[i];
                const v1 = applyReviver(reviver, val, String(i), v0);
                if (v1 === undefined)
                    delete val[i];
                else if (v1 !== v0)
                    val[i] = v1;
            }
        }
        else if (val instanceof Map) {
            for (const k of Array.from(val.keys())) {
                const v0 = val.get(k);
                const v1 = applyReviver(reviver, val, k, v0);
                if (v1 === undefined)
                    val.delete(k);
                else if (v1 !== v0)
                    val.set(k, v1);
            }
        }
        else if (val instanceof Set) {
            for (const v0 of Array.from(val)) {
                const v1 = applyReviver(reviver, val, v0, v0);
                if (v1 === undefined)
                    val.delete(v0);
                else if (v1 !== v0) {
                    val.delete(v0);
                    val.add(v1);
                }
            }
        }
        else {
            for (const [k, v0] of Object.entries(val)) {
                const v1 = applyReviver(reviver, val, k, v0);
                if (v1 === undefined)
                    delete val[k];
                else if (v1 !== v0)
                    val[k] = v1;
            }
        }
    }
    return reviver.call(obj, key, val);
}

exports.applyReviver = applyReviver;


/***/ }),

/***/ 9652:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Alias = __nccwpck_require__(5639);
var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);

const defaultTagPrefix = 'tag:yaml.org,2002:';
function findTagObject(value, tagName, tags) {
    if (tagName) {
        const match = tags.filter(t => t.tag === tagName);
        const tagObj = match.find(t => !t.format) ?? match[0];
        if (!tagObj)
            throw new Error(`Tag ${tagName} not found`);
        return tagObj;
    }
    return tags.find(t => t.identify?.(value) && !t.format);
}
function createNode(value, tagName, ctx) {
    if (Node.isDocument(value))
        value = value.contents;
    if (Node.isNode(value))
        return value;
    if (Node.isPair(value)) {
        const map = ctx.schema[Node.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
    }
    if (value instanceof String ||
        value instanceof Number ||
        value instanceof Boolean ||
        (typeof BigInt === 'function' && value instanceof BigInt) // not supported everywhere
    ) {
        // https://tc39.es/ecma262/#sec-serializejsonproperty
        value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
    // Detect duplicate references to the same object & use Alias nodes for all
    // after first. The `ref` wrapper allows for circular references to resolve.
    let ref = undefined;
    if (aliasDuplicateObjects && value && typeof value === 'object') {
        ref = sourceObjects.get(value);
        if (ref) {
            if (!ref.anchor)
                ref.anchor = onAnchor(value);
            return new Alias.Alias(ref.anchor);
        }
        else {
            ref = { anchor: null, node: null };
            sourceObjects.set(value, ref);
        }
    }
    if (tagName?.startsWith('!!'))
        tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema.tags);
    if (!tagObj) {
        if (value && typeof value.toJSON === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            value = value.toJSON();
        }
        if (!value || typeof value !== 'object') {
            const node = new Scalar.Scalar(value);
            if (ref)
                ref.node = node;
            return node;
        }
        tagObj =
            value instanceof Map
                ? schema[Node.MAP]
                : Symbol.iterator in Object(value)
                    ? schema[Node.SEQ]
                    : schema[Node.MAP];
    }
    if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
    }
    const node = tagObj?.createNode
        ? tagObj.createNode(ctx.schema, value, ctx)
        : new Scalar.Scalar(value);
    if (tagName)
        node.tag = tagName;
    if (ref)
        ref.node = node;
    return node;
}

exports.createNode = createNode;


/***/ }),

/***/ 5400:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var visit = __nccwpck_require__(9065);

const escapeChars = {
    '!': '%21',
    ',': '%2C',
    '[': '%5B',
    ']': '%5D',
    '{': '%7B',
    '}': '%7D'
};
const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, ch => escapeChars[ch]);
class Directives {
    constructor(yaml, tags) {
        /**
         * The directives-end/doc-start marker `---`. If `null`, a marker may still be
         * included in the document's stringified representation.
         */
        this.docStart = null;
        /** The doc-end marker `...`.  */
        this.docEnd = false;
        this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, Directives.defaultTags, tags);
    }
    clone() {
        const copy = new Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
    }
    /**
     * During parsing, get a Directives instance for the current document and
     * update the stream state according to the current version's spec.
     */
    atDocument() {
        const res = new Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
            case '1.1':
                this.atNextDocument = true;
                break;
            case '1.2':
                this.atNextDocument = false;
                this.yaml = {
                    explicit: Directives.defaultYaml.explicit,
                    version: '1.2'
                };
                this.tags = Object.assign({}, Directives.defaultTags);
                break;
        }
        return res;
    }
    /**
     * @param onError - May be called even if the action was successful
     * @returns `true` on success
     */
    add(line, onError) {
        if (this.atNextDocument) {
            this.yaml = { explicit: Directives.defaultYaml.explicit, version: '1.1' };
            this.tags = Object.assign({}, Directives.defaultTags);
            this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
            case '%TAG': {
                if (parts.length !== 2) {
                    onError(0, '%TAG directive should contain exactly two parts');
                    if (parts.length < 2)
                        return false;
                }
                const [handle, prefix] = parts;
                this.tags[handle] = prefix;
                return true;
            }
            case '%YAML': {
                this.yaml.explicit = true;
                if (parts.length !== 1) {
                    onError(0, '%YAML directive should contain exactly one part');
                    return false;
                }
                const [version] = parts;
                if (version === '1.1' || version === '1.2') {
                    this.yaml.version = version;
                    return true;
                }
                else {
                    const isValid = /^\d+\.\d+$/.test(version);
                    onError(6, `Unsupported YAML version ${version}`, isValid);
                    return false;
                }
            }
            default:
                onError(0, `Unknown directive ${name}`, true);
                return false;
        }
    }
    /**
     * Resolves a tag, matching handles to those defined in %TAG directives.
     *
     * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
     *   `'!local'` tag, or `null` if unresolvable.
     */
    tagName(source, onError) {
        if (source === '!')
            return '!'; // non-specific tag
        if (source[0] !== '!') {
            onError(`Not a valid tag: ${source}`);
            return null;
        }
        if (source[1] === '<') {
            const verbatim = source.slice(2, -1);
            if (verbatim === '!' || verbatim === '!!') {
                onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
                return null;
            }
            if (source[source.length - 1] !== '>')
                onError('Verbatim tags must end with a >');
            return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/);
        if (!suffix)
            onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix)
            return prefix + decodeURIComponent(suffix);
        if (handle === '!')
            return source; // local tag
        onError(`Could not resolve tag: ${source}`);
        return null;
    }
    /**
     * Given a fully resolved tag, returns its printable string form,
     * taking into account current tag prefixes and defaults.
     */
    tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
            if (tag.startsWith(prefix))
                return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === '!' ? tag : `!<${tag}>`;
    }
    toString(doc) {
        const lines = this.yaml.explicit
            ? [`%YAML ${this.yaml.version || '1.2'}`]
            : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && Node.isNode(doc.contents)) {
            const tags = {};
            visit.visit(doc.contents, (_key, node) => {
                if (Node.isNode(node) && node.tag)
                    tags[node.tag] = true;
            });
            tagNames = Object.keys(tags);
        }
        else
            tagNames = [];
        for (const [handle, prefix] of tagEntries) {
            if (handle === '!!' && prefix === 'tag:yaml.org,2002:')
                continue;
            if (!doc || tagNames.some(tn => tn.startsWith(prefix)))
                lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join('\n');
    }
}
Directives.defaultYaml = { explicit: false, version: '1.2' };
Directives.defaultTags = { '!!': 'tag:yaml.org,2002:' };

exports.Directives = Directives;


/***/ }),

/***/ 4236:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


class YAMLError extends Error {
    constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
    }
}
class YAMLParseError extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLParseError', pos, code, message);
    }
}
class YAMLWarning extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLWarning', pos, code, message);
    }
}
const prettifyError = (src, lc) => (error) => {
    if (error.pos[0] === -1)
        return;
    error.linePos = error.pos.map(pos => lc.linePos(pos));
    const { line, col } = error.linePos[0];
    error.message += ` at line ${line}, column ${col}`;
    let ci = col - 1;
    let lineStr = src
        .substring(lc.lineStarts[line - 1], lc.lineStarts[line])
        .replace(/[\n\r]+$/, '');
    // Trim to max 80 chars, keeping col position near the middle
    if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = '…' + lineStr.substring(trimStart);
        ci -= trimStart - 1;
    }
    if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + '…';
    // Include previous line in context if pointing at line start
    if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        // Regexp won't match if start is trimmed
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
            prev = prev.substring(0, 79) + '…\n';
        lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
            count = Math.min(end.col - col, 80 - ci);
        }
        const pointer = ' '.repeat(ci) + '^'.repeat(count);
        error.message += `:\n\n${lineStr}\n${pointer}\n`;
    }
};

exports.YAMLError = YAMLError;
exports.YAMLParseError = YAMLParseError;
exports.YAMLWarning = YAMLWarning;
exports.prettifyError = prettifyError;


/***/ }),

/***/ 4083:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var composer = __nccwpck_require__(9493);
var Document = __nccwpck_require__(42);
var Schema = __nccwpck_require__(6831);
var errors = __nccwpck_require__(4236);
var Alias = __nccwpck_require__(5639);
var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var Scalar = __nccwpck_require__(9338);
var YAMLMap = __nccwpck_require__(6011);
var YAMLSeq = __nccwpck_require__(5161);
var cst = __nccwpck_require__(9169);
var lexer = __nccwpck_require__(5976);
var lineCounter = __nccwpck_require__(1929);
var parser = __nccwpck_require__(3328);
var publicApi = __nccwpck_require__(8649);
var visit = __nccwpck_require__(9065);



exports.Composer = composer.Composer;
exports.Document = Document.Document;
exports.Schema = Schema.Schema;
exports.YAMLError = errors.YAMLError;
exports.YAMLParseError = errors.YAMLParseError;
exports.YAMLWarning = errors.YAMLWarning;
exports.Alias = Alias.Alias;
exports.isAlias = Node.isAlias;
exports.isCollection = Node.isCollection;
exports.isDocument = Node.isDocument;
exports.isMap = Node.isMap;
exports.isNode = Node.isNode;
exports.isPair = Node.isPair;
exports.isScalar = Node.isScalar;
exports.isSeq = Node.isSeq;
exports.Pair = Pair.Pair;
exports.Scalar = Scalar.Scalar;
exports.YAMLMap = YAMLMap.YAMLMap;
exports.YAMLSeq = YAMLSeq.YAMLSeq;
exports.CST = cst;
exports.Lexer = lexer.Lexer;
exports.LineCounter = lineCounter.LineCounter;
exports.Parser = parser.Parser;
exports.parse = publicApi.parse;
exports.parseAllDocuments = publicApi.parseAllDocuments;
exports.parseDocument = publicApi.parseDocument;
exports.stringify = publicApi.stringify;
exports.visit = visit.visit;
exports.visitAsync = visit.visitAsync;


/***/ }),

/***/ 6909:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function debug(logLevel, ...messages) {
    if (logLevel === 'debug')
        console.log(...messages);
}
function warn(logLevel, warning) {
    if (logLevel === 'debug' || logLevel === 'warn') {
        if (typeof process !== 'undefined' && process.emitWarning)
            process.emitWarning(warning);
        else
            console.warn(warning);
    }
}

exports.debug = debug;
exports.warn = warn;


/***/ }),

/***/ 5639:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var anchors = __nccwpck_require__(8459);
var visit = __nccwpck_require__(9065);
var Node = __nccwpck_require__(1399);

class Alias extends Node.NodeBase {
    constructor(source) {
        super(Node.ALIAS);
        this.source = source;
        Object.defineProperty(this, 'tag', {
            set() {
                throw new Error('Alias nodes cannot have tags');
            }
        });
    }
    /**
     * Resolve the value of this alias within `doc`, finding the last
     * instance of the `source` anchor before this node.
     */
    resolve(doc) {
        let found = undefined;
        visit.visit(doc, {
            Node: (_key, node) => {
                if (node === this)
                    return visit.visit.BREAK;
                if (node.anchor === this.source)
                    found = node;
            }
        });
        return found;
    }
    toJSON(_arg, ctx) {
        if (!ctx)
            return { source: this.source };
        const { anchors, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new ReferenceError(msg);
        }
        const data = anchors.get(source);
        /* istanbul ignore if */
        if (!data || data.res === undefined) {
            const msg = 'This should not happen: Alias anchor was not resolved?';
            throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0)
                data.aliasCount = getAliasCount(doc, source, anchors);
            if (data.count * data.aliasCount > maxAliasCount) {
                const msg = 'Excessive alias count indicates a resource exhaustion attack';
                throw new ReferenceError(msg);
            }
        }
        return data.res;
    }
    toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
            anchors.anchorIsValid(this.source);
            if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
                const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
                throw new Error(msg);
            }
            if (ctx.implicitKey)
                return `${src} `;
        }
        return src;
    }
}
function getAliasCount(doc, node, anchors) {
    if (Node.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors && source && anchors.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
    }
    else if (Node.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
            const c = getAliasCount(doc, item, anchors);
            if (c > count)
                count = c;
        }
        return count;
    }
    else if (Node.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors);
        const vc = getAliasCount(doc, node.value, anchors);
        return Math.max(kc, vc);
    }
    return 1;
}

exports.Alias = Alias;


/***/ }),

/***/ 3466:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var createNode = __nccwpck_require__(9652);
var Node = __nccwpck_require__(1399);

function collectionFromPath(schema, path, value) {
    let v = value;
    for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === 'number' && Number.isInteger(k) && k >= 0) {
            const a = [];
            a[k] = v;
            v = a;
        }
        else {
            v = new Map([[k, v]]);
        }
    }
    return createNode.createNode(v, undefined, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
            throw new Error('This should not happen, please report a bug.');
        },
        schema,
        sourceObjects: new Map()
    });
}
// Type guard is intentionally a little wrong so as to be more useful,
// as it does not cover untypable empty non-string iterables (e.g. []).
const isEmptyPath = (path) => path == null ||
    (typeof path === 'object' && !!path[Symbol.iterator]().next().done);
class Collection extends Node.NodeBase {
    constructor(type, schema) {
        super(type);
        Object.defineProperty(this, 'schema', {
            value: schema,
            configurable: true,
            enumerable: false,
            writable: true
        });
    }
    /**
     * Create a copy of this collection.
     *
     * @param schema - If defined, overwrites the original's schema
     */
    clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
            copy.schema = schema;
        copy.items = copy.items.map(it => Node.isNode(it) || Node.isPair(it) ? it.clone(schema) : it);
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /**
     * Adds a value to the collection. For `!!map` and `!!omap` the value must
     * be a Pair instance or a `{ key, value }` object, which may not have a key
     * that already exists in the map.
     */
    addIn(path, value) {
        if (isEmptyPath(path))
            this.add(value);
        else {
            const [key, ...rest] = path;
            const node = this.get(key, true);
            if (Node.isCollection(node))
                node.addIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
    /**
     * Removes a value from the collection.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.delete(key);
        const node = this.get(key, true);
        if (Node.isCollection(node))
            return node.deleteIn(rest);
        else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
            return !keepScalar && Node.isScalar(node) ? node.value : node;
        else
            return Node.isCollection(node) ? node.getIn(rest, keepScalar) : undefined;
    }
    hasAllNullValues(allowScalar) {
        return this.items.every(node => {
            if (!Node.isPair(node))
                return false;
            const n = node.value;
            return (n == null ||
                (allowScalar &&
                    Node.isScalar(n) &&
                    n.value == null &&
                    !n.commentBefore &&
                    !n.comment &&
                    !n.tag));
        });
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     */
    hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.has(key);
        const node = this.get(key, true);
        return Node.isCollection(node) ? node.hasIn(rest) : false;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
            this.set(key, value);
        }
        else {
            const node = this.get(key, true);
            if (Node.isCollection(node))
                node.setIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
}
Collection.maxFlowStringSingleLineLength = 60;

exports.Collection = Collection;
exports.collectionFromPath = collectionFromPath;
exports.isEmptyPath = isEmptyPath;


/***/ }),

/***/ 1399:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const ALIAS = Symbol.for('yaml.alias');
const DOC = Symbol.for('yaml.document');
const MAP = Symbol.for('yaml.map');
const PAIR = Symbol.for('yaml.pair');
const SCALAR = Symbol.for('yaml.scalar');
const SEQ = Symbol.for('yaml.seq');
const NODE_TYPE = Symbol.for('yaml.node.type');
const isAlias = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === ALIAS;
const isDocument = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === DOC;
const isMap = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === MAP;
const isPair = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === PAIR;
const isScalar = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SCALAR;
const isSeq = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SEQ;
function isCollection(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case MAP:
            case SEQ:
                return true;
        }
    return false;
}
function isNode(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case ALIAS:
            case MAP:
            case SCALAR:
            case SEQ:
                return true;
        }
    return false;
}
const hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
class NodeBase {
    constructor(type) {
        Object.defineProperty(this, NODE_TYPE, { value: type });
    }
    /** Create a copy of this node.  */
    clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
}

exports.ALIAS = ALIAS;
exports.DOC = DOC;
exports.MAP = MAP;
exports.NODE_TYPE = NODE_TYPE;
exports.NodeBase = NodeBase;
exports.PAIR = PAIR;
exports.SCALAR = SCALAR;
exports.SEQ = SEQ;
exports.hasAnchor = hasAnchor;
exports.isAlias = isAlias;
exports.isCollection = isCollection;
exports.isDocument = isDocument;
exports.isMap = isMap;
exports.isNode = isNode;
exports.isPair = isPair;
exports.isScalar = isScalar;
exports.isSeq = isSeq;


/***/ }),

/***/ 246:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var createNode = __nccwpck_require__(9652);
var stringifyPair = __nccwpck_require__(4875);
var addPairToJSMap = __nccwpck_require__(4676);
var Node = __nccwpck_require__(1399);

function createPair(key, value, ctx) {
    const k = createNode.createNode(key, undefined, ctx);
    const v = createNode.createNode(value, undefined, ctx);
    return new Pair(k, v);
}
class Pair {
    constructor(key, value = null) {
        Object.defineProperty(this, Node.NODE_TYPE, { value: Node.PAIR });
        this.key = key;
        this.value = value;
    }
    clone(schema) {
        let { key, value } = this;
        if (Node.isNode(key))
            key = key.clone(schema);
        if (Node.isNode(value))
            value = value.clone(schema);
        return new Pair(key, value);
    }
    toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
        return ctx?.doc
            ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep)
            : JSON.stringify(this);
    }
}

exports.Pair = Pair;
exports.createPair = createPair;


/***/ }),

/***/ 9338:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var toJS = __nccwpck_require__(2463);

const isScalarValue = (value) => !value || (typeof value !== 'function' && typeof value !== 'object');
class Scalar extends Node.NodeBase {
    constructor(value) {
        super(Node.SCALAR);
        this.value = value;
    }
    toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
    }
    toString() {
        return String(this.value);
    }
}
Scalar.BLOCK_FOLDED = 'BLOCK_FOLDED';
Scalar.BLOCK_LITERAL = 'BLOCK_LITERAL';
Scalar.PLAIN = 'PLAIN';
Scalar.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
Scalar.QUOTE_SINGLE = 'QUOTE_SINGLE';

exports.Scalar = Scalar;
exports.isScalarValue = isScalarValue;


/***/ }),

/***/ 6011:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyCollection = __nccwpck_require__(2466);
var addPairToJSMap = __nccwpck_require__(4676);
var Collection = __nccwpck_require__(3466);
var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var Scalar = __nccwpck_require__(9338);

function findPair(items, key) {
    const k = Node.isScalar(key) ? key.value : key;
    for (const it of items) {
        if (Node.isPair(it)) {
            if (it.key === key || it.key === k)
                return it;
            if (Node.isScalar(it.key) && it.key.value === k)
                return it;
        }
    }
    return undefined;
}
class YAMLMap extends Collection.Collection {
    constructor(schema) {
        super(Node.MAP, schema);
        this.items = [];
    }
    static get tagName() {
        return 'tag:yaml.org,2002:map';
    }
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair, overwrite) {
        let _pair;
        if (Node.isPair(pair))
            _pair = pair;
        else if (!pair || typeof pair !== 'object' || !('key' in pair)) {
            // In TypeScript, this never happens.
            _pair = new Pair.Pair(pair, pair?.value);
        }
        else
            _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
            if (!overwrite)
                throw new Error(`Key ${_pair.key} already set`);
            // For scalars, keep the old node & its comments and anchors
            if (Node.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
                prev.value.value = _pair.value;
            else
                prev.value = _pair.value;
        }
        else if (sortEntries) {
            const i = this.items.findIndex(item => sortEntries(_pair, item) < 0);
            if (i === -1)
                this.items.push(_pair);
            else
                this.items.splice(i, 0, _pair);
        }
        else {
            this.items.push(_pair);
        }
    }
    delete(key) {
        const it = findPair(this.items, key);
        if (!it)
            return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && Node.isScalar(node) ? node.value : node) ?? undefined;
    }
    has(key) {
        return !!findPair(this.items, key);
    }
    set(key, value) {
        this.add(new Pair.Pair(key, value), true);
    }
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? new Map() : {};
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const item of this.items)
            addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        for (const item of this.items) {
            if (!Node.isPair(item))
                throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
            ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
            blockItemPrefix: '',
            flowChars: { start: '{', end: '}' },
            itemIndent: ctx.indent || '',
            onChompKeep,
            onComment
        });
    }
}

exports.YAMLMap = YAMLMap;
exports.findPair = findPair;


/***/ }),

/***/ 5161:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyCollection = __nccwpck_require__(2466);
var Collection = __nccwpck_require__(3466);
var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);
var toJS = __nccwpck_require__(2463);

class YAMLSeq extends Collection.Collection {
    constructor(schema) {
        super(Node.SEQ, schema);
        this.items = [];
    }
    static get tagName() {
        return 'tag:yaml.org,2002:seq';
    }
    add(value) {
        this.items.push(value);
    }
    /**
     * Removes a value from the collection.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     *
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return undefined;
        const it = this.items[idx];
        return !keepScalar && Node.isScalar(it) ? it.value : it;
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     */
    has(key) {
        const idx = asItemIndex(key);
        return typeof idx === 'number' && idx < this.items.length;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     *
     * If `key` does not contain a representation of an integer, this will throw.
     * It may be wrapped in a `Scalar`.
     */
    set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (Node.isScalar(prev) && Scalar.isScalarValue(value))
            prev.value = value;
        else
            this.items[idx] = value;
    }
    toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
            ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
            seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
            blockItemPrefix: '- ',
            flowChars: { start: '[', end: ']' },
            itemIndent: (ctx.indent || '') + '  ',
            onChompKeep,
            onComment
        });
    }
}
function asItemIndex(key) {
    let idx = Node.isScalar(key) ? key.value : key;
    if (idx && typeof idx === 'string')
        idx = Number(idx);
    return typeof idx === 'number' && Number.isInteger(idx) && idx >= 0
        ? idx
        : null;
}

exports.YAMLSeq = YAMLSeq;


/***/ }),

/***/ 4676:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var log = __nccwpck_require__(6909);
var stringify = __nccwpck_require__(8409);
var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);
var toJS = __nccwpck_require__(2463);

const MERGE_KEY = '<<';
function addPairToJSMap(ctx, map, { key, value }) {
    if (ctx?.doc.schema.merge && isMergeKey(key)) {
        value = Node.isAlias(value) ? value.resolve(ctx.doc) : value;
        if (Node.isSeq(value))
            for (const it of value.items)
                mergeToJSMap(ctx, map, it);
        else if (Array.isArray(value))
            for (const it of value)
                mergeToJSMap(ctx, map, it);
        else
            mergeToJSMap(ctx, map, value);
    }
    else {
        const jsKey = toJS.toJS(key, '', ctx);
        if (map instanceof Map) {
            map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        }
        else if (map instanceof Set) {
            map.add(jsKey);
        }
        else {
            const stringKey = stringifyKey(key, jsKey, ctx);
            const jsValue = toJS.toJS(value, stringKey, ctx);
            if (stringKey in map)
                Object.defineProperty(map, stringKey, {
                    value: jsValue,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            else
                map[stringKey] = jsValue;
        }
    }
    return map;
}
const isMergeKey = (key) => key === MERGE_KEY ||
    (Node.isScalar(key) &&
        key.value === MERGE_KEY &&
        (!key.type || key.type === Scalar.Scalar.PLAIN));
// If the value associated with a merge key is a single mapping node, each of
// its key/value pairs is inserted into the current mapping, unless the key
// already exists in it. If the value associated with the merge key is a
// sequence, then this sequence is expected to contain mapping nodes and each
// of these nodes is merged in turn according to its order in the sequence.
// Keys in mapping nodes earlier in the sequence override keys specified in
// later mapping nodes. -- http://yaml.org/type/merge.html
function mergeToJSMap(ctx, map, value) {
    const source = ctx && Node.isAlias(value) ? value.resolve(ctx.doc) : value;
    if (!Node.isMap(source))
        throw new Error('Merge sources must be maps or map aliases');
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value] of srcMap) {
        if (map instanceof Map) {
            if (!map.has(key))
                map.set(key, value);
        }
        else if (map instanceof Set) {
            map.add(key);
        }
        else if (!Object.prototype.hasOwnProperty.call(map, key)) {
            Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    }
    return map;
}
function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null)
        return '';
    if (typeof jsKey !== 'object')
        return String(jsKey);
    if (Node.isNode(key) && ctx && ctx.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = new Set();
        for (const node of ctx.anchors.keys())
            strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
            let jsonStr = JSON.stringify(strKey);
            if (jsonStr.length > 40)
                jsonStr = jsonStr.substring(0, 36) + '..."';
            log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
            ctx.mapKeyWarned = true;
        }
        return strKey;
    }
    return JSON.stringify(jsKey);
}

exports.addPairToJSMap = addPairToJSMap;


/***/ }),

/***/ 2463:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);

/**
 * Recursively convert any node or its contents to native JavaScript
 *
 * @param value - The input value
 * @param arg - If `value` defines a `toJSON()` method, use this
 *   as its first argument
 * @param ctx - Conversion context, originally set in Document#toJS(). If
 *   `{ keep: true }` is not set, output should be suitable for JSON
 *   stringification.
 */
function toJS(value, arg, ctx) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
    if (value && typeof value.toJSON === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ctx || !Node.hasAnchor(value))
            return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: undefined };
        ctx.anchors.set(value, data);
        ctx.onCreate = res => {
            data.res = res;
            delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
            ctx.onCreate(res);
        return res;
    }
    if (typeof value === 'bigint' && !ctx?.keep)
        return Number(value);
    return value;
}

exports.toJS = toJS;


/***/ }),

/***/ 9027:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var resolveBlockScalar = __nccwpck_require__(9485);
var resolveFlowScalar = __nccwpck_require__(7578);
var errors = __nccwpck_require__(4236);
var stringifyString = __nccwpck_require__(6226);

function resolveAsScalar(token, strict = true, onError) {
    if (token) {
        const _onError = (pos, code, message) => {
            const offset = typeof pos === 'number' ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
            if (onError)
                onError(offset, code, message);
            else
                throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
            case 'block-scalar':
                return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
    }
    return null;
}
/**
 * Create a new scalar token with `value`
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.end Comments and whitespace after the end of the value, or after the block scalar header. If undefined, a newline will be added.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.indent The indent level of the token.
 * @param context.inFlow Is this scalar within a flow collection? This may affect the resolved type of the token's value.
 * @param context.offset The offset position of the token.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function createScalarToken(value, context) {
    const { implicitKey = false, indent, inFlow = false, offset = -1, type = 'PLAIN' } = context;
    const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    const end = context.end ?? [
        { type: 'newline', offset: -1, indent, source: '\n' }
    ];
    switch (source[0]) {
        case '|':
        case '>': {
            const he = source.indexOf('\n');
            const head = source.substring(0, he);
            const body = source.substring(he + 1) + '\n';
            const props = [
                { type: 'block-scalar-header', offset, indent, source: head }
            ];
            if (!addEndtoBlockProps(props, end))
                props.push({ type: 'newline', offset: -1, indent, source: '\n' });
            return { type: 'block-scalar', offset, indent, props, source: body };
        }
        case '"':
            return { type: 'double-quoted-scalar', offset, indent, source, end };
        case "'":
            return { type: 'single-quoted-scalar', offset, indent, source, end };
        default:
            return { type: 'scalar', offset, indent, source, end };
    }
}
/**
 * Set the value of `token` to the given string `value`, overwriting any previous contents and type that it may have.
 *
 * Best efforts are made to retain any comments previously associated with the `token`,
 * though all contents within a collection's `items` will be overwritten.
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param token Any token. If it does not include an `indent` value, the value will be stringified as if it were an implicit key.
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.afterKey In most cases, values after a key should have an additional level of indentation.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.inFlow Being within a flow collection may affect the resolved type of the token's value.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function setScalarValue(token, value, context = {}) {
    let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
    let indent = 'indent' in token ? token.indent : null;
    if (afterKey && typeof indent === 'number')
        indent += 2;
    if (!type)
        switch (token.type) {
            case 'single-quoted-scalar':
                type = 'QUOTE_SINGLE';
                break;
            case 'double-quoted-scalar':
                type = 'QUOTE_DOUBLE';
                break;
            case 'block-scalar': {
                const header = token.props[0];
                if (header.type !== 'block-scalar-header')
                    throw new Error('Invalid block scalar header');
                type = header.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
                break;
            }
            default:
                type = 'PLAIN';
        }
    const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    switch (source[0]) {
        case '|':
        case '>':
            setBlockScalarValue(token, source);
            break;
        case '"':
            setFlowScalarValue(token, source, 'double-quoted-scalar');
            break;
        case "'":
            setFlowScalarValue(token, source, 'single-quoted-scalar');
            break;
        default:
            setFlowScalarValue(token, source, 'scalar');
    }
}
function setBlockScalarValue(token, source) {
    const he = source.indexOf('\n');
    const head = source.substring(0, he);
    const body = source.substring(he + 1) + '\n';
    if (token.type === 'block-scalar') {
        const header = token.props[0];
        if (header.type !== 'block-scalar-header')
            throw new Error('Invalid block scalar header');
        header.source = head;
        token.source = body;
    }
    else {
        const { offset } = token;
        const indent = 'indent' in token ? token.indent : -1;
        const props = [
            { type: 'block-scalar-header', offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, 'end' in token ? token.end : undefined))
            props.push({ type: 'newline', offset: -1, indent, source: '\n' });
        for (const key of Object.keys(token))
            if (key !== 'type' && key !== 'offset')
                delete token[key];
        Object.assign(token, { type: 'block-scalar', indent, props, source: body });
    }
}
/** @returns `true` if last token is a newline */
function addEndtoBlockProps(props, end) {
    if (end)
        for (const st of end)
            switch (st.type) {
                case 'space':
                case 'comment':
                    props.push(st);
                    break;
                case 'newline':
                    props.push(st);
                    return true;
            }
    return false;
}
function setFlowScalarValue(token, source, type) {
    switch (token.type) {
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            token.type = type;
            token.source = source;
            break;
        case 'block-scalar': {
            const end = token.props.slice(1);
            let oa = source.length;
            if (token.props[0].type === 'block-scalar-header')
                oa -= token.props[0].source.length;
            for (const tok of end)
                tok.offset += oa;
            delete token.props;
            Object.assign(token, { type, source, end });
            break;
        }
        case 'block-map':
        case 'block-seq': {
            const offset = token.offset + source.length;
            const nl = { type: 'newline', offset, indent: token.indent, source: '\n' };
            delete token.items;
            Object.assign(token, { type, source, end: [nl] });
            break;
        }
        default: {
            const indent = 'indent' in token ? token.indent : -1;
            const end = 'end' in token && Array.isArray(token.end)
                ? token.end.filter(st => st.type === 'space' ||
                    st.type === 'comment' ||
                    st.type === 'newline')
                : [];
            for (const key of Object.keys(token))
                if (key !== 'type' && key !== 'offset')
                    delete token[key];
            Object.assign(token, { type, indent, source, end });
        }
    }
}

exports.createScalarToken = createScalarToken;
exports.resolveAsScalar = resolveAsScalar;
exports.setScalarValue = setScalarValue;


/***/ }),

/***/ 6307:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Stringify a CST document, token, or collection item
 *
 * Fair warning: This applies no validation whatsoever, and
 * simply concatenates the sources in their logical order.
 */
const stringify = (cst) => 'type' in cst ? stringifyToken(cst) : stringifyItem(cst);
function stringifyToken(token) {
    switch (token.type) {
        case 'block-scalar': {
            let res = '';
            for (const tok of token.props)
                res += stringifyToken(tok);
            return res + token.source;
        }
        case 'block-map':
        case 'block-seq': {
            let res = '';
            for (const item of token.items)
                res += stringifyItem(item);
            return res;
        }
        case 'flow-collection': {
            let res = token.start.source;
            for (const item of token.items)
                res += stringifyItem(item);
            for (const st of token.end)
                res += st.source;
            return res;
        }
        case 'document': {
            let res = stringifyItem(token);
            if (token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
        default: {
            let res = token.source;
            if ('end' in token && token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
    }
}
function stringifyItem({ start, key, sep, value }) {
    let res = '';
    for (const st of start)
        res += st.source;
    if (key)
        res += stringifyToken(key);
    if (sep)
        for (const st of sep)
            res += st.source;
    if (value)
        res += stringifyToken(value);
    return res;
}

exports.stringify = stringify;


/***/ }),

/***/ 8497:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const BREAK = Symbol('break visit');
const SKIP = Symbol('skip children');
const REMOVE = Symbol('remove item');
/**
 * Apply a visitor to a CST document or item.
 *
 * Walks through the tree (depth-first) starting from the root, calling a
 * `visitor` function with two arguments when entering each item:
 *   - `item`: The current item, which included the following members:
 *     - `start: SourceToken[]` – Source tokens before the key or value,
 *       possibly including its anchor or tag.
 *     - `key?: Token | null` – Set for pair values. May then be `null`, if
 *       the key before the `:` separator is empty.
 *     - `sep?: SourceToken[]` – Source tokens between the key and the value,
 *       which should include the `:` map value indicator if `value` is set.
 *     - `value?: Token` – The value of a sequence item, or of a map pair.
 *   - `path`: The steps from the root to the current node, as an array of
 *     `['key' | 'value', number]` tuples.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this token, continue with
 *      next sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current item, then continue with the next one
 *   - `number`: Set the index of the next step. This is useful especially if
 *     the index of the current token has changed.
 *   - `function`: Define the next visitor for this item. After the original
 *     visitor is called on item entry, next visitors are called after handling
 *     a non-empty `key` and when exiting the item.
 */
function visit(cst, visitor) {
    if ('type' in cst && cst.type === 'document')
        cst = { start: cst.start, value: cst.value };
    _visit(Object.freeze([]), cst, visitor);
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit.BREAK = BREAK;
/** Do not visit the children of the current item */
visit.SKIP = SKIP;
/** Remove the current item */
visit.REMOVE = REMOVE;
/** Find the item at `path` from `cst` as the root */
visit.itemAtPath = (cst, path) => {
    let item = cst;
    for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && 'items' in tok) {
            item = tok.items[index];
        }
        else
            return undefined;
    }
    return item;
};
/**
 * Get the immediate parent collection of the item at `path` from `cst` as the root.
 *
 * Throws an error if the collection is not found, which should never happen if the item itself exists.
 */
visit.parentCollection = (cst, path) => {
    const parent = visit.itemAtPath(cst, path.slice(0, -1));
    const field = path[path.length - 1][0];
    const coll = parent?.[field];
    if (coll && 'items' in coll)
        return coll;
    throw new Error('Parent collection not found');
};
function _visit(path, item, visitor) {
    let ctrl = visitor(item, path);
    if (typeof ctrl === 'symbol')
        return ctrl;
    for (const field of ['key', 'value']) {
        const token = item[field];
        if (token && 'items' in token) {
            for (let i = 0; i < token.items.length; ++i) {
                const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK)
                    return BREAK;
                else if (ci === REMOVE) {
                    token.items.splice(i, 1);
                    i -= 1;
                }
            }
            if (typeof ctrl === 'function' && field === 'key')
                ctrl = ctrl(item, path);
        }
    }
    return typeof ctrl === 'function' ? ctrl(item, path) : ctrl;
}

exports.visit = visit;


/***/ }),

/***/ 9169:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var cstScalar = __nccwpck_require__(9027);
var cstStringify = __nccwpck_require__(6307);
var cstVisit = __nccwpck_require__(8497);

/** The byte order mark */
const BOM = '\u{FEFF}';
/** Start of doc-mode */
const DOCUMENT = '\x02'; // C0: Start of Text
/** Unexpected end of flow-mode */
const FLOW_END = '\x18'; // C0: Cancel
/** Next token is a scalar value */
const SCALAR = '\x1f'; // C0: Unit Separator
/** @returns `true` if `token` is a flow or block collection */
const isCollection = (token) => !!token && 'items' in token;
/** @returns `true` if `token` is a flow or block scalar; not an alias */
const isScalar = (token) => !!token &&
    (token.type === 'scalar' ||
        token.type === 'single-quoted-scalar' ||
        token.type === 'double-quoted-scalar' ||
        token.type === 'block-scalar');
/* istanbul ignore next */
/** Get a printable representation of a lexer token */
function prettyToken(token) {
    switch (token) {
        case BOM:
            return '<BOM>';
        case DOCUMENT:
            return '<DOC>';
        case FLOW_END:
            return '<FLOW_END>';
        case SCALAR:
            return '<SCALAR>';
        default:
            return JSON.stringify(token);
    }
}
/** Identify the type of a lexer token. May return `null` for unknown tokens. */
function tokenType(source) {
    switch (source) {
        case BOM:
            return 'byte-order-mark';
        case DOCUMENT:
            return 'doc-mode';
        case FLOW_END:
            return 'flow-error-end';
        case SCALAR:
            return 'scalar';
        case '---':
            return 'doc-start';
        case '...':
            return 'doc-end';
        case '':
        case '\n':
        case '\r\n':
            return 'newline';
        case '-':
            return 'seq-item-ind';
        case '?':
            return 'explicit-key-ind';
        case ':':
            return 'map-value-ind';
        case '{':
            return 'flow-map-start';
        case '}':
            return 'flow-map-end';
        case '[':
            return 'flow-seq-start';
        case ']':
            return 'flow-seq-end';
        case ',':
            return 'comma';
    }
    switch (source[0]) {
        case ' ':
        case '\t':
            return 'space';
        case '#':
            return 'comment';
        case '%':
            return 'directive-line';
        case '*':
            return 'alias';
        case '&':
            return 'anchor';
        case '!':
            return 'tag';
        case "'":
            return 'single-quoted-scalar';
        case '"':
            return 'double-quoted-scalar';
        case '|':
        case '>':
            return 'block-scalar-header';
    }
    return null;
}

exports.createScalarToken = cstScalar.createScalarToken;
exports.resolveAsScalar = cstScalar.resolveAsScalar;
exports.setScalarValue = cstScalar.setScalarValue;
exports.stringify = cstStringify.stringify;
exports.visit = cstVisit.visit;
exports.BOM = BOM;
exports.DOCUMENT = DOCUMENT;
exports.FLOW_END = FLOW_END;
exports.SCALAR = SCALAR;
exports.isCollection = isCollection;
exports.isScalar = isScalar;
exports.prettyToken = prettyToken;
exports.tokenType = tokenType;


/***/ }),

/***/ 5976:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var cst = __nccwpck_require__(9169);

/*
START -> stream

stream
  directive -> line-end -> stream
  indent + line-end -> stream
  [else] -> line-start

line-end
  comment -> line-end
  newline -> .
  input-end -> END

line-start
  doc-start -> doc
  doc-end -> stream
  [else] -> indent -> block-start

block-start
  seq-item-start -> block-start
  explicit-key-start -> block-start
  map-value-start -> block-start
  [else] -> doc

doc
  line-end -> line-start
  spaces -> doc
  anchor -> doc
  tag -> doc
  flow-start -> flow -> doc
  flow-end -> error -> doc
  seq-item-start -> error -> doc
  explicit-key-start -> error -> doc
  map-value-start -> doc
  alias -> doc
  quote-start -> quoted-scalar -> doc
  block-scalar-header -> line-end -> block-scalar(min) -> line-start
  [else] -> plain-scalar(false, min) -> doc

flow
  line-end -> flow
  spaces -> flow
  anchor -> flow
  tag -> flow
  flow-start -> flow -> flow
  flow-end -> .
  seq-item-start -> error -> flow
  explicit-key-start -> flow
  map-value-start -> flow
  alias -> flow
  quote-start -> quoted-scalar -> flow
  comma -> flow
  [else] -> plain-scalar(true, 0) -> flow

quoted-scalar
  quote-end -> .
  [else] -> quoted-scalar

block-scalar(min)
  newline + peek(indent < min) -> .
  [else] -> block-scalar(min)

plain-scalar(is-flow, min)
  scalar-end(is-flow) -> .
  peek(newline + (indent < min)) -> .
  [else] -> plain-scalar(min)
*/
function isEmpty(ch) {
    switch (ch) {
        case undefined:
        case ' ':
        case '\n':
        case '\r':
        case '\t':
            return true;
        default:
            return false;
    }
}
const hexDigits = '0123456789ABCDEFabcdef'.split('');
const tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split('');
const invalidFlowScalarChars = ',[]{}'.split('');
const invalidAnchorChars = ' ,[]{}\n\r\t'.split('');
const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.includes(ch);
/**
 * Splits an input string into lexical tokens, i.e. smaller strings that are
 * easily identifiable by `tokens.tokenType()`.
 *
 * Lexing starts always in a "stream" context. Incomplete input may be buffered
 * until a complete token can be emitted.
 *
 * In addition to slices of the original input, the following control characters
 * may also be emitted:
 *
 * - `\x02` (Start of Text): A document starts with the next token
 * - `\x18` (Cancel): Unexpected end of flow-mode (indicates an error)
 * - `\x1f` (Unit Separator): Next token is a scalar value
 * - `\u{FEFF}` (Byte order mark): Emitted separately outside documents
 */
class Lexer {
    constructor() {
        /**
         * Flag indicating whether the end of the current buffer marks the end of
         * all input
         */
        this.atEnd = false;
        /**
         * Explicit indent set in block scalar header, as an offset from the current
         * minimum indent, so e.g. set to 1 from a header `|2+`. Set to -1 if not
         * explicitly set.
         */
        this.blockScalarIndent = -1;
        /**
         * Block scalars that include a + (keep) chomping indicator in their header
         * include trailing empty lines, which are otherwise excluded from the
         * scalar's contents.
         */
        this.blockScalarKeep = false;
        /** Current input */
        this.buffer = '';
        /**
         * Flag noting whether the map value indicator : can immediately follow this
         * node within a flow context.
         */
        this.flowKey = false;
        /** Count of surrounding flow collection levels. */
        this.flowLevel = 0;
        /**
         * Minimum level of indentation required for next lines to be parsed as a
         * part of the current scalar value.
         */
        this.indentNext = 0;
        /** Indentation level of the current line. */
        this.indentValue = 0;
        /** Position of the next \n character. */
        this.lineEndPos = null;
        /** Stores the state of the lexer if reaching the end of incpomplete input */
        this.next = null;
        /** A pointer to `buffer`; the current position of the lexer. */
        this.pos = 0;
    }
    /**
     * Generate YAML tokens from the `source` string. If `incomplete`,
     * a part of the last line may be left as a buffer for the next call.
     *
     * @returns A generator of lexical tokens
     */
    *lex(source, incomplete = false) {
        if (source) {
            this.buffer = this.buffer ? this.buffer + source : source;
            this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? 'stream';
        while (next && (incomplete || this.hasChars(1)))
            next = yield* this.parseNext(next);
    }
    atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === ' ' || ch === '\t')
            ch = this.buffer[++i];
        if (!ch || ch === '#' || ch === '\n')
            return true;
        if (ch === '\r')
            return this.buffer[i + 1] === '\n';
        return false;
    }
    charAt(n) {
        return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
            let indent = 0;
            while (ch === ' ')
                ch = this.buffer[++indent + offset];
            if (ch === '\r') {
                const next = this.buffer[indent + offset + 1];
                if (next === '\n' || (!next && !this.atEnd))
                    return offset + indent + 1;
            }
            return ch === '\n' || indent >= this.indentNext || (!ch && !this.atEnd)
                ? offset + indent
                : -1;
        }
        if (ch === '-' || ch === '.') {
            const dt = this.buffer.substr(offset, 3);
            if ((dt === '---' || dt === '...') && isEmpty(this.buffer[offset + 3]))
                return -1;
        }
        return offset;
    }
    getLine() {
        let end = this.lineEndPos;
        if (typeof end !== 'number' || (end !== -1 && end < this.pos)) {
            end = this.buffer.indexOf('\n', this.pos);
            this.lineEndPos = end;
        }
        if (end === -1)
            return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === '\r')
            end -= 1;
        return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
        return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
    }
    peek(n) {
        return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
        switch (next) {
            case 'stream':
                return yield* this.parseStream();
            case 'line-start':
                return yield* this.parseLineStart();
            case 'block-start':
                return yield* this.parseBlockStart();
            case 'doc':
                return yield* this.parseDocument();
            case 'flow':
                return yield* this.parseFlowCollection();
            case 'quoted-scalar':
                return yield* this.parseQuotedScalar();
            case 'block-scalar':
                return yield* this.parseBlockScalar();
            case 'plain-scalar':
                return yield* this.parsePlainScalar();
        }
    }
    *parseStream() {
        let line = this.getLine();
        if (line === null)
            return this.setNext('stream');
        if (line[0] === cst.BOM) {
            yield* this.pushCount(1);
            line = line.substring(1);
        }
        if (line[0] === '%') {
            let dirEnd = line.length;
            const cs = line.indexOf('#');
            if (cs !== -1) {
                const ch = line[cs - 1];
                if (ch === ' ' || ch === '\t')
                    dirEnd = cs - 1;
            }
            while (true) {
                const ch = line[dirEnd - 1];
                if (ch === ' ' || ch === '\t')
                    dirEnd -= 1;
                else
                    break;
            }
            const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
            yield* this.pushCount(line.length - n); // possible comment
            this.pushNewline();
            return 'stream';
        }
        if (this.atLineEnd()) {
            const sp = yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - sp);
            yield* this.pushNewline();
            return 'stream';
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
    }
    *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
            return this.setNext('line-start');
        if (ch === '-' || ch === '.') {
            if (!this.atEnd && !this.hasChars(4))
                return this.setNext('line-start');
            const s = this.peek(3);
            if (s === '---' && isEmpty(this.charAt(3))) {
                yield* this.pushCount(3);
                this.indentValue = 0;
                this.indentNext = 0;
                return 'doc';
            }
            else if (s === '...' && isEmpty(this.charAt(3))) {
                yield* this.pushCount(3);
                return 'stream';
            }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
            this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
            return this.setNext('block-start');
        if ((ch0 === '-' || ch0 === '?' || ch0 === ':') && isEmpty(ch1)) {
            const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
            this.indentNext = this.indentValue + 1;
            this.indentValue += n;
            return yield* this.parseBlockStart();
        }
        return 'doc';
    }
    *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
            return this.setNext('doc');
        let n = yield* this.pushIndicators();
        switch (line[n]) {
            case '#':
                yield* this.pushCount(line.length - n);
            // fallthrough
            case undefined:
                yield* this.pushNewline();
                return yield* this.parseLineStart();
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel = 1;
                return 'flow';
            case '}':
            case ']':
                // this is an error
                yield* this.pushCount(1);
                return 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'doc';
            case '"':
            case "'":
                return yield* this.parseQuotedScalar();
            case '|':
            case '>':
                n += yield* this.parseBlockScalarHeader();
                n += yield* this.pushSpaces(true);
                yield* this.pushCount(line.length - n);
                yield* this.pushNewline();
                return yield* this.parseBlockScalar();
            default:
                return yield* this.parsePlainScalar();
        }
    }
    *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
            nl = yield* this.pushNewline();
            if (nl > 0) {
                sp = yield* this.pushSpaces(false);
                this.indentValue = indent = sp;
            }
            else {
                sp = 0;
            }
            sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
            return this.setNext('flow');
        if ((indent !== -1 && indent < this.indentNext && line[0] !== '#') ||
            (indent === 0 &&
                (line.startsWith('---') || line.startsWith('...')) &&
                isEmpty(line[3]))) {
            // Allowing for the terminal ] or } at the same (rather than greater)
            // indent level as the initial [ or { is technically invalid, but
            // failing here would be surprising to users.
            const atFlowEndMarker = indent === this.indentNext - 1 &&
                this.flowLevel === 1 &&
                (line[0] === ']' || line[0] === '}');
            if (!atFlowEndMarker) {
                // this is an error
                this.flowLevel = 0;
                yield cst.FLOW_END;
                return yield* this.parseLineStart();
            }
        }
        let n = 0;
        while (line[n] === ',') {
            n += yield* this.pushCount(1);
            n += yield* this.pushSpaces(true);
            this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
            case undefined:
                return 'flow';
            case '#':
                yield* this.pushCount(line.length - n);
                return 'flow';
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel += 1;
                return 'flow';
            case '}':
            case ']':
                yield* this.pushCount(1);
                this.flowKey = true;
                this.flowLevel -= 1;
                return this.flowLevel ? 'flow' : 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'flow';
            case '"':
            case "'":
                this.flowKey = true;
                return yield* this.parseQuotedScalar();
            case ':': {
                const next = this.charAt(1);
                if (this.flowKey || isEmpty(next) || next === ',') {
                    this.flowKey = false;
                    yield* this.pushCount(1);
                    yield* this.pushSpaces(true);
                    return 'flow';
                }
            }
            // fallthrough
            default:
                this.flowKey = false;
                return yield* this.parsePlainScalar();
        }
    }
    *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
            while (end !== -1 && this.buffer[end + 1] === "'")
                end = this.buffer.indexOf("'", end + 2);
        }
        else {
            // double-quote
            while (end !== -1) {
                let n = 0;
                while (this.buffer[end - 1 - n] === '\\')
                    n += 1;
                if (n % 2 === 0)
                    break;
                end = this.buffer.indexOf('"', end + 1);
            }
        }
        // Only looking for newlines within the quotes
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf('\n', this.pos);
        if (nl !== -1) {
            while (nl !== -1) {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = qb.indexOf('\n', cs);
            }
            if (nl !== -1) {
                // this is an error caused by an unexpected unindent
                end = nl - (qb[nl - 1] === '\r' ? 2 : 1);
            }
        }
        if (end === -1) {
            if (!this.atEnd)
                return this.setNext('quoted-scalar');
            end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? 'flow' : 'doc';
    }
    *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
            const ch = this.buffer[++i];
            if (ch === '+')
                this.blockScalarKeep = true;
            else if (ch > '0' && ch <= '9')
                this.blockScalarIndent = Number(ch) - 1;
            else if (ch !== '-')
                break;
        }
        return yield* this.pushUntil(ch => isEmpty(ch) || ch === '#');
    }
    *parseBlockScalar() {
        let nl = this.pos - 1; // may be -1 if this.pos === 0
        let indent = 0;
        let ch;
        loop: for (let i = this.pos; (ch = this.buffer[i]); ++i) {
            switch (ch) {
                case ' ':
                    indent += 1;
                    break;
                case '\n':
                    nl = i;
                    indent = 0;
                    break;
                case '\r': {
                    const next = this.buffer[i + 1];
                    if (!next && !this.atEnd)
                        return this.setNext('block-scalar');
                    if (next === '\n')
                        break;
                } // fallthrough
                default:
                    break loop;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('block-scalar');
        if (indent >= this.indentNext) {
            if (this.blockScalarIndent === -1)
                this.indentNext = indent;
            else
                this.indentNext += this.blockScalarIndent;
            do {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = this.buffer.indexOf('\n', cs);
            } while (nl !== -1);
            if (nl === -1) {
                if (!this.atEnd)
                    return this.setNext('block-scalar');
                nl = this.buffer.length;
            }
        }
        if (!this.blockScalarKeep) {
            do {
                let i = nl - 1;
                let ch = this.buffer[i];
                if (ch === '\r')
                    ch = this.buffer[--i];
                const lastChar = i; // Drop the line if last char not more indented
                while (ch === ' ' || ch === '\t')
                    ch = this.buffer[--i];
                if (ch === '\n' && i >= this.pos && i + 1 + indent > lastChar)
                    nl = i;
                else
                    break;
            } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while ((ch = this.buffer[++i])) {
            if (ch === ':') {
                const next = this.buffer[i + 1];
                if (isEmpty(next) || (inFlow && next === ','))
                    break;
                end = i;
            }
            else if (isEmpty(ch)) {
                let next = this.buffer[i + 1];
                if (ch === '\r') {
                    if (next === '\n') {
                        i += 1;
                        ch = '\n';
                        next = this.buffer[i + 1];
                    }
                    else
                        end = i;
                }
                if (next === '#' || (inFlow && invalidFlowScalarChars.includes(next)))
                    break;
                if (ch === '\n') {
                    const cs = this.continueScalar(i + 1);
                    if (cs === -1)
                        break;
                    i = Math.max(i, cs - 2); // to advance, but still account for ' #'
                }
            }
            else {
                if (inFlow && invalidFlowScalarChars.includes(ch))
                    break;
                end = i;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('plain-scalar');
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? 'flow' : 'doc';
    }
    *pushCount(n) {
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos += n;
            return n;
        }
        return 0;
    }
    *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
            yield s;
            this.pos += s.length;
            return s.length;
        }
        else if (allowEmpty)
            yield '';
        return 0;
    }
    *pushIndicators() {
        switch (this.charAt(0)) {
            case '!':
                return ((yield* this.pushTag()) +
                    (yield* this.pushSpaces(true)) +
                    (yield* this.pushIndicators()));
            case '&':
                return ((yield* this.pushUntil(isNotAnchorChar)) +
                    (yield* this.pushSpaces(true)) +
                    (yield* this.pushIndicators()));
            case '-': // this is an error
            case '?': // this is an error outside flow collections
            case ':': {
                const inFlow = this.flowLevel > 0;
                const ch1 = this.charAt(1);
                if (isEmpty(ch1) || (inFlow && invalidFlowScalarChars.includes(ch1))) {
                    if (!inFlow)
                        this.indentNext = this.indentValue + 1;
                    else if (this.flowKey)
                        this.flowKey = false;
                    return ((yield* this.pushCount(1)) +
                        (yield* this.pushSpaces(true)) +
                        (yield* this.pushIndicators()));
                }
            }
        }
        return 0;
    }
    *pushTag() {
        if (this.charAt(1) === '<') {
            let i = this.pos + 2;
            let ch = this.buffer[i];
            while (!isEmpty(ch) && ch !== '>')
                ch = this.buffer[++i];
            return yield* this.pushToIndex(ch === '>' ? i + 1 : i, false);
        }
        else {
            let i = this.pos + 1;
            let ch = this.buffer[i];
            while (ch) {
                if (tagChars.includes(ch))
                    ch = this.buffer[++i];
                else if (ch === '%' &&
                    hexDigits.includes(this.buffer[i + 1]) &&
                    hexDigits.includes(this.buffer[i + 2])) {
                    ch = this.buffer[(i += 3)];
                }
                else
                    break;
            }
            return yield* this.pushToIndex(i, false);
        }
    }
    *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === '\n')
            return yield* this.pushCount(1);
        else if (ch === '\r' && this.charAt(1) === '\n')
            return yield* this.pushCount(2);
        else
            return 0;
    }
    *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
            ch = this.buffer[++i];
        } while (ch === ' ' || (allowTabs && ch === '\t'));
        const n = i - this.pos;
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos = i;
        }
        return n;
    }
    *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
            ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
    }
}

exports.Lexer = Lexer;


/***/ }),

/***/ 1929:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Tracks newlines during parsing in order to provide an efficient API for
 * determining the one-indexed `{ line, col }` position for any offset
 * within the input.
 */
class LineCounter {
    constructor() {
        this.lineStarts = [];
        /**
         * Should be called in ascending order. Otherwise, call
         * `lineCounter.lineStarts.sort()` before calling `linePos()`.
         */
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        /**
         * Performs a binary search and returns the 1-indexed { line, col }
         * position of `offset`. If `line === 0`, `addNewLine` has never been
         * called or `offset` is before the first known newline.
         */
        this.linePos = (offset) => {
            let low = 0;
            let high = this.lineStarts.length;
            while (low < high) {
                const mid = (low + high) >> 1; // Math.floor((low + high) / 2)
                if (this.lineStarts[mid] < offset)
                    low = mid + 1;
                else
                    high = mid;
            }
            if (this.lineStarts[low] === offset)
                return { line: low + 1, col: 1 };
            if (low === 0)
                return { line: 0, col: offset };
            const start = this.lineStarts[low - 1];
            return { line: low, col: offset - start + 1 };
        };
    }
}

exports.LineCounter = LineCounter;


/***/ }),

/***/ 3328:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var cst = __nccwpck_require__(9169);
var lexer = __nccwpck_require__(5976);

function includesToken(list, type) {
    for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
            return true;
    return false;
}
function findNonEmptyIndex(list) {
    for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
            case 'space':
            case 'comment':
            case 'newline':
                break;
            default:
                return i;
        }
    }
    return -1;
}
function isFlowToken(token) {
    switch (token?.type) {
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'flow-collection':
            return true;
        default:
            return false;
    }
}
function getPrevProps(parent) {
    switch (parent.type) {
        case 'document':
            return parent.start;
        case 'block-map': {
            const it = parent.items[parent.items.length - 1];
            return it.sep ?? it.start;
        }
        case 'block-seq':
            return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
            return [];
    }
}
/** Note: May modify input array */
function getFirstKeyStartProps(prev) {
    if (prev.length === 0)
        return [];
    let i = prev.length;
    loop: while (--i >= 0) {
        switch (prev[i].type) {
            case 'doc-start':
            case 'explicit-key-ind':
            case 'map-value-ind':
            case 'seq-item-ind':
            case 'newline':
                break loop;
        }
    }
    while (prev[++i]?.type === 'space') {
        /* loop */
    }
    return prev.splice(i, prev.length);
}
function fixFlowSeqItems(fc) {
    if (fc.start.type === 'flow-seq-start') {
        for (const it of fc.items) {
            if (it.sep &&
                !it.value &&
                !includesToken(it.start, 'explicit-key-ind') &&
                !includesToken(it.sep, 'map-value-ind')) {
                if (it.key)
                    it.value = it.key;
                delete it.key;
                if (isFlowToken(it.value)) {
                    if (it.value.end)
                        Array.prototype.push.apply(it.value.end, it.sep);
                    else
                        it.value.end = it.sep;
                }
                else
                    Array.prototype.push.apply(it.start, it.sep);
                delete it.sep;
            }
        }
    }
}
/**
 * A YAML concrete syntax tree (CST) parser
 *
 * ```ts
 * const src: string = ...
 * for (const token of new Parser().parse(src)) {
 *   // token: Token
 * }
 * ```
 *
 * To use the parser with a user-provided lexer:
 *
 * ```ts
 * function* parse(source: string, lexer: Lexer) {
 *   const parser = new Parser()
 *   for (const lexeme of lexer.lex(source))
 *     yield* parser.next(lexeme)
 *   yield* parser.end()
 * }
 *
 * const src: string = ...
 * const lexer = new Lexer()
 * for (const token of parse(src, lexer)) {
 *   // token: Token
 * }
 * ```
 */
class Parser {
    /**
     * @param onNewLine - If defined, called separately with the start position of
     *   each new line (in `parse()`, including the start of input).
     */
    constructor(onNewLine) {
        /** If true, space and sequence indicators count as indentation */
        this.atNewLine = true;
        /** If true, next token is a scalar value */
        this.atScalar = false;
        /** Current indentation level */
        this.indent = 0;
        /** Current offset since the start of parsing */
        this.offset = 0;
        /** On the same line with a block map key */
        this.onKeyLine = false;
        /** Top indicates the node that's currently being built */
        this.stack = [];
        /** The source of the current token, set in parse() */
        this.source = '';
        /** The type of the current token, set in parse() */
        this.type = '';
        // Must be defined after `next()`
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
    }
    /**
     * Parse `source` as a YAML stream.
     * If `incomplete`, a part of the last line may be left as a buffer for the next call.
     *
     * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
     *
     * @returns A generator of tokens representing each directive, document, and other structure.
     */
    *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
            this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
            yield* this.next(lexeme);
        if (!incomplete)
            yield* this.end();
    }
    /**
     * Advance the parser by the `source` of one lexical token.
     */
    *next(source) {
        this.source = source;
        if (process.env.LOG_TOKENS)
            console.log('|', cst.prettyToken(source));
        if (this.atScalar) {
            this.atScalar = false;
            yield* this.step();
            this.offset += source.length;
            return;
        }
        const type = cst.tokenType(source);
        if (!type) {
            const message = `Not a YAML token: ${source}`;
            yield* this.pop({ type: 'error', offset: this.offset, message, source });
            this.offset += source.length;
        }
        else if (type === 'scalar') {
            this.atNewLine = false;
            this.atScalar = true;
            this.type = 'scalar';
        }
        else {
            this.type = type;
            yield* this.step();
            switch (type) {
                case 'newline':
                    this.atNewLine = true;
                    this.indent = 0;
                    if (this.onNewLine)
                        this.onNewLine(this.offset + source.length);
                    break;
                case 'space':
                    if (this.atNewLine && source[0] === ' ')
                        this.indent += source.length;
                    break;
                case 'explicit-key-ind':
                case 'map-value-ind':
                case 'seq-item-ind':
                    if (this.atNewLine)
                        this.indent += source.length;
                    break;
                case 'doc-mode':
                case 'flow-error-end':
                    return;
                default:
                    this.atNewLine = false;
            }
            this.offset += source.length;
        }
    }
    /** Call at end of input to push out any remaining constructions */
    *end() {
        while (this.stack.length > 0)
            yield* this.pop();
    }
    get sourceToken() {
        const st = {
            type: this.type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
        return st;
    }
    *step() {
        const top = this.peek(1);
        if (this.type === 'doc-end' && (!top || top.type !== 'doc-end')) {
            while (this.stack.length > 0)
                yield* this.pop();
            this.stack.push({
                type: 'doc-end',
                offset: this.offset,
                source: this.source
            });
            return;
        }
        if (!top)
            return yield* this.stream();
        switch (top.type) {
            case 'document':
                return yield* this.document(top);
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return yield* this.scalar(top);
            case 'block-scalar':
                return yield* this.blockScalar(top);
            case 'block-map':
                return yield* this.blockMap(top);
            case 'block-seq':
                return yield* this.blockSequence(top);
            case 'flow-collection':
                return yield* this.flowCollection(top);
            case 'doc-end':
                return yield* this.documentEnd(top);
        }
        /* istanbul ignore next should not happen */
        yield* this.pop();
    }
    peek(n) {
        return this.stack[this.stack.length - n];
    }
    *pop(error) {
        const token = error ?? this.stack.pop();
        /* istanbul ignore if should not happen */
        if (!token) {
            const message = 'Tried to pop an empty stack';
            yield { type: 'error', offset: this.offset, source: '', message };
        }
        else if (this.stack.length === 0) {
            yield token;
        }
        else {
            const top = this.peek(1);
            if (token.type === 'block-scalar') {
                // Block scalars use their parent rather than header indent
                token.indent = 'indent' in top ? top.indent : 0;
            }
            else if (token.type === 'flow-collection' && top.type === 'document') {
                // Ignore all indent for top-level flow collections
                token.indent = 0;
            }
            if (token.type === 'flow-collection')
                fixFlowSeqItems(token);
            switch (top.type) {
                case 'document':
                    top.value = token;
                    break;
                case 'block-scalar':
                    top.props.push(token); // error
                    break;
                case 'block-map': {
                    const it = top.items[top.items.length - 1];
                    if (it.value) {
                        top.items.push({ start: [], key: token, sep: [] });
                        this.onKeyLine = true;
                        return;
                    }
                    else if (it.sep) {
                        it.value = token;
                    }
                    else {
                        Object.assign(it, { key: token, sep: [] });
                        this.onKeyLine = !includesToken(it.start, 'explicit-key-ind');
                        return;
                    }
                    break;
                }
                case 'block-seq': {
                    const it = top.items[top.items.length - 1];
                    if (it.value)
                        top.items.push({ start: [], value: token });
                    else
                        it.value = token;
                    break;
                }
                case 'flow-collection': {
                    const it = top.items[top.items.length - 1];
                    if (!it || it.value)
                        top.items.push({ start: [], key: token, sep: [] });
                    else if (it.sep)
                        it.value = token;
                    else
                        Object.assign(it, { key: token, sep: [] });
                    return;
                }
                /* istanbul ignore next should not happen */
                default:
                    yield* this.pop();
                    yield* this.pop(token);
            }
            if ((top.type === 'document' ||
                top.type === 'block-map' ||
                top.type === 'block-seq') &&
                (token.type === 'block-map' || token.type === 'block-seq')) {
                const last = token.items[token.items.length - 1];
                if (last &&
                    !last.sep &&
                    !last.value &&
                    last.start.length > 0 &&
                    findNonEmptyIndex(last.start) === -1 &&
                    (token.indent === 0 ||
                        last.start.every(st => st.type !== 'comment' || st.indent < token.indent))) {
                    if (top.type === 'document')
                        top.end = last.start;
                    else
                        top.items.push({ start: last.start });
                    token.items.splice(-1, 1);
                }
            }
        }
    }
    *stream() {
        switch (this.type) {
            case 'directive-line':
                yield { type: 'directive', offset: this.offset, source: this.source };
                return;
            case 'byte-order-mark':
            case 'space':
            case 'comment':
            case 'newline':
                yield this.sourceToken;
                return;
            case 'doc-mode':
            case 'doc-start': {
                const doc = {
                    type: 'document',
                    offset: this.offset,
                    start: []
                };
                if (this.type === 'doc-start')
                    doc.start.push(this.sourceToken);
                this.stack.push(doc);
                return;
            }
        }
        yield {
            type: 'error',
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML stream`,
            source: this.source
        };
    }
    *document(doc) {
        if (doc.value)
            return yield* this.lineEnd(doc);
        switch (this.type) {
            case 'doc-start': {
                if (findNonEmptyIndex(doc.start) !== -1) {
                    yield* this.pop();
                    yield* this.step();
                }
                else
                    doc.start.push(this.sourceToken);
                return;
            }
            case 'anchor':
            case 'tag':
            case 'space':
            case 'comment':
            case 'newline':
                doc.start.push(this.sourceToken);
                return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
            this.stack.push(bv);
        else {
            yield {
                type: 'error',
                offset: this.offset,
                message: `Unexpected ${this.type} token in YAML document`,
                source: this.source
            };
        }
    }
    *scalar(scalar) {
        if (this.type === 'map-value-ind') {
            const prev = getPrevProps(this.peek(2));
            const start = getFirstKeyStartProps(prev);
            let sep;
            if (scalar.end) {
                sep = scalar.end;
                sep.push(this.sourceToken);
                delete scalar.end;
            }
            else
                sep = [this.sourceToken];
            const map = {
                type: 'block-map',
                offset: scalar.offset,
                indent: scalar.indent,
                items: [{ start, key: scalar, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
        }
        else
            yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
        switch (this.type) {
            case 'space':
            case 'comment':
            case 'newline':
                scalar.props.push(this.sourceToken);
                return;
            case 'scalar':
                scalar.source = this.source;
                // block-scalar source includes trailing newline
                this.atNewLine = true;
                this.indent = 0;
                if (this.onNewLine) {
                    let nl = this.source.indexOf('\n') + 1;
                    while (nl !== 0) {
                        this.onNewLine(this.offset + nl);
                        nl = this.source.indexOf('\n', nl) + 1;
                    }
                }
                yield* this.pop();
                break;
            /* istanbul ignore next should not happen */
            default:
                yield* this.pop();
                yield* this.step();
        }
    }
    *blockMap(map) {
        const it = map.items[map.items.length - 1];
        // it.sep is true-ish if pair already has key or : separator
        switch (this.type) {
            case 'newline':
                this.onKeyLine = false;
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    it.start.push(this.sourceToken);
                }
                return;
            case 'space':
            case 'comment':
                if (it.value) {
                    map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    if (this.atIndentedComment(it.start, map.indent)) {
                        const prev = map.items[map.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            Array.prototype.push.apply(end, it.start);
                            end.push(this.sourceToken);
                            map.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
        }
        if (this.indent >= map.indent) {
            const atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep;
            // For empty nodes, assign newline-separated not indented empty tokens to following node
            let start = [];
            if (atNextItem && it.sep && !it.value) {
                const nl = [];
                for (let i = 0; i < it.sep.length; ++i) {
                    const st = it.sep[i];
                    switch (st.type) {
                        case 'newline':
                            nl.push(i);
                            break;
                        case 'space':
                            break;
                        case 'comment':
                            if (st.indent > map.indent)
                                nl.length = 0;
                            break;
                        default:
                            nl.length = 0;
                    }
                }
                if (nl.length >= 2)
                    start = it.sep.splice(nl[1]);
            }
            switch (this.type) {
                case 'anchor':
                case 'tag':
                    if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        it.sep.push(this.sourceToken);
                    }
                    else {
                        it.start.push(this.sourceToken);
                    }
                    return;
                case 'explicit-key-ind':
                    if (!it.sep && !includesToken(it.start, 'explicit-key-ind')) {
                        it.start.push(this.sourceToken);
                    }
                    else if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start });
                    }
                    else {
                        this.stack.push({
                            type: 'block-map',
                            offset: this.offset,
                            indent: this.indent,
                            items: [{ start: [this.sourceToken] }]
                        });
                    }
                    this.onKeyLine = true;
                    return;
                case 'map-value-ind':
                    if (includesToken(it.start, 'explicit-key-ind')) {
                        if (!it.sep) {
                            if (includesToken(it.start, 'newline')) {
                                Object.assign(it, { key: null, sep: [this.sourceToken] });
                            }
                            else {
                                const start = getFirstKeyStartProps(it.start);
                                this.stack.push({
                                    type: 'block-map',
                                    offset: this.offset,
                                    indent: this.indent,
                                    items: [{ start, key: null, sep: [this.sourceToken] }]
                                });
                            }
                        }
                        else if (it.value) {
                            map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else if (isFlowToken(it.key) &&
                            !includesToken(it.sep, 'newline')) {
                            const start = getFirstKeyStartProps(it.start);
                            const key = it.key;
                            const sep = it.sep;
                            sep.push(this.sourceToken);
                            // @ts-expect-error type guard is wrong here
                            delete it.key, delete it.sep;
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key, sep }]
                            });
                        }
                        else if (start.length > 0) {
                            // Not actually at next item
                            it.sep = it.sep.concat(start, this.sourceToken);
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    else {
                        if (!it.sep) {
                            Object.assign(it, { key: null, sep: [this.sourceToken] });
                        }
                        else if (it.value || atNextItem) {
                            map.items.push({ start, key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start: [], key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    this.onKeyLine = true;
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (atNextItem || it.value) {
                        map.items.push({ start, key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        this.stack.push(fs);
                    }
                    else {
                        Object.assign(it, { key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    return;
                }
                default: {
                    const bv = this.startBlockValue(map);
                    if (bv) {
                        if (atNextItem &&
                            bv.type !== 'block-seq' &&
                            includesToken(it.start, 'explicit-key-ind')) {
                            map.items.push({ start });
                        }
                        this.stack.push(bv);
                        return;
                    }
                }
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
            case 'newline':
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        seq.items.push({ start: [this.sourceToken] });
                }
                else
                    it.start.push(this.sourceToken);
                return;
            case 'space':
            case 'comment':
                if (it.value)
                    seq.items.push({ start: [this.sourceToken] });
                else {
                    if (this.atIndentedComment(it.start, seq.indent)) {
                        const prev = seq.items[seq.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            Array.prototype.push.apply(end, it.start);
                            end.push(this.sourceToken);
                            seq.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
            case 'anchor':
            case 'tag':
                if (it.value || this.indent <= seq.indent)
                    break;
                it.start.push(this.sourceToken);
                return;
            case 'seq-item-ind':
                if (this.indent !== seq.indent)
                    break;
                if (it.value || includesToken(it.start, 'seq-item-ind'))
                    seq.items.push({ start: [this.sourceToken] });
                else
                    it.start.push(this.sourceToken);
                return;
        }
        if (this.indent > seq.indent) {
            const bv = this.startBlockValue(seq);
            if (bv) {
                this.stack.push(bv);
                return;
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === 'flow-error-end') {
            let top;
            do {
                yield* this.pop();
                top = this.peek(1);
            } while (top && top.type === 'flow-collection');
        }
        else if (fc.end.length === 0) {
            switch (this.type) {
                case 'comma':
                case 'explicit-key-ind':
                    if (!it || it.sep)
                        fc.items.push({ start: [this.sourceToken] });
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'map-value-ind':
                    if (!it || it.value)
                        fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        Object.assign(it, { key: null, sep: [this.sourceToken] });
                    return;
                case 'space':
                case 'comment':
                case 'newline':
                case 'anchor':
                case 'tag':
                    if (!it || it.value)
                        fc.items.push({ start: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (!it || it.value)
                        fc.items.push({ start: [], key: fs, sep: [] });
                    else if (it.sep)
                        this.stack.push(fs);
                    else
                        Object.assign(it, { key: fs, sep: [] });
                    return;
                }
                case 'flow-map-end':
                case 'flow-seq-end':
                    fc.end.push(this.sourceToken);
                    return;
            }
            const bv = this.startBlockValue(fc);
            /* istanbul ignore else should not happen */
            if (bv)
                this.stack.push(bv);
            else {
                yield* this.pop();
                yield* this.step();
            }
        }
        else {
            const parent = this.peek(2);
            if (parent.type === 'block-map' &&
                ((this.type === 'map-value-ind' && parent.indent === fc.indent) ||
                    (this.type === 'newline' &&
                        !parent.items[parent.items.length - 1].sep))) {
                yield* this.pop();
                yield* this.step();
            }
            else if (this.type === 'map-value-ind' &&
                parent.type !== 'flow-collection') {
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                fixFlowSeqItems(fc);
                const sep = fc.end.splice(1, fc.end.length);
                sep.push(this.sourceToken);
                const map = {
                    type: 'block-map',
                    offset: fc.offset,
                    indent: fc.indent,
                    items: [{ start, key: fc, sep }]
                };
                this.onKeyLine = true;
                this.stack[this.stack.length - 1] = map;
            }
            else {
                yield* this.lineEnd(fc);
            }
        }
    }
    flowScalar(type) {
        if (this.onNewLine) {
            let nl = this.source.indexOf('\n') + 1;
            while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf('\n', nl) + 1;
            }
        }
        return {
            type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
    }
    startBlockValue(parent) {
        switch (this.type) {
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return this.flowScalar(this.type);
            case 'block-scalar-header':
                return {
                    type: 'block-scalar',
                    offset: this.offset,
                    indent: this.indent,
                    props: [this.sourceToken],
                    source: ''
                };
            case 'flow-map-start':
            case 'flow-seq-start':
                return {
                    type: 'flow-collection',
                    offset: this.offset,
                    indent: this.indent,
                    start: this.sourceToken,
                    items: [],
                    end: []
                };
            case 'seq-item-ind':
                return {
                    type: 'block-seq',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [this.sourceToken] }]
                };
            case 'explicit-key-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                start.push(this.sourceToken);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start }]
                };
            }
            case 'map-value-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                };
            }
        }
        return null;
    }
    atIndentedComment(start, indent) {
        if (this.type !== 'comment')
            return false;
        if (this.indent <= indent)
            return false;
        return start.every(st => st.type === 'newline' || st.type === 'space');
    }
    *documentEnd(docEnd) {
        if (this.type !== 'doc-mode') {
            if (docEnd.end)
                docEnd.end.push(this.sourceToken);
            else
                docEnd.end = [this.sourceToken];
            if (this.type === 'newline')
                yield* this.pop();
        }
    }
    *lineEnd(token) {
        switch (this.type) {
            case 'comma':
            case 'doc-start':
            case 'doc-end':
            case 'flow-seq-end':
            case 'flow-map-end':
            case 'map-value-ind':
                yield* this.pop();
                yield* this.step();
                break;
            case 'newline':
                this.onKeyLine = false;
            // fallthrough
            case 'space':
            case 'comment':
            default:
                // all other values are errors
                if (token.end)
                    token.end.push(this.sourceToken);
                else
                    token.end = [this.sourceToken];
                if (this.type === 'newline')
                    yield* this.pop();
        }
    }
}

exports.Parser = Parser;


/***/ }),

/***/ 8649:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var composer = __nccwpck_require__(9493);
var Document = __nccwpck_require__(42);
var errors = __nccwpck_require__(4236);
var log = __nccwpck_require__(6909);
var lineCounter = __nccwpck_require__(1929);
var parser = __nccwpck_require__(3328);

function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter$1 = options.lineCounter || (prettyErrors && new lineCounter.LineCounter()) || null;
    return { lineCounter: lineCounter$1, prettyErrors };
}
/**
 * Parse the input as a stream of YAML documents.
 *
 * Documents should be separated from each other by `...` or `---` marker lines.
 *
 * @returns If an empty `docs` array is returned, it will be of type
 *   EmptyStream and contain additional stream information. In
 *   TypeScript, you should use `'empty' in docs` as a type guard for it.
 */
function parseAllDocuments(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    const docs = Array.from(composer$1.compose(parser$1.parse(source)));
    if (prettyErrors && lineCounter)
        for (const doc of docs) {
            doc.errors.forEach(errors.prettifyError(source, lineCounter));
            doc.warnings.forEach(errors.prettifyError(source, lineCounter));
        }
    if (docs.length > 0)
        return docs;
    return Object.assign([], { empty: true }, composer$1.streamInfo());
}
/** Parse an input string into a single YAML.Document */
function parseDocument(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    // `doc` is always set by compose.end(true) at the very latest
    let doc = null;
    for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
            doc = _doc;
        else if (doc.options.logLevel !== 'silent') {
            doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), 'MULTIPLE_DOCS', 'Source contains multiple documents; please use YAML.parseAllDocuments()'));
            break;
        }
    }
    if (prettyErrors && lineCounter) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter));
    }
    return doc;
}
function parse(src, reviver, options) {
    let _reviver = undefined;
    if (typeof reviver === 'function') {
        _reviver = reviver;
    }
    else if (options === undefined && reviver && typeof reviver === 'object') {
        options = reviver;
    }
    const doc = parseDocument(src, options);
    if (!doc)
        return null;
    doc.warnings.forEach(warning => log.warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
        if (doc.options.logLevel !== 'silent')
            throw doc.errors[0];
        else
            doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
}
function stringify(value, replacer, options) {
    let _replacer = null;
    if (typeof replacer === 'function' || Array.isArray(replacer)) {
        _replacer = replacer;
    }
    else if (options === undefined && replacer) {
        options = replacer;
    }
    if (typeof options === 'string')
        options = options.length;
    if (typeof options === 'number') {
        const indent = Math.round(options);
        options = indent < 1 ? undefined : indent > 8 ? { indent: 8 } : { indent };
    }
    if (value === undefined) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
            return undefined;
    }
    return new Document.Document(value, _replacer, options).toString(options);
}

exports.parse = parse;
exports.parseAllDocuments = parseAllDocuments;
exports.parseDocument = parseDocument;
exports.stringify = stringify;


/***/ }),

/***/ 6831:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var map = __nccwpck_require__(83);
var seq = __nccwpck_require__(1693);
var string = __nccwpck_require__(2201);
var tags = __nccwpck_require__(4138);

const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
class Schema {
    constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat)
            ? tags.getTags(compat, 'compat')
            : compat
                ? tags.getTags(null, compat)
                : null;
        this.merge = !!merge;
        this.name = (typeof schema === 'string' && schema) || 'core';
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, Node.MAP, { value: map.map });
        Object.defineProperty(this, Node.SCALAR, { value: string.string });
        Object.defineProperty(this, Node.SEQ, { value: seq.seq });
        // Used by createMap()
        this.sortMapEntries =
            typeof sortMapEntries === 'function'
                ? sortMapEntries
                : sortMapEntries === true
                    ? sortMapEntriesByKey
                    : null;
    }
    clone() {
        const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
    }
}

exports.Schema = Schema;


/***/ }),

/***/ 83:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var YAMLMap = __nccwpck_require__(6011);

function createMap(schema, obj, ctx) {
    const { keepUndefined, replacer } = ctx;
    const map = new YAMLMap.YAMLMap(schema);
    const add = (key, value) => {
        if (typeof replacer === 'function')
            value = replacer.call(obj, key, value);
        else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
        if (value !== undefined || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
    };
    if (obj instanceof Map) {
        for (const [key, value] of obj)
            add(key, value);
    }
    else if (obj && typeof obj === 'object') {
        for (const key of Object.keys(obj))
            add(key, obj[key]);
    }
    if (typeof schema.sortMapEntries === 'function') {
        map.items.sort(schema.sortMapEntries);
    }
    return map;
}
const map = {
    collection: 'map',
    createNode: createMap,
    default: true,
    nodeClass: YAMLMap.YAMLMap,
    tag: 'tag:yaml.org,2002:map',
    resolve(map, onError) {
        if (!Node.isMap(map))
            onError('Expected a mapping for this tag');
        return map;
    }
};

exports.map = map;


/***/ }),

/***/ 6703:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);

const nullTag = {
    identify: value => value == null,
    createNode: () => new Scalar.Scalar(null),
    default: true,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar.Scalar(null),
    stringify: ({ source }, ctx) => typeof source === 'string' && nullTag.test.test(source)
        ? source
        : ctx.options.nullStr
};

exports.nullTag = nullTag;


/***/ }),

/***/ 1693:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var createNode = __nccwpck_require__(9652);
var Node = __nccwpck_require__(1399);
var YAMLSeq = __nccwpck_require__(5161);

function createSeq(schema, obj, ctx) {
    const { replacer } = ctx;
    const seq = new YAMLSeq.YAMLSeq(schema);
    if (obj && Symbol.iterator in Object(obj)) {
        let i = 0;
        for (let it of obj) {
            if (typeof replacer === 'function') {
                const key = obj instanceof Set ? it : String(i++);
                it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, undefined, ctx));
        }
    }
    return seq;
}
const seq = {
    collection: 'seq',
    createNode: createSeq,
    default: true,
    nodeClass: YAMLSeq.YAMLSeq,
    tag: 'tag:yaml.org,2002:seq',
    resolve(seq, onError) {
        if (!Node.isSeq(seq))
            onError('Expected a sequence for this tag');
        return seq;
    }
};

exports.seq = seq;


/***/ }),

/***/ 2201:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyString = __nccwpck_require__(6226);

const string = {
    identify: value => typeof value === 'string',
    default: true,
    tag: 'tag:yaml.org,2002:str',
    resolve: str => str,
    stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
    }
};

exports.string = string;


/***/ }),

/***/ 2045:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);

const boolTag = {
    identify: value => typeof value === 'boolean',
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: str => new Scalar.Scalar(str[0] === 't' || str[0] === 'T'),
    stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
            const sv = source[0] === 't' || source[0] === 'T';
            if (value === sv)
                return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
};

exports.boolTag = boolTag;


/***/ }),

/***/ 6810:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var stringifyNumber = __nccwpck_require__(4174);

const floatNaN = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
    resolve: str => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber.stringifyNumber
};
const floatExp = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: str => parseFloat(str),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
    }
};
const float = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf('.');
        if (dot !== -1 && str[str.length - 1] === '0')
            node.minFractionDigits = str.length - dot - 1;
        return node;
    },
    stringify: stringifyNumber.stringifyNumber
};

exports.float = float;
exports.floatExp = floatExp;
exports.floatNaN = floatNaN;


/***/ }),

/***/ 3019:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyNumber = __nccwpck_require__(4174);

const intIdentify = (value) => typeof value === 'bigint' || Number.isInteger(value);
const intResolve = (str, offset, radix, { intAsBigInt }) => (intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix));
function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
    return stringifyNumber.stringifyNumber(node);
}
const intOct = {
    identify: value => intIdentify(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
    stringify: node => intStringify(node, 8, '0o')
};
const int = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber.stringifyNumber
};
const intHex = {
    identify: value => intIdentify(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: node => intStringify(node, 16, '0x')
};

exports.int = int;
exports.intHex = intHex;
exports.intOct = intOct;


/***/ }),

/***/ 27:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var map = __nccwpck_require__(83);
var _null = __nccwpck_require__(6703);
var seq = __nccwpck_require__(1693);
var string = __nccwpck_require__(2201);
var bool = __nccwpck_require__(2045);
var float = __nccwpck_require__(6810);
var int = __nccwpck_require__(3019);

const schema = [
    map.map,
    seq.seq,
    string.string,
    _null.nullTag,
    bool.boolTag,
    int.intOct,
    int.int,
    int.intHex,
    float.floatNaN,
    float.floatExp,
    float.float
];

exports.schema = schema;


/***/ }),

/***/ 4545:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var map = __nccwpck_require__(83);
var seq = __nccwpck_require__(1693);

function intIdentify(value) {
    return typeof value === 'bigint' || Number.isInteger(value);
}
const stringifyJSON = ({ value }) => JSON.stringify(value);
const jsonScalars = [
    {
        identify: value => typeof value === 'string',
        default: true,
        tag: 'tag:yaml.org,2002:str',
        resolve: str => str,
        stringify: stringifyJSON
    },
    {
        identify: value => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: 'tag:yaml.org,2002:null',
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
    },
    {
        identify: value => typeof value === 'boolean',
        default: true,
        tag: 'tag:yaml.org,2002:bool',
        test: /^true|false$/,
        resolve: str => str === 'true',
        stringify: stringifyJSON
    },
    {
        identify: intIdentify,
        default: true,
        tag: 'tag:yaml.org,2002:int',
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
    },
    {
        identify: value => typeof value === 'number',
        default: true,
        tag: 'tag:yaml.org,2002:float',
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: str => parseFloat(str),
        stringify: stringifyJSON
    }
];
const jsonError = {
    default: true,
    tag: '',
    test: /^/,
    resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
    }
};
const schema = [map.map, seq.seq].concat(jsonScalars, jsonError);

exports.schema = schema;


/***/ }),

/***/ 4138:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var map = __nccwpck_require__(83);
var _null = __nccwpck_require__(6703);
var seq = __nccwpck_require__(1693);
var string = __nccwpck_require__(2201);
var bool = __nccwpck_require__(2045);
var float = __nccwpck_require__(6810);
var int = __nccwpck_require__(3019);
var schema = __nccwpck_require__(27);
var schema$1 = __nccwpck_require__(4545);
var binary = __nccwpck_require__(5724);
var omap = __nccwpck_require__(8974);
var pairs = __nccwpck_require__(9841);
var schema$2 = __nccwpck_require__(5389);
var set = __nccwpck_require__(7847);
var timestamp = __nccwpck_require__(1156);

const schemas = new Map([
    ['core', schema.schema],
    ['failsafe', [map.map, seq.seq, string.string]],
    ['json', schema$1.schema],
    ['yaml11', schema$2.schema],
    ['yaml-1.1', schema$2.schema]
]);
const tagsByName = {
    binary: binary.binary,
    bool: bool.boolTag,
    float: float.float,
    floatExp: float.floatExp,
    floatNaN: float.floatNaN,
    floatTime: timestamp.floatTime,
    int: int.int,
    intHex: int.intHex,
    intOct: int.intOct,
    intTime: timestamp.intTime,
    map: map.map,
    null: _null.nullTag,
    omap: omap.omap,
    pairs: pairs.pairs,
    seq: seq.seq,
    set: set.set,
    timestamp: timestamp.timestamp
};
const coreKnownTags = {
    'tag:yaml.org,2002:binary': binary.binary,
    'tag:yaml.org,2002:omap': omap.omap,
    'tag:yaml.org,2002:pairs': pairs.pairs,
    'tag:yaml.org,2002:set': set.set,
    'tag:yaml.org,2002:timestamp': timestamp.timestamp
};
function getTags(customTags, schemaName) {
    let tags = schemas.get(schemaName);
    if (!tags) {
        if (Array.isArray(customTags))
            tags = [];
        else {
            const keys = Array.from(schemas.keys())
                .filter(key => key !== 'yaml11')
                .map(key => JSON.stringify(key))
                .join(', ');
            throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
    }
    if (Array.isArray(customTags)) {
        for (const tag of customTags)
            tags = tags.concat(tag);
    }
    else if (typeof customTags === 'function') {
        tags = customTags(tags.slice());
    }
    return tags.map(tag => {
        if (typeof tag !== 'string')
            return tag;
        const tagObj = tagsByName[tag];
        if (tagObj)
            return tagObj;
        const keys = Object.keys(tagsByName)
            .map(key => JSON.stringify(key))
            .join(', ');
        throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
    });
}

exports.coreKnownTags = coreKnownTags;
exports.getTags = getTags;


/***/ }),

/***/ 5724:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var stringifyString = __nccwpck_require__(6226);

const binary = {
    identify: value => value instanceof Uint8Array,
    default: false,
    tag: 'tag:yaml.org,2002:binary',
    /**
     * Returns a Buffer in node and an Uint8Array in browsers
     *
     * To use the resulting buffer as an image, you'll want to do something like:
     *
     *   const blob = new Blob([buffer], { type: 'image/jpeg' })
     *   document.querySelector('#photo').src = URL.createObjectURL(blob)
     */
    resolve(src, onError) {
        if (typeof Buffer === 'function') {
            return Buffer.from(src, 'base64');
        }
        else if (typeof atob === 'function') {
            // On IE 11, atob() can't handle newlines
            const str = atob(src.replace(/[\n\r]/g, ''));
            const buffer = new Uint8Array(str.length);
            for (let i = 0; i < str.length; ++i)
                buffer[i] = str.charCodeAt(i);
            return buffer;
        }
        else {
            onError('This environment does not support reading binary tags; either Buffer or atob is required');
            return src;
        }
    },
    stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        const buf = value; // checked earlier by binary.identify()
        let str;
        if (typeof Buffer === 'function') {
            str =
                buf instanceof Buffer
                    ? buf.toString('base64')
                    : Buffer.from(buf.buffer).toString('base64');
        }
        else if (typeof btoa === 'function') {
            let s = '';
            for (let i = 0; i < buf.length; ++i)
                s += String.fromCharCode(buf[i]);
            str = btoa(s);
        }
        else {
            throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
        }
        if (!type)
            type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
            const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
            const n = Math.ceil(str.length / lineWidth);
            const lines = new Array(n);
            for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
                lines[i] = str.substr(o, lineWidth);
            }
            str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? '\n' : ' ');
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
    }
};

exports.binary = binary;


/***/ }),

/***/ 2631:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);

function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source))
        return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
}
const trueTag = {
    identify: value => value === true,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar.Scalar(true),
    stringify: boolStringify
};
const falseTag = {
    identify: value => value === false,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
    resolve: () => new Scalar.Scalar(false),
    stringify: boolStringify
};

exports.falseTag = falseTag;
exports.trueTag = trueTag;


/***/ }),

/***/ 8035:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var stringifyNumber = __nccwpck_require__(4174);

const floatNaN = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber.stringifyNumber
};
const floatExp = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, '')),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
    }
};
const float = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, '')));
        const dot = str.indexOf('.');
        if (dot !== -1) {
            const f = str.substring(dot + 1).replace(/_/g, '');
            if (f[f.length - 1] === '0')
                node.minFractionDigits = f.length;
        }
        return node;
    },
    stringify: stringifyNumber.stringifyNumber
};

exports.float = float;
exports.floatExp = floatExp;
exports.floatNaN = floatNaN;


/***/ }),

/***/ 9503:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyNumber = __nccwpck_require__(4174);

const intIdentify = (value) => typeof value === 'bigint' || Number.isInteger(value);
function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === '-' || sign === '+')
        offset += 1;
    str = str.substring(offset).replace(/_/g, '');
    if (intAsBigInt) {
        switch (radix) {
            case 2:
                str = `0b${str}`;
                break;
            case 8:
                str = `0o${str}`;
                break;
            case 16:
                str = `0x${str}`;
                break;
        }
        const n = BigInt(str);
        return sign === '-' ? BigInt(-1) * n : n;
    }
    const n = parseInt(str, radix);
    return sign === '-' ? -1 * n : n;
}
function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? '-' + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber.stringifyNumber(node);
}
const intBin = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'BIN',
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: node => intStringify(node, 2, '0b')
};
const intOct = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: node => intStringify(node, 8, '0')
};
const int = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber.stringifyNumber
};
const intHex = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: node => intStringify(node, 16, '0x')
};

exports.int = int;
exports.intBin = intBin;
exports.intHex = intHex;
exports.intOct = intOct;


/***/ }),

/***/ 8974:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var YAMLSeq = __nccwpck_require__(5161);
var toJS = __nccwpck_require__(2463);
var Node = __nccwpck_require__(1399);
var YAMLMap = __nccwpck_require__(6011);
var pairs = __nccwpck_require__(9841);

class YAMLOMap extends YAMLSeq.YAMLSeq {
    constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = YAMLOMap.tag;
    }
    /**
     * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
     * but TypeScript won't allow widening the signature of a child method.
     */
    toJSON(_, ctx) {
        if (!ctx)
            return super.toJSON(_);
        const map = new Map();
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const pair of this.items) {
            let key, value;
            if (Node.isPair(pair)) {
                key = toJS.toJS(pair.key, '', ctx);
                value = toJS.toJS(pair.value, key, ctx);
            }
            else {
                key = toJS.toJS(pair, '', ctx);
            }
            if (map.has(key))
                throw new Error('Ordered maps must not include duplicate keys');
            map.set(key, value);
        }
        return map;
    }
}
YAMLOMap.tag = 'tag:yaml.org,2002:omap';
const omap = {
    collection: 'seq',
    identify: value => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: 'tag:yaml.org,2002:omap',
    resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
            if (Node.isScalar(key)) {
                if (seenKeys.includes(key.value)) {
                    onError(`Ordered maps must not include duplicate keys: ${key.value}`);
                }
                else {
                    seenKeys.push(key.value);
                }
            }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
    },
    createNode(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap = new YAMLOMap();
        omap.items = pairs$1.items;
        return omap;
    }
};

exports.YAMLOMap = YAMLOMap;
exports.omap = omap;


/***/ }),

/***/ 9841:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var Scalar = __nccwpck_require__(9338);
var YAMLSeq = __nccwpck_require__(5161);

function resolvePairs(seq, onError) {
    if (Node.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
            let item = seq.items[i];
            if (Node.isPair(item))
                continue;
            else if (Node.isMap(item)) {
                if (item.items.length > 1)
                    onError('Each pair must have its own sequence indicator');
                const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
                if (item.commentBefore)
                    pair.key.commentBefore = pair.key.commentBefore
                        ? `${item.commentBefore}\n${pair.key.commentBefore}`
                        : item.commentBefore;
                if (item.comment) {
                    const cn = pair.value ?? pair.key;
                    cn.comment = cn.comment
                        ? `${item.comment}\n${cn.comment}`
                        : item.comment;
                }
                item = pair;
            }
            seq.items[i] = Node.isPair(item) ? item : new Pair.Pair(item);
        }
    }
    else
        onError('Expected a sequence for this tag');
    return seq;
}
function createPairs(schema, iterable, ctx) {
    const { replacer } = ctx;
    const pairs = new YAMLSeq.YAMLSeq(schema);
    pairs.tag = 'tag:yaml.org,2002:pairs';
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
            if (typeof replacer === 'function')
                it = replacer.call(iterable, String(i++), it);
            let key, value;
            if (Array.isArray(it)) {
                if (it.length === 2) {
                    key = it[0];
                    value = it[1];
                }
                else
                    throw new TypeError(`Expected [key, value] tuple: ${it}`);
            }
            else if (it && it instanceof Object) {
                const keys = Object.keys(it);
                if (keys.length === 1) {
                    key = keys[0];
                    value = it[key];
                }
                else
                    throw new TypeError(`Expected { key: value } tuple: ${it}`);
            }
            else {
                key = it;
            }
            pairs.items.push(Pair.createPair(key, value, ctx));
        }
    return pairs;
}
const pairs = {
    collection: 'seq',
    default: false,
    tag: 'tag:yaml.org,2002:pairs',
    resolve: resolvePairs,
    createNode: createPairs
};

exports.createPairs = createPairs;
exports.pairs = pairs;
exports.resolvePairs = resolvePairs;


/***/ }),

/***/ 5389:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var map = __nccwpck_require__(83);
var _null = __nccwpck_require__(6703);
var seq = __nccwpck_require__(1693);
var string = __nccwpck_require__(2201);
var binary = __nccwpck_require__(5724);
var bool = __nccwpck_require__(2631);
var float = __nccwpck_require__(8035);
var int = __nccwpck_require__(9503);
var omap = __nccwpck_require__(8974);
var pairs = __nccwpck_require__(9841);
var set = __nccwpck_require__(7847);
var timestamp = __nccwpck_require__(1156);

const schema = [
    map.map,
    seq.seq,
    string.string,
    _null.nullTag,
    bool.trueTag,
    bool.falseTag,
    int.intBin,
    int.intOct,
    int.int,
    int.intHex,
    float.floatNaN,
    float.floatExp,
    float.float,
    binary.binary,
    omap.omap,
    pairs.pairs,
    set.set,
    timestamp.intTime,
    timestamp.floatTime,
    timestamp.timestamp
];

exports.schema = schema;


/***/ }),

/***/ 7847:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Pair = __nccwpck_require__(246);
var YAMLMap = __nccwpck_require__(6011);

class YAMLSet extends YAMLMap.YAMLMap {
    constructor(schema) {
        super(schema);
        this.tag = YAMLSet.tag;
    }
    add(key) {
        let pair;
        if (Node.isPair(key))
            pair = key;
        else if (typeof key === 'object' &&
            'key' in key &&
            'value' in key &&
            key.value === null)
            pair = new Pair.Pair(key.key, null);
        else
            pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
            this.items.push(pair);
    }
    /**
     * If `keepPair` is `true`, returns the Pair matching `key`.
     * Otherwise, returns the value of that Pair's key.
     */
    get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && Node.isPair(pair)
            ? Node.isScalar(pair.key)
                ? pair.key.value
                : pair.key
            : pair;
    }
    set(key, value) {
        if (typeof value !== 'boolean')
            throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
            this.items.splice(this.items.indexOf(prev), 1);
        }
        else if (!prev && value) {
            this.items.push(new Pair.Pair(key));
        }
    }
    toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        if (this.hasAllNullValues(true))
            return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
            throw new Error('Set items must all have null values');
    }
}
YAMLSet.tag = 'tag:yaml.org,2002:set';
const set = {
    collection: 'map',
    identify: value => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: 'tag:yaml.org,2002:set',
    resolve(map, onError) {
        if (Node.isMap(map)) {
            if (map.hasAllNullValues(true))
                return Object.assign(new YAMLSet(), map);
            else
                onError('Set items must all have null values');
        }
        else
            onError('Expected a mapping for this tag');
        return map;
    },
    createNode(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set = new YAMLSet(schema);
        if (iterable && Symbol.iterator in Object(iterable))
            for (let value of iterable) {
                if (typeof replacer === 'function')
                    value = replacer.call(iterable, value, value);
                set.items.push(Pair.createPair(value, null, ctx));
            }
        return set;
    }
};

exports.YAMLSet = YAMLSet;
exports.set = set;


/***/ }),

/***/ 1156:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var stringifyNumber = __nccwpck_require__(4174);

/** Internal types handle bigint as number, because TS can't figure it out. */
function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === '-' || sign === '+' ? str.substring(1) : str;
    const num = (n) => asBigInt ? BigInt(n) : Number(n);
    const res = parts
        .replace(/_/g, '')
        .split(':')
        .reduce((res, p) => res * num(60) + num(p), num(0));
    return (sign === '-' ? num(-1) * res : res);
}
/**
 * hhhh:mm:ss.sss
 *
 * Internal types handle bigint as number, because TS can't figure it out.
 */
function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === 'bigint')
        num = n => BigInt(n);
    else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
    let sign = '';
    if (value < 0) {
        sign = '-';
        value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60]; // seconds, including ms
    if (value < 60) {
        parts.unshift(0); // at least one : is required
    }
    else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60); // minutes
        if (value >= 60) {
            value = (value - parts[0]) / _60;
            parts.unshift(value); // hours
        }
    }
    return (sign +
        parts
            .map(n => (n < 10 ? '0' + String(n) : String(n)))
            .join(':')
            .replace(/000000\d*$/, '') // % 60 may introduce error
    );
}
const intTime = {
    identify: value => typeof value === 'bigint' || Number.isInteger(value),
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal
};
const floatTime = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: str => parseSexagesimal(str, false),
    stringify: stringifySexagesimal
};
const timestamp = {
    identify: value => value instanceof Date,
    default: true,
    tag: 'tag:yaml.org,2002:timestamp',
    // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
    // may be omitted altogether, resulting in a date format. In such a case, the time part is
    // assumed to be 00:00:00Z (start of day, UTC).
    test: RegExp('^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})' + // YYYY-Mm-Dd
        '(?:' + // time is optional
        '(?:t|T|[ \\t]+)' + // t | T | whitespace
        '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)' + // Hh:Mm:Ss(.ss)?
        '(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?' + // Z | +5 | -03:30
        ')?$'),
    resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
            throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + '00').substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== 'Z') {
            let d = parseSexagesimal(tz, false);
            if (Math.abs(d) < 30)
                d *= 60;
            date -= 60000 * d;
        }
        return new Date(date);
    },
    stringify: ({ value }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, '')
};

exports.floatTime = floatTime;
exports.intTime = intTime;
exports.timestamp = timestamp;


/***/ }),

/***/ 2889:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const FOLD_FLOW = 'flow';
const FOLD_BLOCK = 'block';
const FOLD_QUOTED = 'quoted';
/**
 * Tries to keep input at up to `lineWidth` characters, splitting only on spaces
 * not followed by newlines or spaces unless `mode` is `'quoted'`. Lines are
 * terminated with `\n` and started with `indent`.
 */
function foldFlowLines(text, indent, mode = 'flow', { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
    if (!lineWidth || lineWidth < 0)
        return text;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text.length <= endStep)
        return text;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === 'number') {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
            folds.push(0);
        else
            end = lineWidth - indentAtStart;
    }
    let split = undefined;
    let prev = undefined;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1)
            end = i + endStep;
    }
    for (let ch; (ch = text[(i += 1)]);) {
        if (mode === FOLD_QUOTED && ch === '\\') {
            escStart = i;
            switch (text[i + 1]) {
                case 'x':
                    i += 3;
                    break;
                case 'u':
                    i += 5;
                    break;
                case 'U':
                    i += 9;
                    break;
                default:
                    i += 1;
            }
            escEnd = i;
        }
        if (ch === '\n') {
            if (mode === FOLD_BLOCK)
                i = consumeMoreIndentedLines(text, i);
            end = i + endStep;
            split = undefined;
        }
        else {
            if (ch === ' ' &&
                prev &&
                prev !== ' ' &&
                prev !== '\n' &&
                prev !== '\t') {
                // space surrounded by non-space can be replaced with newline + indent
                const next = text[i + 1];
                if (next && next !== ' ' && next !== '\n' && next !== '\t')
                    split = i;
            }
            if (i >= end) {
                if (split) {
                    folds.push(split);
                    end = split + endStep;
                    split = undefined;
                }
                else if (mode === FOLD_QUOTED) {
                    // white-space collected at end may stretch past lineWidth
                    while (prev === ' ' || prev === '\t') {
                        prev = ch;
                        ch = text[(i += 1)];
                        overflow = true;
                    }
                    // Account for newline escape, but don't break preceding escape
                    const j = i > escEnd + 1 ? i - 2 : escStart - 1;
                    // Bail out if lineWidth & minContentWidth are shorter than an escape string
                    if (escapedFolds[j])
                        return text;
                    folds.push(j);
                    escapedFolds[j] = true;
                    end = j + endStep;
                    split = undefined;
                }
                else {
                    overflow = true;
                }
            }
        }
        prev = ch;
    }
    if (overflow && onOverflow)
        onOverflow();
    if (folds.length === 0)
        return text;
    if (onFold)
        onFold();
    let res = text.slice(0, folds[0]);
    for (let i = 0; i < folds.length; ++i) {
        const fold = folds[i];
        const end = folds[i + 1] || text.length;
        if (fold === 0)
            res = `\n${indent}${text.slice(0, end)}`;
        else {
            if (mode === FOLD_QUOTED && escapedFolds[fold])
                res += `${text[fold]}\\`;
            res += `\n${indent}${text.slice(fold + 1, end)}`;
        }
    }
    return res;
}
/**
 * Presumes `i + 1` is at the start of a line
 * @returns index of last newline in more-indented block
 */
function consumeMoreIndentedLines(text, i) {
    let ch = text[i + 1];
    while (ch === ' ' || ch === '\t') {
        do {
            ch = text[(i += 1)];
        } while (ch && ch !== '\n');
        ch = text[i + 1];
    }
    return i;
}

exports.FOLD_BLOCK = FOLD_BLOCK;
exports.FOLD_FLOW = FOLD_FLOW;
exports.FOLD_QUOTED = FOLD_QUOTED;
exports.foldFlowLines = foldFlowLines;


/***/ }),

/***/ 8409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var anchors = __nccwpck_require__(8459);
var Node = __nccwpck_require__(1399);
var stringifyComment = __nccwpck_require__(5182);
var stringifyString = __nccwpck_require__(6226);

function createStringifyContext(doc, options) {
    const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: 'PLAIN',
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: 'false',
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: 'null',
        simpleKeys: false,
        singleQuote: null,
        trueStr: 'true',
        verifyAliasOrder: true
    }, doc.schema.toStringOptions, options);
    let inFlow;
    switch (opt.collectionStyle) {
        case 'block':
            inFlow = false;
            break;
        case 'flow':
            inFlow = true;
            break;
        default:
            inFlow = null;
    }
    return {
        anchors: new Set(),
        doc,
        indent: '',
        indentStep: typeof opt.indent === 'number' ? ' '.repeat(opt.indent) : '  ',
        inFlow,
        options: opt
    };
}
function getTagObject(tags, item) {
    if (item.tag) {
        const match = tags.filter(t => t.tag === item.tag);
        if (match.length > 0)
            return match.find(t => t.format === item.format) ?? match[0];
    }
    let tagObj = undefined;
    let obj;
    if (Node.isScalar(item)) {
        obj = item.value;
        const match = tags.filter(t => t.identify?.(obj));
        tagObj =
            match.find(t => t.format === item.format) ?? match.find(t => !t.format);
    }
    else {
        obj = item;
        tagObj = tags.find(t => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
        const name = obj?.constructor?.name ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
    }
    return tagObj;
}
// needs to be called before value stringifier to allow for circular anchor refs
function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
    if (!doc.directives)
        return '';
    const props = [];
    const anchor = (Node.isScalar(node) || Node.isCollection(node)) && node.anchor;
    if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
    }
    const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
    if (tag)
        props.push(doc.directives.tagString(tag));
    return props.join(' ');
}
function stringify(item, ctx, onComment, onChompKeep) {
    if (Node.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
    if (Node.isAlias(item)) {
        if (ctx.doc.directives)
            return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
            throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        }
        else {
            if (ctx.resolvedAliases)
                ctx.resolvedAliases.add(item);
            else
                ctx.resolvedAliases = new Set([item]);
            item = item.resolve(ctx.doc);
        }
    }
    let tagObj = undefined;
    const node = Node.isNode(item)
        ? item
        : ctx.doc.createNode(item, { onTagObj: o => (tagObj = o) });
    if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str = typeof tagObj.stringify === 'function'
        ? tagObj.stringify(node, ctx, onComment, onChompKeep)
        : Node.isScalar(node)
            ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep)
            : node.toString(ctx, onComment, onChompKeep);
    if (!props)
        return str;
    return Node.isScalar(node) || str[0] === '{' || str[0] === '['
        ? `${props} ${str}`
        : `${props}\n${ctx.indent}${str}`;
}

exports.createStringifyContext = createStringifyContext;
exports.stringify = stringify;


/***/ }),

/***/ 2466:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Collection = __nccwpck_require__(3466);
var Node = __nccwpck_require__(1399);
var stringify = __nccwpck_require__(8409);
var stringifyComment = __nccwpck_require__(5182);

function stringifyCollection(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
    const { indent, options: { commentString } } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false; // flag for the preceding node's status
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (Node.isNode(item)) {
            if (!chompKeep && item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
            if (item.comment)
                comment = item.comment;
        }
        else if (Node.isPair(item)) {
            const ik = Node.isNode(item.key) ? item.key : null;
            if (ik) {
                if (!chompKeep && ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
            }
        }
        chompKeep = false;
        let str = stringify.stringify(item, itemCtx, () => (comment = null), () => (chompKeep = true));
        if (comment)
            str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        if (chompKeep && comment)
            chompKeep = false;
        lines.push(blockItemPrefix + str);
    }
    let str;
    if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
    }
    else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
            const line = lines[i];
            str += line ? `\n${indent}${line}` : '\n';
        }
    }
    if (comment) {
        str += '\n' + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
            onComment();
    }
    else if (chompKeep && onChompKeep)
        onChompKeep();
    return str;
}
function stringifyFlowCollection({ comment, items }, ctx, { flowChars, itemIndent, onComment }) {
    const { indent, indentStep, options: { commentString } } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (Node.isNode(item)) {
            if (item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, false);
            if (item.comment)
                comment = item.comment;
        }
        else if (Node.isPair(item)) {
            const ik = Node.isNode(item.key) ? item.key : null;
            if (ik) {
                if (ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, false);
                if (ik.comment)
                    reqNewline = true;
            }
            const iv = Node.isNode(item.value) ? item.value : null;
            if (iv) {
                if (iv.comment)
                    comment = iv.comment;
                if (iv.commentBefore)
                    reqNewline = true;
            }
            else if (item.value == null && ik && ik.comment) {
                comment = ik.comment;
            }
        }
        if (comment)
            reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => (comment = null));
        if (i < items.length - 1)
            str += ',';
        if (comment)
            str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        if (!reqNewline && (lines.length > linesAtValue || str.includes('\n')))
            reqNewline = true;
        lines.push(str);
        linesAtValue = lines.length;
    }
    let str;
    const { start, end } = flowChars;
    if (lines.length === 0) {
        str = start + end;
    }
    else {
        if (!reqNewline) {
            const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
            reqNewline = len > Collection.Collection.maxFlowStringSingleLineLength;
        }
        if (reqNewline) {
            str = start;
            for (const line of lines)
                str += line ? `\n${indentStep}${indent}${line}` : '\n';
            str += `\n${indent}${end}`;
        }
        else {
            str = `${start} ${lines.join(' ')} ${end}`;
        }
    }
    if (comment) {
        str += stringifyComment.lineComment(str, commentString(comment), indent);
        if (onComment)
            onComment();
    }
    return str;
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
    if (comment && chompKeep)
        comment = comment.replace(/^\n+/, '');
    if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart()); // Avoid double indent on first line
    }
}

exports.stringifyCollection = stringifyCollection;


/***/ }),

/***/ 5182:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Stringifies a comment.
 *
 * Empty comment lines are left empty,
 * lines consisting of a single space are replaced by `#`,
 * and all other lines are prefixed with a `#`.
 */
const stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, '#');
function indentComment(comment, indent) {
    if (/^\n+$/.test(comment))
        return comment.substring(1);
    return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
const lineComment = (str, indent, comment) => str.endsWith('\n')
    ? indentComment(comment, indent)
    : comment.includes('\n')
        ? '\n' + indentComment(comment, indent)
        : (str.endsWith(' ') ? '' : ' ') + comment;

exports.indentComment = indentComment;
exports.lineComment = lineComment;
exports.stringifyComment = stringifyComment;


/***/ }),

/***/ 5225:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var stringify = __nccwpck_require__(8409);
var stringifyComment = __nccwpck_require__(5182);

function stringifyDocument(doc, options) {
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
            lines.push(dir);
            hasDirectives = true;
        }
        else if (doc.directives.docStart)
            hasDirectives = true;
    }
    if (hasDirectives)
        lines.push('---');
    const ctx = stringify.createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
        if (lines.length !== 1)
            lines.unshift('');
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ''));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
        if (Node.isNode(doc.contents)) {
            if (doc.contents.spaceBefore && hasDirectives)
                lines.push('');
            if (doc.contents.commentBefore) {
                const cs = commentString(doc.contents.commentBefore);
                lines.push(stringifyComment.indentComment(cs, ''));
            }
            // top-level block scalars need to be indented if followed by a comment
            ctx.forceBlockIndent = !!doc.comment;
            contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? undefined : () => (chompKeep = true);
        let body = stringify.stringify(doc.contents, ctx, () => (contentComment = null), onChompKeep);
        if (contentComment)
            body += stringifyComment.lineComment(body, '', commentString(contentComment));
        if ((body[0] === '|' || body[0] === '>') &&
            lines[lines.length - 1] === '---') {
            // Top-level block scalars with a preceding doc marker ought to use the
            // same line for their header.
            lines[lines.length - 1] = `--- ${body}`;
        }
        else
            lines.push(body);
    }
    else {
        lines.push(stringify.stringify(doc.contents, ctx));
    }
    if (doc.directives?.docEnd) {
        if (doc.comment) {
            const cs = commentString(doc.comment);
            if (cs.includes('\n')) {
                lines.push('...');
                lines.push(stringifyComment.indentComment(cs, ''));
            }
            else {
                lines.push(`... ${cs}`);
            }
        }
        else {
            lines.push('...');
        }
    }
    else {
        let dc = doc.comment;
        if (dc && chompKeep)
            dc = dc.replace(/^\n+/, '');
        if (dc) {
            if ((!chompKeep || contentComment) && lines[lines.length - 1] !== '')
                lines.push('');
            lines.push(stringifyComment.indentComment(commentString(dc), ''));
        }
    }
    return lines.join('\n') + '\n';
}

exports.stringifyDocument = stringifyDocument;


/***/ }),

/***/ 4174:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function stringifyNumber({ format, minFractionDigits, tag, value }) {
    if (typeof value === 'bigint')
        return String(value);
    const num = typeof value === 'number' ? value : Number(value);
    if (!isFinite(num))
        return isNaN(num) ? '.nan' : num < 0 ? '-.inf' : '.inf';
    let n = JSON.stringify(value);
    if (!format &&
        minFractionDigits &&
        (!tag || tag === 'tag:yaml.org,2002:float') &&
        /^\d/.test(n)) {
        let i = n.indexOf('.');
        if (i < 0) {
            i = n.length;
            n += '.';
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
            n += '0';
    }
    return n;
}

exports.stringifyNumber = stringifyNumber;


/***/ }),

/***/ 4875:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);
var Scalar = __nccwpck_require__(9338);
var stringify = __nccwpck_require__(8409);
var stringifyComment = __nccwpck_require__(5182);

function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
    const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
    let keyComment = (Node.isNode(key) && key.comment) || null;
    if (simpleKeys) {
        if (keyComment) {
            throw new Error('With simple keys, key nodes cannot have comments');
        }
        if (Node.isCollection(key)) {
            const msg = 'With simple keys, collection cannot be used as a key value';
            throw new Error(msg);
        }
    }
    let explicitKey = !simpleKeys &&
        (!key ||
            (keyComment && value == null && !ctx.inFlow) ||
            Node.isCollection(key) ||
            (Node.isScalar(key)
                ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL
                : typeof key === 'object'));
    ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify.stringify(key, ctx, () => (keyCommentDone = true), () => (chompKeep = true));
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
            throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
        explicitKey = true;
    }
    if (ctx.inFlow) {
        if (allNullValues || value == null) {
            if (keyCommentDone && onComment)
                onComment();
            return str === '' ? '?' : explicitKey ? `? ${str}` : str;
        }
    }
    else if ((allNullValues && !simpleKeys) || (value == null && explicitKey)) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
            str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        }
        else if (chompKeep && onChompKeep)
            onChompKeep();
        return str;
    }
    if (keyCommentDone)
        keyComment = null;
    if (explicitKey) {
        if (keyComment)
            str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}\n${indent}:`;
    }
    else {
        str = `${str}:`;
        if (keyComment)
            str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vcb = '';
    let valueComment = null;
    if (Node.isNode(value)) {
        if (value.spaceBefore)
            vcb = '\n';
        if (value.commentBefore) {
            const cs = commentString(value.commentBefore);
            vcb += `\n${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        valueComment = value.comment;
    }
    else if (value && typeof value === 'object') {
        value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && Node.isScalar(value))
        ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (!indentSeq &&
        indentStep.length >= 2 &&
        !ctx.inFlow &&
        !explicitKey &&
        Node.isSeq(value) &&
        !value.flow &&
        !value.tag &&
        !value.anchor) {
        // If indentSeq === false, consider '- ' as part of indentation where possible
        ctx.indent = ctx.indent.substr(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify.stringify(value, ctx, () => (valueCommentDone = true), () => (chompKeep = true));
    let ws = ' ';
    if (vcb || keyComment) {
        if (valueStr === '' && !ctx.inFlow)
            ws = vcb === '\n' ? '\n\n' : vcb;
        else
            ws = `${vcb}\n${ctx.indent}`;
    }
    else if (!explicitKey && Node.isCollection(value)) {
        const flow = valueStr[0] === '[' || valueStr[0] === '{';
        if (!flow || valueStr.includes('\n'))
            ws = `\n${ctx.indent}`;
    }
    else if (valueStr === '' || valueStr[0] === '\n')
        ws = '';
    str += ws + valueStr;
    if (ctx.inFlow) {
        if (valueCommentDone && onComment)
            onComment();
    }
    else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
    }
    else if (chompKeep && onChompKeep) {
        onChompKeep();
    }
    return str;
}

exports.stringifyPair = stringifyPair;


/***/ }),

/***/ 6226:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Scalar = __nccwpck_require__(9338);
var foldFlowLines = __nccwpck_require__(2889);

const getFoldOptions = (ctx) => ({
    indentAtStart: ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth
});
// Also checks for lines starting with %, as parsing the output as YAML 1.1 will
// presume that's starting a new document.
const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0)
        return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit)
        return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === '\n') {
            if (i - start > limit)
                return true;
            start = i + 1;
            if (strLen - start <= limit)
                return false;
        }
    }
    return true;
}
function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON)
        return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    let str = '';
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === ' ' && json[i + 1] === '\\' && json[i + 2] === 'n') {
            // space before newline needs to be escaped to not be folded
            str += json.slice(start, i) + '\\ ';
            i += 1;
            start = i;
            ch = '\\';
        }
        if (ch === '\\')
            switch (json[i + 1]) {
                case 'u':
                    {
                        str += json.slice(start, i);
                        const code = json.substr(i + 2, 4);
                        switch (code) {
                            case '0000':
                                str += '\\0';
                                break;
                            case '0007':
                                str += '\\a';
                                break;
                            case '000b':
                                str += '\\v';
                                break;
                            case '001b':
                                str += '\\e';
                                break;
                            case '0085':
                                str += '\\N';
                                break;
                            case '00a0':
                                str += '\\_';
                                break;
                            case '2028':
                                str += '\\L';
                                break;
                            case '2029':
                                str += '\\P';
                                break;
                            default:
                                if (code.substr(0, 2) === '00')
                                    str += '\\x' + code.substr(2);
                                else
                                    str += json.substr(i, 6);
                        }
                        i += 5;
                        start = i + 1;
                    }
                    break;
                case 'n':
                    if (implicitKey ||
                        json[i + 2] === '"' ||
                        json.length < minMultiLineLength) {
                        i += 1;
                    }
                    else {
                        // folding will eat first newline
                        str += json.slice(start, i) + '\n\n';
                        while (json[i + 2] === '\\' &&
                            json[i + 3] === 'n' &&
                            json[i + 4] !== '"') {
                            str += '\n';
                            i += 2;
                        }
                        str += indent;
                        // space after newline needs to be escaped to not be folded
                        if (json[i + 2] === ' ')
                            str += '\\';
                        i += 1;
                        start = i + 1;
                    }
                    break;
                default:
                    i += 1;
            }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey
        ? str
        : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx));
}
function singleQuotedString(value, ctx) {
    if (ctx.options.singleQuote === false ||
        (ctx.implicitKey && value.includes('\n')) ||
        /[ \t]\n|\n[ \t]/.test(value) // single quoted string can't have leading or trailing whitespace around newline
    )
        return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`) + "'";
    return ctx.implicitKey
        ? res
        : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx));
}
function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false)
        qs = doubleQuotedString;
    else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
            qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
            qs = doubleQuotedString;
        else
            qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    // 1. Block can't end in whitespace unless the last line is non-empty.
    // 2. Strings consisting of only whitespace are best rendered explicitly.
    if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
    }
    const indent = ctx.indent ||
        (ctx.forceBlockIndent || containsDocumentMarker(value) ? '  ' : '');
    const literal = blockQuote === 'literal'
        ? true
        : blockQuote === 'folded' || type === Scalar.Scalar.BLOCK_FOLDED
            ? false
            : type === Scalar.Scalar.BLOCK_LITERAL
                ? true
                : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
        return literal ? '|\n' : '>\n';
    // determine chomping from whitespace at value end
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== '\n' && ch !== '\t' && ch !== ' ')
            break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf('\n');
    if (endNlPos === -1) {
        chomp = '-'; // strip
    }
    else if (value === end || endNlPos !== end.length - 1) {
        chomp = '+'; // keep
        if (onChompKeep)
            onChompKeep();
    }
    else {
        chomp = ''; // clip
    }
    if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === '\n')
            end = end.slice(0, -1);
        end = end.replace(/\n+(?!\n|$)/g, `$&${indent}`);
    }
    // determine indent indicator from whitespace at value start
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === ' ')
            startWithSpace = true;
        else if (ch === '\n')
            startNlPos = startEnd;
        else
            break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? '2' : '1'; // root is at -1
    let header = (literal ? '|' : '>') + (startWithSpace ? indentSize : '') + chomp;
    if (comment) {
        header += ' ' + commentString(comment.replace(/ ?[\r\n]+/g, ' '));
        if (onComment)
            onComment();
    }
    if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}\n${indent}${start}${value}${end}`;
    }
    value = value
        .replace(/\n+/g, '\n$&')
        .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2') // more-indented lines aren't folded
        //                ^ more-ind. ^ empty     ^ capture next empty lines only at end of indent
        .replace(/\n+/g, `$&${indent}`);
    const body = foldFlowLines.foldFlowLines(`${start}${value}${end}`, indent, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx));
    return `${header}\n${indent}${body}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, inFlow } = ctx;
    if ((implicitKey && /[\n[\]{},]/.test(value)) ||
        (inFlow && /[[\]{},]/.test(value))) {
        return quotedString(value, ctx);
    }
    if (!value ||
        /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        // not allowed:
        // - empty string, '-' or '?'
        // - start with an indicator character (except [?:-]) or /[?-] /
        // - '\n ', ': ' or ' \n' anywhere
        // - '#' not preceded by a non-space char
        // - end with ' ' or ':'
        return implicitKey || inFlow || !value.includes('\n')
            ? quotedString(value, ctx)
            : blockString(item, ctx, onComment, onChompKeep);
    }
    if (!implicitKey &&
        !inFlow &&
        type !== Scalar.Scalar.PLAIN &&
        value.includes('\n')) {
        // Where allowed & type not set explicitly, prefer block style for multiline strings
        return blockString(item, ctx, onComment, onChompKeep);
    }
    if (indent === '' && containsDocumentMarker(value)) {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
    }
    const str = value.replace(/\n+/g, `$&\n${indent}`);
    // Verify that output will be parsed as a string, as e.g. plain numbers and
    // booleans get parsed with those types in v1.2 (e.g. '42', 'true' & '0.9e-3'),
    // and others in v1.1.
    if (actualString) {
        const test = (tag) => tag.default && tag.tag !== 'tag:yaml.org,2002:str' && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
            return quotedString(value, ctx);
    }
    return implicitKey
        ? str
        : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss = typeof item.value === 'string'
        ? item
        : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        // force double quotes on control characters & unpaired surrogates
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
            type = Scalar.Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
        switch (_type) {
            case Scalar.Scalar.BLOCK_FOLDED:
            case Scalar.Scalar.BLOCK_LITERAL:
                return implicitKey || inFlow
                    ? quotedString(ss.value, ctx) // blocks are not valid inside flow containers
                    : blockString(ss, ctx, onComment, onChompKeep);
            case Scalar.Scalar.QUOTE_DOUBLE:
                return doubleQuotedString(ss.value, ctx);
            case Scalar.Scalar.QUOTE_SINGLE:
                return singleQuotedString(ss.value, ctx);
            case Scalar.Scalar.PLAIN:
                return plainString(ss, ctx, onComment, onChompKeep);
            default:
                return null;
        }
    };
    let res = _stringify(type);
    if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = (implicitKey && defaultKeyType) || defaultStringType;
        res = _stringify(t);
        if (res === null)
            throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
}

exports.stringifyString = stringifyString;


/***/ }),

/***/ 9065:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var Node = __nccwpck_require__(1399);

const BREAK = Symbol('break visit');
const SKIP = Symbol('skip children');
const REMOVE = Symbol('remove node');
/**
 * Apply a visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
function visit(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (Node.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
            node.contents = null;
    }
    else
        visit_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit.BREAK = BREAK;
/** Do not visit the children of the current node */
visit.SKIP = SKIP;
/** Remove the current node */
visit.REMOVE = REMOVE;
function visit_(key, node, visitor, path) {
    const ctrl = callVisitor(key, node, visitor, path);
    if (Node.isNode(ctrl) || Node.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (Node.isCollection(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = visit_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK)
                    return BREAK;
                else if (ci === REMOVE) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (Node.isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = visit_('key', node.key, visitor, path);
            if (ck === BREAK)
                return BREAK;
            else if (ck === REMOVE)
                node.key = null;
            const cv = visit_('value', node.value, visitor, path);
            if (cv === BREAK)
                return BREAK;
            else if (cv === REMOVE)
                node.value = null;
        }
    }
    return ctrl;
}
/**
 * Apply an async visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `Promise`: Must resolve to one of the following values
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
async function visitAsync(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (Node.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
            node.contents = null;
    }
    else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visitAsync.BREAK = BREAK;
/** Do not visit the children of the current node */
visitAsync.SKIP = SKIP;
/** Remove the current node */
visitAsync.REMOVE = REMOVE;
async function visitAsync_(key, node, visitor, path) {
    const ctrl = await callVisitor(key, node, visitor, path);
    if (Node.isNode(ctrl) || Node.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (Node.isCollection(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = await visitAsync_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK)
                    return BREAK;
                else if (ci === REMOVE) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (Node.isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = await visitAsync_('key', node.key, visitor, path);
            if (ck === BREAK)
                return BREAK;
            else if (ck === REMOVE)
                node.key = null;
            const cv = await visitAsync_('value', node.value, visitor, path);
            if (cv === BREAK)
                return BREAK;
            else if (cv === REMOVE)
                node.value = null;
        }
    }
    return ctrl;
}
function initVisitor(visitor) {
    if (typeof visitor === 'object' &&
        (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
            Alias: visitor.Node,
            Map: visitor.Node,
            Scalar: visitor.Node,
            Seq: visitor.Node
        }, visitor.Value && {
            Map: visitor.Value,
            Scalar: visitor.Value,
            Seq: visitor.Value
        }, visitor.Collection && {
            Map: visitor.Collection,
            Seq: visitor.Collection
        }, visitor);
    }
    return visitor;
}
function callVisitor(key, node, visitor, path) {
    if (typeof visitor === 'function')
        return visitor(key, node, path);
    if (Node.isMap(node))
        return visitor.Map?.(key, node, path);
    if (Node.isSeq(node))
        return visitor.Seq?.(key, node, path);
    if (Node.isPair(node))
        return visitor.Pair?.(key, node, path);
    if (Node.isScalar(node))
        return visitor.Scalar?.(key, node, path);
    if (Node.isAlias(node))
        return visitor.Alias?.(key, node, path);
    return undefined;
}
function replaceNode(key, path, node) {
    const parent = path[path.length - 1];
    if (Node.isCollection(parent)) {
        parent.items[key] = node;
    }
    else if (Node.isPair(parent)) {
        if (key === 'key')
            parent.key = node;
        else
            parent.value = node;
    }
    else if (Node.isDocument(parent)) {
        parent.contents = node;
    }
    else {
        const pt = Node.isAlias(parent) ? 'alias' : 'scalar';
        throw new Error(`Cannot replace node with ${pt} parent`);
    }
}

exports.visit = visit;
exports.visitAsync = visitAsync;


/***/ }),

/***/ 6658:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {
  applyExtends,
  cjsPlatformShim,
  Parser,
  processArgv,
} = __nccwpck_require__(9562);

module.exports = {
  applyExtends: (config, cwd, mergeExtends) => {
    return applyExtends(config, cwd, mergeExtends, cjsPlatformShim);
  },
  hideBin: processArgv.hideBin,
  Parser,
};


/***/ }),

/***/ 7059:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const align = {
    right: alignRight,
    center: alignCenter
};
const top = 0;
const right = 1;
const bottom = 2;
const left = 3;
class UI {
    constructor(opts) {
        var _a;
        this.width = opts.width;
        this.wrap = (_a = opts.wrap) !== null && _a !== void 0 ? _a : true;
        this.rows = [];
    }
    span(...args) {
        const cols = this.div(...args);
        cols.span = true;
    }
    resetOutput() {
        this.rows = [];
    }
    div(...args) {
        if (args.length === 0) {
            this.div('');
        }
        if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === 'string') {
            return this.applyLayoutDSL(args[0]);
        }
        const cols = args.map(arg => {
            if (typeof arg === 'string') {
                return this.colFromString(arg);
            }
            return arg;
        });
        this.rows.push(cols);
        return cols;
    }
    shouldApplyLayoutDSL(...args) {
        return args.length === 1 && typeof args[0] === 'string' &&
            /[\t\n]/.test(args[0]);
    }
    applyLayoutDSL(str) {
        const rows = str.split('\n').map(row => row.split('\t'));
        let leftColumnWidth = 0;
        // simple heuristic for layout, make sure the
        // second column lines up along the left-hand.
        // don't allow the first column to take up more
        // than 50% of the screen.
        rows.forEach(columns => {
            if (columns.length > 1 && mixin.stringWidth(columns[0]) > leftColumnWidth) {
                leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin.stringWidth(columns[0]));
            }
        });
        // generate a table:
        //  replacing ' ' with padding calculations.
        //  using the algorithmically generated width.
        rows.forEach(columns => {
            this.div(...columns.map((r, i) => {
                return {
                    text: r.trim(),
                    padding: this.measurePadding(r),
                    width: (i === 0 && columns.length > 1) ? leftColumnWidth : undefined
                };
            }));
        });
        return this.rows[this.rows.length - 1];
    }
    colFromString(text) {
        return {
            text,
            padding: this.measurePadding(text)
        };
    }
    measurePadding(str) {
        // measure padding without ansi escape codes
        const noAnsi = mixin.stripAnsi(str);
        return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
    }
    toString() {
        const lines = [];
        this.rows.forEach(row => {
            this.rowToString(row, lines);
        });
        // don't display any lines with the
        // hidden flag set.
        return lines
            .filter(line => !line.hidden)
            .map(line => line.text)
            .join('\n');
    }
    rowToString(row, lines) {
        this.rasterize(row).forEach((rrow, r) => {
            let str = '';
            rrow.forEach((col, c) => {
                const { width } = row[c]; // the width with padding.
                const wrapWidth = this.negatePadding(row[c]); // the width without padding.
                let ts = col; // temporary string used during alignment/padding.
                if (wrapWidth > mixin.stringWidth(col)) {
                    ts += ' '.repeat(wrapWidth - mixin.stringWidth(col));
                }
                // align the string within its column.
                if (row[c].align && row[c].align !== 'left' && this.wrap) {
                    const fn = align[row[c].align];
                    ts = fn(ts, wrapWidth);
                    if (mixin.stringWidth(ts) < wrapWidth) {
                        ts += ' '.repeat((width || 0) - mixin.stringWidth(ts) - 1);
                    }
                }
                // apply border and padding to string.
                const padding = row[c].padding || [0, 0, 0, 0];
                if (padding[left]) {
                    str += ' '.repeat(padding[left]);
                }
                str += addBorder(row[c], ts, '| ');
                str += ts;
                str += addBorder(row[c], ts, ' |');
                if (padding[right]) {
                    str += ' '.repeat(padding[right]);
                }
                // if prior row is span, try to render the
                // current row on the prior line.
                if (r === 0 && lines.length > 0) {
                    str = this.renderInline(str, lines[lines.length - 1]);
                }
            });
            // remove trailing whitespace.
            lines.push({
                text: str.replace(/ +$/, ''),
                span: row.span
            });
        });
        return lines;
    }
    // if the full 'source' can render in
    // the target line, do so.
    renderInline(source, previousLine) {
        const match = source.match(/^ */);
        const leadingWhitespace = match ? match[0].length : 0;
        const target = previousLine.text;
        const targetTextWidth = mixin.stringWidth(target.trimRight());
        if (!previousLine.span) {
            return source;
        }
        // if we're not applying wrapping logic,
        // just always append to the span.
        if (!this.wrap) {
            previousLine.hidden = true;
            return target + source;
        }
        if (leadingWhitespace < targetTextWidth) {
            return source;
        }
        previousLine.hidden = true;
        return target.trimRight() + ' '.repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
    }
    rasterize(row) {
        const rrows = [];
        const widths = this.columnWidths(row);
        let wrapped;
        // word wrap all columns, and create
        // a data-structure that is easy to rasterize.
        row.forEach((col, c) => {
            // leave room for left and right padding.
            col.width = widths[c];
            if (this.wrap) {
                wrapped = mixin.wrap(col.text, this.negatePadding(col), { hard: true }).split('\n');
            }
            else {
                wrapped = col.text.split('\n');
            }
            if (col.border) {
                wrapped.unshift('.' + '-'.repeat(this.negatePadding(col) + 2) + '.');
                wrapped.push("'" + '-'.repeat(this.negatePadding(col) + 2) + "'");
            }
            // add top and bottom padding.
            if (col.padding) {
                wrapped.unshift(...new Array(col.padding[top] || 0).fill(''));
                wrapped.push(...new Array(col.padding[bottom] || 0).fill(''));
            }
            wrapped.forEach((str, r) => {
                if (!rrows[r]) {
                    rrows.push([]);
                }
                const rrow = rrows[r];
                for (let i = 0; i < c; i++) {
                    if (rrow[i] === undefined) {
                        rrow.push('');
                    }
                }
                rrow.push(str);
            });
        });
        return rrows;
    }
    negatePadding(col) {
        let wrapWidth = col.width || 0;
        if (col.padding) {
            wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
        }
        if (col.border) {
            wrapWidth -= 4;
        }
        return wrapWidth;
    }
    columnWidths(row) {
        if (!this.wrap) {
            return row.map(col => {
                return col.width || mixin.stringWidth(col.text);
            });
        }
        let unset = row.length;
        let remainingWidth = this.width;
        // column widths can be set in config.
        const widths = row.map(col => {
            if (col.width) {
                unset--;
                remainingWidth -= col.width;
                return col.width;
            }
            return undefined;
        });
        // any unset widths should be calculated.
        const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
        return widths.map((w, i) => {
            if (w === undefined) {
                return Math.max(unsetWidth, _minWidth(row[i]));
            }
            return w;
        });
    }
}
function addBorder(col, ts, style) {
    if (col.border) {
        if (/[.']-+[.']/.test(ts)) {
            return '';
        }
        if (ts.trim().length !== 0) {
            return style;
        }
        return '  ';
    }
    return '';
}
// calculates the minimum width of
// a column, based on padding preferences.
function _minWidth(col) {
    const padding = col.padding || [];
    const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
    if (col.border) {
        return minWidth + 4;
    }
    return minWidth;
}
function getWindowWidth() {
    /* istanbul ignore next: depends on terminal */
    if (typeof process === 'object' && process.stdout && process.stdout.columns) {
        return process.stdout.columns;
    }
    return 80;
}
function alignRight(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    if (strWidth < width) {
        return ' '.repeat(width - strWidth) + str;
    }
    return str;
}
function alignCenter(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    /* istanbul ignore next */
    if (strWidth >= width) {
        return str;
    }
    return ' '.repeat((width - strWidth) >> 1) + str;
}
let mixin;
function cliui(opts, _mixin) {
    mixin = _mixin;
    return new UI({
        width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
        wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
    });
}

// Bootstrap cliui with CommonJS dependencies:
const stringWidth = __nccwpck_require__(2577);
const stripAnsi = __nccwpck_require__(5591);
const wrap = __nccwpck_require__(9824);
function ui(opts) {
    return cliui(opts, {
        stringWidth,
        stripAnsi,
        wrap
    });
}

module.exports = ui;


/***/ }),

/***/ 452:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var fs = __nccwpck_require__(7147);
var util = __nccwpck_require__(3837);
var path = __nccwpck_require__(1017);

let shim;
class Y18N {
    constructor(opts) {
        // configurable options.
        opts = opts || {};
        this.directory = opts.directory || './locales';
        this.updateFiles = typeof opts.updateFiles === 'boolean' ? opts.updateFiles : true;
        this.locale = opts.locale || 'en';
        this.fallbackToLanguage = typeof opts.fallbackToLanguage === 'boolean' ? opts.fallbackToLanguage : true;
        // internal stuff.
        this.cache = Object.create(null);
        this.writeQueue = [];
    }
    __(...args) {
        if (typeof arguments[0] !== 'string') {
            return this._taggedLiteral(arguments[0], ...arguments);
        }
        const str = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        cb = cb || function () { }; // noop.
        if (!this.cache[this.locale])
            this._readLocaleFile();
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][str] && this.updateFiles) {
            this.cache[this.locale][str] = str;
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        return shim.format.apply(shim.format, [this.cache[this.locale][str] || str].concat(args));
    }
    __n() {
        const args = Array.prototype.slice.call(arguments);
        const singular = args.shift();
        const plural = args.shift();
        const quantity = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        if (!this.cache[this.locale])
            this._readLocaleFile();
        let str = quantity === 1 ? singular : plural;
        if (this.cache[this.locale][singular]) {
            const entry = this.cache[this.locale][singular];
            str = entry[quantity === 1 ? 'one' : 'other'];
        }
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][singular] && this.updateFiles) {
            this.cache[this.locale][singular] = {
                one: singular,
                other: plural
            };
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        // if a %d placeholder is provided, add quantity
        // to the arguments expanded by util.format.
        const values = [str];
        if (~str.indexOf('%d'))
            values.push(quantity);
        return shim.format.apply(shim.format, values.concat(args));
    }
    setLocale(locale) {
        this.locale = locale;
    }
    getLocale() {
        return this.locale;
    }
    updateLocale(obj) {
        if (!this.cache[this.locale])
            this._readLocaleFile();
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                this.cache[this.locale][key] = obj[key];
            }
        }
    }
    _taggedLiteral(parts, ...args) {
        let str = '';
        parts.forEach(function (part, i) {
            const arg = args[i + 1];
            str += part;
            if (typeof arg !== 'undefined') {
                str += '%s';
            }
        });
        return this.__.apply(this, [str].concat([].slice.call(args, 1)));
    }
    _enqueueWrite(work) {
        this.writeQueue.push(work);
        if (this.writeQueue.length === 1)
            this._processWriteQueue();
    }
    _processWriteQueue() {
        const _this = this;
        const work = this.writeQueue[0];
        // destructure the enqueued work.
        const directory = work.directory;
        const locale = work.locale;
        const cb = work.cb;
        const languageFile = this._resolveLocaleFile(directory, locale);
        const serializedLocale = JSON.stringify(this.cache[locale], null, 2);
        shim.fs.writeFile(languageFile, serializedLocale, 'utf-8', function (err) {
            _this.writeQueue.shift();
            if (_this.writeQueue.length > 0)
                _this._processWriteQueue();
            cb(err);
        });
    }
    _readLocaleFile() {
        let localeLookup = {};
        const languageFile = this._resolveLocaleFile(this.directory, this.locale);
        try {
            // When using a bundler such as webpack, readFileSync may not be defined:
            if (shim.fs.readFileSync) {
                localeLookup = JSON.parse(shim.fs.readFileSync(languageFile, 'utf-8'));
            }
        }
        catch (err) {
            if (err instanceof SyntaxError) {
                err.message = 'syntax error in ' + languageFile;
            }
            if (err.code === 'ENOENT')
                localeLookup = {};
            else
                throw err;
        }
        this.cache[this.locale] = localeLookup;
    }
    _resolveLocaleFile(directory, locale) {
        let file = shim.resolve(directory, './', locale + '.json');
        if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf('_')) {
            // attempt fallback to language only
            const languageFile = shim.resolve(directory, './', locale.split('_')[0] + '.json');
            if (this._fileExistsSync(languageFile))
                file = languageFile;
        }
        return file;
    }
    _fileExistsSync(file) {
        return shim.exists(file);
    }
}
function y18n$1(opts, _shim) {
    shim = _shim;
    const y18n = new Y18N(opts);
    return {
        __: y18n.__.bind(y18n),
        __n: y18n.__n.bind(y18n),
        setLocale: y18n.setLocale.bind(y18n),
        getLocale: y18n.getLocale.bind(y18n),
        updateLocale: y18n.updateLocale.bind(y18n),
        locale: y18n.locale
    };
}

var nodePlatformShim = {
    fs: {
        readFileSync: fs.readFileSync,
        writeFile: fs.writeFile
    },
    format: util.format,
    resolve: path.resolve,
    exists: (file) => {
        try {
            return fs.statSync(file).isFile();
        }
        catch (err) {
            return false;
        }
    }
};

const y18n = (opts) => {
    return y18n$1(opts, nodePlatformShim);
};

module.exports = y18n;


/***/ }),

/***/ 1970:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var util = __nccwpck_require__(3837);
var path = __nccwpck_require__(1017);
var fs = __nccwpck_require__(7147);

function camelCase(str) {
    const isCamelCase = str !== str.toLowerCase() && str !== str.toUpperCase();
    if (!isCamelCase) {
        str = str.toLowerCase();
    }
    if (str.indexOf('-') === -1 && str.indexOf('_') === -1) {
        return str;
    }
    else {
        let camelcase = '';
        let nextChrUpper = false;
        const leadingHyphens = str.match(/^-+/);
        for (let i = leadingHyphens ? leadingHyphens[0].length : 0; i < str.length; i++) {
            let chr = str.charAt(i);
            if (nextChrUpper) {
                nextChrUpper = false;
                chr = chr.toUpperCase();
            }
            if (i !== 0 && (chr === '-' || chr === '_')) {
                nextChrUpper = true;
            }
            else if (chr !== '-' && chr !== '_') {
                camelcase += chr;
            }
        }
        return camelcase;
    }
}
function decamelize(str, joinString) {
    const lowercase = str.toLowerCase();
    joinString = joinString || '-';
    let notCamelcase = '';
    for (let i = 0; i < str.length; i++) {
        const chrLower = lowercase.charAt(i);
        const chrString = str.charAt(i);
        if (chrLower !== chrString && i > 0) {
            notCamelcase += `${joinString}${lowercase.charAt(i)}`;
        }
        else {
            notCamelcase += chrString;
        }
    }
    return notCamelcase;
}
function looksLikeNumber(x) {
    if (x === null || x === undefined)
        return false;
    if (typeof x === 'number')
        return true;
    if (/^0x[0-9a-f]+$/i.test(x))
        return true;
    if (/^0[^.]/.test(x))
        return false;
    return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}

function tokenizeArgString(argString) {
    if (Array.isArray(argString)) {
        return argString.map(e => typeof e !== 'string' ? e + '' : e);
    }
    argString = argString.trim();
    let i = 0;
    let prevC = null;
    let c = null;
    let opening = null;
    const args = [];
    for (let ii = 0; ii < argString.length; ii++) {
        prevC = c;
        c = argString.charAt(ii);
        if (c === ' ' && !opening) {
            if (!(prevC === ' ')) {
                i++;
            }
            continue;
        }
        if (c === opening) {
            opening = null;
        }
        else if ((c === "'" || c === '"') && !opening) {
            opening = c;
        }
        if (!args[i])
            args[i] = '';
        args[i] += c;
    }
    return args;
}

var DefaultValuesForTypeKey;
(function (DefaultValuesForTypeKey) {
    DefaultValuesForTypeKey["BOOLEAN"] = "boolean";
    DefaultValuesForTypeKey["STRING"] = "string";
    DefaultValuesForTypeKey["NUMBER"] = "number";
    DefaultValuesForTypeKey["ARRAY"] = "array";
})(DefaultValuesForTypeKey || (DefaultValuesForTypeKey = {}));

let mixin;
class YargsParser {
    constructor(_mixin) {
        mixin = _mixin;
    }
    parse(argsInput, options) {
        const opts = Object.assign({
            alias: undefined,
            array: undefined,
            boolean: undefined,
            config: undefined,
            configObjects: undefined,
            configuration: undefined,
            coerce: undefined,
            count: undefined,
            default: undefined,
            envPrefix: undefined,
            narg: undefined,
            normalize: undefined,
            string: undefined,
            number: undefined,
            __: undefined,
            key: undefined
        }, options);
        const args = tokenizeArgString(argsInput);
        const inputIsString = typeof argsInput === 'string';
        const aliases = combineAliases(Object.assign(Object.create(null), opts.alias));
        const configuration = Object.assign({
            'boolean-negation': true,
            'camel-case-expansion': true,
            'combine-arrays': false,
            'dot-notation': true,
            'duplicate-arguments-array': true,
            'flatten-duplicate-arrays': true,
            'greedy-arrays': true,
            'halt-at-non-option': false,
            'nargs-eats-options': false,
            'negation-prefix': 'no-',
            'parse-numbers': true,
            'parse-positional-numbers': true,
            'populate--': false,
            'set-placeholder-key': false,
            'short-option-groups': true,
            'strip-aliased': false,
            'strip-dashed': false,
            'unknown-options-as-args': false
        }, opts.configuration);
        const defaults = Object.assign(Object.create(null), opts.default);
        const configObjects = opts.configObjects || [];
        const envPrefix = opts.envPrefix;
        const notFlagsOption = configuration['populate--'];
        const notFlagsArgv = notFlagsOption ? '--' : '_';
        const newAliases = Object.create(null);
        const defaulted = Object.create(null);
        const __ = opts.__ || mixin.format;
        const flags = {
            aliases: Object.create(null),
            arrays: Object.create(null),
            bools: Object.create(null),
            strings: Object.create(null),
            numbers: Object.create(null),
            counts: Object.create(null),
            normalize: Object.create(null),
            configs: Object.create(null),
            nargs: Object.create(null),
            coercions: Object.create(null),
            keys: []
        };
        const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
        const negatedBoolean = new RegExp('^--' + configuration['negation-prefix'] + '(.+)');
        [].concat(opts.array || []).filter(Boolean).forEach(function (opt) {
            const key = typeof opt === 'object' ? opt.key : opt;
            const assignment = Object.keys(opt).map(function (key) {
                const arrayFlagKeys = {
                    boolean: 'bools',
                    string: 'strings',
                    number: 'numbers'
                };
                return arrayFlagKeys[key];
            }).filter(Boolean).pop();
            if (assignment) {
                flags[assignment][key] = true;
            }
            flags.arrays[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.boolean || []).filter(Boolean).forEach(function (key) {
            flags.bools[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.string || []).filter(Boolean).forEach(function (key) {
            flags.strings[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.number || []).filter(Boolean).forEach(function (key) {
            flags.numbers[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.count || []).filter(Boolean).forEach(function (key) {
            flags.counts[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.normalize || []).filter(Boolean).forEach(function (key) {
            flags.normalize[key] = true;
            flags.keys.push(key);
        });
        if (typeof opts.narg === 'object') {
            Object.entries(opts.narg).forEach(([key, value]) => {
                if (typeof value === 'number') {
                    flags.nargs[key] = value;
                    flags.keys.push(key);
                }
            });
        }
        if (typeof opts.coerce === 'object') {
            Object.entries(opts.coerce).forEach(([key, value]) => {
                if (typeof value === 'function') {
                    flags.coercions[key] = value;
                    flags.keys.push(key);
                }
            });
        }
        if (typeof opts.config !== 'undefined') {
            if (Array.isArray(opts.config) || typeof opts.config === 'string') {
                [].concat(opts.config).filter(Boolean).forEach(function (key) {
                    flags.configs[key] = true;
                });
            }
            else if (typeof opts.config === 'object') {
                Object.entries(opts.config).forEach(([key, value]) => {
                    if (typeof value === 'boolean' || typeof value === 'function') {
                        flags.configs[key] = value;
                    }
                });
            }
        }
        extendAliases(opts.key, aliases, opts.default, flags.arrays);
        Object.keys(defaults).forEach(function (key) {
            (flags.aliases[key] || []).forEach(function (alias) {
                defaults[alias] = defaults[key];
            });
        });
        let error = null;
        checkConfiguration();
        let notFlags = [];
        const argv = Object.assign(Object.create(null), { _: [] });
        const argvReturn = {};
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const truncatedArg = arg.replace(/^-{3,}/, '---');
            let broken;
            let key;
            let letters;
            let m;
            let next;
            let value;
            if (arg !== '--' && /^-/.test(arg) && isUnknownOptionAsArg(arg)) {
                pushPositional(arg);
            }
            else if (truncatedArg.match(/^---+(=|$)/)) {
                pushPositional(arg);
                continue;
            }
            else if (arg.match(/^--.+=/) || (!configuration['short-option-groups'] && arg.match(/^-.+=/))) {
                m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
                if (m !== null && Array.isArray(m) && m.length >= 3) {
                    if (checkAllAliases(m[1], flags.arrays)) {
                        i = eatArray(i, m[1], args, m[2]);
                    }
                    else if (checkAllAliases(m[1], flags.nargs) !== false) {
                        i = eatNargs(i, m[1], args, m[2]);
                    }
                    else {
                        setArg(m[1], m[2], true);
                    }
                }
            }
            else if (arg.match(negatedBoolean) && configuration['boolean-negation']) {
                m = arg.match(negatedBoolean);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
                }
            }
            else if (arg.match(/^--.+/) || (!configuration['short-option-groups'] && arg.match(/^-[^-]+/))) {
                m = arg.match(/^--?(.+)/);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    if (checkAllAliases(key, flags.arrays)) {
                        i = eatArray(i, key, args);
                    }
                    else if (checkAllAliases(key, flags.nargs) !== false) {
                        i = eatNargs(i, key, args);
                    }
                    else {
                        next = args[i + 1];
                        if (next !== undefined && (!next.match(/^-/) ||
                            next.match(negative)) &&
                            !checkAllAliases(key, flags.bools) &&
                            !checkAllAliases(key, flags.counts)) {
                            setArg(key, next);
                            i++;
                        }
                        else if (/^(true|false)$/.test(next)) {
                            setArg(key, next);
                            i++;
                        }
                        else {
                            setArg(key, defaultValue(key));
                        }
                    }
                }
            }
            else if (arg.match(/^-.\..+=/)) {
                m = arg.match(/^-([^=]+)=([\s\S]*)$/);
                if (m !== null && Array.isArray(m) && m.length >= 3) {
                    setArg(m[1], m[2]);
                }
            }
            else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
                next = args[i + 1];
                m = arg.match(/^-(.\..+)/);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    if (next !== undefined && !next.match(/^-/) &&
                        !checkAllAliases(key, flags.bools) &&
                        !checkAllAliases(key, flags.counts)) {
                        setArg(key, next);
                        i++;
                    }
                    else {
                        setArg(key, defaultValue(key));
                    }
                }
            }
            else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
                letters = arg.slice(1, -1).split('');
                broken = false;
                for (let j = 0; j < letters.length; j++) {
                    next = arg.slice(j + 2);
                    if (letters[j + 1] && letters[j + 1] === '=') {
                        value = arg.slice(j + 3);
                        key = letters[j];
                        if (checkAllAliases(key, flags.arrays)) {
                            i = eatArray(i, key, args, value);
                        }
                        else if (checkAllAliases(key, flags.nargs) !== false) {
                            i = eatNargs(i, key, args, value);
                        }
                        else {
                            setArg(key, value);
                        }
                        broken = true;
                        break;
                    }
                    if (next === '-') {
                        setArg(letters[j], next);
                        continue;
                    }
                    if (/[A-Za-z]/.test(letters[j]) &&
                        /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) &&
                        checkAllAliases(next, flags.bools) === false) {
                        setArg(letters[j], next);
                        broken = true;
                        break;
                    }
                    if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                        setArg(letters[j], next);
                        broken = true;
                        break;
                    }
                    else {
                        setArg(letters[j], defaultValue(letters[j]));
                    }
                }
                key = arg.slice(-1)[0];
                if (!broken && key !== '-') {
                    if (checkAllAliases(key, flags.arrays)) {
                        i = eatArray(i, key, args);
                    }
                    else if (checkAllAliases(key, flags.nargs) !== false) {
                        i = eatNargs(i, key, args);
                    }
                    else {
                        next = args[i + 1];
                        if (next !== undefined && (!/^(-|--)[^-]/.test(next) ||
                            next.match(negative)) &&
                            !checkAllAliases(key, flags.bools) &&
                            !checkAllAliases(key, flags.counts)) {
                            setArg(key, next);
                            i++;
                        }
                        else if (/^(true|false)$/.test(next)) {
                            setArg(key, next);
                            i++;
                        }
                        else {
                            setArg(key, defaultValue(key));
                        }
                    }
                }
            }
            else if (arg.match(/^-[0-9]$/) &&
                arg.match(negative) &&
                checkAllAliases(arg.slice(1), flags.bools)) {
                key = arg.slice(1);
                setArg(key, defaultValue(key));
            }
            else if (arg === '--') {
                notFlags = args.slice(i + 1);
                break;
            }
            else if (configuration['halt-at-non-option']) {
                notFlags = args.slice(i);
                break;
            }
            else {
                pushPositional(arg);
            }
        }
        applyEnvVars(argv, true);
        applyEnvVars(argv, false);
        setConfig(argv);
        setConfigObjects();
        applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
        applyCoercions(argv);
        if (configuration['set-placeholder-key'])
            setPlaceholderKeys(argv);
        Object.keys(flags.counts).forEach(function (key) {
            if (!hasKey(argv, key.split('.')))
                setArg(key, 0);
        });
        if (notFlagsOption && notFlags.length)
            argv[notFlagsArgv] = [];
        notFlags.forEach(function (key) {
            argv[notFlagsArgv].push(key);
        });
        if (configuration['camel-case-expansion'] && configuration['strip-dashed']) {
            Object.keys(argv).filter(key => key !== '--' && key.includes('-')).forEach(key => {
                delete argv[key];
            });
        }
        if (configuration['strip-aliased']) {
            [].concat(...Object.keys(aliases).map(k => aliases[k])).forEach(alias => {
                if (configuration['camel-case-expansion'] && alias.includes('-')) {
                    delete argv[alias.split('.').map(prop => camelCase(prop)).join('.')];
                }
                delete argv[alias];
            });
        }
        function pushPositional(arg) {
            const maybeCoercedNumber = maybeCoerceNumber('_', arg);
            if (typeof maybeCoercedNumber === 'string' || typeof maybeCoercedNumber === 'number') {
                argv._.push(maybeCoercedNumber);
            }
        }
        function eatNargs(i, key, args, argAfterEqualSign) {
            let ii;
            let toEat = checkAllAliases(key, flags.nargs);
            toEat = typeof toEat !== 'number' || isNaN(toEat) ? 1 : toEat;
            if (toEat === 0) {
                if (!isUndefined(argAfterEqualSign)) {
                    error = Error(__('Argument unexpected for: %s', key));
                }
                setArg(key, defaultValue(key));
                return i;
            }
            let available = isUndefined(argAfterEqualSign) ? 0 : 1;
            if (configuration['nargs-eats-options']) {
                if (args.length - (i + 1) + available < toEat) {
                    error = Error(__('Not enough arguments following: %s', key));
                }
                available = toEat;
            }
            else {
                for (ii = i + 1; ii < args.length; ii++) {
                    if (!args[ii].match(/^-[^0-9]/) || args[ii].match(negative) || isUnknownOptionAsArg(args[ii]))
                        available++;
                    else
                        break;
                }
                if (available < toEat)
                    error = Error(__('Not enough arguments following: %s', key));
            }
            let consumed = Math.min(available, toEat);
            if (!isUndefined(argAfterEqualSign) && consumed > 0) {
                setArg(key, argAfterEqualSign);
                consumed--;
            }
            for (ii = i + 1; ii < (consumed + i + 1); ii++) {
                setArg(key, args[ii]);
            }
            return (i + consumed);
        }
        function eatArray(i, key, args, argAfterEqualSign) {
            let argsToSet = [];
            let next = argAfterEqualSign || args[i + 1];
            const nargsCount = checkAllAliases(key, flags.nargs);
            if (checkAllAliases(key, flags.bools) && !(/^(true|false)$/.test(next))) {
                argsToSet.push(true);
            }
            else if (isUndefined(next) ||
                (isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))) {
                if (defaults[key] !== undefined) {
                    const defVal = defaults[key];
                    argsToSet = Array.isArray(defVal) ? defVal : [defVal];
                }
            }
            else {
                if (!isUndefined(argAfterEqualSign)) {
                    argsToSet.push(processValue(key, argAfterEqualSign, true));
                }
                for (let ii = i + 1; ii < args.length; ii++) {
                    if ((!configuration['greedy-arrays'] && argsToSet.length > 0) ||
                        (nargsCount && typeof nargsCount === 'number' && argsToSet.length >= nargsCount))
                        break;
                    next = args[ii];
                    if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
                        break;
                    i = ii;
                    argsToSet.push(processValue(key, next, inputIsString));
                }
            }
            if (typeof nargsCount === 'number' && ((nargsCount && argsToSet.length < nargsCount) ||
                (isNaN(nargsCount) && argsToSet.length === 0))) {
                error = Error(__('Not enough arguments following: %s', key));
            }
            setArg(key, argsToSet);
            return i;
        }
        function setArg(key, val, shouldStripQuotes = inputIsString) {
            if (/-/.test(key) && configuration['camel-case-expansion']) {
                const alias = key.split('.').map(function (prop) {
                    return camelCase(prop);
                }).join('.');
                addNewAlias(key, alias);
            }
            const value = processValue(key, val, shouldStripQuotes);
            const splitKey = key.split('.');
            setKey(argv, splitKey, value);
            if (flags.aliases[key]) {
                flags.aliases[key].forEach(function (x) {
                    const keyProperties = x.split('.');
                    setKey(argv, keyProperties, value);
                });
            }
            if (splitKey.length > 1 && configuration['dot-notation']) {
                (flags.aliases[splitKey[0]] || []).forEach(function (x) {
                    let keyProperties = x.split('.');
                    const a = [].concat(splitKey);
                    a.shift();
                    keyProperties = keyProperties.concat(a);
                    if (!(flags.aliases[key] || []).includes(keyProperties.join('.'))) {
                        setKey(argv, keyProperties, value);
                    }
                });
            }
            if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
                const keys = [key].concat(flags.aliases[key] || []);
                keys.forEach(function (key) {
                    Object.defineProperty(argvReturn, key, {
                        enumerable: true,
                        get() {
                            return val;
                        },
                        set(value) {
                            val = typeof value === 'string' ? mixin.normalize(value) : value;
                        }
                    });
                });
            }
        }
        function addNewAlias(key, alias) {
            if (!(flags.aliases[key] && flags.aliases[key].length)) {
                flags.aliases[key] = [alias];
                newAliases[alias] = true;
            }
            if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
                addNewAlias(alias, key);
            }
        }
        function processValue(key, val, shouldStripQuotes) {
            if (shouldStripQuotes) {
                val = stripQuotes(val);
            }
            if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
                if (typeof val === 'string')
                    val = val === 'true';
            }
            let value = Array.isArray(val)
                ? val.map(function (v) { return maybeCoerceNumber(key, v); })
                : maybeCoerceNumber(key, val);
            if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === 'boolean')) {
                value = increment();
            }
            if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
                if (Array.isArray(val))
                    value = val.map((val) => { return mixin.normalize(val); });
                else
                    value = mixin.normalize(val);
            }
            return value;
        }
        function maybeCoerceNumber(key, value) {
            if (!configuration['parse-positional-numbers'] && key === '_')
                return value;
            if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
                const shouldCoerceNumber = looksLikeNumber(value) && configuration['parse-numbers'] && (Number.isSafeInteger(Math.floor(parseFloat(`${value}`))));
                if (shouldCoerceNumber || (!isUndefined(value) && checkAllAliases(key, flags.numbers))) {
                    value = Number(value);
                }
            }
            return value;
        }
        function setConfig(argv) {
            const configLookup = Object.create(null);
            applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
            Object.keys(flags.configs).forEach(function (configKey) {
                const configPath = argv[configKey] || configLookup[configKey];
                if (configPath) {
                    try {
                        let config = null;
                        const resolvedConfigPath = mixin.resolve(mixin.cwd(), configPath);
                        const resolveConfig = flags.configs[configKey];
                        if (typeof resolveConfig === 'function') {
                            try {
                                config = resolveConfig(resolvedConfigPath);
                            }
                            catch (e) {
                                config = e;
                            }
                            if (config instanceof Error) {
                                error = config;
                                return;
                            }
                        }
                        else {
                            config = mixin.require(resolvedConfigPath);
                        }
                        setConfigObject(config);
                    }
                    catch (ex) {
                        if (ex.name === 'PermissionDenied')
                            error = ex;
                        else if (argv[configKey])
                            error = Error(__('Invalid JSON config file: %s', configPath));
                    }
                }
            });
        }
        function setConfigObject(config, prev) {
            Object.keys(config).forEach(function (key) {
                const value = config[key];
                const fullKey = prev ? prev + '.' + key : key;
                if (typeof value === 'object' && value !== null && !Array.isArray(value) && configuration['dot-notation']) {
                    setConfigObject(value, fullKey);
                }
                else {
                    if (!hasKey(argv, fullKey.split('.')) || (checkAllAliases(fullKey, flags.arrays) && configuration['combine-arrays'])) {
                        setArg(fullKey, value);
                    }
                }
            });
        }
        function setConfigObjects() {
            if (typeof configObjects !== 'undefined') {
                configObjects.forEach(function (configObject) {
                    setConfigObject(configObject);
                });
            }
        }
        function applyEnvVars(argv, configOnly) {
            if (typeof envPrefix === 'undefined')
                return;
            const prefix = typeof envPrefix === 'string' ? envPrefix : '';
            const env = mixin.env();
            Object.keys(env).forEach(function (envVar) {
                if (prefix === '' || envVar.lastIndexOf(prefix, 0) === 0) {
                    const keys = envVar.split('__').map(function (key, i) {
                        if (i === 0) {
                            key = key.substring(prefix.length);
                        }
                        return camelCase(key);
                    });
                    if (((configOnly && flags.configs[keys.join('.')]) || !configOnly) && !hasKey(argv, keys)) {
                        setArg(keys.join('.'), env[envVar]);
                    }
                }
            });
        }
        function applyCoercions(argv) {
            let coerce;
            const applied = new Set();
            Object.keys(argv).forEach(function (key) {
                if (!applied.has(key)) {
                    coerce = checkAllAliases(key, flags.coercions);
                    if (typeof coerce === 'function') {
                        try {
                            const value = maybeCoerceNumber(key, coerce(argv[key]));
                            ([].concat(flags.aliases[key] || [], key)).forEach(ali => {
                                applied.add(ali);
                                argv[ali] = value;
                            });
                        }
                        catch (err) {
                            error = err;
                        }
                    }
                }
            });
        }
        function setPlaceholderKeys(argv) {
            flags.keys.forEach((key) => {
                if (~key.indexOf('.'))
                    return;
                if (typeof argv[key] === 'undefined')
                    argv[key] = undefined;
            });
            return argv;
        }
        function applyDefaultsAndAliases(obj, aliases, defaults, canLog = false) {
            Object.keys(defaults).forEach(function (key) {
                if (!hasKey(obj, key.split('.'))) {
                    setKey(obj, key.split('.'), defaults[key]);
                    if (canLog)
                        defaulted[key] = true;
                    (aliases[key] || []).forEach(function (x) {
                        if (hasKey(obj, x.split('.')))
                            return;
                        setKey(obj, x.split('.'), defaults[key]);
                    });
                }
            });
        }
        function hasKey(obj, keys) {
            let o = obj;
            if (!configuration['dot-notation'])
                keys = [keys.join('.')];
            keys.slice(0, -1).forEach(function (key) {
                o = (o[key] || {});
            });
            const key = keys[keys.length - 1];
            if (typeof o !== 'object')
                return false;
            else
                return key in o;
        }
        function setKey(obj, keys, value) {
            let o = obj;
            if (!configuration['dot-notation'])
                keys = [keys.join('.')];
            keys.slice(0, -1).forEach(function (key) {
                key = sanitizeKey(key);
                if (typeof o === 'object' && o[key] === undefined) {
                    o[key] = {};
                }
                if (typeof o[key] !== 'object' || Array.isArray(o[key])) {
                    if (Array.isArray(o[key])) {
                        o[key].push({});
                    }
                    else {
                        o[key] = [o[key], {}];
                    }
                    o = o[key][o[key].length - 1];
                }
                else {
                    o = o[key];
                }
            });
            const key = sanitizeKey(keys[keys.length - 1]);
            const isTypeArray = checkAllAliases(keys.join('.'), flags.arrays);
            const isValueArray = Array.isArray(value);
            let duplicate = configuration['duplicate-arguments-array'];
            if (!duplicate && checkAllAliases(key, flags.nargs)) {
                duplicate = true;
                if ((!isUndefined(o[key]) && flags.nargs[key] === 1) || (Array.isArray(o[key]) && o[key].length === flags.nargs[key])) {
                    o[key] = undefined;
                }
            }
            if (value === increment()) {
                o[key] = increment(o[key]);
            }
            else if (Array.isArray(o[key])) {
                if (duplicate && isTypeArray && isValueArray) {
                    o[key] = configuration['flatten-duplicate-arrays'] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
                }
                else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
                    o[key] = value;
                }
                else {
                    o[key] = o[key].concat([value]);
                }
            }
            else if (o[key] === undefined && isTypeArray) {
                o[key] = isValueArray ? value : [value];
            }
            else if (duplicate && !(o[key] === undefined ||
                checkAllAliases(key, flags.counts) ||
                checkAllAliases(key, flags.bools))) {
                o[key] = [o[key], value];
            }
            else {
                o[key] = value;
            }
        }
        function extendAliases(...args) {
            args.forEach(function (obj) {
                Object.keys(obj || {}).forEach(function (key) {
                    if (flags.aliases[key])
                        return;
                    flags.aliases[key] = [].concat(aliases[key] || []);
                    flags.aliases[key].concat(key).forEach(function (x) {
                        if (/-/.test(x) && configuration['camel-case-expansion']) {
                            const c = camelCase(x);
                            if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                flags.aliases[key].push(c);
                                newAliases[c] = true;
                            }
                        }
                    });
                    flags.aliases[key].concat(key).forEach(function (x) {
                        if (x.length > 1 && /[A-Z]/.test(x) && configuration['camel-case-expansion']) {
                            const c = decamelize(x, '-');
                            if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                flags.aliases[key].push(c);
                                newAliases[c] = true;
                            }
                        }
                    });
                    flags.aliases[key].forEach(function (x) {
                        flags.aliases[x] = [key].concat(flags.aliases[key].filter(function (y) {
                            return x !== y;
                        }));
                    });
                });
            });
        }
        function checkAllAliases(key, flag) {
            const toCheck = [].concat(flags.aliases[key] || [], key);
            const keys = Object.keys(flag);
            const setAlias = toCheck.find(key => keys.includes(key));
            return setAlias ? flag[setAlias] : false;
        }
        function hasAnyFlag(key) {
            const flagsKeys = Object.keys(flags);
            const toCheck = [].concat(flagsKeys.map(k => flags[k]));
            return toCheck.some(function (flag) {
                return Array.isArray(flag) ? flag.includes(key) : flag[key];
            });
        }
        function hasFlagsMatching(arg, ...patterns) {
            const toCheck = [].concat(...patterns);
            return toCheck.some(function (pattern) {
                const match = arg.match(pattern);
                return match && hasAnyFlag(match[1]);
            });
        }
        function hasAllShortFlags(arg) {
            if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
                return false;
            }
            let hasAllFlags = true;
            let next;
            const letters = arg.slice(1).split('');
            for (let j = 0; j < letters.length; j++) {
                next = arg.slice(j + 2);
                if (!hasAnyFlag(letters[j])) {
                    hasAllFlags = false;
                    break;
                }
                if ((letters[j + 1] && letters[j + 1] === '=') ||
                    next === '-' ||
                    (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) ||
                    (letters[j + 1] && letters[j + 1].match(/\W/))) {
                    break;
                }
            }
            return hasAllFlags;
        }
        function isUnknownOptionAsArg(arg) {
            return configuration['unknown-options-as-args'] && isUnknownOption(arg);
        }
        function isUnknownOption(arg) {
            arg = arg.replace(/^-{3,}/, '--');
            if (arg.match(negative)) {
                return false;
            }
            if (hasAllShortFlags(arg)) {
                return false;
            }
            const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
            const normalFlag = /^-+([^=]+?)$/;
            const flagEndingInHyphen = /^-+([^=]+?)-$/;
            const flagEndingInDigits = /^-+([^=]+?\d+)$/;
            const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
            return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
        }
        function defaultValue(key) {
            if (!checkAllAliases(key, flags.bools) &&
                !checkAllAliases(key, flags.counts) &&
                `${key}` in defaults) {
                return defaults[key];
            }
            else {
                return defaultForType(guessType(key));
            }
        }
        function defaultForType(type) {
            const def = {
                [DefaultValuesForTypeKey.BOOLEAN]: true,
                [DefaultValuesForTypeKey.STRING]: '',
                [DefaultValuesForTypeKey.NUMBER]: undefined,
                [DefaultValuesForTypeKey.ARRAY]: []
            };
            return def[type];
        }
        function guessType(key) {
            let type = DefaultValuesForTypeKey.BOOLEAN;
            if (checkAllAliases(key, flags.strings))
                type = DefaultValuesForTypeKey.STRING;
            else if (checkAllAliases(key, flags.numbers))
                type = DefaultValuesForTypeKey.NUMBER;
            else if (checkAllAliases(key, flags.bools))
                type = DefaultValuesForTypeKey.BOOLEAN;
            else if (checkAllAliases(key, flags.arrays))
                type = DefaultValuesForTypeKey.ARRAY;
            return type;
        }
        function isUndefined(num) {
            return num === undefined;
        }
        function checkConfiguration() {
            Object.keys(flags.counts).find(key => {
                if (checkAllAliases(key, flags.arrays)) {
                    error = Error(__('Invalid configuration: %s, opts.count excludes opts.array.', key));
                    return true;
                }
                else if (checkAllAliases(key, flags.nargs)) {
                    error = Error(__('Invalid configuration: %s, opts.count excludes opts.narg.', key));
                    return true;
                }
                return false;
            });
        }
        return {
            aliases: Object.assign({}, flags.aliases),
            argv: Object.assign(argvReturn, argv),
            configuration: configuration,
            defaulted: Object.assign({}, defaulted),
            error: error,
            newAliases: Object.assign({}, newAliases)
        };
    }
}
function combineAliases(aliases) {
    const aliasArrays = [];
    const combined = Object.create(null);
    let change = true;
    Object.keys(aliases).forEach(function (key) {
        aliasArrays.push([].concat(aliases[key], key));
    });
    while (change) {
        change = false;
        for (let i = 0; i < aliasArrays.length; i++) {
            for (let ii = i + 1; ii < aliasArrays.length; ii++) {
                const intersect = aliasArrays[i].filter(function (v) {
                    return aliasArrays[ii].indexOf(v) !== -1;
                });
                if (intersect.length) {
                    aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
                    aliasArrays.splice(ii, 1);
                    change = true;
                    break;
                }
            }
        }
    }
    aliasArrays.forEach(function (aliasArray) {
        aliasArray = aliasArray.filter(function (v, i, self) {
            return self.indexOf(v) === i;
        });
        const lastAlias = aliasArray.pop();
        if (lastAlias !== undefined && typeof lastAlias === 'string') {
            combined[lastAlias] = aliasArray;
        }
    });
    return combined;
}
function increment(orig) {
    return orig !== undefined ? orig + 1 : 1;
}
function sanitizeKey(key) {
    if (key === '__proto__')
        return '___proto___';
    return key;
}
function stripQuotes(val) {
    return (typeof val === 'string' &&
        (val[0] === "'" || val[0] === '"') &&
        val[val.length - 1] === val[0])
        ? val.substring(1, val.length - 1)
        : val;
}

var _a, _b, _c;
const minNodeVersion = (process && process.env && process.env.YARGS_MIN_NODE_VERSION)
    ? Number(process.env.YARGS_MIN_NODE_VERSION)
    : 12;
const nodeVersion = (_b = (_a = process === null || process === void 0 ? void 0 : process.versions) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : (_c = process === null || process === void 0 ? void 0 : process.version) === null || _c === void 0 ? void 0 : _c.slice(1);
if (nodeVersion) {
    const major = Number(nodeVersion.match(/^([^.]+)/)[1]);
    if (major < minNodeVersion) {
        throw Error(`yargs parser supports a minimum Node.js version of ${minNodeVersion}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
    }
}
const env = process ? process.env : {};
const parser = new YargsParser({
    cwd: process.cwd,
    env: () => {
        return env;
    },
    format: util.format,
    normalize: path.normalize,
    resolve: path.resolve,
    require: (path) => {
        if (true) {
            return __nccwpck_require__(5670)(path);
        }
        else {}
    }
});
const yargsParser = function Parser(args, opts) {
    const result = parser.parse(args.slice(), opts);
    return result.argv;
};
yargsParser.detailed = function (args, opts) {
    return parser.parse(args.slice(), opts);
};
yargsParser.camelCase = camelCase;
yargsParser.decamelize = decamelize;
yargsParser.looksLikeNumber = looksLikeNumber;

module.exports = yargsParser;


/***/ }),

/***/ 9562:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/***/ }),

/***/ 8822:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

// classic singleton yargs API, to use yargs
// without running as a singleton do:
// require('yargs/yargs')(process.argv.slice(2))
const {Yargs, processArgv} = __nccwpck_require__(9562);

Argv(processArgv.hideBin(process.argv));

module.exports = Argv;

function Argv(processArgs, cwd) {
  const argv = Yargs(processArgs, cwd, __nccwpck_require__(4907));
  singletonify(argv);
  // TODO(bcoe): warn if argv.parse() or argv.argv is used directly.
  return argv;
}

function defineGetter(obj, key, getter) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: getter,
  });
}
function lookupGetter(obj, key) {
  const desc = Object.getOwnPropertyDescriptor(obj, key);
  if (typeof desc !== 'undefined') {
    return desc.get;
  }
}

/*  Hack an instance of Argv with process.argv into Argv
    so people can do
    require('yargs')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
    require('yargs').argv
    to get a parsed version of process.argv.
*/
function singletonify(inst) {
  [
    ...Object.keys(inst),
    ...Object.getOwnPropertyNames(inst.constructor.prototype),
  ].forEach(key => {
    if (key === 'argv') {
      defineGetter(Argv, key, lookupGetter(inst, key));
    } else if (typeof inst[key] === 'function') {
      Argv[key] = inst[key].bind(inst);
    } else {
      defineGetter(Argv, '$0', () => inst.$0);
      defineGetter(Argv, 'parsed', () => inst.parsed);
    }
  });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__nccwpck_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nccwpck_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __nccwpck_require__(__nccwpck_require__.s = 9610);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;