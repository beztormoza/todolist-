function checkState(elem) {
	let parent = elem.parentNode.parentNode;
	let btnState = parent.querySelectorAll('.point-panel button');
	if (elem.checked) {
		for (let i = 0; i < btnState.length; i++) {
			if (i == 0) {
				btnState[i].disabled = true;
			}
		}
		parent.classList.add("_point-checked");
	} else {
		for (let i = 0; i < btnState.length; i++) {
			if (i == 0) {
				btnState[i].disabled = false;
			}
		}
		parent.classList.remove("_point-checked");
	}
	save();
}

function editPoint(elem) {
	let parent = elem.parentNode.parentNode;
	let txtNode = parent.querySelector('label span');
	let newTxt = prompt("Enter new text, please", "");
	if (!newTxt) return;
	txtNode.textContent = newTxt;
	save();
}

function deletePoint(elem) {
	let parent = elem.parentNode.parentNode;
	if (confirm('Are you sure you want to delete this thing'))
		parent.parentNode.removeChild(parent);
	save();		
}

function cancelAdding() {
	let elem = document.getElementById('txtToPoint');
	elem.value = "";
}

function createNewpoint() {
	let txtOfThePoint = document.getElementById('txtToPoint');
	if (txtOfThePoint.value) {
		let point = document.createElement('div');
		point.setAttribute("class", "point");
		point.innerHTML = '<label>\n<input type="checkbox"' + 
						  'onclick="checkState(this)">\n' +
						  '<span>' + txtOfThePoint.value +'</span>\n</label>\n' +
						  '<div class="point-panel">\n' +
						  '<button id="editPoint" onclick="editPoint(this)">Edit</button>\n' +
						  '<button id="deletePoint" onclick="deletePoint(this)">Delete</button>\n</div>';
		let mainCont = document.querySelector('.to-do-list');
		mainCont.append(point);
		cancelAdding()
	}
	save();
}


function checkListState(elem) {
	let txtToPointFiel = document.getElementById('txtToPoint');
	txtToPointFiel.disabled = false;

	let cont = document.querySelector('.to-do-list');
	cont.innerHTML = "";
	if (localStorage.getItem(elem.id)) {
		cont.innerHTML = localStorage.getItem(elem.id);
	}
}


function createNewList() {
	let nameOfTheList = document.getElementById('nameOfTheList');
	let text = nameOfTheList.value;
	if (text) {
		let list = document.createElement('div');
		list.setAttribute("class", "list");
		let generateId = text.replace(/\s+/g, '').toLowerCase();
		list.innerHTML = '<input type="radio" id="' + generateId + '"' +
						 'name="lists" onclick="checkListState(this)">\n' +
						 '<label for="' +  '">' + text + '</label>';
		let mainCont = document.querySelector('.panel-side-body');		
		mainCont.append(list);

		//making copie of our lists to localStorage
		let meaningOfMainCont = mainCont.innerHTML;
		localStorage.setItem('listKeys', meaningOfMainCont);
	}
	nameOfTheList.value = "";
}

function clearAllLists() {
	let container = document.querySelector('.panel-side-body');
	container.innerHTML = "";
	localStorage.clear();
	let toDoList = document.querySelector('.to-do-list');
	toDoList.innerHTML = "";
}

function save() {
	let container = document.querySelector('.to-do-list');
	let arrOnpoints = container.children;
	
	let newArr = [];
	for (var i = 0; i < arrOnpoints.length; i++) {
		newArr.push(arrOnpoints[i].outerHTML.replace(/\s+/g, ''));
	}

	let keyLS = document.querySelector('.list input:checked');
	let meaning = container.innerHTML

	localStorage.setItem(keyLS.id, meaning);
}

 window.onload = function() {
 	let sideBarBody = document.querySelector('.panel-side-body');
 	sideBarBody.innerHTML = localStorage.getItem('listKeys');
 };


