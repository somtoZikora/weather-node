var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Vikram'
    }

    setTimeout(() => {
        callback(user)        
    })
}

getUser(31, (user) => {
    console.log(user)
})