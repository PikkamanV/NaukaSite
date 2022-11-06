import path from 'path'

import mikan from 'mikanjs'
import sharp from 'sharp'
import TextToSVG from 'text-to-svg'

const textToSVG = TextToSVG.loadSync(
  path.join(__dirname, '/../static/font/kiloji_b.ttf')
)

const svgOption = {
  x: 0,
  y: 0,
  fontSize: 45,
  anchor: 'top',
  attributes: { fill: '#382724', stroke: '#382724' }
}

module.exports = function () {
  this.nuxt.hook('generate:before', async (_generator) => {
    const { $content } = require('@nuxt/content')
    const posts = await $content('posts')
      .only(['slug', 'title'])
      .fetch()

    const limitLength = 12
    // noinspection ES6MissingAwait
    posts.forEach(async (post) => {
      const splittedPostTitle = mikan.split(post.title)
      const breakIndexes = []
      let titleRowLength = 0
      splittedPostTitle.forEach((word, i) => {
        titleRowLength += word.length
        if (titleRowLength > limitLength) {
          breakIndexes.push(i)
          titleRowLength = 0
        }
      })

      const titleLines =
        breakIndexes.length === 0
          ? [post.title]
          : (() => {
              const lines = [splittedPostTitle.slice(0, breakIndexes[0]).join('')]
              let i = 0
              for (i; i < breakIndexes.length - 1; i++) {
                lines.push(splittedPostTitle.slice(breakIndexes[i], breakIndexes[i + 1]).join(''))
              }
              lines.push(splittedPostTitle.slice(breakIndexes[i]).join(''))
              return lines
            })()

      const titleBuffers = await Promise.all(
        titleLines.map(async (line) => {
          const svg = textToSVG.getSVG(line, svgOption)
          return await sharp(path.join(__dirname, '/../static/img/title_bg.png'))
            .resize(1200, 80)
            .composite([{ input: Buffer.from(svg) }])
            .png()
            .toBuffer()
        })
      )
      const title = titleBuffers.map((buffer, i) => {
        return { input: buffer, left: 0, top: 72 * i }
      })
      const titleBox = await sharp(path.join(__dirname, '/../static/img/title_bg.png'))
        .resize(1200, 80 * title.length)
        .composite(title)
        .png()
        .toBuffer()

      await sharp(path.join(__dirname, '/../static/img/ogp_bg.png'))
        .composite([{ input: titleBox }])
        .resize(1200, 630)
        .toFile(
          path.join(__dirname, `/../static/ogp/${post.slug}.png`),
          (error) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.error(`${post.slug}: ${error}`)
            }
          }
        )
    })
  })
}
