import {ETypeChat, ETypeSender} from '@constants/messenger'

export const checkShowSenderInChatList = (typeChat: ETypeChat, senderType: ETypeSender): boolean => {
    if (typeChat === ETypeChat.channel) return false

    if (typeChat === ETypeChat.single && senderType === ETypeSender.user) return false

    return true
}
