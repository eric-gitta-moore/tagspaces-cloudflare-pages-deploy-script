import { execa as $ } from '@rebundled/execa'
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

const cwd = process.cwd()

// 克隆仓库
await $('git', ['clone', 'git@github.com:eric-gitta-moore/tagspaces.git', '-b', 'develop'])

// // 切换目录并安装依赖
// process.chdir('tagspaces')
// await $('npm', ['ci'])

// // 写入配置文件
// const extconfig = `
// window.ExtIsFirstRun = false;
// window.ExtCheckForUpdatesOnStartup = false;
// window.ExtSaveLocationsInBrowser = true;
// window.ExtUseSidecarsForFileTagging = true;
// window.ExtLocations = [
//     ${process.env.ExtLocations}
//   ]
// `

// fs.writeFileSync(path.join(cwd, 'tagspaces', 'web/extconfig.js'), extconfig)

// // 准备web文件
// await $('npm', ['run', 'prepare-web'])

// // 复制web目录到dist
// await $('cp', ['-r', 'web', '../dist'])