<template>
	<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white dark:bg-slate-800 w-96 p-8 rounded shadow-lg relative">
			<button @click="showModal = false"
				class="absolute -top-4 hover:bg-gray-300 bg-gray-200 text-3xl px-1 -right-4 m-4 text-gray-600 hover:text-gray-800">
				&times;
			</button>
			<form @submit.prevent="submitForm" class="form w-full">
				<label for="name" class="font-bold">Task:</label>
				<textarea required type="text" id="name" v-model="formData.name"
					class="block w-full dark:text-black border-gray-300 mt-3 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
				<div>
					<div v-if="loading" class="flex justify-center items-center mt-4">
						<div class="w-12 h-12 relative">
							<div
								class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
							</div>
						</div>
					</div>
					<button v-else type="submit"
						class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 w-full">
		<div class="rounded-md snap-start">
			<div class="flex items-center p-4 space-x-2  rounded-t-md  cursor-pointer open-modal-button"
				@click="openAddDoingModal('toDo')">
				<div class="relative w-4 h-4 bg-[#FF2473] rounded-md"></div>
				<div class="text-lg font-semibold">
					To do +
				</div>
			</div>

			<div class="my-3 w-full">
				<div v-if="toDoTickets.length != 0" class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="toDoTickets.items">
						<template v-for="(element, index) in toDoTickets" :key="element.name">
							<div class="dragclass mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-if="index !== toDoTickets.length - 1">
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg @click="openOptionsDialog(element)" width="24" height="24" viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg" fill="#A2A2A2"
											class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'toDo')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'toDo')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6 cursor-move">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
							<div class="dontdragclass cursor-not-allowed mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-else>
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
											fill="#A2A2A2" class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'toDo')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'toDo')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
						</template>
					</draggable>
				</div>
				<div v-else>No to do tickets yet</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center p-4 space-x-2 rounded-t-md cursor-pointer open-modal-button"
				@click="openAddDoingModal('Doing')">
				<div class="relative w-4 h-4 bg-[#FFA944] rounded-md"></div>
				<div class="text-lg font-semibold">
					Doing +
				</div>
			</div>

			<div class="my-3 w-full">
				<div v-if="doingTickets.length != 0" class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="doingTickets.items">
						<template v-for="(element, index) in doingTickets" :key="element.name">
							<div class="dragclass mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-if="index !== doingTickets.length - 1">
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg @click="openOptionsDialog(element)" width="24" height="24" viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg" fill="#A2A2A2"
											class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'Doing')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'Doing')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6 cursor-move">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
							<div class="dontdragclass cursor-not-allowed mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-else>
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
											fill="#A2A2A2" class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'Doing')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'Doing')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
						</template>
					</draggable>
				</div>
				<div v-else>No tickets in doing state</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center p-4 space-x-2 rounded-t-md cursor-pointer open-modal-button"
				@click="openAddDoingModal('Review')">
				<div class="relative w-4 h-4 bg-[#19AFFF] rounded-md"></div>
				<div class="text-lg font-semibold">
					Under review +
				</div>
			</div>

			<div class="my-3 w-full">
				<div v-if="underReviewTickets.length != 0" class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="underReviewTickets.items">
						<template v-for="(element, index) in underReviewTickets" :key="element.name">
							<div class="dragclass mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-if="index !== underReviewTickets.length - 1">
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg @click="openOptionsDialog(element)" width="24" height="24" viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg" fill="#A2A2A2"
											class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'Review')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'Review')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6 cursor-move">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
							<div class="dontdragclass cursor-not-allowed mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-else>
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
											fill="#A2A2A2" class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
											</div>
										</div>
									</span>
								</div>
								<div class="px-6">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
						</template>
					</draggable>
				</div>
				<div v-else>No tickets in review yet</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center p-4 space-x-2 rounded-t-md cursor-pointer open-modal-button"
				@click="openAddDoingModal('Done')">
				<div class="relative w-4 h-4 bg-[#40A737] rounded-md"></div>
				<div class="text-lg font-semibold">
					Done +
				</div>
			</div>

			<div class="my-3 w-full">
				<div v-if="doneTickets.length != 0" class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="doneTickets.items">
						<template v-for="(element, index) in doneTickets" :key="element.name">
							<div class="dragclass mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-if="index !== doneTickets.length - 1">
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg @click="openOptionsDialog(element)" width="24" height="24" viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg" fill="#A2A2A2"
											class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
												<div v-if="loading" class="flex justify-center items-center">
													<div class="w-12 h-12 relative">
														<div
															class="absolute top-0 right-0 bottom-0 left-0 border-4 border-blue-500 rounded-full animate-spin">
														</div>
													</div>
												</div>
												<div v-else>
													<button @click="deleteTicket(element.items, 'Done')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-red-500 hover:bg-gray-300 px-4 border-b-4">Delete</button>
													<button @click="openUpdateForm(element.items, 'Done')"
														class="block w-full py-2 dark:hover:bg-gray-700 text-left text-blue-500 hover:bg-gray-300 px-4">Update</button>
												</div>
											</div>
										</div>
									</span>
								</div>
								<div class="px-6 cursor-move">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
							<div class="dontdragclass cursor-not-allowed mb-3 md:w-full mx-6 lg:mx-1 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900"
								v-else>
								<div class="mb-2 px-6 py-4 flex justify-between relative">
									<h1 class="font-bold text-xl ">{{ element.items.todo.split(' ', 3).join(' ') }}</h1>
									<span v-if="element.items.id < 23" class="relative cursor-pointer">
										<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
											fill="#A2A2A2" class="bi bi-three-dots-vertical">
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
											</g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
												</path>
											</g>
										</svg>
										<div v-if="element.showOptions"
											class="absolute -top-10 right-5 mt-10 shadow-black dark:shadow-white rounded-lg dark:bg-slate-800 bg-white shadow-sm">
											<div class=" flex justify-end bg-gray-100 dark:bg-slate-800">
												<span class="hover:bg-gray-300 bg-gray-200 text-2xl px-1 text-black">
													&times;
												</span>
											</div>
											<div class="w-full">
											</div>
										</div>
									</span>
								</div>
								<div class="px-6">
									<p class="text-gray-700 dark:text-white text-base">
										{{ element.items.todo }}
									</p>
									<div class="pt-4 pb-2 flex justify-between">
										<p class="font-small text-[#A2A2A2]  text-sm ">{{ formattedDate }}</p>
										<span class="cursor-pointer">
											<Cardp />
										</span>
									</div>
								</div>
							</div>
						</template>
					</draggable>
				</div>
				<div v-else>No done tickets yet</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { mdiAccountMultiple, mdiDotsVertical } from '@mdi/js'
import CardBoxWidget from './CardBoxWidget.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import Cardp from '@/components/Cardp.vue'
import axios from 'axios'

export default defineComponent({
	setup() {
		const toDoTickets = ref([]);
		const doingTickets = ref([]);
		const underReviewTickets = ref([]);
		const doneTickets = ref([]);
		const showModal = ref(false);
		const loading = ref(false);
		const ticketType = ref('');
		const ticketToUpdate = ref('');
		const fetchData = async () => {
			try {
				const response = await axios.get('https://dummyjson.com/todos?limit=12&skip=10');
				const todos = Array.isArray(response.data) ? response.data : response.data.todos;
				const chunkSize = 3;
				for (let i = 0; i < todos.length; i += chunkSize) {
					const chunk = todos.slice(i, i + chunkSize);
					if (i < chunkSize) {
						toDoTickets.value = chunk.map((todo, index) => ({
							id: todo?.id,
							items: todo
						}));
					} else if (i < 2 * chunkSize) {
						doingTickets.value = chunk.map((todo, index) => ({
							id: todo?.id,
							items: todo
						}));
					} else if (i < 3 * chunkSize) {
						underReviewTickets.value = chunk.map((todo, index) => ({
							id: todo?.id,
							items: todo
						}));
					} else {
						doneTickets.value = chunk.map((todo, index) => ({
							id: todo?.id,
							items: todo
						}));
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		onMounted(() => {
			fetchData();
		});
		const openAddDoingModal = (doType) => {
			showModal.value = true;
			ticketType.value = doType;
			ticketToUpdate.value.showOptions = false
		};
		function openUpdateForm(ticket, doType) {
			this.formData.name = ticket.todo;
			ticketType.value = doType;
			ticketToUpdate.value = ticket;
			this.showModal = true;
		}
		const openOptionsDialog = (ticket) => {
			ticket.showOptions = !ticket.showOptions;
			ticketToUpdate.value = ticket;
		};
		return {
			toDoTickets,
			doingTickets,
			underReviewTickets,
			doneTickets,
			ticketType,
			ticketToUpdate,
			openUpdateForm,
			openAddDoingModal,
			showModal,
			loading,
			openOptionsDialog
		};
	},
	data() {
		return {
			formData: {
				name: ''
			},
			currentDate: new Date()
		};
	},
	computed: {
		formattedDate() {
			const day = this.currentDate.getDate();
			const month = this.currentDate.getMonth() + 1;
			const year = this.currentDate.getFullYear().toString().slice(-2);

			const formattedDay = day < 10 ? '0' + day : day;
			const formattedMonth = month < 10 ? '0' + month : month;

			return `${formattedMonth}/${formattedDay}/${year}`;
		}
	},
	components: {
		draggable: VueDraggableNext,
		CardBoxWidget,
		Cardp,
		BaseIcon
	},
	methods: {
		handleDrag(event) {
			const draggedItem = this.toDoTickets.items.splice(event.oldIndex, 1)[0];
			this.toDoTickets.items.splice(event.newIndex, 0, draggedItem);
		},
		submitForm() {
			this.loading = true;
			if (this.ticketToUpdate == '') {
				try {
					axios.post('https://dummyjson.com/todos/add', {
						todo: this.formData.name,
						completed: false,
						userId: 5,
					}).then((res) => {
						const newTodo = res.data;
						if (this.ticketType === "toDo") {
							this.toDoTickets.unshift({
								id: newTodo?.id,
								items: newTodo
							});
						}
						else if (this.ticketType === "Doing") {
							this.doingTickets.unshift({
								id: newTodo?.id,
								items: newTodo
							});
						}
						else if (this.ticketType === "Review") {
							this.underReviewTickets.unshift({
								id: newTodo?.id,
								items: newTodo
							});
						}
						else {
							this.doneTickets.unshift({
								id: newTodo?.id,
								items: newTodo
							});
						}
						this.loading = false;
						this.showModal = false;
						this.formData.name = '';
					})
				} catch (error) {
					this.loading = false;
					this.showModal = false;
					this.formData.name = '';
				}
			} else {
				axios.put(`https://dummyjson.com/todos/${this.ticketToUpdate.id}`, {
					todo: this.formData.name,
				})
					.then(response => {
						this.loading = false;
						this.formData.name = '';
						this.ticketToUpdate = '';
						const updatedTodo = response.data;
						const index = (this.ticketType === "toDo" ? this.toDoTickets : this.ticketType === "Doing" ? this.doingTickets : this.ticketType === "Review" ? this.underReviewTickets : this.doneTickets).findIndex(item => item.id === updatedTodo.id);
						if (index !== -1) {
							if (this.ticketType === "toDo") {
								this.toDoTickets.splice(index, 1, {
									id: updatedTodo.id,
									items: updatedTodo
								});
							}
							else if (this.ticketType === "Doing") {
								this.doingTickets.splice(index, 1, {
									id: updatedTodo.id,
									items: updatedTodo
								});
							}
							else if (this.ticketType === "Review") {
								this.underReviewTickets.splice(index, 1, {
									id: updatedTodo.id,
									items: updatedTodo
								});
							} else {
								this.doneTickets.splice(index, 1, {
									id: updatedTodo.id,
									items: updatedTodo
								});

							}

						}
						this.showModal = false;
					})
					.catch(error => {
						this.loading = false;
						this.showModal = false;
					});
			}
		},
		checkMove(evt) {
			return (evt.draggedContext.element.name !== 'apple');
		},
		async deleteTicket(ticket, doType) {
			try {
				this.loading = true;
				axios.delete(`https://dummyjson.com/todos/${ticket.id}`).then((data) => {
					this.loading = false;
					const index = (doType === "toDo" ? this.toDoTickets : doType === "Doing" ? this.doingTickets : doType === "Review" ? this.underReviewTickets : this.doneTickets).findIndex(item => item.id === ticket.id);
					if (index !== -1) {
						if (doType === "toDo") {
							this.toDoTickets.splice(index, 1);
						}
						else if (doType === "Doing") {
							this.doingTickets.splice(index, 1);
						}
						else if (doType === "Review") {
							this.underReviewTickets.splice(index, 1);
						}
						else {
							this.doneTickets.splice(index, 1);
						}
					}
				})
			} catch (error) {
				this.loading = false;
				this.ticketToUpdate.showOptions = false
				console.error('Error deleting ticket:', error);
			}
		},
	}
});
</script>
