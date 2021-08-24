const DOM = {
	// DOM Elements
	instances: document.getElementById('instances'),
	addInstanceForm: document.getElementById('add-instance-form'),
	addInstanceButton: document.getElementById('add-instance'),
};

const Utils = {
	// Utility methods
};

const UI = {
	// UI methods
	addInstance({ name, url }) {
		const instanceHTML = `<div class="instance">
				<h3 class="instance__name">${name}</h3>
				<iframe
					class="instance__iframe"
					src="${url}"
					frameborder="0"
				></iframe>`;
		DOM.instances.insertAdjacentHTML('beforeend', instanceHTML);
	},

	toggleAddInstanceForm() {
		DOM.addInstanceForm.classList.toggle('hidden');
	},
};

const Logic = {
	// Logic methods
};

// Event Listeners
DOM.addInstanceButton.addEventListener('click', UI.toggleAddInstanceForm);
