import nodemailer from 'nodemailer'

export async function POST(request: Request) {
	const body = await request.json()
	const { email, firstname, lastname, phone, message } = body

	const transporter = nodemailer.createTransport({
		auth: {
			pass: process.env.GMAIL_PASS, // your google app password
			// https://www.youtube.com/watch?v=t2LvPXHLrek&t=1062s => get variable google
			user: process.env.GMAIL_USER // your google email
		},
		service: 'gmail'
	})

	try {
		await transporter.sendMail({
			from: `Gabon Decouverte <${process.env.GMAIL_USER}>`,
			html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p style="margin-top: 20px">Bonjour Pri, vous avez une nouvelle demande d'information.<br/>
      Voici toutes les informations nécessaire à une nouvelle prise de contact<br/><br/>
      Bonne journée :)
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <p><strong>Nom :</strong> ${lastname}</p>
      <p><strong>Prénom :</strong> ${firstname}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Message :</strong> ${message}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777; font-style: bold;">Cet e-mail est envoyé de façon automatique. Il n'est donc pas possible d'y repondre en retour.</p>
      <p style="font-size: 12px; color: #777;">Cet email est généré automatiquement depuis le site.</p>
      
    </div>
  `,
			subject: "Demande d'information - Gabon Decouverte",
			text: `
    Nouvelle demande d'information reçue

    Nom : ${lastname}
    Prénom : ${firstname}
    Email : ${email}
    Téléphone : ${phone}
    Message : ${message}
  `,
			to: process.env.GMAIL_USER
		})

		await transporter.sendMail({
			from: `Gabon Decouverte <${process.env.GMAIL_USER}>`,
			html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #c1121f;">Merci pour votre message</h2>
        <p>Bonjour ${lastname},</p>
         <p>Nous vous confirmons la réception de votre message transmis via notre formulaire de contact.<br/>
         Un membre de notre équipe prendra connaissance de votre demande et vous répondra dans les meilleurs délais.
        </p>
  
        <h2 style="margin-top: 20px;">Récapitulatif de votre demande :</h2>
        <ul style="padding-left: 20px;">
          <li><strong>Nom :</strong> ${firstname}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Message :</strong> ${message}</li>
        </ul>
  
         <p style="margin-top: 20px;">
          Merci de l’intérêt que vous portez à notre association. Nous reviendrons vers vous dès que possible.
         </p>
  
         <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
  
  <p style="font-size: 12px; color: #777; line-height: 1.4;">
    Cet email a été généré automatiquement, merci de ne pas y répondre.  
  </p>
      </div>
    `,
			subject: "Confirmation de votre demande d'information - Gabon Decouverte",
			text: `  
      Bonjour ${lastname},
  
      Nous vous confirmons la réception de votre message transmis via notre formulaire de contact.
  
      Détails de votre demande d'information :
      - Nom : ${lastname}
      - Téléphone : ${phone}
      - Email : ${email}
      - Message : ${message}
  
      Merci de l’intérêt que vous portez à Gabon Decouverte. Nous reviendrons vers vous dès que possible.
    `,
			to: email
		})

		return new Response(JSON.stringify({ message: 'Email envoyé avec succès' }), {
			status: 200
		})
	} catch (error) {
		console.error('Erreur email:', error)
		return new Response(JSON.stringify({ message: "Erreur lors de l'envoi des emails" }), {
			status: 500
		})
	}
}
