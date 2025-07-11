using Job_Site.Models;
using System.Net.Mail;
using System.Net;

namespace Job_Site
{
	public class Network
	{
		public static int Send_Message(string mail, int code)
		{

			string frame = ( $@"<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <title>Your Page Title</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }}
        header {{
            
            color: #000;
            width: 400px;
            padding: 40px;
            margin: auto;
            height: 200px;
            text-align: center;
        }}
		
   </style>
    

</head>
<body>
    <header>
        <h1>JobGate.az</h1>
        <h2>Verification Code</h2>
{Convert.ToString(code)}
    </header>

</body>
</html>
" );


			MailMessage message = new MailMessage();
			message.From = new MailAddress("cs.homework.test@gmail.com");
			message.To.Add(mail);
			message.Subject = "JobGate.az";
			message.Body = frame;
			message.IsBodyHtml = true;


			SmtpClient sms = new SmtpClient();
			sms.Port = 587;
			sms.Host = "smtp.gmail.com";
			sms.EnableSsl = true;
			sms.Credentials = new NetworkCredential("cs.homework.test@gmail.com", "v p t m p x r g d k p b l g b r");
			sms.Send(message);

			return code;

		}

		public static bool Send_Message(string mail, string my_information)
		{
			MailMessage message = new MailMessage();
			message.From = new MailAddress("cs.homework.test@gmail.com");
			message.To.Add(mail);
			message.Subject = "JobGate.az";
			message.Body = my_information;
			message.IsBodyHtml = true;


			SmtpClient sms = new SmtpClient();
			sms.Port = 587;
			sms.Host = "smtp.gmail.com";
			sms.EnableSsl = true;
			sms.Credentials = new NetworkCredential("cs.homework.test@gmail.com", "v p t m p x r g d k p b l g b r");
			sms.Send(message);

			return true;

		}

		//		public static void Send_Message(Worker list, string mail)
		//		{

		//			string info = ( $@"<!DOCTYPE html>
		//<html>
		//<head>
		//<style>
		//table {{font - family: arial, sans-serif;
		//  border-collapse: collapse;
		//  width: 120%;

		//		}}
		//td {{border: 2px solid #dddddd;
		//  text-align: left;
		//  padding: 12px;
		//}}


		// th {{border: 2px solid #dddddd;
		//  text-align: left;
		//  padding: 12px;
		//}}

		//tr:nth-child(even) {{background - color: #dddddd;
		//}}
		//</style>
		//</head>
		//<body>

		//<h2>CV</h2>

		//<table>
		//  <tr>
		//    <th>Umumi Melumat</th>

		//  </tr>
		//  <tr>
		//    <td>AD</td>
		//    <td>{list.Name}</td>

		//  </tr>
		//  <tr>
		//    <td>Soyad</td>
		//    <td>{list.Surname}</td>

		//  </tr>
		//  <tr>
		//    <td>Yas</td>
		//    <td>{list.Age}</td>

		//  </tr>
		//  <tr>
		//    <td>Telefon</td>
		//    <td>{list.Phone}</td>

		//  </tr>
		//  <tr>
		//    <td>Mail</td>
		//    <td>{list.Email}</td>

		//  </tr>
		//  <tr>
		//    <td>Ixtisas</td>
		//    <td>{list.Cv.Ixtisas}</td>

		//  </tr>


		//    <tr>
		//    <td>Mekteb</td>
		//    <td>{list.Cv.Oxudugu_mekteb}</td>

		//  </tr>

		//    <tr>
		//    <td>Uni Bali</td>
		//    <td>{list.Cv.Uni_qebul_bali}</td>

		//  </tr>

		//    <tr>
		//    <td>Islediyi yerler</td>
		//    <td>{list.Cv.Companies}</td>

		//  </tr>

		//    <tr>
		//    <td>Diplom</td>
		//    <td>{list.Cv.Ferqlenme_Diplomu}</td>

		//  </tr>

		//    <tr>
		//    <td>Xarici Diller</td>
		//    <td>{list.Cv.Bildiyi_xarici_dil}</td>


		//  </tr>
		//</table>

		//</body>
		//</html>

		//" );

		//			MailMessage message = new MailMessage();
		//			message.From = new MailAddress("cs.homework.test@gmail.com");
		//			message.To.Add(mail);
		//			message.Subject = "Boss.Az";
		//			message.Body = info;
		//			message.IsBodyHtml = true;


		//			SmtpClient sms = new SmtpClient();
		//			sms.Port = 587;
		//			sms.Host = "smtp.gmail.com";
		//			sms.EnableSsl = true;
		//			sms.Credentials = new NetworkCredential("cs.homework.test@gmail.com", "v p t m p x r g d k p b l g b r");
		//			sms.Send(message);

		//		}

		//	}
	}
}
