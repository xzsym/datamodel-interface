import { MessageStore, StreamStoreImpl, UserStoreImpl } from './storeImpl';
import { SocialMessage } from './interfaces';
import { SocialMessageImpl } from './messageImpl';

const messageStore = new MessageStore();
const userStore = new UserStoreImpl();
const streamStore = new StreamStoreImpl(messageStore, userStore);

const inboxMessages:SocialMessage[] = [];
messageStore.start();

streamStore.get('yy').then((chatRoom) => {
    if (chatRoom) {
        chatRoom.addNewMessageListener((message) => {
            console.log(`Chatroom ${chatRoom.id} receives a new message`, message);
        });
        
        const messages = chatRoom.getMessages(0, 0, 50).then((messages) => {
            console.log(`All the messages in room ${chatRoom.id}:`, messages);
            return messages;
        }).then((messages) => {
            chatRoom.sendReceipt(messages);
        });
    }
});

streamStore.get('xx').then((im) => {
    if (im) {
        im.addNewMessageListener((message) => {
            console.log(`IM ${im.id} receives a new message`, message);
        });

        im.sendMessage(new SocialMessageImpl({
            id: Date.now(),
            text: `User input message`,
            streamId: im.id
        }));
    }
    
});



