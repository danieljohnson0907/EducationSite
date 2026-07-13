socket.on('sendMessage', (result) => {
    dispatch({
        type: ADD_MESSAGE,
        payload: result
    })
})