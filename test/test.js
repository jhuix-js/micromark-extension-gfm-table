import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'
import {gfmTable, gfmTableHtml} from '@jhuix/micromark-extension-gfm-table'

test('micromark-extension-gfm-table', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('micromark-extension-gfm-table')).sort(),
      ['gfmTable', 'gfmTableHtml']
    )
  })
})

test('markdown -> html (micromark)', async function (t) {
  // await t.test(
  //   'should not support a lazy delimiter row (3)',
  //   async function () {
  //     assert.deepEqual(
  //       micromark('| a |\n> | - |', {
  //         extensions: [gfmTable()],
  //         htmlExtensions: [gfmTableHtml()]
  //       }),
  //       '<p>| a |</p>\n<blockquote>\n<table>\n<thead>\n</thead>\n</table>\n</blockquote>'
  //     )
  //   }
  // )

  await t.test('should not support a lazy body row (2)', async function () {
    assert.deepEqual(
      micromark('1||\n:-|-:\na|b', {
        extensions: [gfmTable()],
        htmlExtensions: [gfmTableHtml()]
      }),
      ''
    )
  })

  // await t.test('should not support a lazy body row (2)', async function () {
  //   assert.deepEqual(
  //     micromark('1|2||\n:-|:-|-:\nb|c|d\n\|h||m\n[c]: i|j||', {
  //       extensions: [gfmTable()],
  //       htmlExtensions: [gfmTableHtml()]
  //     }),
  //     ''
  //   )
  // })
})
