import * as execa from 'execa'
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import shell from 'shelljs'

shell.config.verbose = true
const cwd = process.cwd()
const $ = execa.$
const $$ = $({ stdout: 'inherit', stderr: 'inherit', verbose: 'full' }).sync

shell.rm('-rf', 'tagspaces')
$$`git clone https://github.com/eric-gitta-moore/tagspaces.git -b develop`

process.chdir('tagspaces')
$$`npm ci`

const extconfig = `
window.ExtIsFirstRun = false;
window.ExtCheckForUpdatesOnStartup = false;
window.ExtSaveLocationsInBrowser = true;
window.ExtUseSidecarsForFileTagging = true;
window.ExtLocations = [
    ${process.env.ExtLocations || ''}
  ]
`
fs.writeFileSync(path.join(cwd, 'tagspaces', 'web/extconfig.js'), extconfig)

if (process.env.baseDir)
  shell.sed('-i', `s#../dist/#../${process.env.baseDir + '/'}dist/#`, path.join(cwd, 'tagspaces/.erb/configs/webpack.config.web.prod.ts'))

$$`npm run prepare-web`

const dist = path.join(cwd, `dist/${process.env.baseDir || ''}`)
shell.mkdir('-p', dist)
shell.cp('-r', path.join(cwd, 'tagspaces/web/*'), dist)