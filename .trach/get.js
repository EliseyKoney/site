const pk = require('./get.json')
const { exec } = require('child_process')

const cmd = `yarn add ${Object.keys(pk.dependencies).join(' ')}`
console.log(cmd)
/*
exec(cmd, (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
})
*/