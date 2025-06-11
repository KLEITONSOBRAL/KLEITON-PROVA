let usuarios = [
    { id: 1, nome: "João", email: "joao@email.com" },
    { id: 2, nome: "Maria", email: "maria@email.com" }
];
let tarefas = [
    { id: 1, usuario_id: 1, descricao: "Comprar ingredientes", nome_setor: "Cozinha", prioridade: "alta", status: "a fazer" },
    { id: 2, usuario_id: 2, descricao: "Limpar máquinas", nome_setor: "Manutenção", prioridade: "média", status: "fazendo" }
];

function mostrarTela(tela) {
    document.getElementById('kanban').style.display = 'none';
    document.getElementById('cadastro-usuario').style.display = 'none';
    document.getElementById('cadastro-tarefa').style.display = 'none';
    document.getElementById(tela).style.display = 'block';
    if (tela === 'cadastro-tarefa') preencherUsuarios();
    if (tela === 'kanban') renderizarKanban();
}
window.mostrarTela = mostrarTela;

function preencherUsuarios() {
    const select = document.getElementById('usuario');
    select.innerHTML = '<option value="">Selecione o Usuário</option>';
    usuarios.forEach(u => {
        select.innerHTML += `<option value="${u.id}">${u.nome}</option>`;
    });
}

function renderizarKanban() {
    const colAFazer = document.getElementById('col-a-fazer');
    const colFazendo = document.getElementById('col-fazendo');
    const colPronto = document.getElementById('col-pronto');
    colAFazer.innerHTML = '';
    colFazendo.innerHTML = '';
    colPronto.innerHTML = '';

    tarefas.forEach(tarefa => {
        const usuario = usuarios.find(u => u.id == tarefa.usuario_id);
        const card = document.createElement('div');
        card.className = 'tarefa-card';
        card.innerHTML = `
            <strong>${tarefa.descricao}</strong><br>
            Setor: ${tarefa.nome_setor}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Usuário: ${usuario ? usuario.nome : ''}<br>
            <div>
                Status: 
                <select onchange="alterarStatus(${tarefa.id}, this.value)">
                    <option value="a fazer" ${tarefa.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                    <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                    <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
                </select>
                <button onclick="confirmarAlterarStatus(${tarefa.id})">Alterar Status</button>
            </div>
            <div class="acoes">
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        if (tarefa.status === 'a fazer') colAFazer.appendChild(card);
        else if (tarefa.status === 'fazendo') colFazendo.appendChild(card);
        else if (tarefa.status === 'pronto') colPronto.appendChild(card);
    });
}
window.onload = () => {
    mostrarTela('kanban');
    renderizarKanban();
};

document.getElementById('form-usuario').onsubmit = function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    if (!nome || !email) return;
    usuarios.push({ id: usuarios.length+1, nome, email });
    alert('Cadastro concluído com sucesso!');
    this.reset();
    mostrarTela('kanban');
};

document.getElementById('form-tarefa').onsubmit = function(e) {
    e.preventDefault();
    const usuario_id = parseInt(document.getElementById('usuario').value);
    const descricao = document.getElementById('descricao').value;
    const nome_setor = document.getElementById('nome_setor').value;
    const prioridade = document.getElementById('prioridade').value;
    if (!usuario_id || !descricao || !nome_setor || !prioridade) return;
    tarefas.push({
        id: tarefas.length+1,
        usuario_id,
        descricao,
        nome_setor,
        prioridade,
        status: 'a fazer'
    });
    alert('Cadastro concluído com sucesso!');
    this.reset();
    mostrarTela('kanban');
};

window.editarTarefa = function(id) {
    const tarefa = tarefas.find(t => t.id === id);
    mostrarTela('cadastro-tarefa');
    document.getElementById('usuario').value = tarefa.usuario_id;
    document.getElementById('descricao').value = tarefa.descricao;
    document.getElementById('nome_setor').value = tarefa.nome_setor;
    document.getElementById('prioridade').value = tarefa.prioridade;
    
};

window.excluirTarefa = function(id) {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
        tarefas = tarefas.filter(t => t.id !== id);
        renderizarKanban();
    }
};

let statusAlteracao = {};
window.alterarStatus = function(id, novoStatus) {
    statusAlteracao[id] = novoStatus;
};
window.confirmarAlterarStatus = function(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (statusAlteracao[id]) {
        tarefa.status = statusAlteracao[id];
        renderizarKanban();
    }
};