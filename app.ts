import { MessageStoreImpl, StreamStoreImpl } from './storeImpl';

const messageStore = new MessageStoreImpl();
const streamStore = new StreamStoreImpl();

const chatRoom = streamStore.getStream('xxx');
chatRoom.onNewMessage((message) => {
    console.log('Receiving new message');
});

const messages = chatRoom.getMessages(0, 50).map((message) => {
    console.log(message);
    return message;
});

// TODO batch update the messages to mark then as read