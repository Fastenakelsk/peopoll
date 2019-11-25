export class Poll{
    title: String;
    pollItems: Array<{
        _id: String,
        text: String,
        votes: number
    }>;
    creator: String;
    invitedUsers: Array<String>;
    votedUsers: Array<String>;
}