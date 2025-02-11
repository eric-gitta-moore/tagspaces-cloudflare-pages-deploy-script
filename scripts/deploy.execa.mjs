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

$$`npm run prepare-web`

shell.cp('-r', path.join(cwd, 'tagspaces/web'), path.join(cwd, `dist/${process.env.baseDir || ''}`))