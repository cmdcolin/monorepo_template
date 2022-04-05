const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')
const { hashElement } = require('folder-hash')

const options = {
  folders: { exclude: ['.*', 'node_modules'] },
  files: { exclude: ['.watcher_hash'] },
}

async function checkHash(arg) {
  const dir = arg || '.'
  const file = path.join(dir, '.watcher_hash')
  let existingHash = ''
  try {
    existingHash = fs.readFileSync(file, 'utf8')
  } catch (e) {}
  const { hash } = await hashElement(dir, options)
  if (existingHash !== hash) {
    fs.writeFileSync(file, hash, 'utf8')
    return 1
  } else {
    return 0
  }
}

async function launchBuilder(arg) {
  if (await checkHash(arg)) {
    console.log('building', arg)
    execFile('npm', ['run', 'build', '-w', arg]).on('exit', code => {
      if (code) {
        console.log('Failed to build', code)
      } else {
        console.log('Build succeeded')
      }
    })
  }
}

// One-liner for current directory
chokidar
  .watch('.', {
    ignored: [/node_modules/, /dist/, /build/, /\.git/],
    ignoreInitial: true,
  })
  .on('all', (event, path) => {
    console.log({ path })
    launchBuilder('workspace-a')
  })
