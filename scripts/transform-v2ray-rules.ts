import path from 'node:path'
import { createInterface } from 'node:readline/promises'
const fs = await import('node:fs')

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log('这个脚本会将 v2ray 的规则转换为 clash 的规则，并保存在 public/rules 目录下。')
console.log('请确保规则链接是纯文本格式的，且每行一个规则。')
console.log('规则基本来源这里：https://github.com/v2fly/domain-list-community/')
console.log()
const answer = await rl.question('请粘贴规则链接：\n')
rl.close()

const res = await fetch(answer, { headers: { 'user-agent': 'ClashforWindows/0.19.23' } })
if (res.status < 200 || res.status >= 300) {
  console.error('请求失败', res.status)
  process.exit(1)
}
const txt = await res.text()

const lines = txt.split('\n')

const rules = lines
  .map((line) => {
    line = line.trim()

    if (!line) return ''

    if (line.startsWith('#')) {
      return line
    }
    if (line.startsWith('full:')) {
      return line.replace('full:', 'DOMAIN,')
    }
    if (line.startsWith('regexp:')) {
      return line.replace('regexp:', 'DOMAIN-REGEXP,')
    }
    if (line.startsWith('keyword:')) {
      return line.replace('keyword:', 'DOMAIN-KEYWORD,')
    }
    return 'DOMAIN-SUFFIX,' + line
  })
  .map((line) => {
    if (!line) return
    if (line.startsWith('#')) return '  ' + line

    const [rule, ...rest] = line.split(' ')
    return '  - ' + rule + (rest.length > 0 ? ' # ' + rest.join(' ') : '')
  })

const fileName = path.basename(answer) + '.yaml'
const fileContent = `# 这是由 transform-v2ray-rules.ts 脚本生成的规则文件
# 规则源于 ${answer}
payload:\n${rules.join('\n')}\n`
fs.writeFileSync(path.resolve(import.meta.dirname, '..', 'public', 'rules', fileName), fileContent)

console.log()
console.log('成功生成', fileName)
