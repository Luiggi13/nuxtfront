<template>
	<nav class="flex gap-8 items-center justify-center w-full">
		<div class="w-[90%] flex flex-row flex-wrap items-center justify-center mx-auto py-4">
			<div class="md:block md:w-auto" id="navbar-default">
				<ul
					class="flex flex-row p-4 md:p-0 mt-4 md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<li>
						<NuxtLink to="/upload"
							exact-active-class="font-medium text-white bg-blue-700 md:text-white-700 px-3 dark:text-white md:dark:text-white block"
							class="font-light text-xl px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							aria-current="page">Upload</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/compressed"
							exact-active-class="font-medium text-white bg-blue-700 md:text-white-700 px-3 dark:text-white md:dark:text-white block"
							class="font-light text-xl px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
							Mis descargas</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>