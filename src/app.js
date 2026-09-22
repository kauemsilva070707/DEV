import { TodoStore } from './store.js';

const store = new TodoStore();
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');

function render() {
  const tarefas = store.listar();
  list.replaceChildren();
  emptyState.hidden = tarefas.length > 0;

  for (const tarefa of tarefas) {
    const item = document.createElement('li');
    item.className = `todo ${tarefa.concluida ? 'todo--done' : ''}`;
    item.dataset.id = tarefa.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    checkbox.setAttribute('aria-label', `Marcar ${tarefa.titulo} como concluída`);
    checkbox.addEventListener('change', () => {
      store.alternar(tarefa.id);
      render();
    });

    const title = document.createElement('span');
    title.textContent = tarefa.titulo;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.textContent = 'Remover';
    remove.setAttribute('aria-label', `Remover ${tarefa.titulo}`);
    remove.addEventListener('click', () => {
      store.remover(tarefa.id);
      render();
    });

    item.append(checkbox, title, remove);
    list.append(item);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const tarefa = store.adicionar(input.value);
  if (!tarefa) return;
  input.value = '';
  input.focus();
  render();
});

render();
