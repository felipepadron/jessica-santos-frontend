// Configurações de integração prontas para uso
export const integrationConfig = {
  // WhatsApp Business API
  whatsapp: {
    baseUrl: 'https://graph.facebook.com/v18.0',
    phoneNumberId: process.env.WHATSAPP_PHONE_ID,
    accessToken: process.env.WHATSAPP_TOKEN,
    
    // Templates de mensagens prontos
    templates: {
      confirmacaoAgendamento: (cliente, agendamento) => `
🎉 *Agendamento Confirmado!*

Olá ${cliente.nome}! 

Seu ensaio foi agendado com sucesso:
📅 *Data:* ${new Date(agendamento.data).toLocaleDateString('pt-BR')}
⏰ *Horário:* ${agendamento.horario}
📸 *Serviço:* ${agendamento.servico}
💰 *Investimento:* R$ ${agendamento.valor.toLocaleString('pt-BR')}

📋 *Próximos passos:*
• Confirmaremos 24h antes
• Enviaremos dicas de preparação
• Qualquer dúvida, estou aqui!

Com carinho,
*Jéssica Santos* 💕
_Fotografia que toca a alma_
      `,
      
      lembrete24h: (cliente, agendamento) => `
⏰ *Lembrete: Ensaio amanhã!*

Oi ${cliente.nome}! 

Seu ensaio é amanhã:
📅 ${new Date(agendamento.data).toLocaleDateString('pt-BR')}
⏰ ${agendamento.horario}
📍 ${agendamento.local || 'Estúdio - Vila Mariana'}

💡 *Dicas finais:*
• Durma bem hoje
• Hidrate-se bastante
• Traga as roupas combinadas
• Chegue 15min antes

Estou ansiosa para nosso encontro! ✨

*Jéssica Santos*
      `,
      
      entregaFotos: (cliente, galeria) => `
📸 *Suas fotos estão prontas!*

${cliente.nome}, que alegria! 

Suas fotos ficaram lindas e já estão disponíveis:
🔗 ${galeria.link}
🔒 Senha: ${galeria.senha}

📋 *Informações importantes:*
• ${galeria.totalFotos} fotos em alta resolução
• Download disponível por 30 dias
• Qualquer dúvida, me chame!

Espero que ame o resultado tanto quanto eu! 💕

*Jéssica Santos*
      `
    },
    
    // Função para enviar mensagem
    async enviarMensagem(numero, mensagem) {
      try {
        const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: numero,
            type: 'text',
            text: { body: mensagem }
          })
        })
        
        return await response.json()
      } catch (error) {
        console.error('Erro ao enviar WhatsApp:', error)
        throw error
      }
    }
  },
  
  // Email Service
  email: {
    service: 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    
    // Templates de email prontos
    templates: {
      confirmacaoAgendamento: (cliente, agendamento) => ({
        subject: 'Agendamento Confirmado - Jéssica Santos Fotografia',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #d946ef, #a855f7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d946ef; }
              .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
              .btn { background: #d946ef; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Agendamento Confirmado!</h1>
                <p>Seu ensaio foi agendado com sucesso</p>
              </div>
              
              <div class="content">
                <p>Olá <strong>${cliente.nome}</strong>!</p>
                
                <p>Que alegria ter você conosco! Seu ensaio foi confirmado e estou ansiosa para nosso encontro.</p>
                
                <div class="info-box">
                  <h3>📋 Detalhes do Agendamento</h3>
                  <p><strong>📅 Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>⏰ Horário:</strong> ${agendamento.horario}</p>
                  <p><strong>📸 Serviço:</strong> ${agendamento.servico}</p>
                  <p><strong>💰 Investimento:</strong> R$ ${agendamento.valor.toLocaleString('pt-BR')}</p>
                  <p><strong>📍 Local:</strong> ${agendamento.local || 'Estúdio - Vila Mariana, SP'}</p>
                </div>
                
                <h3>💡 Próximos Passos</h3>
                <ul>
                  <li>Enviaremos um lembrete 24h antes do ensaio</li>
                  <li>Você receberá dicas de preparação por WhatsApp</li>
                  <li>As fotos ficam prontas em até 20 dias úteis</li>
                </ul>
                
                <p>Qualquer dúvida, estou sempre disponível!</p>
                
                <a href="https://wa.me/5511999999999" class="btn">💬 Falar no WhatsApp</a>
              </div>
              
              <div class="footer">
                <p><strong>Jéssica Santos</strong><br>
                Fotografia que toca a alma</p>
                <p>📱 (11) 99999-9999 | 📧 jessica@jessicasantos.com.br<br>
                📍 Vila Mariana, São Paulo - SP</p>
              </div>
            </div>
          </body>
          </html>
        `
      }),
      
      lembreteEnsaio: (cliente, agendamento) => ({
        subject: 'Lembrete: Seu ensaio é amanhã! - Jéssica Santos',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ec4899, #d946ef); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; }
              .tips-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ec4899; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Seu ensaio é amanhã!</h1>
                <p>Estou ansiosa para nosso encontro</p>
              </div>
              
              <div class="content">
                <p>Oi <strong>${cliente.nome}</strong>!</p>
                
                <p>Que emoção! Seu ensaio é amanhã e mal posso esperar para criar imagens lindas com você.</p>
                
                <div class="tips-box">
                  <h3>📋 Lembrete do Agendamento</h3>
                  <p><strong>📅 Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                  <p><strong>⏰ Horário:</strong> ${agendamento.horario}</p>
                  <p><strong>📍 Local:</strong> ${agendamento.local || 'Estúdio - Vila Mariana'}</p>
                </div>
                
                <div class="tips-box">
                  <h3>💡 Dicas Finais</h3>
                  <ul>
                    <li><strong>💤 Durma bem hoje</strong> - Um bom descanso faz toda diferença no resultado</li>
                    <li><strong>💧 Hidrate-se</strong> - Beba bastante água para uma pele radiante</li>
                    <li><strong>👗 Roupas</strong> - Traga as peças que combinamos</li>
                    <li><strong>⏰ Pontualidade</strong> - Chegue 15 minutos antes para relaxar</li>
                    <li><strong>😊 Venha feliz</strong> - Sua energia é o que mais importa!</li>
                  </ul>
                </div>
                
                <p>Estou preparando tudo com muito carinho para que seja um momento especial e único!</p>
                
                <p>Até amanhã! ✨</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    }
  },
  
  // Google Analytics 4
  analytics: {
    measurementId: process.env.VITE_GA_MEASUREMENT_ID,
    
    // Eventos personalizados
    events: {
      agendamento: (servico, valor) => ({
        event_name: 'agendamento_realizado',
        event_category: 'conversao',
        event_label: servico,
        value: valor,
        currency: 'BRL'
      }),
      
      calculadoraUso: (servico) => ({
        event_name: 'calculadora_uso',
        event_category: 'engagement',
        event_label: servico
      }),
      
      whatsappClick: () => ({
        event_name: 'whatsapp_click',
        event_category: 'contato',
        event_label: 'botao_whatsapp'
      }),
      
      galeriaVisita: (ensaio) => ({
        event_name: 'galeria_visita',
        event_category: 'engagement',
        event_label: ensaio
      })
    }
  },
  
  // Facebook Pixel
  facebookPixel: {
    pixelId: process.env.VITE_FACEBOOK_PIXEL_ID,
    
    // Eventos personalizados
    events: {
      agendamento: (valor) => ({
        event: 'Purchase',
        value: valor,
        currency: 'BRL',
        content_type: 'service',
        content_category: 'fotografia'
      }),
      
      interesseServico: (servico) => ({
        event: 'AddToCart',
        content_name: servico,
        content_category: 'fotografia'
      }),
      
      visualizacaoServico: (servico) => ({
        event: 'ViewContent',
        content_name: servico,
        content_category: 'fotografia'
      })
    }
  },
  
  // Stripe (Pagamentos)
  stripe: {
    publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    
    // Configurações de pagamento
    config: {
      currency: 'brl',
      paymentMethods: ['card', 'pix'],
      captureMethod: 'automatic',
      confirmationMethod: 'automatic'
    },
    
    // Produtos pré-configurados
    products: {
      ensaio_essencial: {
        name: 'Ensaio Essencial',
        price: 180000, // R$ 1.800,00 em centavos
        description: '1 hora de ensaio + 15 fotos editadas'
      },
      ensaio_intenso: {
        name: 'Ensaio Intenso',
        price: 240000, // R$ 2.400,00 em centavos
        description: '1h30 de ensaio + 25 fotos + vídeo'
      },
      ensaio_completo: {
        name: 'Ensaio Completo',
        price: 320000, // R$ 3.200,00 em centavos
        description: '2h30 de ensaio + 40 fotos + vídeo + kit'
      }
    }
  }
}

export default integrationConfig

