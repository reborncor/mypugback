import { checkThatConversationExist } from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";

export const getConversationFromId = async (
  conversationId: string
): Promise<any> => {
  const conversation = await ConversationRepository.findById(conversationId);

  checkThatConversationExist(conversation);
  conversation.chat.reverse();
  return {
    code: 0,
    payload: conversation,
    message: "Conversation exist. Sending messages...",
  };
};
