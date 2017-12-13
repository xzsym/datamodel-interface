import { MessageStoreImpl, StreamStoreImpl, UserStoreImpl } from './storeImpl';
import { SocialMessage } from './interfaces';

const messageStore = new MessageStoreImpl();
const userStore = new UserStoreImpl();
const streamStore = new StreamStoreImpl(messageStore, userStore);

const inboxMessages:SocialMessage[] = [];
messageStore.onReceiveData('social_message', (message) => {
    console.log('Receive message', message);
    inboxMessages.push(message as SocialMessage);
});

const chatRoom = streamStore.getStream('xxx');
if (chatRoom) {
    chatRoom.onNewMessage((message) => {
        console.log('Receiving new message', message);
    });
    
    const messages = chatRoom.getMessages(0, 50).map((message) => {
        console.log(message);
        return message;
    });
    
    chatRoom.sendReceipt(messages);
}
