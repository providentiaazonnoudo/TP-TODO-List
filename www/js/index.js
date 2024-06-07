function formatDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

function ajouterTache() {
    const task = document.getElementById('task');
    const en_cours = document.getElementById('En cours');
    const terminees = document.getElementById('Terminees');

    if (task.value) {
        const taskList = document.getElementById('taskList');
        const newItem = document.createElement('li');
        const dateTime = formatDateTime();
        newItem.innerHTML = `${task.value} <span class="date-time">${dateTime}</span>`;
        en_cours.hidden = false;

        $(newItem).on('swiperight', function () {
            const newDateTime = formatDateTime();
            this.querySelector('.date-time').textContent = newDateTime;

            if (this.parentNode.id === "taskList") {
                document.getElementById('taskListDone').appendChild(this);
            } else {
                document.getElementById('taskList').appendChild(this);
            }
            terminees.hidden = false;
            $(taskList).listview('refresh');
            $('#taskListDone').listview('refresh');
        });

        $(newItem).on('swipeleft', function () {
            $(this).hide('slow', function () {
                this.remove();
            });
        });

        taskList.appendChild(newItem);
        $(taskList).listview('refresh');
        task.value = '';
        task.focus();
    }
}

function reinitialiser() {
    const task = document.getElementById('task');
    const taskList = document.getElementById('taskList');
    const taskListDone = document.getElementById('taskListDone');

    taskList.innerHTML = '';
    taskListDone.innerHTML = '';
    task.value = '';
    task.focus();
}
