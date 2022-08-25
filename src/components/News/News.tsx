import cls from "./News.module.scss"
import {connect} from "react-redux";
import NewsPost from "./NewsPost";
import {addLike, delLike} from "../../redux/news_reducer";
import "animate.css"
import {NewsListType} from "../../types/types";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    newsList: Array<NewsListType>,
    delLike: (id: number) => void,
    addLike: (id: number) => void

}

const News: React.FC<PropsType> = ({newsList, addLike, delLike}) => {
    return (
        <div className={cls.news}>
            <h1 className={"animate__animated animate__fadeInRight" + " " + cls.news_header}>
                Новости
            </h1>
            <div className={"animate__animated animate__fadeIn" + " " + cls.news_list}>
                {newsList.map(news =>
                    <NewsPost key={news.id} id={news.id} annotation={news.annotation} newsText={news.newsText}
                              newsPhoto={news.newsPhoto} likes={news.likes} addLike={addLike}
                              likeWasAdd={news.likeWasAdd} delLike={delLike}/>
                )}
            </div>
        </div>
    )
}

type MapStatePropsType = {
    newsList: Array<NewsListType>
}

type MapDispatchPropsType = {
    delLike: (id: number) => void,
    addLike: (id: number) => void
}

type MapOwnPropsType = {}

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
((state: AppStateType) => ({
    newsList: state.news.newsList
}), {addLike, delLike})(News);
