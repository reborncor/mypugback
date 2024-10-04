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
export const htmlContentEmail = (userId: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #333;">Réinitialisation de mot de passe</h2>
    <p style="font-size: 16px; color: #555;">
      Vous avez oublié votre mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.
    </p>
    <div style="margin: 40px 0;">
      <a href="${deeplink}?username=${userId}" style="padding: 15px 30px; background-color: #4CAF50; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
        Réinitialiser mon mot de passe
      </a>
    </div>
    <p style="font-size: 12px; color: #888;">
      Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cet e-mail.
    </p>
  </div>
`;
export const allUsersConnected = new Map();
export const allUsersNotificationToken = new Map();
