import * as plugin from '../lib/plugin.js';
import esbuild from 'esbuild';
import { URL } from 'node:url';
import tap from 'tap';

const simple = new URL('../fixtures/modules/simple/main.js', import.meta.url).pathname;
const basic = new URL('../fixtures/modules/basic/main.js', import.meta.url).pathname;
const map = new URL('../fixtures/simple.map.json', import.meta.url).pathname;
const err = new URL('../fixtures/faulty.map.json', import.meta.url).pathname;

/*
 * When running tests on Windows, the output code get some extra \r on each line.
 * Remove these so snapshots work on all OSes.
 */
const clean = str => str.split('\r').join('');

const bufferToString = (buff) => {
    const str = [];
    for (let out of buff) {
        str.push(new TextDecoder("utf-8").decode(out.contents));
    }
    return str.join('');
}

tap.test('plugin() - basic module - should replace lit-element with CDN URL', async (t) => {
    await plugin.load('http://localhost/', {
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2'
        }
    });

    const result = await esbuild.build({
        entryPoints: [basic],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'basic example');

    plugin.clear();
    t.end();
});

tap.test('plugin() - simple module - should replace lit-element with CDN URL', async (t) => {
    await plugin.load('http://localhost/', {
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2'
        }
    });

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'simple example');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps non bare imports - should replace import statement with CDN URL', async (t) => {
    await plugin.load('http://localhost/', {
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2',
            './utils/dom.js': 'https://cdn.eik.dev/something/v666'
        }
    });

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps address to a relative path - should replace import statement with relative path', async (t) => {
    await plugin.load('http://localhost/', {
        imports: {
            'lit-element': './lit-element/v2',
        }
    });

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import specifier is a interior package path - should replace with CDN URL', async (t) => {
    await plugin.load('http://localhost/', {
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2',
            'lit-html/lit-html': 'https://cdn.eik.dev/lit-html/v2',
            'lit-html': 'https://cdn.eik.dev/lit-html/v1',
        }
    });

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'interior package path');

    plugin.clear();
    t.end();
});

tap.test('plugin() - array of import map maps - should replace import statements with CDN URLs', async (t) => {
    await plugin.load('http://localhost/', [{
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2'
        }
    },
    {
        imports: {
            './utils/dom.js': 'https://cdn.eik.dev/something/v666'
        }
    }]);

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'array of maps');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a map file - should load map and replace import statements with CDN URLs', async (t) => {
   await plugin.load('http://localhost/', map);

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a map file and an inline map - should load map and replace import statements with CDN URLs', async (t) => {
    await plugin.load('http://localhost/', [
        map,
        {
            imports: {
                './utils/dom.js': 'https://cdn.eik.dev/something/v666'
            }
        }
    ]);

    const result = await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a non existing map file - should throw', async (t) => {
    t.rejects(plugin.load('http://localhost/', './foo.map.json'), /ENOENT: no such file or directory, open 'foo.map.json'/);
    t.end();
});

tap.test('plugin() - input is a filepath to a faulty map file - should throw', async (t) => {
    t.rejects(plugin.load('http://localhost/', err), /Unexpected end of JSON input/);
    t.end();
});

tap.test('plugin() - first argument is not a String - should throw', async (t) => {
    t.rejects(plugin.load([], []), /First argument must be a URL string/);
    t.end();
});

tap.test('plugin() - unmappet (unresolved) paths passed to next registered plugin', async (t) => {
    await plugin.load(map);

    let passedToNext = false;
    /**
     * @returns {import('esbuild').Plugin}
     */
    let otherPlugin = () => {
        return {
            name: "other-plugin",
            setup(build) {
                build.onResolve({ filter: /.*?/ }, () => {
                    passedToNext = true;
                    return null;
                });
            },
        };
    };

    await esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['esnext'],
        plugins: [plugin.plugin(), otherPlugin()],
        write: false,
    });

    tap.ok(passedToNext);
});
