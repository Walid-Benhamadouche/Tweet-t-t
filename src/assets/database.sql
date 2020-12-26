CREATE TABLE User
(
    UserId integer NOT NULL AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    Email varchar(100) NOT NULL,
    HashCode varchar(255) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    IsAdmin boolean,
    PRIMARY KEY(userId)
);
CREATE TABLE FollowList
(
    FollowListId integer NOT NULL AUTO_INCREMENT,
    FK_UserId integer NOT NULL,
	FOREIGN KEY(FK_UserId) references User(UserId),
    PRIMARY KEY(FollowListId)
);
CREATE TABLE FollowersList
(
    FollowersListId integer NOT NULL AUTO_INCREMENT,
    FK_UserId integer NOT NULL,
    FOREIGN KEY(FK_UserId) references User(UserId),
    PRIMARY KEY(FollowersListId)
);
CREATE TABLE PostList
(
    PostListId integer NOT NULL AUTO_INCREMENT,
    FK_UserId integer NOT NULL,
    Body varchar(180),
    Image BLOB,
    FOREIGN KEY(FK_UserId) references User(UserId),
    PRIMARY KEY(PostListId)
);
CREATE TABLE CommentList
(
    CommentListID integer NOT NULL AUTO_INCREMENT,
    FK_UserId integer NOT NULL,
    FK_PostListId integer NOT NULL,
    Body varchar(180),
    Image BLOB,
    FOREIGN KEY(FK_UserId) references User(UserId),
    FOREIGN KEY(FK_PostListId) references PostList(PostListId),
    PRIMARY KEY(CommentListID)
);
CREATE TABLE Thread
(
    ThreadId integer NOT NULL AUTO_INCREMENT,
    FK_userId1 integer NOT NULL,
    FK_userId2 integer NOT NULL,
    PRIMARY KEY(ThreadId)
);
CREATE TABLE MessageList
(
    MessageListId integer NOT NULL AUTO_INCREMENT,
    ThreadId integer NOT NULL,
    FK_UserId integer NOT NULL,
    Body varchar(255),
    Image BLOB,
    SentDate datetime,
    FOREIGN KEY(FK_UserId) references User(UserId),
    PRIMARY KEY(MessageListId)
);
CREATE TABLE MessageReadStatus
(
    MessageReadStatusId integer NOT NULL AUTO_INCREMENT,
    FK_MessageListId integer NOT NULL,
    FK_UserId integer NOT NULL,
    ReadTime datetime,
    FOREIGN KEY(FK_MessageListId) references MessageList(MessageListId),
    FOREIGN KEY(FK_UserId) references User(UserId),
    PRIMARY KEY(MessageReadStatusId)
);