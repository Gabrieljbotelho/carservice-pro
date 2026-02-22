/**
 * CarService Pro - Configuração
 * 
 * ⚠️  IMPORTANTE: Este arquivo está no .gitignore e NÃO deve ser commitado!
 */

const CONFIG = {
    // URL do seu projeto (está correta)
    SUPABASE_URL: 'https://gnzwannepurpyryxabkf.supabase.co',
    
    // SUBSTITUA pela sua chave anon real (veja instruções abaixo)
    SUPABASE_KEY: 'sua-chave-anon-aqui',
    
    APP_NAME: 'CarService Pro',
    VERSION: '1.0.0'
};

// Validação
if (CONFIG.SUPABASE_KEY === 'sua-chave-anon-aqui') {
    console.error('❌ ERRO: Configure sua chave do Supabase em js/config.js');
}
