import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { envConfig } from '~/config/envConfig';

type Props = {};

export default function TawkChat({}: Props) {
    const customStyle = {};

    return (
        <TawkMessengerReact
            propertyId={envConfig.TAWK_PROPERTY_ID}
            widgetId={envConfig.TAWK_WIDGET_ID}
            customStyle={customStyle}
            onLoad={() => {}}
            onChatStarted={() => {}}
            onBeforeLoad={() => {}}
            onStatusChange={() => {}}
            onChatMessageSystem={() => {}}
            onUnreadCountChanged={() => {}}
            onChatMaximized={() => {}}
            onChatMinimized={() => {}}
            onChatMessageVisitor={() => {}}
            onChatSatisfaction={() => {}}
            onAgentJoinChat={() => {}}
            onChatMessageAgent={() => {}}
        />
    );
}
