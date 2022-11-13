import path from 'path'

import mikan from 'mikanjs'
import sharp from 'sharp'
import TextToSVG, { Anchor } from 'text-to-svg'
import type { Module } from '@nuxt/types'
import { $content } from '@nuxt/content'

import { Post } from '@/composables/post'

const textToSVG = TextToSVG.loadSync(
  path.join(__dirname, '/../static/font/kiloji_b.ttf')
)

const config = {
  svgOption: {
    x: 0,
    y: 0,
    fontSize: 45,
    anchor: 'top' as Anchor,
    attributes: { fill: '#382724', stroke: '#382724' }
  },
  limitLength: 12
}

const calculateBreakPoint = function (splitPostTitle: string[]): number[] {
  const breakPointIndexes: Array<number> = []
  let oneLineLength = 0
  splitPostTitle.forEach((word, i) => {
    oneLineLength += word.length
    if (oneLineLength > config.limitLength) {
      breakPointIndexes.push(i)
      oneLineLength = 0
    }
  })
  return breakPointIndexes
}

const makeTitleLines = function (splitPostTitle: string[], breakPointIndexes: number[]): string[] {
  const lines = [splitPostTitle.slice(0, breakPointIndexes[0]).join('')]
  for (let i = 0; i < breakPointIndexes.length - 1; i++) {
    lines.push(splitPostTitle.slice(breakPointIndexes[i], breakPointIndexes[i + 1]).join(''))
  }
  lines.push(splitPostTitle.slice(breakPointIndexes.slice(-1)[0]).join(''))
  return lines
}

const makeImages = async function (post: Post, titleLines: string[]): Promise<void> {
  const titleBuffers = await Promise.all(
    titleLines.map(async (line) => {
      const svg = textToSVG.getSVG(line, config.svgOption)
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
}

const ogpGenerator: Module = function () {
  this.nuxt.hook('generate:before', async () => {
    const posts = await $content('posts')
      .only(['slug', 'title'])
      .fetch()

    // noinspection ES6MissingAwait
    posts.forEach(async (post: Post) => {
      const splitPostTitle = mikan.split(post.title)
      const breakPointIndexes = calculateBreakPoint(splitPostTitle)

      const titleLines =
        breakPointIndexes.length === 0
          ? [post.title]
          : makeTitleLines(splitPostTitle, breakPointIndexes)

      await makeImages(post, titleLines)
    })
  })
}

export default ogpGenerator
