import { MessageStoreImpl, StreamStoreImpl } from './storeImpl';
import { SocialMessage } from './interfaces';

const messageStore = new MessageStoreImpl();
const streamStore = new StreamStoreImpl();

const inboxMessages:SocialMessage[] = [];
messageStore.onReceiveData('social_message', (message) => {
    console.log('Receive message', message);
    inboxMessages.push(message);
});

const chatRoom = streamStore.getStream('xxx');
if (chatRoom) {
    chatRoom.onNewMessage((message) => {
        console.log('Receiving new message');
    });
    
    const messages = chatRoom.getMessages(0, 50).map((message) => {
        console.log(message);
        return message;
    });
    
    // TODO batch update the messages to mark then as read
}
