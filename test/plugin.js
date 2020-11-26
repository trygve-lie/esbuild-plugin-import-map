import * as plugin from '../lib/plugin.js';
import esbuild from 'esbuild';
import path from 'path';
import url from 'url';
import tap from 'tap';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const simple = `${__dirname}/../modules/simple/main.js`;
const basic = `${__dirname}/../modules/basic/main.js`;
const file = `${__dirname}/../modules/file/main.js`;

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
    plugin.load({
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'basic example');

    plugin.clear();
    t.end();
});

tap.test('plugin() - simple module - should replace lit-element with CDN URL', async (t) => {
    plugin.load({
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'simple example');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps non bare imports - should replace import statement with CDN URL', async (t) => {
    plugin.load({
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps address to a relative path - should replace import statement with relative path', async (t) => {
    plugin.load({
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import specifier is a interior package path - should replace with CDN URL', async (t) => {
    plugin.load({
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'interior package path');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps address to a bare importer - should throw', async (t) => {
    plugin.load({
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2',
            'lit-html/lit-html': 'https://cdn.eik.dev/lit-html/v2',
            'lit-html': 'https://cdn.eik.dev/lit-html/v1',
        }
    });
    
    t.rejects(esbuild.build({
        entryPoints: [simple],
        bundle: true,
        format: 'esm',
        minify: false,
        sourcemap: false,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    }));

    plugin.clear();
    t.end();
});

tap.test('plugin() - array of import map maps - should replace import statements with CDN URLs', async (t) => {
    plugin.load([{
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        plugins: [plugin.plugin()],
        write: false,
    });

    const code = bufferToString(result.outputFiles);

    t.matchSnapshot(clean(code), 'array of maps');

    plugin.clear();
    t.end();
});
