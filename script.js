const DOM = {
	// DOM Elements
	instances: document.getElementById('instances'),
	addInstanceForm: document.getElementById('add-instance-form'),
	addInstanceButton: document.getElementById('add-instance'),
	newInstanceName: document.getElementById('new-instance-name'),
	newInstanceField: document.getElementById('new-instance-field'),
};

const Utils = {
	// Utility methods
	randomId: () => 'id' + Math.random().toString(36).slice(2, 12),
};

const State = {
	// App State
	instances: [],
	addInstance(instance) {
		this.instances.push(instance);
	},
	removeInstance(id) {
		this.instances = this.instances.filter(
			(instance) => instance.id !== id
		);
	},
	updateInstances(instances) {
		this.instances = instances;
	},
};

const UI = {
	// UI methods
	addInstance({ name, url, id }) {
		const instanceHTML = `<div class="instance" id="${id}">
				<div class="instance__header">
					<h3 class="instance__name">${name}</h3>
					<button class="close-instance">
						<span
							class="iconify"
							data-icon="iconoir:web-window-close"
						></span>
					</button>
				</div>
				<iframe
					class="instance__iframe"
					src="${url}"
					frameborder="0"
				></iframe>
			</div>`;
		DOM.instances.insertAdjacentHTML('beforeend', instanceHTML);
	},

	removeInstance(id) {
		const target = document.querySelector(`.instance#${id}`);
		target.remove();
	},

	updateInstances(instances) {
		this.clearInstances();
		instances.forEach((instance) => this.addInstance(instance));
	},

	clearInstances() {
		DOM.instances.innerHTML = '';
	},

	addInstanceForm: {
		toggle() {
			DOM.addInstanceForm.classList.toggle('hidden');
		},

		close() {
			DOM.addInstanceForm.classList.add('hidden');
		},

		reset() {
			DOM.newInstanceField.value = '';
			DOM.newInstanceName.value = '';
		},

		getData() {
			return {
				name: DOM.newInstanceName.value,
				url: DOM.newInstanceField.value,
			};
		},
	},
};

const Logic = {
	// Logic methods
	init() {
		// Look for stored instances in local storage
		const localInstances = localStorage.getItem('instances');
		if (localInstances) {
			State.updateInstances(JSON.parse(localInstances));
		}
		UI.updateInstances(State.instances);
	},

	addInstance(instance) {
		State.addInstance(instance);
		UI.addInstance(instance);

		// Dirty work
		UI.addInstanceForm.reset();
		UI.addInstanceForm.close();
	},

	removeInstance(id) {
		State.removeInstance(id);
		UI.removeInstance(id);
	},
};

// Event Listeners
DOM.addInstanceButton.addEventListener('click', UI.addInstanceForm.toggle);

DOM.addInstanceForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = UI.addInstanceForm.getData();
	console.log(formData);

	if (!formData.name || !formData.url) {
		return console.log('Name and url are required');
	}

	const newInstance = {
		id: Utils.randomId(),
		...formData,
	};

	Logic.addInstance(newInstance);
});

DOM.instances.addEventListener('click', (event) => {
	const instance = event.target.closest('.instance');
	if (instance) {
		// console.log(instance.id);
		Logic.removeInstance(instance.id);
	}
});

window.addEventListener('beforeunload', (event) => {
	// Update the localStorage before leaving the page
	localStorage.setItem('instances', JSON.stringify(State.instances));
});

// Initialization
Logic.init();
