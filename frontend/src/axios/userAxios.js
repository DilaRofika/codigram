import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3001/backend/user'

const getUsers = async (cb) => {
    try {
        let users = await axios({
            method: 'GET',
            url: URL
        })
        cb(users.data)
    } catch (e) {
        console.log(e)
    }
}

/*const LoginUser = async (user) => {
    try {
        let result = await axios({
            method: 'POST',
            url: URL + "/login",
            data: user
        })
    }
}*/

const addUser = async (user) => {
    try {
        let result = await axios({
            method: 'POST',
            url: URL + "/register",
            data: user
        })


        Swal.fire(
            'Add User',
            'User has been added',
            'success'
        )
    } catch (e) {
        console.log(e)
    }
}

const editUser = async (id, user) => {
    try {
        let result = await axios({
            method: 'PUT',
            url: URL + '/update/' + id,
            data: user
        })

        Swal.fire(
            'Edit User ' + id,
            'User ' + id + ' has been updated',
            'success'
        )
        console.log(result.data)
    } catch (e) {
        console.log(e)
    }
}

const removeUser = async (id) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await axios({
                    method: "DELETE",
                    url: URL + '/delete/' + id
                })

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    } catch (e) {
        console.log(e)
    }
}

const accountUser = async (id, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: URL + '/account/' + id
        })

        cb(result.data)
    } catch (e) {
        console.log(e)
    }
}

export {
    getUsers,
    addUser,
    editUser,
    removeUser,
    accountUser
}