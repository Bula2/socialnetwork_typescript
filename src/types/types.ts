export type postDataType = {
    id: number,
    post: string,
    likes: number,
    likeWasAdd: boolean
}
export type profileContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
export type profilePhotosType = {
    small: string | null,
    large: string | null
}
export type profileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: profileContactsType,
    photos: profilePhotosType
}
export type usersType = {
    id: number,
    name: string,
    status: string,
    photos: profilePhotosType
}