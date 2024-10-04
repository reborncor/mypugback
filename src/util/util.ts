export const errorCode = 1;
export const blockedCode = 3;
export const successCode = 0;
export const errorCodeLucie = 403;
export const bannedCode = 6;
export const LUCIE = "lucie";

export const usernameInvalid = "nom d'utilisateur invalide";
export const passwordInvalid = "mot de passe invalide";
export const phoneNumberInvalid = "numéro de téléphone invalide";
export const emailInvalid = "Email invalide";
export const wrongPassword = "mot de passe incorrecte";
export const accountNotConnected = "Utilisateur non connecté";
export const accountDoesntExist = "L'utilisateur n'existe pas";
export const accountBlocked = "Utilisateur introuvable";
export const errorSurrounded = "Une erreur est survenue";
export const accountBanned = "Votre compte a été banni";
export const commentNotFound = "Le commentaire a été supprimé";
export const accountNotFound = "Aucun resultat";
export const accountNotAllowed =
  "Ceci est un compte d'exposition ne pouvez pas interargir avec";
export const usernameIsLucie = "Vous ne pouvez pas commenter un pug de Lucie";
export const sameUser = "fonctionalité sur soit meme non disponible";
export const accountAlreadyFollow = "Vous suivez déjà cet utilisateur";
export const accountAlreadyBlocked = "Vous déjà bloqué cet utilisateur";
export const accountNotFollowed = "Vous ne suivez pas cet utilisateur";
export const accountIsHimself = "Utilisateur invalide";
export const alreadyLiked = "Vous avez déjà liké cette photo";
export const notAlreadyliked = "Vous n'avez pas liké cette photo";

export const conversationDoesntExist = "La conversation n'existe pas";
export const competitionDoesntExist = "La competition n'existe pas";
export const conversationsDoesntExist = "Vous n'avez aucune conversation";
export const conversationAlreadyExist = "La conversation a déjà été crée";

export const accountAlreadyExist =
  "Un utilisateur avec cette adresse email existe déja";
export const accountAlreadyExistWithUsername =
  "Un utilisateur avec ce nom existe déjà";
export const accountAlreadyExistWithPhoneNumber =
  "Un utilisateur avec ce numéro existe déjà";

export const pugDoesntExist = "pug introuvable";
export const pugsDoesntExist = "L'utilisateur sans publlication";

export const subjectEmail = "MyPug mot de passe oublié";
const deeplink = "com.net.mypug://reset-password";
export const htmlContentPage = (username: string) => `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 10px;
      }
      .button {
        display: inline-block;
        padding: 15px 30px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h2 style="color: #333;">Réinitialisation de mot de passe</h2>
    <p style="font-size: 16px; color: #555;">
      Vous avez oublié votre mot de passe. Si la redirection ne fonctionne pas automatiquement, cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.
    </p>
    <div style="margin: 40px 0;">
      <a href="${deeplink}?username=${username}" class="button">
        <strong>Réinitialiser mon mot de passe</strong>
      </a>
    </div>
    <p style="font-size: 12px; color: #888;">
      Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cet e-mail.
    </p>

    <script type="text/javascript">
      window.onload = function() {
        window.location.href = "${deeplink}?username=${username}";
        
        setTimeout(function() {
          document.querySelector(".button").style.display = "inline-block";
        }, 3000);
      };
    </script>
  </body>
  </html>
`;

export const htmlContentEmail = (username: string) => `
  <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 40px;
        }
        button {
            padding: 15px 30px;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #45a049;
        }
        .note {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>

  <div class="container">
    <h2>Réinitialisation de mot de passe</h2>
    <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous.</p>
    <form action="https://ec2-user@ec2-13-38-71-167.eu-west-3.compute.amazonaws.com/user/resetPasswordPage/${username}" method="get">
        <button type="submit">Réinitialiser le mot de passe</button>
    </form>
    <p class="note">Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cette page.</p>
  </div>

</body>
</html>

`;

export const allUsersConnected = new Map();
export const allUsersNotificationToken = new Map();
