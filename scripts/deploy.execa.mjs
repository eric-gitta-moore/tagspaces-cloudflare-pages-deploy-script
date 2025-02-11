import * as execa from 'execa'
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

const cwd = process.cwd()
const $ = execa.$
const $$ = $({ stdout: 'inherit', stderr: 'inherit', verbose: 'full' }).sync

$$`rm -rf tagspaces`
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
$$`cp web ../dist/${process.env.baseDir || ''}`