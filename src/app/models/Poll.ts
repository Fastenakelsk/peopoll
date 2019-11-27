import { PollItem } from './PollItem'

export class Poll{
    title: String;
    pollItems: Array<PollItem>;
    creator: String;
    invitedUsers: Array<String>;
    votedUsers: Array<String>;
}