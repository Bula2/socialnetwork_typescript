export type PostDataType = {
    id: number,
    post: string,
    likes: number,
    likeWasAdd: boolean
}
export type ProfileContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
export type ProfilePhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ProfileContactsType,
    photos: ProfilePhotosType
}
export type UsersType = {
    id: number,
    name: string,
    status: string,
    photos: ProfilePhotosType,
    inFriends: boolean
}

export type DialogsDataType = {
    id: number,
    name: string
}

export type MessagesDataType = {
    id: number,
    avatar: string,
    name: string,
    message: string
}

export type NewsListType = {
    id: number,
    annotation: string,
    newsText: string,
    newsPhoto: string,
    likes: number,
    likeWasAdd: boolean
}

export type FriendsDataType = {
    id: number,
    avatar: string,
    name: string
}

export type MusicListType = {
    id: number,
    source: string,
    name: string,
    author: string,
    photo: string
}

export type FriendsListType = {
    id: number,
    avatar: string,
    name: string
}