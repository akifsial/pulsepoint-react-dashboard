export type POST_COMMENT_TYPE={
    content:string,
    post_id:number
}

export type LIKE_POST_TYPE={
    type:string,
    post_id:number
}

export type PARENT_COMMENT_REPLY_TYPE={
    content:string,
    post_id:number,
    parent_id:number
}

export type COMMENT_LIKE_TYPE={
    post_id:number,
    type:string
}

export type SAVE_POST_TYPE={
    post_id:number
}

export type JOIN_COMMUNITY_TYPE={
    community_id:string
}

export type AIBOT_SEND_MESSAGE_TYPE = {
  content: string;
  type: "chatbot";
  userIds: number[];
};

export type USE_GET_NOTIFICATIONS_PROPS = {
  page?: number;
  limit?: number;
};