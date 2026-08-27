// update：https://github.com/IronKinoko/clash-proxy-parser/raw/refs/heads/master/app/api/parser/parser.js

const main = (config) => {
  config['proxy-groups'] = []
  config['rule-providers'] = {
    reject: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt',
      path: './ruleset/reject.yaml',
      interval: 86400,
    },
    icloud: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt',
      path: './ruleset/icloud.yaml',
      interval: 86400,
    },
    apple: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt',
      path: './ruleset/apple.yaml',
      interval: 86400,
    },
    google: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt',
      path: './ruleset/google.yaml',
      interval: 86400,
    },
    proxy: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt',
      path: './ruleset/proxy.yaml',
      interval: 86400,
    },
    direct: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt',
      path: './ruleset/direct.yaml',
      interval: 86400,
    },
    private: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt',
      path: './ruleset/private.yaml',
      interval: 86400,
    },
    gfw: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt',
      path: './ruleset/gfw.yaml',
      interval: 86400,
    },
    'tld-not-cn': {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt',
      path: './ruleset/tld-not-cn.yaml',
      interval: 86400,
    },
    telegramcidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt',
      path: './ruleset/telegramcidr.yaml',
      interval: 86400,
    },
    cncidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt',
      path: './ruleset/cncidr.yaml',
      interval: 86400,
    },
    lancidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt',
      path: './ruleset/lancidr.yaml',
      interval: 86400,
    },
    applications: {
      type: 'http',
      behavior: 'classical',
      url: 'https://cdn.jsdelivr.net/gh/ironkinoko/clash-proxy-parser/public/rules/applications.yaml',
      path: './ruleset/applications.yaml',
      interval: 86400,
    },
    fanqie: {
      type: 'http',
      behavior: 'classical',
      url: 'https://cdn.jsdelivr.net/gh/ironkinoko/clash-proxy-parser/public/rules/fanqie.yaml',
      path: './ruleset/fanqie.yaml',
      interval: 86400,
    },
    copymanga: {
      type: 'http',
      behavior: 'classical',
      url: 'https://cdn.jsdelivr.net/gh/ironkinoko/clash-proxy-parser/public/rules/copymanga.yaml',
      path: './ruleset/copymanga.yaml',
      interval: 86400,
    },
    adblock: {
      type: 'http',
      behavior: 'domain',
      url: 'https://cdn.jsdelivr.net/gh/REIJI007/AdBlock_Rule_For_Clash/adblock_reject.yaml',
      path: './ruleset/adblock_reject.yaml',
      interval: 86400,
    },
    openai: {
      type: 'http',
      behavior: 'classical',
      url: 'https://cdn.jsdelivr.net/gh/ironkinoko/clash-proxy-parser/public/rules/openai.yaml',
      path: './ruleset/openai.yaml',
      interval: 86400,
    },
  }
  config.rules = [
    'RULE-SET,adblock,REJECT',
    'RULE-SET,fanqie,REJECT',
    'RULE-SET,reject,REJECT',

    'DOMAIN-KEYWORD,exhentai.org,e-hentai',
    'DOMAIN-KEYWORD,e-hentai.org,e-hentai',

    'RULE-SET,private,DIRECT',
    'RULE-SET,direct,DIRECT',
    'RULE-SET,lancidr,DIRECT',
    'RULE-SET,cncidr,DIRECT',
    'RULE-SET,icloud,DIRECT',
    'RULE-SET,apple,DIRECT',
    'RULE-SET,google,DIRECT',
    'GEOIP,LAN,DIRECT',
    'GEOIP,CN,DIRECT',

    'RULE-SET,applications,Download',

    'RULE-SET,copymanga,PROXY',

    'DOMAIN-KEYWORD,steamserver.net,DIRECT',
    'DOMAIN-KEYWORD,hf.co,DIRECT',
    'DOMAIN-KEYWORD,hf-mirror.com,DIRECT',
    'DOMAIN-KEYWORD,cauenvao.click,DIRECT',
    'DOMAIN-KEYWORD,selectgroup.click,DIRECT',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',

    'RULE-SET,openai,OpenAI',
    'RULE-SET,proxy,PROXY',
    'RULE-SET,telegramcidr,PROXY',
    'MATCH,漏网之鱼',
  ]

  const basicAreaGroupList = Object.entries({
    '🇭🇰 香港': ['香港', '🇭🇰', 'Hong Kong', 'HK'],
    '🇨🇳 台湾': ['台湾', '🇨🇳', 'Taiwan', 'TW'],
    '🇺🇸 美国': ['美国', '🇺🇸', 'United States', 'US'],
    '🇯🇵 日本': ['日本', '🇯🇵', 'Japan', 'JP'],
    '🇸🇬 新加坡': ['新加坡', '🇸🇬', 'Singapore', 'SG'],
    '🇰🇷 韩国': ['韩国', '🇰🇷', 'Korea', 'KR'],
  }).map(([name, keys]) => {
    return {
      name,
      proxies: config.proxies
        .filter((proxy) => keys.some((key) => proxy.name.toLowerCase().includes(key.toLowerCase())))
        .map((proxy) => proxy.name),
    }
  })

  // 实验性过滤出来
  const experimentalKeys = ['实验性', 'Experimental', '测试', 'Test', 'Beta']
  basicAreaGroupList.forEach((group) => {
    group.proxies = group.proxies.filter((proxy) => {
      return !experimentalKeys.some((key) => proxy.toLowerCase().includes(key.toLowerCase()))
    })
  })

  basicAreaGroupList.push({
    name: '其他',
    proxies: config.proxies
      .filter((proxy) => !basicAreaGroupList.some((group) => group.proxies.includes(proxy.name)))
      .map((proxy) => proxy.name),
  })

  const areaGroupList = basicAreaGroupList
    .flatMap((group) => {
      return [
        {
          ...group,
          name: `${group.name}`,
          type: 'url-test',
          url: 'http://www.gstatic.com/generate_204',
          interval: 180,
        },
        {
          ...group,
          name: `${group.name} 均衡`,
          type: 'load-balance',
          strategy: 'consistent-hashing',
          url: 'http://www.gstatic.com/generate_204',
          interval: 600,
        },
      ]
    })
    .filter((o) => {
      return o.proxies.length > 0
    })

  // 地区归类
  const areaGroupNameList = areaGroupList.map((o) => o.name)
  // 原始代理组名称列表
  const rawGroupNameList = config.proxies.map((proxy) => proxy.name)
  // 基础服务
  const customGroupNameList = ['指定节点', '自动选择', '故障转移']
  const groupNameList = customGroupNameList.concat(areaGroupNameList)

  config['proxy-groups'].push({
    name: '漏网之鱼',
    type: 'select',
    proxies: ['DIRECT', 'PROXY'],
  })
  config['proxy-groups'].push({
    name: 'PROXY',
    type: 'select',
    proxies: groupNameList,
  })
  config['proxy-groups'].push({
    name: '指定节点',
    type: 'select',
    proxies: rawGroupNameList,
  })
  config['proxy-groups'].push({
    name: 'e-hentai',
    type: 'select',
    proxies: customGroupNameList.concat(areaGroupNameList).concat(rawGroupNameList),
  })
  config['proxy-groups'].push({
    name: 'OpenAI',
    type: 'select',
    proxies: customGroupNameList.concat(areaGroupNameList).concat(rawGroupNameList),
  })
  config['proxy-groups'].push({
    name: 'Download',
    type: 'select',
    proxies: customGroupNameList.concat(areaGroupNameList).concat(rawGroupNameList),
  })
  config['proxy-groups'].push({
    name: '自动选择',
    type: 'url-test',
    url: 'http://www.gstatic.com/generate_204',
    interval: 180,
    proxies: rawGroupNameList,
  })
  config['proxy-groups'].push({
    name: '故障转移',
    type: 'fallback',
    url: 'http://www.gstatic.com/generate_204',
    interval: 60,
    proxies: rawGroupNameList,
  })

  config['proxy-groups'] = config['proxy-groups'].concat(areaGroupList)
  config['proxy-groups'] = config['proxy-groups'].filter((group) => group.proxies.length > 0)

  return config
}

try {
  module.exports.parse = (raw, { yaml }) => {
    return yaml.stringify(main(yaml.parse(raw)))
  }
} catch (error) {}
