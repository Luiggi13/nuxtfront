<template>

    <div class="min-h-dvh h-dvh">
        <div class="w-full flex flex-col justify-center gap-4 min-h-dvh h-dvh">
            <form class="mx-auto items-center w-[70%]" @submit="signInWithOAuth">
                <div class="mb-5">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input type="text" id="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="user@domain.com" required v-model="username" autocomplete="email"/>
                </div>
                <div class="mb-8">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required v-model="password" autocomplete="current-password"/>
                        <p v-if="isFailed" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> {{errorMessage}}</p>

                </div>
                <div class="justify-end flex w-full">
                    <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
const username = ref<string>('')
const password = ref<string>('')
const isFailed = ref<boolean>(false)
const errorMessage = ref<string>('')
const signInWithOAuth = async (e: Event) => {
    e?.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: username.value, password: password.value })
    if (error) {
        console.log(error.message)
        isFailed.value = true
        errorMessage.value = error.message
    }
    navigateTo("/upload")

}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
}
</script>