import { parse } from '../app/api/parser/parser.js'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

// 使用 fixtures 文件夹
const raw = fs.readFileSync(path.join(__dirname, 'fixtures', 'demo.yaml'), 'utf-8')

describe('parser', () => {
  it('should parse the config correctly', () => {
    const ret = parse(raw, { yaml })
    expect(ret).toBeDefined()
    expect(ret).toMatchSnapshot()
  })
})
