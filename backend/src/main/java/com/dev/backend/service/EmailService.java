package com.dev.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")
	private String remetente;

	public String enviarEmailTxt(String destinatario, String titulo,String menssagem) {
		try {
			SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
			simpleMailMessage.setFrom(remetente);
			simpleMailMessage.setTo(destinatario);
			simpleMailMessage.setSubject(titulo);
			simpleMailMessage.setText(menssagem);

			javaMailSender.send(simpleMailMessage);
			return "Email enviado";
		} catch (Exception ex) {
			return "Erro ao enviar o E-mail";
		}
	}
}
