console.log('Starting app')

setTimeout(() => {
    console.log('Inside callback now')
}, 2000)

setTimeout(() => {
    console.log('Second schneller timeout...vroooom')
}, 0)

console.log('Finishing up')