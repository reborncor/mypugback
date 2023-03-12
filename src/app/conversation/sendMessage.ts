import { CustomError } from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";
import {
  checkThatUserExistsOrThrow,
  checkThatUserIsLucie,
  checkThatUserisNotBlocked,
} from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";
import { Message } from "../../models/Message";
import { successCode } from "../../util/util";
import { ObjectId } from "bson";
import moment from "moment";
import FollowerRepository from "../../repository/FollowerRepository";

export const sendMessage = async (
  currentUsername: string,
  receiverUsername: string,
  content: any,
  type: "text" | "pug"
): Promise<any> => {
  try {
    const message = await execute(
      currentUsername,
      receiverUsername,
      content,
      type
    );
    return { message, code: successCode };
  } catch (err: any) {
    if (err instanceof CustomError) {
      console.log(err);
      return { message: err.message, code: err.code };
    } else {
      console.log(err);
      return { message: err.message, code: err.code };
    }
  }
};

const execute = async (
  currentUsername: string,
  receiverUsername: string,
  content: any,
  type: "text" | "pug"
) => {
  const currentUser = await UserRepository.findByUsername(currentUsername);
  const receiverUser = await UserRepository.findByUsername(receiverUsername);
  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(receiverUser);
  const userBlocked = await FollowerRepository.findUserInBlockingList(
    currentUser.username,
    receiverUser.username
  );
  checkThatUserisNotBlocked(userBlocked);
  const otherUserBlocked = await FollowerRepository.findUserInBlockingList(
    receiverUser.username,
    currentUser.username
  );
  checkThatUserisNotBlocked(otherUserBlocked);

  checkThatUserIsLucie(receiverUser);
  const conversation = await ConversationRepository.findByMembers([
    currentUser.username,
    receiverUser.username,
  ]);
  const time = moment().unix().toString();

  const message: Message = {
    content: content,
    time,
    senderUsername: currentUser.username,
    receiverUsername: receiverUsername,
    _id: new ObjectId(),
    type,
  };

  await ConversationRepository.addMessageToConversation(message, conversation);
  await ConversationRepository.updateConversationOnNotSeen(
    conversation,
    receiverUser
  );
  return message;
};
