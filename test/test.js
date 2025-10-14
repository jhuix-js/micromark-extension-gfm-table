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
  await t.test('should support a table with headless (3)', async function () {
    assert.deepEqual(
      micromark(':- \na', {
        extensions: [gfmTable({tableHeadless: false})],
        htmlExtensions: [gfmTableHtml()]
      }),
      '<p>:-\na</p>'
    )
  })

  // Await t.test(
  //   'should not support a lazy delimiter row (3)',
  //   async function () {
  //     assert.deepEqual(
  //       micromark('| a| b |\n | | - |', {
  //         extensions: [gfmTable()],
  //         htmlExtensions: [gfmTableHtml()]
  //       }),
  //       '<p>| a| b |\n| - | a |</p>'
  //     )
  //   }
  // )

  // await t.test('should support a table with span maker', async function () {
  //   assert.deepEqual(
  //     micromark(
  //       '1|2||\n1||3|\n:-| - | -:\na|b||\n|^|c||\n|^^|d|h|\n|>|e|f|\n|a||f|',
  //       {
  //         extensions: [gfmTable()],
  //         htmlExtensions: [gfmTableHtml()]
  //       }
  //     ),
  //     '<table>\n<thead>\n<tr>\n<th align="left">1</th>\n<th>2</th>\n<th align="right"></th>\n</tr>\n<tr>\n<th align="left">1</th>\n<th></th>\n<th align="right">3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left">a</td>\n<td>b</td>\n<td align="right"></td>\n</tr>\n<tr>\n<td align="left">^</td>\n<td>c</td>\n<td align="right"></td>\n</tr>\n<tr>\n<td align="left">^^</td>\n<td>d</td>\n<td align="right">h</td>\n</tr>\n<tr>\n<td align="left">&gt;</td>\n<td>e</td>\n<td align="right">f</td>\n</tr>\n<tr>\n<td align="left">a</td>\n<td></td>\n<td align="right">f</td>\n</tr>\n</tbody>\n</table>'
  //   )
  // })

  // Await t.test('should not support a lazy body row (2)', async function () {
  //   assert.deepEqual(
  //     micromark('1|2||\n:-|:-|-:\nb|c|d\n\|h||m\n[c]: i|j||', {
  //       extensions: [gfmTable()],
  //       htmlExtensions: [gfmTableHtml()]
  //     }),
  //     ''
  //   )
  // })
})
