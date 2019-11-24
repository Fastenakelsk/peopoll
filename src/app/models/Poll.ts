export class Poll{
    title: String;
    pollItems: Array<{
        text: String,
        votes: Number
    }>;
    creator: String;
    invitedUsers: Array<String>;
    votedUsers: Array<String>;
}