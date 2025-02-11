import { $ } from 'zx'
import * as zx from 'zx'
import process from 'node:process'
import path from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

const cwd = process.cwd()
const $$ = $.sync
$.verbose = true

$$`git clone git@github.com:eric-gitta-moore/tagspaces.git -b develop`
zx.cd('tagspaces')
$$`npm ci`

const extconfig = `
window.ExtIsFirstRun = false;
window.ExtCheckForUpdatesOnStartup = false;
window.ExtSaveLocationsInBrowser = true;
window.ExtUseSidecarsForFileTagging = true;
window.ExtLocations = [
    ${process.env.ExtLocations}
  ]
`

fs.writeFileSync(path.join(cwd, 'tagspaces', 'web/extconfig.js'), extconfig)

$$`npm run prepare-web`
$$`cp web ../dist`