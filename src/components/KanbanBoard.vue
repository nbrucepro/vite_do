<template>
	<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-8 rounded shadow-lg">
			<button @click="showModal = false" class="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
				&times;
			</button>
			<form @submit.prevent="submitForm" class="form">
				<label for="name">Name:</label>
				<input type="text" id="name" v-model="formData.name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
				<button type="submit"
					class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
					Submit
				</button>
			</form>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
		<div class="rounded-md snap-start">
			<div class="flex items-center justify-between p-4  rounded-t-md">
				<div class="text-lg font-semibold cursor-pointer open-modal-button" @click="openAddDoingModal('toDo')">
					To do +
				</div>
			</div>

			<div class="my-3 w-full">
				<div class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="toDoTickets.items">
						<template v-for="(element, index) in toDoTickets" :key="element.name">
							<div class="dragclass mb-3" v-if="index !== toDoTickets.length - 1">
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
							<div class="dontdragclass mb-3 cursor-not-allowed" v-else>
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
						</template>
					</draggable>
				</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center justify-between p-4  rounded-t-md">
				<div class="text-lg font-semibold cursor-pointer" @click="openAddDoingModal('Doing')">
					Doing +
				</div>
			</div>

			<div class="my-3 w-full">
				<div class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="doingTickets.items">
						<template v-for="(element, index) in doingTickets" :key="element.name">
							<div class="dragclass mb-3" v-if="index !== doingTickets.length - 1">
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
							<div class="dontdragclass mb-3 cursor-not-allowed" v-else>
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
						</template>
					</draggable>
				</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center justify-between p-4  rounded-t-md">
				<div class="text-lg font-semibold cursor-pointer" @click="openAddDoingModal('Review')">
					Under review +
				</div>
			</div>

			<div class="my-3 w-full">
				<div class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="underReviewTickets.items">
						<template v-for="(element, index) in underReviewTickets" :key="element.name">
							<div class="dragclass mb-3" v-if="index !== underReviewTickets.length - 1">
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
							<div class="dontdragclass mb-3 cursor-not-allowed" v-else>
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
						</template>
					</draggable>
				</div>
			</div>
		</div>
		<div class="rounded-md snap-start">
			<div class="flex items-center justify-between p-4  rounded-t-md">
				<div class="text-lg font-semibold  cursor-pointer" @click="openAddDoingModal('Done')">
					Done +
				</div>
			</div>

			<div class="my-3 w-full">
				<div class="flex w-full mb-3">
					<draggable draggable=".dragclass:not(.dontdragclass)" class="dragArea mb-8 list-group w-full"
						group="tickets" itemKey="name" :list="doneTickets.items">
						<template v-for="(element, index) in doneTickets" :key="element.name">
							<div class="dragclass mb-3" v-if="index !== doneTickets.length - 1">
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
							<div class="dontdragclass mb-3 cursor-not-allowed" v-else>
								<CardBoxWidget trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
								:label="element.items.todo" />
							</div>
						</template>
					</draggable>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { mdiAccountMultiple } from '@mdi/js'
import CardBoxWidget from './CardBoxWidget.vue'
import axios from 'axios'

export default defineComponent({
	setup() {
		const toDoTickets = ref([]);
		const doingTickets = ref([]);
		const underReviewTickets = ref([]);
		const doneTickets = ref([]);
		const showModal = ref(false);
		const ticketType = ref('');

		const fetchData = async () => {
			try {
				const response = await axios.get('https://dummyjson.com/todos?limit=12&skip=10');
				const todos = Array.isArray(response.data) ? response.data : response.data.todos;

				// Divide todos into groups of 3
				const chunkSize = 3;
				for (let i = 0; i < todos.length; i += chunkSize) {
					const chunk = todos.slice(i, i + chunkSize);
					if (i < chunkSize) {
						toDoTickets.value = chunk.map((todo, index) => ({
							id: i + index,
							name: `todos ${i + index + 1}`,
							items: todo
						}));
					} else if (i < 2 * chunkSize) {
						doingTickets.value = chunk.map((todo, index) => ({
							id: i + index,
							name: `todos ${i + index + 1}`,
							items: todo
						}));
					} else if (i < 3 * chunkSize) {
						underReviewTickets.value = chunk.map((todo, index) => ({
							id: i + index,
							name: `todos ${i + index + 1}`,
							items: todo
						}));
					} else {
						doneTickets.value = chunk.map((todo, index) => ({
							id: i + index,
							name: `todos ${i + index + 1}`,
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

		const addTodo = async (formData) => {
			try {
				const response = await axios.post('https://dummyjson.com/todos/add', {
					todo: formData.name,
					completed: false,
					userId: 5,
				});
				const newTodo = response.data;
				if (ticketType.value === "toDo") {
					toDoTickets.value.unshift({
						id: toDoTickets.value.length + 1,
						name: `todos ${toDoTickets.value.length + 1}`,
						items: newTodo
					});
				}
				else if (ticketType.value === "Doing") {
					doingTickets.value.unshift({
						id: toDoTickets.value.length + 1,
						name: `todos ${toDoTickets.value.length + 1}`,
						items: newTodo
					});
				}
				else if (ticketType.value === "Review") {
					underReviewTickets.value.unshift({
						id: toDoTickets.value.length + 1,
						name: `todos ${toDoTickets.value.length + 1}`,
						items: newTodo
					});
				}
				else {
					doneTickets.value.unshift({
						id: toDoTickets.value.length + 1,
						name: `todos ${toDoTickets.value.length + 1}`,
						items: newTodo
					});
				}

			} catch (error) {
				console.error('Error adding todo:', error);
			}
		};
		const openAddDoingModal = (doType) => {
			showModal.value = true;
			ticketType.value = doType;
		};

		return {
			toDoTickets,
			doingTickets,
			underReviewTickets,
			doneTickets,
			addTodo,
			ticketType,
			openAddDoingModal,
			showModal
		};
	},
	data() {
		return {
			//   showModal: false,
			formData: {
				name: ''
			}
		};
	},
	components: {
		draggable: VueDraggableNext,
		CardBoxWidget
	},
	methods: {
		handleDrag(event) {
			const draggedItem = this.toDoTickets.items.splice(event.oldIndex, 1)[0];
			this.toDoTickets.items.splice(event.newIndex, 0, draggedItem);
		},
		submitForm() {
			this.addTodo(this.formData);
			this.formData.name = '';
			this.showModal = false;
		},
		checkMove(evt) {
			return (evt.draggedContext.element.name !== 'apple');
		}
	}
});
</script>
