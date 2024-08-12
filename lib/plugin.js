import { URL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import { parse, resolve } from '@import-maps/resolve';
import merge from 'deepmerge';

const isNotString = (str) => typeof str !== 'string';
const isString = (str) => typeof str === 'string';

const fileReader = (pathname = '') => new Promise((success, reject) => {
    const filepath = path.normalize(pathname);
    fs.readFile(filepath).then((file) => {
        try {
            const obj = JSON.parse(file);
            success(obj);
        } catch (error) {
            reject(error);
        }
    }).catch(reject);
});

let BASE_URL = {};
let CACHE = {};

export async function load(baseURL, importMaps = []) {
    if (isNotString(baseURL)) {
        throw new TypeError('First argument must be a URL string');
    }

    const maps = Array.isArray(importMaps) ? importMaps : [importMaps];

    const mappings = maps.map((item) => {
        if (isString(item)) {
            return fileReader(item);
        }
        return item;
    });

    const loadedMaps = await Promise.all(mappings);

    const mapObject = merge.all(loadedMaps);

    BASE_URL = new URL(baseURL);
    CACHE = parse(mapObject, BASE_URL);
}

export function clear() {
    BASE_URL = {};
    CACHE = {};
}

export function plugin() {
    return {
        name: 'importMap',
        setup(build) {
            build.onResolve({ filter: /.*?/ }, (args) => {
                const { resolvedImport, matched } = resolve(args.path, CACHE, BASE_URL);
                if (matched) {
                    return {
                        path: resolvedImport.href,
                        namespace: args.path,
                        external: true
                    };
                }
                return null;
            });
        },
    };
}
