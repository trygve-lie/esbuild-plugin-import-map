const isBare = (str) => {
    if (str.startsWith('/') || str.startsWith('./') || str.startsWith('../') || str.substr(0, 7) === 'http://' || str.substr(0, 8) === 'https://') {
        return false;
    }
    return true;
};

const builder = (cache, map) => {
    Object.keys(map.imports).forEach((key) => {
        const value = map.imports[key];
        if (isBare(value)) {
            throw Error(`Import specifier can NOT be mapped to a bare import statement. Import specifier "${key}" is being wrongly mapped to "${value}"`);
        }
        cache.set(key, value);
    });
};


const CACHE = new Map();

export function load(maps = []) {
    if (Array.isArray(maps)) {
        maps.forEach((map) => {
            builder(CACHE, map);
        });
        return;
    }
    builder(CACHE, maps);
}

export function clear() {
    CACHE.clear();
}

export function plugin() {
    return {
        name: 'importMap',
        setup(build) {
            build.onResolve({ filter: /.*?/ }, (args) => {
                if (CACHE.has(args.path)) {
                    return {
                        path: CACHE.get(args.path),
                        namespace: args.path,
                        external: true
                    };
                }
                return {};
            });
        },
    };
}
