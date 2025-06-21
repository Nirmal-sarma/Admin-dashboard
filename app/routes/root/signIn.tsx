import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import React from 'react'
import { Link, redirect } from 'react-router'
import { loginWithGoogle } from '~/appwrite/auth'
import { account } from '~/appwrite/client'

export async function clientLoader(){
    try {
        const user=await account.get();
        if(user.$id) return redirect('/dashboard');

    } catch (error) {
        console.log("Error fetching user",error)
    }
}

const signIn = () => {
    return (
        <div className='auth'>
            <section className='size-full glassmorphism flex-center px-6'>
                <div className='sign-in-card'>
                    <header className='header'>
                        <Link to='/dashboard'>
                            <img
                                src='/assets/icons/logo.svg'
                                alt='logo'
                                className='size-[30px]'
                            />

                        </Link>
                        <h1 className='p-28-bold text-dark-100'> Tourvisto</h1>
                    </header>
                    <article>
                        <h2 className='p-28-semibold text-dark-100 text-center'>Start your travel journey</h2>
                        <p className='p-18-regular text-center text-grey-100 !leading-7'>SignIn with Google to manage destinations,itineraries, and user activity with ease.</p>
                    </article>
                    <ButtonComponent
                        type='button'
                        iconCss='e-search-icon'
                        className='button-class !h-11 !w-full'
                        onClick={loginWithGoogle}
                    >
                        <img
                            src='/assets/icons/google.svg'
                            className='size-5'
                            alt='Google'
                        />
                        <span className='p-18-semibold text-white'>SignIn with Google</span>
                    </ButtonComponent>
                </div>
            </section>
        </div>
    )
}

export default signIn