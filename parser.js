module.exports.parse = (raw, { yaml, console }) => {
  const config = yaml.parse(raw)

  config['proxy-groups'] = []
  config['rule-providers'] = {
    reject: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt',
      path: './ruleset/reject.yaml',
      interval: 86400,
    },
    icloud: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt',
      path: './ruleset/icloud.yaml',
      interval: 86400,
    },
    apple: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt',
      path: './ruleset/apple.yaml',
      interval: 86400,
    },
    google: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt',
      path: './ruleset/google.yaml',
      interval: 86400,
    },
    proxy: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt',
      path: './ruleset/proxy.yaml',
      interval: 86400,
    },
    direct: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt',
      path: './ruleset/direct.yaml',
      interval: 86400,
    },
    private: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt',
      path: './ruleset/private.yaml',
      interval: 86400,
    },
    gfw: {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt',
      path: './ruleset/gfw.yaml',
      interval: 86400,
    },
    'tld-not-cn': {
      type: 'http',
      behavior: 'domain',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt',
      path: './ruleset/tld-not-cn.yaml',
      interval: 86400,
    },
    telegramcidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt',
      path: './ruleset/telegramcidr.yaml',
      interval: 86400,
    },
    cncidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt',
      path: './ruleset/cncidr.yaml',
      interval: 86400,
    },
    lancidr: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt',
      path: './ruleset/lancidr.yaml',
      interval: 86400,
    },
    applications: {
      type: 'http',
      behavior: 'classical',
      url: 'https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt',
      path: './ruleset/applications.yaml',
      interval: 86400,
    },
  }
  config.rules = [
    'RULE-SET,applications,DIRECT',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',
    'RULE-SET,private,DIRECT',
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
    'MATCH,PROXY',
  ]

  const groupNameList = ['香港', '台湾', '美国', '日本']

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

  // add proxy-groups by groupNameList
  groupNameList.forEach((name) => {
    config['proxy-groups'].push({
      name,
      type: 'url-test',
      url: 'http://www.gstatic.com/generate_204',
      interval: 86400,
      proxies: config.proxies
        .filter((proxy) => proxy.name.includes(name))
        .map((proxy) => proxy.name),
    })
  })

  config['proxy-groups'] = config['proxy-groups'].filter((group) => group.proxies.length > 0)

  return yaml.stringify(config)
}
