import cls from "./MyPosts.module.scss";
import Post from "./Posts/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/ControlsForm/ControlForm";
import {PostDataType, ProfileType} from "../../../types/types";

type PropsType = {
    handleSubmit: any,
    error: any,

}

const AddPostForm: React.FC<PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newPost"}
                   title="Новый пост" placeholder="Новый пост"
                   validate={[required, maxLengthCreator(100)]}
            />
            <button disabled={!!props.error} title="Опубликовать">Опубликовать</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "profileAddPostForm"})(AddPostForm)

type PropsMyPostsType = {
    postData: Array<PostDataType>,
    addLike: (id: number) => void,
    delLike: (id: number) => void,
    addPost: (newPost: string) => void,
    profile: ProfileType | null,
    isOwner: boolean,

}

const MyPosts: React.FC<PropsMyPostsType> = React.memo(props => {

    let postElements = props.postData.map(post =>
        <Post addLike={props.addLike} profile={props.profile}
              message={post.post} key={post.id} likes={post.likes}
              likeWasAdd={post.likeWasAdd} id={post.id} delLike={props.delLike}
        />);

    let addNewPost = (values: any) => {
        props.addPost(values.newPost);
    }

    return (
        <div>
            <div className={cls.header_my_posts}>
                <span>Мои посты</span>
            </div>
            {props.isOwner &&
                <>
                    <div className={cls.make_posts}>
                        <AddPostFormRedux onSubmit={addNewPost}/>
                    </div>
                    <div className={cls.posts}>
                        {postElements}
                    </div>
                </>
            }
        </div>
    );
});

export default MyPosts;