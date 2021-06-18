import path from 'path';
import fs from 'fs/promises';

const isExternal = (str) => {
    return str.substr(0, 7) === 'http://' || str.substr(0, 8) === 'https://';
};

const isBare = (str) => {
    if (str.startsWith('/') || str.startsWith('./') || str.startsWith('../') || isExternal(str)) {
        return false;
    }
    return true;
};

const isString = (str) => typeof str === 'string';

const isScopePrefixed = (str) => {
    return str[str.length - 1] === '/';
};

const validate = (map) => Object.keys(map.imports).map((key) => {
    const value = map.imports[key];

    if (isBare(value)) {
        throw Error(`Import specifier can NOT be mapped to a bare import statement. Import specifier "${key}" is being wrongly mapped to "${value}"`);
    }

    return { key, value };
});

const fileReader = (pathname = '') => new Promise((resolve, reject) => {
    const filepath = path.normalize(pathname);
    fs.readFile(filepath).then((file) => {
        try {
            const obj = JSON.parse(file);
            resolve(validate(obj));
        } catch (error) {
            reject(error);
        }
    }).catch(reject);
});

let WORKING_DIRECTORY;
const CACHE = new Map();

export async function load(importMaps = [], workingDirectory) {
    const maps = Array.isArray(importMaps) ? importMaps : [importMaps];

    WORKING_DIRECTORY = workingDirectory || process.cwd();

    const mappings = maps.map((item) => {
        if (isString(item)) {
            return fileReader(item);
        }
        return validate(item);
    });

    await Promise.all(mappings).then((items) => {
        items.forEach((item) => {
            item.forEach((obj) => {
                CACHE.set(obj.key, obj.value);
            });
        });
    });
}

export function clear() {
    CACHE.clear();
}

function resolveEntry(resolveArgs, cachedEntry, suffix = '') {
    if (isExternal(cachedEntry)) {
        const resolvedpath = new URL(suffix, cachedEntry).href;
        return {
            path: resolvedpath,
            namespace: resolveArgs.path,
            external: true,
        };
    }

    const resolvedpath = path.join(WORKING_DIRECTORY, cachedEntry, suffix);
    return {
        path: resolvedpath,
        namespace: resolveArgs.namespace,
        external: false,
    };
}

export function plugin() {
    return {
        name: 'importMap',
        setup(build) {
            build.onResolve({ filter: /.*?/ }, (args) => {
                if (CACHE.has(args.path)) {
                    const cachedPath = CACHE.get(args.path);
                    return resolveEntry(args, cachedPath);
                }

                let prefixMatch;
                CACHE.forEach((target, scope) => {
                    if (prefixMatch) {
                        return;
                    }

                    if (!isScopePrefixed(scope)) {
                        return;
                    }

                    if (!args.path.startsWith(scope)) {
                        return;
                    }

                    const scopeSuffix = args.path.substring(scope.length);
                    prefixMatch = resolveEntry(args, target, scopeSuffix);
                });

                return prefixMatch || {};
            });
        },
    };
}
