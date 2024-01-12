'use server'
import {cookies} from 'next/headers'

export default async function setcookie(userdata) {
    cookies().set('token', userdata)
}
