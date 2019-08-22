import TaskSubsriber from './TaskSubscriber';

const taskSubscriber = new TaskSubsriber();
taskSubscriber.connect().then(() => {
    taskSubscriber.receive();
})