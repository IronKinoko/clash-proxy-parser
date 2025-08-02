module.exports = (config) => {
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
      url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt',
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
  }
  config.rules = [
    'RULE-SET,applications,BitTorrent',
    'DOMAIN-KEYWORD,steamserver.net,DIRECT',
    'DOMAIN-KEYWORD,hf-mirror.com,DIRECT',
    'DOMAIN-KEYWORD,exhentai.org,e-hentai',
    'DOMAIN-KEYWORD,e-hentai.org,e-hentai',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',
    'RULE-SET,private,DIRECT',
    'RULE-SET,copymanga,PROXY',
    'RULE-SET,fanqie,REJECT',
    'RULE-SET,reject,REJECT',
    'RULE-SET,icloud,DIRECT',
    'RULE-SET,apple,DIRECT',
    'RULE-SET,google,DIRECT',
    'RULE-SET,proxy,PROXY',
    'RULE-SET,direct,DIRECT',
    'RULE-SET,lancidr,DIRECT',
    'RULE-SET,cncidr,DIRECT',
    'RULE-SET,telegramcidr,PROXY',
    'GEOIP,LAN,DIRECT',
    'GEOIP,CN,DIRECT',
    'MATCH,Final',
  ]

  const groupList = Object.entries({
    香港: ['香港', 'Hong Kong', 'HK'],
    台湾: ['台湾', 'Taiwan', 'TW'],
    美国: ['美国', 'United States', 'US'],
    日本: ['日本', 'Japan', 'JP'],
    新加坡: ['新加坡', 'Singapore', 'SG'],
    实验性: ['实验性'],
    标准: ['标准'],
    高级: ['高级'],
  })
    .map(([name, keys]) => {
      return {
        name,
        type: 'url-test',
        url: 'http://www.gstatic.com/generate_204',
        interval: 86400,
        proxies: config.proxies
          .filter((proxy) => keys.some((key) => proxy.name.includes(key)))
          .map((proxy) => proxy.name),
      }
    })
    .filter((o) => {
      return o.proxies.length > 0
    })

  const groupNameList = groupList.map((o) => o.name)

  config['proxy-groups'].push({
    name: 'Final',
    type: 'select',
    proxies: ['DIRECT', 'PROXY'],
  })
  config['proxy-groups'].push({
    name: 'PROXY',
    type: 'select',
    proxies: ['指定节点', '自动选择', '故障转移', ...groupNameList],
  })
  config['proxy-groups'].push({
    name: '指定节点',
    type: 'select',
    proxies: config.proxies.map((proxy) => proxy.name),
  })
  config['proxy-groups'].push({
    name: 'BitTorrent',
    type: 'select',
    proxies: ['DIRECT', 'PROXY'],
  })
  config['proxy-groups'].push({
    name: 'e-hentai',
    type: 'select',
    proxies: ['指定节点', '自动选择', '故障转移', ...config.proxies.map((proxy) => proxy.name)],
  })
  config['proxy-groups'].push({
    name: '自动选择',
    type: 'url-test',
    url: 'http://www.gstatic.com/generate_204',
    interval: 7200,
    proxies: config.proxies.map((proxy) => proxy.name),
  })
  config['proxy-groups'].push({
    name: '故障转移',
    type: 'fallback',
    url: 'http://www.gstatic.com/generate_204',
    interval: 7200,
    proxies: config.proxies.map((proxy) => proxy.name),
  })

  config['proxy-groups'] = config['proxy-groups'].concat(groupList)
  config['proxy-groups'] = config['proxy-groups'].filter((group) => group.proxies.length > 0)

  return config
}
