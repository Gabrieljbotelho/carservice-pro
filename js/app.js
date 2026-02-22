/**
 * CarService Pro - Aplicação Principal
 * 
 * Este arquivo contém toda a lógica do aplicativo.
 * As credenciais são carregadas de js/config.js (não commitado)
 */

// ==========================================
// INICIALIZAÇÃO E CONFIGURAÇÃO
// ==========================================

let supabaseClient = null;
let isConnected = false;
let localData = { clientes: [], agendamentos: [], orcamentos: [] };

// Verificar se CONFIG existe (carregado de config.js)
if (typeof CONFIG === 'undefined') {
    console.error('❌ Arquivo config.js não encontrado!');
    alert('Erro: Crie o arquivo js/config.js baseado no config.example.js');
}

document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    initializeApp();
});

async function initializeApp() {
    if (typeof CONFIG === 'undefined') {
        showToast('Erro: Configuração não encontrada', 'error');
        document.getElementById('loadingOverlay').classList.add('hidden');
        return;
    }
    await connectToSupabase();
}

// ==========================================
// CONEXÃO SUPABASE
// ==========================================

async function connectToSupabase() {
    updateConnectionUI('connecting', 'Conectando...');
    
    try {
        const { createClient } = supabase;
        supabaseClient = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        
        // Testar conexão
        const { data, error } = await supabaseClient
            .from('clientes')
            .select('*')
            .limit(1);
        
        if (error) {
            if (error.message.includes('does not exist') || error.code === '42P01') {
                showToast('Criando tabelas...', 'info');
                await createTables();
                return;
            }
            throw error;
        }
        
        isConnected = true;
        updateConnectionUI('connected', 'Conectado');
        showToast('✅ Conectado ao Supabase!', 'success');
        
        await loadAllData();
        
    } catch (error) {
        console.error('Erro:', error);
        isConnected = false;
        updateConnectionUI('error', 'Erro: ' + error.message);
        showToast('❌ ' + error.message, 'error');
        loadMockData();
    } finally {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }
}

async function createTables() {
    showToast('Verifique o SQL Editor do Supabase', 'warning');
    setTimeout(() => {
        alert(`Execute este SQL no Supabase > SQL Editor:

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT,
    veiculo TEXT,
    placa TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    servico TEXT NOT NULL,
    status TEXT DEFAULT 'agendado',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orcamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    servico TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    validade DATE,
    status TEXT DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE orcamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON clientes FOR ALL USING (true);
CREATE POLICY "Allow all" ON agendamentos FOR ALL USING (true);
CREATE POLICY "Allow all" ON orcamentos FOR ALL USING (true);`);
    }, 500);
}

// ==========================================
// OPERAÇÕES CRUD
// ==========================================

async function loadAllData() {
    document.getElementById('syncBadge').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sincronizando...';
    await Promise.all([loadClientes(), loadAgendamentos(), loadOrcamentos()]);
    updateDashboard();
    updateConnectionUI('connected', 'Conectado');
}

async function loadClientes() {
    try {
        const { data, error } = await supabaseClient
            .from('clientes')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        localData.clientes = data || [];
        renderClientesTable();
        updateClienteSelects();
    } catch (error) {
        console.error('Erro clientes:', error);
    }
}

async function loadAgendamentos() {
    try {
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .select('*, clientes(nome, veiculo)')
            .order('data', { ascending: true })
            .order('hora', { ascending: true });
        
        if (error) throw error;
        localData.agendamentos = data || [];
        renderAgendamentosTable();
    } catch (error) {
        console.error('Erro agendamentos:', error);
    }
}

async function loadOrcamentos() {
    try {
        const { data, error } = await supabaseClient
            .from('orcamentos')
            .select('*, clientes(nome)')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        localData.orcamentos = data || [];
        renderOrcamentosTable();
    } catch (error) {
        console.error('Erro orçamentos:', error);
    }
}

async function saveCliente(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const cliente = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        email: formData.get('email') || null,
        veiculo: formData.get('veiculo') || null,
        placa: formData.get('placa') || null
    };
    
    try {
        const { data, error } = await supabaseClient
            .from('clientes')
            .insert([cliente])
            .select()
            .single();
        
        if (error) throw error;
        
        localData.clientes.unshift(data);
        showToast('✅ Cliente salvo!', 'success');
        closeModal('cliente');
        form.reset();
        renderClientesTable();
        updateClienteSelects();
        updateDashboard();
    } catch (error) {
        showToast('❌ Erro: ' + error.message, 'error');
    }
}

async function saveAgendamento(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const agendamento = {
        cliente_id: parseInt(formData.get('cliente_id')),
        data: formData.get('data'),
        hora: formData.get('hora'),
        servico: formData.get('servico'),
        status: 'agendado'
    };
    
    try {
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .insert([agendamento])
            .select('*, clientes(nome, veiculo)')
            .single();
        
        if (error) throw error;
        
        localData.agendamentos.push(data);
        showToast('✅ Agendamento criado!', 'success');
        closeModal('agendamento');
        form.reset();
        renderAgendamentosTable();
        updateDashboard();
    } catch (error) {
        showToast('❌ Erro: ' + error.message, 'error');
    }
}

async function saveOrcamento(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const orcamento = {
        cliente_id: parseInt(formData.get('cliente_id')),
        servico: formData.get('servico'),
        valor: parseFloat(formData.get('valor')),
        validade: formData.get('validade') || null,
        status: 'pendente'
    };
    
    try {
        const { data, error } = await supabaseClient
            .from('orcamentos')
            .insert([orcamento])
            .select('*, clientes(nome)')
            .single();
        
        if (error) throw error;
        
        localData.orcamentos.unshift(data);
        showToast('✅ Orçamento gerado!', 'success');
        closeModal('orcamento');
        form.reset();
        renderOrcamentosTable();
        updateDashboard();
    } catch (error) {
        showToast('❌ Erro: ' + error.message, 'error');
    }
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

function renderClientesTable() {
    const tbody = document.querySelector('#clientesTable tbody');
    if (localData.clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum cliente cadastrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = localData.clientes.map(c => `
        <tr>
            <td>${c.nome}</td>
            <td>${c.telefone}</td>
            <td>${c.email || '-'}</td>
            <td>${c.veiculo || '-'}</td>
            <td>
                <button class="btn-details" onclick="deleteItem('clientes', ${c.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderAgendamentosTable() {
    const tbody = document.querySelector('#agendaTable tbody');
    if (localData.agendamentos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum agendamento</td></tr>';
        return;
    }
    
    tbody.innerHTML = localData.agendamentos.map(a => {
        const cliente = a.clientes || localData.clientes.find(c => c.id == a.cliente_id);
        return `
        <tr>
            <td>${formatDate(a.data)} ${a.hora}</td>
            <td>${cliente ? cliente.nome : 'Cliente'}</td>
            <td>${a.servico}</td>
            <td><span class="status-badge ${getStatusClass(a.status)}">${formatStatus(a.status)}</span></td>
            <td>
                <select onchange="updateStatus('agendamentos', ${a.id}, this.value)" class="btn-details">
                    <option value="">Alterar...</option>
                    <option value="agendado">Agendado</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            </td>
        </tr>
    `}).join('');
}

function renderOrcamentosTable() {
    const tbody = document.querySelector('#orcamentosTable tbody');
    if (localData.orcamentos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhum orçamento</td></tr>';
        return;
    }
    
    tbody.innerHTML = localData.orcamentos.map(o => {
        const cliente = o.clientes || localData.clientes.find(c => c.id == o.cliente_id);
        return `
        <tr>
            <td>#${o.id}</td>
            <td>${cliente ? cliente.nome : 'Cliente'}</td>
            <td>${o.servico}</td>
            <td>R$ ${parseFloat(o.valor).toFixed(2)}</td>
            <td><span class="status-badge ${getStatusClass(o.status)}">${formatStatus(o.status)}</span></td>
            <td>
                <select onchange="updateStatus('orcamentos', ${o.id}, this.value)" class="btn-details">
                    <option value="">Alterar...</option>
                    <option value="pendente">Pendente</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="pago">Pago</option>
                    <option value="rejeitado">Rejeitado</option>
                </select>
            </td>
        </tr>
    `}).join('');
}

function updateDashboard() {
    document.getElementById('statClientes').textContent = localData.clientes.length;
    
    const hoje = new Date().toISOString().split('T')[0];
    const agendamentosHoje = localData.agendamentos.filter(a => a.data === hoje).length;
    document.getElementById('statAgendamentos').textContent = agendamentosHoje;
    
    const pendentes = localData.orcamentos.filter(o => o.status === 'pendente').length;
    document.getElementById('statOrcamentos').textContent = pendentes;
    
    const receita = localData.orcamentos
        .filter(o => o.status === 'aprovado' || o.status === 'pago')
        .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
    document.getElementById('statReceita').textContent = `R$ ${(receita / 1000).toFixed(1)}k`;
    
    // Serviços recentes
    const recentEl = document.getElementById('recentServices');
    const recentes = localData.agendamentos.slice(-3).reverse();
    
    if (recentes.length > 0) {
        recentEl.innerHTML = recentes.map(a => {
            const cliente = a.clientes || localData.clientes.find(c => c.id == a.cliente_id);
            return `
            <div class="service-item">
                <div class="service-icon"><i class="fas fa-wrench"></i></div>
                <div class="service-info">
                    <h4>${cliente ? cliente.nome : 'Cliente'}</h4>
                    <p>${a.servico}<br>${cliente ? cliente.veiculo : ''}</p>
                </div>
                <div class="service-meta">
                    <div class="service-time">${formatDate(a.data)}</div>
                    <span class="status-badge ${getStatusClass(a.status)}">${formatStatus(a.status)}</span>
                </div>
            </div>
        `}).join('');
    } else {
        recentEl.innerHTML = '<div class="empty-state"><i class="fas fa-wrench"></i><p>Nenhum serviço recente</p></div>';
    }
    
    // Próximos agendamentos
    const upcomingEl = document.getElementById('upcomingAppointments');
    const futuros = localData.agendamentos
        .filter(a => new Date(a.data + 'T' + a.hora) > new Date())
        .slice(0, 3);
    
    if (futuros.length > 0) {
        upcomingEl.innerHTML = futuros.map(a => {
            const cliente = a.clientes || localData.clientes.find(c => c.id == a.cliente_id);
            return `
            <div class="appointment-item">
                <div class="appointment-time">
                    <span class="day">${a.hora.split(':')[0]}</span>
                    <span class="month">${a.hora.split(':')[1]}</span>
                </div>
                <div class="appointment-info">
                    <h4>${cliente ? cliente.nome : 'Cliente'}</h4>
                    <p>${a.servico}<br>${cliente ? cliente.veiculo : ''}</p>
                </div>
                <button class="btn-details">Detalhes</button>
            </div>
        `}).join('');
    } else {
        upcomingEl.innerHTML = '<div class="empty-state"><i class="fas fa-calendar"></i><p>Nenhum agendamento futuro</p></div>';
    }
}

function updateClienteSelects() {
    const options = localData.clientes.map(c => 
        `<option value="${c.id}">${c.nome} - ${c.veiculo || 'Sem veículo'}</option>`
    ).join('');
    
    const defaultOpt = '<option value="">Selecione um cliente</option>';
    document.getElementById('selectCliente').innerHTML = defaultOpt + options;
    document.getElementById('selectClienteOrc').innerHTML = defaultOpt + options;
}

// ==========================================
// UTILITÁRIOS
// ==========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateConnectionUI(status, text) {
    const bar = document.getElementById('connectionBar');
    const badge = document.getElementById('connectionBadge');
    const info = document.getElementById('connectionInfo');
    
    bar.className = 'connection-bar ' + status;
    
    const icons = {
        connected: 'check-circle',
        connecting: 'spinner fa-spin',
        error: 'exclamation-circle'
    };
    
    badge.className = 'connection-badge ' + (status === 'connected' ? 'connected' : 'offline');
    badge.innerHTML = `<i class="fas fa-${icons[status] || 'circle'}"></i> ${text}`;
    info.textContent = text;
}

function openModal(type) {
    document.getElementById(`modal${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
    const hoje = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = hoje;
    });
}

function closeModal(type) {
    document.getElementById(`modal${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.remove('active');
}

function showSection(section) {
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
    document.getElementById(`${section}-section`).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
}

async function refreshData() {
    const icon = document.getElementById('syncIcon');
    icon.classList.add('fa-spin');
    await loadAllData();
    icon.classList.remove('fa-spin');
    showToast('🔄 Dados atualizados!', 'success');
}

function loadMockData() {
    localData = {
        clientes: [
            { id: 1, nome: 'João Silva', telefone: '(11) 98765-4321', email: 'joao@email.com', veiculo: 'Honda Civic 2020', placa: 'ABC-1234', created_at: new Date().toISOString() },
            { id: 2, nome: 'Maria Santos', telefone: '(11) 98765-4322', email: 'maria@email.com', veiculo: 'Toyota Corolla 2019', placa: 'DEF-5678', created_at: new Date().toISOString() }
        ],
        agendamentos: [
            { id: 1, cliente_id: 1, clientes: { nome: 'João Silva', veiculo: 'Honda Civic 2020' }, data: new Date().toISOString().split('T')[0], hora: '09:00', servico: 'Troca de óleo', status: 'concluido', created_at: new Date().toISOString() }
        ],
        orcamentos: [
            { id: 1, cliente_id: 1, clientes: { nome: 'João Silva' }, servico: 'Freios completos', valor: 850.00, status: 'pendente', created_at: new Date().toISOString() }
        ]
    };
    
    updateConnectionUI('error', 'Modo Offline');
    renderClientesTable();
    renderAgendamentosTable();
    renderOrcamentosTable();
    updateClienteSelects();
    updateDashboard();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [ano, mes, dia] = dateStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

function formatStatus(status) {
    const map = {
        'agendado': 'Agendado',
        'em_andamento': 'Em andamento',
        'concluido': 'Concluído',
        'cancelado': 'Cancelado',
        'pendente': 'Pendente',
        'aprovado': 'Aprovado',
        'rejeitado': 'Rejeitado',
        'pago': 'Pago'
    };
    return map[status] || status;
}

function getStatusClass(status) {
    const map = {
        'concluido': 'completed',
        'aprovado': 'completed',
        'pago': 'completed',
        'em_andamento': 'progress',
        'agendado': 'pending',
        'pendente': 'pending',
        'cancelado': 'pending',
        'rejeitado': 'pending'
    };
    return map[status] || 'pending';
}

function updateDate() {
    const hoje = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const optionsFull = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    
    document.getElementById('currentDate').textContent = hoje.toLocaleDateString('pt-BR', options);
    document.getElementById('fullDate').textContent = hoje.toLocaleDateString('pt-BR', optionsFull);
}

async function deleteItem(tabela, id) {
    if (!confirm('Confirmar exclusão?')) return;
    
    try {
        const { error } = await supabaseClient
            .from(tabela)
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        localData[tabela] = localData[tabela].filter(item => item.id !== id);
        showToast('🗑️ Excluído!', 'success');
        
        if (tabela === 'clientes') {
            renderClientesTable();
            updateClienteSelects();
        }
        if (tabela === 'agendamentos') renderAgendamentosTable();
        if (tabela === 'orcamentos') renderOrcamentosTable();
        updateDashboard();
    } catch (error) {
        showToast('❌ Erro: ' + error.message, 'error');
    }
}

async function updateStatus(tabela, id, novoStatus) {
    if (!novoStatus) return;
    
    try {
        const { error } = await supabaseClient
            .from(tabela)
            .update({ status: novoStatus })
            .eq('id', id);
        
        if (error) throw error;
        
        const item = localData[tabela].find(i => i.id == id);
        if (item) item.status = novoStatus;
        
        showToast('✅ Status atualizado!', 'success');
        updateDashboard();
        
        if (tabela === 'agendamentos') renderAgendamentosTable();
        if (tabela === 'orcamentos') renderOrcamentosTable();
    } catch (error) {
        showToast('❌ Erro: ' + error.message, 'error');
    }
}
// ==========================================
// WHATSAPP INTEGRATION
// ==========================================

let selectedWhatsAppClient = null;
let whatsAppMessages = [];

function loadWhatsAppChats() {
    const chatList = document.getElementById('chatList');
    
    if (localData.clientes.length === 0) {
        chatList.innerHTML = `
            <div class="empty-state" style="padding: 40px 20px;">
                <i class="fas fa-users" style="font-size: 32px; margin-bottom: 12px;"></i>
                <p>Nenhum cliente cadastrado</p>
                <button class="btn-primary" style="margin-top: 16px;" onclick="openModal('cliente')">
                    <i class="fas fa-plus"></i> Cadastrar Cliente
                </button>
            </div>
        `;
        return;
    }
    
    chatList.innerHTML = localData.clientes.map(c => `
        <div class="chat-item" onclick="selectWhatsAppClient(${c.id})" data-id="${c.id}">
            <div class="chat-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="chat-preview">
                <h4>${c.nome}</h4>
                <p>${c.veiculo || 'Sem veículo cadastrado'}</p>
            </div>
            <div class="chat-meta">
                <div class="chat-time">${formatPhone(c.telefone)}</div>
            </div>
        </div>
    `).join('');
}

function selectWhatsAppClient(clientId) {
    selectedWhatsAppClient = localData.clientes.find(c => c.id === clientId);
    
    // Atualizar UI
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.id) === clientId) {
            item.classList.add('active');
        }
    });
    
    document.getElementById('chatName').textContent = selectedWhatsAppClient.nome;
    document.getElementById('chatPhone').textContent = formatPhone(selectedWhatsAppClient.telefone);
    
    // Carregar mensagens do histórico (local)
    loadWhatsAppMessages(clientId);
}

function loadWhatsAppMessages(clientId) {
    const container = document.getElementById('chatMessages');
    const messages = whatsAppMessages.filter(m => m.cliente_id === clientId);
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); margin-top: 40px;">
                <i class="fab fa-whatsapp" style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;"></i>
                <p>Inicie a conversa com ${selectedWhatsAppClient?.nome || 'o cliente'}</p>
                <p style="font-size: 12px; margin-top: 8px;">Use os templates acima ou digite uma mensagem</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(m => `
        <div class="message ${m.tipo}">
            ${m.texto}
            <div class="message-time">
                ${formatTime(m.created_at)}
                ${m.tipo === 'sent' ? '<i class="fas fa-check-double message-status"></i>' : ''}
            </div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendWhatsAppMessage() {
    const input = document.getElementById('messageInput');
    const texto = input.value.trim();
    
    if (!texto) return;
    if (!selectedWhatsAppClient) {
        showToast('Selecione um cliente primeiro', 'warning');
        return;
    }
    
    // Limpar caracteres especiais do telefone
    const phone = selectedWhatsAppClient.telefone.replace(/\D/g, '');
    
    if (phone.length < 10) {
        showToast('Número de telefone inválido', 'error');
        return;
    }
    
    // Salvar mensagem no histórico local
    const mensagem = {
        id: Date.now(),
        cliente_id: selectedWhatsAppClient.id,
        texto: texto,
        tipo: 'sent',
        created_at: new Date().toISOString()
    };
    
    whatsAppMessages.push(mensagem);
    
    // Abrir WhatsApp Web/App com mensagem pré-preenchida
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, '_blank');
    
    input.value = '';
    loadWhatsAppMessages(selectedWhatsAppClient.id);
    showToast('WhatsApp aberto com mensagem!', 'success');
}

function sendTemplate(tipo) {
    if (!selectedWhatsAppClient) {
        showToast('Selecione um cliente na lista ao lado', 'warning');
        // Tentar abrir sidebar no mobile
        document.querySelector('.chat-sidebar')?.classList.add('active');
        return;
    }
    
    const templates = {
        orcamento: `Olá ${selectedWhatsAppClient.nome}, tudo bem? 👋\n\nPassando para informar que o orçamento para o seu ${selectedWhatsAppClient.veiculo || 'veículo'} está pronto! 🚗\n\nAguardamos sua aprovação para iniciar o serviço. Qualquer dúvida estamos à disposição.\n\nObrigado pela preferência! 🙏`,
        
        agendamento: `Olá ${selectedWhatsAppClient.nome}, tudo bem? 👋\n\nConfirmamos seu agendamento para amanhã! 🗓️\n\n📍 Local: CarService Pro\n⏰ Horário: conforme combinado\n🚗 Veículo: ${selectedWhatsAppClient.veiculo || 'Seu veículo'}\n\nAguardamos você! 🚗💨`,
        
        pronto: `Olá ${selectedWhatsAppClient.nome}, ótimas notícias! 🎉\n\nSeu ${selectedWhatsAppClient.veiculo || 'veículo'} está pronto! ✅\n\nPode vir buscar quando quiser. Estamos abertos até às 18h.\n\nObrigado pela confiança! 🙏`,
        
        lembrete: `Olá ${selectedWhatsAppClient.nome}, tudo bem? 👋\n\nPassando para lembrar que seu agendamento é amanhã! 🗓️\n\nPodemos confirmar sua presença?\n\n✅ Confirmo\n❌ Preciso reagendar\n\nAguardamos seu retorno! 🚗`
    };
    
    document.getElementById('messageInput').value = templates[tipo];
    document.getElementById('messageInput').focus();
    
    showToast(`Template "${tipo}" carregado!`, 'info');
}

function openNativeWhatsApp() {
    if (!selectedWhatsAppClient) {
        showToast('Selecione um cliente primeiro', 'warning');
        return;
    }
    
    const phone = selectedWhatsAppClient.telefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}`, '_blank');
}

function openWhatsAppConfig() {
    showToast('Configurações do WhatsApp (em desenvolvimento)', 'info');
}

function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendWhatsAppMessage();
    }
}

function filterClients() {
    const search = document.getElementById('searchClient').value.toLowerCase();
    const items = document.querySelectorAll('.chat-item');
    
    items.forEach(item => {
        const name = item.querySelector('h4').textContent.toLowerCase();
        const vehicle = item.querySelector('p').textContent.toLowerCase();
        const match = name.includes(search) || vehicle.includes(search);
        item.style.display = match ? 'flex' : 'none';
    });
}

function formatPhone(phone) {
    if (!phone) return '--';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0,2)}) ${cleaned.slice(2,7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
        return `(${cleaned.slice(0,2)}) ${cleaned.slice(2,6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

function formatTime(dateStr) {
    if (!dateStr) return '--:--';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Sobrescrever showSection original para carregar WhatsApp
const originalShowSection = showSection;
showSection = function(section) {
    originalShowSection(section);
    if (section === 'mensagens') {
        setTimeout(loadWhatsAppChats, 100);
    }
};

// ==========================================
// CALENDÁRIO - NOVO
// ==========================================

let currentCalendarDate = new Date();
let selectedCalendarDate = null;

function initCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Atualizar título
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // Cabeçalho dias da semana
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekdays.forEach(day => {
        const el = document.createElement('div');
        el.className = 'calendar-weekday';
        el.textContent = day;
        grid.appendChild(el);
    });
    
    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const el = createCalendarDay(day, true);
        grid.appendChild(el);
    }
    
    // Dias do mês atual
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const isSelected = selectedCalendarDate === dateStr;
        
        const el = createCalendarDay(day, false, dateStr, isToday, isSelected);
        grid.appendChild(el);
    }
    
    // Dias do próximo mês
    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const el = createCalendarDay(day, true);
        grid.appendChild(el);
    }
}

function createCalendarDay(day, isOtherMonth, dateStr = null, isToday = false, isSelected = false) {
    const el = document.createElement('div');
    el.className = 'calendar-day';
    
    if (isOtherMonth) el.classList.add('other-month');
    if (isToday) el.classList.add('today');
    if (isSelected) el.classList.add('selected');
    
    el.innerHTML = `<span class="calendar-day-number">${day}</span>`;
    
    // Verificar se tem agendamentos neste dia
    if (dateStr && !isOtherMonth) {
        const hasAppointments = localData.agendamentos.some(a => a.data === dateStr);
        if (hasAppointments) {
            el.innerHTML += '<div class="calendar-day-badge"></div>';
        }
    }
    
    if (dateStr && !isOtherMonth) {
        el.onclick = () => selectCalendarDate(dateStr);
    }
    
    return el;
}

function selectCalendarDate(dateStr) {
    selectedCalendarDate = dateStr;
    renderCalendar(); // Re-render para atualizar seleção
    
    const [ano, mes, dia] = dateStr.split('-');
    const displayDate = `${dia}/${mes}/${ano}`;
    
    const container = document.getElementById('selectedDayAppointments');
    const appointments = localData.agendamentos.filter(a => a.data === dateStr);
    
    if (appointments.length === 0) {
        container.innerHTML = `<p style="color: var(--text-secondary);">Nenhum agendamento para ${displayDate}</p>`;
        return;
    }
    
    container.innerHTML = `
        <h4 style="margin-bottom: 12px; color: var(--primary);">${displayDate} - ${appointments.length} agendamento(s)</h4>
        <div class="service-list">
            ${appointments.map(a => {
                const cliente = a.clientes || localData.clientes.find(c => c.id == a.cliente_id);
                return `
                <div class="service-item">
                    <div class="service-icon"><i class="fas fa-clock"></i></div>
                    <div class="service-info">
                        <h4>${cliente ? cliente.nome : 'Cliente'}</h4>
                        <p>${a.servico} às ${a.hora}</p>
                    </div>
                    <span class="status-badge ${getStatusClass(a.status)}">${formatStatus(a.status)}</span>
                </div>
                `;
            }).join('')}
        </div>
    `;
}

function changeMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderCalendar();
}

// Inicializar calendário quando mostrar agenda
const originalShowSectionCalendar = showSection;
showSection = function(section) {
    originalShowSectionCalendar(section);
    if (section === 'agenda') {
        set
