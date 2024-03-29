import * as React from 'react'
import css from './index.module.scss'
import {IChat} from '@entities/chat'
import ChatAvatar from '@components/common/messenger/chat-avatar'
import {EChatNotificationsState, ETypeChat} from '@constants/messenger'
import ChatStaticAvatar from '@components/common/messenger/chat-static-avatar'
import classnames from 'classnames'
import ReadingStatus from '@components/common/messenger/reading-status'
import MessageDate from '@components/common/messenger/message-date'
import ChatCounter from '@components/common/messenger/chat-counter'
import {getCounterForView} from '@helpers/get-counter-for-view'
import {checkShowSenderInChatList} from '@helpers/check-show-sender-in-chat-list'
import {getDateViewForChatList} from '@helpers/date/get-date-view-for-chat-list'
import ChatListContextMenu from '@components/common/messenger/chat-list-context-menu'
import {ICursorPosition} from '@models/metrics'

interface IProps {
    data: IChat.ListItemModel
}

const ChatListItem = ({ data }: IProps) => {
    const {
        avatar,
        type,
        name,
        lastMessage,
        selected,
        counter,
        notificationsState
    } = data

    const classNames = classnames(
        css.root,
        {[css.channel]: type === ETypeChat.channel},
        {[css.group]: type === ETypeChat.group},
        {[css.is_active]: selected},
    )

    const [cursorPosition, setCursorPosition] = React.useState<ICursorPosition | null>(null)

    const handleCloseContextMenu = () => {
        setCursorPosition(null)
    }

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        setCursorPosition({
            x: event.pageX,
            y: event.pageY,
        })

        return false
    }

    return (
        <React.Fragment>
            {
                cursorPosition && <ChatListContextMenu data={data} onClose={handleCloseContextMenu} cursorPosition={cursorPosition} />
            }

            <div className={classNames} onContextMenu={handleContextMenu}>
                <div className={css.inner}>
                    <div className={css.avatarWrap}>
                        {
                            avatar && <ChatAvatar data={avatar} parentClass={css.avatar} />
                        }
                        {
                            !avatar && type === ETypeChat.savedMessages && <ChatStaticAvatar type={'saved'} parentClass={css.avatar} />
                        }
                    </div>

                    <div className={css.content}>
                        <div className={css.header}>{name}</div>
                        <div className={css.footer}>
                            {
                                checkShowSenderInChatList(type, lastMessage.senderType) && <div className={css.sender}>{lastMessage.senderName}: </div>
                            }
                            <div className={css.message}>{lastMessage.shortPreviewMsg}</div>
                        </div>
                    </div>

                    <div className={css.additionalInfo}>
                        <div className={css.additionalTopContent}>
                            {
                                lastMessage.readingStatus && (
                                    <ReadingStatus
                                        status={lastMessage.readingStatus}
                                        type={selected ? 'light' : 'secondary'}
                                        parentClass={css.readingStatus}
                                    />
                                )
                            }
                            {
                                <MessageDate type={'light'} parentClass={css.date}>
                                    {getDateViewForChatList(lastMessage.date)}
                                </MessageDate>
                            }
                        </div>

                        {
                            counter && (
                                <ChatCounter
                                    type={notificationsState === EChatNotificationsState.disabled ? 'disabled' : 'primary'}
                                    parentClass={classnames(css.counter, css[notificationsState])}
                                >
                                    {getCounterForView(counter)}
                                </ChatCounter>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatListItem
