<script lang="ts">
    import auth from '../authService'
    import {isAuthenticated, user, auth0Client as auth0Store} from '../store'
    import LoginImage from '../lib/LoginImage.svelte'
    import { ToastContainer, FlatToast }  from "svelte-toasts";
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
    import { Circle3 } from 'svelte-loading-spinners';
    // replaced dyanmicaly
    const date = '__DATE__'

    const queryClient = new QueryClient()

    let auth0Client
    async function loadAuth0(){
        auth0Client = await auth.createClient();

        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
        auth0Store.set(auth0Client);
    }

    function login() {
        auth.loginWithPopup(auth0Client, {});
    }

    function logout() {
        auth.logout(auth0Client);
    }

    async function logToken(){
        const accessToken = await auth0Client.getTokenSilently();
        console.log(accessToken)
    }

</script>

<main>
    {#await loadAuth0()}
        <div class="flex h-screen items-center justify-center">
            <Circle3 size="60" unit="px" duration="1s" />
        </div>
    {:then}
        <div class="grid justify-center">
            {#if $isAuthenticated}
                <!--<button on:click={logToken} class="btn btn-warning">log token</button>
                <span>{$user.name} ({$user.email})</span>
                <div>Datos: {JSON.stringify($user)}</div>
                -->
                <div>
                    <span class="title">Asteamur</span>
                    <button on:click={logout} class="btn btn-warning absolute float-right">Logout</button>
                </div>
                <QueryClientProvider client={queryClient}>
                    <slot />
                </QueryClientProvider>
                <ToastContainer let:data={data}>
                    <FlatToast {data}  />
                </ToastContainer>
            {:else}
                <div class="grid place-items-center">
                    <LoginImage />
                    <a href="https://storyset.com/web">Web illustrations by Storyset</a>
                    <button on:click={login} class="btn btn-warning">Login</button>
                </div>
            {/if}
        </div>
    {/await}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    .title {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 100;
        line-height: 1.1;
        
        max-width: 14rem;
    }

    @media (min-width: 480px) {
        .title {
            max-width: none;
        }

    }
</style>
