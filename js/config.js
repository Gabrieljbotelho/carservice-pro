/**
 * CarService Pro - Configuração
 * 
 * ⚠️  IMPORTANTE: Este arquivo está no .gitignore e NÃO deve ser commitado!
 */

const CONFIG = {
    // URL do seu projeto (está correta)
    SUPABASE_URL: 'https://gnzwannepurpyryxabkf.supabase.co',
    
    // SUBSTITUA pela sua chave anon real (veja instruções abaixo)
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imduendhbm5lcHVycHlyeXhhYmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODIwMjMsImV4cCI6MjA4NzM1ODAyM30.KplHmU3h3ZwaSLgs6tse6dcImEk-l8EDpm6zR9LPZhI',
    
    APP_NAME: 'CarService Pro',
    VERSION: '1.0.0'
};

// Validação
if (CONFIG.SUPABASE_KEY === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imduendhbm5lcHVycHlyeXhhYmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODIwMjMsImV4cCI6MjA4NzM1ODAyM30.KplHmU3h3ZwaSLgs6tse6dcImEk-l8EDpm6zR9LPZhI') {
    console.error('❌ ERRO: Configure sua chave do Supabase em js/config.js');
}
